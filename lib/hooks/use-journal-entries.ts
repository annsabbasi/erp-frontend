import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { journalEntriesService } from '@/lib/api/services/journal-entries';
import type { CreateJournalEntryDto } from '@/lib/api/types';

export function useFiscalYears() {
  return useQuery({
    queryKey: queryKeys.journalEntries.fiscalYears(),
    queryFn: () => journalEntriesService.getFiscalYears(),
  });
}

export function useJournalEntries(params?: {
  fiscalYearId?: string;
  type?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  return useQuery({
    queryKey: queryKeys.journalEntries.list(params),
    queryFn: () => journalEntriesService.getAll({ limit: 200, ...params }),
  });
}

export function useJournalEntry(id: string) {
  return useQuery({
    queryKey: queryKeys.journalEntries.detail(id),
    queryFn: () => journalEntriesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateJournalEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateJournalEntryDto) => journalEntriesService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.journalEntries.lists() }),
  });
}

export function usePostJournalEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => journalEntriesService.post(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.journalEntries.lists() }),
  });
}
