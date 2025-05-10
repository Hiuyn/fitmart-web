import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';

export const withAuth = (WrappedComponent, requireAuth = true) => {
  return function WithAuthComponent(props) {
    const { isAuthenticated, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
      return <div>Loading...</div>; // hoặc loading component
    }

    if (requireAuth && !isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (!requireAuth && isAuthenticated) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };
}; 