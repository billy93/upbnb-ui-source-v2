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
                                <Text>If you've invested into any of our projects in the past, you know that our MGE and the ERC-31337 "elite" wrapper are the secret sauces that set us apart. It's what separates us from any of the overhyped "RFI/Safemoon/EverRise"-type reflection tokens that have tried to imitate us since Summer 2020.</Text>
                                <Button as="a" href="#">CHECK OUR ARTICLE HERE</Button>
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
