import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import UpdateForm from '../../forms/profile/UpdateForm'
import { useAuth } from '../../context/AuthProvider'

function ProfileDetails({ user }) {
    const { editUser, loading } = useAuth()

    const validation = yup.object().shape({
        name: yup.string().required('Name Field is required'),
        email: yup
            .string()
            .email('Email is invalid')
            .required('Email field is required'),
        number: yup.string(),
    })
    return (
        <Box bg='#fff' shadow='lg' borderRadius='10px' p='20px 30px'>
            <Heading my='1rem ' size='md'>
                Your Profile Details
            </Heading>
            <Formik
                initialValues={{
                    name: user?.name || '',
                    email: user?.email || '',
                    number: user?.number || '',
                }}
                validationSchema={validation}
                onSubmit={async (values, _) => {
                    await editUser(user?.id, values)
                    _.resetForm()
                }}
                enableReinitialize>
                {({ errors, handleSubmit, handleBlur, touched }) => (
                    <UpdateForm
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

export default ProfileDetails
