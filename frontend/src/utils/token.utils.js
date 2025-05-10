export const TOKEN_CONFIG = {
  ACCESS_TOKEN_KEY: 'token',
  REFRESH_TOKEN_KEY: 'refreshToken',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH_THRESHOLD: 5 * 60 * 1000 // 5 minutes before expiry
};

export const tokenUtils = {
  getStoredToken() {
    try {
      const tokenData = JSON.parse(localStorage.getItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY));
      if (tokenData && new Date().getTime() < tokenData.expiry) {
        return tokenData.value;
      }
      return null;
    } catch {
      return null;
    }
  },

  storeToken(token, refreshToken) {
    const tokenData = {
      value: token,
      expiry: new Date().getTime() + TOKEN_CONFIG.TOKEN_EXPIRY
    };
    localStorage.setItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY, JSON.stringify(tokenData));
    if (refreshToken) {
      localStorage.setItem(TOKEN_CONFIG.REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  clearTokens() {
    localStorage.removeItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY);
    localStorage.removeItem(TOKEN_CONFIG.REFRESH_TOKEN_KEY);
  },

  isTokenExpired(tokenData) {
    return new Date().getTime() > tokenData.expiry;
  },

  shouldRefreshToken(tokenData) {
    return new Date().getTime() > (tokenData.expiry - TOKEN_CONFIG.REFRESH_THRESHOLD);
  }
}; 