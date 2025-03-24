
import { jwtDecode } from 'jwt-decode';
import { mockAPI } from './mockBackend';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Constants
const TOKEN_KEY = 'auth_token';

// Register a new user
export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await mockAPI.auth.register(name, email, password);
  localStorage.setItem(TOKEN_KEY, response.token);
  return response;
};

// Login
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await mockAPI.auth.login(email, password);
  localStorage.setItem(TOKEN_KEY, response.token);
  return response;
};

// Logout
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Get current user
export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = JSON.parse(atob(token));
    
    // Check if token is expired
    if (decoded.exp < Date.now()) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email
    };
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

// Get token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};
