import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { leaveService } from '@/lib/api/services/leave';
import type { CreateLeaveRequestDto, UpdateLeaveStatusDto } from '@/lib/api/types';

export function useLeaveTypes() {
  return useQuery({
    queryKey: queryKeys.leave.types(),
    queryFn: () => leaveService.getTypes(),
  });
}

export function useLeaveRequests(params?: { employeeId?: string; status?: string }) {
  return useQuery({
    queryKey: queryKeys.leave.requests(params),
    queryFn: () => leaveService.getRequests({ limit: 200, ...params }),
  });
}

export function useLeaveBalances(employeeId: string) {
  return useQuery({
    queryKey: queryKeys.leave.balances(employeeId),
    queryFn: () => leaveService.getBalances(employeeId),
    enabled: !!employeeId,
  });
}

export function useCreateLeaveRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateLeaveRequestDto) => leaveService.createRequest(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.leave.all }),
  });
}

export function useApproveLeave() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateLeaveStatusDto }) =>
      leaveService.updateStatus(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.leave.all }),
  });
}

export function useRejectLeave() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note?: string }) =>
      leaveService.updateStatus(id, { status: 'REJECTED', rejectionNote: note }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.leave.all }),
  });
}
