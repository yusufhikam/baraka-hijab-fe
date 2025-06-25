import { createContext, useEffect, useState } from 'react'
import syncCartsFromLocalStorage from '../utililties/api/carts/syncCartsFromLocalStorage'
import ToastSweetAlert from '../components/elements/Alert/Toast/ToastSweetAlert'
import { UserType } from '../types/UserType'
import { LoginType } from '../types/LoginType'
import Api from '../utililties/api/Auth/Api'

type AuthContextType = {
    user: UserType | null
    login: (data: LoginType) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    loading: boolean
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}

type AuthContextProviderProps = {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [loading, setLoading] = useState(true)

    // check auth cookie
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // getCsrfToken()
                const res = await Api.get(`/user`)

                setUser(res.data)
            } catch (error) {
                console.log('Not Authencicated', error)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    // login function
    const login = async (data: LoginType) => {
        try {
            await Api.get('/sanctum/csrf-cookie') // get csrf token

            await Api.post(`/auth/login`, data)

            const userRes = await Api.get(`/user`)

            const userData = userRes.data
            setUser(userData)

            if (userData.role !== 'customer') {
                // jika role bukan customer
                ToastSweetAlert({
                    iconToast: 'error',
                    titleToast: 'You are not allowed on this page',
                    onConfirm: () =>
                        setTimeout(
                            () => (window.location.href = '/admin'),
                            2000
                        ),
                })
                // return
                throw new Error('Unauthorized')
            } else {
                // jika role customer
                ToastSweetAlert({
                    iconToast: 'success',
                    titleToast: 'Login success',
                    onConfirm: () =>
                        setTimeout(() => (window.location.href = '/'), 2000),
                })
            }

            return userData
        } catch (error) {
            console.error(error)
            throw new Error('Login failed')
        }
    }

    const logout = async () => {
        try {
            await Api.post(`/auth/logout`)

            setUser(null)
            window.location.href = '/'
        } catch (error) {
            console.log('logout error', error)
        }
    }

    const isAuthenticated = !!user

    // sync data carts from localstorage to server
    useEffect(() => {
        if (isAuthenticated) {
            const syncCart = async () => await syncCartsFromLocalStorage()
            syncCart()
        }
    }, [isAuthenticated])

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated,
                loading,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
