import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { activityLogsService } from '@/lib/api/services/activity-logs';

export function useActivityLogs(params?: { userId?: string; entity?: string; action?: string }) {
  return useQuery({
    queryKey: queryKeys.activityLogs.list(params),
    queryFn: () => activityLogsService.getAll({ limit: 200, ...params }),
  });
}

export function useActivityStats() {
  return useQuery({
    queryKey: queryKeys.activityLogs.stats(),
    queryFn: () => activityLogsService.getStats(),
  });
}
