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
import { createProduct } from '../../../store/slices/Products'

function AddProductModal({ onClose, isOpen }) {
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
        description: yup.string().required('Description field is required'),
    })

    const closeModal = () => {
        if (gallery.length > 0) {
            // alert('Closing the modal will clear all data')
            // delete uploaded images
            onClose()
        } else {
            onClose()
        }
    }
    return (
        <Modall
            isOpen={isOpen}
            onClose={closeModal}
            title='Add new product'
            overlayClick={false}
            size='lg'>
            <Box>
                <Box p='20px' borderRadius='10px' bg='#fff'>
                    <Formik
                        initialValues={{
                            name: '',
                            price: 0.0,
                            quantity: 0,
                            category: '',
                            condition: '',
                            deal: false,
                            discount: 0,
                            description: '',
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
                                    'POST',
                                    'product',
                                    params
                                )

                                dispatch(createProduct(data.product))
                                setMessage(data.message)

                                dispatch(clearGallery([]))
                                _.setSubmitting(false)
                                _.resetForm()

                                onClose()
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
                                loading={isSubmitting}
                                values={values}
                            />
                        )}
                    </Formik>
                </Box>
            </Box>
        </Modall>
    )
}

export default AddProductModal
