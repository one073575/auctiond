import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { useAuth } from '../../context/AuthProvider'
import UpdatePasswordForm from '../../forms/profile/UpdatePasswordForm'

function PasswordDetails({ user }) {
    const { updateUser, loading } = useAuth()

    const validation = yup.object().shape({
        password: yup
            .string()
            .min(6, 'Password should be more than 6 characters')
            .required('Password field is required'),
        confirmpass: yup.string().when('password', {
            is: (val) => val && val.length > 0,
            then: yup
                .string()
                .oneOf([yup.ref('password')], 'Passwords should match'),
        }),
    })
    return (
        <Box my='1rem' bg='#fff' shadow='lg' borderRadius='10px' p='20px 30px'>
            <Heading my='1rem ' size='md'>
                Change your password
            </Heading>
            <Formik
                initialValues={{
                    password: '',
                    confirmpass: '',
                }}
                validationSchema={validation}
                onSubmit={async (values) => {
                    const update = {
                        password: values.password,
                    }
                    await updateUser(user?.id, update)
                }}>
                {({ errors, handleSubmit, handleBlur, touched }) => (
                    <UpdatePasswordForm
                        errors={errors}
                        blur={handleBlur}
                        touched={touched}
                        submit={handleSubmit}
                        Field={Field}
                        loading={loading}
                    />
                )}
            </Formik>
        </Box>
    )
}

export default PasswordDetails
