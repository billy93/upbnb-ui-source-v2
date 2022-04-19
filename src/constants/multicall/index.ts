import { ChainId } from '../../sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  // [ChainId.BSC]: '0x2555e2f6C1da67857B32Ebf85409D1A11C99d864',
  [ChainId.BSC]: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
