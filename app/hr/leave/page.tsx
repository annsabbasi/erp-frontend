"use client";

import { useState } from "react";
import { Calendar, Plus, Check, X, Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";

type LeaveRequest = {
  id: number; employee: string; empId: string; type: string; from: string; to: string; days: number; reason: string; status: "pending" | "approved" | "rejected"; applied: string;
};

const initialRequests: LeaveRequest[] = [
  { id: 1, employee: "James Wilson", empId: "EMP005", type: "Annual Leave", from: "2026-03-03", to: "2026-03-07", days: 5, reason: "Family vacation", status: "pending", applied: "2026-02-20" },
  { id: 2, employee: "Linda Martinez", empId: "EMP006", type: "Sick Leave", from: "2026-02-28", to: "2026-03-01", days: 2, reason: "Medical appointment", status: "pending", applied: "2026-02-26" },
  { id: 3, employee: "David Kim", empId: "EMP009", type: "Emergency Leave", from: "2026-03-01", to: "2026-03-01", days: 1, reason: "Family emergency", status: "pending", applied: "2026-02-27" },
  { id: 4, employee: "Maria Garcia", empId: "EMP010", type: "Annual Leave", from: "2026-03-10", to: "2026-03-14", days: 5, reason: "Personal travel", status: "approved", applied: "2026-02-15" },
  { id: 5, employee: "Robert Brown", empId: "EMP007", type: "Sick Leave", from: "2026-02-20", to: "2026-02-21", days: 2, reason: "Flu", status: "approved", applied: "2026-02-20" },
  { id: 6, employee: "Jennifer Lee", empId: "EMP008", type: "Annual Leave", from: "2026-02-10", to: "2026-02-14", days: 5, reason: "Vacation", status: "rejected", applied: "2026-02-05" },
];

const leaveTypes = ["Annual Leave", "Sick Leave", "Emergency Leave", "Maternity/Paternity", "Unpaid Leave"];

export default function LeavePage() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  function approve(id: number) { setRequests(requests.map((r) => r.id === id ? { ...r, status: "approved" } : r)); }
  function reject(id: number) { setRequests(requests.map((r) => r.id === id ? { ...r, status: "rejected" } : r)); }

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const rejected = requests.filter((r) => r.status === "rejected").length;

  return (
    <div>
      <PageHeader
        title="Leave Management"
        description="Review, approve, and manage employee leave requests"
        actions={
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> New Request
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Pending" value={pending} icon={Clock} variant="warning" />
        <StatCard title="Approved" value={approved} icon={Check} variant="success" />
        <StatCard title="Rejected" value={rejected} icon={X} variant="danger" />
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
              filter === f ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >{f === "all" ? "All Requests" : f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((req) => (
          <div key={req.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold shrink-0">
                  {req.employee.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-800">{req.employee}</span>
                    <Badge variant="secondary">{req.empId}</Badge>
                    <Badge variant={req.type === "Emergency Leave" ? "danger" : req.type === "Sick Leave" ? "warning" : "primary"}>
                      {req.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{req.from} → {req.to}</span>
                    <span>{req.days} day{req.days > 1 ? "s" : ""}</span>
                    <span>Applied: {req.applied}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 italic">"{req.reason}"</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {req.status === "pending" ? (
                  <>
                    <button onClick={() => approve(req.id)} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg transition-colors">
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => reject(req.id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-lg transition-colors">
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                ) : (
                  <Badge dot variant={req.status === "approved" ? "success" : "danger"}>
                    {req.status}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No leave requests found</p>
          </div>
        )}
      </div>
    </div>
  );
}
