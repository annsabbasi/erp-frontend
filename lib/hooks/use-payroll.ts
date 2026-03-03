import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/keys';
import { payrollService } from '@/lib/api/services/payroll';
import type { CreatePayrollRunDto, CreateDeductionDto } from '@/lib/api/types';

export function usePayrollRuns() {
  return useQuery({
    queryKey: queryKeys.payroll.runs(),
    queryFn: () => payrollService.getRuns(),
  });
}

export function usePayrollRun(id: string) {
  return useQuery({
    queryKey: queryKeys.payroll.run(id),
    queryFn: () => payrollService.getRunById(id),
    enabled: !!id,
  });
}

export function useDeductions() {
  return useQuery({
    queryKey: queryKeys.payroll.deductions(),
    queryFn: () => payrollService.getDeductions(),
  });
}

export function usePayslip(id: string) {
  return useQuery({
    queryKey: queryKeys.payroll.payslip(id),
    queryFn: () => payrollService.getPayslip(id),
    enabled: !!id,
  });
}

export function useEmployeePayslips(employeeId: string) {
  return useQuery({
    queryKey: queryKeys.payroll.employeePayslips(employeeId),
    queryFn: () => payrollService.getEmployeePayslips(employeeId),
    enabled: !!employeeId,
  });
}

export function useCreatePayrollRun() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePayrollRunDto) => payrollService.createRun(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.payroll.runs() }),
  });
}

export function useGeneratePayslips() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => payrollService.generatePayslips(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.payroll.all }),
  });
}

export function useApprovePayroll() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => payrollService.approveRun(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.payroll.all }),
  });
}

export function useCreateDeduction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDeductionDto) => payrollService.createDeduction(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.payroll.deductions() }),
  });
}
