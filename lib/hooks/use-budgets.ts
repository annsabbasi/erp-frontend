import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { budgetsService } from '@/lib/api/services/budgets';
import type { CreateBudgetDto, ApproveBudgetDto, BudgetStatus } from '@/lib/api/types';

export function useBudgets(params?: { departmentId?: string; fiscalYearId?: string; status?: BudgetStatus }) {
  return useQuery({
    queryKey: queryKeys.budgets.list(params),
    queryFn: () => budgetsService.getAll({ limit: 100, ...params }),
  });
}

export function useBudget(id: string) {
  return useQuery({
    queryKey: queryKeys.budgets.detail(id),
    queryFn: () => budgetsService.getById(id),
    enabled: !!id,
  });
}

export function useBudgetVarianceAnalysis(id: string) {
  return useQuery({
    queryKey: queryKeys.budgets.variance(id),
    queryFn: () => budgetsService.getVarianceAnalysis(id),
    enabled: !!id,
  });
}

export function useCreateBudget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateBudgetDto) => budgetsService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.budgets.lists() }),
  });
}

export function useApproveBudget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: ApproveBudgetDto }) =>
      budgetsService.approve(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.budgets.lists() }),
  });
}

export function useRejectBudget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note?: string }) =>
      budgetsService.approve(id, { action: 'REJECTED', rejectionNote: note }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.budgets.lists() }),
  });
}

export function useSubmitBudget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => budgetsService.submit(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.budgets.lists() }),
  });
}
