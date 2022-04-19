import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected, walletconnect } from '../connectors'
import { ChainId, JSBI, Percent, Token, WETH } from '../sdk'

export const NETWORK_LABELS: { [chainId in number]?: string } = {
  56: 'BSC'
}

export const BSCChainId = 56

export enum Chain {
  BSC = 56
}

export const chainTickers = new Map([
  [56, "BNB"]
])

export const chains = new Map([
  [56, Chain.BSC]
])

export const INFO_CLIENT = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2'
export const NEXT_PUBLIC_BIT_QUERY_ENDPOINT = "https://graphql.bitquery.io"
export const POOL_ADDRESS = '0xb0a7d88202eB8bf3c43D506b712b4E474eB9cdA3'
export const VAULT_ADDRESS = '0x4856E74681D6E6bB266de2582c549c2cbf12547C'

export const CROSS_CHAIN_MARKET_GENERATION_ADDRESS = '0xCcB45704fAE0450237f48C7e93951621a5b8D319'
export const GROUP_MARKET_GENERATION_ADDRESS = '0xDC8c20Aad9D27898f39F07C9C6CE1B50dB4F32D5'
export const CLAIM_CALCULATOR_ADDRESS = '0x0e90178Ad52aEfceF298A7F319a31505d1FCca52'

export const EMPIRE_ROUTER_ADDRESS = '0xdADaae6cDFE4FA3c35d54811087b3bC3Cd60F348'
export const EMPIRE_FACTORY_ADDRESS = '0x06530550A48F990360DFD642d2132354A144F31d'
export const EMPIRE_PAIR_ADDRESS = '0xb0a7d88202eb8bf3c43d506b712b4e474eb9cda3'

export const BASE_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
export const ELITE_ADDRESS = '0xb7db0850096aeaec1b615463202db441012c564f'
export const ROOTED_ADDRESS = '0x1759254EB142bcF0175347D5A0f3c19235538a9A'
export const STAKING_ADDRESS = '0x49Ba5c83F151F8f786CF2623243b66dC42492d41'
export const FEESPLITTER_ADDRESS = '0x6C6383dD4934a1157E0dCe5EE0B4a090b5D53ad2'
export const MARKET_GENERATION_ADDRESS = '0x337B0e8b6C35cEd2952682eb15a51a97373c5b1e'
export const MARKET_DISTRIBUTION_ADDRESS = '0x1DDDbC37231965897d4131BdbA0ade7069d28AB0'

export const BASE_DECIMALS = 18
export const BASE_TICKER = "BNB"
export const ROOTED_TICKER = "upBNB"
export const STAKING_TICKER = "xUpBNB"

export const VAULT_START_TIME = 1643164589;

export const generationStartDate = new Date(Date.UTC(2021, 11, 15, 0, 20, 0));
export const generationEndDate = new Date(Date.UTC(2022, 0, 26, 0, 20, 0));

export interface WalletInfo {
    connector?: AbstractConnector
    name: string
    iconName: string
    description: string
    href: string | null
    color: string
    primary?: true
    mobile?: true
    mobileOnly?: true
}


export const SUPPORTED_NETWORKS: {
    [chain in Chain]?: {
      chainId: string
      chainName: string,
      label: string
      nativeCurrency: {
        name: string
        symbol: string
        decimals: number
      }
      rpcUrls: string[]
      blockExplorerUrls: string[]
    }
  } = {   
    [Chain.BSC]: {
      chainId: '0x38',
      chainName: 'BSC',
      label: 'BSC',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bsccan.com/']
    }
  }
  

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  }
}
export const NetworkContextName = 'NETWORK'

export const URL = 'bsc.empiredex.org';

// export const ROUTER_ADDRESS = '0xdADaae6cDFE4FA3c35d54811087b3bC3Cd60F348'
export const ROUTER_ADDRESS = '0x10ED43C718714eb63d5aA57B78B54704E256024E'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export { PRELOADED_PROPOSALS } from './proposals'



// a list of tokens by chain
// type ChainTokenList = {
//   readonly [chainId in ChainId]: Token[]
// }

// // used to construct intermediary pairs for trading
// export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
//   [ChainId.BSC]: [
//     // mainnetTokens.wbnb,
//     // mainnetTokens.cake,
//     // mainnetTokens.busd,
//     // mainnetTokens.usdt,
//     // mainnetTokens.btcb,
//     // mainnetTokens.ust,
//     // mainnetTokens.eth,
//     // mainnetTokens.usdc,
//   ]
// }

// /**
//  * Addittional bases for specific tokens
//  * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
//  */
// export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
//   [ChainId.BSC]: {},
// }

// /**
//  * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
//  * tokens.
//  * @example [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
//  */
// export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
//   [ChainId.BSC]: {},
// }

// // used for display in the default list when adding liquidity
// export const SUGGESTED_BASES: ChainTokenList = {
//   [ChainId.BSC]: [
//     // mainnetTokens.busd, mainnetTokens.cake, mainnetTokens.btcb
//   ]
// }

