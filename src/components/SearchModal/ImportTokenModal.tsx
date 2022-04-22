import React, {useEffect} from 'react'
import { Box, Text, Image, Heading, Button, Select, FormControl, FormLabel, SimpleGrid, GridItem } from "@chakra-ui/react";
import { Switch } from '@chakra-ui/react'
import ReactSelect from 'react-select';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
// import ManageModel from './ManageModel';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

export default function ImportTokenModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        document.body.classList.toggle('modalopenslcttkn', isOpen);
    },[isOpen])
  return (
    <>
            <Button onClick={onOpen} className='select_tocan_root_box'>
                <Box className='root_img_text_box'>
                    <Image src='/img/root_ic.svg' />
                    <Box >
                        <Heading as="h6" >upBNB</Heading>
                        <Text>ROOTKIT</Text>
                    </Box>
                </Box>
                <Heading as="h6" className=''>0.06273</Heading>
            </Button>
            <Box className=''>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent className='select_tocan_popup imp_tocan_popup' >
                <ModalHeader>Import Token</ModalHeader>
                <ModalCloseButton />
                <ModalCloseButton className='back_btn_img' />
                <ModalBody className='containt_cntr'>
                    <Box className='select_tocan_cntnt'>
                        <Box className='root_bnb_box'>
                            <Box className='root_bnb_raw'>
                                <Image src='/img/root_ic.svg' />
                                <Heading as="h6" >upBNB</Heading>
                                <Text>ROOTKIT</Text>
                            </Box>
                            <Text className='alt_text'>
                                0x1759254EB142bcF0175347DA0f3c19235538a9A
                            </Text>
                            <Box className='unknwon_bx'>
                                <Image src='/img/jam_tringle_ic.svg' />
                                <Text>Unknown source</Text>
                            </Box>
                        </Box>
                        <Box className='trade_at_your_risk_box'>
                            <Image src='/img/jam_tringlered_ic.svg' className='jam_tringlered_ic' />
                            <Heading as="h5">Trade at your owk risk!</Heading>
                            <Text>Anyone an create a token, including creating fake versions of exiting tokens that claim to represent projects.</Text>
                            <Heading as="h6">If you purchase this token, you may not be avle to sell it back.</Heading>
                            <Checkbox className='undersan_check_box'>I understand</Checkbox>
                        </Box>
                    </Box>
                    <Box className='manage_btn_prnt'>
                        <Button className='imp_ntn_prnt'>Import</Button>
                    </Box>
                </ModalBody>
                </ModalContent>
            </Modal>
          </Box>
    </>
  )
}
