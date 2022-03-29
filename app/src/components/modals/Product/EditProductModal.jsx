import React from 'react'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'
import ProductForm from '../../../forms/product/ProductForm'
import Modall from '../../common/Modall'
import { clearGallery } from '../../../store/slices/Gallery'
import { useAuth } from '../../../context/AuthProvider'
import invoke from '../../../utils/axios.config'
import { useAlert } from '../../../context/AlertProvider'
import { updateProduct } from '../../../store/slices/Products'

function EditProductModal({ onClose, isOpen, product }) {
    const { user } = useAuth()
    const dispatch = useDispatch()
    const { setError, setMessage } = useAlert()
    const { gallery } = useSelector((state) => state.gallery)

    const validation = yup.object().shape({
        name: yup.string().required('Name field is required'),
        price: yup.number().required('Price field is required'),
        quantity: yup.number().required('Price field is required'),
        category: yup.string().required('Category field is required'),
        condition: yup.string().required('Condition field is required'),
        deal: yup.boolean(),
        discount: yup.number(),
        shipping: yup.number(),
        description: yup.string().required('Description field is required'),
    })

    const closeModal = () => {
        if (gallery.length > 0) {
            // alert('Closing the modal will clear all data')
            onClose()
            dispatch(clearGallery([]))
        } else {
            onClose()
            dispatch(clearGallery([]))
        }
    }

    return (
        <Modall
            isOpen={isOpen}
            onClose={closeModal}
            title={`Edit ${product?.name}`}
            overlayClick={false}
            size='lg'>
            <Box>
                <Box p='20px' borderRadius='10px' bg='#fff'>
                    <Formik
                        initialValues={{
                            name: product?.name || '',
                            price: product?.price || 0.0,
                            quantity: product?.quantity || 0,
                            category: product?.category || '',
                            condition: product?.condition || '',
                            deal: product?.deal || false,
                            discount: product?.discount || 0,
                            shipping: product?.shipping || 0,
                            description: product?.description || '',
                        }}
                        validationSchema={validation}
                        onSubmit={async (values, _) => {
                            try {
                                _.setSubmitting(true)
                                const params = {
                                    ...values,
                                    images: gallery,
                                    userId: user?.id,
                                }

                                const { data = {} } = await invoke(
                                    'PUT',
                                    `product/${product?.id}`,
                                    params
                                )

                                dispatch(
                                    updateProduct({
                                        id: product?.id,
                                        product: data?.product,
                                    })
                                )
                                setMessage(data.message)

                                dispatch(clearGallery([]))
                                _.resetForm()
                                _.setSubmitting(false)
                                onClose()
                                dispatch(clearGallery([]))
                            } catch (error) {
                                _.setSubmitting(false)
                                setError(
                                    error.response.data ||
                                        'Something went wrong'
                                )
                                _.resetForm()
                            }
                        }}
                        enableReinitialize>
                        {({
                            errors,
                            touched,
                            values,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <ProductForm
                                errors={errors}
                                touched={touched}
                                blur={handleBlur}
                                submit={handleSubmit}
                                Field={Field}
                                values={values}
                                loading={isSubmitting}
                                edit
                            />
                        )}
                    </Formik>
                </Box>
            </Box>
        </Modall>
    )
}

export default EditProductModal
