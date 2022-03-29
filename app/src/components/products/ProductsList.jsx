import { Box, Grid } from '@chakra-ui/react'
import React, { lazy, Suspense } from 'react'
import Unavailable from '../common/Unavailable'

const ProductItem = lazy(() => import('./ProductListItem'))

function ProductsList({ products, loading }) {
    return (
        <Box minHeight='40vh'>
            {!loading && !products.length && (
                <Box height='60vh' position='relative' width='100%'>
                    <Unavailable
                        message='No products match your search / filters'
                        src='/svg/unavailable.svg'
                    />
                </Box>
            )}
            <Grid gap='1rem' templateColumns='repeat(3,1fr)' width='100%'>
                {products.map((product) => (
                    <Suspense key={product?.id} fallback={<h4>Loading ...</h4>}>
                        <ProductItem product={product} />
                    </Suspense>
                ))}
            </Grid>
        </Box>
    )
}

export default ProductsList
