"use client";

import { Tag, Layers, Award, Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import Link from "next/link";

const sections = [
  { title: "Pricing Models", href: "/revenue-manager/pricing-management/pricing-models", icon: Layers, desc: "Define tiered pricing plans and packages", color: "indigo", count: 4 },
  { title: "Discounts", href: "/revenue-manager/pricing-management/discount-management", icon: Tag, desc: "Manage discount rules and promotional codes", color: "emerald", count: 8 },
  { title: "Commissions", href: "/revenue-manager/pricing-management/commission-structure", icon: Award, desc: "Configure sales commission structures", color: "amber", count: 3 },
];

const activePrices = [
  { plan: "Starter", monthly: 299, annual: 2990, users: "Up to 10", features: ["Basic Reports", "HR Module", "Email Support"] },
  { plan: "Professional", monthly: 799, annual: 7990, users: "Up to 50", features: ["Advanced Reports", "All Modules", "Priority Support", "API Access"] },
  { plan: "Enterprise", monthly: null, annual: null, users: "Unlimited", features: ["Custom Reports", "All Modules", "24/7 Support", "Dedicated Manager", "Custom Integrations"] },
];

export default function PricingManagementPage() {
  return (
    <div>
      <PageHeader
        title="Pricing Management"
        description="Manage pricing strategies, discounts, and commission structures"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add Plan
          </button>
        }
      />

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {sections.map(({ title, href, icon: Icon, desc, color, count }) => (
          <Link key={href} href={href} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-indigo-200 hover:shadow-md transition-all group">
            <div className={`w-10 h-10 bg-${color}-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-${color}-100 transition-colors`}>
              <Icon className={`w-5 h-5 text-${color}-600`} />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">{title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </div>
              <span className={`text-xs font-bold text-${color}-600 bg-${color}-50 px-2 py-0.5 rounded-full`}>{count}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pricing Plans Overview */}
      <h3 className="text-sm font-semibold text-slate-700 mb-4">Current Pricing Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activePrices.map((plan, i) => (
          <div key={plan.plan} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${i === 1 ? "border-indigo-300 ring-2 ring-indigo-100" : "border-slate-200"}`}>
            {i === 1 && <div className="bg-indigo-600 text-white text-xs text-center py-1 font-medium">Most Popular</div>}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-slate-900">{plan.plan}</h4>
                <Badge variant={i === 0 ? "secondary" : i === 1 ? "primary" : "success"}>
                  {i === 0 ? "Basic" : i === 1 ? "Pro" : "Custom"}
                </Badge>
              </div>
              <div className="mb-4">
                {plan.monthly ? (
                  <>
                    <p className="text-3xl font-bold text-slate-900">${plan.monthly}<span className="text-sm font-normal text-slate-400">/mo</span></p>
                    <p className="text-xs text-slate-400 mt-0.5">or ${plan.annual}/yr (save {Math.round((1 - (plan.annual! / (plan.monthly * 12))) * 100)}%)</p>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-slate-900">Custom</p>
                )}
                <p className="text-xs text-slate-500 mt-1">{plan.users}</p>
              </div>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${i === 1 ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                Edit Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
