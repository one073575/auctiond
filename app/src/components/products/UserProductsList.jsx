import { Box, Grid } from '@chakra-ui/react'
import React, { lazy, Suspense } from 'react'

const UserProductItem = lazy(() => import('./UserProductListItem'))

function UserProductsList({ products }) {
    return (
        <Box width='100%'>
            <Grid gap='1rem' templateColumns='repeat(3,1fr)' width='100%'>
                {products.map((product) => (
                    <Suspense key={product?.id} fallback={<h4>Loading ...</h4>}>
                        <UserProductItem product={product} />
                    </Suspense>
                ))}
            </Grid>
        </Box>
    )
}

export default UserProductsList
