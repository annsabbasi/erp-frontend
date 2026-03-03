import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { receivablesService } from '@/lib/api/services/receivables';
import type { ReceivableStatus } from '@/lib/api/types';

export function useReceivables(params?: { status?: ReceivableStatus; clientId?: string }) {
  return useQuery({
    queryKey: queryKeys.receivables.list(params),
    queryFn: () => receivablesService.getAll({ limit: 200, ...params }),
  });
}

export function useAgingReport() {
  return useQuery({
    queryKey: queryKeys.receivables.agingReport(),
    queryFn: () => receivablesService.getAgingReport(),
  });
}

export function useSendReminder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => receivablesService.sendReminder(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.receivables.lists() }),
  });
}

export function useWriteOffReceivable() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => receivablesService.writeOff(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.receivables.lists() }),
  });
}
