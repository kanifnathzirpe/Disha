'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  // Hide breadcrumb on root dashboard to prevent single redundant label
  if (!items || items.length <= 1) return null;

  return (
    <nav className={cn('flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400', className)} aria-label="Breadcrumb">
      <Link
        href={items[0]?.href || '/'}
        className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center gap-1"
        title="Dashboard Home"
      >
        <Home size={12} />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          <ChevronRight size={11} className="text-slate-400 shrink-0" aria-hidden="true" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-slate-500 dark:text-slate-400 hover:text-[#123B6D] dark:hover:text-blue-400 transition-colors font-medium truncate max-w-[120px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[160px]" aria-current="page">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
