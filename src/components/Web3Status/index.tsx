import React, { useState } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { darken, lighten, transparentize } from 'polished'
import { Activity } from 'react-feather'
import WalletConnectIcon from '../../assets/img/walletConnectIcon.svg'
import { injected, walletconnect } from '../../connectors'
import { shortenAddress, supportedChain } from '../../utils'
import { ButtonSecondary } from '../Button'
// import { Button } from '@chakra-ui/react'
import Identicon from '../IdentIcon'

import WalletModal from '../ModalWallet/ModalWallet'
import styled, { css } from 'styled-components'
import { NetworkContextName } from '../../constants'

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  background-color: ${({ theme }) => transparentize(0.7, theme.primary1)};
  border: none;
  color: ${({ theme }) => theme.primaryText1};
  font-weight: 500;

  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.primary1)};
    color: ${({ theme }) => theme.primaryText1};
  }

  ${({ faded }) =>
    faded &&
    css`
      background-color: ${({ theme }) => transparentize(0.7, theme.primary1)};
      border: 1px solid ${({ theme }) => theme.primary1};
      color: ${({ theme }) => theme.text1};

      :hover,
      :focus {
        border: 1px solid ${({ theme }) => darken(0.05, theme.primary1)};
        color: ${({ theme }) => darken(0.05, theme.text1)};
      }
    `}
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background-color: ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg2)};
  border: 1px solid ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg3)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ pending, theme }) => (pending ? darken(0.05, theme.primary1) : lighten(0.05, theme.bg2))};

    :focus {
      border: 1px solid ${({ pending, theme }) => (pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg3))};
    }
  }
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5em 0 0.25em;
  font-size: 1em;
  width: fit-content;
  font-weight: 500;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  font-size:0.75em;
`};
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`

const HideExtraSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return <Identicon />
  } else if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} alt={''} />
      </IconWrapper>
    )  
  }
  return null
}

export default function Web3Status() {
  const { active, account, connector, error, chainId } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)
  
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const toggleWalletModal = () => { setModalOpen(!modalOpen) }
  const suppotedChain = chainId && supportedChain(chainId)
  if (!contextNetwork.active && !active) {
    return null
  }
  if (error || (account && !suppotedChain)) {
    return (
      <>
        <Web3StatusError onClick={toggleWalletModal}>
          <NetworkIcon />
          <Text>{error instanceof UnsupportedChainIdError || !suppotedChain ? 'Wrong Network' : 'Error'}</Text>
        </Web3StatusError>
        <WalletModal walletModalOpen={modalOpen} toggleWalletModal={toggleWalletModal} />
      </>
    )}

  if (account) {
    return (
      <>
        <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal}>
          <Text>{shortenAddress(account)}</Text>
          <HideExtraSmall>{connector && <StatusIcon connector={connector} />}</HideExtraSmall>
        </Web3StatusConnected>
        <WalletModal walletModalOpen={modalOpen} toggleWalletModal={toggleWalletModal} />
      </>
    )  
  } else {
    return (
      <>
        <Web3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
          <Text>{'Connect to a wallet'}</Text>
        </Web3StatusConnect>
        <WalletModal walletModalOpen={modalOpen} toggleWalletModal={toggleWalletModal} />
      </>
    )
  }
}