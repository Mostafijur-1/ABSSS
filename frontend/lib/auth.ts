const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'moderator';
  permissions: string[];
  lastLogin?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface ProfileUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}

// Authentication API functions
export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
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

  // Get current user profile
  getProfile: async (token: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get profile');
    }

    return response.json();
  },

  // Update profile
  updateProfile: async (token: string, profileData: ProfileUpdate): Promise<{ message: string; user: User }> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    return response.json();
  },

  // Change password
  changePassword: async (token: string, passwordData: PasswordChange): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change password');
    }

    return response.json();
  },

  // Get all users (admin only)
  getAllUsers: async (token: string): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get users');
    }

    return response.json();
  },

  // Create user (admin only)
  createUser: async (token: string, userData: any): Promise<{ message: string; user: User }> => {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create user');
    }

    return response.json();
  },

  // Update user (admin only)
  updateUser: async (token: string, userId: string, userData: any): Promise<{ message: string; user: User }> => {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user');
    }

    return response.json();
  },

  // Delete user (admin only)
  deleteUser: async (token: string, userId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete user');
    }

    return response.json();
  },
};

// Dashboard API functions
export const dashboardApi = {
  // Get dashboard statistics
  getStats: async (token: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get dashboard stats');
    }

    return response.json();
  },

  // Get system health
  getHealth: async (token: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/health`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get system health');
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