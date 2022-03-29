import { Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/common/Layout'
import WishListList from '../components/wishlist/WishListList'
import { useAlert } from '../context/AlertProvider'
import { useAuth } from '../context/AuthProvider'
import { usePopup } from '../context/PopupProvider'
import { fetchWishlist, setWishLoadingState } from '../store/slices/Wishlist'
import invoke from '../utils/axios.config'

function WishList() {
    const { user } = useAuth()
    const dispatch = useDispatch()
    const { setError } = useAlert()
    const { registerOpen, loginOpen } = usePopup()
    const { wishlist, loading } = useSelector((state) => state.wishlist)

    const fetchWishList = useCallback(
        async (userId) => {
            try {
                dispatch(setWishLoadingState(true))

                const { data = {} } = await invoke('GET', `wishlist/${userId}`)

                dispatch(fetchWishlist(data.products))
                dispatch(setWishLoadingState(false))
            } catch (error) {
                dispatch(setWishLoadingState(false))
                setError(error.response.data || 'Something went wrong')
            }
        },
        [dispatch]
    )

    useEffect(() => {
        if (user) {
            fetchWishList(user?.id)
        }
    }, [user])
    return (
        <Layout title='wish list'>
            <Box height='auto' width='100%'>
                {user ? (
                    <WishListList products={wishlist} loading={loading} />
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

export default WishList
