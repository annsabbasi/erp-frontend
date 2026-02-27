"use client";

import { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const departments = ["Human Resources", "Finance & Accounting", "Sales & Marketing", "Information Technology", "Operations"];
const categories = ["Salaries & Wages", "Office Supplies", "Marketing & Advertising", "Software & Subscriptions", "Travel & Entertainment", "Training & Development", "Equipment", "Utilities", "Other"];

type LineItem = { category: string; amount: string; notes: string };

export default function CreateBudgetPage() {
  const [form, setForm] = useState({ name: "", department: departments[0], period: "Q2 2026", startDate: "2026-04-01", endDate: "2026-06-30", notes: "" });
  const [items, setItems] = useState<LineItem[]>([{ category: categories[0], amount: "", notes: "" }]);
  const [submitted, setSubmitted] = useState(false);

  const totalBudget = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);

  function addItem() { setItems([...items, { category: categories[0], amount: "", notes: "" }]); }
  function removeItem(i: number) { setItems(items.filter((_, idx) => idx !== i)); }
  function updateItem(i: number, key: keyof LineItem, val: string) {
    setItems(items.map((item, idx) => idx === i ? { ...item, [key]: val } : item));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <PageHeader title="Create Budget" description="Define a new departmental budget" />

      {submitted ? (
        <div className="max-w-md mx-auto text-center py-16">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Budget Submitted!</h2>
          <p className="text-slate-500 text-sm mb-6">
            Budget for <strong>{form.department}</strong> ({form.period}) totaling <strong>${totalBudget.toLocaleString()}</strong> has been submitted for approval.
          </p>
          <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
            Create Another Budget
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Budget Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Budget Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Q2 2026 – HR Budget"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
                  <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {departments.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Period</label>
                  <input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })}
                    placeholder="e.g. Q2 2026"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
                    <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">End Date</label>
                    <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
                  <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Budget justification and notes..."
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Budget Summary</h3>
              <div className="space-y-2 mb-4">
                {items.map((item, i) => (
                  item.amount && (
                    <div key={i} className="flex justify-between text-xs text-slate-600">
                      <span>{item.category}</span>
                      <span className="font-medium">${parseFloat(item.amount).toLocaleString()}</span>
                    </div>
                  )
                ))}
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-slate-800">Total Budget</span>
                  <span className="text-lg font-bold text-indigo-600">${totalBudget.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
              <h3 className="text-sm font-semibold text-slate-800">Line Items</h3>
              <button type="button" onClick={addItem} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Line
              </button>
            </div>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-start">
                  <div className="col-span-4">
                    <select value={item.category} onChange={(e) => updateItem(i, "category", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input type="number" placeholder="Amount (USD)" value={item.amount} onChange={(e) => updateItem(i, "amount", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="col-span-4">
                    <input placeholder="Notes (optional)" value={item.notes} onChange={(e) => updateItem(i, "notes", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="col-span-1 flex justify-center pt-2">
                    <button type="button" onClick={() => removeItem(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">Save as Draft</button>
            <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              Submit for Approval
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
