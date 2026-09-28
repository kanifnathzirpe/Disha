'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'brand' | 'success' | 'warning' | 'error';
  animated?: boolean;
  showLabel?: boolean;
  className?: string;
}

const colorGradients: Record<string, string> = {
  brand: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 shadow-sm shadow-blue-500/30',
  success: 'bg-gradient-to-r from-emerald-600 to-teal-500 shadow-sm shadow-emerald-500/30',
  warning: 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm shadow-amber-500/30',
  error: 'bg-gradient-to-r from-red-600 to-rose-500 shadow-sm shadow-red-500/30',
};

const sizeClasses: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'brand',
  animated = true,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
          <span className="text-slate-600 dark:text-slate-400">Progress</span>
          <span className="text-slate-900 dark:text-slate-200">{Math.round(percent)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50', sizeClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorGradients[color],
            animated && 'animate-shimmer'
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
