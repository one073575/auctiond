import { Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import WishListItem from './WishListItem'

function WishListList({ products, loading }) {
    return (
        <Box minHeight='70vh'>
            {!loading && !products.length && (
                <Box height='70vh' bg='gray.100' borderRadius='10px'>
                    <Center
                        width='50%'
                        height='100%'
                        mx='auto'
                        flexDirection='column'>
                        <Heading>No products in your wish list </Heading>
                        <Text my='1rem'>
                            Start exploring our products to see what you like
                        </Text>

                        <Button
                            height='2.5rem'
                            as={Link}
                            to='/products'
                            borderRadius='5px'
                            colorScheme='blue'>
                            Explore our products &rarr;
                        </Button>
                    </Center>
                </Box>
            )}
            {products &&
                products.map((product) => (
                    <Suspense key={product?.id} fallback={<h4>Loading ...</h4>}>
                        <WishListItem product={product} />
                    </Suspense>
                ))}
        </Box>
    )
}

WishListList.defaultProps = {
    products: [],
    loading: false,
}

export default WishListList
