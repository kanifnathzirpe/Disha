import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, XCircle, RefreshCw, X } from 'lucide-react';

interface ErrorBannerProps {
  title: string;
  description?: string;
  variant?: 'error' | 'warning';
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorBanner({ 
  title, 
  description, 
  variant = 'error', 
  onRetry, 
  onDismiss,
  className 
}: ErrorBannerProps) {
  const variantClasses = {
    error: 'bg-status-error-bg border-status-error/30 text-status-error',
    warning: 'bg-status-warning-bg border-status-warning/30 text-status-warning',
  };

  const Icon = variant === 'error' ? XCircle : AlertCircle;

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 border rounded-md',
      variantClasses[variant],
      className
    )}>
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        {description && <p className="text-xs opacity-90">{description}</p>}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {onRetry && (
          <button
            onClick={onRetry}
            className="p-1.5 rounded hover:bg-white/20 transition-colors"
            aria-label="Retry"
          >
            <RefreshCw size={16} />
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1.5 rounded hover:bg-white/20 transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

interface PageErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export function PageError({ 
  title = 'Something went wrong', 
  description = 'An error occurred while loading this page. Please try again.',
  onRetry,
  onBack 
}: PageErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <div className="w-16 h-16 rounded-full bg-status-error-bg flex items-center justify-center mb-4">
        <XCircle size={32} className="text-status-error" />
      </div>
      <h2 className="text-lg font-semibold text-text-primary mb-2">{title}</h2>
      <p className="text-sm text-text-secondary text-center max-w-md mb-6">{description}</p>
      <div className="flex gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 border border-border rounded-md hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}
