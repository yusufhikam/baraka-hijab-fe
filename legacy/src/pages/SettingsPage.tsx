import { useState } from 'react'
import { useAuth } from '../utililties/customHook/useAuth'
import Button from '../components/elements/Button/Button'
import { Map, SidebarClose, SidebarOpen, UserCircle2, X } from 'lucide-react'
import SideBar from '../components/layouts/SideBar/SideBar'
import ProfileLayout from '../components/layouts/SettingsPage/ProfileLayout'
import AddressLayout from '../components/layouts/SettingsPage/AdressLayout'
import useDarkMode from '../utililties/customHook/useDarkMode'

const SettingsPage = () => {
    const { user } = useAuth()
    const { isDarkMode } = useDarkMode()
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    const [activeSection, setActiveSection] = useState<'profile' | 'address'>(
        'profile'
    )

    return (
        <div className="relative flex h-auto w-full">
            <SideBar
                variant={`fixed z-[2] shadow-lg shadow-black/25 sm:shadow-none top-1/2 sm:static transition-all duration-300 sm:rounded-none rounded-tr-md rounded-br-md  ${showSideBar ? 'sm:w-[15%] w-1/3' : 'w-13'} `}
            >
                <div
                    className={`mx-auto mt-2 flex flex-col items-center justify-between gap-2`}
                >
                    <Button
                        type="button"
                        variant={`${showSideBar ? 'hidden sm:flex' : 'flex'} w-full flex justify-end`}
                        onClick={() => setShowSideBar(!showSideBar)}
                    >
                        {showSideBar ? (
                            <SidebarClose size={25} />
                        ) : (
                            <SidebarOpen size={25} />
                        )}
                    </Button>
                    {showSideBar && <h1>Hello, {user?.name}</h1>}

                    <Button
                        type="button"
                        variant={`${showSideBar ? 'flex sm:hidden ' : ' hidden sm:hidden'} transition-all duration-200 flex absolute top-1/2 -right-10 bg-barakaprimary-madder rounded-full p-1 sm:hidden text-white`}
                        onClick={() => setShowSideBar(!showSideBar)}
                    >
                        <X size={25} />
                    </Button>
                </div>
                <div className="flex flex-col items-center">
                    <div
                        className={`w-full ${activeSection === 'profile' && `${isDarkMode ? 'bg-barakaprimary-dessert' : 'bg-barakaprimary-madder text-white'}`} `}
                    >
                        <Button
                            type="button"
                            variant={`w-full flex justify-center items-center p-1 `}
                            onClick={() => setActiveSection('profile')}
                        >
                            {showSideBar ? (
                                'PROFILE'
                            ) : (
                                <UserCircle2 size={25} />
                            )}
                        </Button>
                    </div>
                    <div
                        className={`w-full ${activeSection === 'address' && `${isDarkMode ? 'bg-barakaprimary-dessert' : 'bg-barakaprimary-madder text-white'}`}`}
                    >
                        <Button
                            type="button"
                            variant={`w-full flex justify-center items-center p-1 `}
                            onClick={() => setActiveSection('address')}
                        >
                            {showSideBar ? 'ADDRESS' : <Map size={25} />}
                        </Button>
                    </div>
                </div>
            </SideBar>

            <main className={`flex-1 ${!isDarkMode && 'bg-gray-100'}`}>
                {activeSection === 'profile' && <ProfileLayout />}
                {activeSection === 'address' && <AddressLayout />}
            </main>
        </div>
    )
}

export default SettingsPage
