type QuantityErrorMessageProps = {
    quantityError: string | null
}
export const QuantityErrorMessage = (props: QuantityErrorMessageProps) => {
    const { quantityError } = props
    return (
        <p className="text-red-500 font-poppins-regular bg-red-200 rounded text-center p-2 w-fit mx-auto">{quantityError}</p>
    )
}