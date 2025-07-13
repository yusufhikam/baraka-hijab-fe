import { Heart } from 'lucide-react'
import H1 from '../components/elements/Title Header/H1'
import useDarkMode from '../utililties/customHook/useDarkMode'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TransactionSuccessPage = () => {
    const { isDarkMode } = useDarkMode()
    const [timer, setTimer] = useState(5)
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)

    const snapToken = searchParams.get('snap_token')

    useEffect(() => {
        if (!snapToken) {
            navigate('/404', { replace: true })
        } else {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1)
            }, 1000)

            if (timer === 0) navigate('/transactions')
            return () => clearInterval(interval)
        }
    }, [timer, navigate, snapToken])

    return (
        <div
            className={`flex h-screen w-full flex-col items-center justify-center ${isDarkMode ? '' : 'bg-gray-100'}`}
        >
            <div className="rounded-md border-2 border-green-500 bg-green-500/30 p-10 shadow-md shadow-black/30">
                <div className="text-center">
                    <H1>Your Transaction is Successful</H1>
                </div>
                <img
                    src="/src/assets/svg/gift_vector.svg"
                    className="mx-auto my-10 w-20 animate-bounce drop-shadow-xl drop-shadow-black/30"
                    alt="gift_vector"
                />
                <div className="flex items-center justify-center gap-2">
                    <H1>Thank You for your purchase</H1>
                    <Heart fill="pink" stroke="red" />
                </div>
                <p className="mt-2">
                    You will be redirected to the transaction page in{' '}
                    <span className="underline decoration-2 underline-offset-4">
                        {timer}
                    </span>{' '}
                    seconds
                </p>
            </div>
        </div>
    )
}

export default TransactionSuccessPage
