import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  status?: 'completed' | 'active' | 'upcoming';
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const dotColors: Record<string, string> = {
  completed: 'bg-status-success border-green-200',
  active: 'bg-brand-500 border-blue-200',
  upcoming: 'bg-gray-300 border-gray-200',
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Vertical line */}
          {index < items.length - 1 && (
            <div className="absolute left-[9px] top-5 w-0.5 h-full bg-border" />
          )}
          {/* Dot */}
          <div className={cn(
            'relative z-10 w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5',
            dotColors[item.status || 'upcoming']
          )}>
            {item.icon && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                {item.icon}
              </div>
            )}
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary">{item.title}</p>
            {item.description && (
              <p className="text-caption text-text-secondary mt-0.5">{item.description}</p>
            )}
            <p className="text-caption text-text-tertiary mt-0.5">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
