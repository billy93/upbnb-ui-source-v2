import React from 'react';
import './assets/css/App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { ChakraProvider } from '@chakra-ui/react'
import { TransactionResponse } from "@ethersproject/providers";
import Web3ReactManager from './components/web3ReactManager';
import TransactionContext from './contexts/TransactionContext';
import { AppContextProvider } from './contexts/AppContext';

function App() {
  const addPendingTransaction = (description: string, txResponse: TransactionResponse) => {
    txResponse.wait().then(txReceipt => {
      // addToast(
      //   txReceipt.status === 1 ? IconType.Success : IconType.Failure,
      //   `${description} ${txReceipt.status === 1 ? "Completed" : "Failed"}`,
      //   txReceipt.transactionHash)
    })
  }

  return (
    <>
      <ChakraProvider>
        <TransactionContext.Provider value={{ addPendingTransaction }}>
            <AppContextProvider>
              <Web3ReactManager>
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </Web3ReactManager>
            </AppContextProvider>
           </TransactionContext.Provider> 
      </ChakraProvider>
    </>
  );
}

export default App;
