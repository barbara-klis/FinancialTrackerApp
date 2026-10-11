import { formatCurrency } from '../../utils/format';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export function SummaryCards({ totalIncome, totalExpenses, balance }: SummaryCardsProps) {
  return (
    <div className="summary-cards">
      <div className="summary-card summary-card--income">
        <span className="summary-card__label">Total Income</span>
        <span className="summary-card__value">{formatCurrency(totalIncome)}</span>
      </div>
      <div className="summary-card summary-card--expense">
        <span className="summary-card__label">Total Expenses</span>
        <span className="summary-card__value">{formatCurrency(totalExpenses)}</span>
      </div>
      <div
        className={
          balance >= 0
            ? 'summary-card summary-card--balance-positive'
            : 'summary-card summary-card--balance-negative'
        }
      >
        <span className="summary-card__label">Balance</span>
        <span className="summary-card__value">{formatCurrency(balance)}</span>
      </div>
    </div>
  );
}
