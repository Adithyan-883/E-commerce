import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const user = authService.getCurrentUser();
  const location = useLocation();

  if (!user) {
    // Redirect to login but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !user.isAdmin && user.role !== 'admin') {
    // Redirect to home if user is not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
