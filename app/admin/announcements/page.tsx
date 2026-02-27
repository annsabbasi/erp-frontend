"use client";

import { useState } from "react";
import { Plus, Megaphone, X, Edit2, Trash2, Globe, Users, Lock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { formatDate } from "@/lib/utils";

type Announcement = {
  id: number;
  title: string;
  content: string;
  audience: "all" | "hr" | "finance" | "admin";
  priority: "low" | "medium" | "high";
  date: string;
  author: string;
  active: boolean;
};

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "System Maintenance Scheduled – March 5, 2026",
    content: "The ERP system will undergo scheduled maintenance on March 5th from 2:00 AM to 4:00 AM UTC. All services will be temporarily unavailable during this period. Please save your work beforehand.",
    audience: "all",
    priority: "high",
    date: "2026-02-27",
    author: "System Admin",
    active: true,
  },
  {
    id: 2,
    title: "Q1 Financial Reports Due by March 31",
    content: "All department heads are reminded that Q1 financial reports must be submitted by March 31, 2026. Please ensure all transactions are reconciled and approved before submission.",
    audience: "finance",
    priority: "high",
    date: "2026-02-25",
    author: "System Admin",
    active: true,
  },
  {
    id: 3,
    title: "New HR Policy: Remote Work Guidelines",
    content: "Updated remote work guidelines are now in effect. Employees may work remotely up to 3 days per week with manager approval. Please review the full policy document in the HR portal.",
    audience: "hr",
    priority: "medium",
    date: "2026-02-20",
    author: "System Admin",
    active: true,
  },
  {
    id: 4,
    title: "Password Reset Requirement",
    content: "As part of our security policy update, all users are required to reset their passwords by February 28, 2026. Please use the profile settings page to update your password.",
    audience: "all",
    priority: "medium",
    date: "2026-02-15",
    author: "System Admin",
    active: false,
  },
];

const audienceIcons = {
  all: Globe,
  hr: Users,
  finance: Lock,
  admin: Lock,
};

const audienceLabels = {
  all: "All Users",
  hr: "HR Only",
  finance: "Finance Team",
  admin: "Admin Only",
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    audience: "all" as Announcement["audience"],
    priority: "medium" as Announcement["priority"],
  });

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const newAnn: Announcement = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString().split("T")[0],
      author: "System Admin",
      active: true,
    };
    setAnnouncements([newAnn, ...announcements]);
    setShowForm(false);
    setForm({ title: "", content: "", audience: "all", priority: "medium" });
  }

  function toggleActive(id: number) {
    setAnnouncements(announcements.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  }

  function deleteAnn(id: number) {
    setAnnouncements(announcements.filter((a) => a.id !== id));
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
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write your announcement..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Audience</label>
                  <select
                    value={form.audience}
                    onChange={(e) => setForm({ ...form, audience: e.target.value as Announcement["audience"] })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Users</option>
                    <option value="hr">HR Only</option>
                    <option value="finance">Finance Team</option>
                    <option value="admin">Admin Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value as Announcement["priority"] })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
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
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((ann) => {
          const AudienceIcon = audienceIcons[ann.audience];
          return (
            <div
              key={ann.id}
              className={`bg-white rounded-xl border shadow-sm p-5 ${
                ann.active ? "border-slate-200" : "border-slate-100 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`mt-0.5 p-2 rounded-lg ${
                    ann.priority === "high" ? "bg-red-50" : ann.priority === "medium" ? "bg-amber-50" : "bg-slate-50"
                  }`}>
                    <Megaphone className={`w-4 h-4 ${
                      ann.priority === "high" ? "text-red-500" : ann.priority === "medium" ? "text-amber-500" : "text-slate-400"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-slate-800">{ann.title}</h3>
                      <Badge variant={ann.priority === "high" ? "danger" : ann.priority === "medium" ? "warning" : "secondary"}>
                        {ann.priority}
                      </Badge>
                      {!ann.active && <Badge variant="secondary">Inactive</Badge>}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{ann.content}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <AudienceIcon className="w-3.5 h-3.5" />
                        {audienceLabels[ann.audience]}
                      </span>
                      <span>By {ann.author}</span>
                      <span>{formatDate(ann.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleActive(ann.id)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title={ann.active ? "Deactivate" : "Activate"}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteAnn(ann.id)}
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
