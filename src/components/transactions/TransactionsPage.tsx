import { useState } from 'react';
import type { Transaction, TransactionInput } from '../../types/transaction';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';

interface TransactionsPageProps {
  transactions: Transaction[];
  onAdd: (input: TransactionInput) => void;
  onUpdate: (id: string, input: TransactionInput) => void;
  onDelete: (id: string) => void;
}

export function TransactionsPage({ transactions, onAdd, onUpdate, onDelete }: TransactionsPageProps) {
  const [editing, setEditing] = useState<Transaction | null>(null);

  function handleSubmit(input: TransactionInput) {
    if (editing) {
      onUpdate(editing.id, input);
      setEditing(null);
    } else {
      onAdd(input);
    }
  }

  return (
    <div className="transactions-page">
      <section className="panel">
        <h2 className="panel__title">{editing ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <TransactionForm
          key={editing?.id ?? 'new'}
          initialValue={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={editing ? () => setEditing(null) : undefined}
        />
      </section>

      <section className="panel">
        <h2 className="panel__title">Transactions</h2>
        <TransactionList transactions={transactions} onEdit={setEditing} onDelete={onDelete} />
      </section>
    </div>
  );
}
