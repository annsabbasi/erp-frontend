import api from '../client';
import type { Employee, EmployeeStats, SalaryGrade, CreateEmployeeDto, PaginatedData, PaginationQuery, EmployeeStatus } from '../types';

export const employeesService = {
  getAll: (params?: PaginationQuery & { departmentId?: string; status?: EmployeeStatus }) =>
    api.get<PaginatedData<Employee>>('/employees', { params }).then((r) => r.data),

  getById: (id: string) =>
    api.get<Employee>(`/employees/${id}`).then((r) => r.data),

  getStats: () =>
    api.get<EmployeeStats>('/employees/stats').then((r) => r.data),

  getSalaryGrades: () =>
    api.get<SalaryGrade[]>('/employees/salary-grades').then((r) => r.data),

  create: (dto: CreateEmployeeDto) =>
    api.post<Employee>('/employees', dto).then((r) => r.data),

  update: (id: string, dto: Partial<CreateEmployeeDto>) =>
    api.put<Employee>(`/employees/${id}`, dto).then((r) => r.data),

  terminate: (id: string) =>
    api.patch<Employee>(`/employees/${id}/terminate`).then((r) => r.data),
};
