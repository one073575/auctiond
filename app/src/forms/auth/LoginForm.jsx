import React from 'react'
import {
    Box,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    FormControl,
    FormLabel,
    FormErrorIcon,
    FormErrorMessage,
    Text,
} from '@chakra-ui/react'

function LoginForm({
    submit,
    Field,
    errors,
    touched,
    loading,
    blur,
    loginClose,
    registerOpen,
}) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl isInvalid={errors.email && touched.email} isRequired>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <InputGroup>
                    <Field
                        as={Input}
                        name='email'
                        id='email'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='Jdoe@gmail.com'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />
                </InputGroup>
                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.email && touched.email && errors.email}
                </FormErrorMessage>
            </FormControl>

            <FormControl
                my='1rem'
                isInvalid={errors.password && touched.password}
                isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                    <Field
                        as={Input}
                        name='password'
                        id='password'
                        type='password'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='password'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />
                    <InputRightElement />
                </InputGroup>
                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.password && touched.password && errors.password}
                </FormErrorMessage>
            </FormControl>

            <Text as='span'>
                Don&apos;t have an account?{' '}
                <Text
                    color='blue'
                    as='span'
                    cursor='pointer'
                    onClick={() => {
                        loginClose()
                        registerOpen()
                    }}>
                    Register
                </Text>
            </Text>

            <FormControl my='2rem'>
                <Button
                    height='3rem'
                    width='100%'
                    type='submit'
                    colorScheme='blue'
                    borderRadius='5px'
                    isLoading={loading}
                    isDisabled={loading}>
                    Login
                </Button>
            </FormControl>
        </Box>
    )
}

export default LoginForm
