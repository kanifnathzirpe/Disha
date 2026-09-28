'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from 'lucide-react';
import { EmptyState } from '@/components/ui';

interface DataTableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyField?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  compact?: boolean;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField = 'id',
  searchable = false,
  searchPlaceholder = 'Search...',
  onRowClick,
  emptyTitle = 'No data found',
  emptyDescription,
  className,
  compact = false,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  let filteredData = [...data];

  // Search
  if (search) {
    const lower = search.toLowerCase();
    filteredData = filteredData.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val !== undefined && val !== null && String(val).toLowerCase().includes(lower);
      })
    );
  }

  // Sort
  if (sortKey) {
    filteredData.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const comparison = aVal < bVal ? -1 : 1;
      return sortDir === 'asc' ? comparison : -comparison;
    });
  }

  return (
    <div className={cn('disha-card overflow-hidden', className)}>
      {searchable && (
        <div className="px-4 py-3 border-b border-border">
          <div className="relative max-w-xs w-full sm:max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="disha-input pl-8 text-xs"
              aria-label="Search table"
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto disha-table-container">
        <table className="w-full disha-table min-w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'text-left text-xs font-semibold text-text-secondary uppercase tracking-wider',
                    compact ? 'px-3 py-2' : 'px-4 py-3',
                    col.sortable && 'cursor-pointer select-none hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1',
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable && handleSort(col.key)}
                  tabIndex={col.sortable ? 0 : undefined}
                  onKeyDown={(e) => col.sortable && e.key === 'Enter' && handleSort(col.key)}
                  aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      sortKey === col.key ? (
                        sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                      ) : (
                        <ChevronsUpDown size={12} className="text-text-tertiary" />
                      )
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIndex) => (
                <tr
                  key={String(row[keyField] ?? rowIndex)}
                  className={cn(
                    'border-b border-border/50 last:border-0',
                    onRowClick && 'cursor-pointer hover:bg-brand-50/30 transition-colors duration-150',
                  )}
                  onClick={() => onRowClick?.(row)}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={(e) => onRowClick && e.key === 'Enter' && onRowClick(row)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'text-sm text-text-primary',
                        compact ? 'px-3 py-2' : 'px-4 py-3',
                      )}
                    >
                      {col.render
                        ? col.render(row[col.key], row, rowIndex)
                        : (row[col.key] as React.ReactNode) ?? '—'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
