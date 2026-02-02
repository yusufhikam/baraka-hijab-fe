import { Navigate } from 'react-router-dom'
import { useAuth } from '../../customHook/useAuth'
import { Loader2 } from 'lucide-react'
import H1 from '../../../components/elements/Title Header/H1'

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
        return (
            <div className="flex h-screen w-full items-center justify-center gap-3">
                <Loader2 size={40} className="animate-spin" />
                <H1>Loading...</H1>
            </div>
        )
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
