import React, { useState } from 'react'
import {
    Badge,
    Box,
    Heading,
    HStack,
    Icon,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import moment from 'moment'
import { CgMenuRight } from 'react-icons/cg'
import {
    BsBoxArrowDown,
    BsBoxArrowInUp,
    BsImages,
    BsPencil,
} from 'react-icons/bs'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { MdOutlineFeaturedVideo } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { updateProduct, deleteProduct } from '../../store/slices/Products'
import { useAlert } from '../../context/AlertProvider'
import invoke from '../../utils/axios.config'
import EditStatusModal from '../modals/Product/EditStatusModal'
import DeleteModal from '../modals/DeleteModal'
import LargeGallerySlide from '../modals/Product/LargeGallerySlide'
import EditProductModal from '../modals/Product/EditProductModal'
import { setGallery } from '../../store/slices/Gallery'
import BidListModal from '../modals/bids/BidListModal'
import BidTimer from './BidTimer'

function UserProductListItem({ product }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { setError, setMessage } = useAlert()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: _delIsOpen,
        onOpen: _delOpen,
        onClose: _delClose,
    } = useDisclosure()

    const {
        isOpen: _imgIsOpen,
        onOpen: _imgOpen,
        onClose: _imgClose,
    } = useDisclosure()

    const {
        isOpen: editIsOpen,
        onOpen: editOpen,
        onClose: editClose,
    } = useDisclosure()

    const {
        isOpen: bidIsOpen,
        onOpen: bidOpen,
        onClose: bidClose,
    } = useDisclosure()

    async function updateItem(id, update) {
        try {
            const { data = {} } = await invoke('PUT', `product/${id}`, update)

            dispatch(updateProduct({ id, product: data.product }))
            setMessage(data.message)
        } catch (error) {
            setError(error.response.data || 'Something went wrong')
        }
    }
    async function deleteItem(id) {
        try {
            setLoading(true)
            const { data = {} } = await invoke('DELETE', `product/${id}`)

            dispatch(deleteProduct(id))
            setMessage(data.message)

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.response.data || 'Something went wrong')
        }
    }

    return (
        <>
            <EditProductModal
                product={product}
                isOpen={editIsOpen}
                onClose={editClose}
            />
            <EditStatusModal
                isOpen={isOpen}
                onClose={onClose}
                product={product}
            />

            <BidListModal
                onClose={bidClose}
                isOpen={bidIsOpen}
                product={product}
            />

            <DeleteModal
                onClose={_delClose}
                isOpen={_delIsOpen}
                label={product?.name}
                id={product?.id}
                loading={loading}
                delFunc={async (id) => {
                    await deleteItem(id)
                    onClose()
                }}
            />
            <LargeGallerySlide
                onClose={_imgClose}
                isOpen={_imgIsOpen}
                product={product}
            />

            <Box
                key={product?.id}
                bg='gray.50'
                borderRadius='10px'
                position='relative'
                p='10px'>
                <Box
                    height='30vh'
                    bg='gray.200'
                    borderRadius='10px'
                    position='relative'>
                    <Box
                        position='absolute'
                        top='0'
                        left='0'
                        width='100%'
                        height='100%'
                        p='10px'>
                        <HStack
                            alignItems='center'
                            justifyContent='space-between'>
                            <HStack>
                                <Badge
                                    colorScheme={
                                        product?.active ? 'blue' : 'gray'
                                    }
                                    borderRadius='3px'
                                    p='2px 10px'
                                    fontWeight='500'>
                                    {product?.active ? 'Active' : 'Inactive'}
                                </Badge>
                                {product?.deal ? (
                                    <Badge
                                        colorScheme={
                                            product?.active ? 'blue' : 'gray'
                                        }
                                        borderRadius='3px'
                                        p='2px 10px'
                                        fontWeight='500'>
                                        Discount : {product?.discount} %
                                    </Badge>
                                ) : null}
                            </HStack>

                            <Icon
                                color='#fff'
                                cursor='pointer'
                                fontSize='1.5rem'
                                onClick={_imgOpen}
                                as={BsImages}
                            />
                        </HStack>
                    </Box>
                    <Image
                        height='100%'
                        width='100%'
                        mb='1rem'
                        objectFit='cover'
                        borderRadius='10px'
                        alt={product?.images[0]?.pubId}
                        src={product?.images[0]?.url}
                    />
                </Box>
                <HStack
                    my='1rem'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Badge
                        fontSize='0.9rem'
                        colorScheme='green'
                        fontWeight='500'
                        borderRadius='3px'
                        textTransform='capitalize'>
                        KSH {product?.price}
                    </Badge>

                    <HStack>
                        <Badge
                            fontSize='0.9rem'
                            colorScheme={
                                product?.status === 'new'
                                    ? 'orange'
                                    : product?.status === 'sale'
                                    ? 'blue'
                                    : product?.status === 'bid'
                                    ? 'blue'
                                    : 'red'
                            }
                            fontWeight='500'
                            borderRadius='3px'
                            textTransform='capitalize'>
                            {product?.status}
                        </Badge>
                        <Badge
                            fontSize='0.9rem'
                            colorScheme='gray'
                            fontWeight='500'
                            borderRadius='3px'
                            textTransform='capitalize'>
                            {product?.featured ? 'Featured' : 'Not featured'}
                        </Badge>
                    </HStack>
                </HStack>
                <HStack
                    width='100%'
                    justifyContent='space-between'
                    alignItems='flex-start'>
                    <Box width='100%'>
                        <Heading fontSize='1.3rem'>{product?.name}</Heading>
                        <Text>
                            Added :{' '}
                            {moment(product?.created).format('DD, MMM YYYY')}
                        </Text>
                    </Box>
                    <Menu closeOnSelect closeOnBlur>
                        <MenuButton
                            bg='gray.300'
                            _active={{
                                bg: 'gray.300',
                                outline: 'none',
                            }}
                            _focus={{ bg: 'gray.300', outline: 'none' }}
                            _hover={{ bg: 'gray.300', outline: 'none' }}
                            edit
                            as={IconButton}
                            aria-label='Options'
                            icon={<CgMenuRight />}
                            variant='solid'
                        />
                        <MenuList
                            border='2px solid'
                            borderColor='gray.400'
                            p='10px'>
                            <MenuItem
                                borderRadius='5px'
                                _hover={{
                                    bg: 'teal.100',
                                    color: 'teal.700',
                                }}
                                onClick={async () => {
                                    const update = {
                                        active: !product?.active,
                                    }

                                    await updateItem(product?.id, update)
                                }}
                                icon={
                                    product?.active ? (
                                        <BsBoxArrowDown />
                                    ) : (
                                        <BsBoxArrowInUp />
                                    )
                                }>
                                {product?.active ? 'Deactivate' : 'Activate'}
                            </MenuItem>
                            <MenuItem
                                borderRadius='5px'
                                isDisabled={product?.status === 'sold'}
                                onClick={onOpen}
                                _hover={{
                                    bg: 'blue.100',
                                    color: 'blue.700',
                                }}
                                icon={<BsPencil />}>
                                Change status
                            </MenuItem>
                            <MenuItem
                                borderRadius='5px'
                                onClick={async () => {
                                    const update = {
                                        featured: !product?.featured,
                                    }

                                    await updateItem(product?.id, update)
                                }}
                                _hover={{
                                    bg: 'blue.100',
                                    color: 'blue.700',
                                }}
                                icon={<MdOutlineFeaturedVideo />}>
                                {product?.featured
                                    ? 'Remove featured'
                                    : 'Add featured'}
                            </MenuItem>{' '}
                            <MenuDivider />
                            <MenuItem
                                borderRadius='5px'
                                onClick={() => {
                                    dispatch(setGallery(product?.images))
                                    editOpen()
                                }}
                                _hover={{
                                    bg: 'blue.100',
                                    color: 'blue.700',
                                }}
                                icon={<FiEdit />}>
                                Edit Product
                            </MenuItem>
                            <MenuItem
                                borderRadius='5px'
                                onClick={_delOpen}
                                _hover={{
                                    bg: 'red.100',
                                    color: 'red.700',
                                }}
                                icon={<FiTrash2 />}>
                                Delete Product
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
                <Text>
                    {(product?.status === 'bid' ||
                        product?.status === 'bid ended') && (
                        <HStack
                            justifyContent='space-between'
                            width='100%'
                            my='0.5rem'>
                            <BidTimer bidEndDate={product?.bidEnd} size='sm' />
                            <Badge
                                cursor='pointer'
                                colorScheme='blue'
                                onClick={bidOpen}
                                fontWeight='500'
                                borderRadius='5px'
                                p='3px'
                                textDecoration='ButtonFace'>
                                Show bids &rarr;
                            </Badge>
                        </HStack>
                    )}
                </Text>
            </Box>
        </>
    )
}

export default UserProductListItem
