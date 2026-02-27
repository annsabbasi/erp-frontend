"use client";

import { Megaphone } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { formatDate } from "@/lib/utils";

const announcements = [
  { id: 1, title: "Updated Remote Work Policy", content: "Effective March 1, 2026, employees may work remotely up to 3 days per week. Please coordinate with your manager and ensure you are reachable during core hours (10 AM – 4 PM).", priority: "high", date: "2026-02-25", author: "HR Department" },
  { id: 2, title: "Q1 Performance Reviews – March 15–31", content: "Annual Q1 performance reviews will be conducted from March 15 to March 31. Managers are required to complete self-assessments and peer reviews by March 14.", priority: "medium", date: "2026-02-22", author: "HR Department" },
  { id: 3, title: "Company Annual Dinner – April 12", content: "We are pleased to announce our Annual Company Dinner on April 12, 2026. Venue details and RSVP instructions will be shared via email by March 15.", priority: "low", date: "2026-02-18", author: "Management" },
  { id: 4, title: "Mandatory Safety Training", content: "All employees are required to complete the updated workplace safety training by March 31, 2026. Access the training module through the company LMS portal.", priority: "high", date: "2026-02-15", author: "HR Department" },
];

export default function HRAnnouncementsPage() {
  return (
    <div>
      <PageHeader title="Announcements" description="Company and HR announcements for all staff" />
      <div className="space-y-4">
        {announcements.map((a) => (
          <div key={a.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${a.priority === "high" ? "bg-red-50" : a.priority === "medium" ? "bg-amber-50" : "bg-slate-50"}`}>
                <Megaphone className={`w-4 h-4 ${a.priority === "high" ? "text-red-500" : a.priority === "medium" ? "text-amber-500" : "text-slate-400"}`} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-slate-800">{a.title}</h3>
                  <Badge variant={a.priority === "high" ? "danger" : a.priority === "medium" ? "warning" : "secondary"}>{a.priority}</Badge>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{a.content}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  <span>By {a.author}</span>
                  <span>{formatDate(a.date)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
