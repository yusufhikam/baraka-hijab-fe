import { Link } from 'react-router-dom'
import useDarkMode from '../../../utililties/customHook/useDarkMode'

type NavlinkProps = {
    to: string
    variant?: string
    children: React.ReactNode
    withPseudoAfter?: boolean
}
const NavLinks = ({
    to,
    children,
    variant,
    withPseudoAfter = true,
}: NavlinkProps) => {
    const { isDarkMode } = useDarkMode()
    const pseudoAfterClass = withPseudoAfter
        ? `relative after:absolute after:-bottom-1 after:h-[2px] after:left-1/2 after:inset-x-0 after:w-0 after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:left-0 after:origin-center ${isDarkMode ? 'after:bg-barakaprimary-snow' : 'after:bg-barakaprimary-madder'}`
        : ''

    return (
        <div className="group text-base">
            <Link
                to={to}
                className={`${variant} transition-all duration-300 ${pseudoAfterClass}`}
            >
                {children}
            </Link>
        </div>
    )
}

export default NavLinks
