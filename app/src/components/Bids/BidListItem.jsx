import { HStack, Tr, Td, IconButton, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaCartPlus } from 'react-icons/fa'
import invoke from '../../utils/axios.config'

function BidListItem({ bid, product }) {
    const [state, setState] = useState({
        user: null,
        loading: false,
    })

    const fetchBidUser = async (userID) => {
        try {
            setState({ ...state, loading: true })
            const { data = {} } = await invoke('GET', `auth/user/${userID}`)
            setState({ ...state, loading: false, user: data.user })
        } catch (error) {
            setState({ ...state, loading: false })
        }
    }

    useEffect(() => {
        if (bid?.userId) {
            fetchBidUser(bid?.userId)
        }
    }, [bid?.userId])
    return (
        <Tr>
            {/* <pre>{JSON.stringify(state.user, null, 3)}</pre> */}
            <Td>{state?.user?.name}</Td>
            <Td>Ksh {bid?.bid}</Td>
            <Td>
                <HStack aria-label='actions' spacing='2' alignItems='center'>
                    <IconButton
                        as='a'
                        bg='gray.100'
                        color='blue.700'
                        fontSize='lg'
                        _hover={{ bg: 'gray.100' }}
                        _focus={{ bg: 'gray.100', outline: 'none' }}
                        _active={{ bg: 'gray.100', outline: 'none' }}
                        colorScheme='gray'
                        icon={<FaPhoneAlt />}
                        href={`tel:${state?.user?.number}`}
                    />
                    <IconButton
                        as='a'
                        bg='gray.100'
                        color='blue.700'
                        fontSize='lg'
                        _hover={{ bg: 'gray.100' }}
                        _focus={{ bg: 'gray.100', outline: 'none' }}
                        _active={{ bg: 'gray.100', outline: 'none' }}
                        colorScheme='gray'
                        icon={<FaEnvelope />}
                        href={`MAILTO:${state?.user?.email}?subject=${product?.name}`}
                    />
                    <IconButton
                        as='a'
                        bg='gray.100'
                        color='whatsapp.700'
                        fontSize='lg'
                        _hover={{ bg: 'gray.100' }}
                        _focus={{ bg: 'gray.100', outline: 'none' }}
                        _active={{ bg: 'gray.100', outline: 'none' }}
                        icon={<FaWhatsapp />}
                        href={`https://api.whatsapp.com/send?phone=${state?.user?.number}&text=Hello, i would like to talk about ${product?.name}`}
                    />
                </HStack>
            </Td>
            <Td>
                <HStack aria-label='actions' spacing='2' alignItems='center'>
                    <Tooltip hasArrow label='add to bidders cart'>
                        <IconButton
                            bg='gray.100'
                            color='blue.700'
                            fontSize='lg'
                            _hover={{ bg: 'gray.100' }}
                            _focus={{ bg: 'gray.100', outline: 'none' }}
                            _active={{ bg: 'gray.100', outline: 'none' }}
                            colorScheme='gray'
                            icon={<FaCartPlus />}
                        />
                    </Tooltip>
                </HStack>
            </Td>
        </Tr>
    )
}

BidListItem.defaultProps = {
    bid: {},
    product: {},
}

export default BidListItem
