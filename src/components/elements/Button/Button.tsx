import { ComponentProps } from "react";

type ButtonProps = {
    children: React.ReactNode,
    onClick?: () => void,
    variant?: string,
    type: 'button' | 'submit' | 'reset',
    title?: string,
    disabled?: boolean
} & ComponentProps<'button'>
const Button = ({ children, onClick = () => { }, variant, type = 'button', title , disabled}: ButtonProps) => {
    return (
        <button disabled={disabled} type={type} title={title} className={`${variant}`} onClick={onClick}>{children}</button>
    )
}

export default Button;