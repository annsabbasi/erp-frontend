import api from '../client';
import type { FinancialSummary, TrialBalance, IncomeStatement, BalanceSheet, CashFlow } from '../types';

export const reportsService = {
  getFinancialSummary: () =>
    api.get<FinancialSummary>('/reports/financial-summary').then((r) => r.data),

  getTrialBalance: (params?: { startDate?: string; endDate?: string }) =>
    api.get<TrialBalance>('/reports/trial-balance', { params }).then((r) => r.data),

  getIncomeStatement: (params: { startDate: string; endDate: string }) =>
    api.get<IncomeStatement>('/reports/income-statement', { params }).then((r) => r.data),

  getBalanceSheet: (params?: { asOfDate?: string }) =>
    api.get<BalanceSheet>('/reports/balance-sheet', { params }).then((r) => r.data),

  getCashFlow: (params: { startDate: string; endDate: string }) =>
    api.get<CashFlow>('/reports/cash-flow', { params }).then((r) => r.data),
};
