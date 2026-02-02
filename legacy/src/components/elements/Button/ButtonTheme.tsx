import { Moon, Sun } from 'lucide-react'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import Button from './Button'

type ButtonThemeProps = {
    variant?: string
}

const ButtonTheme = ({ variant }: ButtonThemeProps) => {
    const { isDarkMode, toggleTheme } = useDarkMode()

    return (
        <Button
            type="button"
            variant={`${variant} flex items-center  w-14 rounded-full border-2 transition-all duration-300  ${isDarkMode ? 'bg-red-950 hover:border-barakaprimary-dessert border-black' : 'bg-slate-200 hover:border-barakaprimary-madder'}`}
            onClick={toggleTheme}
        >
            <div
                className={`rounded-full ring-1 transition-all duration-300 hover:shadow-2xs ${
                    isDarkMode
                        ? 'translate-x-0 rotate-0 bg-slate-800 text-yellow-500 shadow-amber-300'
                        : 'translate-x-[26px] rotate-180 bg-white text-rose-600 shadow-gray-500'
                }`}
            >
                {isDarkMode ? (
                    <Moon size={30} className="p-1" />
                ) : (
                    <Sun
                        size={30}
                        className="rounded-full border border-b-slate-50 p-1 shadow"
                    />
                )}
            </div>
        </Button>
    )
}

export default ButtonTheme
