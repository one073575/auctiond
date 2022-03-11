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
import { useDispatch } from 'react-redux'

function ProductDetails({ product }) {
    const { user } = useAuth()
    const dispatch = useDispatch()
    const [notBid, setNotBid] = useState(false)

    const updateBidStatus = useCallback(async () => {
        if (product?.status === 'bid ended') return
        
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
    }, [product])

    const checkBidStatus = (prod) => {
        if (prod?.status === 'bid' || prod?.status === 'bid ended') {
            setNotBid(false)
        } else {
            setNotBid(true)
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
                <HStack spacing='1' wrap='wrap'>
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
                            height='2.5rem'
                            colorScheme='blue'
                            width='100%'
                            borderRadius='5px'>
                            Add to cart
                        </Button>
                        <Tooltip hasArrow label='Add to wishlist'>
                            <IconButton
                                icon={<FaHeart />}
                                bg='#fff'
                                _hover={{ bg: '#fff' }}
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
