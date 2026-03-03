import api from '../client';
import type { AuthUser, LoginDto, LoginResponse, ChangePasswordDto } from '../types';

// The backend returns { accessToken, user } — we normalise to { token, user }
// so the rest of the frontend always works with the `token` field.
export const authService = {
  login: async (dto: LoginDto): Promise<LoginResponse> => {
    const r = await api.post<{ accessToken: string; user: AuthUser }>('/auth/login', dto);
    return { token: r.data.accessToken, user: r.data.user };
  },

  getProfile: () =>
    api.get<AuthUser>('/auth/profile').then((r) => r.data),

  changePassword: (dto: ChangePasswordDto) =>
    api.put<void>('/auth/change-password', dto).then((r) => r.data),
};
