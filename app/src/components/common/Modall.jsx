import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalHeader,
    IconButton,
} from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'

function Modall({
    onClose,
    isOpen,
    size = 'md',
    title,
    children,
    overlayClick = true,
}) {
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            size={size}
            isCentered
            scrollBehavior='inside'
            closeOnOverlayClick={overlayClick}
            motionPreset='scale'>
            <ModalOverlay />
            <ModalContent p='20px' borderRadius='10px' className='modal'>
                <ModalCloseButton
                    top='1rem'
                    right='1rem'
                    icon={<FaTimes />}
                    bg='gray.100'
                    _active={{ outline: 'none' }}
                    _focus={{ outline: 'none' }}
                />
                <ModalHeader fontSize='2xl'>{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Modall
