// Request format cho đăng nhập
export const LOGIN_REQUEST_FORMAT = {
  email: "example@email.com",
  password: "password123"
};

// Response format khi đăng nhập thành công
export const LOGIN_RESPONSE_FORMAT = {
  success: true,
  message: "Login successful",
  data: {
    token: "jwt_token_here", 
    user: {
      id: "user_id",
      email: "example@email.com",
      role: "user",
      // các field khác của user...
    }
  }
};

// Request format cho đăng ký
export const REGISTER_REQUEST_FORMAT = {
  fullName: "Nguyen Van A",
  username: "nguyenvana",
  email: "example@email.com",
  password: "password123"
};

// Response format khi đăng ký thành công 
export const REGISTER_RESPONSE_FORMAT = {
  success: true,
  message: "Registration successful",
  data: {
    token: "jwt_token_here",
    user: {
      id: "user_id", 
      fullName: "Nguyen Van A",
      username: "nguyenvana",
      email: "example@email.com",
      role: "user",
      // các field khác...
    }
  }
}; 