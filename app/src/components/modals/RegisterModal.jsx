import React, { useEffect, useState } from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { Box, Alert, AlertIcon, Text } from '@chakra-ui/react'
import RegistrationForm from '../../forms/auth/RegistrationForm'
import Modall from '../common/Modall'
import { useAuth } from '../../context/AuthProvider'
import { useAlert } from '../../context/AlertProvider'

function RegisterModal({ onClose, isOpen, loginOpen }) {
    const { register, loading, isAuthenticated } = useAuth()
    const { authError } = useAlert()

    const [alert, setAlert] = useState(null)

    const validation = yup.object().shape({
        name: yup.string().required('Name value is required'),
        email: yup
            .string()
            .email('Please add a valid email')
            .required('Email value is required'),
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

    useEffect(() => {
        if (authError) {
            setAlert(authError)
            setTimeout(() => {
                setAlert(null)
            }, 4000)
        }
    }, [authError])

    useEffect(() => {
        if (isAuthenticated) {
            onClose()
        }
    }, [isAuthenticated])
    return (
        <Modall
            onClose={onClose}
            isOpen={isOpen}
            title='Create your account'
            size='lg'>
            <Text as='span' my='1rem'>
                Already have an account?{' '}
                <Text
                    color='blue'
                    as='span'
                    cursor='pointer'
                    onClick={() => {
                        onClose()
                        loginOpen()
                    }}>
                    Login
                </Text>
            </Text>
            <Box>
                {alert && (
                    <Alert
                        status='error'
                        borderRadius='5px'
                        p='15px'
                        alignItems='center'>
                        <AlertIcon />
                        <Text>{alert}</Text>
                    </Alert>
                )}
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmpass: '',
                    }}
                    validationSchema={validation}
                    onSubmit={async (values, _) => {
                        const params = {
                            name: values.name,
                            email: values.email,
                            password: values.password,
                        }

                        await register(params)
                        _.resetForm()
                    }}>
                    {({ errors, handleSubmit, handleBlur, touched }) => (
                        <RegistrationForm
                            submit={handleSubmit}
                            blur={handleBlur}
                            errors={errors}
                            touched={touched}
                            Field={Field}
                            loading={loading}
                        />
                    )}
                </Formik>
            </Box>
        </Modall>
    )
}

export default RegisterModal
