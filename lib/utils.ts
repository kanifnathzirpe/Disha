import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
}

export function formatNumber(value: number): string {
  if (value >= 100000) {
    return `${(value / 100000).toFixed(1)}L`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString('en-IN');
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: 'success',
    completed: 'success',
    verified: 'success',
    hired: 'success',
    employed: 'success',
    open: 'success',
    'in-progress': 'info',
    enrolled: 'info',
    pending: 'warning',
    upcoming: 'warning',
    shortlisted: 'warning',
    interviewed: 'warning',
    seeking: 'warning',
    applied: 'info',
    paused: 'warning',
    offered: 'info',
    closed: 'neutral',
    ended: 'neutral',
    expired: 'error',
    revoked: 'error',
    rejected: 'error',
    failed: 'error',
    dropped: 'error',
    critical: 'error',
    high: 'warning',
    medium: 'info',
    low: 'success',
  };
  return map[status] || 'neutral';
}
