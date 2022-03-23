import React from 'react'
import { Box, SimpleGrid, GridItem, Heading, Text, Button, Image } from '@chakra-ui/react'
import { Element } from 'react-scroll';

export default function HowToBuySec() {
  return (
    <>
    <Element name='HowToBuy'>
        <Box className='howtobuy_main' data-aos="fade-up" data-aos-delay="500">
            <Box className='howtobuy_inn'>
                <SimpleGrid columns={12} columnGap={0} rowGap={2} >
                    <GridItem colSpan={[12, 12, 12, 6]}>
                        <Box className='howtobuy_cntnt'>
                            <Box className='htb_cntnt_box'>
                                <Heading as="h3">How to buy</Heading>
                                <Text>Head on over to PancakeSwap, connect your wallet and set your slippage to 4%</Text>
                                <Button as="a" href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x1759254eb142bcf0175347d5a0f3c19235538a9a" target="_blank">CHECK OUR ARTICLE HERE</Button>
                            </Box>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 6]}>
                    <Box className='howtobuy_img'>
                        <Image src='img/howtobuy_img.png' alt='' />
                    </Box>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    </Element>
    </>
  )
}
