import { NavLink } from 'react-router-dom';
import { FiHome, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <nav className="space-y-1">
      <NavLink
        to="/user/dashboard"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
          }`
        }
      >
        <FiHome className="w-5 h-5 mr-3" />
        Dashboard
      </NavLink>

      <NavLink
        to="/user/profile"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
          }`
        }
      >
        <FiUser className="w-5 h-5 mr-3" />
        Thông tin cá nhân
      </NavLink>

      {/* Add more navigation links */}
    </nav>
  );
}; 