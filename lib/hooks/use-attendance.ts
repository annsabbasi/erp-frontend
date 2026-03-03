import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { attendanceService } from '@/lib/api/services/attendance';
import type { CreateAttendanceDto } from '@/lib/api/types';

export function useAttendance(params?: { employeeId?: string; date?: string }) {
  return useQuery({
    queryKey: queryKeys.attendance.list(params),
    queryFn: () => attendanceService.getAll({ limit: 200, ...params }),
  });
}

export function useAttendanceSummary(params?: { date?: string }) {
  return useQuery({
    queryKey: queryKeys.attendance.summary(params),
    queryFn: () => attendanceService.getSummary(params),
  });
}

export function useMonthlyAttendance(employeeId: string) {
  return useQuery({
    queryKey: queryKeys.attendance.monthly(employeeId),
    queryFn: () => attendanceService.getMonthly(employeeId),
    enabled: !!employeeId,
  });
}

export function useCreateAttendance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateAttendanceDto) => attendanceService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.attendance.lists() }),
  });
}

export function useBulkCreateAttendance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ date, records }: { date: string; records: CreateAttendanceDto[] }) =>
      attendanceService.bulkCreate(date, records),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.attendance.lists() }),
  });
}
