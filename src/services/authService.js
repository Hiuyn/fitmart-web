import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const authService = {
  // Đăng ký
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      if (response.data.success) {
        // Lưu token vào localStorage nếu cần
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Lỗi kết nối server' };
    }
  },

  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Lỗi kết nối server' };
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem('token');
  },

  // Kiểm tra đăng nhập
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Lấy token
  getToken: () => {
    return localStorage.getItem('token');
  }
};

// Thêm interceptor cho axios
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authService; 