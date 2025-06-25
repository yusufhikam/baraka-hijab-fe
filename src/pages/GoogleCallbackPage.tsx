import { Loader2 } from 'lucide-react'
import useGoogleCallback from '../utililties/customHook/useGoogleCallback'

export default function GoogleCallbackPage() {
    useGoogleCallback()

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
