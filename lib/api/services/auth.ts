import api from '../client';
import type { AuthUser, LoginDto, LoginResponse, ChangePasswordDto } from '../types';

export const authService = {
  login: (dto: LoginDto) =>
    api.post<LoginResponse>('/auth/login', dto).then((r) => r.data),

  getProfile: () =>
    api.get<AuthUser>('/auth/profile').then((r) => r.data),

  changePassword: (dto: ChangePasswordDto) =>
    api.put<void>('/auth/change-password', dto).then((r) => r.data),
};
