'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500',
  secondary: 'bg-brand-50 text-brand-600 hover:bg-brand-100 focus:ring-brand-500',
  outline: 'border border-border bg-surface text-text-primary hover:bg-gray-50 focus:ring-brand-500',
  ghost: 'text-text-secondary hover:bg-gray-100 hover:text-text-primary focus:ring-brand-500',
  danger: 'bg-status-error text-white hover:bg-red-800 focus:ring-red-500',
  success: 'bg-status-success text-white hover:bg-green-700 focus:ring-green-500',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-sm',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 focus:ring-offset-white',
        'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
        variant === 'primary' && 'hover:scale-[1.02] active:scale-[0.98]',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
