import React from 'react';
import { Badge } from './Badge';
import { getStatusColor } from '@/lib/utils';
import type { StatusVariant } from '@/types';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = getStatusColor(status) as StatusVariant;
  const label = status.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <Badge variant={variant} className={className}>
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
          variant === 'success' ? 'bg-status-success' :
          variant === 'warning' ? 'bg-status-warning' :
          variant === 'error' ? 'bg-status-error' :
          variant === 'info' ? 'bg-status-info' :
          'bg-gray-400'
        }`}
      />
      {label}
    </Badge>
  );
}
