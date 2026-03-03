import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { bankReconciliationService } from '@/lib/api/services/bank-reconciliation';
import type { CreateBankAccountDto } from '@/lib/api/types';

export function useBankAccounts() {
  return useQuery({
    queryKey: queryKeys.bankReconciliation.accounts(),
    queryFn: () => bankReconciliationService.getBankAccounts(),
  });
}

export function useBankStatements(bankAccountId: string) {
  return useQuery({
    queryKey: queryKeys.bankReconciliation.statements(bankAccountId),
    queryFn: () => bankReconciliationService.getStatements(bankAccountId),
    enabled: !!bankAccountId,
  });
}

export function useBankStatement(id: string) {
  return useQuery({
    queryKey: queryKeys.bankReconciliation.statement(id),
    queryFn: () => bankReconciliationService.getStatementById(id),
    enabled: !!id,
  });
}

export function useCreateBankAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateBankAccountDto) => bankReconciliationService.createBankAccount(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.bankReconciliation.accounts() }),
  });
}
