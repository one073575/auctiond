import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Layout from '../components/common/Layout'
import ProductDetails from '../components/product/ProductDetails'
import ProductGallery from '../components/product/ProductGallery'
import { fetchProduct } from '../store/slices/Products'
import invoke from '../utils/axios.config'

function Product() {
    const { slug } = useParams()
    const dispatch = useDispatch()

    const { product: item } = useSelector((state) => state.product)

    const findProduct = async (id) => {
        const { data = {} } = await invoke('GET', `product/${id}`)
        dispatch(fetchProduct(data.product))
    }

    useEffect(() => {
        if (slug) {
            findProduct(slug)
        }
    }, [slug])

    return (
        <Layout title={item?.name} description={item?.description}>
            <Box my='1rem' width='100%' height='auto'>
                <Grid gap='2rem' templateColumns='repeat(3, 1fr)' height='100%'>
                    <GridItem colSpan={2}>
                        <Box>
                            <ProductGallery images={item?.images} />
                        </Box>
                        <Box
                            my='0.5rem'
                            border='1px solid'
                            borderColor='gray.300'
                            borderRadius='10px'
                            p='20px'>
                            <Heading mb='1rem' fontSize='xl'>
                                Description
                            </Heading>
                            <Text as='p'>{item?.description}</Text>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={1} overflow='auto'>
                        <Box>
                            <ProductDetails product={item} />
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </Layout>
    )
}

export default Product
