const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  TIMEOUT: 10000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      VERIFY: '/auth/me',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout'
    }
  }
};

export default API_CONFIG; 