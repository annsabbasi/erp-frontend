"use client";

import { Plus, Edit2, Trash2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";

const models = [
  { id: 1, name: "Starter Plan", type: "Subscription", price: "$299/mo", annualPrice: "$2,990/yr", users: "Up to 10", modules: ["HR", "Basic Reports"], status: "active", subscribers: 42 },
  { id: 2, name: "Professional Plan", type: "Subscription", price: "$799/mo", annualPrice: "$7,990/yr", users: "Up to 50", modules: ["All Modules", "Advanced Reports", "API Access"], status: "active", subscribers: 28 },
  { id: 3, name: "Enterprise Plan", type: "Custom", price: "Custom Quote", annualPrice: "Custom", users: "Unlimited", modules: ["Everything + Custom Dev"], status: "active", subscribers: 6 },
  { id: 4, name: "One-Time Implementation", type: "One-Time", price: "From $5,000", annualPrice: "—", users: "N/A", modules: ["Setup & Training"], status: "active", subscribers: 12 },
];

export default function PricingModelsPage() {
  return (
    <div>
      <PageHeader
        title="Pricing Models"
        description="Define and manage pricing plans and packages"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> New Model
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{m.name}</h3>
                <div className="flex gap-2 mt-1">
                  <Badge variant={m.type === "Subscription" ? "primary" : m.type === "One-Time" ? "info" : "success"}>{m.type}</Badge>
                  <Badge dot variant="success">{m.status}</Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-indigo-50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Monthly Price</p>
                <p className="text-base font-bold text-indigo-800">{m.price}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Annual Price</p>
                <p className="text-base font-bold text-slate-800">{m.annualPrice}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-slate-400 mb-1">Included Modules</p>
              <div className="flex flex-wrap gap-1">
                {m.modules.map((mod) => (
                  <span key={mod} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{mod}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <span>Users: {m.users}</span>
              <span className="font-medium text-indigo-600">{m.subscribers} subscribers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
