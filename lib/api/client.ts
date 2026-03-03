import axios from 'axios';

export const TOKEN_KEY = 'erp_token';
export const USER_KEY = 'erp_user';

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "http://localhost:5070/api/v1",
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach Bearer token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor: unwrap envelope + handle 401
api.interceptors.response.use(
  (response) => {
    // Unwrap { success, data, timestamp } envelope
    if (response.data && 'data' in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
      document.cookie = `${USER_KEY}=; path=/; max-age=0`;
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