// // used to construct the list of all pairs we consider by default in the frontend
// export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
//   [ChainId.BSC]: [
//     // mainnetTokens.wbnb, mainnetTokens.dai, mainnetTokens.busd, mainnetTokens.usdt
//   ]
// }

// export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
//   [ChainId.BSC]: [
//     // [mainnetTokens.cake, mainnetTokens.wbnb],
//     // [mainnetTokens.busd, mainnetTokens.usdt],
//     // [mainnetTokens.dai, mainnetTokens.usdt],
//   ],
// }

// // export const NetworkContextName = 'NETWORK'

// // default allowed slippage, in bips
// export const INITIAL_ALLOWED_SLIPPAGE = 50
// // 20 minutes, denominated in seconds
// export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// export const BIG_INT_ZERO = JSBI.BigInt(0)

// // one basis point
// export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
// export const BIPS_BASE = JSBI.BigInt(10000)
// // used for warning states
// export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
// export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
// export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// // if the price slippage exceeds this number, force the user to type 'confirm' to execute
// export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// // for non expert mode disable swaps above this
// export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// // used to ensure the user doesn't send so much BNB so they end up with <.01
// export const MIN_BNB: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 BNB
// export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

// export const ZERO_PERCENT = new Percent('0')
// export const ONE_HUNDRED_PERCENT = new Percent('1')

// // SDN OFAC addresses
// export const BLOCKED_ADDRESSES: string[] = [
//   '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
//   '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
//   '0x901bb9583b24D97e995513C6778dc6888AB6870e',
//   '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
//   '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
// ]

// // export { default as farmsConfig } from './farms'
// // export { default as poolsConfig } from './pools'
// // export { default as ifosConfig } from './ifo'

// export const FAST_INTERVAL = 10000
// export const SLOW_INTERVAL = 60000

// // Gelato uses this address to define a native currency in all chains
// export const GELATO_NATIVE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
// // Handler string is passed to Gelato to use PCS router
// export const GELATO_HANDLER = 'pancakeswap'
// // export const GENERIC_GAS_LIMIT_ORDER_EXECUTION = BigNumber.from(500000)

// export const EXCHANGE_DOCS_URLS = 'https://docs.pancakeswap.finance/products/pancakeswap-exchange'
// export const LIMIT_ORDERS_DOCS_URL = 'https://docs.pancakeswap.finance/products/pancakeswap-exchange/limit-orders'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const USDC = new Token(ChainId.BSC, '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', 6, 'USDC', 'USDC')
export const bPRISM = new Token(ChainId.BSC, '0x4cf12dd46bab9afc94e049342fd75a9eaff5d096', 18, 'bPRISM', 'bPRISM')

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'

export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'

const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.BSC]: new Token(ChainId.BSC, UNI_ADDRESS, 18, 'UNI', 'Uniswap')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [UNI_ADDRESS]: 'UNI',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}


// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.BSC]: [WETH[ChainId.BSC]]
}

interface TokenList {
  [symbol: string]: Token
}

const defineTokens = <T extends TokenList>(t: T) => t

export const mainnetTokens = defineTokens({
  wbnb: new Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(ChainId.BSC, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'BNB', 'BNB'),
  cake: new Token(
    ChainId.BSC,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token'
  ),
  busd: new Token(
    ChainId.BSC,
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    18,
    'BUSD',
    'Binance USD'
  ),
  usdt: new Token(
    ChainId.BSC,
    '0x55d398326f99059fF775485246999027B3197955',
    18,
    'USDT',
    'Tether USD'
  ),
  btcb: new Token(
    ChainId.BSC,
    '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    18,
    'BTCB',
    'Binance BTC'
  ),
  ust: new Token(
    ChainId.BSC,
    '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    18,
    'UST',
    'Wrapped UST Token'
  ),
  eth: new Token(
    ChainId.BSC,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum Token'
  ),
  usdc: new Token(
    ChainId.BSC,
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    18,
    'USDC',
    'Binance-Peg USD Coin'
  ),
  dai: new Token(
    ChainId.BSC,
    '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    18,
    'DAI',
    'Dai Stablecoin'
  )
  })
// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.BSC]: [
    mainnetTokens.wbnb,
    mainnetTokens.cake,
    mainnetTokens.busd,
    mainnetTokens.usdt,
    mainnetTokens.btcb,
    mainnetTokens.ust,
    mainnetTokens.eth,
    mainnetTokens.usdc,
  ]
}

/**
 * Addittional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {},
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.BSC]: [mainnetTokens.busd, mainnetTokens.cake, mainnetTokens.btcb],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.BSC]: [mainnetTokens.wbnb, mainnetTokens.dai, mainnetTokens.busd, mainnetTokens.usdt],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.BSC]: [
    [mainnetTokens.cake, mainnetTokens.wbnb],
    [mainnetTokens.busd, mainnetTokens.usdt],
    [mainnetTokens.dai, mainnetTokens.usdt],
  ],
}
/*
// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSC]: [...WETH_ONLY[ChainId.BSC], USDC]
}

export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
}

export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
}


// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSC]: [...WETH_ONLY[ChainId.BSC], bPRISM]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
}
*/

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}
  
// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C'
]
