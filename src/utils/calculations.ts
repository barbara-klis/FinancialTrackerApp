import type { Transaction } from '../types/transaction';

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions: Transaction[]): number {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

/** Total expenses whose `date` falls in the given "YYYY-MM" month. */
export function getExpensesForMonth(transactions: Transaction[], month: string): number {
  return transactions
    .filter((t) => t.type === 'expense' && t.date.startsWith(month))
    .reduce((sum, t) => sum + t.amount, 0);
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export function getExpensesByCategory(transactions: Transaction[]): CategoryTotal[] {
  const totals = new Map<string, number>();

  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount);
  }

  return Array.from(totals.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}
