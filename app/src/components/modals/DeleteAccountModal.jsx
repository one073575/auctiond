import React from 'react'
import { Formik, Field } from 'formik'
import { Alert, AlertIcon, Box, Text } from '@chakra-ui/react'
import * as yup from 'yup'
import Modall from '../common/Modall'
import { useAuth } from '../../context/AuthProvider'
import DeleteAccountForm from '../../forms/profile/DeleteAccountForm'

import { useHistory } from 'react-router-dom'

function DeleteAccountModal({ isOpen, onClose }) {
    const history = useHistory()
    const { user, deleteUser, loading, logout } = useAuth()

    const validation = yup.object().shape({
        confirm: yup.string().required('Confirmation string is required'),
    })
    return (
        <Modall
            isOpen={isOpen}
            onClose={onClose}
            size='lg'
            title='Delete your account'>
            <Box>
                <Alert
                    status='warning'
                    borderRadius='10px'
                    p='20px'
                    my='1rem'
                    alignItems='flex-start'>
                    <AlertIcon />
                    <Text as='span'>
                        Are you sure you want to continue? If no click the
                        cancel button if yes type this confirmation string{' '}
                        <Text as='span' color='red.600'>
                            {' '}
                            {user && user?.id}{' '}
                        </Text>
                        and proceed
                    </Text>
                </Alert>
                <Formik
                    initialValues={{
                        confirm: '',
                    }}
                    validationSchema={validation}
                    onSubmit={async (values, _) => {
                        if (values.confirm === user?.id) {
                            await deleteUser(user?.id)
                        }

                        _.resetForm()
                        onClose()
                    }}>
                    {({ errors, touched, handleBlur, handleSubmit }) => (
                        <DeleteAccountForm
                            submit={handleSubmit}
                            touched={touched}
                            errors={errors}
                            blur={handleBlur}
                            Field={Field}
                            loading={loading}
                            onClose={onClose}
                        />
                    )}
                </Formik>
            </Box>
        </Modall>
    )
}

export default DeleteAccountModal
