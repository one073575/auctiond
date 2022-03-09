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
    HStack,
} from '@chakra-ui/react'

function DeleteAccountForm({
    submit,
    Field,
    errors,
    touched,
    loading,
    blur,
    onClose,
}) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                isInvalid={errors.confirm && touched.confirm}
                isRequired>
                <FormLabel htmlFor='confirm'>Confirm</FormLabel>
                <InputGroup>
                    <Field
                        as={Input}
                        name='confirm'
                        id='confirm'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='confirm'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />
                </InputGroup>
                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.confirm && touched.confirm && errors.confirm}
                </FormErrorMessage>
            </FormControl>

            <HStack justifyContent='space-between' spacing='6' width='100%'>
                <FormControl my='2rem' width='100%'>
                    <Button
                        height='2.5rem'
                        width='100%'
                        onClick={onClose}
                        colorScheme='gray'
                        borderRadius='5px'
                        isLoading={loading}
                        isDisabled={loading}>
                        Cancel
                    </Button>
                </FormControl>
                <FormControl my='2rem'>
                    <Button
                        height='2.5rem'
                        width='100%'
                        type='submit'
                        colorScheme='red'
                        borderRadius='5px'
                        isLoading={loading}
                        isDisabled={loading}>
                        Proceed &rarr;
                    </Button>
                </FormControl>
            </HStack>
        </Box>
    )
}

export default DeleteAccountForm
