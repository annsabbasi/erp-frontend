"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { roleConfig } from "@/lib/constants";
import { useAuth } from "@/lib/hooks/use-auth";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const config     = roleConfig[role] ?? { nav: [], label: role };
  const navigation = config.nav;
  const roleLabel  = config.label;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  // Safety-net: if Zustand has finished hydrating but there's no user,
  // the proxy should have already redirected server-side. Drive the client
  // redirect here as a fallback so the user never sees a blank page.
  useEffect(() => {
    if (isHydrated && !user) {
      router.replace('/login');
    }
  }, [isHydrated, user, router]);

  // Still waiting for Zustand to read from localStorage
  if (!isHydrated) return <LoadingSpinner fullPage message="Loading…" />;
  // Authenticated — either content or null while the effect redirect fires
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
