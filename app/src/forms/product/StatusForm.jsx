import React from 'react'
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorIcon,
    FormErrorMessage,
    Select,
} from '@chakra-ui/react'
import moment from 'moment'

function StatusForm({ submit, Field, errors, touched, loading, blur, values }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                my='1rem'
                isInvalid={errors.status && touched.status}
                isRequired>
                <FormLabel htmlFor='status'>Status</FormLabel>

                <Field
                    as={Select}
                    name='status'
                    id='status'
                    height='2.5rem'
                    borderRadius='5px'
                    placeholder='select status'
                    onBlur={blur}
                    _focus={{
                        outlineColor: 'gray.500',
                    }}>
                    <option value='sale'>Sale</option>
                    <option value='bid'>Bid</option>
                </Field>

                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.status && touched.status && errors.status}
                </FormErrorMessage>
            </FormControl>

            {values.status === 'bid' && (
                <FormControl my='1rem' isInvalid={errors.end && touched.end}>
                    <FormLabel htmlFor='end'>End date</FormLabel>
                    <Field
                        as={Input}
                        name='end'
                        id='end'
                        type='datetime-local'
                        height='2.5rem'
                        borderRadius='5px'
                        min={moment().format('yyyy-MM-DDThh:mm')}
                        placeholder='select end date'
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />

                    <FormErrorMessage>
                        <FormErrorIcon />
                        {errors.end && touched.end && errors.end}
                    </FormErrorMessage>
                </FormControl>
            )}

            <FormControl my='1rem'>
                <Button
                    height='2.5rem'
                    width='100%'
                    type='submit'
                    colorScheme='blue'
                    borderRadius='5px'
                    isLoading={loading}
                    isDisabled={loading}>
                    Change Status
                </Button>
            </FormControl>
        </Box>
    )
}

export default StatusForm
