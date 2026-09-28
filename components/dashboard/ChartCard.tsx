import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardTitle } from '@/components/ui';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export function ChartCard({ title, subtitle, actions, children, className, height = '300px' }: ChartCardProps) {
  return (
    <Card className={cn('', className)} padding="md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <CardTitle>{title}</CardTitle>
          {subtitle && <p className="text-caption text-text-secondary mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div style={{ height }} className="w-full">
        {children}
      </div>
    </Card>
  );
}
