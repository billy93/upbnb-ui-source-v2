import React from 'react'
import { Box, Container, Image, Heading, Text } from '@chakra-ui/react'
import { Element } from 'react-scroll';

export default function AboutusSec() {
  return (
    <>
    <Element name='About'>
        <Box className="aboutus_main" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            <Container maxW="container.xl">
                <Box className='about_border_box'>
                    <Box className='sadow_box'>
                        <Heading as="h6">About Us</Heading>
                        <Heading as="h3">Firmly Established Team</Heading>
                    </Box>
                    <Box className='about_text_prnt'>
                        <Text>
                            The <b>ROOT</b> team has been releasing innovative defi products for almost 2 years, if people say its impossible, we'll give it a try. We take an entirely unique approach to mechanic design and ecosystem expansion while always trying to look at markets from new perspectives. We have two main classes of tokens, <b>UpTokens</b> (ROOTS) and <b>upOnlyTokens</b> (FLOWERS). UpTokens such as upBNB are named by the token they are paired against in the main liquidity pool. UpOnlyTokens use a fully redefined market structure based on valume and they never go down in price, price up on buy and price up on sell.
                        </Text>
                    </Box>
                    <Image src='img/upcro_ic.svg' className='upcro_ic' />
                </Box>
            </Container>
        </Box>
    </Element>
    </>
  )
}
