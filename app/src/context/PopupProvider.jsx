import React, { createContext, useContext } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import RegisterModal from '../components/modals/RegisterModal'
import LoginModal from '../components/modals/LoginModal'

const PopupContext = createContext({})

function PopupProvider({ children }) {
    const {
        isOpen: registerIsOpen,
        onClose: registerClose,
        onOpen: registerOpen,
    } = useDisclosure()

    const {
        isOpen: loginIsOpen,
        onClose: loginClose,
        onOpen: loginOpen,
    } = useDisclosure()

    const {
        isOpen: cartIsOpen,
        onClose: cartClose,
        onOpen: cartOpen,
    } = useDisclosure()

    return (
        <PopupContext.Provider
            value={{
                registerOpen,
                registerClose,
                loginOpen,
                loginClose,
                cartOpen,
            }}>
            <RegisterModal
                isOpen={registerIsOpen}
                onClose={registerClose}
                loginOpen={loginOpen}
            />
            <LoginModal
                isOpen={loginIsOpen}
                onClose={loginClose}
                registerOpen={registerOpen}
            />

            {children}
        </PopupContext.Provider>
    )
}
export const usePopup = () => useContext(PopupContext)
export default PopupProvider
