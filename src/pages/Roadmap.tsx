import React from 'react'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import LayoutTwo from './LayoutTwo'
import {
    ListItem,
    UnorderedList,
  } from '@chakra-ui/react'

export default function Roadmap() {
  return (
    <>
        <LayoutTwo>
            <Box className='roadmap_main'>
                <Container maxW="container.xl">
                    <Heading as="h3">Roadmap</Heading>
                    <Box className='radmp_cntnt_prnt'>
                        <Box className='roadmp_ready_box'>
                            <Box className='ready_text_prnt'>
                                <Heading as="h4">Ready</Heading>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx'>
                                    <Heading as="h2"><span>01</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">Vault Activation</Heading>
                                    <UnorderedList>
                                        <ListItem>auto  vault activation</ListItem>
                                        <ListItem>constant buy pressure</ListItem>
                                        <ListItem>first test of infinite buy loop</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx'>
                                    <Heading as="h2"><span>02</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">Staking rewards boosted</Heading>
                                    <UnorderedList>
                                        <ListItem>500k upCRO boosts</ListItem>
                                        <ListItem>3x weekly then 3x every 2 weeks</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx'>
                                    <Heading as="h2"><span>03</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">17th AMA with Sylant</Heading>
                                    <UnorderedList>
                                        <ListItem>New details to be revealed...</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='roadmp_ready_box roadmp_devlop_box'>
                            <Box className='ready_text_prnt'>
                                <Heading as="h4">in development</Heading>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx'>
                                    <Heading as="h2"><span>04</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">Website updates</Heading>
                                    <UnorderedList>
                                        <ListItem>updates info on tech</ListItem>
                                        <ListItem>features</ListItem>
                                        <ListItem>plans</ListItem>
                                        <ListItem>vision</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx'>
                                    <Heading as="h2"><span>05</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">USD pool launci on different DEX</Heading>
                                    <Text>Dex expansion to reach more users</Text>
                                    <UnorderedList>
                                        <ListItem>USD trading  access</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx'>
                                    <Heading as="h2"><span>06</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">Launch CRO pool on a nex DEX or TWO</Heading>
                                    <UnorderedList>
                                        <ListItem>expansion to more dex’x</ListItem>
                                        <ListItem>increases protocol value inflow options</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='roadmp_ready_box roadmp_future_box'>
                            <Box className='ready_text_prnt'>
                                <Heading as="h4">FUTURE PLANS</Heading>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx'>
                                    <Heading as="h2"><span>07</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">USD liquidity shifter </Heading>
                                    <UnorderedList>
                                        <ListItem>new contract and feature upgrade</ListItem>
                                        <ListItem>shifts liquidity between  pools to gain  from market moves</ListItem>
                                        <ListItem>protcet system USD value on dumps</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx'>
                                    <Heading as="h2"><span>08</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">Major app sute updates</Heading>
                                    <UnorderedList>
                                        <ListItem>redesign</ListItem>
                                        <ListItem>highly detailed data page</ListItem>
                                        <ListItem>visual system map</ListItem>
                                        <ListItem>social feeds</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx'>
                                    <Heading as="h2"><span>09</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">Activate DAO</Heading>
                                    <UnorderedList>
                                        <ListItem>Clear DAO objectives</ListItem>
                                        <ListItem>Clear mission</ListItem>
                                        <ListItem>Clear long termvision</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                            <Box className='ready_cntnt_inn'>
                                <Box className='number_bx number_bx_last'>
                                    <Heading as="h2"><span>10</span></Heading>
                                </Box>
                                <Box className='vaulavtin'>
                                    <Heading as="h5">???</Heading>
                                    <UnorderedList>
                                        <ListItem>The DAO mission begins...</ListItem>
                                    </UnorderedList>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </LayoutTwo>
    </>
  )
}
