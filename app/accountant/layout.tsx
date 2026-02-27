import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = { title: { template: "%s | Accountant | FinanceERP", default: "Accountant Dashboard" } };

export default function AccountantLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="accountant">
      {children}
    </DashboardLayout>
  );
}
