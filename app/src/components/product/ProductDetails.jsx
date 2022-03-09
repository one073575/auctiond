import React from 'react'
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

function ProductDetails({ product }) {
    const { user } = useAuth()
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
                    <BidTimer bidEndDate={product?.bidEnd} size='md' />
                )}
            </VStack>

            {product?.status === 'bid' && user && product?.userId !== user?.id && (
                <Box borderRadius='10px' bg='#fff' p='20px' my='1rem'>
                    <BidComponent product={product} />
                </Box>
            )}

            {product?.status !== 'bid' && product?.userId !== user?.id && (
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
            )}
        </Box>
    )
}

ProductDetails.defaultProps = {
    product: {},
}

export default ProductDetails
