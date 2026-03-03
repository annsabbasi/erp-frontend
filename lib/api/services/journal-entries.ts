import api from '../client';
import type { JournalEntry, FiscalYear, CreateJournalEntryDto, PaginatedData, PaginationQuery } from '../types';

export const journalEntriesService = {
  getFiscalYears: () =>
    api.get<FiscalYear[]>('/journal-entries/fiscal-years').then((r) => r.data),

  createFiscalYear: (dto: { name: string; startDate: string; endDate: string }) =>
    api.post<FiscalYear>('/journal-entries/fiscal-years', dto).then((r) => r.data),

  closeFiscalYear: (id: string) =>
    api.patch<FiscalYear>(`/journal-entries/fiscal-years/${id}/close`).then((r) => r.data),

  getAll: (params?: PaginationQuery & {
    fiscalYearId?: string;
    type?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    reference?: string;
    sourceModule?: string;
  }) =>
    api.get<PaginatedData<JournalEntry>>('/journal-entries', { params }).then((r) => r.data),

  getById: (id: string) =>
    api.get<JournalEntry>(`/journal-entries/${id}`).then((r) => r.data),

  create: (dto: CreateJournalEntryDto) =>
    api.post<JournalEntry>('/journal-entries', dto).then((r) => r.data),

  post: (id: string) =>
    api.patch<JournalEntry>(`/journal-entries/${id}/post`).then((r) => r.data),

  reverse: (id: string) =>
    api.post<JournalEntry>(`/journal-entries/${id}/reverse`).then((r) => r.data),

  void: (id: string) =>
    api.delete<void>(`/journal-entries/${id}/void`).then((r) => r.data),
};
