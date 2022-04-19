import React, {useState} from 'react';
import styled from 'styled-components';
import { Button } from '@chakra-ui/react';
import Loader from '../Loader'

const StyledLoader = styled(Loader)`
  margin-right: 1rem;
`
declare const window: any

export default function SwitchNetwork() {
    const [loading, setLoading] = useState<boolean>(false)

    const BSC =
      [{
        chainId: '0x38',
        chainName: 'BSC',
        nativeCurrency: {
          name: 'Binance Coin',
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bsccan.com/']
      }]

    const addNetwork = (params: any) =>{
        setLoading(true)
        window.ethereum.request({ method: 'wallet_addEthereumChain', params })
          .then(() => {
            setLoading(false)
          })
          .catch((error: Error) => console.log( `Error: ${error.message}`))
    }
    return (
      <Button onClick={() => addNetwork(BSC)} >
        {loading
            ? <><StyledLoader stroke="#FFF" />Switching Networks...</>
            : 'Switch to Binance Smart Chain'
        }
      </Button>
    )
}
