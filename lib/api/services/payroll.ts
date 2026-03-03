import api from '../client';
import type { PayrollRun, Payslip, DeductionConfig, CreatePayrollRunDto, CreateDeductionDto, PaginatedData } from '../types';

export const payrollService = {
  getRuns: () =>
    api.get<PaginatedData<PayrollRun>>('/payroll/runs').then((r) => r.data),

  getRunById: (id: string) =>
    api.get<PayrollRun>(`/payroll/runs/${id}`).then((r) => r.data),

  createRun: (dto: CreatePayrollRunDto) =>
    api.post<PayrollRun>('/payroll/runs', dto).then((r) => r.data),

  generatePayslips: (id: string) =>
    api.post<Payslip[]>(`/payroll/runs/${id}/generate`).then((r) => r.data),

  submitRun: (id: string) =>
    api.patch<PayrollRun>(`/payroll/runs/${id}/submit`).then((r) => r.data),

  approveRun: (id: string) =>
    api.patch<PayrollRun>(`/payroll/runs/${id}/approve`).then((r) => r.data),

  markAsPaid: (id: string) =>
    api.patch<PayrollRun>(`/payroll/runs/${id}/pay`).then((r) => r.data),

  getDeductions: () =>
    api.get<DeductionConfig[]>('/payroll/deductions').then((r) => r.data),

  createDeduction: (dto: CreateDeductionDto) =>
    api.post<DeductionConfig>('/payroll/deductions', dto).then((r) => r.data),

  getPayslip: (id: string) =>
    api.get<Payslip>(`/payroll/payslips/${id}`).then((r) => r.data),

  getEmployeePayslips: (employeeId: string) =>
    api.get<Payslip[]>(`/payroll/employee/${employeeId}/payslips`).then((r) => r.data),
};
