import api from '../api/axios';

class AuthService {
  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} User data
   */
  async login(email, password) {
    const response = await api.post('/users/auth', { email, password });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  /**
   * Register user
   * @param {Object} userData
   * @returns {Promise<Object>} User data
   */
  async register(userData) {
    const response = await api.post('/users', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  /**
   * Logout user — calls backend to clear the HttpOnly JWT cookie,
   * then removes the local user object regardless of API success.
   */
  async logout() {
    try {
      await api.post('/users/logout');
    } catch (error) {
      // Swallow — we still want to clear client state even if the
      // backend is unreachable (e.g. network offline on logout).
      console.error('Logout API call failed; clearing local state anyway', error);
    }
    localStorage.removeItem('user');
  }

  /**
   * Get current user from localStorage.
   * Returns null if storage is empty or contains invalid JSON.
   */
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Corrupted user data in localStorage — clearing', error);
      localStorage.removeItem('user');
      return null;
    }
  }
}

export const authService = new AuthService();
