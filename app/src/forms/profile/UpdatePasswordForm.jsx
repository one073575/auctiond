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
} from '@chakra-ui/react'

function UpdatePasswordForm({ submit, Field, errors, touched, loading, blur }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
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
            <FormControl
                isInvalid={errors.confirmpass && touched.confirmpass}
                isRequired>
                <FormLabel htmlFor='confirmpass'>Confirm Password</FormLabel>
                <InputGroup>
                    <Field
                        as={Input}
                        name='confirmpass'
                        id='confirmpass'
                        type='password'
                        onBlur={blur}
                        height='3rem'
                        borderRadius='5px'
                        placeholder='password'
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />
                </InputGroup>
                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.confirmpass &&
                        touched.confirmpass &&
                        errors.confirmpass}
                </FormErrorMessage>
            </FormControl>

            <FormControl my='2rem'>
                <Button
                    height='2.5rem'
                    width='100%'
                    type='submit'
                    colorScheme='blue'
                    borderRadius='5px'
                    isLoading={loading}
                    isDisabled={loading}>
                    Update Password
                </Button>
            </FormControl>
        </Box>
    )
}

export default UpdatePasswordForm
