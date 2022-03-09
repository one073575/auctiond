import { Alert, AlertIcon, Box, Text } from '@chakra-ui/react'
import { Formik, Field } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useAlert } from '../../context/AlertProvider'
import { useAuth } from '../../context/AuthProvider'
import LoginForm from '../../forms/auth/LoginForm'
import Modall from '../common/Modall'

function LoginModal({ onClose, isOpen, registerOpen }) {
    const { login, loading, isAuthenticated } = useAuth()
    const { authError } = useAlert()

    const [alert, setAlert] = useState(null)

    const validation = yup.object().shape({
        email: yup
            .string()
            .email('Please add a valid email')
            .required('Email value is required'),
        password: yup
            .string()
            .min(6, 'Password should be more than 6 characters')
            .required('Password field is required'),
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
            title='Welcome back'
            size='lg'>
            <Box>
                {alert && (
                    <Alert
                        my='1rem'
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
                        email: '',
                        password: '',
                    }}
                    validationSchema={validation}
                    onSubmit={async (values, _) => {
                        await login(values)
                        _.resetForm()
                    }}>
                    {({ errors, handleSubmit, handleBlur, touched }) => (
                        <LoginForm
                            submit={handleSubmit}
                            blur={handleBlur}
                            errors={errors}
                            touched={touched}
                            Field={Field}
                            loading={loading}
                            loginClose={onClose}
                            registerOpen={registerOpen}
                        />
                    )}
                </Formik>
            </Box>
        </Modall>
    )
}

export default LoginModal
