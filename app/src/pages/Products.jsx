import { Box, Heading, HStack, IconButton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/common/Layout'
import Search from '../components/common/Search'
import ProductsList from '../components/products/ProductsList'
import { fetchProducts } from '../store/slices/Products'
import invoke from '../utils/axios.config'
import { useQuery } from '../hooks/useQuery'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Products() {
    const dispatch = useDispatch()
    const [searchterm, setSearchterm] = useState('')
    const [productUrl, setProductUrl] = useState('product')
    const [loading, setLoading] = useState(false)
    const [value] = useDebounce(searchterm, 1000)

    const { products: items } = useSelector((state) => state.product)

    const getProducts = async (url) => {
        try {
            setLoading(true)
            const { data = {} } = await invoke('GET', url)
            dispatch(fetchProducts(data.products))
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const query = useQuery()
    const deal = query.get('deal')
    const category = query.get('category')

    useEffect(() => {
        if (productUrl) {
            getProducts(productUrl)
        }
    }, [productUrl])

    useEffect(() => {
        if (value) {
            setProductUrl(`product?search=${value}`)
        }

        if (value && deal) {
            console.log('value & deal')
            setProductUrl(`product?search=${value}&deal=${deal}`)
        }

        if (value && category) {
            setProductUrl(`product?search=${value}&category=${category}`)
        }

        if (deal) {
            setProductUrl(`product?deal=${deal}`)
        }

        if (deal && category) {
            setProductUrl(`product?deal=${deal}&category=${category}`)
        }
        if (category) {
            setProductUrl(`product?category=${category}`)
        }

        if (deal && category && value) {
            setProductUrl(
                `product?search=${value}&deal=${deal}&category=${category}`
            )
        }
        if (!deal && !category && !value) {
            setProductUrl('product')
        }
    }, [value, deal, category])

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

                {deal && !category && (
                    <HStack
                        my='1rem'
                        justifyContent='space-between'
                        width={['100%', '100%', '60%', '40%', '50%']}>
                        <Heading fontSize='xl' color='gray.600'>
                            Results for products with deals
                        </Heading>
                        <IconButton
                            as={Link}
                            to='/products'
                            _focus={{ outline: 'none' }}
                            _aactive={{ outline: 'none' }}
                            _hover={{ bg: 'gray.300' }}
                            icon={<FaTimes />}
                        />
                    </HStack>
                )}

                {category && !deal && (
                    <HStack
                        my='1rem'
                        justifyContent='space-between'
                        width={['100%', '100%', '60%', '40%', '50%']}>
                        <Heading fontSize='xl' color='gray.600'>
                            Results for products in {category} category
                        </Heading>
                        <IconButton
                            as={Link}
                            to='/products'
                            _focus={{ outline: 'none' }}
                            _aactive={{ outline: 'none' }}
                            _hover={{ bg: 'gray.300' }}
                            icon={<FaTimes />}
                        />
                    </HStack>
                )}

                {category && deal && (
                    <HStack
                        my='1rem'
                        justifyContent='space-between'
                        width={['100%', '100%', '60%', '40%', '50%']}>
                        <Heading fontSize='xl' color='gray.600'>
                            Results for products in {category} category with
                            deals
                        </Heading>
                        <IconButton
                            as={Link}
                            to='/products'
                            _focus={{ outline: 'none' }}
                            _aactive={{ outline: 'none' }}
                            _hover={{ bg: 'gray.300' }}
                            icon={<FaTimes />}
                        />
                    </HStack>
                )}
                <ProductsList products={items} loading={loading} />
            </Box>
        </Layout>
    )
}

export default Products
