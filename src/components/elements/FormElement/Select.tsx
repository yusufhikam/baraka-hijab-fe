import useDarkMode from '../../../utililties/customHook/useDarkMode'

type SelectProps = {
    labelFor?: string
    labelTitle?: string
    variantClass?: string
    errorMessage?: string
} & React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

export default function Select({
    labelFor,
    labelTitle,
    variantClass,
    errorMessage,
    ...props
}: SelectProps) {
    const { isDarkMode } = useDarkMode()
    return (
        <div className="flex w-full flex-col gap-2">
            <label className="font-bold" htmlFor={`${labelFor}`}>
                {labelTitle}
            </label>
            <select
                className={`rounded-md outline-none ${variantClass} ${
                    isDarkMode
                        ? 'focus:border-barakaprimary-dessert bg-zinc-800 focus:border-2 focus:shadow-md focus:ring-0 focus:shadow-amber-400/50'
                        : 'focus:border-2 focus:border-sky-500 focus:shadow-md focus:ring-0 focus:shadow-sky-400/50'
                }`}
                {...props}
            >
                {props.children}
            </select>
            {errorMessage && (
                <p className="ms-2 text-xs text-red-500">{errorMessage}</p>
            )}
        </div>
    )
}
