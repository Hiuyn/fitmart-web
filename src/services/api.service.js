import axios from 'axios';
import API_CONFIG from '../config/api.config';
import { tokenUtils } from '../utils/token.utils';

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = tokenUtils.getStoredToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 and token refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            const response = await instance.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, { refreshToken });
            if (response.data.success) {
              const { accessToken } = response.data;
              tokenUtils.storeToken(accessToken);
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return instance(originalRequest);
            }
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiService = createAxiosInstance(); 