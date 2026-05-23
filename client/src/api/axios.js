import axios from 'axios';
import { toast } from 'react-hot-toast';

// Since the backend isn't ready yet, this will point to a local URL
// Later, move this to import.meta.env.VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Send HttpOnly cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Removed JWT Request Interceptor because HttpOnly cookies are automatically sent.

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle timeouts
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Please try again.');
    }
    // Handle 401 Unauthorized globally
    else if (error.response && error.response.status === 401) {
      localStorage.removeItem('user'); // Token is in HttpOnly cookie, but clear user
      // window.location.href = '/login'; // Optional: Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
