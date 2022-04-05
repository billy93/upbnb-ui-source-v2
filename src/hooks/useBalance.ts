import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import useBlock from './useBlock'
import { useWeb3React } from '@web3-react/core'

const useBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library, chainId } = useWeb3React() 
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await library.getBalance(account!)
    setBalance(new BigNumber(balance.toString()))
   
  }, [account, library])

  useEffect(() => {
    if (account && library && chainId) {
      fetchBalance()
    }
  }, [account, chainId, library, fetchBalance, setBalance, block])
  return balance
}

export default useBalance