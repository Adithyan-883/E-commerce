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
      const response = await api.post('/users/auth', { email, password });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.warn('Backend offline, using mock login');
        if (email && password) {
          const mockData = {
            _id: '1', name: 'Demo User', role: 'admin', email: email, isAdmin: true
          };
          localStorage.setItem('user', JSON.stringify(mockData));
          return mockData;
        }
      }
      throw error;
    }
  }

  /**
   * Register user
   * @param {Object} userData 
   */
  async register(userData) {
    try {
      const response = await api.post('/users', userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.warn('Backend offline, using mock register');
        const mockData = {
          _id: '1', name: userData.name, email: userData.email, isAdmin: false
        };
        localStorage.setItem('user', JSON.stringify(mockData));
        return mockData;
      }
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      await api.post('/users/logout');
    } catch (error) {
      console.error('Logout API failed, continuing client logout', error);
    }
    localStorage.removeItem('user');
  }

  /**
   * Get current user from local storage
   */
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      return null;
    }
  }
}

export const authService = new AuthService();
