import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
    Heading,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'
import { useAuth } from '../../context/AuthProvider'
import DeleteAccountModal from '../modals/DeleteAccountModal'
import { clearBidStore } from '../../store/slices/Bids'
import { clearOrderStore } from '../../store/slices/Orders'
import { clearProductStore } from '../../store/slices/Products'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function DeleteAccount() {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { profileDeleted, logout } = useAuth()
    const dispatch = useDispatch()
    const history = useHistory()

    const clearUserState = useCallback(async () => {
        logout()
        dispatch(clearBidStore())
        dispatch(clearOrderStore())
        dispatch(clearProductStore())
        history.push('/')
    }, [])

    useEffect(() => {
        if (profileDeleted) {
            clearUserState()
        }
    }, [profileDeleted])
    return (
        <>
            <DeleteAccountModal onClose={onClose} isOpen={isOpen} />
            <Box
                shadow='lg'
                borderRadius='10px'
                p='20px 30px'
                bg='red.50'
                border='3px solid'
                borderColor='red.600'>
                <Heading size='md' color='red.600'>
                    Delete your account
                </Heading>
                <Divider my='2rem' />
                <Alert
                    status='error'
                    alignItems='flex-start'
                    borderRadius='10px'>
                    <AlertIcon />
                    <Text>
                        This action is not recommended. Deleting your account
                        will disable and remove all products that you have
                        posted, delete all your orders, and remove all details
                        as well.Be cautious of the action because it is
                        permanent
                    </Text>
                </Alert>

                <Button
                    height='2.5rem'
                    borderRadius='5px'
                    colorScheme='red'
                    width='100%'
                    onClick={onOpen}
                    my='2rem'>
                    Delete your account
                </Button>
            </Box>
        </>
    )
}

export default DeleteAccount
