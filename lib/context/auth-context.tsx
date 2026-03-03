'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api/services/auth';
import { TOKEN_KEY, USER_KEY } from '@/lib/api/client';
import type { AuthUser, LoginDto, Role } from '@/lib/api/types';

const ROLE_REDIRECT: Record<Role, string> = {
  ADMIN: '/admin',
  HR: '/hr',
  ACCOUNTANT: '/accountant',
  FINANCE_OFFICER: '/finance-officer',
  REVENUE_MANAGER: '/revenue-manager',
};

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (dto: LoginDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (dto: LoginDto) => {
    const response = await authService.login(dto);
    const { token: newToken, user: newUser } = response;

    // Persist to localStorage
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));

    // Persist to cookies for middleware
    document.cookie = `${TOKEN_KEY}=${newToken}; path=/; SameSite=Lax`;
    document.cookie = `${USER_KEY}=${encodeURIComponent(JSON.stringify({ role: newUser.role }))
    }; path=/; SameSite=Lax`;

    setToken(newToken);
    setUser(newUser);

    router.push(ROLE_REDIRECT[newUser.role]);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
    document.cookie = `${USER_KEY}=; path=/; max-age=0`;
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
