import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { revenueService } from '@/lib/api/services/revenue';
import type {
  CreateIncomeSourceDto,
  CreateRevenueEntryDto,
  CreateRecurringIncomeDto,
  CreateRevenueAdjustmentDto,
} from '@/lib/api/types';

export function useIncomeSources() {
  return useQuery({
    queryKey: queryKeys.revenue.incomeSources(),
    queryFn: () => revenueService.getIncomeSources(),
  });
}

export function useRevenueEntries(params?: { incomeSourceId?: string; dateFrom?: string; dateTo?: string }) {
  return useQuery({
    queryKey: queryKeys.revenue.entries(params),
    queryFn: () => revenueService.getEntries({ limit: 200, ...params }),
  });
}

export function useRevenueStats() {
  return useQuery({
    queryKey: queryKeys.revenue.stats(),
    queryFn: () => revenueService.getStats(),
  });
}

export function useRecurringIncome() {
  return useQuery({
    queryKey: queryKeys.revenue.recurring(),
    queryFn: () => revenueService.getRecurring(),
  });
}

export function useRevenueAdjustments(params?: object) {
  return useQuery({
    queryKey: queryKeys.revenue.adjustments(params),
    queryFn: () => revenueService.getAdjustments({ limit: 200, ...params }),
  });
}

export function useAdjustmentSummary() {
  return useQuery({
    queryKey: queryKeys.revenue.adjustmentSummary(),
    queryFn: () => revenueService.getAdjustmentSummary(),
  });
}

export function useCreateIncomeSource() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateIncomeSourceDto) => revenueService.createIncomeSource(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.revenue.incomeSources() }),
  });
}

export function useCreateRevenueEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRevenueEntryDto) => revenueService.createEntry(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.revenue.all }),
  });
}

export function useCreateRecurringIncome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRecurringIncomeDto) => revenueService.createRecurring(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.revenue.recurring() }),
  });
}

export function useCreateRevenueAdjustment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRevenueAdjustmentDto) => revenueService.createAdjustment(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.revenue.adjustments() }),
  });
}
