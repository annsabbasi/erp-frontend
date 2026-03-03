// API Response Envelope
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

// Pagination
export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedData<T> {
  data: T[];
  meta: PaginatedMeta;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Enums
export type Role = 'ADMIN' | 'HR' | 'ACCOUNTANT' | 'FINANCE_OFFICER' | 'REVENUE_MANAGER';
export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'TERMINATED';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type PayrollRunStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'PAID' | 'CANCELLED';
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export type ReceivableStatus = 'CURRENT' | 'OVERDUE' | 'WRITTEN_OFF';
export type BudgetStatus = 'DRAFT' | 'SUBMITTED' | 'ACTIVE' | 'REJECTED';
export type JournalEntryType = 'GENERAL' | 'INVOICING' | 'PAYROLL' | 'MANUAL';
export type JournalEntryStatus = 'DRAFT' | 'POSTED' | 'REVERSED' | 'VOIDED';
export type AccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
export type AccountCategory =
  | 'CURRENT_ASSET'
  | 'FIXED_ASSET'
  | 'CURRENT_LIABILITY'
  | 'LONG_TERM_LIABILITY'
  | 'EQUITY'
  | 'INCOME'
  | 'OPERATING_EXPENSE'
  | 'INTEREST_EXPENSE'
  | 'TAX_EXPENSE';
export type NormalBalance = 'DEBIT' | 'CREDIT';
export type PaymentMethod = 'CASH' | 'BANK_TRANSFER' | 'CHEQUE' | 'CARD' | 'OTHER';
export type AdjustmentReason = 'CREDIT_NOTE' | 'WRITE_OFF' | 'DISCOUNT_ADJUSTMENT' | 'VOLUME_REBATE' | 'OTHER';
export type RecurringFrequency = 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUALLY' | 'ANNUALLY';
export type CommissionType = 'FLAT' | 'PER_UNIT' | 'TIERED';
export type DiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';
export type BudgetPeriodType = 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUAL' | 'ANNUAL';
export type AnnouncementAudience = 'ALL' | 'ADMIN' | 'HR' | 'ACCOUNTANT' | 'FINANCE_OFFICER' | 'REVENUE_MANAGER';

// Auth
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

// Users
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  usersByRole: Record<string, number>;
  recentLogins: number;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  phone?: string;
  avatar?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  isActive?: boolean;
}

// Departments
export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  headId?: string;
  parentId?: string;
  isActive: boolean;
  head?: User;
  parent?: Department;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepartmentDto {
  name: string;
  code: string;
  description?: string;
  headId?: string;
  parentId?: string;
}

