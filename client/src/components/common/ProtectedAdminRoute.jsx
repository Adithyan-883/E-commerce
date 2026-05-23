import { Navigate, useLocation } from 'react-router-dom'
import Loader from './Loader'
import { useAuth } from '../../context/AuthContext'

const ProtectedAdminRoute = ({ children }) => {
  const { adminUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="flex min-h-[50vh] items-center justify-center"><Loader /></div>
  }

  if (!adminUser?.isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedAdminRoute
