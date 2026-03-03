import axios from 'axios';
import { TOKEN_STORAGE_KEY } from '@/lib/hooks/use-auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5070/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request interceptor ─────────────────────────────────────────────────────
// Reads token from localStorage directly. This is always available immediately
// on page load — unlike useAuthStore.getState() which needs Zustand's async
// persist rehydration to finish first.
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ─── Response interceptor ────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => {
    // Unwrap the { success, data, timestamp } envelope the backend sends
    if (response.data && 'data' in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    const is401 = error.response?.status === 401;
    // Don't redirect on login failures — the login page handles that inline.
    const isLoginRequest = error.config?.url?.endsWith('/auth/login');

    if (is401 && !isLoginRequest && typeof window !== 'undefined') {
      // Token expired / revoked — clear all auth state and send to login
      localStorage.removeItem('erp_auth');
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      document.cookie = 'erp_token=; path=/; max-age=0';
      document.cookie = 'erp_role=; path=/; max-age=0';
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
