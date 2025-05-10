import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Tạo AuthContext
export const AuthContext = createContext();

// Hook để sử dụng AuthContext dễ dàng
export const useAuth = () => useContext(AuthContext);

// Thành phần AuthProvider để bao bọc ứng dụng
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trạng thái người dùng
  const [loading, setLoading] = useState(true); // Trạng thái tải ban đầu
  const navigate = useNavigate();

  // Hàm gửi yêu cầu HTTP với logging chi tiết
  const apiRequest = async (method, url, data = null) => {
    try {
      console.log(`Sending ${method} request to ${url}`, data ? `with data: ${JSON.stringify(data)}` : '');
      const response = await axios({ method, url, data });
      console.log(`Response from ${url}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error in ${method} ${url}:`, error.response?.data || error.message);
      throw error;
    }
  };

  // Khởi tạo trạng thái xác thực khi ứng dụng bắt đầu
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const data = await apiRequest('GET', 'http://localhost:5000/api/auth/me');
          setUser(data.user); // Cập nhật thông tin người dùng
        } catch (error) {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
      setLoading(false); // Kết thúc trạng thái tải
    };
    initializeAuth();
  }, []);

  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      const data = await apiRequest('POST', 'http://localhost:5000/api/auth/login', { email, password });
      if (data.token) {
        localStorage.setItem('token', data.token); // Lưu token vào localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setUser(data.user); // Cập nhật thông tin người dùng
        toast.success('Đăng nhập thành công');
        // Chuyển hướng dựa trên vai trò
        if (data.user.role === 'admin') {
          navigate('/admin/courses');
        } else {
          navigate('/');
        }
        return true;
      } else {
        toast.error('Đăng nhập thất bại: Không nhận được token');
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại');
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('token'); // Xóa token
    delete axios.defaults.headers.common['Authorization'];
    setUser(null); // Đặt lại trạng thái người dùng
    navigate('/login'); // Chuyển hướng về trang đăng nhập
    toast.success('Đã đăng xuất');
  };

  // Giá trị cung cấp bởi context
  const value = {
    user, // Thông tin người dùng
    loading, // Trạng thái tải
    login, // Hàm đăng nhập
    logout, // Hàm đăng xuất
  };

  // Bao bọc ứng dụng bằng AuthContext.Provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;