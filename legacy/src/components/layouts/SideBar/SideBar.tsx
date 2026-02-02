import React from 'react'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import useColorProfile from '../../../utililties/customHook/useColorProfile'

type SideBarProps = {
    children: React.ReactNode
    variant?: string
    // data?:
}

const SideBar = ({ children, variant }: SideBarProps) => {
    const { isDarkMode } = useDarkMode()

    return (
        <aside
            className={`${variant} flex flex-col gap-y-3 ${useColorProfile({ isDarkMode })}`}
        >
            {children}
        </aside>
    )
}

export default SideBar
