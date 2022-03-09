import {
    Avatar,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
    MdOutlineLogout,
    MdOutlinePayment,
    MdOutlineShoppingBag,
    MdOutlineShoppingCart,
} from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../context/AuthProvider'
import { clearBidStore } from '../../store/slices/Bids'
import { clearOrderStore } from '../../store/slices/Orders'
import { clearProductStore } from '../../store/slices/Products'

function ProfileCard({ user }) {
    const { logout } = useAuth()
    const history = useHistory()
    const dispatch = useDispatch()

    const navMenus = [
        {
            label: 'My products',
            icon: <MdOutlineShoppingBag />,
            path: `/myproducts/${user.id}`,
        },
        {
            label: 'My orders',
            icon: <MdOutlineShoppingCart />,
            path: `/orders/${user.id}`,
        },
        {
            label: 'Profile',
            icon: <CgProfile />,
            path: `/profile/${user.id}`,
        },
    ]
    return (
        <HStack alignItems='center' justifyContent='space-between'>
            <Text fontWeight='600' textTransform='capitalize'>
                {user.name}
            </Text>
            <Menu>
                <MenuButton
                    cursor='pointer'
                    as={Avatar}
                    name={user.name}
                    size='sm'
                    p='5px'
                    borderRadius='5px'
                    aria-label='Options'
                    variant='outline'
                />
                <MenuList>
                    {navMenus.map((nav) => (
                        <MenuItem
                            as={Link}
                            to={nav.path}
                            key={nav.label}
                            icon={nav.icon}>
                            {nav.label}
                        </MenuItem>
                    ))}
                    <MenuDivider />
                    <MenuItem
                        as={Link}
                        to={`/payments/${user.id}`}
                        icon={<MdOutlinePayment />}>
                        Payments
                    </MenuItem>
                    <MenuItem
                        icon={<MdOutlineLogout />}
                        onClick={() => {
                            logout()
                            dispatch(clearBidStore())
                            dispatch(clearOrderStore())
                            dispatch(clearProductStore())
                            history.push('/')
                        }}>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    )
}

export default ProfileCard
