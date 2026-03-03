"use client";

import { useState } from "react";
import { Plus, Megaphone, X, Edit2, Trash2, Globe, Users, Lock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { formatDate } from "@/lib/utils";
import { useAnnouncements, useCreateAnnouncement } from "@/lib/hooks/use-announcements";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import type { AnnouncementAudience } from "@/lib/api/types";

const audienceIcons: Record<string, React.ElementType> = {
  ALL: Globe,
  HR: Users,
  FINANCE_OFFICER: Lock,
  ACCOUNTANT: Lock,
  ADMIN: Lock,
  REVENUE_MANAGER: Lock,
};

const audienceLabels: Record<string, string> = {
  ALL: "All Users",
  HR: "HR Only",
  FINANCE_OFFICER: "Finance Officer",
  ACCOUNTANT: "Accountant",
  ADMIN: "Admin Only",
  REVENUE_MANAGER: "Revenue Manager",
};

export default function AnnouncementsPage() {
  const { data, isLoading, error, refetch } = useAnnouncements();
  const createMutation = useCreateAnnouncement();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    body: "",
    audience: "ALL" as AnnouncementAudience,
    isPinned: false,
  });

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const announcements = data ?? [];

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    createMutation.mutate(
      { title: form.title, body: form.body, audience: form.audience, isPinned: form.isPinned },
      {
        onSuccess: () => {
          setShowForm(false);
          setForm({ title: "", body: "", audience: "ALL", isPinned: false });
        },
      }
    );
  }

  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Manage system-wide and role-specific announcements"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Announcement
          </button>
        }
      />

      {/* Create Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-800">New Announcement</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Announcement title..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
                <textarea
                  required
                  rows={4}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder="Write your announcement..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Audience</label>
                  <select
                    value={form.audience}
                    onChange={(e) => setForm({ ...form, audience: e.target.value as AnnouncementAudience })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ALL">All Users</option>
                    <option value="HR">HR Only</option>
                    <option value="FINANCE_OFFICER">Finance Officer</option>
                    <option value="ACCOUNTANT">Accountant</option>
                    <option value="ADMIN">Admin Only</option>
                    <option value="REVENUE_MANAGER">Revenue Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Pin</label>
                  <select
                    value={form.isPinned ? "yes" : "no"}
                    onChange={(e) => setForm({ ...form, isPinned: e.target.value === "yes" })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="no">Not Pinned</option>
                    <option value="yes">Pinned</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
                >
                  {createMutation.isPending ? "Publishing..." : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((ann) => {
          const audienceKey = ann.audience ?? "ALL";
          const AudienceIcon = audienceIcons[audienceKey] ?? Globe;
          return (
            <div
              key={ann.id}
              className={`bg-white rounded-xl border shadow-sm p-5 ${
                ann.isPinned ? "border-indigo-200" : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`mt-0.5 p-2 rounded-lg ${ann.isPinned ? "bg-indigo-50" : "bg-slate-50"}`}>
                    <Megaphone className={`w-4 h-4 ${ann.isPinned ? "text-indigo-500" : "text-slate-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-slate-800">{ann.title}</h3>
                      {ann.isPinned && <Badge variant="primary">Pinned</Badge>}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{ann.body}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <AudienceIcon className="w-3.5 h-3.5" />
                        {audienceLabels[audienceKey] ?? audienceKey}
                      </span>
                      {ann.createdBy && (
                        <span>By {ann.createdBy.firstName} {ann.createdBy.lastName}</span>
                      )}
                      <span>{formatDate(ann.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
