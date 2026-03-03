import api from '../client';
import type {
  IncomeSource,
  RevenueEntry,
  RevenueStats,
  RecurringIncome,
  RevenueAdjustment,
  AdjustmentSummary,
  CreateIncomeSourceDto,
  CreateRevenueEntryDto,
  CreateRecurringIncomeDto,
  CreateRevenueAdjustmentDto,
  PaginatedData,
  PaginationQuery,
} from '../types';

export const revenueService = {
  getIncomeSources: () =>
    api.get<IncomeSource[]>('/revenue/income-sources').then((r) => r.data),

  createIncomeSource: (dto: CreateIncomeSourceDto) =>
    api.post<IncomeSource>('/revenue/income-sources', dto).then((r) => r.data),

  toggleIncomeSource: (id: string) =>
    api.patch<IncomeSource>(`/revenue/income-sources/${id}/toggle`).then((r) => r.data),

  getEntries: (params?: PaginationQuery & { incomeSourceId?: string; dateFrom?: string; dateTo?: string }) =>
    api.get<PaginatedData<RevenueEntry>>('/revenue/entries', { params }).then((r) => r.data),

  getStats: () =>
    api.get<RevenueStats>('/revenue/stats').then((r) => r.data),

  createEntry: (dto: CreateRevenueEntryDto) =>
    api.post<RevenueEntry>('/revenue/entries', dto).then((r) => r.data),

  getRecurring: () =>
    api.get<RecurringIncome[]>('/revenue/recurring').then((r) => r.data),

  getRecurringDue: () =>
    api.get<RecurringIncome[]>('/revenue/recurring/due').then((r) => r.data),

  createRecurring: (dto: CreateRecurringIncomeDto) =>
    api.post<RecurringIncome>('/revenue/recurring', dto).then((r) => r.data),

  updateRecurring: (id: string, dto: Partial<CreateRecurringIncomeDto & { isActive: boolean }>) =>
    api.patch<RecurringIncome>(`/revenue/recurring/${id}`, dto).then((r) => r.data),

  getAdjustments: (params?: PaginationQuery) =>
    api.get<PaginatedData<RevenueAdjustment>>('/revenue/adjustments', { params }).then((r) => r.data),

  getAdjustmentSummary: () =>
    api.get<AdjustmentSummary>('/revenue/adjustments/summary').then((r) => r.data),

  createAdjustment: (dto: CreateRevenueAdjustmentDto) =>
    api.post<RevenueAdjustment>('/revenue/adjustments', dto).then((r) => r.data),
};
