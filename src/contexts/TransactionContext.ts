import { createContext } from 'react';
import { TransactionResponse } from '@ethersproject/providers';

export interface TransactionContextInterface {
    addPendingTransaction: (description: string, txResponse: TransactionResponse) => void
}

const TransactionContext = createContext<TransactionContextInterface>({
    addPendingTransaction: (description: string, txResponse: TransactionResponse) => {}
  });
  
  export default TransactionContext; 