import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomePage from '../pages/HomePage'
import NotFound from '../pages/404'
import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import DetailProductPage from '../pages/DetailProductPage'
import { ProtectedRoute } from '../utililties/helper/Auth/ProtectedRoute'
import { AdminRoute } from './AdminRoute'
import CartsPage from '../pages/CartsPage'
import SettingsPage from '../pages/SettingsPage'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/shop/products', element: <ProductsPage /> },
            { path: '/shop/product/:slug', element: <DetailProductPage /> },
            { path: '/carts', element: <CartsPage /> },
            // protected route for customer
            {
                path: '/auth/settings',
                element: (
                    <ProtectedRoute allowedRoles={'customer'}>
                        <SettingsPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/admin/*',
        element: <AdminRoute />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
])

export default router
