import React from 'react'
import { Box, Container, Heading, SimpleGrid, GridItem, Button, Text, Image } from '@chakra-ui/react'
import { Element } from 'react-scroll';

export default function TeamSec() {
  return (
    <>
    <Element name='Team'>
        <Box className='team_main' data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            <Container maxW="container.xl">
                <Box className='about_border_box'>
                    <Box className='sadow_box'>
                        <Heading as="h6">Our Team</Heading>
                        <Heading as="h3">Anon with Trusted Reputation</Heading>
                    </Box>
                    <Box className='team_grid_prnt'>
                        <SimpleGrid columns={12} columnGap={4} rowGap={2} >
                            <GridItem colSpan={[12, 12, 12, 6]}>
                                <Box className='team_p_prnt'>
                                    <Text>
                                        The <b>ROOT</b> Finance team consists of our stalwart leader and resident mad genius, Professor <b>Kronos</b> as well as multiple other anonymous devs, programmers, moderators and community leads. Our identities are known to many in the space and we have been part of the industry since Bitcoin was the only game in town. We believe keeping our privacy is important and that our technology and reputation should stand on their own. We're very proud to note that multiple other teams have now adopted our technology and even found new uses or ways to implement it. Some of these successful mechanisms have been incorporated into our UpToken Ecosystem and we're thrilled to have learned from those who adopted and improved what we created.
                                    </Text>
                                </Box>
                            </GridItem>
                            <GridItem colSpan={[12, 12, 12, 6]}>
                                <Box className='team_p_prnt team_img_prnt'>
                                    <Image src='img/team_img.png' alt='' />
                                </Box>
                            </GridItem>
                        </SimpleGrid>
                    </Box>
                    <Box className='enter_app_btn_prnt'>
                        <Button as="a" href="#" className='enter_app_btn'>ENTER APP</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    </Element>
    </>
  )
}
