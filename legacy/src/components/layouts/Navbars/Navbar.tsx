import { Loader2, Menu, ShoppingBag, UserCircle, X } from 'lucide-react'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import ButtonTheme from '../../elements/Button/ButtonTheme'
import Button from '../../elements/Button/Button'
import useWindowResize from '../../../utililties/customHook/useWindowResize'
import { Link } from 'react-router-dom'
import { AuthDropDown } from '../../fragments/Navbar/AuthDropDown'
// import { useAuth } from "../../../utililties/customHook/useAuth";
import { useCart } from '../../../utililties/customHook/useCart'
import MiniDisplayCartList from '../Cart/MiniDisplayCartList'
import { useState } from 'react'
import Modal from '../../elements/Modal/Modal'
import NavLinkList from './NavLinkList'

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [showAuthDropDown, setShowAuthDropDown] = useState<boolean>(false)
    const [showMiniCart, setShowMiniCart] = useState<boolean>(false)
    const { isDarkMode } = useDarkMode()
    const { cartsLength, isLoading } = useCart()

    useWindowResize(() => {
        if (window.innerWidth > 768) {
            setOpenMenu(false)
        }
    })

    return (
        <nav
            className={`relative flex h-18 w-full items-center justify-between shadow-md ${isDarkMode ? 'bg-barakaprimary-madder' : 'bg-white'} px-2`}
        >
            <div className="flex w-full items-center gap-2 px-2">
                <NavLinkList variant="hidden  font-krub-regular" />

                {/* MODAL MENU NAVBAR MOBILE */}
                <Modal
                    isOpen={openMenu}
                    animationType="slideDown"
                    onClose={() => setOpenMenu(!openMenu)}
                    variant={`fixed flex p-2 text-center transition-all duration-300 shadow-lg shadow-black/25
                            ${
                                openMenu
                                    ? `top-20 right-1/2 z-[3] flex h-fit w-[95%] translate-x-1/2 flex-col rounded-md ${
                                          isDarkMode
                                              ? 'text-barakaprimary-madder bg-barakaprimary-dessert'
                                              : 'bg-barakaprimary-madder text-white'
                                      }`
                                    : 'pointer-events-none top-20 right-1/2 h-0 translate-x-1/2 opacity-0'
                            }
                        `}
                >
                    <div className="flex flex-col">
                        <NavLinkList variant="text-white" />
                        <div className="flex justify-between">
                            <ButtonTheme variant="shadow-md shadow-black/50 sm:hidden" />
                            <Button
                                title="User Profile"
                                type="button"
                                variant={`flex sm:hidden ${isDarkMode ? 'text-white hover:text-barakaprimary-madder' : 'hover:text-barakaprimary-dessert'}`}
                                onClick={() =>
                                    setShowAuthDropDown(!showAuthDropDown)
                                }
                            >
                                <UserCircle size={30} />
                            </Button>
                        </div>
                    </div>
                </Modal>

                <Button
                    type="button"
                    onClick={() => setOpenMenu(!openMenu)}
                    variant={`md:hidden transition-all duration-300 hover:scale-125 ${openMenu ? 'rotate-90' : 'rotate-0'} ${isDarkMode ? 'hover:text-barakaprimary-dessert' : 'hover:text-barakaprimary-madder'}`}
                >
                    {openMenu ? <X size={30} /> : <Menu size={30} />}
                </Button>
            </div>

            <div className="w-fit text-center">
                <Link
                    to="/"
                    className={`navbar-brand text-2xl transition-all duration-200 hover:text-3xl hover:text-yellow-500 ${!isDarkMode && 'text-black'}`}
                >
                    BARAKA
                </Link>
            </div>

            <div className="navbar-button flex w-full items-center justify-end gap-2 px-2">
                <Button
                    title="Shopping Bag"
                    type="button"
                    variant={`relative  hover:scale-110 transition-all duration-200 
                            ${isDarkMode ? 'hover:text-barakaprimary-dessert' : 'hover:text-barakaprimary-madder'}`}
                    onClick={() => setShowMiniCart(!showMiniCart)}
                >
                    <ShoppingBag size={30} />
                    <p className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {isLoading ? (
                            <Loader2
                                strokeWidth={4}
                                className="animate-spin p-1 text-white"
                            />
                        ) : (
                            cartsLength
                        )}
                    </p>
                </Button>
                <Button
                    title="User Profile"
                    type="button"
                    variant="sm:flex hidden"
                    onClick={() => setShowAuthDropDown(!showAuthDropDown)}
                >
                    <UserCircle size={30} />
                </Button>
                <ButtonTheme variant="hidden sm:flex" />
            </div>

            <AuthDropDown
                setShowAuthDropDown={setShowAuthDropDown}
                showAuthDropDown={showAuthDropDown}
            />

            <MiniDisplayCartList
                setShowMiniCart={setShowMiniCart}
                showMiniCart={showMiniCart}
            />
        </nav>
    )
}

export default Navbar
