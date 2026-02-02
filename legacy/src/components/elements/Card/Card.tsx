import React from 'react'

type CardPropsType = {
    children: React.ReactNode
    variant?: string
} & React.HTMLAttributes<HTMLDivElement>

const Card = ({ children, variant, ...props }: CardPropsType) => {
    return (
        <div className={`${variant} overflow-hidden border`} {...props}>
            {children}
        </div>
    )
}

export default Card
