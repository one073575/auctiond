import React from 'react'
import {
    Box,
    Button,
    InputGroup,
    Input,
    FormControl,
    FormLabel,
    FormErrorIcon,
    FormErrorMessage,
} from '@chakra-ui/react'

function UpdateForm({ submit, Field, errors, touched, loading, blur }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl isInvalid={errors.name && touched.name} isRequired>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <InputGroup>
                    <Field
                        as={Input}
                        name='name'
                        id='name'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='John Doe'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />
                </InputGroup>
                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.name && touched.name && errors.name}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                isInvalid={errors.email && touched.email}
                isRequired
                my='1rem'>
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
            <FormControl isInvalid={errors.number && touched.number} isRequired>
                <FormLabel htmlFor='number'>Phone Number</FormLabel>
                <InputGroup>
                    <Field
                        as={Input}
                        name='number'
                        id='number'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='+2547xxxxxxxx'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />
                </InputGroup>
                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.number && touched.number && errors.number}
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
                    Update User
                </Button>
            </FormControl>
        </Box>
    )
}

export default UpdateForm
