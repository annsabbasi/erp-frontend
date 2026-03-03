import api from '../client';
import type { BankAccount, BankStatement, CreateBankAccountDto } from '../types';

export const bankReconciliationService = {
  getBankAccounts: () =>
    api.get<BankAccount[]>('/bank/accounts').then((r) => r.data),

  createBankAccount: (dto: CreateBankAccountDto) =>
    api.post<BankAccount>('/bank/accounts', dto).then((r) => r.data),

  getStatements: (bankAccountId: string) =>
    api.get<BankStatement[]>(`/bank/accounts/${bankAccountId}/statements`).then((r) => r.data),

  uploadStatement: (dto: {
    bankAccountId: string;
    statementDate: string;
    openingBalance: number;
    closingBalance: number;
    lines: Array<{
      date: string;
      description: string;
      reference?: string;
      debitAmount: number;
      creditAmount: number;
      balance: number;
    }>;
  }) =>
    api.post<BankStatement>('/bank/statements', dto).then((r) => r.data),

  getStatementById: (id: string) =>
    api.get<BankStatement>(`/bank/statements/${id}`).then((r) => r.data),

  startReconciliation: (statementId: string) =>
    api.post<unknown>(`/bank/statements/${statementId}/reconcile/start`).then((r) => r.data),

  matchTransaction: (reconciliationId: string, dto: { bankStatementLineId: string; journalEntryLineId: string }) =>
    api.post<unknown>(`/bank/reconciliations/${reconciliationId}/match`, dto).then((r) => r.data),

  autoMatch: (reconciliationId: string) =>
    api.post<unknown>(`/bank/reconciliations/${reconciliationId}/auto-match`).then((r) => r.data),

  completeReconciliation: (reconciliationId: string) =>
    api.patch<unknown>(`/bank/reconciliations/${reconciliationId}/complete`).then((r) => r.data),
};
