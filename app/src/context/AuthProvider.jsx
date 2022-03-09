import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { useAlert } from './AlertProvider'
import invoke from '../utils/axios.config'

const AuthContext = createContext({})

function AuthProvider({ children }) {
    const accessToken = Cookies.get('access-token')
    const { setAuthError, setError, setMessage } = useAlert()

    const [state, setState] = useState({
        user: null,
        users: [],
        loading: false,
        isAuthenticated: false,
    })

    async function login(cred = {}) {
        try {
            setState({ ...state, loading: true })
            const { data = {} } = await invoke('POST', '/auth/login', cred)

            Cookies.set('auth-token', data.authToken)
            Cookies.set('access-token', data.accessToken)

            setState({
                ...state,
                loading: false,
                user: data.user,
                isAuthenticated: true,
            })
        } catch (error) {
            setState({ ...state, loading: false })
            setAuthError(error.response.data || 'Something went wrong')
        }
    }

    async function register(params = {}) {
        try {
            setState({ ...state, loading: true })
            const { data = {} } = await invoke('POST', '/auth/register', params)

            Cookies.set('auth-token', data.authToken)
            Cookies.set('access-token', data.accessToken)

            setState({
                ...state,
                loading: false,
                user: data.user,
                isAuthenticated: true,
            })
        } catch (error) {
            setState({ ...state, loading: false })
            setAuthError(error.response.data || 'Something went wrong')
        }
    }

    async function fetchUsers() {
        try {
            setState({ ...state, loading: true })
            const { data = {} } = await invoke('GET', '/auth/users')

            setState({ ...state, loading: false, users: data.users })
        } catch (error) {
            setState({ ...state, loading: false })
            setError(error.response.data || 'Something went wrong')
        }
    }

    async function editUser(id = '', update = {}) {
        try {
            setState({ ...state, loading: true })
            const { data = {} } = await invoke(
                'PUT',
                `/auth/user/${id}`,
                update
            )

            setState({ ...state, loading: false, user: data.user })

            Cookies.remove('access-token')
            Cookies.set('access-token', data.accessToken)

            setMessage(data.message)
        } catch (error) {
            setState({ ...state, loading: false })
            setError(error.response.data || 'Something went wrong')
        }
    }

    async function logout() {
        try {
            // TODO: reset redux store = function to reset
            Cookies.remove('auth-token')
            Cookies.remove('access-token')

            setState({
                ...state,
                loading: false,
                user: null,
                users: [],
                isAuthenticated: false,
            })
        } catch (error) {
            setAuthError(error || 'Something went wrong')
        }
    }

    async function deleteUser(id = '') {
        try {
            setState({ ...state, loading: true })
            const { data = {} } = await invoke('DELETE', `/auth/user/${id}`)

            setState({
                ...state,
                loading: false,
                users: state.users.filter((user) => user.id !== data.user.id),
            })
            setMessage(data.message)
        } catch (error) {
            setState({ ...state, loading: false })
            setError(error.response.data || 'Something went wrong')
        }
    }

    const loadUser = useCallback(async (token) => {
        try {
            if (token) {
                const decoded = jwtDecode(token)

                const authenticated = {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    active: decoded.active,
                    number: decoded.number,
                    role: decoded.role,
                    created: decoded.created,
                }

                setState({ ...state, user: authenticated })
            } else {
                setState({ ...state, user: null })
            }
        } catch (error) {
            setAuthError(error.response.data || 'Something went wrong')
        }
    }, [])

    useEffect(() => {
        if (accessToken) {
            loadUser(accessToken)
        }
    }, [accessToken])

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                fetchUsers,
                editUser,
                deleteUser,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
