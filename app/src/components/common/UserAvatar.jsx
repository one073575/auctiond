import {
    Box,
    Avatar,
    HStack,
    VStack,
    Heading,
    AvatarBadge,
    Text,
    IconButton,
} from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import invoke from '../../utils/axios.config'

function UserAvatar({ userId, hasContact, subject }) {
    const [state, setState] = useState({
        user: null,
        loading: false,
    })
    const fetchUser = async (id) => {
        try {
            setState({
                ...state,
                loading: true,
            })

            const { data = {} } = await invoke('GET', `auth/user/${id}`)

            setState({ ...state, loading: false, user: data.user })
        } catch (error) {
            setState({
                ...state,
                user: null,
                loading: false,
            })
        }
    }

    useEffect(() => {
        if (userId) {
            fetchUser(userId)
        }
    }, [userId])
    return (
        <Box>
            <HStack
                justifyContent='space-between'
                alignItems='center'
                width='100%'>
                <HStack spacing='3'>
                    <Avatar size='sm' name={state?.user?.name}>
                        <AvatarBadge
                            boxSize='1.1em'
                            bg={state?.user?.active ? 'green.500' : 'red.500'}
                        />
                    </Avatar>
                    <VStack
                        alignItems='flex-start'
                        justifyContent='flex-start'
                        spacing='0'>
                        <Heading fontSize='md'>{state?.user?.name}</Heading>
                        <Text as='small'>
                            Joined &bull;{' '}
                            {moment(state?.user?.created).format('MMM, YY')}
                        </Text>
                    </VStack>
                </HStack>
                {hasContact && (
                    <HStack
                        aria-label='actions'
                        spacing='2'
                        alignItems='center'>
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
                            href={`MAILTO:${state?.user?.email}?subject=${subject}`}
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
                            href={`https://api.whatsapp.com/send?phone=${state?.user?.number}&text=Hello, i would like to talk about ${subject}`}
                        />
                    </HStack>
                )}
            </HStack>
        </Box>
    )
}

UserAvatar.defaultProps = {
    userId: '',
    hasContact: false,
    children: () => {},
    subject: '',
}

export default UserAvatar
