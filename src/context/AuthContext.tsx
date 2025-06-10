import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { URLBase } from '../utililties/api/urlBase'
import syncCartsFromLocalStorage from '../utililties/api/carts/syncCartsFromLocalStorage'
import ToastSweetAlert from '../components/elements/Alert/Toast/ToastSweetAlert'
import { UserType } from '../types/UserType'

type AuthContextType = {
    user: UserType | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    loading: boolean
}

type AuthContextProviderProps = {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    // cek localstorage pada saat pertama kali render app
    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }

        setLoading(false)
    }, [])

    // login function
    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post(`${URLBase}/auth/login`, {
                email,
                password,
            })

            const token = res.data.auth_token

            const userRes = await axios.get(`${URLBase}/user`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            const userData = userRes.data

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
                return
            } else {
                // jika role customer
                ToastSweetAlert({
                    iconToast: 'success',
                    titleToast: 'Login success',
                    onConfirm: () =>
                        setTimeout(() => (window.location.href = '/'), 2000),
                })
            }

            // simpan token dan user ke state
            setToken(res.data.auth_token)
            setUser(userData)

            // simpan token dan user ke localstorage
            localStorage.setItem('auth_token', res.data.auth_token)
            localStorage.setItem('user', JSON.stringify(userRes.data))

            return res.data
        } catch (error) {
            console.error(error)
            throw new Error('Login failed')
        }
    }

    // logout function
    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')

        window.location.href = '/'
    }

    const isAuthenticated = !!token

    // sync data carts from localstorage to server
    useEffect(() => {
        if (isAuthenticated) {
            const syncCart = async () => await syncCartsFromLocalStorage()
            syncCart()
        }
    }, [isAuthenticated])

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, isAuthenticated, loading }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
