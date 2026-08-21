import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('elan_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for centralized error handling & 401 session expiry
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('elan_token');
      localStorage.removeItem('elan_user');
    }
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

// Generic wrapper
export const apiClient = async (endpoint, options = {}) => {
  const method = (options.method || 'GET').toLowerCase();
  const data = options.data || options.body;
  const config = {
    method,
    url: endpoint,
    data,
    headers: options.headers,
    params: options.params,
  };

  return api(config);
};

export default api;
