'use client';
import { useAuthStore } from '@/lib/store/auth-store';
import { authService } from '@/lib/api/services/auth';
import type { LoginDto } from '@/lib/api/types';

// Written to localStorage at login so the Axios interceptor can read it
// immediately — before Zustand's async persist rehydration completes.
export const TOKEN_STORAGE_KEY = 'erp_token';

const ROLE_HOME: Record<string, string> = {
  ADMIN: '/admin',
  HR: '/hr',
  ACCOUNTANT: '/accountant',
  FINANCE_OFFICER: '/finance-officer',
  REVENUE_MANAGER: '/revenue-manager',
};

export function useAuth() {
  const { user, token, isHydrated, setAuth, clearAuth } = useAuthStore();

  const login = async (dto: LoginDto) => {
    // authService.login normalises accessToken → token
    const { token: newToken, user: newUser } = await authService.login(dto);

    // 1. Update Zustand store (persisted to localStorage['erp_auth'])
    setAuth(newUser, newToken);

    // 2. Write token directly so the request interceptor always finds it,
    //    even before Zustand's async rehydration completes after navigation.
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);

    // 3. Set cookies so proxy.ts can protect routes server-side
    document.cookie = `erp_token=${newToken}; path=/; SameSite=Lax`;
    document.cookie = `erp_role=${newUser.role}; path=/; SameSite=Lax`;

    // 4. Hard navigation — guarantees cookies are sent with the very next request
    window.location.href = ROLE_HOME[newUser.role] ?? '/';
  };

  const logout = () => {
    // Clear Zustand store (also removes erp_auth from localStorage via persist)
    clearAuth();
    // Clear direct token key used by the request interceptor
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    // Clear cookies used by proxy.ts
    document.cookie = 'erp_token=; path=/; max-age=0';
    document.cookie = 'erp_role=; path=/; max-age=0';
    // Hard navigation back to login
    window.location.href = '/login';
  };

  return { user, token, isHydrated, login, logout };
}
