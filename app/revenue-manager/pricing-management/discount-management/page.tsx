"use client";

import { Plus, Tag } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useState } from "react";

const discounts = [
  { id: 1, code: "ANNUAL20", name: "Annual Subscription Discount", type: "Percentage", value: "20%", minOrder: "—", applicableTo: "All Plans", uses: "Unlimited", used: 28, expires: "Dec 31, 2026", status: "active" },
  { id: 2, code: "NEWCLIENT10", name: "New Client Onboarding", type: "Percentage", value: "10%", minOrder: "—", applicableTo: "Starter, Professional", uses: "100", used: 42, expires: "Jun 30, 2026", status: "active" },
  { id: 3, code: "IMPL500", name: "Implementation Discount", type: "Fixed", value: "$500 off", minOrder: "$5,000", applicableTo: "Enterprise", uses: "Unlimited", used: 6, expires: "Mar 31, 2026", status: "active" },
  { id: 4, code: "REFER15", name: "Referral Program", type: "Percentage", value: "15%", minOrder: "—", applicableTo: "All Plans", uses: "Unlimited", used: 15, expires: "Dec 31, 2026", status: "active" },
  { id: 5, code: "Q4PROMO25", name: "Q4 2025 Promotion", type: "Percentage", value: "25%", minOrder: "—", applicableTo: "All Plans", uses: "200", used: 187, expires: "Dec 31, 2025", status: "expired" },
];

export default function DiscountManagementPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Discount Management"
        description="Create and manage discount codes and promotional offers"
        actions={
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> New Discount
          </button>
        }
      />

      <div className="space-y-3">
        {discounts.map((d) => (
          <div key={d.id} className={`bg-white rounded-xl border shadow-sm p-4 ${d.status === "expired" ? "opacity-60 border-slate-100" : "border-slate-200"}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{d.code}</code>
                    <span className="text-sm text-slate-600">{d.name}</span>
                    <Badge variant={d.status === "active" ? "success" : "secondary"} dot>{d.status}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span><span className="font-medium">Value:</span> {d.value}</span>
                    <span><span className="font-medium">Type:</span> {d.type}</span>
                    <span><span className="font-medium">Applies to:</span> {d.applicableTo}</span>
                    <span><span className="font-medium">Uses:</span> {d.used} / {d.uses}</span>
                    <span><span className="font-medium">Expires:</span> {d.expires}</span>
                  </div>
                  {d.uses !== "Unlimited" && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1.5 bg-slate-100 rounded-full w-32 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(d.used / parseInt(d.uses)) * 100}%` }} />
                      </div>
                      <span className="text-xs text-slate-400">{Math.round((d.used / parseInt(d.uses)) * 100)}% used</span>
                    </div>
                  )}
                </div>
              </div>
              {d.status === "active" && (
                <button className="text-xs text-red-600 hover:text-red-700 font-medium shrink-0">Deactivate</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
