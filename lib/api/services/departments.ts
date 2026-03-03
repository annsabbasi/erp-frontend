import api from '../client';
import type { Department, CreateDepartmentDto, PaginatedData, PaginationQuery } from '../types';

export const departmentsService = {
  getAll: (params?: PaginationQuery) =>
    api.get<PaginatedData<Department>>('/departments', { params }).then((r) => r.data),

  getById: (id: string) =>
    api.get<Department>(`/departments/${id}`).then((r) => r.data),

  create: (dto: CreateDepartmentDto) =>
    api.post<Department>('/departments', dto).then((r) => r.data),

  update: (id: string, dto: Partial<CreateDepartmentDto>) =>
    api.put<Department>(`/departments/${id}`, dto).then((r) => r.data),

  assignHead: (id: string, headId: string) =>
    api.patch<Department>(`/departments/${id}/assign-head`, { headId }).then((r) => r.data),

  delete: (id: string) =>
    api.delete<void>(`/departments/${id}`).then((r) => r.data),
};
