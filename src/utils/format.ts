import { formatDistanceToNow, parseISO } from 'date-fns';

export function formatPrice(
  amount: number | null | undefined,
  currency = 'INR',
  locale = 'en-IN',
): string {
  if (amount == null || Number.isNaN(amount)) {
    return 'Price unavailable';
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDate(iso: string, locale = 'en-IN'): string {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parseISO(iso));
}

export function formatRelativeTime(iso: string): string {
  return formatDistanceToNow(parseISO(iso), { addSuffix: true });
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}
