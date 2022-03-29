import React from 'react'
import {
    Badge,
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Stack,
    VStack,
} from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWishLoadingState, deleteWish } from '../../store/slices/Wishlist'
import { setCartLoadingState, addCartItem } from '../../store/slices/Cart'
import { useAlert } from '../../context/AlertProvider'
import invoke from '../../utils/axios.config'
import { useAuth } from '../../context/AuthProvider'
import { v4 as uuidv4 } from 'uuid'

function WishListItem({ product }) {
    const { user } = useAuth()
    const dispatch = useDispatch()
    const { setError, setMessage } = useAlert()
    const { loading } = useSelector((state) => state.wishlist)

    const addToCart = async () => {
        try {
            dispatch(setCartLoadingState(true))

            const params = {
                id: uuidv4(),
                userId: user.id,
                productId: product?.id,
                product,
                quantity: 1,
                created: Date.now(),
            }

            const cartExists = JSON.parse(localStorage.getItem('cart'))

            if (cartExists) {
                const isInCart = cartExists.find(
                    (item) => item.productId === product.id
                )

                if (isInCart) {
                    setError('Product already in cart')
                    dispatch(setCartLoadingState(false))
                    return
                }
                // get the item and add the new item to the cart
                const newProducts = [...cartExists, params]
                dispatch(addCartItem(params))
                localStorage.setItem('cart', JSON.stringify(newProducts))
            } else {
                // create a new cart
                localStorage.setItem('cart', JSON.stringify([params]))
                dispatch(addCartItem(params))
            }

            setMessage('Product added to cart')
            dispatch(setCartLoadingState(false))
        } catch (error) {
            dispatch(setCartLoadingState(false))
            setError(error.message || 'Something went wrong')
        }
    }

    const deleteWishItem = async (id) => {
        try {
            dispatch(setWishLoadingState(true))

            const { data = {} } = await invoke(
                'DELETE',
                `wishlist/${user?.id}/${id}`
            )

            dispatch(deleteWish(data.product))
            setMessage(data.message)

            dispatch(setWishLoadingState(false))
        } catch (error) {
            setError(error.response.data || 'Something went wrong')
            dispatch(setWishLoadingState(false))
        }
    }
    return (
        <Box height='30vh' bg='gray.50' p='10px' borderRadius='10px'>
            <Stack
                direction={['column', 'column', 'row']}
                width='100%'
                spacing='5'
                height='100%'>
                <Box width='30%' height='100%'>
                    <Image
                        src={product?.images[0].url}
                        width='100%'
                        height='100%'
                        objectFit='cover'
                        borderRadius='10px'
                    />
                </Box>

                <HStack
                    width='70%'
                    height='100%'
                    justifyContent='space-between'
                    p='20px'
                    alignItems='flex-start'>
                    <VStack
                        spacing='2'
                        alignItems='flex-start'
                        height='100%'
                        justifyContent='space-between'>
                        <VStack
                            alignItems='flex-start'
                            spacing='2'
                            justifyContent='space-between'>
                            <Heading fontSize='md' color='blue.700'>
                                KSH {product?.price}
                            </Heading>
                            <Heading
                                as={Link}
                                to={`/products/${product?.slug}`}
                                fontSize='2xl'>
                                {product?.name}
                            </Heading>

                            <HStack>
                                <Badge p='5px 10px' borderRadius='5px'>
                                    Status: {product?.status}
                                </Badge>
                                <Badge p='5px 10px' borderRadius='5px'>
                                    Condition: {product?.condition}
                                </Badge>
                                <Badge p='5px 10px' borderRadius='5px'>
                                    Category: {product?.category}
                                </Badge>
                            </HStack>
                        </VStack>
                    </VStack>
                    <Stack
                        height='100%'
                        direction={['row-reverse', 'row-reverse', 'column']}
                        justifyContent='space-between'
                        alignItems='flex-end'>
                        <IconButton
                            variant='outline'
                            isLoading={loading}
                            onClick={async () => {
                                await deleteWishItem(product?.id)
                            }}
                            icon={<FaTimes />}
                            _focus={{ outline: ' none' }}
                            _active={{ outline: ' none' }}
                        />
                        <Button
                            colorScheme='blue'
                            height='2.5rem'
                            onClick={addToCart}
                            _active={{ outline: ' none' }}
                            _focus={{ outline: 'none' }}>
                            Add to cart 🛍
                        </Button>
                    </Stack>
                </HStack>
            </Stack>
        </Box>
    )
}

WishListItem.defaultProps = {
    product: {},
}

export default WishListItem
