type H1Props = {
    children: React.ReactNode
    fontFamily?: string
    fontWeight?: string
    fontSize?: string
}

export default function H1({
    children,
    fontFamily,
    fontSize = 'text-2xl',
    fontWeight = 'font-bold',
}: H1Props) {
    return (
        <h1 className={`${fontSize} ${fontWeight} ${fontFamily}`}>
            {children}
        </h1>
    )
}
