import { Link } from "react-router-dom";
import useDarkMode from "../../../utililties/customHook/useDarkMode";
import Card from "../../elements/Card/Card";
import { useAuth } from "../../../utililties/customHook/useAuth";
import Button from "../../elements/Button/Button";

export const AuthMobileMenu = ({ variant }: { variant?: string }) => {
    const { isDarkMode } = useDarkMode();
    const { logout, isAuthenticated } = useAuth();

    const baseClass = ` text-center py-1 px-3 rounded-md transition-all duration-300 ease-in-out ${isDarkMode ? 'hover:text-yellow-300 bg-barakaprimary-madder text-white' : 'bg-white text-black hover:text-barakaprimary-madder'}`
    return (
        <Card variant={`${variant} flex justify-evenly border-none w-full gap-2  font-poppins-regular `} >
            {isAuthenticated ? (
                <Button type='button' onClick={logout}>Logout</Button>
            ) : (
                <>
                    <Link to={'/login'} className={` ${baseClass}`}>Login</Link>
                    <Link to={'/register'} className={` ${baseClass} `}>Register</Link>
                </>
            )}
        </Card>
    )
}