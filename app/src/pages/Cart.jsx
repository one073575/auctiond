import {
    Box,
    Button,
    Center,
    Grid,
    GridItem,
    Heading,
    Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartList from '../components/cart/CartList'
import Checkout from '../components/cart/Checkout'
import Layout from '../components/common/Layout'
import { useAlert } from '../context/AlertProvider'
import { useAuth } from '../context/AuthProvider'
import { usePopup } from '../context/PopupProvider'
import { fetchCartProducts, setCartLoadingState } from '../store/slices/Cart'

function Cart() {
    const { user } = useAuth()
    const { setError } = useAlert()
    const { registerOpen, loginOpen } = usePopup()

    const dispatch = useDispatch()
    const { items, loading } = useSelector((state) => state.cart)

    const fetchCartItems = async (id) => {
        try {
            dispatch(setCartLoadingState(true))
            const data = JSON.parse(localStorage.getItem('cart'))

            const userProducts = data.filter((item) => item.userId === id)

            dispatch(fetchCartProducts(userProducts))
            dispatch(setCartLoadingState(false))
        } catch (error) {
            dispatch(setCartLoadingState(false))
            setError(error.response.data || 'Something went wrong')
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchCartItems(user?.id)
        }
    }, [user?.id])

    return (
        <Layout title='cart'>
            <Box>
                {user ? (
                    <Grid
                        gap='1rem'
                        templateColumns={[
                            'repeat(1, 1fr)',
                            'repeat(1, 1fr)',
                            'repeat(2, 1fr)',
                        ]}>
                        <GridItem colSpan='1'>
                            <Box>
                                <CartList products={items} loading={loading} />
                            </Box>
                        </GridItem>
                        <GridItem colSpan='1'>
                            <Box
                                bg='gray.100'
                                minHeight='40vh'
                                p='20px'
                                borderRadius='10px'>
                                <Checkout items={items} loading={loading} />
                            </Box>
                        </GridItem>
                    </Grid>
                ) : (
                    <Box
                        height='70vh'
                        my='auto'
                        bg='gray.100'
                        p='20px'
                        borderRadius='10px'>
                        <Center
                            height='100%'
                            width='50%'
                            mx='auto'
                            flexDirection='column'>
                            <Heading>You are not logged in </Heading>
                            <Text textAlign='center' my='1rem'>
                                Please login or signup to start exploring and
                                add products to your wish list
                            </Text>

                            <Button
                                height='2.5rem'
                                onClick={loginOpen}
                                colorScheme='blue'
                                _focus={{ outline: 'none' }}
                                _active={{ outline: 'none' }}>
                                Login to continue &rarr;
                            </Button>
                            <Text as='small'>or</Text>
                            <Text
                                color='blue'
                                cursor='pointer'
                                onClick={registerOpen}
                                _hover={{ textDecor: 'underline' }}>
                                Create new account
                            </Text>
                        </Center>
                    </Box>
                )}
            </Box>
        </Layout>
    )
}

export default Cart
