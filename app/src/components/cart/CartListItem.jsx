import {
    Badge,
    Box,
    Center,
    Heading,
    HStack,
    IconButton,
    Image,
    Stack,
    VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa'
import {
    updateCartItem,
    setCartLoadingState,
    removeCartItem,
} from '../../store/slices/Cart'
import { useAlert } from '../../context/AlertProvider'

function CartListItem({ item }) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(item?.quantity)
    const { setError } = useAlert()

    async function updateItem(id = '', params = {}) {
        try {
            dispatch(setCartLoadingState(true))
            const cartItems = JSON.parse(localStorage.getItem('cart'))

            const cartItem = cartItems.find((item) => item.id === id)
            if (!cartItem) return

            const update = {
                ...cartItem,
                quantity: params.quantity,
            }

            setQuantity(update.quantity)

            const newCartItems = cartItems.map((item) => {
                if (item.id === id) {
                    item === update
                }
                return item
            })

            localStorage.setItem('cart', JSON.stringify(newCartItems))

            dispatch(updateCartItem(update))
            dispatch(setCartLoadingState(false))
        } catch (error) {
            setQuantity(item?.quantity)
            dispatch(setCartLoadingState(false))
            setError(error.response.data || 'Something went wrong')
        }
    }

    async function removeItemFromCart(id = '') {
        try {
            dispatch(setCartLoadingState(true))
            const cartItems = JSON.parse(localStorage.getItem('cart'))

            const newCartItems = cartItems.filter((item) => item.id !== id)

            localStorage.setItem('cart', JSON.stringify(newCartItems))

            dispatch(removeCartItem(id))
            dispatch(setCartLoadingState(false))
        } catch (error) {
            dispatch(setCartLoadingState(false))
            setError(error.message || 'Something went wrong')
        }
    }

    return (
        <Stack
            direction={['column', 'column', 'column', 'row']}
            height={['auto', 'auto', '25vh']}
            p='10px'
            width='100%'
            spacing='5'
            borderRadius='10px'
            bg='gray.50'>
            <Box width='30%' height='100%'>
                <Image
                    src={item?.product?.images[0].url}
                    alt={item?.product?.name}
                    objectFit='cover'
                    height='100%'
                    width='100%'
                    borderRadius='10px'
                />
            </Box>
            <VStack
                width='70%'
                alignItems='flex-start'
                justifyContent='space-between'
                spacing='0'
                height='100%'>
                <Box width='100%'>
                    <HStack
                        width='100%'
                        justifyContent='space-between'
                        alignItems='flex-start'>
                        <VStack alignItems='flex-start' spacing='0'>
                            <Badge
                                fontSize='md'
                                color='blue'
                                fontWeight='medium'
                                p='5px'
                                borderRadius='5px'>
                                KSH {item?.product?.price}
                            </Badge>
                            <Heading
                                as={Link}
                                to={`/products/${item?.product?.slug}`}
                                fontSize='xl'>
                                {item?.product?.name}
                            </Heading>
                        </VStack>
                        <IconButton
                            onClick={() => removeItemFromCart(item?.id)}
                            variant='outline'
                            icon={<FaTimes />}
                            _focus={{ outline: 'none' }}
                            _active={{ outline: 'none' }}
                        />
                    </HStack>
                    <HStack width='100%' wrap='wrap' gap='5px'>
                        <Badge borderRadius='5px' p='5px'>
                            status: {item?.product?.status}
                        </Badge>
                        <Badge borderRadius='5px' p='5px'>
                            condition: {item?.product?.condition}
                        </Badge>
                        {item?.product?.deal && (
                            <Badge borderRadius='5px' p='5px'>
                                Discount: {item?.product?.discount}%
                            </Badge>
                        )}
                    </HStack>
                </Box>
                <HStack
                    width='100%'
                    wrap='wrap'
                    gap='5px'
                    spacing='1'
                    justifyContent='flex-end'>
                    <IconButton
                        variant='outline'
                        isDisabled={item?.quantity <= 1}
                        onClick={async () => {
                            // reduce quantity
                            if (item?.quantity < 1) return

                            const params = {
                                quantity: item?.quantity - 1,
                            }

                            await updateItem(item?.id, params)
                        }}
                        icon={<FaMinus />}
                        _focus={{ outline: 'none' }}
                        _active={{ outline: 'none' }}
                    />
                    <Center
                        border='1px solid'
                        width='2.5rem'
                        borderRadius='5px'
                        borderColor='gray.200'
                        height='2.5rem'>
                        {quantity}
                    </Center>
                    <IconButton
                        variant='outline'
                        isDisabled={item?.quantity === item?.product?.quantity}
                        icon={<FaPlus />}
                        onClick={async () => {
                            // add quantity
                            if (item?.quantity === item?.product?.quantity)
                                return

                            const params = {
                                quantity: item?.quantity + 1,
                            }

                            await updateItem(item?.id, params)
                        }}
                        _focus={{ outline: 'none' }}
                        _active={{ outline: 'none' }}
                    />
                </HStack>
            </VStack>
        </Stack>
    )
}

CartListItem.defaultProps = {
    item: {},
}

export default CartListItem
