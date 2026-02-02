import React from 'react'
import useDarkMode from '../../../utililties/customHook/useDarkMode'

type InputProps = {
    labelTitle: string
    labelFor: string
    variantClass?: string
    errorMessage?: string
    errorMessageVariantClass?: string
    htmlElement?: React.ReactNode
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

export default function Input({
    labelTitle,
    labelFor,
    variantClass,
    errorMessage,
    errorMessageVariantClass,
    htmlElement,
    ...props
}: InputProps) {
    const { isDarkMode } = useDarkMode()
    return (
        <div className="flex flex-col justify-center gap-2">
            <label htmlFor={`${labelFor}`} className="font-bold">
                {labelTitle}
            </label>
            <div className="flex items-center">
                {htmlElement}
                <input
                    className={`w-full rounded-md ${variantClass} ${
                        isDarkMode
                            ? 'focus:border-barakaprimary-dessert bg-zinc-800 text-white focus:border-2 focus:shadow-md focus:ring-0 focus:shadow-amber-400/50'
                            : 'focus:border-2 focus:border-sky-500 focus:shadow-md focus:ring-0 focus:shadow-sky-400/50'
                    }`}
                    {...props}
                />
            </div>
            {errorMessage && (
                <p
                    className={`text-xs text-red-500 ${errorMessageVariantClass}`}
                >
                    {errorMessage}
                </p>
            )}
        </div>
    )
}
