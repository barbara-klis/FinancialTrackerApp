import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { formatCurrency, formatMonth } from '../../utils/format';

interface BudgetProgressProps {
  month: string;
  budget: number | undefined;
  spent: number;
  onChangeMonth: (month: string) => void;
  onSetBudget: (amount: number) => void;
  onClearBudget: () => void;
}

type Status = 'good' | 'warning' | 'critical';

function statusFor(percent: number): Status {
  if (percent > 100) return 'critical';
  if (percent >= 80) return 'warning';
  return 'good';
}

const STATUS_LABEL: Record<Status, string> = {
  good: 'On track',
  warning: 'Near limit',
  critical: 'Over budget',
};

export function BudgetProgress({
  month,
  budget,
  spent,
  onChangeMonth,
  onSetBudget,
  onClearBudget,
}: BudgetProgressProps) {
  const [isEditing, setIsEditing] = useState(budget === undefined);
  const [draftAmount, setDraftAmount] = useState(budget !== undefined ? String(budget) : '');
  const [error, setError] = useState<string | null>(null);

  // Switching months (or the budget for this month changing) resets the form
  // to reflect the newly selected month's state.
  useEffect(() => {
    setIsEditing(budget === undefined);
    setDraftAmount(budget !== undefined ? String(budget) : '');
    setError(null);
  }, [month, budget]);

  function handleSetBudget(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = Number(draftAmount);
    if (!draftAmount || Number.isNaN(parsed) || parsed <= 0) {
      setError('Enter an amount greater than 0.');
      return;
    }
    setError(null);
    onSetBudget(parsed);
    setIsEditing(false);
  }

  const percent = budget ? (spent / budget) * 100 : 0;
  const status = budget !== undefined ? statusFor(percent) : 'good';
  const remaining = budget !== undefined ? budget - spent : 0;

  return (
    <div className="chart-card">
      <div className="budget-progress__header">
        <h2 className="chart-card__title">Monthly Budget</h2>
        <input
          type="month"
          value={month}
          onChange={(e) => onChangeMonth(e.target.value)}
          aria-label="Select month"
        />
      </div>

      {isEditing ? (
        <form className="budget-progress__form" onSubmit={handleSetBudget}>
          <label className="field budget-progress__field">
            <span>Set a budget for {formatMonth(month)}</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={draftAmount}
              onChange={(e) => setDraftAmount(e.target.value)}
              placeholder="0.00"
            />
          </label>
          {error && <p className="transaction-form__error">{error}</p>}
          <div className="budget-progress__form-actions">
            <button type="submit" className="button button--primary">
              Set Budget
            </button>
            {budget !== undefined && (
              <button type="button" className="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="budget-progress">
          <div className="budget-progress__summary">
            <span>
              {/* This branch only renders once a budget has been set (see `isEditing`). */}
              {formatCurrency(spent)} of {formatCurrency(budget!)} spent
            </span>
            <span className="budget-progress__status">
              <span className={`status-dot status-dot--${status}`} aria-hidden="true" />
              {STATUS_LABEL[status]} · {percent.toFixed(0)}%
            </span>
          </div>

          <div
            className="budget-progress__track"
            role="progressbar"
            aria-valuenow={Math.round(Math.min(percent, 100))}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${percent.toFixed(0)}% of monthly budget used`}
          >
            <div
              className={`budget-progress__fill budget-progress__fill--${status}`}
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>

          <div className="budget-progress__footer">
            <span>
              {remaining >= 0
                ? `${formatCurrency(remaining)} remaining`
                : `${formatCurrency(Math.abs(remaining))} over budget`}
            </span>
            <div className="budget-progress__footer-actions">
              <button type="button" className="button button--small" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button
                type="button"
                className="button button--small button--danger"
                onClick={onClearBudget}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
