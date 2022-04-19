import React from 'react';
import './assets/css/App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { ChakraProvider } from '@chakra-ui/react'
import { TransactionResponse } from "@ethersproject/providers";
import Web3ReactManager from './components/web3ReactManager';
import TransactionContext from './contexts/TransactionContext';
import { AppContextProvider } from './contexts/AppContext';
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import { Provider } from 'react-redux'
import store from './state'

function App() {
  const addPendingTransaction = (description: string, txResponse: TransactionResponse) => {
    txResponse.wait().then(txReceipt => {
      // addToast(
      //   txReceipt.status === 1 ? IconType.Success : IconType.Failure,
      //   `${description} ${txReceipt.status === 1 ? "Completed" : "Failed"}`,
      //   txReceipt.transactionHash)
    })
  }

  function Updaters() {
    return (
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
      </>
    )
  }
  return (
    <>
      <ChakraProvider>
        <Provider store={store}>
          <TransactionContext.Provider value={{ addPendingTransaction }}>
            <Updaters />
            <AppContextProvider>
              <Web3ReactManager>
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </Web3ReactManager>
            </AppContextProvider>
           </TransactionContext.Provider> 
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
