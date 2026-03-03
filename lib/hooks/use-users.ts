import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { usersService } from '@/lib/api/services/users';
import type { CreateUserDto, UpdateUserDto, PaginationQuery } from '@/lib/api/types';

export function useUsers(params?: PaginationQuery) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => usersService.getAll({ limit: 200, ...params }),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
  });
}

export function useSystemStats() {
  return useQuery({
    queryKey: queryKeys.users.systemStats(),
    queryFn: () => usersService.getSystemStats(),
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateUserDto) => usersService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.users.lists() }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateUserDto }) => usersService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.users.lists() }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.users.lists() }),
  });
}

export function useResetUserPassword() {
  return useMutation({
    mutationFn: ({ id, newPassword }: { id: string; newPassword: string }) =>
      usersService.resetPassword(id, newPassword),
  });
}
