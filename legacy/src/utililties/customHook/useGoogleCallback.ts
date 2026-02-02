import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import { useEffect } from "react"
import Api from "../api/Auth/Api"

const useGoogleCallback = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()


    useEffect(() => {
        const getUser = async () => {
            try {
                const userRes = await Api.get(`/user`)

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

        getUser()
    }, [navigate, setUser])
}

export default useGoogleCallback