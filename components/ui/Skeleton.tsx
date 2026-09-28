import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

export function Skeleton({ className, variant = 'rectangular', width, height }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variantClasses[variant],
        className
      )}
      style={{ width, height }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-4 border border-border rounded-md">
      <Skeleton variant="text" className="mb-3" width="60%" />
      <Skeleton variant="text" className="mb-2" width="80%" />
      <Skeleton variant="text" className="mb-4" width="40%" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width="60px" height="24px" />
        <Skeleton variant="rectangular" width="60px" height="24px" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4 p-3 bg-gray-50 rounded-md">
        <Skeleton variant="text" width="20%" />
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="15%" />
        <Skeleton variant="text" width="15%" />
        <Skeleton variant="text" width="15%" />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-3 border border-border rounded-md">
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="text" width="25%" />
          <Skeleton variant="text" width="15%" />
          <Skeleton variant="text" width="15%" />
          <Skeleton variant="text" width="15%" />
        </div>
      ))}
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="p-4 border border-border rounded-md">
      <div className="flex items-center justify-between mb-2">
        <Skeleton variant="circular" width="32px" height="32px" />
        <Skeleton variant="text" width="40%" />
      </div>
      <Skeleton variant="text" className="mb-1" height="32px" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
}
