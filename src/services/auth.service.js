import { apiService } from './api.service';
import API_CONFIG from '../config/api.config';

class AuthService {
  async login(credentials) {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
      
      if (!response.data) {
        throw new Error('Invalid response format');
      }

      const { token, user } = response.data;
      if (!token || !user) {
        throw new Error('Missing token or user data');
      }

      return {
        success: true,
        data: { token, user }
      };
    } catch (error) {
      console.error('Login service error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Đăng nhập thất bại'
      };
    }
  }

  async register(userData) {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  }

  async verifyToken() {
    const response = await apiService.get(API_CONFIG.ENDPOINTS.AUTH.VERIFY);
    return response.data;
  }

  async refreshToken(refreshToken) {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
      refreshToken
    });
    return response.data;
  }

  async logout() {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  }
}

export default new AuthService(); 