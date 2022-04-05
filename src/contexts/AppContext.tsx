import React, { createContext, useState, ReactNode } from 'react';
import { Chain } from '../constants';

export interface IAppContextInterface {
    chain: Chain
    setChain: (chain: Chain) => void
}

const AppContext = createContext<IAppContextInterface>({
    chain: Chain.BSC,
    setChain: (chain: Chain) => {}
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [chain, setChain] = useState<Chain>(Chain.BSC); 

    return (
        <AppContext.Provider value={{
            chain: chain, 
            setChain: setChain}}>
          {children}
        </AppContext.Provider>
    )
}
  
export { AppContext, AppContextProvider }; 