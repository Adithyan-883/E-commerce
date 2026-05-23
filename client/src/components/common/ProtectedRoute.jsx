import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const location = useLocation();
  let user = null;

  try {
    user = authService.getCurrentUser();
  } catch (error) {
    console.error('Error parsing user credentials from local storage:', error);
    localStorage.removeItem('user'); // Clear corrupted storage
  }

  if (!user) {
    // Redirect to login but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Ensure role properties are verified safely using optional chaining
  if (requireAdmin && user?.isAdmin !== true && user?.role !== 'admin') {
    // Redirect to home if user is not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

