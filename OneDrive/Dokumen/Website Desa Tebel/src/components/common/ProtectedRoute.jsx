import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import PageLoader from './PageLoader'

/**
 * Guards a route behind authentication and, optionally, a specific role.
 * Usage: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
 */
export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />

  if (!isAuthenticated) {
    const loginPath = role === 'admin' ? '/admin/login' : '/masuk'
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}
