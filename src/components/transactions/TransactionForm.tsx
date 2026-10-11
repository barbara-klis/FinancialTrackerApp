import { useState } from 'react';
import type { FormEvent } from 'react';
import { categoriesFor } from '../../constants/categories';
import type { Transaction, TransactionInput, TransactionType } from '../../types/transaction';
import { todayIsoDate } from '../../utils/format';

interface TransactionFormProps {
  initialValue?: Transaction;
  onSubmit: (input: TransactionInput) => void;
  onCancel?: () => void;
}

export function TransactionForm({ initialValue, onSubmit, onCancel }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initialValue?.type ?? 'expense');
  const [amount, setAmount] = useState(initialValue ? String(initialValue.amount) : '');
  const [category, setCategory] = useState(initialValue?.category ?? categoriesFor('expense')[0]);
  const [date, setDate] = useState(initialValue?.date ?? todayIsoDate());
  const [description, setDescription] = useState(initialValue?.description ?? '');
  const [error, setError] = useState<string | null>(null);

  function handleTypeChange(nextType: TransactionType) {
    setType(nextType);
    // reset category to a valid option for the newly selected type
    setCategory(categoriesFor(nextType)[0]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAmount = Number(amount);
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Enter an amount greater than 0.');
      return;
    }
    if (!category) {
      setError('Choose a category.');
      return;
    }
    if (!date) {
      setError('Choose a date.');
      return;
    }

    setError(null);
    onSubmit({
      type,
      amount: parsedAmount,
      category,
      date,
      description: description.trim() || undefined,
    });

    if (!initialValue) {
      // reset for the next entry after a successful "add"
      setAmount('');
      setDescription('');
    }
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="transaction-form__type">
        <label className="radio">
          <input
            type="radio"
            name="type"
            value="expense"
            checked={type === 'expense'}
            onChange={() => handleTypeChange('expense')}
          />
          Expense
        </label>
        <label className="radio">
          <input
            type="radio"
            name="type"
            value="income"
            checked={type === 'income'}
            onChange={() => handleTypeChange('income')}
          />
          Income
        </label>
      </div>

      <div className="transaction-form__row">
        <label className="field">
          <span>Amount</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </label>

        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categoriesFor(type).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>

      <label className="field">
        <span>Description (optional)</span>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Groceries at the market"
        />
      </label>

      {error && <p className="transaction-form__error">{error}</p>}

      <div className="transaction-form__actions">
        <button type="submit" className="button button--primary">
          {initialValue ? 'Save Changes' : 'Add Transaction'}
        </button>
        {onCancel && (
          <button type="button" className="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
