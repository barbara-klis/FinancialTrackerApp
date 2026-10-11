import type { Transaction } from '../../types/transaction';
import { formatCurrency, formatDate } from '../../utils/format';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionItem({ transaction, onEdit, onDelete }: TransactionItemProps) {
  const isExpense = transaction.type === 'expense';

  function handleDelete() {
    if (window.confirm('Delete this transaction?')) {
      onDelete(transaction.id);
    }
  }

  return (
    <li className="transaction-item">
      <div className="transaction-item__main">
        <span className={isExpense ? 'badge badge--expense' : 'badge badge--income'}>
          {transaction.category}
        </span>
        <span className="transaction-item__date">{formatDate(transaction.date)}</span>
        {transaction.description && (
          <span className="transaction-item__description">{transaction.description}</span>
        )}
      </div>
      <div className="transaction-item__side">
        <span className={isExpense ? 'transaction-item__amount transaction-item__amount--expense' : 'transaction-item__amount transaction-item__amount--income'}>
          {isExpense ? '-' : '+'}
          {formatCurrency(transaction.amount)}
        </span>
        <button type="button" className="button button--small" onClick={() => onEdit(transaction)}>
          Edit
        </button>
        <button type="button" className="button button--small button--danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}
