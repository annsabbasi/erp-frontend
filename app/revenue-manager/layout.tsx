import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = { title: { template: "%s | Revenue Manager | FinanceERP", default: "Revenue Manager Dashboard" } };

export default function RevenueManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="revenue-manager">
      {children}
    </DashboardLayout>
  );
}
