import api from '../client';
import type { User, CreateUserDto, UpdateUserDto, SystemStats, PaginatedData, PaginationQuery } from '../types';

export const usersService = {
  getAll: (params?: PaginationQuery) =>
    api.get<PaginatedData<User>>('/users', { params }).then((r) => r.data),

  getById: (id: string) =>
    api.get<User>(`/users/${id}`).then((r) => r.data),

  getSystemStats: () =>
    api.get<SystemStats>('/users/system-stats').then((r) => r.data),

  create: (dto: CreateUserDto) =>
    api.post<User>('/users', dto).then((r) => r.data),

  update: (id: string, dto: UpdateUserDto) =>
    api.put<User>(`/users/${id}`, dto).then((r) => r.data),

  resetPassword: (id: string, newPassword: string) =>
    api.patch<void>(`/users/${id}/reset-password`, { newPassword }).then((r) => r.data),

  delete: (id: string) =>
    api.delete<void>(`/users/${id}`).then((r) => r.data),
};
