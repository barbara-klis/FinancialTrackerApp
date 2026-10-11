const TRANSACTIONS_KEY = 'budget-tracker:v1:transactions';
const BUDGETS_KEY = 'budget-tracker:v1:budgets';

/**
 * Reads a JSON value from localStorage.
 * Fails safe to `fallback` if the key is missing, unreadable, or holds
 * corrupt/unexpected data.
 */
function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Persists a JSON value to localStorage.
 * Silently no-ops on failure (e.g. quota exceeded, private browsing restrictions)
 * so a storage error never crashes the app.
 */
function saveJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore write failures; app continues to work in-memory for this session
  }
}

export function loadTransactions<T>(): T[] {
  const value = loadJson<T[]>(TRANSACTIONS_KEY, []);
  return Array.isArray(value) ? value : [];
}

export function saveTransactions<T>(transactions: T[]): void {
  saveJson(TRANSACTIONS_KEY, transactions);
}

/** Monthly budgets keyed by month, e.g. `{ "2026-09": 2000 }`. */
export function loadBudgets(): Record<string, number> {
  const value = loadJson<Record<string, number>>(BUDGETS_KEY, {});
  return value && typeof value === 'object' ? value : {};
}

export function saveBudgets(budgets: Record<string, number>): void {
  saveJson(BUDGETS_KEY, budgets);
}
