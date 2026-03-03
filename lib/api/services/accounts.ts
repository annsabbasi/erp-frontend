import api from '../client';
import type { Account, CreateAccountDto, TrialBalance, AccountType, PaginatedData } from '../types';

export const accountsService = {
  getAll: (params?: { type?: AccountType; category?: string; search?: string; isActive?: boolean }) =>
    api.get<Account[]>('/accounts', { params }).then((r) => r.data),

  getById: (id: string) =>
    api.get<Account>(`/accounts/${id}`).then((r) => r.data),

  getTrialBalance: (params?: { startDate?: string; endDate?: string }) =>
    api.get<TrialBalance>('/accounts/trial-balance', { params }).then((r) => r.data),

  getLedger: (id: string) =>
    api.get<unknown[]>(`/accounts/${id}/ledger`).then((r) => r.data),

  create: (dto: CreateAccountDto) =>
    api.post<Account>('/accounts', dto).then((r) => r.data),

  update: (id: string, dto: Partial<CreateAccountDto>) =>
    api.put<Account>(`/accounts/${id}`, dto).then((r) => r.data),

  delete: (id: string) =>
    api.delete<void>(`/accounts/${id}`).then((r) => r.data),

  seed: () =>
    api.post<void>('/accounts/seed').then((r) => r.data),
};
