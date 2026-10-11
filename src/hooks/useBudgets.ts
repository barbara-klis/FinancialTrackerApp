import { useEffect, useState } from 'react';
import { loadBudgets, saveBudgets } from '../utils/storage';

/** Monthly budget limits keyed by month ("YYYY-MM") -> amount. */
export function useBudgets() {
  const [budgets, setBudgets] = useState<Record<string, number>>(() => loadBudgets());

  useEffect(() => {
    saveBudgets(budgets);
  }, [budgets]);

  function getBudget(month: string): number | undefined {
    return budgets[month];
  }

  function setBudget(month: string, amount: number) {
    setBudgets((prev) => ({ ...prev, [month]: amount }));
  }

  function clearBudget(month: string) {
    setBudgets((prev) => {
      const next = { ...prev };
      delete next[month];
      return next;
    });
  }

  return { budgets, getBudget, setBudget, clearBudget };
}
