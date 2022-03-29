import React, { useEffect, useState, useCallback } from 'react'
import {
    Badge,
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Tooltip,
    VStack,
} from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import UserAvatar from '../common/UserAvatar'
import BidComponent from '../Bids/BidComponent'
import BidTimer from '../products/BidTimer'
import { useAuth } from '../../context/AuthProvider'
import invoke from '../../utils/axios.config'
import { updateProduct } from '../../store/slices/Products'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from '../../context/AlertProvider'
import { setWishLoadingState } from '../../store/slices/Wishlist'
import { setCartLoadingState, addCartItem } from '../../store/slices/Cart'
import { v4 as uuidv4 } from 'uuid'

function ProductDetails({ product }) {
    const { user } = useAuth()
    const dispatch = useDispatch()

    const { setMessage, setError } = useAlert()
    const [notBid, setNotBid] = useState(false)

    const { loading } = useSelector((state) => state.wishlist)
    const { loading: cartLoading } = useSelector((state) => state.cart)

    const updateBidStatus = useCallback(async () => {
        if (product?.status === 'bid') {
            const update = {
                status: 'bid ended',
                message: `Bidding for ${product?.name} has just ended.`,
            }
            const { data = {} } = await invoke(
                'PUT',
                `product/${product?.id}?notify=true`,
                update
            )

            dispatch(updateProduct({ id, product: data?.product }))
        } else {
            return
        }
    }, [product])

    const checkBidStatus = (prod) => {
        if (prod?.status === 'bid' || prod?.status === 'bid ended') {
            setNotBid(false)
        } else {
            setNotBid(true)
        }
    }

    const addToWishList = async () => {
        try {
            dispatch(setWishLoadingState(true))

            const params = {
                userId: user.id,
                productId: product?.id,
            }

            const { data = {} } = await invoke('POST', 'wishlist', params)
            setMessage(data.message)

            dispatch(setWishLoadingState(false))
        } catch (error) {
            dispatch(setWishLoadingState(false))
            setError(error.response.data || 'Something went wrong')
        }
    }

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

    // if do notBid is true -> show cart button
    // if product.userid === user.id -> don't show anything
    // if product status === bid || bid ended -> don't show cart button

    useEffect(() => {
        if (product) {
            checkBidStatus(product)
        }
    }, [product])

    return (
        <Box>
            <Heading fontSize='3xl'>{product?.name}</Heading>
            <Box my='1rem'>
                <UserAvatar
                    userId={product?.userId}
                    hasContact={product?.status === 'bid'}
                    subject={product?.name}
                />
            </Box>
            <VStack
                width='100%'
                mt='1rem'
                border='1px solid'
                borderColor='gray.300'
                borderRadius='10px'
                p='20px'
                alignItems='flex-start'
                spacing='4'
                justifyContent='flex-start'>
                <Heading fontSize='xl'>Ksh {product?.price}</Heading>
                <HStack wrap='wrap' gap='5px'>
                    {product?.featured && (
                        <Badge
                            borderRadius='5px'
                            colorScheme='orange'
                            p='5px 10px'
                            textTransform='capitalize'
                            fontWeight='500'
                            fontSize='0.9rem'>
                            Featured
                        </Badge>
                    )}
                    <Badge
                        borderRadius='5px'
                        colorScheme='blue'
                        textTransform='capitalize'
                        p='5px 10px'
                        fontWeight='500'
                        fontSize='0.9rem'>
                        {product?.status}
                    </Badge>
                    <Badge
                        borderRadius='5px'
                        colorScheme='purple'
                        textTransform='capitalize'
                        p='5px 10px'
                        fontWeight='500'
                        fontSize='0.9rem'>
                        {product?.category}
                    </Badge>
                    <Badge
                        borderRadius='5px'
                        colorScheme='teal'
                        p='5px 10px'
                        textTransform='capitalize'
                        fontWeight='500'
                        fontSize='0.9rem'>
                        Condition: {product?.condition}
                    </Badge>
                </HStack>
                {product?.status === 'bid' && (
                    <BidTimer
                        bidEndDate={product?.bidEnd}
                        size='md'
                        cb={updateBidStatus}
                    />
                )}
            </VStack>

            {product?.status === 'bid' && user && product?.userId !== user?.id && (
                <Box borderRadius='10px' bg='#fff' p='20px' my='1rem'>
                    <BidComponent product={product} />
                </Box>
            )}

            {product?.userId === user?.id ? null : notBid ? (
                <Box my='1rem'>
                    <HStack spacing='3' alignItems='center'>
                        <Button
                            isLoading={cartLoading}
                            isDisabled={!user}
                            onClick={addToCart}
                            height='2.5rem'
                            colorScheme='blue'
                            width='100%'
                            _focus={{ outline: 'none' }}
                            _active={{ outline: 'none' }}
                            borderRadius='5px'>
                            Add to cart
                        </Button>
                        <Tooltip hasArrow label='Add to wishlist'>
                            <IconButton
                                isDisabled={!user}
                                isLoading={loading}
                                bg='#fff'
                                icon={<FaHeart />}
                                _hover={{ bg: '#fff' }}
                                onClick={addToWishList}
                                _focus={{ outline: 'none' }}
                                _active={{ outline: 'none' }}
                            />
                        </Tooltip>
                    </HStack>
                </Box>
            ) : null}
        </Box>
    )
}

ProductDetails.defaultProps = {
    product: {},
}

export default ProductDetails
