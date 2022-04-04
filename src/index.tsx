import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  createWeb3ReactRoot,
  Web3ReactProvider
} from '@web3-react/core'
import { NetworkContextName } from './constants';
import { Web3Provider } from '@ethersproject/providers';
import reportWebVitals from './reportWebVitals';
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme';

if (window.ethereum) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false; 

  // Refresh page on network change
  // https://github.com/ethers-io/ethers.js/issues/866
  // The "any" network will allow spontaneous network changes
  const provider = new Web3Provider(window.ethereum as any, "any");
  provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        //  window.location.reload();
      }
  });
}

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

window.addEventListener('error', error => {
 console.log(`${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`)
})

ReactDOM.render(
  <>
    <FixedGlobalStyle />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
        <ThemeProvider>
           <ThemedGlobalStyle /> 
            <App />
           </ThemeProvider>
        </Web3ProviderNetwork>
        </Web3ReactProvider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
