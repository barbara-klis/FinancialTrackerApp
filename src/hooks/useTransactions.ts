import { useEffect, useState } from 'react';
import type { Transaction, TransactionInput } from '../types/transaction';
import { loadTransactions, saveTransactions } from '../utils/storage';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadTransactions<Transaction>(),
  );

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  function addTransaction(input: TransactionInput) {
    const transaction: Transaction = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [transaction, ...prev]);
  }

  function updateTransaction(id: string, input: TransactionInput) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...input } : t)),
    );
  }

  function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return { transactions, addTransaction, updateTransaction, deleteTransaction };
}
