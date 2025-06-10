type ErrorResponseMessagesProps = {
    variant?: string,
    children: React.ReactNode
}

const ErrorResponseMessages = ({ variant, children }: ErrorResponseMessagesProps) => {

    return (
        <p className={`${variant} rounded-md  bg-red-600 text-white font-sans text-center`}>{children}</p>
    )
}

export default ErrorResponseMessages;