import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Send HttpOnly cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Log requests in development environment
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.MODE === 'development') {
      console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`, config.data || '');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global error routing and toast notifications
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE === 'development') {
      console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';

    // 1. Connection Timeout Handling
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      message = 'Connection timed out. The server is taking too long to respond.';
      toast.error(message);
    }
    // 2. Network/Offline Issues (No server response at all)
    else if (!error.response) {
      message = 'Network error. Please check your internet connection and verify if the backend server is running.';
      toast.error(message);
    }
    // 3. Backend-returned Errors
    else {
      const status = error.response.status;
      const data = error.response.data;
      const backendMessage = data?.message || data?.error;

      switch (status) {
        case 400:
          message = backendMessage || 'Invalid request parameters.';
          toast.error(`Error: ${message}`);
          break;
        case 401:
          message = backendMessage || 'Not authorized to access this resource.';
          toast.error(message);
          break;
        case 403:
          message = backendMessage || 'Access denied. You do not have permissions to access this page.';
          toast.error(message);
          break;
        case 404:
          message = backendMessage || 'Requested resource could not be found.';
          toast.error(message);
          break;
        case 500:
          message = 'Internal server error. Our engineering team has been notified.';
          toast.error(message);
          break;
        default:
          message = backendMessage || message;
          toast.error(message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

