import api from '../client';
import type {
  PricingModel,
  Discount,
  CommissionStructure,
  CreatePricingModelDto,
  CreateDiscountDto,
  CreateCommissionStructureDto,
} from '../types';

export const pricingService = {
  getModels: () =>
    api.get<PricingModel[]>('/pricing/models').then((r) => r.data),

  getModelById: (id: string) =>
    api.get<PricingModel>(`/pricing/models/${id}`).then((r) => r.data),

  createModel: (dto: CreatePricingModelDto) =>
    api.post<PricingModel>('/pricing/models', dto).then((r) => r.data),

  toggleModel: (id: string) =>
    api.patch<PricingModel>(`/pricing/models/${id}/toggle`).then((r) => r.data),

  calculatePrice: (id: string, quantity: number) =>
    api.get<{ price: number }>(`/pricing/models/${id}/calculate`, { params: { quantity } }).then((r) => r.data),

  getDiscounts: () =>
    api.get<Discount[]>('/pricing/discounts').then((r) => r.data),

  validateDiscount: (code: string) =>
    api.get<Discount>(`/pricing/discounts/validate/${code}`).then((r) => r.data),

  createDiscount: (dto: CreateDiscountDto) =>
    api.post<Discount>('/pricing/discounts', dto).then((r) => r.data),

  updateDiscount: (id: string, dto: { isActive?: boolean; maxUses?: number; endDate?: string }) =>
    api.patch<Discount>(`/pricing/discounts/${id}`, dto).then((r) => r.data),

  getCommissions: () =>
    api.get<CommissionStructure[]>('/pricing/commissions').then((r) => r.data),

  createCommission: (dto: CreateCommissionStructureDto) =>
    api.post<CommissionStructure>('/pricing/commissions', dto).then((r) => r.data),

  calculateCommission: (id: string, revenue: number) =>
    api.get<{ commission: number }>(`/pricing/commissions/${id}/calculate`, { params: { revenue } }).then((r) => r.data),

  toggleCommission: (id: string) =>
    api.patch<CommissionStructure>(`/pricing/commissions/${id}/toggle`).then((r) => r.data),
};
