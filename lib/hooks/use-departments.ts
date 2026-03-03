import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { departmentsService } from '@/lib/api/services/departments';
import type { CreateDepartmentDto } from '@/lib/api/types';

export function useDepartments() {
  return useQuery({
    queryKey: queryKeys.departments.list(),
    queryFn: () => departmentsService.getAll({ limit: 200 }),
  });
}

export function useDepartment(id: string) {
  return useQuery({
    queryKey: queryKeys.departments.detail(id),
    queryFn: () => departmentsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDepartmentDto) => departmentsService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.departments.lists() }),
  });
}

export function useUpdateDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<CreateDepartmentDto> }) =>
      departmentsService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.departments.lists() }),
  });
}

export function useAssignDepartmentHead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, headId }: { id: string; headId: string }) =>
      departmentsService.assignHead(id, headId),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.departments.lists() }),
  });
}

export function useDeleteDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => departmentsService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.departments.lists() }),
  });
}
