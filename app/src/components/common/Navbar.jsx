import {
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    Stack,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Center,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { FaBell, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { MdOutlineSell } from 'react-icons/md'
import { io } from 'socket.io-client'
import { usePopup } from '../../context/PopupProvider'
import { useAuth } from '../../context/AuthProvider'
import ProfileCard from './ProfileCard'
import { constants } from '../../utils/constants.config'

function Navbar() {
    const { registerOpen, loginOpen, cartOpen } = usePopup()
    const { user } = useAuth()
    const history = useHistory()

    const navLinks = [
        {
            label: 'Products',
            path: '/products',
        },

        // {
        //     label: 'Orders',
        //     path: '/orders',
        // },
    ]

    useEffect(() => {
        const socket = io(constants.baseUrl)
        socket.on('connect', () => {
            console.log('hello')
        })
    }, [])
    return (
        <Box height='10vh' width='100%' p='20px 0'>
            <Stack
                direction='row'
                alignItems='center'
                width='80%'
                mx='auto'
                justifyContent='space-between'>
                <HStack
                    p='8px'
                    border='1px dotted'
                    borderColor='gray.500'
                    borderRadius='10px'>
                    <Heading
                        color='blue.600'
                        size='lg'
                        as={Link}
                        to='/'
                        fontFamily='Kaushan Script'
                        textDecoration='line-through'
                        cursor='pointer'>
                        _AuctionD
                    </Heading>

                    <Icon as={MdOutlineSell} fontSize='1.5rem' />
                </HStack>
                <HStack
                    spacing='6'
                    justifyContent='space-around'
                    alignItems='center'
                    width='auto'
                    height='100%'>
                    <HStack
                        spacing='5'
                        justifyContent='space-around'
                        alignItems='center'
                        width='auto'
                        height='100%'>
                        {navLinks.map((link) => (
                            <Text
                                fontSize='1rem'
                                p='10px'
                                borderRadius='10px'
                                _hover={{ bg: 'gray.200' }}
                                as={NavLink}
                                key={link.label}
                                activeClassName='active-link'
                                transition='0.5s all ease'
                                to={link.path}>
                                {link.label}
                            </Text>
                        ))}
                    </HStack>
                    <HStack
                        spacing='5'
                        justifyContent='space-between'
                        alignItems='center'
                        width='auto'
                        height='100%'>
                        <Icon
                            as={FaHeart}
                            fontSize='1.1rem'
                            onClick={() =>
                                history.push(`/wishlist/${user?.id}`)
                            }
                        />
                        <Icon
                            as={FaShoppingCart}
                            fontSize='1.1rem'
                            cursor='pointer'
                            onClick={cartOpen}
                        />

                        {user && (
                            <Menu
                                flip
                                placement='top'
                                closeOnBlur
                                arrowPadding='4'
                                closeOnSelect>
                                <MenuButton
                                    as={IconButton}
                                    fontSize='1.1rem'
                                    _hover={{ bg: 'transparent' }}
                                    _focus={{
                                        bg: 'transparent',
                                        outline: 'none',
                                    }}
                                    _active={{
                                        bg: 'transparent',
                                        outline: 'none',
                                    }}
                                    aria-label='Options'
                                    icon={<FaBell />}
                                    variant='outline'
                                />
                                <MenuList>
                                    <MenuItem>New Tab</MenuItem>
                                    <MenuItem alignItems='center'>
                                        <Center>View all &rarr;</Center>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                        <Text> | </Text>
                        {user ? (
                            <ProfileCard user={user} />
                        ) : (
                            <HStack spacing='3'>
                                <Text
                                    fontSize='1rem'
                                    size='md'
                                    cursor='pointer'
                                    onClick={loginOpen}>
                                    Sign in
                                </Text>

                                <Button
                                    height='2.5rem'
                                    onClick={registerOpen}
                                    width='auto'
                                    minWidth='30%'
                                    colorScheme='blue'>
                                    Sign up
                                </Button>
                            </HStack>
                        )}
                    </HStack>
                </HStack>
            </Stack>
        </Box>
    )
}

export default Navbar
