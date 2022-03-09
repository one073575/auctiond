import React from 'react'
import {
    Badge,
    Box,
    Heading,
    HStack,
    Icon,
    Image,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { BsImages } from 'react-icons/bs'
import LargeGallerySlide from '../modals/Product/LargeGallerySlide'
import BidTimer from './BidTimer'

function ProductListItem({ product }) {
    const {
        isOpen: _imgIsOpen,
        onOpen: _imgOpen,
        onClose: _imgClose,
    } = useDisclosure()

    return (
        <>
            <LargeGallerySlide
                onClose={_imgClose}
                isOpen={_imgIsOpen}
                product={product}
            />

            <Box
                key={product?.id}
                bg='gray.50'
                borderRadius='10px'
                position='relative'
                p='10px'>
                <Box
                    height='30vh'
                    bg='gray.200'
                    borderRadius='10px'
                    position='relative'>
                    <VStack
                        position='absolute'
                        top='0'
                        left='0'
                        width='100%'
                        height='100%'
                        alignItems='flex-start'
                        justifyContent='space-between'
                        p='10px'>
                        <HStack
                            width='100%'
                            alignItems='center'
                            justifyContent='space-between'>
                            <HStack>
                                {product?.deal && (
                                    <Badge
                                        colorScheme={
                                            product?.active ? 'blue' : 'gray'
                                        }
                                        borderRadius='3px'
                                        p='2px 10px'
                                        fontWeight='500'>
                                        Discount : {product?.discount} %
                                    </Badge>
                                )}
                                {product?.featured && (
                                    <Badge
                                        fontSize='0.9rem'
                                        colorScheme='teal'
                                        fontWeight='500'
                                        borderRadius='3px'
                                        textTransform='capitalize'>
                                        {product?.featured
                                            ? 'Featured'
                                            : 'Not featured'}
                                    </Badge>
                                )}
                            </HStack>

                            <Icon
                                color='#fff'
                                cursor='pointer'
                                fontSize='1.5rem'
                                onClick={_imgOpen}
                                as={BsImages}
                            />
                        </HStack>
                        <Box>
                            {product?.status === 'bid' && (
                                <HStack
                                    justifyContent='space-between'
                                    width='100%'
                                    my='0.5rem'>
                                    <BidTimer
                                        bidEndDate={product?.bidEnd}
                                        size='sm'
                                    />
                                </HStack>
                            )}
                        </Box>
                    </VStack>
                    <Image
                        height='100%'
                        width='100%'
                        mb='1rem'
                        objectFit='cover'
                        borderRadius='10px'
                        alt={product?.images[0]?.pubId}
                        src={product?.images[0]?.url}
                    />
                </Box>
                <HStack
                    my='1rem'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Badge
                        fontSize='0.9rem'
                        colorScheme='green'
                        fontWeight='500'
                        borderRadius='3px'
                        textTransform='capitalize'>
                        KSH {product?.price}
                    </Badge>

                    <HStack>
                        <Badge
                            fontSize='0.9rem'
                            colorScheme={
                                product?.status === 'new'
                                    ? 'orange'
                                    : product?.status === 'sale'
                                    ? 'blue'
                                    : product?.status === 'bid'
                                    ? 'blue'
                                    : 'red'
                            }
                            fontWeight='500'
                            borderRadius='3px'
                            textTransform='capitalize'>
                            {product?.status}
                        </Badge>
                    </HStack>
                </HStack>
                <HStack
                    width='100%'
                    justifyContent='space-between'
                    alignItems='flex-start'>
                    <Box width='100%'>
                        <Heading
                            fontSize='1.3rem'
                            as={Link}
                            to={`/products/${product?.slug}`}>
                            {product?.name}
                        </Heading>
                        <HStack width='100%' justifyContent='space-between'>
                            <Text fontSize='0.9rem'>
                                Added &bull;{' '}
                                {moment(product?.created).format(
                                    'DD, MMM YYYY'
                                )}
                            </Text>
                            <HStack>
                                <Badge
                                    p='5px'
                                    borderRadius='5px'
                                    fontWeight='500'
                                    textTransform='capitalize'
                                    fontSize='0.8rem'>
                                    {product?.category}
                                </Badge>
                                <Badge
                                    p='5px'
                                    borderRadius='5px'
                                    fontWeight='500'
                                    textTransform='capitalize'
                                    fontSize='0.8rem'>
                                    {product?.condition}
                                </Badge>
                            </HStack>
                        </HStack>
                    </Box>
                </HStack>
            </Box>
        </>
    )
}

export default ProductListItem
