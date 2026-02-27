"use client";

import { Plus, Award } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";

const structures = [
  { id: 1, name: "Standard Commission", rep: "All Sales Reps", tier1: "3% on first $50k", tier2: "5% on $50k–$150k", tier3: "8% above $150k", kicker: "None", ytdEarned: "$28,400", active: true },
  { id: 2, name: "Senior Rep Commission", rep: "Alex Thompson, David Kim", tier1: "5% on first $100k", tier2: "8% on $100k–$300k", tier3: "12% above $300k", kicker: "+2% if target >110%", ytdEarned: "$42,600", active: true },
  { id: 3, name: "New Business Bonus", rep: "All Reps", tier1: "+1% for new client acquisition", tier2: "—", tier3: "—", kicker: "$500 flat per new enterprise deal", ytdEarned: "$8,200", active: true },
];

const repEarnings = [
  { name: "Alex Thompson", revenue: 135000, commission: 12420, target: 120000, attainment: 112.5 },
  { name: "David Kim", revenue: 98600, commission: 7888, target: 100000, attainment: 98.6 },
  { name: "Jennifer Lee", revenue: 42500, commission: 2125, target: 50000, attainment: 85 },
];

export default function CommissionStructurePage() {
  return (
    <div>
      <PageHeader
        title="Commission Structure"
        description="Define sales commission tiers and track rep earnings"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> New Structure
          </button>
        }
      />

      <div className="space-y-4 mb-6">
        {structures.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{s.name}</h3>
                  <p className="text-xs text-slate-400">Applies to: {s.rep}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-700">YTD: {s.ytdEarned}</span>
                <Badge dot variant="success">Active</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { label: "Tier 1", value: s.tier1 },
                { label: "Tier 2", value: s.tier2 },
                { label: "Tier 3", value: s.tier3 },
                { label: "Kicker", value: s.kicker },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                  <p className="text-xs font-medium text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">Rep Earnings – Q1 2026 YTD</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Sales Rep", "Revenue Generated", "Commission Earned", "Target", "Attainment"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {repEarnings.map((r) => (
                <tr key={r.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold">
                        {r.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium text-slate-800">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800">${r.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold text-emerald-700">${r.commission.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500">${r.target.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${r.attainment >= 100 ? "bg-emerald-500" : r.attainment >= 85 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${Math.min(r.attainment, 100)}%` }} />
                      </div>
                      <span className={`text-xs font-bold ${r.attainment >= 100 ? "text-emerald-700" : r.attainment >= 85 ? "text-amber-600" : "text-red-600"}`}>
                        {r.attainment}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
