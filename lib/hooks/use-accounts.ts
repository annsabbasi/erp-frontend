import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { accountsService } from '@/lib/api/services/accounts';
import type { CreateAccountDto, AccountType } from '@/lib/api/types';

export function useAccounts(params?: { type?: AccountType; category?: string; search?: string; isActive?: boolean }) {
  return useQuery({
    queryKey: queryKeys.accounts.list(params),
    queryFn: () => accountsService.getAll(params),
  });
}

export function useAccount(id: string) {
  return useQuery({
    queryKey: queryKeys.accounts.detail(id),
    queryFn: () => accountsService.getById(id),
    enabled: !!id,
  });
}

export function useTrialBalance(params?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: queryKeys.accounts.trialBalance(params),
    queryFn: () => accountsService.getTrialBalance(params),
  });
}

export function useCreateAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateAccountDto) => accountsService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.accounts.lists() }),
  });
}

export function useUpdateAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<CreateAccountDto> }) =>
      accountsService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.accounts.lists() }),
  });
}
