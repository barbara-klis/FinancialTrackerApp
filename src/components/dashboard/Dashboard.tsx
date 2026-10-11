import { useState } from 'react';
import type { Transaction } from '../../types/transaction';
import {
  getBalance,
  getExpensesByCategory,
  getExpensesForMonth,
  getTotalExpenses,
  getTotalIncome,
} from '../../utils/calculations';
import { currentMonth } from '../../utils/format';
import { BudgetProgress } from './BudgetProgress';
import { CategoryChart } from './CategoryChart';
import { SummaryCards } from './SummaryCards';

interface DashboardProps {
  transactions: Transaction[];
  getBudget: (month: string) => number | undefined;
  setBudget: (month: string, amount: number) => void;
  clearBudget: (month: string) => void;
}

export function Dashboard({ transactions, getBudget, setBudget, clearBudget }: DashboardProps) {
  const [month, setMonth] = useState(currentMonth());

  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const balance = getBalance(transactions);
  const expensesByCategory = getExpensesByCategory(transactions);
  const spentThisMonth = getExpensesForMonth(transactions, month);

  return (
    <div className="dashboard">
      <SummaryCards totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />
      <BudgetProgress
        month={month}
        budget={getBudget(month)}
        spent={spentThisMonth}
        onChangeMonth={setMonth}
        onSetBudget={(amount) => setBudget(month, amount)}
        onClearBudget={() => clearBudget(month)}
      />
      <CategoryChart data={expensesByCategory} />
    </div>
  );
}