// Employees
export interface Employee {
  id: string;
  employeeCode: string;
  departmentId: string;
  positionId: string;
  gradeId?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  nationalId?: string;
  taxId?: string;
  bankAccount?: string;
  bankName?: string;
  joinDate: string;
  terminationDate?: string;
  status: EmployeeStatus;
  emergencyContact?: string;
  emergencyPhone?: string;
  department?: Department;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeStats {
  total: number;
  active: number;
  onLeave: number;
  terminated: number;
  byDepartment: Record<string, number>;
}

export interface SalaryGrade {
  id: string;
  code: string;
  name: string;
  minSalary: number;
  maxSalary: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeDto {
  employeeCode: string;
  departmentId: string;
  positionId: string;
  gradeId?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  nationalId?: string;
  taxId?: string;
  bankAccount?: string;
  bankName?: string;
  joinDate: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

// Attendance
export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  note?: string;
  employee?: Employee;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceSummary {
  date: string;
  total: number;
  present: number;
  absent: number;
  late: number;
  halfDay: number;
}

export interface CreateAttendanceDto {
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status?: AttendanceStatus;
  note?: string;
}

// Leave
export interface LeaveType {
  id: string;
  name: string;
  daysAllowed: number;
  isPaid: boolean;
  carryForward: boolean;
  maxCarryDays?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  rejectionNote?: string;
  employee?: Employee;
  leaveType?: LeaveType;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveBalance {
  leaveTypeId: string;
  leaveType?: LeaveType;
  allocated: number;
  used: number;
  remaining: number;
}

export interface CreateLeaveRequestDto {
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
}

export interface UpdateLeaveStatusDto {
  status: 'APPROVED' | 'REJECTED';
  rejectionNote?: string;
}

// Payroll
export interface DeductionConfig {
  id: string;
  name: string;
  type: 'EARNING' | 'DEDUCTION';
  isPercentage: boolean;
  value: number;
  appliesTo?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollRun {
  id: string;
  year: number;
  month: number;
  status: PayrollRunStatus;
  notes?: string;
  totalGross?: number;
  totalNet?: number;
  totalDeductions?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payslip {
  id: string;
  payrollRunId: string;
  employeeId: string;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  details?: Record<string, number>;
  employee?: Employee;
  payrollRun?: PayrollRun;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePayrollRunDto {
  year: number;
  month: number;
  notes?: string;
}

export interface CreateDeductionDto {
  name: string;
  type: 'EARNING' | 'DEDUCTION';
  isPercentage: boolean;
  value: number;
  appliesTo?: string;
  description?: string;
}

// Accounts (Chart of Accounts)
export interface Account {
  id: string;
  code: string;
  name: string;
  description?: string;
  type: AccountType;
  category: AccountCategory;
  normalBalance: NormalBalance;
  parentId?: string;
  isControl: boolean;
  allowDirectPosting: boolean;
  isActive: boolean;
  balance?: number;
  parent?: Account;
  createdAt: string;
  updatedAt: string;
}

export interface TrialBalance {
  accounts: Array<{
    id: string;
    code: string;
    name: string;
    type: AccountType;
    debit: number;
    credit: number;
    balance: number;
  }>;
  totalDebits: number;
  totalCredits: number;
}

export interface CreateAccountDto {
  code: string;
  name: string;
  description?: string;
  type: AccountType;
  category: AccountCategory;
  normalBalance: NormalBalance;
  parentId?: string;
  isControl?: boolean;
  allowDirectPosting?: boolean;
}

// Journal Entries
export interface FiscalYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntryLine {
  id: string;
  accountId: string;
  description?: string;
  debitAmount: number;
  creditAmount: number;
  reference?: string;
  costCenter?: string;
  account?: Account;
}

export interface JournalEntry {
  id: string;
  fiscalYearId: string;
  date: string;
  type: JournalEntryType;
  status: JournalEntryStatus;
  description: string;
  reference?: string;
  sourceModule?: string;
  sourceId?: string;
  notes?: string;
  lines: JournalEntryLine[];
  totalDebit?: number;
  totalCredit?: number;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJournalEntryDto {
  fiscalYearId: string;
  date: string;
  type?: JournalEntryType;
  description: string;
  reference?: string;
  sourceModule?: string;
  sourceId?: string;
  notes?: string;
  lines: Array<{
    accountId: string;
    description?: string;
    debitAmount: number;
    creditAmount: number;
    reference?: string;
    costCenter?: string;
  }>;
}

// Bank Reconciliation
export interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  bankCode?: string;
  currency: string;
  glAccountId: string;
  openingBalance: number;
  currentBalance?: number;
  isActive: boolean;
  glAccount?: Account;
  createdAt: string;
  updatedAt: string;
}

export interface BankStatementLine {
  id: string;
  statementId: string;
  date: string;
  description: string;
  reference?: string;
  debitAmount: number;
  creditAmount: number;
  balance: number;
  isMatched: boolean;
  journalEntryLineId?: string;
}

export interface BankStatement {
  id: string;
  bankAccountId: string;
  statementDate: string;
  openingBalance: number;
  closingBalance: number;
  isReconciled: boolean;
  lines: BankStatementLine[];
  bankAccount?: BankAccount;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBankAccountDto {
  name: string;
  accountNumber: string;
  bankName: string;
  bankCode?: string;
  currency?: string;
  glAccountId: string;
  openingBalance?: number;
}

// Budgets
export interface BudgetLine {
  id: string;
  budgetId: string;
  accountId: string;
  description?: string;
  budgetedAmount: number;
  actualAmount?: number;
  variance?: number;
  variancePercent?: number;
  notes?: string;
  account?: Account;
}

export interface Budget {
  id: string;
  name: string;
  fiscalYearId: string;
  departmentId: string;
  periodType: BudgetPeriodType;
  periodLabel: string;
  startDate: string;
  endDate: string;
  status: BudgetStatus;
  notes?: string;
  totalBudgeted?: number;
  totalActual?: number;
  lines: BudgetLine[];
  department?: Department;
  fiscalYear?: FiscalYear;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetVarianceAnalysis {
  budgetId: string;
  budgetName: string;
  totalBudgeted: number;
  totalActual: number;
  totalVariance: number;
  variancePercent: number;
  lines: BudgetLine[];
}

export interface CreateBudgetDto {
  name: string;
  fiscalYearId: string;
  departmentId: string;
  periodType: BudgetPeriodType;
  periodLabel: string;
  startDate: string;
  endDate: string;
  notes?: string;
  lines: Array<{
    accountId: string;
    description?: string;
    budgetedAmount: number;
    notes?: string;
  }>;
}

export interface ApproveBudgetDto {
  action: 'ACTIVE' | 'REJECTED';
  rejectionNote?: string;
}

// Clients
export interface Client {
  id: string;
  code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  taxId?: string;
  contactPerson?: string;
  creditLimit?: number;
  paymentTerms: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientDto {
  code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  taxId?: string;
  contactPerson?: string;
  creditLimit?: number;
  paymentTerms?: number;
}

// Invoicing
export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number;
  subtotal: number;
  taxAmount?: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  currency: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  notes?: string;
  terms?: string;
  items: InvoiceItem[];
  client?: Client;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceStats {
  total: number;
  draft: number;
  sent: number;
  paid: number;
  overdue: number;
  totalRevenue: number;
  outstanding: number;
  overdueAmount: number;
}

export interface CreateInvoiceDto {
  clientId: string;
  issueDate: string;
  dueDate: string;
  currency?: string;
  discountAmount?: number;
  notes?: string;
  terms?: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate?: number;
  }>;
}

export interface RecordPaymentDto {
  amount: number;
  method: PaymentMethod;
  reference?: string;
  paidAt: string;
  notes?: string;
  glCashAccountId?: string;
}

// Receivables
export interface Receivable {
  id: string;
  invoiceId: string;
  clientId: string;
  originalAmount: number;
  paidAmount: number;
  balanceDue: number;
  dueDate: string;
  status: ReceivableStatus;
  daysOverdue?: number;
  lastReminderAt?: string;
  invoice?: Invoice;
  client?: Client;
  createdAt: string;
  updatedAt: string;
}

export interface AgingBucket {
  label: string;
  minDays: number;
  maxDays?: number;
  count: number;
  total: number;
}

export interface AgingReport {
  asOfDate: string;
  totalOutstanding: number;
  buckets: AgingBucket[];
  byClient: Array<{
    clientId: string;
    clientName: string;
    buckets: Record<string, number>;
    total: number;
  }>;
}

// Revenue
export interface IncomeSource {
  id: string;
  name: string;
  code: string;
  description?: string;
  glAccountId?: string;
  isActive: boolean;
  glAccount?: Account;
  createdAt: string;
  updatedAt: string;
}

export interface RevenueEntry {
  id: string;
  incomeSourceId: string;
  date: string;
  amount: number;
  description?: string;
  reference?: string;
  invoiceId?: string;
  incomeSource?: IncomeSource;
  createdAt: string;
  updatedAt: string;
}

export interface RevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  bySource: Record<string, number>;
  growth: number;
  monthlyTrend: Array<{ month: string; amount: number }>;
}

export interface RecurringIncome {
  id: string;
  name: string;
  clientId?: string;
  incomeSourceId: string;
  amount: number;
  frequency: RecurringFrequency;
  startDate: string;
  endDate?: string;
  nextBillingDate: string;
  description?: string;
  isActive: boolean;
  client?: Client;
  incomeSource?: IncomeSource;
  createdAt: string;
  updatedAt: string;
}

export interface RevenueAdjustment {
  id: string;
  date: string;
  type: AdjustmentReason;
  amount: number;
  description: string;
  reference?: string;
  invoiceId?: string;
  clientId?: string;
  client?: Client;
  invoice?: Invoice;
  createdAt: string;
  updatedAt: string;
}

export interface AdjustmentSummary {
  totalAdjustments: number;
  byType: Record<string, number>;
  netImpact: number;
}

export interface CreateIncomeSourceDto {
  name: string;
  code: string;
  description?: string;
  glAccountId?: string;
}

export interface CreateRevenueEntryDto {
  incomeSourceId: string;
  date: string;
  amount: number;
  description?: string;
  reference?: string;
  invoiceId?: string;
}

export interface CreateRecurringIncomeDto {
  name: string;
  clientId?: string;
  incomeSourceId: string;
  amount: number;
  frequency: RecurringFrequency;
  startDate: string;
  endDate?: string;
  nextBillingDate: string;
  description?: string;
}

export interface CreateRevenueAdjustmentDto {
  date: string;
  type: AdjustmentReason;
  amount: number;
  description: string;
  reference?: string;
  invoiceId?: string;
  clientId?: string;
}

// Pricing
export interface PricingTier {
  id: string;
  modelId: string;
  name: string;
  minQuantity: number;
  maxQuantity?: number;
  unitPrice: number;
}

export interface PricingModel {
  id: string;
  name: string;
  code: string;
  description?: string;
  basePrice: number;
  currency: string;
  isActive: boolean;
  tiers: PricingTier[];
  createdAt: string;
  updatedAt: string;
}

export interface Discount {
  id: string;
  code: string;
  name: string;
  type: DiscountType;
  value: number;
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
  startDate?: string;
  endDate?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommissionTier {
  id: string;
  structureId: string;
  minRevenue: number;
  maxRevenue?: number;
  rate: number;
}

export interface CommissionStructure {
  id: string;
  name: string;
  type: CommissionType;
  baseRate: number;
  currency: string;
  description?: string;
  isActive: boolean;
  tiers: CommissionTier[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePricingModelDto {
  name: string;
  code: string;
  description?: string;
  basePrice: number;
  currency?: string;
  tiers?: Array<{
    name: string;
    minQuantity: number;
    maxQuantity?: number;
    unitPrice: number;
  }>;
}

export interface CreateDiscountDto {
  code: string;
  name: string;
  type: DiscountType;
  value: number;
  minPurchase?: number;
  maxUses?: number;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface CreateCommissionStructureDto {
  name: string;
  type: CommissionType;
  baseRate: number;
  currency?: string;
  description?: string;
  tiers?: Array<{
    minRevenue: number;
    maxRevenue?: number;
    rate: number;
  }>;
}

// Reports
export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  totalAssets: number;
  totalLiabilities: number;
  equity: number;
  cashBalance: number;
  accountsReceivable: number;
  accountsPayable: number;
  revenueGrowth?: number;
  expenseGrowth?: number;
}

export interface IncomeStatementLine {
  accountId: string;
  accountCode: string;
  accountName: string;
  amount: number;
}

export interface IncomeStatement {
  startDate: string;
  endDate: string;
  revenue: IncomeStatementLine[];
  expenses: IncomeStatementLine[];
  totalRevenue: number;
  totalExpenses: number;
  grossProfit: number;
  netIncome: number;
}

export interface BalanceSheetLine {
  accountId: string;
  accountCode: string;
  accountName: string;
  balance: number;
}

export interface BalanceSheet {
  asOfDate: string;
  assets: BalanceSheetLine[];
  liabilities: BalanceSheetLine[];
  equity: BalanceSheetLine[];
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
}

export interface CashFlowLine {
  description: string;
  amount: number;
}

export interface CashFlow {
  startDate: string;
  endDate: string;
  operatingActivities: CashFlowLine[];
  investingActivities: CashFlowLine[];
  financingActivities: CashFlowLine[];
  netOperating: number;
  netInvesting: number;
  netFinancing: number;
  netCashFlow: number;
}

// Announcements
export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: AnnouncementAudience;
  isPinned: boolean;
  expiresAt?: string;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementDto {
  title: string;
  body: string;
  audience?: AnnouncementAudience;
  isPinned?: boolean;
  expiresAt?: string;
}

export interface UpdateAnnouncementDto {
  title?: string;
  body?: string;
  audience?: AnnouncementAudience;
  isPinned?: boolean;
  expiresAt?: string;
}

// Activity Logs
export interface ActivityLog {
  id: string;
  userId: string;
  entity: string;
  entityId?: string;
  action: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  user?: User;
  createdAt: string;
}

export interface ActivityStats {
  totalActions: number;
  byAction: Record<string, number>;
  byEntity: Record<string, number>;
  byUser: Array<{ userId: string; userName: string; count: number }>;
  recentActivity: ActivityLog[];
}
