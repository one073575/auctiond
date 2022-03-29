import { Box, VStack } from '@chakra-ui/react'
import React, { lazy, Suspense } from 'react'
import Unavailable from '../common/Unavailable'

const CartListItem = lazy(() => import('./CartListItem'))

function CartList({ products, loading }) {
    return (
        <Box minHeight='50vh' position='relative' width='100%'>
            <VStack alignItems='flex-start' spacing='4'>
                {products &&
                    products.map((prod) => (
                        <Suspense
                            key={prod?.id}
                            fallback={<h4>Loading ...</h4>}>
                            <CartListItem item={prod} />
                        </Suspense>
                    ))}
            </VStack>

            {!loading && !products.length && (
                <Unavailable
                    src='/svg/unavailable.svg'
                    message=' No products in your cart'
                />
            )}
        </Box>
    )
}

export default CartList
