import React from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    Text,
    Button
} from '@chakra-ui/react';

const ModalWallet = (props:any) => {
    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Connect to a Wallet</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight='bold' mb='1rem'>
                    You can scroll the content behind the modal
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default ModalWallet;