import api from '../client';
import type { Client, CreateClientDto, PaginatedData, PaginationQuery } from '../types';

export const clientsService = {
  getAll: (params?: PaginationQuery) =>
    api.get<PaginatedData<Client>>('/clients', { params }).then((r) => r.data),

  getById: (id: string) =>
    api.get<Client>(`/clients/${id}`).then((r) => r.data),

  create: (dto: CreateClientDto) =>
    api.post<Client>('/clients', dto).then((r) => r.data),

  update: (id: string, dto: Partial<CreateClientDto>) =>
    api.put<Client>(`/clients/${id}`, dto).then((r) => r.data),

  delete: (id: string) =>
    api.delete<void>(`/clients/${id}`).then((r) => r.data),
};
