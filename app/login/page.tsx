"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Eye, EyeOff, Shield, BarChart3, Users, DollarSign, ChevronRight } from "lucide-react";

const roles = [
  { value: "admin", label: "Administrator", icon: Shield, description: "System & user management", redirect: "/admin", color: "bg-violet-500" },
  { value: "hr", label: "Human Resources", icon: Users, description: "People & payroll", redirect: "/hr", color: "bg-emerald-500" },
  { value: "accountant", label: "Accountant", icon: BarChart3, description: "Ledger & transactions", redirect: "/accountant", color: "bg-blue-500" },
  { value: "finance-officer", label: "Finance Officer", icon: TrendingUp, description: "Budget & reporting", redirect: "/finance-officer", color: "bg-indigo-500" },
  { value: "revenue-manager", label: "Revenue Manager", icon: DollarSign, description: "Sales & invoicing", redirect: "/revenue-manager", color: "bg-amber-500" },
];

const stats = [
  { value: "500+", label: "Employees" },
  { value: "12", label: "Modules" },
  { value: "99.9%", label: "Uptime" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const selected = roles.find((r) => r.value === role);
    router.push(selected?.redirect ?? "/admin");
  }

  const selectedRole = roles.find((r) => r.value === role)!;

  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col w-[460px] shrink-0 bg-slate-900 relative overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] bg-indigo-600 rounded-full opacity-20 blur-[80px]" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[280px] h-[280px] bg-violet-600 rounded-full opacity-15 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-indigo-500 rounded-full opacity-10 blur-[60px]" />
        </div>

        {/* Dot grid decoration */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col h-full p-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none tracking-tight">FinanceERP</p>
              <p className="text-indigo-400 text-xs mt-0.5 font-medium">Enterprise Resource Planning</p>
            </div>
          </div>

          {/* Main copy */}
          <div className="mt-auto">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Complete ERP Platform</p>
            <h2 className="text-4xl font-bold text-white leading-[1.2] mb-5">
              Centralize Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Financial Operations
              </span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
              One unified platform for finance management, HR, payroll, CRM, and intelligent reporting.
            </p>

            {/* Feature list */}
            <div className="space-y-3 mb-10">
              {[
                { icon: BarChart3, text: "Real-time financial analytics & dashboards" },
                { icon: Users, text: "Complete workforce & payroll management" },
                { icon: DollarSign, text: "Automated invoicing & revenue tracking" },
                { icon: Shield, text: "Role-based access control & audit logs" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-slate-300 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-8 border-t border-slate-800">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[440px]">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-900 font-bold text-lg">FinanceERP</p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-slate-900 leading-tight">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1.5">Select your role and sign in to continue</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Select Role</p>
            <div className="grid grid-cols-1 gap-2">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = role === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50/70"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`w-8 h-8 ${r.color} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold leading-none ${isSelected ? "text-indigo-700" : "text-slate-800"}`}>{r.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{r.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            {error && (
              <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Password</label>
                  <button type="button" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ paddingRight: "2.75rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full mt-2" style={{ marginTop: "1.25rem" }}>
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in as {selectedRole.label}
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Protected by enterprise-grade security · © 2026 FinanceERP
          </p>
        </div>
      </div>
    </div>
  );
}
