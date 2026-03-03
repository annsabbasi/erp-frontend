import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { announcementsService } from '@/lib/api/services/announcements';
import type { CreateAnnouncementDto, UpdateAnnouncementDto, AnnouncementAudience } from '@/lib/api/types';

export function useAnnouncements(params?: { audience?: AnnouncementAudience; includeExpired?: boolean }) {
  return useQuery({
    queryKey: queryKeys.announcements.list(params),
    queryFn: () => announcementsService.getAll(params),
  });
}

export function useAnnouncement(id: string) {
  return useQuery({
    queryKey: queryKeys.announcements.detail(id),
    queryFn: () => announcementsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateAnnouncementDto) => announcementsService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.announcements.all }),
  });
}

export function useUpdateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateAnnouncementDto }) =>
      announcementsService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.announcements.all }),
  });
}

export function usePinAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => announcementsService.pin(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.announcements.all }),
  });
}

export function useDeleteAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => announcementsService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.announcements.all }),
  });
}
