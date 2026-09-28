'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  sparklineData?: number[];
  onClick?: () => void;
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  icon,
  sparklineData = [35, 42, 40, 55, 62, 58, 74, 82],
  onClick,
  className,
}: MetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  // Calculate normalized SVG sparkline points
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 80;
  const height = 28;

  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden bg-white dark:bg-slate-900/90 rounded-xl p-4 sm:p-5',
        'border border-slate-200/80 dark:border-slate-800 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]',
        'hover:shadow-[0_14px_30px_-6px_rgba(30,64,175,0.12)] dark:hover:shadow-[0_14px_30px_-6px_rgba(59,130,246,0.18)]',
        'hover:-translate-y-1 hover:border-blue-400/60 dark:hover:border-blue-500/60 transition-all duration-300',
        onClick ? 'cursor-pointer' : '',
        className
      )}
    >
      {/* Ambient gradient glow on hover */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-blue-500/10 to-indigo-500/0 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight font-display">
              {value}
            </p>
            {onClick && (
              <ArrowUpRight
                size={16}
                className="text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{subtitle}</p>
          )}

          {/* Metric Bottom Row: Trend pill + Sparkline */}
          <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            {change !== undefined ? (
              <div
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold',
                  isPositive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : isNegative
                    ? 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                )}
              >
                {isPositive ? (
                  <TrendingUp size={12} className="stroke-[2.5]" />
                ) : isNegative ? (
                  <TrendingDown size={12} className="stroke-[2.5]" />
                ) : (
                  <Minus size={12} />
                )}
                <span>
                  {isPositive ? '+' : ''}
                  {change}%
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 dark:text-slate-500">Live State Metric</span>
            )}

            {/* Sparkline mini-graph */}
            <div className="w-20 h-7 opacity-70 group-hover:opacity-100 transition-opacity">
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                <polyline
                  fill="none"
                  stroke={isNegative ? '#ef4444' : '#3b82f6'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />
              </svg>
            </div>
          </div>
        </div>

        {icon && (
          <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 border border-blue-100 dark:border-slate-700/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
