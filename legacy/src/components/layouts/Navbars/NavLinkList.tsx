import { memo } from 'react'
import NavLinks from './NavLinks'

type Props = {
    variant?: string
}

const NavLinkList = memo(({ variant }: Props) => {
    return (
        <div
            className={`${variant} flex-col items-center gap-5 md:flex md:flex-row`}
        >
            <NavLinks to="/" withPseudoAfter={true}>
                Home
            </NavLinks>
            <NavLinks to="/">New Arrivals</NavLinks>
            <NavLinks to="/">Woman</NavLinks>
        </div>
    )
})

export default NavLinkList
