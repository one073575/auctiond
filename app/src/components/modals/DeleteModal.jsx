import React from 'react'
import { Box, Button, Alert, Text, AlertIcon, HStack } from '@chakra-ui/react'
import Modall from '../common/Modall'

function DeleteModal({ delFunc, id, loading, onClose, isOpen, label }) {
    return (
        <Modall
            size='md'
            isOpen={isOpen}
            onClose={onClose}
            title='Delete Action'>
            <Box>
                <Alert
                    status='error'
                    borderRadius='10px'
                    p='20px'
                    alignItems='flex-start'>
                    <AlertIcon />
                    Are you sure you want to delete {label}?
                </Alert>

                <Box
                    as={HStack}
                    mt='2rem'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Button
                        height='2.5rem'
                        borderRadius='10px'
                        width='40%'
                        colorScheme='gray'
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        height='2.5rem'
                        borderRadius='10px'
                        width='40%'
                        isDisabled={loading}
                        colorScheme='red'
                        isLoading={loading}
                        onClick={() => delFunc(id)}>
                        <Text as='span'>Delete</Text>
                    </Button>
                </Box>
            </Box>
        </Modall>
    )
}

export default DeleteModal
