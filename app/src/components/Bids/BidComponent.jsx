import React, { useEffect, useState } from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { Alert, AlertIcon, Box, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import BidForm from '../../forms/product/BidForm'
import invoke from '../../utils/axios.config'
import { useAuth } from '../../context/AuthProvider'
import { fetchBid, createBid } from '../../store/slices/Bids'

function BidComponent({ product }) {
    const { user } = useAuth()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const { bid } = useSelector((state) => state.bids)

    const validation = yup.object().shape({
        bid: yup.number().required('Number field is required'),
    })

    const getBid = async (id) => {
        try {
            const { data = {} } = await invoke('GET', `bid/product/${id}`)
            dispatch(fetchBid(data.bid))
        } catch (err) {
            setError(err.response.data || 'Something went wrong')
        }
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 4000)
        }

        if (message) {
            setTimeout(() => {
                setMessage(null)
            }, 4000)
        }
    }, [error, message])

    useEffect(() => {
        if (product?.id) {
            getBid(product?.id)
        }
    }, [product?.id])
    return (
        <Box>
            <Alert
                status={error ? 'error' : message ? 'success' : 'info'}
                borderRadius='10px'
                alignItems='flex-start'
                my='1rem'>
                <AlertIcon />
                {error ? (
                    <Text>{error}</Text>
                ) : message ? (
                    <Text>{message}</Text>
                ) : (
                    <Text>This is the highest bid: Ksh {bid?.bid || 0.0}</Text>
                )}
            </Alert>

            <Formik
                initialValues={{
                    bid: bid?.bid || 0,
                }}
                validationSchema={validation}
                onSubmit={async (values, _) => {
                    try {
                        _.setSubmitting(true)

                        const params = {
                            ...values,
                            productId: product?.id,
                            userId: user?.id,
                            startPrice: product?.price,
                        }

                        if (values.bid <= product?.price) {
                            setError('Bid should be higher than starting price')
                            return
                        }

                        const { data = {} } = await invoke(
                            'POST',
                            'bid',
                            params
                        )

                        dispatch(createBid(data.bid))
                        setMessage(data.message)
                        _.setSubmitting(false)
                        setTimeout(() => {
                            _.resetForm()
                        }, 4000)
                    } catch (err) {
                        setError(err.response.data || 'Something went wrong')
                        _.setSubmitting(false)
                        setTimeout(() => {
                            _.resetForm()
                        }, 4000)
                    }
                }}
                enableReinitialize>
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <BidForm
                        Field={Field}
                        errors={errors}
                        values={values}
                        touched={touched}
                        blur={handleBlur}
                        submit={handleSubmit}
                        loading={isSubmitting}
                    />
                )}
            </Formik>
        </Box>
    )
}

BidComponent.defaultProps = {}

export default BidComponent
