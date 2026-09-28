'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: 'default' | 'glass' | 'interactive' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-6 sm:p-7',
};

const variantClasses: Record<string, string> = {
  default: 'bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]',
  glass: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/60 dark:border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]',
  interactive: 'bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer transition-all duration-300',
  gradient: 'bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 border border-blue-100 dark:border-indigo-900/50 shadow-md',
};

export function Card({
  className,
  hover = false,
  variant = 'default',
  padding = 'md',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200',
        variantClasses[variant],
        (hover || variant === 'interactive') && 'hover:shadow-[0_12px_32px_-6px_rgba(30,64,175,0.12)] dark:hover:shadow-[0_12px_32px_-6px_rgba(59,130,246,0.15)] hover:-translate-y-0.5 hover:border-blue-300/80 dark:hover:border-blue-500/60',
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4 flex items-center justify-between gap-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-slate-500 dark:text-slate-400 mt-0.5', className)} {...props}>
      {children}
    </p>
  );
}
