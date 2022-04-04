import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected, walletconnect } from '../connectors'

export const NETWORK_LABELS: { [chainId in number]?: string } = {
  25: 'Cronos'
}

export const CronosChainId = 25

export enum Chain {
  Cronos = 25
}

export const chainTickers = new Map([
  [25, "CRO"]
])

export const chains = new Map([
  [25, Chain.Cronos]
])

export const BASE_ADDRESS = '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23'
export const ROOTED_ADDRESS = '0xb062084aFfDf75b9b494D56B8417F1B981Df790f'
export const STAKING_ADDRESS = '0x78Bf858Ef5f5C286cb8CAaa145D7376d7a96d90e'
export const POOL_ADDRESS = '0xb0a7d88202eB8bf3c43D506b712b4E474eB9cdA3'
export const VAULT_ADDRESS = '0x4856E74681D6E6bB266de2582c549c2cbf12547C'

export const MARKET_GENERATION_ADDRESS = '0x734BD90Cdadc06a2820c4b1D7FD7419530A9e108'
export const CROSS_CHAIN_MARKET_GENERATION_ADDRESS = '0xCcB45704fAE0450237f48C7e93951621a5b8D319'
export const GROUP_MARKET_GENERATION_ADDRESS = '0xDC8c20Aad9D27898f39F07C9C6CE1B50dB4F32D5'
export const MARKET_DISTRIBUTION_ADDRESS = '0xbD59858ebe4bdeCDe65d7aCb1Ca8b305D463A8C8'
export const CLAIM_CALCULATOR_ADDRESS = '0x0e90178Ad52aEfceF298A7F319a31505d1FCca52'

export const EMPIRE_ROUTER_ADDRESS = '0xdADaae6cDFE4FA3c35d54811087b3bC3Cd60F348'
export const EMPIRE_FACTORY_ADDRESS = '0x06530550A48F990360DFD642d2132354A144F31d'
export const EMPIRE_PAIR_ADDRESS = '0xb0a7d88202eb8bf3c43d506b712b4e474eb9cda3'

export const BASE_DECIMALS = 18
export const BASE_TICKER = "CRO"
export const ROOTED_TICKER = "upCRO"
export const STAKING_TICKER = "xUpCRO"

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
    // DEFI_CONNECT: {
    //   connector: defiWalletConnect,
    //   name: 'Crypto.com DeFi Wallet',
    //   iconName: 'cryptoCom.png',
    //   description: 'Connect to Crypto.com DeFi Wallet',
    //   href: null,
    //   color: '#103f68',
    //   mobile: true
    // },
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
    [Chain.Cronos]: {
      chainId: '0x19',
      chainName: 'Cronos',
      label: 'Cronos',
      nativeCurrency: {
        name: 'Cronos',
        symbol: 'CRO',
        decimals: 18,
      },
      rpcUrls: ['https://evm-cronos.crypto.org'],
      blockExplorerUrls: ['https://cronoscan.com/']
    }
  }
  
export const NetworkContextName = 'NETWORK'  
