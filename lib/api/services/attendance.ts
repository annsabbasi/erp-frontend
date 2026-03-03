import api from '../client';
import type { AttendanceRecord, AttendanceSummary, CreateAttendanceDto, PaginatedData, PaginationQuery } from '../types';

export const attendanceService = {
  getAll: (params?: PaginationQuery & { employeeId?: string; date?: string }) =>
    api.get<PaginatedData<AttendanceRecord>>('/attendance', { params }).then((r) => r.data),

  getSummary: (params?: { date?: string }) =>
    api.get<AttendanceSummary>('/attendance/summary', { params }).then((r) => r.data),

  getMonthly: (employeeId: string) =>
    api.get<AttendanceRecord[]>(`/attendance/monthly/${employeeId}`).then((r) => r.data),

  checkIn: (employeeId: string) =>
    api.post<AttendanceRecord>('/attendance/check-in', { employeeId }).then((r) => r.data),

  checkOut: (employeeId: string) =>
    api.post<AttendanceRecord>('/attendance/check-out', { employeeId }).then((r) => r.data),

  create: (dto: CreateAttendanceDto) =>
    api.post<AttendanceRecord>('/attendance', dto).then((r) => r.data),

  bulkCreate: (date: string, records: CreateAttendanceDto[]) =>
    api.post<AttendanceRecord[]>('/attendance/bulk', { date, records }).then((r) => r.data),
};
