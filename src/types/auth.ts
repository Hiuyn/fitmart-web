export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  isActive: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  checkAuthStatus: () => Promise<void>;
} 