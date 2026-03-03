import api from '../client';
import type { Receivable, AgingReport, PaginatedData, PaginationQuery, ReceivableStatus } from '../types';

export const receivablesService = {
  getAll: (params?: PaginationQuery & { status?: ReceivableStatus; clientId?: string }) =>
    api.get<PaginatedData<Receivable>>('/receivables', { params }).then((r) => r.data),

  getAgingReport: () =>
    api.get<AgingReport>('/receivables/aging-report').then((r) => r.data),

  sendReminder: (id: string) =>
    api.post<void>(`/receivables/${id}/reminder`).then((r) => r.data),

  writeOff: (id: string) =>
    api.patch<Receivable>(`/receivables/${id}/write-off`).then((r) => r.data),
};
