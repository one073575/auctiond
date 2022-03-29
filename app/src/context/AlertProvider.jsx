import React, { createContext, useContext, useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'

const AlertContext = createContext({})

function AlertProvider({ children }) {
    const toast = useToast()
    const [alert, setAlert] = useState({
        error: null,
        message: null,
        authError: null,
    })

    async function setError(error) {
        setAlert({ ...alert, error })
    }

    async function setMessage(message) {
        setAlert({ ...alert, message })
    }

    async function setAuthError(error) {
        setAlert({ ...alert, authError: error })
    }

    async function clearAlerts() {
        setAlert({ error: null, message: null, authError: null })
    }

    useEffect(() => {
        if (alert.error) {
            toast({
                title: 'Error Alert',
                description: alert.error,
                status: 'error',
                isClosable: true,
                position: 'bottom',
                duration: 4000,
            })
        }

        if (alert.message) {
            toast({
                title: 'Success Alert',
                description: alert.message,
                status: 'success',
                isClosable: true,
                position: 'bottom',
                duration: 4000,
            })
        }
        setTimeout(() => {
            clearAlerts()
        }, 4000)
    }, [alert.error, alert.message, clearAlerts])
    return (
        <AlertContext.Provider
            value={{
                ...alert,
                clearAlerts,
                setError,
                setAuthError,
                setMessage,
            }}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext)
export default AlertProvider
