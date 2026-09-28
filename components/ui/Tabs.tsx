'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ items, defaultValue, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultValue || items[0]?.value || '');

  const handleClick = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className={cn('border-b border-border', className)}>
      <div className="flex gap-0 -mb-px overflow-x-auto">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-150',
              active === item.value
                ? 'border-brand-500 text-brand-500'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
            )}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.label}
              {item.count !== undefined && (
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full',
                  active === item.value ? 'bg-brand-50 text-brand-600' : 'bg-gray-100 text-text-secondary'
                )}>
                  {item.count}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
