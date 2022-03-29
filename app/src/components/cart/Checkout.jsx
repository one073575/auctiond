import {
    Box,
    Button,
    Center,
    Divider,
    Heading,
    HStack,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from '../../context/AlertProvider'
import Paypal from './Paypal'

function Checkout({ items, loading }) {
    const { setError, setMessage } = useAlert()
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [tax] = useState(16)
    const [shipping, setShipping] = useState(0)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentDetails, setPaymentDetails] = useState(null)

    const calculateSubtotal = () => {
        let subtotal = 0
        let shipping = 0
        items.forEach((item) => {
            console.log(item)
            if (item.product.deal) {
                subtotal +=
                    parseInt(item.product.price) * parseInt(item.quantity) -
                    parseInt((item.product.discount / 100) * item.product.price)
            } else {
                subtotal +=
                    parseInt(item.product.price) * parseInt(item.quantity)
                shipping += parseInt(item.product.shipping)
            }
        })

        setSubtotal(subtotal)
        setShipping(shipping)
    }

    const calculateShipping = () => {
        let shipping = 0
        items.forEach((item) => {
            shipping += parseInt(item.productShipping)
        })

        setShipping(shipping)
    }

    const calculateTotal = useCallback(
        (sub) => {
            if (tax) {
                const taxAmount = sub * (tax / 100)
                setTotal(taxAmount + sub)
            }
            if (shipping) {
                setTotal(sub + shipping)
            }

            if (tax && shipping) {
                const taxAmount = sub * (tax / 100)
                setTotal(sub + taxAmount + shipping)
            }
        },
        [tax, shipping]
    )

    const handlePaymentSuccess = useCallback(
        async (details) => {
            try {
                if (!paymentSuccess) {
                    setError('Payment failed')
                    setPaymentDetails(null)
                    setPaymentSuccess(false)
                    return
                }

                if (!paymentDetails?.payment_id) {
                    setError('Payment failed')
                    setPaymentDetails(null)
                    setPaymentSuccess(false)
                    return
                }

                // add payment record to database

                // create orders for each item

                // clear cart

                // redirect to orders page
            } catch (error) {
                setError(
                    error.response.data ||
                        'Payment failed, something went wrong'
                )
                setPaymentDetails(null)
                setPaymentSuccess(false)
                return
            }
        },
        [paymentSuccess]
    )

    useEffect(() => {
        if (items.length > 0) {
            calculateSubtotal()
        }
    }, [items])

    useEffect(() => {
        if (subtotal) {
            calculateTotal(subtotal)
            calculateShipping()
        }
    }, [subtotal])

    // useEffect(() => {
    //     if (paymentSuccess) {
    //         if (paymentDetails?.payment_id) {
    //             handlePaymentSuccess(paymentDetails)
    //         }
    //     }
    // }, [paymentSuccess, paymentDetails])

    return (
        <Box p='10px'>
            <Heading fontSize='xl'>Product Checkout</Heading>
            <Divider my='1rem' />
            {items && items.length ? (
                <Stack spacing='5'>
                    <HStack width='100%' justifyContent='space-between'>
                        <Text fontSize='md'>Subtotal</Text>
                        <Text fontSize='md'>KSH {subtotal}</Text>
                    </HStack>
                    <Divider my='1rem' />

                    <VStack alignItems='flex-end' justifyContent='flex-start'>
                        {tax && (
                            <Text fontSize='sm' as='small'>
                                Tax (V.A.T): {tax}%
                            </Text>
                        )}
                        {shipping && (
                            <Text fontSize='sm' as='small'>
                                Shipping: Ksh {shipping}
                            </Text>
                        )}
                        {shipping && (
                            <Text fontSize='sm' as='small'>
                                Shipping: Ksh {shipping}
                            </Text>
                        )}
                    </VStack>

                    <HStack width='100%' justifyContent='space-between'>
                        <Text fontSize='2xl'>Total</Text>
                        <Text fontSize='2xl' color='blue.600'>
                            KSH {total}
                        </Text>
                    </HStack>
                    <Divider my='2rem' />
                    <Paypal
                        total={total}
                        products={items}
                        setPaymentDetails={setPaymentDetails}
                        setPaymentSuccess={setPaymentSuccess}
                    />
                </Stack>
            ) : (
                <Center flexDirection='column'>
                    <Heading fontSize='2xl'>No products in cart</Heading>
                    <Text mb='1rem'>Add products to your cart to proceed</Text>

                    <Button
                        as={Link}
                        to='/products'
                        height='2.5rem'
                        borderRadius='5px'
                        colorScheme='blue'>
                        🙂 Go shopping &rarr;
                    </Button>
                </Center>
            )}
        </Box>
    )
}

Checkout.defaultProps = {
    items: [],
    loading: false,
}

export default Checkout
