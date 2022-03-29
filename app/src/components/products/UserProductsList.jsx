import { Box, Grid } from '@chakra-ui/react'
import React, { lazy, Suspense } from 'react'
import Unavailable from '../common/Unavailable'

const UserProductItem = lazy(() => import('./UserProductListItem'))

function UserProductsList({ products }) {
    return (
        <Box width='100%' minHeight='60vh' position='relative'>
            <Grid gap='1rem' templateColumns='repeat(3,1fr)' width='100%'>
                {products.map((product) => (
                    <Suspense key={product?.id} fallback={<h4>Loading ...</h4>}>
                        <UserProductItem product={product} />
                    </Suspense>
                ))}
            </Grid>
            {products.length === 0 && (
                <Unavailable
                    src='/svg/unavailable.svg'
                    message='Start adding products to continue'
                />
            )}
        </Box>
    )
}

export default UserProductsList
