import React from 'react';
import { cn } from '@/lib/utils';
import { FileX, Search, Users, Briefcase, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'search' | 'candidates' | 'jobs' | 'error';
  className?: string;
}

export function EmptyState({ title, description, icon, action, variant = 'default', className }: EmptyStateProps) {
  const variantIcons = {
    default: <FileX size={24} />,
    search: <Search size={24} />,
    candidates: <Users size={24} />,
    jobs: <Briefcase size={24} />,
    error: <AlertCircle size={24} />,
  };

  const variantColors = {
    default: 'bg-gray-100 text-text-tertiary',
    search: 'bg-brand-50 text-brand-500',
    candidates: 'bg-brand-50 text-brand-500',
    jobs: 'bg-brand-50 text-brand-500',
    error: 'bg-status-error-bg text-status-error',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className={cn(
        'flex items-center justify-center w-12 h-12 rounded-full mb-4',
        variantColors[variant]
      )}>
        {icon || variantIcons[variant]}
      </div>
      <h3 className="text-sm font-medium text-text-primary mb-1">{title}</h3>
      {description && <p className="text-xs text-text-secondary max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

