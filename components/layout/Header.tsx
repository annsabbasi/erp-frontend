"use client";

import { useState } from "react";
import { Menu, Bell, Search, ChevronDown, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";

interface HeaderProps {
  onMenuClick: () => void;
  role: string;
  roleLabel: string;
}

const notifications = [
  { id: 1, title: "New employee added",        desc: "Sarah Johnson was added to Engineering",  time: "2 min ago",  read: false, dot: "bg-indigo-500" },
  { id: 2, title: "Payroll processing complete", desc: "February payroll has been processed",    time: "1 hr ago",   read: false, dot: "bg-emerald-500" },
  { id: 3, title: "Budget approval pending",    desc: "3 budgets awaiting your approval",        time: "3 hrs ago",  read: true,  dot: "bg-amber-500" },
  { id: 4, title: "Backup completed",           desc: "System backup ran successfully",          time: "Yesterday",  read: true,  dot: "bg-slate-300" },
];

const avatarColors: Record<string, string> = {
  admin:            "bg-violet-600",
  hr:               "bg-emerald-600",
  accountant:       "bg-blue-600",
  "finance-officer":"bg-indigo-600",
  "revenue-manager":"bg-amber-600",
};

export default function Header({ onMenuClick, role, roleLabel }: HeaderProps) {
  const pathname = usePathname();
  const [showNotif,  setShowNotif]  = useState(false);
  const [showUser,   setShowUser]   = useState(false);
  const { user, logout } = useAuth();

  const unread = notifications.filter((n) => !n.read).length;

  const crumbs = pathname.split("/").filter(Boolean).map((seg, i, arr) => ({
    label: seg.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" "),
    href:  "/" + arr.slice(0, i + 1).join("/"),
    last:  i === arr.length - 1,
  }));

  const avColor  = avatarColors[role] ?? "bg-indigo-600";
  const userName = user ? `${user.firstName} ${user.lastName}` : roleLabel;
  const avInit   = getInitials(userName);
  const userEmail = user?.email ?? `${role}@financeerp.com`;

  const closeAll = () => { setShowNotif(false); setShowUser(false); };

  return (
    <>
      {(showNotif || showUser) && (
        <div className="fixed inset-0 z-20" onClick={closeAll} />
      )}

      <header className="fixed top-0 left-0 right-0 lg:left-64 h-16 bg-white border-b border-slate-200 z-30 flex items-center px-5 gap-4 shadow-sm">

        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm flex-1 min-w-0">
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1 shrink-0">
              {i > 0 && <span className="text-slate-300 mx-0.5 select-none">/</span>}
              {c.last
                ? <span className="font-semibold text-slate-800">{c.label}</span>
                : <Link href={c.href} className="text-slate-400 hover:text-slate-600 transition-colors">{c.label}</Link>
              }
            </span>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5 shrink-0">

          {/* Search */}
          <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all text-xs w-40">
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-mono">⌘K</kbd>
          </button>

          {/* Notifications */}
          <div className="relative z-30">
            <button
              onClick={() => { setShowNotif(!showNotif); setShowUser(false); }}
              className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none px-0.5">
                  {unread}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-80 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                  <p className="text-sm font-bold text-slate-800">Notifications</p>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{unread} new</span>
                </div>
                <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={cn("flex gap-3 px-5 py-3.5 cursor-pointer hover:bg-slate-50 transition-colors", !n.read && "bg-indigo-50/40")}>
                      <span className={cn("w-2 h-2 rounded-full shrink-0 mt-1.5", n.dot)} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 leading-snug">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-100">
                  <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                    View all →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative z-30">
            <button
              onClick={() => { setShowUser(!showUser); setShowNotif(false); }}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0", avColor)}>
                {avInit}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-800 leading-none">{userName}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{roleLabel}</p>
              </div>
              <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-200", showUser && "rotate-180")} />
            </button>

            {showUser && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
                <div className="px-4 py-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0", avColor)}>
                      {avInit}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                      <p className="text-xs text-slate-400 truncate">{userEmail}</p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                    <User className="w-4 h-4 text-slate-400" /> Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                    <Settings className="w-4 h-4 text-slate-400" /> Settings
                  </button>
                </div>
                <div className="border-t border-slate-100 py-1">
                  <button
                    onClick={() => { closeAll(); logout(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
