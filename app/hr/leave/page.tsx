"use client";

import { useState } from "react";
import { Calendar, Plus, Check, X, Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import { useLeaveRequests, useApproveLeave, useRejectLeave } from "@/lib/hooks/use-leave";
import type { LeaveRequest } from "@/lib/api/types";

export default function LeavePage() {
  const { data, isLoading, error, refetch } = useLeaveRequests();
  const items = data?.data ?? [];
  const approveMutation = useApproveLeave();
  const rejectMutation = useRejectLeave();

  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  function approve(id: string) {
    approveMutation.mutate({ id, dto: { status: "APPROVED" } });
  }

  function reject(id: string) {
    rejectMutation.mutate({ id });
  }

  const filtered =
    filter === "all"
      ? items
      : items.filter((r) => r.status.toLowerCase() === filter);

  const pending = items.filter((r) => r.status === "PENDING").length;
  const approved = items.filter((r) => r.status === "APPROVED").length;
  const rejected = items.filter((r) => r.status === "REJECTED").length;

  function leaveTypeBadgeVariant(typeName: string): "danger" | "warning" | "primary" {
    if (typeName?.toLowerCase().includes("emergency")) return "danger";
    if (typeName?.toLowerCase().includes("sick")) return "warning";
    return "primary";
  }

  function employeeName(req: LeaveRequest): string {
    if (req.employee) {
      return `${req.employee.firstName} ${req.employee.lastName}`;
    }
    return req.employeeId;
  }

  function employeeInitials(req: LeaveRequest): string {
    if (req.employee) {
      return `${req.employee.firstName[0]}${req.employee.lastName[0]}`.toUpperCase();
    }
    return "?";
  }

  function employeeCode(req: LeaveRequest): string {
    return req.employee?.employeeCode ?? req.employeeId;
  }

  function leaveTypeName(req: LeaveRequest): string {
    return req.leaveType?.name ?? req.leaveTypeId;
  }

  return (
    <div>
      <PageHeader
        title="Leave Management"
        description="Review, approve, and manage employee leave requests"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
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
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f === "all" ? "All Requests" : f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((req) => (
          <div key={req.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold shrink-0">
                  {employeeInitials(req)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-800">{employeeName(req)}</span>
                    <Badge variant="secondary">{employeeCode(req)}</Badge>
                    <Badge variant={leaveTypeBadgeVariant(leaveTypeName(req))}>
                      {leaveTypeName(req)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {req.startDate} → {req.endDate}
                    </span>
                    <span>
                      {req.days} day{req.days > 1 ? "s" : ""}
                    </span>
                    <span>Applied: {req.createdAt.split("T")[0]}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 italic">"{req.reason}"</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {req.status === "PENDING" ? (
                  <>
                    <button
                      onClick={() => approve(req.id)}
                      disabled={approveMutation.isPending}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg transition-colors disabled:opacity-60"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => reject(req.id)}
                      disabled={rejectMutation.isPending}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-lg transition-colors disabled:opacity-60"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                ) : (
                  <Badge dot variant={req.status === "APPROVED" ? "success" : "danger"}>
                    {req.status.toLowerCase()}
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
