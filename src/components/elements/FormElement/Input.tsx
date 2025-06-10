import useDarkMode from '../../../utililties/customHook/useDarkMode'

type InputProps = {
    labelTitle: string
    labelFor: string
    variantClass?: string
    errorMessage?: string
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

export default function Input({
    labelTitle,
    labelFor,
    variantClass,
    errorMessage,
    ...props
}: InputProps) {
    const { isDarkMode } = useDarkMode()
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={`${labelFor}`} className="font-bold">
                {labelTitle}
            </label>
            <input
                className={`rounded-md ${variantClass} ${
                    isDarkMode
                        ? 'focus:border-barakaprimary-dessert bg-zinc-800 focus:border-2 focus:shadow-md focus:ring-0 focus:shadow-amber-400/50'
                        : 'focus:border-2 focus:border-sky-500 focus:shadow-md focus:ring-0 focus:shadow-sky-400/50'
                }`}
                {...props}
            />
            {errorMessage && (
                <p className="ms-2 text-xs text-red-500">{errorMessage}</p>
            )}
        </div>
    )
}
