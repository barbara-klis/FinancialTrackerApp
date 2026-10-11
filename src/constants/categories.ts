export const EXPENSE_CATEGORIES = [
  'Food',
  'Rent',
  'Transport',
  'Entertainment',
  'Utilities',
  'Health',
  'Shopping',
  'Other',
] as const;

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Gift',
  'Other',
] as const;

export function categoriesFor(type: 'income' | 'expense'): readonly string[] {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}
