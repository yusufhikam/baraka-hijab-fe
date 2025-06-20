import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../utililties/customHook/useAuth'
import { useForm } from 'react-hook-form'
import LoginLayout from '../components/layouts/AuthPage/LoginLayout'
import { LoginType } from '../types/LoginType'

const LoginPage = () => {
    const { login, isAuthenticated } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
    } = useForm<LoginType>()

    if (isAuthenticated) {
        // <Navigate to='/' replace />
        window.location.href = '/'
    }

    const {
        mutate,
        // status,
        error: errorLogin,
        isPending: isLoadingLogin,
    } = useMutation({
        mutationFn: (data: LoginType) => login(data),
        // onSuccess: () => {
        //     window.location.href = '/';
        // },
    })

    const onSubmit = (data: LoginType) => {
        // const data = watch()
        mutate(data)
    }

    return (
        // <div className="font-krona-one-regular flex h-screen items-center justify-center bg-linear-to-b from-zinc-600 via-zinc-900 to-zinc-700 text-white">
        <div className="font-krona-one-regular flex h-screen items-center justify-center bg-[url('/src/assets/images/bg/bg-newArrival.jpg')] bg-cover text-white">
            <LoginLayout
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors} // for form validation errors
                errorLogin={errorLogin}
                isLoadingLogin={isLoadingLogin}
            />
        </div>
    )
}

export default LoginPage
