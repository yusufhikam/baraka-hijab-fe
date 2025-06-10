type H1Props = {
    children: React.ReactNode
    fontFamily?: string
    fontWeight?: string
}

export default function H1({
    children,
    fontFamily,
    fontWeight = 'font-bold',
}: H1Props) {
    return (
        <h1 className={`text-2xl ${fontWeight} ${fontFamily}`}>{children}</h1>
    )
}
