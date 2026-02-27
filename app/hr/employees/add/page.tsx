"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Check, ChevronRight, ChevronLeft } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

const steps = ["Personal Info", "Employment", "Compensation", "Documents"];

const departments = ["Human Resources", "Finance", "Sales", "Operations", "Information Technology", "Marketing"];
const positions = ["Manager", "Senior Associate", "Associate", "Analyst", "Executive", "Director", "Officer", "Assistant"];
const employmentTypes = ["Full-Time", "Part-Time", "Contract", "Intern"];

export default function AddEmployeePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", dob: "", gender: "Male", address: "",
    department: "Finance", position: "", employmentType: "Full-Time", startDate: "", managerId: "",
    baseSalary: "", payFrequency: "Monthly", allowances: "", bankName: "", accountNumber: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => router.push("/hr/employees"), 1500);
  }

  return (
    <div>
      <PageHeader title="Add New Employee" description="Register a new employee in the system" />

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i < step ? "bg-indigo-600 text-white" : i === step ? "bg-indigo-600 text-white ring-4 ring-indigo-100" : "bg-slate-100 text-slate-400"
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium ${i <= step ? "text-indigo-600" : "text-slate-400"}`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < step ? "bg-indigo-600" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-4">
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <h2 className="md:col-span-2 text-sm font-semibold text-slate-700 border-b border-slate-100 pb-2">Personal Information</h2>
            {[["firstName", "First Name"], ["lastName", "Last Name"]].map(([k, l]) => (
              <div key={k}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{l}</label>
                <input value={form[k as keyof typeof form]} onChange={(e) => update(k, e.target.value)} placeholder={l}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="employee@erp.com"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 555-0000"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
              <input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Gender</label>
              <select value={form.gender} onChange={(e) => update("gender", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Home Address</label>
              <textarea rows={2} value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Full address..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <h2 className="md:col-span-2 text-sm font-semibold text-slate-700 border-b border-slate-100 pb-2">Employment Details</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
              <select value={form.department} onChange={(e) => update("department", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Position / Title</label>
              <input value={form.position} onChange={(e) => update("position", e.target.value)} placeholder="e.g. Senior Accountant"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Employment Type</label>
              <select value={form.employmentType} onChange={(e) => update("employmentType", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {employmentTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
              <input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <h2 className="md:col-span-2 text-sm font-semibold text-slate-700 border-b border-slate-100 pb-2">Compensation & Banking</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Base Salary (USD)</label>
              <input type="number" value={form.baseSalary} onChange={(e) => update("baseSalary", e.target.value)} placeholder="5000"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Pay Frequency</label>
              <select value={form.payFrequency} onChange={(e) => update("payFrequency", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Monthly</option><option>Bi-weekly</option><option>Weekly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Allowances (USD)</label>
              <input type="number" value={form.allowances} onChange={(e) => update("allowances", e.target.value)} placeholder="500"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Bank Name</label>
              <input value={form.bankName} onChange={(e) => update("bankName", e.target.value)} placeholder="Chase Bank"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Account Number</label>
              <input value={form.accountNumber} onChange={(e) => update("accountNumber", e.target.value)} placeholder="****1234"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-2">Upload Documents</h2>
            {["National ID / Passport", "Employment Contract", "Educational Certificates", "Profile Photo"].map((doc) => (
              <div key={doc} className="flex items-center justify-between p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-slate-700">{doc}</p>
                  <p className="text-xs text-slate-400 mt-0.5">PDF, JPG, PNG up to 5MB</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
                  Upload
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              submitted ? "bg-emerald-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {submitted ? <><Check className="w-4 h-4" /> Employee Added!</> : <><UserPlus className="w-4 h-4" /> Add Employee</>}
          </button>
        )}
      </div>
    </div>
  );
}
