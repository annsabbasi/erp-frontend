"use client";

import { AlertCircle, CheckCircle2, Clock, Bell, TrendingUp, CreditCard } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useState } from "react";

type AlertSeverity = "critical" | "warning" | "info";

const alerts = [
  { id: 1, title: "Overdue Receivable — BlueSky Inc.", message: "Invoice INV-2026-038 for $8,400 is 7 days overdue. Immediate follow-up required.", severity: "critical" as AlertSeverity, category: "Receivables", timestamp: "Feb 27, 2026 08:30 AM", read: false },
  { id: 2, title: "Unmatched Bank Transactions Detected", message: "2 transactions from the Feb 2026 bank statement do not match book entries. Review required in Bank Reconciliation.", severity: "critical" as AlertSeverity, category: "Bank Reconciliation", timestamp: "Feb 27, 2026 09:00 AM", read: false },
  { id: 3, title: "Month-End Close Approaching", message: "February 2026 books must be closed by March 5, 2026. Ensure all transactions are posted and reconciled.", severity: "warning" as AlertSeverity, category: "Month-End", timestamp: "Feb 26, 2026 04:00 PM", read: false },
  { id: 4, title: "AWS Auto-Charge Not Recorded in Books", message: "Bank charge of $2,100 (BANK-0291) dated Feb 22, 2026 has no corresponding book entry. Post journal entry.", severity: "warning" as AlertSeverity, category: "Transactions", timestamp: "Feb 25, 2026 11:45 AM", read: true },
  { id: 5, title: "Bank Interest Income Not Recorded", message: "Interest income of $480 (INT-0218) dated Feb 18, 2026 is missing from the books. Record in income accounts.", severity: "warning" as AlertSeverity, category: "Accounts", timestamp: "Feb 24, 2026 03:15 PM", read: true },
  { id: 6, title: "Accounts Payable Aging — 30+ Days", message: "3 vendor invoices totalling $12,800 are 30+ days overdue. Schedule payments to avoid late penalties.", severity: "warning" as AlertSeverity, category: "Payables", timestamp: "Feb 23, 2026 10:00 AM", read: true },
  { id: 7, title: "Q4 2025 Audit Package Ready", message: "The Q4 2025 audit documentation has been compiled and submitted to the Finance Officer for review.", severity: "info" as AlertSeverity, category: "Audit", timestamp: "Feb 22, 2026 02:30 PM", read: true },
  { id: 8, title: "New Client Payment Received", message: "Payment of $24,500 from GlobalCorp Ltd. (INV-042) has been received and matched in the bank statement.", severity: "info" as AlertSeverity, category: "Receivables", timestamp: "Feb 27, 2026 07:50 AM", read: true },
];

const severityConfig: Record<AlertSeverity, { icon: React.ReactNode; badgeVariant: "danger" | "warning" | "info"; bgClass: string; borderClass: string; iconClass: string }> = {
  critical: { icon: <AlertCircle className="w-4 h-4" />, badgeVariant: "danger", bgClass: "bg-red-50", borderClass: "border-red-200", iconClass: "text-red-500" },
  warning: { icon: <Bell className="w-4 h-4" />, badgeVariant: "warning", bgClass: "bg-amber-50", borderClass: "border-amber-200", iconClass: "text-amber-500" },
  info: { icon: <CheckCircle2 className="w-4 h-4" />, badgeVariant: "info", bgClass: "bg-blue-50", borderClass: "border-blue-200", iconClass: "text-blue-500" },
};

export default function AccountantAlertsPage() {
  const [filter, setFilter] = useState<"all" | AlertSeverity>("all");
  const [readState, setReadState] = useState<Record<number, boolean>>(
    Object.fromEntries(alerts.map((a) => [a.id, a.read]))
  );

  const filtered = alerts.filter((a) => filter === "all" || a.severity === filter);
  const unreadCount = Object.values(readState).filter((r) => !r).length;

  const markAllRead = () => {
    setReadState(Object.fromEntries(alerts.map((a) => [a.id, true])));
  };

  return (
    <div>
      <PageHeader
        title="Accountant Alerts"
        description="Reconciliation issues, overdue items, and pending accounting actions"
        actions={
          <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <CheckCircle2 className="w-4 h-4" /> Mark All Read
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-xs text-red-600 font-medium">Critical</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{alerts.filter((a) => a.severity === "critical").length}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-600 font-medium">Warnings</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{alerts.filter((a) => a.severity === "warning").length}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-600 font-medium">Informational</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{alerts.filter((a) => a.severity === "info").length}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(["all", "critical", "warning", "info"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filter === f ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            {f === "all" ? `All (${alerts.length})` : f}
          </button>
        ))}
        {unreadCount > 0 && (
          <span className="ml-auto px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full self-center">
            {unreadCount} unread
          </span>
        )}
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {filtered.map((alert) => {
          const cfg = severityConfig[alert.severity];
          const isRead = readState[alert.id];
          return (
            <div
              key={alert.id}
              className={`rounded-xl border p-4 transition-all ${cfg.bgClass} ${cfg.borderClass} ${isRead ? "opacity-70" : ""}`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 ${cfg.iconClass}`}>{cfg.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="text-sm font-semibold text-slate-800">{alert.title}</h4>
                    {!isRead && <span className="w-2 h-2 bg-indigo-500 rounded-full" />}
                    <Badge variant={cfg.badgeVariant}>{alert.severity}</Badge>
                    <Badge variant="secondary">{alert.category}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {alert.timestamp}
                    </span>
                    {!isRead && (
                      <button
                        onClick={() => setReadState((prev) => ({ ...prev, [alert.id]: true }))}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No alerts to display.</div>
        )}
      </div>
    </div>
  );
}
