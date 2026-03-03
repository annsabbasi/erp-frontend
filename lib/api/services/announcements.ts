import api from '../client';
import type { Announcement, CreateAnnouncementDto, UpdateAnnouncementDto, AnnouncementAudience } from '../types';

export const announcementsService = {
  getAll: (params?: { audience?: AnnouncementAudience; includeExpired?: boolean }) =>
    api.get<Announcement[]>('/announcements', { params }).then((r) => r.data),

  getById: (id: string) =>
    api.get<Announcement>(`/announcements/${id}`).then((r) => r.data),

  create: (dto: CreateAnnouncementDto) =>
    api.post<Announcement>('/announcements', dto).then((r) => r.data),

  update: (id: string, dto: UpdateAnnouncementDto) =>
    api.patch<Announcement>(`/announcements/${id}`, dto).then((r) => r.data),

  pin: (id: string) =>
    api.patch<Announcement>(`/announcements/${id}/pin`).then((r) => r.data),

  delete: (id: string) =>
    api.delete<void>(`/announcements/${id}`).then((r) => r.data),
};
