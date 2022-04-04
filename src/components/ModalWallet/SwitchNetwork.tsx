import React, {useState} from 'react';
import styled from 'styled-components';
import { Button } from '@chakra-ui/react';
import Loader from '../Loader/loader'

const StyledLoader = styled(Loader)`
  margin-right: 1rem;
`
declare const window: any

export default function SwitchNetwork() {
    const [loading, setLoading] = useState<boolean>(false)

    const Cronos =
      [{
        chainId: '0x19',
        chainName: 'Cronos',
        nativeCurrency: {
          name: 'Cronos',
          symbol: 'CRO',
          decimals: 18,
        },
        rpcUrls: ['https://evm-cronos.crypto.org'],
        blockExplorerUrls: ['https://cronos.crypto.org/explorer/']
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
      <Button onClick={() => addNetwork(Cronos)} >
        {loading
            ? <><StyledLoader stroke="#FFF" />Switching Networks...</>
            : 'Switch to Cronos'
        }
      </Button>
    )
}
