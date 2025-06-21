import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../utililties/customHook/useAuth'
import axios from 'axios'
import { URLBase } from '../utililties/api/urlBase'

export default function GoogleCallbackPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { setToken, setUser } = useAuth()

    const location = useLocation()

    useEffect(() => {
        const token = searchParams.get('token')

        if (token) {
            const verifyToken = async () => {
                try {
                    const userRes = await axios.get(`${URLBase}/user`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })

                    // simpan localstorage
                    localStorage.setItem('auth_token', token)
                    localStorage.setItem('user', JSON.stringify(userRes.data))

                    setToken(token)
                    setUser(userRes.data)

                    // redirect halaman utama
                    navigate('/', { replace: true })
                } catch (error) {
                    console.error(error)
                    navigate('/login', {
                        state: { error: 'Login failed. Please try again.' },
                        replace: true,
                    })
                }
            }

            verifyToken()
        } else {
            navigate('/login', { replace: true })
        }
    }, [searchParams, navigate, location, setToken, setUser])

    // useEffect(() => {
    //     console.log(window.location.href)
    //     console.log('GoogleCallbackPage rendered')

    //     const token = searchParams.get('token')
    //     const user = searchParams.get('user')
    //     console.log({ token, user })

    //     if (token && user) {
    //         try {
    //             const userData = JSON.parse(atob(user))

    //             localStorage.setItem('auth_token', token)
    //             localStorage.setItem('user', JSON.stringify(userData))

    //             ToastSweetAlert({
    //                 iconToast: 'success',
    //                 titleToast: 'Login dengan Google berhasil',
    //                 onConfirm: () =>
    //                     navigate('/', {
    //                         state: { fromGoogleAuth: true },
    //                         replace: true,
    //                     }),
    //             })
    //         } catch (e) {
    //             console.error('Invalid user data', e)
    //             navigate('/login', {
    //                 state: { error: 'Invalid user data from Google' },
    //                 replace: true,
    //             })
    //         }
    //     } else {
    //         // Cek jika ada error
    //         const error = searchParams.get('error')
    //         if (error) {
    //             navigate('/login', {
    //                 state: { error: decodeURIComponent(error) },
    //                 replace: true,
    //             })
    //         } else {
    //             navigate('/login', { replace: true })
    //         }
    //     }
    // }, [searchParams, navigate])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="mt-10 text-center text-2xl font-bold">
                Processing...
            </h1>
            <p className="mt-4 text-center text-gray-600">
                Please wait while we process your Google login.
            </p>
            <div className="mt-6 flex justify-center">
                <div className="loader">
                    <Loader2 className="animate-spin" />
                </div>{' '}
                {/* Add your loader here */}
            </div>
        </div>
    )
}
