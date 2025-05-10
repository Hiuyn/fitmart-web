import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/public/LoginPage';
import SignupPage from '../pages/public/SignupPage';
import UserDashboard from '../pages/user/UserDashboard';
import UserProfile from '../pages/user/UserProfile';
import UserOrders from '../pages/user/UserOrders';
import UserCourses from '../pages/user/UserCourses';
import ContactAdmin from '../pages/user/ContactAdmin';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Protected Routes */}
      <Route path="/user/*" element={
        <ProtectedRoute>
          <Routes>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="courses" element={<UserCourses />} />
          </Routes>
        </ProtectedRoute>
      } />
      
      <Route path="/contact-admin" element={
        <ProtectedRoute>
          <ContactAdmin />
        </ProtectedRoute>
      } />

      {/* Catch all - replace with 404 page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 