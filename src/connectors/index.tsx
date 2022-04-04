import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { DeFiWeb3Connector } from 'deficonnect'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { NetworkConnector } from './NetworkConnectors'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL!

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '25');

export const NETWORK_URLS: { [key in number]: string } = {
  25:"https://cronos.nodes.cybercorey.net"
}

export const network = new NetworkConnector({
    urls: NETWORK_URLS
  })

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

const supportedChainIds = [25]

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds
})


// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: NETWORK_URLS, // Infura URL does not work 
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  // pollingInterval: 15000,
  supportedChainIds: supportedChainIds,
})

export const defiWalletConnect = new DeFiWeb3Connector({
  supportedChainIds: [25],
  rpc: { 25: NETWORK_URLS[25] },
  pollingInterval: 15000,
})



// mainnet only
export const walletlink = new WalletLinkConnector({
    url: NETWORK_URL,
    appName: 'upFund',
    appLogoUrl:
      'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg'
  })
