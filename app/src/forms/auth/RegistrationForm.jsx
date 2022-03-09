import React from 'react'
import {
    Box,
    Grid,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    FormControl,
    FormLabel,
    FormErrorIcon,
    FormErrorMessage,
} from '@chakra-ui/react'

function RegistrationForm({ submit, Field, errors, touched, loading, blur }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                isInvalid={errors.name && touched.name}
                my='1rem'
                isRequired>
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
            <Grid gap='1rem' templateColumns='repeat(2, 1fr)' my='1rem'>
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
                    <FormLabel htmlFor='confirmpass'>
                        Confirm Password
                    </FormLabel>
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
            </Grid>

            <FormControl my='2rem'>
                <Button
                    height='3rem'
                    width='100%'
                    type='submit'
                    colorScheme='blue'
                    borderRadius='5px'
                    isLoading={loading}
                    isDisabled={loading}>
                    Register
                </Button>
            </FormControl>
        </Box>
    )
}

export default RegistrationForm
