import React from 'react'
import { Box, Heading, HStack, Text, Grid, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Deals() {
    const allDeals = [
        {
            img: '/images/deals/img1.jpg',
            label: 'Furniture',
            link: '/products/deals/furniture',
            alt: 'furniture',
        },
        {
            img: '/images/deals/img2.jpg',
            label: 'Decor',
            link: '/products/deals/decor',
            alt: 'decor',
        },
        {
            img: '/images/deals/img3.jpg',
            label: 'Technology',
            link: '/products/deals/technology',
            alt: 'technology',
        },
        {
            img: '/images/deals/img4.jpg',
            label: 'Footware',
            link: '/products/deals/footware',
            alt: 'footware',
        },
    ]
    return (
        <Box height='auto' minHeight='20vh' width='100%' my='2rem'>
            <HStack spacing='5'>
                <Heading fontSize='1.5rem'>Explore Our Hot Deals </Heading>
                <Text as={Link} to='/products/hotdeals' fontSize='1rem'>
                    View all &rarr;
                </Text>
            </HStack>
            <Grid gap='2rem' my='1rem' templateColumns='repeat(4, 1fr)'>
                {allDeals.map((deal) => (
                    <Box
                        height='15vh'
                        borderRadius='10px'
                        bg='#fff'
                        p='10px'
                        shadow='xl'>
                        <HStack
                            as={Link}
                            to={deal.link}
                            spacing='3'
                            alignItems='center'
                            height='100%'>
                            <Image
                                src={deal.img}
                                alt={deal.alt}
                                objectFit='cover'
                                height='100%'
                                width='40%'
                                borderRadius='10px'
                            />
                            <Heading size='md'>{deal.label}</Heading>
                        </HStack>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default Deals
