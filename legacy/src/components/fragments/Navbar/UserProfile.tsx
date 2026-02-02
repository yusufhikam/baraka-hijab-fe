import { Link } from 'react-router-dom'
import { UserType } from '../../../context/AuthContext'

type UserProfileType = {
    user: UserType | null
    isDarkMode: boolean
}

const UserProfile = ({ user, isDarkMode }: UserProfileType) => {
    return (
        <div className="flex h-20 flex-col items-center justify-center gap-y-3">
            <h1 className="border-b-2">Hello, {user?.name}</h1>

            <Link
                className={`${isDarkMode ? 'hover:text-black' : 'hover:text-yellow-500'}`}
                to="/settings"
            >
                Settings
            </Link>
        </div>
    )
}

export default UserProfile
