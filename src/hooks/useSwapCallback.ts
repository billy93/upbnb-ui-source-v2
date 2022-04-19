import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { JSBI, Percent, Router, SwapParameters, Trade, TradeType } from '../sdk'
import { useMemo } from 'react'
import { BIPS_BASE, INITIAL_ALLOWED_SLIPPAGE } from '../constants'
import { useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin, getRouterContract, isAddress, shortenAddress } from '../utils'
import isZero from '../utils/isZero'
import { useActiveWeb3React } from './index'
import useTransactionDeadline from './useTransactionDeadline'
import useENS from './useENS'
import { truncate } from 'lodash'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID
}

interface SwapCall {
  contract: Contract
  parameters: SwapParameters
}

interface SuccessfulCall {
  call: SwapCall
  gasEstimate: BigNumber
}

interface FailedCall {
  call: SwapCall
  error: Error
}

type EstimatedSwapCall = SuccessfulCall | FailedCall

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */
function useSwapCallArguments(
  trade: Trade | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  recipientAddressOrName: string | null // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): SwapCall[] {
  const { account, chainId, library } = useActiveWeb3React()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  const deadline = useTransactionDeadline()

  return useMemo(() => {
    if (!trade || !recipient || !library || !account || !chainId || !deadline) return []

    const contract: Contract | null = getRouterContract(chainId, library, account)
    if (!contract) {
      return []
    }
    const swapMethods = []
      swapMethods.push(
        Router.swapCallParameters(trade, {
          feeOnTransfer: false,
          allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
          recipient,
          deadline: deadline.toNumber()
        })
      )

      // if (trade.route.input.symbol === "BNB" || trade.route.input.symbol === "WBNB") {
      //   swapMethods.push(
      //     Router.swapCallParameters(trade, {
      //       feeOnTransfer: false,
      //       allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
      //       recipient,
      //       deadline: deadline.toNumber()
      //     })
      //   )
      // }
      // else if (trade.route.output.symbol === "BNB" || trade.route.output.symbol === "WBNB") {
      //   swapMethods.push(
      //     Router.swapCallParameters(trade, {
      //       feeOnTransfer: true,
      //       allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
      //       recipient,
      //       deadline: deadline.toNumber()
      //     })
      //   )
      // }
      if (trade.tradeType === TradeType.EXACT_INPUT) {
        swapMethods.push(
          Router.swapCallParameters(trade, {
            feeOnTransfer: true,
            allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
            recipient,
            deadline: deadline.toNumber()
          })
        )
      }

    return swapMethods.map(parameters => ({ parameters, contract }))
  }, [account, allowedSlippage, chainId, deadline, library, recipient, trade])
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  trade: Trade | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  recipientAddressOrName: string | null // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): { state: SwapCallbackState; callback: null | (() => Promise<string>); error: string | null } {
  const { account, chainId, library } = useActiveWeb3React()

  // console.log("trade : ", trade)
  // console.log("allowedSlippage : ", allowedSlippage)
  // console.log("recipientAddressOrName : ", recipientAddressOrName)
  const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName)
  // console.log("swapCalls : ", swapCalls)
  const addTransaction = useTransactionAdder()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress

  return useMemo(() => {
    if (!trade || !library || !account || !chainId) {
      return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' }
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return { state: SwapCallbackState.INVALID, callback: null, error: 'Invalid recipient' }
      } else {
        return { state: SwapCallbackState.LOADING, callback: null, error: null }
      }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onSwap(): Promise<string> {
        const estimatedCalls: EstimatedSwapCall[] = await Promise.all(
          swapCalls.map(call => {
            const {
              parameters: { methodName, args, value },
              contract
            } = call
            const options = !value || isZero(value) ? {} : { value }
            console.log("methodName :  ",methodName)
            console.log("args :  ",args)
            console.log("options :  ",options)

            return contract.estimateGas[methodName](...args, options)
              .then(gasEstimate => {
                return {
                  call,
                  gasEstimate
                }
              })
              .catch(gasError => {
                console.debug('Gas estimate failed, trying eth_call to extract error', call)

                return contract.callStatic[methodName](...args, options)
                  .then(result => {
                    console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
                    return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') }
                  })
                  .catch(callError => {
                    console.debug('Call threw error', call, callError)
                    let errorMessage: string

                    let reason: string | undefined
                    while (callError) {
                      reason = callError.reason ?? callError.data?.message ?? callError.message ?? reason
                      // eslint-disable-next-line no-param-reassign
                      callError = callError.error ?? callError.data?.originalError
                    }
                    if (reason?.indexOf('execution reverted: ') === 0) reason = reason.substring('execution reverted: '.length)

                    switch (reason?.trim()) {
                      case 'PancakeRouter: EXPIRED':
                        errorMessage = 'The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.'
                        break                     
                      case 'PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT':
                      case 'PancakeRouter: EXCESSIVE_INPUT_AMOUNT':
                        errorMessage =
                          'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.'
                        break
                      case 'TransferHelper: TRANSFER_FROM_FAILED':
                        errorMessage = 'The input token cannot be transferred. There may be an issue with the input token.'
                        break
                      case 'Pancake: TRANSFER_FAILED':
                        errorMessage = 'The output token cannot be transferred. There may be an issue with the output token.'
                        break
                      default:
                        if (reason?.indexOf('undefined is not an object') !== -1) {
                          errorMessage = 'An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading.'                          
                        }
                        else{
                          errorMessage = 'Unknown error '+reason+'. Try increasing your slippage tolerance.'
                        }
                    }

                    // switch (callError.reason) {
                    //   case 'PancakeRouter: EXPIRED':
                    //     errorMessage = 'The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.'                        
                    //   case 'PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT':
                    //   case 'PancakeRouter: EXCESSIVE_INPUT_AMOUNT':
                    //     errorMessage = 'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.'                        
                    //   case 'TransferHelper: TRANSFER_FROM_FAILED':
                    //     errorMessage = 'The input token cannot be transferred. There may be an issue with the input token.'
                    //   case 'Pancake: TRANSFER_FAILED':
                    //     errorMessage = 'The output token cannot be transferred. There may be an issue with the output token.'                      
                    //   default:
                    //     errorMessage = `The transaction cannot succeed due to error: ${callError.reason}. This is probably an issue with one of the tokens you are swapping.`
                    // }
                    return { call, error: new Error(errorMessage) }
                  })
              })
          })
        )

        // console.log("estimatedCalls : ", estimatedCalls)
        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let successfulEstimation = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall => 
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])          
        )

        // let successfulEstimation = true
        // for(let i=0;i<estimatedCalls.length;i++){
        //   console.log(estimatedCalls[i])
        // }
        // let successfulEstimation = undefined
        // let successfulEstimation = estimatedCalls.find(
        //   (el, ix, list): el is SuccessfulCall => {

        //     // console.log("list : ", list)
        //     console.log('ix ',ix)
        //     // if('error' in el){
        //     //   return false
        //     // }
        //     return false
        //   }
        // )
        // console.log("successfulEstimation : ",successfulEstimation)

        // console.log("successfulEstimation : ", successfulEstimation)
        // let successfulEstimation : any = false
        // let success = 0
        // for(let ix=0;ix<estimatedCalls.length;ix++){
        //     let el = estimatedCalls[ix];
        //     if('error' in el){

        //     }
        //     else if('gasEstimate' in el){
        //        if((ix === estimatedCalls.length - 1 || 'gasEstimate' in estimatedCalls[ix + 1])){
        //           success++
        //        }
        //     }
        // }

        // if(success == estimatedCalls.length){
        //   successfulEstimation = estimatedCalls[0]
        // }

        if (!successfulEstimation) {
          console.log("!successfulEstimation")
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
          throw new Error('Unexpected error. Please contact support: none of the calls threw an error')
        }
        
        const {
          call: {
            contract,
            parameters: { methodName, args, value }
          },
          gasEstimate
        } = successfulEstimation

        return contract[methodName](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          ...(value && !isZero(value) ? { value, from: account } : { from: account })
        })
          .then((response: any) => {
            const inputSymbol = trade.inputAmount.currency.symbol
            const outputSymbol = trade.outputAmount.currency.symbol
            const inputAmount = trade.inputAmount.toSignificant(3)
            const outputAmount = trade.outputAmount.toSignificant(3)

            const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`
            const withRecipient =
              recipient === account
                ? base
                : `${base} to ${
                    recipientAddressOrName && isAddress(recipientAddressOrName)
                      ? shortenAddress(recipientAddressOrName)
                      : recipientAddressOrName
                  }`

            const withVersion = withRecipient

            addTransaction(response, {
              summary: withVersion
            })

            return response.hash
          })
          .catch((error: any) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, methodName, args, value)
              throw new Error(`Swap failed: ${error.message}`)
            }
          })
      },
      error: null
    }
  }, [trade, library, account, chainId, recipient, recipientAddressOrName, swapCalls, addTransaction])
}
