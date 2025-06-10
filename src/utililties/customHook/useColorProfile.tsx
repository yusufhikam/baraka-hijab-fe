type useColorProfileProps = {
    isDarkMode: boolean
    withBgColor?: boolean
}
const useColorProfile = ({
    isDarkMode,
    withBgColor = true,
}: useColorProfileProps) => {
    const withBg =
        withBgColor &&
        `${isDarkMode ? 'bg-barakaprimary-madder' : 'bg-gray-200'}`

    return `${withBg} ${isDarkMode ? 'text-barakaprimary-snow' : 'text-barakaprimary-madder'}`
}

export default useColorProfile
