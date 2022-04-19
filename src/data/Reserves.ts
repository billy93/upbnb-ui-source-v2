import { TokenAmount, Pair, Currency } from '../sdk'
import { useMemo } from 'react'
import EmpirePairABI from '../constants/abis/pair.json'
import { Interface } from '@ethersproject/abi'
import { useActiveWeb3React } from '../hooks'

import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'

const PAIR_INTERFACE = new Interface(EmpirePairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}

export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React()

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ]),
    [chainId, currencies]
  )

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
      }),
    [tokens]
  )

  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  const pairTypeResults = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'empirePairType')
  const lockTimeResults = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'empireLockTime')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result

      const { result: pairType, loading: pairTypeloading } = pairTypeResults[i]
      const { result: lockTime, loading: lockTimeloading } = lockTimeResults[i]

      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading || pairTypeloading || lockTimeloading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { _reserve0, _reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(
          new TokenAmount(token0, _reserve0.toString()), 
          new TokenAmount(token1, _reserve1.toString()),
          typeof pairType !== 'undefined' ? pairType[0]/1 : 0,
          typeof lockTime !== 'undefined' ? lockTime[0]/1 : 0
          )
      ]
    })
  }, [results, tokens, pairTypeResults, lockTimeResults])
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]])[0]
}
