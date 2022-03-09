import { Box, HStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useDispatch, useSelector } from 'react-redux'
// import { useLocation } from 'react-router-dom'
import Layout from '../components/common/Layout'
import Search from '../components/common/Search'
import ProductsList from '../components/products/ProductsList'
import { fetchProducts } from '../store/slices/Products'
import invoke from '../utils/axios.config'

function Products() {
    const dispatch = useDispatch()
    // const location = useLocation()
    const [searchterm, setSearchterm] = useState('')
    const [loading, setLoading] = useState(false)
    const [value] = useDebounce(searchterm, 1000)

    const { products: items } = useSelector((state) => state.product)

    const getProducts = async (term) => {
        try {
            setLoading(true)
            const url = term ? `product?search=${value}` : 'product'
            const { data = {} } = await invoke('GET', url)

            dispatch(fetchProducts(data.products))
        } catch (error) {
            setLoading(false)
        }
    }

    // const useQuery = (val = '') => {
    //     const query = new URLSearchParams(location.search)
    //     return query.get(val)
    // }

    useEffect(() => {
        if (value) {
            getProducts(value)
        } else {
            getProducts()
        }
    }, [value])

    return (
        <Layout title='Products'>
            <Box>
                <HStack my='1rem'>
                    <Search
                        full
                        placeholder='Keyword, name, category'
                        term={searchterm}
                        setTerm={setSearchterm}
                    />
                </HStack>

                <ProductsList products={items} loading={loading} />
            </Box>
        </Layout>
    )
}

export default Products
