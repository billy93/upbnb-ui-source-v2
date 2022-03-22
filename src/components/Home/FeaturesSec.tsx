import React from 'react'
import { Box, Container, SimpleGrid, GridItem, Heading, Text, Image } from '@chakra-ui/react'
import { Element } from 'react-scroll';

export default function FeaturesSec() {
  return (
    <>
    <Element name='Features'>
        <Box className='feature_main'>
            <Container maxW="container.xl">
                <Box className='featur_max_box'>
                <SimpleGrid columns={12} columnGap={1} rowGap={2} >
                    <GridItem colSpan={[12, 12, 12, 6]}>
                        <Box className='feature_text_box' data-aos="fade-up" data-aos-delay="300" data-aos-duration="500">
                            <Heading as="h6">New Features</Heading>
                            <Heading as="h3">Packed With New Innovations</Heading>
                            <Text>
                                <b>UpBNB</b> will launch with multiple new features including a drip fault, marketing vault, and some unique new functions never before seen in Defi. With the addition of hte drip vault we will have a multi-layered double auto-compounding staking system with predictable APY. O very high apy at launch to encourage buy-side market activity A percent of all trade fees as well as <b>11%</b> of the value raised will be given directly to the Marketing Vault with spends happening in a verifiable way. We've also included some cool new functions including the ability to convert any percent of price impact directly into liquidity without affecting the user slippage.
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 6]}>
                        <Box className='feature_img_prnt' data-aos="zoom-in" data-aos-delay="500">
                            <Image src='img/newfeature_img.png' alt='' />
                        </Box>
                    </GridItem>
                </SimpleGrid>
                </Box>
            </Container>
        </Box>
    </Element>
    </>
  )
}
