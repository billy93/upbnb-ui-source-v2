import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon
} from '@chakra-ui/icons';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10)
    })
  }, [])
  return (
    <>
      <Box as='header'  className={scroll ? "header scrolled" : "header"}>
        <Flex
          color={useColorModeValue('gray.600', 'white')}
          align={'center'}
          className="header_inn"
          >
          <Flex
            flex={{ base: 1, lg: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', lg: 'none' }} 
            className="collpse_btn_prnt" >
            <IconButton
              className="collpse_btn"
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5}  />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} className="main_logo_prnt">
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              >
              <NavLink to="/">
                <Image src='img/logo.png' alt='' className='main_logo'/>
              </NavLink>
            </Text>

            <Flex display={{ base: 'none', lg: 'flex' }} ml={10} className="desc_linl_pnt">
              {/* <DesktopNav /> */}
              <Box className='link_prnt'>
              <Link
                to='Introduction'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}>
                INTRODUCTION</Link>
              <Link to='About'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}>ABOUT</Link>
                <Link to='Technology'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}>TECHNOLOGY</Link>
                <Link to='Features'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}>FEATURES</Link>
                <Link to='Team'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}>TEAM</Link>
                <NavLink to="/articles">ARTICLE</NavLink>
                <Link to='Roadmap'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}>ROADMAP</Link>
                <Link to='HowToBuy'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500} className='last_link'>HOW TO BUY</Link>
              </Box>
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            className="enterapp_prnt"
            >
            <NavLink
              to="/dashboard"
              className="enterapp_btn"
              >
              ENTER APP
            </NavLink>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity className='nav_callpse'>
          {/* <MobileNav /> */}
          <Box className='mobl_link_prnt'>
            <Box className='link_prnt'>
            <Link
                to='Introduction'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}>
                INTRODUCTION</Link>
              <Link to='About'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}>ABOUT</Link>
                <Link to='Technology'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}>TECHNOLOGY</Link>
                <Link to='Features'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}>FEATURES</Link>
                <Link to='Team'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}>TEAM</Link>
                <NavLink to="/articles">ARTICLE</NavLink>
                <Link to='Roadmap'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}>ROADMAP</Link>
                <Link to='HowToBuy'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500} className='last_link'>HOW TO BUY</Link>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </>
  )
}
