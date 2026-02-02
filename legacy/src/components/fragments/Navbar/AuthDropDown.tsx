import { Link } from 'react-router-dom'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import { useAuth } from '../../../utililties/customHook/useAuth'
import Button from '../../elements/Button/Button'
import Modal from '../../elements/Modal/Modal'
import { X } from 'lucide-react'

type AuthDropDownProps = {
    showAuthDropDown: boolean
    setShowAuthDropDown: React.Dispatch<React.SetStateAction<boolean>>
}
export const AuthDropDown = ({
    showAuthDropDown,
    setShowAuthDropDown,
}: AuthDropDownProps) => {
    const { isDarkMode } = useDarkMode()
    const { logout, isAuthenticated, user } = useAuth()

    const authButtonClass = `p-1 w-full text-center transition-all duration-300 ${isDarkMode ? 'hover:bg-barakaprimary-madder hover:text-white' : 'hover:bg-barakaprimary-snow hover:text-black'}`

    return (
        <Modal
            onClose={() => setShowAuthDropDown(false)}
            isOpen={showAuthDropDown}
            animationType="none"
            variant={`fixed top-0 z-3 sm:top-15 sm:p-0 p-10 flex flex-col gap-2 sm:rounded-md shadow-md font-poppins-semibold
                ${
                    showAuthDropDown
                        ? 'right-0 sm:right-5 translate-y-0 w-full sm:w-56 h-full sm:h-auto'
                        : 'sm:w-56 h-full sm:h-auto w-full sm:-translate-y-4 translate-y-0 right-0 translate-x-full sm:translate-x-0 sm:right-5'
                }  
            ${isDarkMode ? 'bg-white text-barakaprimary-madder' : 'bg-barakaprimary-madder text-white'}`}
        >
            <div className="flex w-full flex-col text-center font-normal">
                <Button
                    type="button"
                    variant="absolute top-2 right-2 hover:scale-110 block sm:hidden"
                    onClick={() => setShowAuthDropDown(false)}
                >
                    <X strokeWidth={4} />
                </Button>
                {isAuthenticated ? (
                    <div className="flex w-full flex-col">
                        {/* USER PROFILE */}
                        <div className="my-5">
                            <h1 className="">
                                Hello,
                                <span className="font-bold">{user?.name}</span>
                            </h1>
                            <hr />
                        </div>
                        <Link
                            className={`${authButtonClass} w-full`}
                            to={`/auth/settings`}
                        >
                            Settings
                        </Link>{' '}
                        <Button
                            type="button"
                            onClick={logout}
                            variant={`${authButtonClass}`}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <>
                        <Link to={'/login'} className={`${authButtonClass}`}>
                            Login
                        </Link>
                        <Link to={'/register'} className={`${authButtonClass}`}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </Modal>
    )
}
