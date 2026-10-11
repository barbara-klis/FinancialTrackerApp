export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Current month as "YYYY-MM", matching the `<input type="month">` value format. */
export function currentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

/** "2026-09" -> "September 2026" */
export function formatMonth(month: string): string {
  const date = new Date(`${month}-01T00:00:00`);
  if (Number.isNaN(date.getTime())) return month;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
