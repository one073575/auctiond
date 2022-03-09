import React from 'react'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { Box } from '@chakra-ui/react'
import moment from 'moment'
import Modall from '../../common/Modall'
import invoke from '../../../utils/axios.config'
import { useAlert } from '../../../context/AlertProvider'
import { updateProduct } from '../../../store/slices/Products'
import StatusForm from '../../../forms/product/StatusForm'

function EditStatusModal({ onClose, isOpen, product }) {
    const dispatch = useDispatch()
    const { setError, setMessage } = useAlert()

    const validation = yup.object().shape({
        status: yup.string().required('status field is required'),
        end: yup.date(),
    })

    return (
        <Modall
            isOpen={isOpen}
            onClose={onClose}
            title='Edit Status'
            overlayClick={false}
            size='lg'>
            <Box>
                <Box borderRadius='10px' bg='#fff'>
                    <Formik
                        initialValues={{
                            status: product?.status || '',
                            end: product?.bidEnd
                                ? moment(product?.bidEnd).format(
                                      'yyyy-MM-DDThh:mm'
                                  )
                                : moment().format('yyyy-MM-DDThh:mm'),
                        }}
                        validationSchema={validation}
                        onSubmit={async (values, _) => {
                            try {
                                _.setSubmitting(true)
                                const params = {
                                    status: values.status,
                                    bidEnd: values.end,
                                }

                                if (values.status !== 'bid') {
                                    params.bidEnd = null
                                }

                                const { data = {} } = await invoke(
                                    'PUT',
                                    `product/${product?.id}`,
                                    params
                                )

                                dispatch(
                                    updateProduct({
                                        id: product?.id,
                                        product: data.product,
                                    })
                                )
                                setMessage(data.message)
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
                        }}>
                        {({
                            errors,
                            touched,
                            values,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <StatusForm
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

export default EditStatusModal
