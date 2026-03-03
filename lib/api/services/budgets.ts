import api from '../client';
import type { Budget, BudgetVarianceAnalysis, CreateBudgetDto, ApproveBudgetDto, PaginatedData, BudgetStatus, BudgetPeriodType } from '../types';

export const budgetsService = {
  getAll: (params?: {
    departmentId?: string;
    fiscalYearId?: string;
    status?: BudgetStatus;
    periodType?: BudgetPeriodType;
    page?: number;
    limit?: number;
  }) =>
    api.get<PaginatedData<Budget>>('/budgets', { params }).then((r) => r.data),

  getById: (id: string) =>
    api.get<Budget>(`/budgets/${id}`).then((r) => r.data),

  getVarianceAnalysis: (id: string) =>
    api.get<BudgetVarianceAnalysis>(`/budgets/${id}/variance`).then((r) => r.data),

  create: (dto: CreateBudgetDto) =>
    api.post<Budget>('/budgets', dto).then((r) => r.data),

  submit: (id: string) =>
    api.patch<Budget>(`/budgets/${id}/submit`).then((r) => r.data),

  approve: (id: string, dto: ApproveBudgetDto) =>
    api.patch<Budget>(`/budgets/${id}/approve`, dto).then((r) => r.data),
};
