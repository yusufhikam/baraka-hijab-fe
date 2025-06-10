import { Navigate } from 'react-router-dom'
import { useAuth } from '../../customHook/useAuth'

type ProtectedRouteProps = {
    allowedRoles?: 'customer'
    redirecTo?: string
    children: React.ReactNode
}

export const ProtectedRoute = ({
    allowedRoles = 'customer',
    redirecTo = '/login',
    children,
}: ProtectedRouteProps) => {
    const { isAuthenticated, user, logout, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to={redirecTo} replace />
    }

    // jika role tidak diizinkan
    if (user && !allowedRoles.includes(user.role)) {
        logout()
        return <Navigate to="/" replace />
    }

    return children
}
