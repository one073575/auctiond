import React from 'react'
import AlertProvider from './AlertProvider'
import AuthProvider from './AuthProvider'
import PopupProvider from './PopupProvider'

function ContextProvider({ children }) {
    return (
        <AlertProvider>
            <AuthProvider>
                <PopupProvider>{children}</PopupProvider>
            </AuthProvider>
        </AlertProvider>
    )
}

export default ContextProvider
