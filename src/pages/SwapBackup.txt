import React from 'react'
import { Box, Container, Heading, Text, Button, Image } from '@chakra-ui/react'
import LayoutTwo from './LayoutTwo'
import ReactSelect from 'react-select';

const currency = [
    {
        label: 'upBNB',
        value: 0,
        image: '/img/upcro_coin_ic.svg',
    },
    {
        label: 'BTC',
        value: 1,
        image: '/img/btc_coin_ic.svg',
    },
    {
        label: 'upBNB',
        value: 2,
        image: '/img/upcro_coin_ic.svg',
    }
];
const currencytwo = [
{
    label: 'BTC',
    value: 0,
    image: '/img/btc_coin_ic.svg',
},
{
    label: 'upBNB',
    value: 1,
    image: '/img/upcro_coin_ic.svg',
},
{
    label: 'BTC',
    value: 2,
    image: '/img/btc_coin_ic.svg',
}
];
  

export default function Swap() {
  return (
    <>
        <LayoutTwo>
            <Box className='swap_main'>
                <Container maxW="container.xl">
                    <Box className='swap_border_Box'>
                        <Heading as="h4">Swap</Heading>
                        <Box className='spwa_cntnt_dark_box'>
                            <Box className='swap_upcro_brdr_bx'>
                                <Box className='flex_bx'>
                                    <input type="number" value="281.594" />
                                    <Box className='slect_box'>
                                        <ReactSelect
                                            className='select_one'
                                            classNamePrefix="slct"
                                            value={currency}
                                            options={currency}
                                            formatOptionLabel={currency => (
                                            <Box className='slect_bg'>
                                            <div className="country-option slect_bg">
                                                <img src={currency.image} alt="country-image" />
                                                <span >{currency.label}</span>
                                            </div>
                                            </Box>
                                            )}
                                        /> 
                                    </Box>
                                </Box>
                                <Box className='flex_bx flex_bx_02'>
                                    <Text>281.594</Text>
                                    <Text>Balance: 0.00</Text>
                                </Box>
                            </Box>
                            <Button className='swap_center_btn'><Image src='img/down_arw_ic.svg' /></Button>
                            <Box className='swap_upcro_brdr_bx swap_btc_brdr_bx'>
                                <Box className='flex_bx'>
                                    <input type="number" value="3655.548654" />
                                    <Box className='slect_box'>
                                        <ReactSelect
                                            className='select_one'
                                            value={currencytwo}
                                            classNamePrefix="slct"
                                            options={currencytwo}
                                            formatOptionLabel={currencytwo => (
                                            <div className="country-option slect_bg">
                                                <img src={currencytwo.image} alt="country-image" />
                                                <span>{currencytwo.label}</span>
                                            </div>
                                            )}
                                        /> 
                                    </Box>      
                                </Box>
                                <Box className='flex_bx flex_bx_02'>
                                    <Text>$256.312</Text>
                                    <Text>Balance: 1,688,648</Text>
                                </Box>
                            </Box>
                            <Box className='text_row_darc'>
                                <Text>1 upBNB = 0.00846454 BTC</Text>
                                <Text>($0.00065486635)</Text>
                                <Text className='last_p'>Gas: $32.455</Text>
                            </Box>
                            <Button className='stake_full_btn'>Stake</Button>
                        </Box>
                    </Box>
                    <Box className='contracts_box'>
                        <Heading as="h4">Contracts</Heading>
                        <Box className='upcro_copyflex'>
                            <Heading as="h6">upBNB<Text>0xb0620........f790f<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                            <Heading as="h6" className='right_h6'>xUpBNB<Text>0x78Bf85......ed90e<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </LayoutTwo>
    </>
  )
}
