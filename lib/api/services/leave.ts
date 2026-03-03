import api from '../client';
import type { LeaveType, LeaveRequest, LeaveBalance, CreateLeaveRequestDto, UpdateLeaveStatusDto, PaginatedData, PaginationQuery } from '../types';

export const leaveService = {
  getTypes: () =>
    api.get<LeaveType[]>('/leave/types').then((r) => r.data),

  createType: (dto: Partial<LeaveType>) =>
    api.post<LeaveType>('/leave/types', dto).then((r) => r.data),

  getRequests: (params?: PaginationQuery & { employeeId?: string; status?: string }) =>
    api.get<PaginatedData<LeaveRequest>>('/leave/requests', { params }).then((r) => r.data),

  createRequest: (dto: CreateLeaveRequestDto) =>
    api.post<LeaveRequest>('/leave/requests', dto).then((r) => r.data),

  updateStatus: (id: string, dto: UpdateLeaveStatusDto) =>
    api.put<LeaveRequest>(`/leave/requests/${id}/status`, dto).then((r) => r.data),

  getBalances: (employeeId: string) =>
    api.get<LeaveBalance[]>(`/leave/balances/${employeeId}`).then((r) => r.data),
};
