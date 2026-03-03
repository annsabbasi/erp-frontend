"use client";

import { Megaphone } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { formatDate } from "@/lib/utils";
import { useAnnouncements } from "@/lib/hooks/use-announcements";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function HRAnnouncementsPage() {
  const { data, isLoading, error, refetch } = useAnnouncements({ audience: "HR" });

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const announcements = data ?? [];

  return (
    <div>
      <PageHeader title="Announcements" description="Company and HR announcements for all staff" />
      <div className="space-y-4">
        {announcements.map((a) => (
          <div key={a.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${a.isPinned ? "bg-indigo-50" : "bg-slate-50"}`}>
                <Megaphone className={`w-4 h-4 ${a.isPinned ? "text-indigo-500" : "text-slate-400"}`} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-slate-800">{a.title}</h3>
                  {a.isPinned && <Badge variant="primary">Pinned</Badge>}
                  <Badge variant="secondary">{a.audience}</Badge>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{a.body}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  {a.createdBy && (
                    <span>By {a.createdBy.firstName} {a.createdBy.lastName}</span>
                  )}
                  <span>{formatDate(a.createdAt)}</span>
                  {a.expiresAt && (
                    <span className="text-amber-500">Expires: {formatDate(a.expiresAt)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {announcements.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
            <Megaphone className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No announcements at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
