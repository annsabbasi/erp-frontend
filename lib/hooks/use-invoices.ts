import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { invoicingService } from '@/lib/api/services/invoicing';
import type { CreateInvoiceDto, RecordPaymentDto, InvoiceStatus } from '@/lib/api/types';

export function useInvoices(params?: { clientId?: string; status?: InvoiceStatus }) {
  return useQuery({
    queryKey: queryKeys.invoices.list(params),
    queryFn: () => invoicingService.getAll({ limit: 200, ...params }),
  });
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey: queryKeys.invoices.detail(id),
    queryFn: () => invoicingService.getById(id),
    enabled: !!id,
  });
}

export function useInvoiceStats() {
  return useQuery({
    queryKey: queryKeys.invoices.stats(),
    queryFn: () => invoicingService.getStats(),
  });
}

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateInvoiceDto) => invoicingService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.lists() }),
  });
}

export function useSendInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invoicingService.send(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.lists() }),
  });
}

export function useRecordPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: RecordPaymentDto }) =>
      invoicingService.recordPayment(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.lists() }),
  });
}

export function useCancelInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invoicingService.cancel(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.invoices.lists() }),
  });
}
