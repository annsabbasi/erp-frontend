"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { roleConfig } from "@/lib/constants";
import { useAuth } from "@/lib/context/auth-context";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const config    = roleConfig[role] ?? { nav: [], label: role };
  const navigation = config.nav;
  const roleLabel  = config.label;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) return <LoadingSpinner fullPage message="Loading…" />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        navigation={navigation}
        role={role}
        roleLabel={roleLabel}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        role={role}
        roleLabel={roleLabel}
      />
      {/* pt-16 = header height, lg:ml-64 = sidebar width */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
