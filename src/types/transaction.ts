export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // always positive; sign is implied by `type`
  category: string;
  date: string; // ISO date string, e.g. "2026-09-08"
  description?: string;
  createdAt: string; // ISO timestamp, used for stable sorting
}

export type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
