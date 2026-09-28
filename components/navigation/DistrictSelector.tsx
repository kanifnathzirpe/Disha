'use client';

import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const districts = [
  'All Districts',
  'Mumbai',
  'Pune',
  'Nagpur',
  'Thane',
  'Nashik',
  'Aurangabad',
  'Solapur',
  'Kolhapur',
  'Amravati',
  'Jalgaon',
];

interface DistrictSelectorProps {
  value?: string;
  onChange?: (district: string) => void;
  className?: string;
}

export function DistrictSelector({ value = 'All Districts', onChange, className }: DistrictSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <MapPin size={16} className="text-text-secondary" />
        <span className="text-sm text-text-primary">{value}</span>
        <ChevronDown size={14} className="text-text-tertiary" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-md shadow-dropdown z-20">
            <div className="py-1 max-h-64 overflow-y-auto">
              {districts.map((district) => (
                <button
                  key={district}
                  onClick={() => {
                    onChange?.(district);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm transition-colors',
                    value === district
                      ? 'bg-brand-50 text-brand-700 font-medium'
                      : 'text-text-primary hover:bg-gray-50'
                  )}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
