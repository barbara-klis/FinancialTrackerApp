import type { Transaction } from '../../types/transaction';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return <p className="transaction-list__empty">No transactions yet — add your first one above.</p>;
  }

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() ||
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <ul className="transaction-list">
      {sorted.map((t) => (
        <TransactionItem key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
