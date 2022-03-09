import React from 'react'
import {
    Box,
    Heading,
    VStack,
    HStack,
    Text,
    Grid,
    Image,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Categories() {
    const allDeals = [
        {
            img: '/images/deals/img1.jpg',
            label: 'Furniture',
            link: '/products?category=furniture',
            alt: 'furniture',
        },
        {
            img: '/images/deals/img2.jpg',
            label: 'Decor',
            link: '/products?category=decor',
            alt: 'decor',
        },
        {
            img: '/images/deals/img3.jpg',
            label: 'Technology',
            link: '/products?category=technology',
            alt: 'technology',
        },
        {
            img: '/images/deals/img4.jpg',
            label: 'Footware',
            link: '/products?category=footware',
            alt: 'footware',
        },
    ]
    return (
        <Box height='auto' minHeight='20vh' width='100%' my='2rem'>
            <HStack spacing='5'>
                <Heading fontSize='1.5rem'>Explore Popular Categories </Heading>
                <Text as={Link} to='/categories' fontSize='1rem'>
                    View all &rarr;
                </Text>
            </HStack>
            <Grid gap='2rem' my='1rem' templateColumns='repeat(2, 1fr)'>
                {allDeals.map((deal) => (
                    <Box
                        height='auto'
                        borderRadius='10px'
                        bg='#fff'
                        p='30px'
                        shadow='md'>
                        <VStack
                            as={Link}
                            to={deal.link}
                            spacing='3'
                            alignItems='flex-start'
                            height='100%'>
                            <Image
                                src={deal.img}
                                alt={deal.alt}
                                objectFit='cover'
                                height='100%'
                                width='100%'
                                borderRadius='10px'
                            />
                            <Heading size='md'>{deal.label}</Heading>
                        </VStack>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default Categories
