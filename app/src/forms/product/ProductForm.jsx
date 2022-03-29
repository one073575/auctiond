import React from 'react'
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorIcon,
    FormErrorMessage,
    Checkbox,
    Grid,
    Select,
    Text,
    HStack,
    Textarea,
} from '@chakra-ui/react'
import DropZone from '../../components/common/DropZone'
import ProductGallery from '../../components/products/ProductGallery'
import { categories } from '../../utils/categories'

function ProductForm({
    submit,
    Field,
    errors,
    touched,
    loading,
    blur,
    values,
    edit,
}) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl isInvalid={errors.name && touched.name} isRequired>
                <FormLabel htmlFor='name'>Name</FormLabel>

                <Field
                    as={Input}
                    name='name'
                    id='name'
                    height='3rem'
                    borderRadius='5px'
                    placeholder='Product name'
                    onBlur={blur}
                    _focus={{
                        outlineColor: 'gray.500',
                    }}
                />

                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.name && touched.name && errors.name}
                </FormErrorMessage>
            </FormControl>

            <Grid gap='1rem' templateColumns='repeat(2,1fr)' my='1rem'>
                <FormControl
                    isInvalid={errors.price && touched.price}
                    isRequired>
                    <FormLabel htmlFor='price'>Price</FormLabel>

                    <Field
                        as={Input}
                        name='price'
                        id='price'
                        type='number'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='0.0'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />

                    <FormErrorMessage>
                        <FormErrorIcon />
                        {errors.price && touched.price && errors.price}
                    </FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={errors.quantity && touched.quantity}
                    isRequired>
                    <FormLabel htmlFor='quantity'>Quantity</FormLabel>

                    <Field
                        as={Input}
                        name='quantity'
                        id='quantity'
                        type='number'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='30'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />

                    <FormErrorMessage>
                        <FormErrorIcon />
                        {errors.quantity && touched.quantity && errors.quantity}
                    </FormErrorMessage>
                </FormControl>
            </Grid>

            <Grid gap='1rem' templateColumns='repeat(2,1fr)'>
                <FormControl
                    my='1rem'
                    isInvalid={errors.category && touched.category}
                    isRequired>
                    <FormLabel htmlFor='category'>Category</FormLabel>

                    <Field
                        as={Select}
                        name='category'
                        id='category'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='select category'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}>
                        {categories.map((category) => (
                            <option value={category.toLowerCase()}>
                                {category}
                            </option>
                        ))}
                    </Field>

                    <FormErrorMessage>
                        <FormErrorIcon />
                        {errors.category && touched.category && errors.category}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    my='1rem'
                    isInvalid={errors.condition && touched.condition}
                    isRequired>
                    <FormLabel htmlFor='condition'>Condition</FormLabel>
                    <Field
                        as={Select}
                        name='condition'
                        id='condition'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='select condition'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}>
                        <option value='new'>New</option>
                        <option value='used'>Used</option>
                        <option value='refurbished'>Refurbished</option>
                    </Field>

                    <FormErrorMessage>
                        <FormErrorIcon />
                        {errors.condition &&
                            touched.condition &&
                            errors.condition}
                    </FormErrorMessage>
                </FormControl>
            </Grid>

            <FormControl
                my='1rem'
                isInvalid={errors.shipping && touched.shipping}>
                <FormLabel htmlFor='shipping'>Shipping Cost</FormLabel>

                <Field
                    as={Input}
                    name='shipping'
                    id='shipping'
                    type='number'
                    height='3rem'
                    borderRadius='5px'
                    placeholder='Add shipping'
                    onBlur={blur}
                    _focus={{
                        outlineColor: 'gray.500',
                    }}
                />

                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.shipping && touched.shipping && errors.shipping}
                </FormErrorMessage>
            </FormControl>

            <FormControl my='1rem' isInvalid={errors.deal && touched.deal}>
                <HStack>
                    <Field
                        as={Checkbox}
                        name='deal'
                        id='deal'
                        defaultChecked={values?.deal}
                        height='3rem'
                        borderRadius='5px'
                        placeholder='select deal'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />
                    <Text>Provide a discount</Text>
                </HStack>

                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.deal && touched.deal && errors.deal}
                </FormErrorMessage>
            </FormControl>

            {values.deal && (
                <FormControl
                    my='1rem'
                    isInvalid={errors.discount && touched.discount}>
                    <FormLabel htmlFor='discount'>Discount (%)</FormLabel>

                    <Field
                        as={Input}
                        name='discount'
                        id='discount'
                        type='number'
                        height='3rem'
                        borderRadius='5px'
                        placeholder='select discount'
                        onBlur={blur}
                        _focus={{
                            outlineColor: 'gray.500',
                        }}
                    />

                    <FormErrorMessage>
                        <FormErrorIcon />
                        {errors.discount && touched.discount && errors.discount}
                    </FormErrorMessage>
                </FormControl>
            )}

            <FormControl
                isInvalid={errors.description && touched.description}
                isRequired>
                <FormLabel htmlFor='description'>description</FormLabel>

                <Field
                    as={Textarea}
                    name='description'
                    id='description'
                    type='number'
                    height='30vh'
                    borderRadius='5px'
                    placeholder='Product Description'
                    onBlur={blur}
                    _focus={{
                        outlineColor: 'gray.500',
                    }}
                />

                <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.description &&
                        touched.description &&
                        errors.description}
                </FormErrorMessage>
            </FormControl>

            <FormControl my='1rem'>
                <FormLabel htmlFor='images'>Upload product images</FormLabel>
                <DropZone />
            </FormControl>
            <FormControl my='1rem'>
                <FormLabel htmlFor='images'>Uploaded images</FormLabel>
                <ProductGallery edit={edit} />
            </FormControl>

            <FormControl my='2rem'>
                <Button
                    height='3rem'
                    width='100%'
                    type='submit'
                    colorScheme='blue'
                    borderRadius='5px'
                    isLoading={loading}
                    isDisabled={loading}>
                    {edit ? 'Edit Product' : 'Add Product'}
                </Button>
            </FormControl>
        </Box>
    )
}

ProductForm.defaultPropd = {
    submit: () => {},
    Field: () => {},
    errors: {},
    touched: {},
    loading: false,
    blur: () => {},
    values: {},
    edit: false,
}

export default ProductForm
