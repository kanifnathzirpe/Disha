'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  className,
  size = 'md',
}: SelectProps) {
  return (
    <div className={cn('relative', className)}>
      {label && <label className="disha-label">{label}</label>}
      <div className="relative">
        <select
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            'disha-input appearance-none pr-8 cursor-pointer',
            size === 'sm' && 'py-1.5 text-xs',
          )}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
      </div>
    </div>
  );
}
