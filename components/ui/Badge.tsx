'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

const variantClasses: Record<string, string> = {
  default: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 shadow-xs',
  success: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs',
  warning: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 shadow-xs',
  error: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200/80 dark:border-red-800/80 shadow-xs',
  info: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/80 shadow-xs',
  neutral: 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs',
};

const pulseColors: Record<string, string> = {
  default: 'bg-blue-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-sky-500',
  neutral: 'bg-slate-400',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-[10px] font-semibold',
  md: 'px-2.5 py-0.5 text-xs font-semibold',
};

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full whitespace-nowrap transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', pulseColors[variant])} />
          <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', pulseColors[variant])} />
        </span>
      )}
      {children}
    </span>
  );
}
