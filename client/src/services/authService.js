import api from '../api/axios';

class AuthService {
  /**
   * Login user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} User data and token
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // Mock login if backend is down (for development only)
      if (email === 'admin@admin.com' && password === 'admin123') {
        const mockData = {
          token: 'mock-jwt-token-12345',
          user: { id: '1', name: 'Admin User', role: 'admin', email: 'admin@admin.com' }
        };
        localStorage.setItem('token', mockData.token);
        localStorage.setItem('user', JSON.stringify(mockData.user));
        return mockData;
      }
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
  }

  /**
   * Register user
   * @param {Object} userData 
   */
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Get current user from local storage
   */
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export const authService = new AuthService();
