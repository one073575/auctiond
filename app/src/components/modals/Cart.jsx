import { Box, Button, Center } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import Modall from '../common/Modall'

function Cart({ isOpen, onClose, loginOpen }) {
    const { user } = useAuth()
    const history = useHistory()

    return (
        <Modall size='lg' title='In my cart' isOpen={isOpen} onClose={onClose}>
            <Box>
                <Center>My cart items</Center>
                <Center my='2rem'>
                    {!user ? (
                        <Button
                            height='2.5rem'
                            colorScheme='blue'
                            onClick={loginOpen}
                            borderRadius='5px'>
                            Login to continue
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                onClose()
                                history.push('/checkout')
                            }}
                            height='2.5rem'
                            borderRadius='5px'
                            colorScheme='blue'>
                            Proceed to checkout
                        </Button>
                    )}
                </Center>
            </Box>
        </Modall>
    )
}

export default Cart
