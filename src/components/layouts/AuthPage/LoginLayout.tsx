import { Link } from 'react-router-dom'
import Button from '../../elements/Button/Button'
import Card from '../../elements/Card/Card'
import Input from '../../elements/FormElement/Input'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import H1 from '../../elements/Title Header/H1'
import {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
} from 'react-hook-form'
import { LoginType } from '../../../types/LoginType'

type LoginLayoutProps = {
    register: UseFormRegister<LoginType>
    handleSubmit: UseFormHandleSubmit<LoginType>
    onSubmit: SubmitHandler<LoginType>
    errors: FieldErrors<LoginType>
    errorLogin: Error | null
    isLoadingLogin: boolean
}
const LoginLayout = ({
    register,
    handleSubmit,
    errors,
    errorLogin,
    onSubmit,
    isLoadingLogin,
}: LoginLayoutProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false)
    const handleAuthGoogle = () => {
        setLoadingGoogle(true)
        window.location.href = `http://127.0.0.1:8000/auth/google/redirect`
    }

    return (
        <Card
            className={`flex w-[80%] flex-col gap-3 rounded-md border bg-white/30 p-5 text-xs backdrop-blur-sm sm:text-base lg:w-1/3`}
        >
            <div className="text-center">
                <Link
                    to={'/'}
                    className="font-krona-one-bold hover:text-barakaprimary-dessert text-center text-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                >
                    BARAKA HIJAB
                </Link>
                <hr className="mx-auto mt-3 w-1/5" />
            </div>

            <div className="mb-5 text-center">
                <H1>Welcome Back</H1>
                <p className="font-poppins-regular mt-2 text-xs">
                    Enter your email and password to access your account.
                </p>
            </div>
            <form
                className={`flex flex-col gap-2 px-5`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                    id="email"
                    labelFor="email"
                    labelTitle="Email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    variantClass={`font-poppins-semibold text-black`}
                    errorMessage={errors.email?.message}
                    errorMessageVariantClass="font-poppins-regular bg-red-500/15 px-2 py-1 rounded-sm border border-red-500"
                />
                <div className="relative">
                    <Input
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        id="password"
                        labelFor="password"
                        labelTitle="Password"
                        type={`${showPassword ? 'text' : 'password'}`}
                        placeholder="Enter your password"
                        variantClass={`font-poppins-semibold text-black`}
                        errorMessage={errors.password?.message}
                        errorMessageVariantClass="font-poppins-regular bg-red-500/15 px-2 py-1 rounded-sm border border-red-500"
                    />
                    <Button
                        type="button"
                        variant="absolute right-2 text-black top-10 hover:text-barakaprimary-madder"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                </div>

                {errorLogin && (
                    <p className="font-poppins-regular rounded-sm border border-red-500 bg-red-500/20 text-center text-xs text-red-500">
                        Login Failed
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={isLoadingLogin}
                    variant={`flex mt-5 items-center justify-center gap-3 bg-barakaprimary-madder rounded-sm py-2 hover:bg-black transition-all duration-300 ${isLoadingLogin && 'cursor-wait'}`}
                >
                    {isLoadingLogin ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Signing In...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>

            {/* LOGIN WITH GOOGLE */}
            <div className="flex w-full flex-col gap-3 px-5">
                <p className="font-poppins-regular text-center text-xs">Or</p>
                <Button
                    type="button"
                    variant="flex gap-3 items-center mx-auto border w-full py-2 px-2 justify-center rounded-sm hover:bg-black hover:text-white transition-all duration-300 hover:border-black bg-zinc-500"
                    // onClick={loginGoogle}
                    onClick={handleAuthGoogle}
                    disabled={loadingGoogle}
                >
                    {loadingGoogle ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Redirecting...
                        </>
                    ) : (
                        <>
                            <img
                                src="/src/assets/images/logo/Google__G__logo.svg.png"
                                alt="google_logo"
                                className="h-5 w-5"
                            />
                            Sign In with Google
                        </>
                    )}
                </Button>
            </div>

            <p className="font-poppins-regular text-center text-xs">
                Don't have an account?{' '}
                <Link
                    to={'/register'}
                    className="font-bold text-sky-500 hover:text-sky-300"
                >
                    Sign Up
                </Link>
            </p>
        </Card>
    )
}

export default LoginLayout
