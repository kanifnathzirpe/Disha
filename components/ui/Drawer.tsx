'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'right' | 'left';
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

export function Drawer({ open, onClose, title, children, side = 'right', size = 'md', className }: DrawerProps) {
  if (!open) return null;

  const sizeClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div
        className={cn(
          'relative bg-surface shadow-dropdown w-full h-full overflow-y-auto',
          sizeClasses[size],
          side === 'right' ? 'ml-auto' : 'mr-auto',
          className
        )}
      >
        {title && (
          <div className="sticky top-0 bg-surface flex items-center justify-between px-6 py-4 border-b border-border z-10">
            <h3 className="text-subheading">{title}</h3>
            <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-text-tertiary hover:text-text-primary">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
