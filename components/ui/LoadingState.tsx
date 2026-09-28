import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  text?: string;
  className?: string;
}

export function LoadingState({ text = 'Loading...', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <Loader2 size={24} className="animate-spin text-brand-500 mb-3" />
      <p className="text-caption text-text-secondary">{text}</p>
    </div>
  );
}
