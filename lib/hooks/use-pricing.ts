import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { pricingService } from '@/lib/api/services/pricing';
import type { CreatePricingModelDto, CreateDiscountDto, CreateCommissionStructureDto } from '@/lib/api/types';

export function usePricingModels() {
  return useQuery({
    queryKey: queryKeys.pricing.models(),
    queryFn: () => pricingService.getModels(),
  });
}

export function useDiscounts() {
  return useQuery({
    queryKey: queryKeys.pricing.discounts(),
    queryFn: () => pricingService.getDiscounts(),
  });
}

export function useCommissions() {
  return useQuery({
    queryKey: queryKeys.pricing.commissions(),
    queryFn: () => pricingService.getCommissions(),
  });
}

export function useCreatePricingModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePricingModelDto) => pricingService.createModel(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pricing.models() }),
  });
}

export function useTogglePricingModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pricingService.toggleModel(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pricing.models() }),
  });
}

export function useCreateDiscount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDiscountDto) => pricingService.createDiscount(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pricing.discounts() }),
  });
}

export function useUpdateDiscount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: { isActive?: boolean; maxUses?: number; endDate?: string } }) =>
      pricingService.updateDiscount(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pricing.discounts() }),
  });
}

export function useCreateCommission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCommissionStructureDto) => pricingService.createCommission(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pricing.commissions() }),
  });
}

export function useToggleCommission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pricingService.toggleCommission(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pricing.commissions() }),
  });
}
