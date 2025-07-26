import React, { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react';
import { AuthState, AuthUser, LoginCredentials, RegisterCredentials } from '../types';

interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; user: AuthUser }
  | { type: 'LOGIN_FAILURE'; error: string }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; user: AuthUser }
  | { type: 'REGISTER_FAILURE'; error: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.error,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Mock users for demonstration
const mockUsers: AuthUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1 (555) 987-6543',
  },
];

// Mock authentication service
const mockAuthService = {
  login: async (credentials: LoginCredentials): Promise<AuthUser | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === credentials.email);
    if (user && credentials.password === 'password123') {
      return user;
    }
    return null;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthUser | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === credentials.email);
    if (existingUser) {
      return null;
    }

    // Create new user
    const newUser: AuthUser = {
      id: (mockUsers.length + 1).toString(),
      name: credentials.name,
      email: credentials.email,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      phone: credentials.phone,
    };

    mockUsers.push(newUser);
    return newUser;
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  // Check for stored user on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('shopee_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', user });
      } catch {
        localStorage.removeItem('shopee_user');
      }
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const user = await mockAuthService.login(credentials);
      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', user });
        localStorage.setItem('shopee_user', JSON.stringify(user));
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE', error: 'Invalid email or password' });
        return false;
      }
    } catch {
      dispatch({ type: 'LOGIN_FAILURE', error: 'Login failed. Please try again.' });
      return false;
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials): Promise<boolean> => {
    if (credentials.password !== credentials.confirmPassword) {
      dispatch({ type: 'REGISTER_FAILURE', error: 'Passwords do not match' });
      return false;
    }

    if (credentials.password.length < 6) {
      dispatch({ type: 'REGISTER_FAILURE', error: 'Password must be at least 6 characters long' });
      return false;
    }

    dispatch({ type: 'REGISTER_START' });

    try {
      const user = await mockAuthService.register(credentials);
      if (user) {
        dispatch({ type: 'REGISTER_SUCCESS', user });
        localStorage.setItem('shopee_user', JSON.stringify(user));
        return true;
      } else {
        dispatch({ type: 'REGISTER_FAILURE', error: 'Email already exists' });
        return false;
      }
    } catch {
      dispatch({ type: 'REGISTER_FAILURE', error: 'Registration failed. Please try again.' });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('shopee_user');
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <AuthContext.Provider value={{
      state,
      login,
      register,
      logout,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 