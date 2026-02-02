import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import useDarkMode from '../../../utililties/customHook/useDarkMode'

type BreadcrumbProps = {
    links_breadcrumb: {
        label: string
        link: string
        isActive?: boolean
        isAllowed?: boolean
    }[]
}

const Breadcrumb = ({ links_breadcrumb }: BreadcrumbProps) => {
    const { isDarkMode } = useDarkMode()

    return (
        <div className="flex">
            {links_breadcrumb.map((link_breadcrumb, index) => (
                <span
                    key={index}
                    className="flex items-center text-center text-xs sm:text-xl md:text-2xl"
                >
                    <Link
                        to={link_breadcrumb.link}
                        className={` ${link_breadcrumb.isActive === true ? 'font-bold' : `${isDarkMode && 'text-white/50'} hover:text-barakaprimary-madder text-black/25`} ${link_breadcrumb.isAllowed === false && 'pointer-events-none'} transition-all duration-100`}
                    >
                        {link_breadcrumb.label}
                    </Link>
                    {index < links_breadcrumb.length - 1 && (
                        <ChevronRight
                            className={`${isDarkMode ? 'text-red-500' : 'text-black/25'}`}
                        />
                    )}
                </span>
            ))}
        </div>
    )
}

export default Breadcrumb
