import {
  LayoutDashboard,
  Users,
  BarChart3,
  Activity,
  Megaphone,
  Building2,
  UserCog,
  UserPlus,
  FileText,
  Clock,
  Calendar,
  DollarSign,
  Layers,
  PieChart,
  CreditCard,
  AlertCircle,
  BookOpen,
  Landmark,
  TrendingUp,
  TrendingDown,
  Target,
  ShoppingCart,
  RefreshCw,
  Sliders,
  Tag,
  Award,
  Receipt,
  Wallet,
  FileBarChart,
  GitBranch,
  Settings,
  ChevronDown,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
};

export const adminNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "System Stats",
    href: "/admin/system-stats",
    icon: BarChart3,
  },
  {
    label: "Activity Logs",
    href: "/admin/activity-logs",
    icon: Activity,
  },
  {
    label: "Announcements",
    href: "/admin/announcements",
    icon: Megaphone,
  },
  {
    label: "Manage Users",
    href: "/admin/manage-users",
    icon: Users,
  },
  {
    label: "Departments",
    href: "/admin/department-management",
    icon: Building2,
    children: [
      {
        label: "Assign Heads",
        href: "/admin/department-management/assign-heads",
        icon: UserCog,
      },
    ],
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export const hrNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/hr",
    icon: LayoutDashboard,
  },
  {
    label: "Employees",
    href: "/hr/employees",
    icon: Users,
    children: [
      { label: "Add Employee", href: "/hr/employees/add", icon: UserPlus },
      { label: "Manage Employees", href: "/hr/employees/manage", icon: UserCog },
      { label: "Documents", href: "/hr/employees/documents", icon: FileText },
    ],
  },
  {
    label: "Attendance",
    href: "/hr/attendance",
    icon: Clock,
  },
  {
    label: "Leave Management",
    href: "/hr/leave",
    icon: Calendar,
  },
  {
    label: "Payroll",
    href: "/hr/payroll",
    icon: DollarSign,
    children: [
      { label: "Salary Structure", href: "/hr/payroll/salary-structure", icon: Layers },
      { label: "Generate Payroll", href: "/hr/payroll/generate", icon: RefreshCw },
      { label: "Payslips", href: "/hr/payroll/payslips", icon: FileText },
      { label: "Deductions & Bonuses", href: "/hr/payroll/deductions-bonuses", icon: Sliders },
    ],
  },
  {
    label: "Announcements",
    href: "/hr/announcements",
    icon: Megaphone,
  },
];

export const accountantNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/accountant",
    icon: LayoutDashboard,
  },
  {
    label: "Financial Summary",
    href: "/accountant/financial-summary",
    icon: PieChart,
  },
  {
    label: "Pending Payments",
    href: "/accountant/pending-payments",
    icon: CreditCard,
  },
  {
    label: "Alerts",
    href: "/accountant/alerts",
    icon: AlertCircle,
  },
  {
    label: "Chart of Accounts",
    href: "/accountant/accounts",
    icon: BookOpen,
    children: [
      { label: "Assets", href: "/accountant/accounts/assets", icon: Landmark },
      { label: "Revenue", href: "/accountant/accounts/revenue", icon: TrendingUp },
      { label: "Expenses", href: "/accountant/accounts/expenses", icon: TrendingDown },
    ],
  },
  {
    label: "Transactions",
    href: "/accountant/transactions",
    icon: Receipt,
  },
  {
    label: "Bank Reconciliation",
    href: "/accountant/bank-reconciliation",
    icon: GitBranch,
  },
];

export const financeOfficerNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/finance-officer",
    icon: LayoutDashboard,
  },
  {
    label: "Revenue Summary",
    href: "/finance-officer/revenue-summary",
    icon: TrendingUp,
  },
  {
    label: "Expense Summary",
    href: "/finance-officer/expense-summary",
    icon: TrendingDown,
  },
  {
    label: "Budget Status",
    href: "/finance-officer/budget-status",
    icon: Target,
  },
  {
    label: "Alerts",
    href: "/finance-officer/alerts",
    icon: AlertCircle,
  },
  {
    label: "Budget Management",
    href: "/finance-officer/budget-management",
    icon: Wallet,
    children: [
      { label: "Create Budget", href: "/finance-officer/budget-management/create", icon: FileText },
      { label: "Approve Budget", href: "/finance-officer/budget-management/approve", icon: Award },
      { label: "Variance Analysis", href: "/finance-officer/budget-management/variance-analysis", icon: BarChart3 },
    ],
  },
  {
    label: "Financial Reports",
    href: "/finance-officer/reports",
    icon: FileBarChart,
  },
];

export const revenueManagerNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/revenue-manager",
    icon: LayoutDashboard,
  },
  {
    label: "Revenue Tracking",
    href: "/revenue-manager/revenue-tracking",
    icon: TrendingUp,
    children: [
      { label: "Income Sources", href: "/revenue-manager/revenue-tracking/income-sources", icon: DollarSign },
      { label: "Sales Reports", href: "/revenue-manager/revenue-tracking/sales-reports", icon: FileBarChart },
      { label: "Recurring Income", href: "/revenue-manager/revenue-tracking/recurring-income", icon: RefreshCw },
      { label: "Adjustments", href: "/revenue-manager/revenue-tracking/adjustments", icon: Sliders },
    ],
  },
  {
    label: "Pricing Management",
    href: "/revenue-manager/pricing-management",
    icon: Tag,
    children: [
      { label: "Pricing Models", href: "/revenue-manager/pricing-management/pricing-models", icon: Layers },
      { label: "Discounts", href: "/revenue-manager/pricing-management/discount-management", icon: Tag },
      { label: "Commissions", href: "/revenue-manager/pricing-management/commission-structure", icon: Award },
    ],
  },
  {
    label: "Invoicing",
    href: "/revenue-manager/invoicing",
    icon: Receipt,
  },
  {
    label: "Receivables",
    href: "/revenue-manager/receivables",
    icon: CreditCard,
  },
];

export const roleConfig: Record<string, { nav: NavItem[]; label: string; color: string }> = {
  admin: { nav: adminNav, label: "Administrator", color: "indigo" },
  hr: { nav: hrNav, label: "Human Resources", color: "emerald" },
  accountant: { nav: accountantNav, label: "Accountant", color: "blue" },
  "finance-officer": { nav: financeOfficerNav, label: "Finance Officer", color: "violet" },
  "revenue-manager": { nav: revenueManagerNav, label: "Revenue Manager", color: "amber" },
};
