import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { reportsService } from '@/lib/api/services/reports';

export function useFinancialSummary() {
  return useQuery({
    queryKey: queryKeys.reports.financialSummary(),
    queryFn: () => reportsService.getFinancialSummary(),
  });
}

export function useTrialBalanceReport(params?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: queryKeys.reports.trialBalance(params),
    queryFn: () => reportsService.getTrialBalance(params),
  });
}

export function useIncomeStatement(params: { startDate: string; endDate: string }) {
  return useQuery({
    queryKey: queryKeys.reports.incomeStatement(params),
    queryFn: () => reportsService.getIncomeStatement(params),
    enabled: !!(params.startDate && params.endDate),
  });
}

export function useBalanceSheet(params?: { asOfDate?: string }) {
  return useQuery({
    queryKey: queryKeys.reports.balanceSheet(params),
    queryFn: () => reportsService.getBalanceSheet(params),
  });
}

export function useCashFlow(params: { startDate: string; endDate: string }) {
  return useQuery({
    queryKey: queryKeys.reports.cashFlow(params),
    queryFn: () => reportsService.getCashFlow(params),
    enabled: !!(params.startDate && params.endDate),
  });
}
