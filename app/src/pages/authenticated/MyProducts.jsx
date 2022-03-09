import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, HStack, useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import Layout from '../../components/common/Layout'
import Search from '../../components/common/Search'
import AddProductModal from '../../components/modals/Product/AddProductModal'
import invoke from '../../utils/axios.config'
import { useAuth } from '../../context/AuthProvider'
import { fetchUserProducts } from '../../store/slices/Products'
import UserProductsList from '../../components/products/UserProductsList'
import { useAlert } from '../../context/AlertProvider'

function MyProducts() {
    const [searchterm, setSearchterm] = useState('')
    const [value] = useDebounce(searchterm, 500)

    const { setError } = useAlert()
    const [loading, setLoading] = useState(false)
    const { onClose, isOpen, onOpen } = useDisclosure()
    const { user } = useAuth()

    const dispatch = useDispatch()
    const { userProducts } = useSelector((state) => state.product)

    const fetchMyProducts = useCallback(async (id, search) => {
        try {
            setLoading(true)
            const url = search
                ? `product/user/${id}?search=${search}`
                : `product/user/${id}`
            const { data = {} } = await invoke('GET', url)
            dispatch(fetchUserProducts(data.products))

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.response.data || 'Something went wrong')
        }
    }, [])

    useEffect(() => {
        if (user?.id) {
            if (value) {
                fetchMyProducts(user?.id, value)
            } else {
                fetchMyProducts(user?.id)
            }
        }
    }, [user?.id, value])

    return (
        <Layout title='My products'>
            <AddProductModal isOpen={isOpen} onClose={onClose} />
            <Box width='100%' height='auto'>
                <HStack
                    my='1rem'
                    borderRadius='10px'
                    width='100%'
                    minHeight='10vh'
                    height='auto'
                    justifyContent='space-between'
                    alignItems='center'
                    p='10px 0'>
                    <Search
                        setTerm={setSearchterm}
                        term={searchterm}
                        full
                        placeholder='Search products'
                    />
                    <Button
                        height='2.5rem'
                        onClick={onOpen}
                        borderRadius='5px'
                        colorScheme='blue'>
                        New product
                    </Button>
                </HStack>
                <UserProductsList products={userProducts} loading={loading} />
            </Box>
        </Layout>
    )
}

export default MyProducts
