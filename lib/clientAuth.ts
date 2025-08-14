export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

// Authentication API functions
export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },
};

// Local storage utilities
export const authStorage = {
  // Save token to localStorage
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('absss_token', token);
    }
  },

  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('absss_token');
    }
    return null;
  },

  // Remove token from localStorage
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('absss_token');
    }
  },

  // Save user data to localStorage
  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('absss_user', JSON.stringify(user));
    }
  },

  // Get user data from localStorage
  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('absss_user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  // Remove user data from localStorage
  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('absss_user');
    }
  },

  // Clear all auth data
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('absss_token');
      localStorage.removeItem('absss_user');
    }
  },
};

// Permission utilities
export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.permissions.includes(permission);
};

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};
