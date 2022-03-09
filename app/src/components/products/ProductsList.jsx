import { Box, Grid } from '@chakra-ui/react'
import React, { lazy, Suspense } from 'react'

const ProductItem = lazy(() => import('./ProductListItem'))

function ProductsList({ products, loading }) {
    return (
        <Box>
            <Grid gap='1rem' templateColumns='repeat(3,1fr)' width='100%'>
                {/* {loading && <h3>Loading ...</h3>} */}
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
