import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
// import Sidebar from '../layouttwo/Sidebar';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import WalletModal from "../components/ModalWallet/ModalWallet";
import Web3Status from '../components/Web3Status'
import { supportedChain } from '../utils'
import { getDisplayBalance } from '../utils/formatBalance'
import useBalance from '../hooks/useBalance'
import { BASE_DECIMALS, BASE_TICKER } from "../constants";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Link,
  Button,
} from '@chakra-ui/react';
import {
  FiMenu,
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  :focus {
    border: 1px solid blue;
  }
  /* :hover {
    background-color: ${({ theme, active }) => (!active ? theme.bg2 : theme.bg4)};
  } */
`
const BalanceText = styled.div`
  font-weight: 500;
  padding: 0 0.5rem 0 0.75rem;
  flex-shrink:0;
  color: ${({ theme }) => theme.text2};
`
const LayoutTwo = (props:any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const toggleWalletModal = () => { setModalOpen(!modalOpen) }

    return (
      <Box minH="100vh">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', xl: 'block' }}
          modalOpen={modalOpen}
          toggleWalletModal={toggleWalletModal}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent className='drawer_slider'>
            <SidebarContent onClose={onClose} modalOpen={modalOpen} toggleWalletModal={toggleWalletModal} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} toggleWalletModal={toggleWalletModal}  />
        <Box ml={{ base: 0, xl: "300px" }} className="sidebar_main_prnt">
          {props.children}
        </Box>
      </Box>
    );
  }
  
  interface SidebarProps extends BoxProps {
    onClose: () => void;
    toggleWalletModal: () => void;
    modalOpen: boolean;
  }
  
  const SidebarContent = ({ onClose,toggleWalletModal,modalOpen, ...rest }: SidebarProps) => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split('/');
    return (
      <Box
        transition="0.3s ease"
        w={{ base: 'full', xl: "300px" }}
        pos="fixed"
        zIndex={999999}
        h="full"
        {...rest}
        className="sidebar_main"
        >
        <WalletModal walletModalOpen={modalOpen} toggleWalletModal={toggleWalletModal} />
        <Flex  alignItems="center" className='sidebar_logo_prnt'>
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            <NavLink to="/">
              <Image src="img/dahboard_logo.png" alt="" />
            </NavLink>
          </Text>
          <CloseButton display={{ base: 'flex', xl: 'none' }} onClick={onClose} className="sidebar_close_btn" />
        </Flex>
        <Flex className='dashboard_links_prnt'>
          <Text>App</Text>
          <Flex className='dashboard_links'>
            <NavLink
              to='/dashboard'
              className={splitLocation[1] === 'dashboard' ? 'active' : ''}
            >
              <Image src='img/sidebar_link_ic01.svg' alt="" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to='/staking'
              className={splitLocation[1] === '' ? 'active' : ''}
            >
              <Image src='img/sidebar_link_ic02.svg' alt="" />
              <span>Stake</span>
            </NavLink>
            <NavLink
              to='/swap'
              className={splitLocation[1] === '' ? 'active' : ''}
            >
              <Image src='img/sidebar_link_ic03.svg' alt="" />
              <span>Swap</span>
            </NavLink>
            <NavLink
              to='/pools'
              className={splitLocation[1] === '' ? 'active' : ''}
            >
              <Image src='img/sidebar_link_ic04.svg' alt="" />
              <span>Pools</span>
            </NavLink>
            <NavLink
              to='/faq'
              className={splitLocation[1] === '' ? 'active' : ''}
            >
              <Image src='img/sidebar_link_ic06.svg' alt="" />
              <span>FAQ</span>
            </NavLink>
            <NavLink
              to='/roadmap'
              className={splitLocation[1] === '' ? 'active' : ''}
            >
              <Image src='img/sidebar_link_ic06.svg' alt="" />
              <span>Roadmap</span>
            </NavLink>
          </Flex>
        </Flex>
        <Flex className='social_links_prnt'>
          <Text>Social Media</Text>
          <Flex className='socl_links_dash'>
            <Link href='#'><Image src='img/twitter_ic.svg' alt="" /><span>Twitter</span></Link>
            <Link href='#'><Image src='img/telegram_ic.svg' alt="" /><span>Telegram</span></Link>
            <Link href='#'><Image src='img/discord_ic.svg' alt="" /><span>Discord</span></Link>
            <Link href='#'><Image src='img/medium_ic.svg' alt="" /><span>Medium</span></Link>
          </Flex>
        </Flex>
        {/* {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))} */}
      </Box>
    );
  };
  
  interface MobileProps extends FlexProps {
    onOpen: () => void;
    toggleWalletModal: () => void;
  }
  const MobileNav = ({ onOpen, toggleWalletModal, ...rest }: MobileProps) => {
      const [scroll, setScroll] = useState(false)
      const { account, chainId } = useWeb3React<Web3Provider>();
      const balance = useBalance();
      
      useEffect(() => {
        window.addEventListener("scroll", () => {
          setScroll(window.scrollY > 10)
        })
      }, [])
    return (
      <Flex
        ml={{ base: 0, xl: 60 }}
        alignItems="center"
        justifyContent={{ base: 'space-between', xl: 'flex-end' }}
        className={scroll ? "sidebar_header scrolled" : "sidebar_header"}
        {...rest}>
        <IconButton
          display={{ base: 'flex', xl: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          className="dashbourd_menu_btn"
          icon={<FiMenu />}
        />
        <HStack spacing={{ base: '0', xl: '6' }} >
          <Flex alignItems={'center'} className="sidebar_header_btns">
            {
              !!account ? (
                <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {chainId && supportedChain(chainId!) && account && balance && (
                <BalanceText>
                  {getDisplayBalance(balance!, 2, BASE_DECIMALS)} {BASE_TICKER}
                </BalanceText>
              )}
              <Web3Status />
            </AccountElement>
              ) : (
                  <>
                  <Button as="a" href="#" >Contract Address List</Button>
                  <Button as="a" href="#" onClick={toggleWalletModal} className='cnct_wallet_btn'>Connect Wallet</Button>
                  </>
              )
            }
          </Flex>
        </HStack>
      </Flex>
  );
};

export default LayoutTwo;
