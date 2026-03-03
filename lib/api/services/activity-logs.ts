import api from '../client';
import type { ActivityLog, ActivityStats, PaginatedData, PaginationQuery } from '../types';

export const activityLogsService = {
  getAll: (params?: PaginationQuery & { userId?: string; entity?: string; action?: string }) =>
    api.get<PaginatedData<ActivityLog>>('/activity-logs', { params }).then((r) => r.data),

  getStats: () =>
    api.get<ActivityStats>('/activity-logs/stats').then((r) => r.data),
};
