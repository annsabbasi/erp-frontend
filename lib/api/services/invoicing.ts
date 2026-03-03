import api from '../client';
import type { Invoice, InvoiceStats, CreateInvoiceDto, RecordPaymentDto, PaginatedData, PaginationQuery, InvoiceStatus } from '../types';

export const invoicingService = {
  getAll: (params?: PaginationQuery & { clientId?: string; status?: InvoiceStatus }) =>
    api.get<PaginatedData<Invoice>>('/invoices', { params }).then((r) => r.data),

  getStats: () =>
    api.get<InvoiceStats>('/invoices/stats').then((r) => r.data),

  getById: (id: string) =>
    api.get<Invoice>(`/invoices/${id}`).then((r) => r.data),

  create: (dto: CreateInvoiceDto) =>
    api.post<Invoice>('/invoices', dto).then((r) => r.data),

  send: (id: string) =>
    api.patch<Invoice>(`/invoices/${id}/send`).then((r) => r.data),

  recordPayment: (id: string, dto: RecordPaymentDto) =>
    api.post<Invoice>(`/invoices/${id}/payments`, dto).then((r) => r.data),

  cancel: (id: string) =>
    api.delete<void>(`/invoices/${id}`).then((r) => r.data),
};
