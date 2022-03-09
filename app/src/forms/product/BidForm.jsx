import React from 'react'
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorIcon,
    FormErrorMessage,
} from '@chakra-ui/react'

function BidForm({ submit, Field, errors, touched, loading, blur, values }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                my='1rem'
                isInvalid={errors.bid && touched.bid}
                isRequired>
                <FormLabel htmlFor='bid'>Your bid</FormLabel>
                <Field
                    as={Input}
                    name='bid'
                    id='bid'
                    type='number'
                    height='2.5rem'
                    borderRadius='5px'
                    placeholder='select bid'
                    min={values.bid}
                    onBlur={blur}
                    _focus={{
                        outlineColor: 'gray.500',
                    }}
                />

                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.bid && touched.bid && errors.bid}
                </FormErrorMessage>
            </FormControl>

            <FormControl my='1rem'>
                <Button
                    height='2.5rem'
                    width='100%'
                    type='submit'
                    colorScheme='blue'
                    borderRadius='5px'
                    isLoading={loading}
                    isDisabled={loading}>
                    Make your bid
                </Button>
            </FormControl>
        </Box>
    )
}

export default BidForm
