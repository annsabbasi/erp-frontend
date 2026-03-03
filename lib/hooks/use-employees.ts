import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { employeesService } from '@/lib/api/services/employees';
import type { CreateEmployeeDto, EmployeeStatus } from '@/lib/api/types';

export function useEmployees(params?: { departmentId?: string; status?: EmployeeStatus }) {
  return useQuery({
    queryKey: queryKeys.employees.list(params),
    queryFn: () => employeesService.getAll({ limit: 200, ...params }),
  });
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: queryKeys.employees.detail(id),
    queryFn: () => employeesService.getById(id),
    enabled: !!id,
  });
}

export function useEmployeeStats() {
  return useQuery({
    queryKey: queryKeys.employees.stats(),
    queryFn: () => employeesService.getStats(),
  });
}

export function useSalaryGrades() {
  return useQuery({
    queryKey: queryKeys.employees.salaryGrades(),
    queryFn: () => employeesService.getSalaryGrades(),
  });
}

export function useCreateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateEmployeeDto) => employeesService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.employees.lists() }),
  });
}

export function useUpdateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<CreateEmployeeDto> }) =>
      employeesService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.employees.lists() }),
  });
}

export function useTerminateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employeesService.terminate(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.employees.lists() }),
  });
}
