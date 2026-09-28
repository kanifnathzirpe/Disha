'use client';

import React from 'react';
import { Card, Badge } from '@/components/ui';
import { ProgressBar } from '@/components/ui';
import { CheckCircle, Shield, Clock, DollarSign } from 'lucide-react';

interface EmploymentConfidenceProps {
  confidenceScore: number;
  signals: {
    employerVerified: boolean;
    traineeConfirmed: boolean;
    ninetyDayConfirmed: boolean;
    salaryUpdated: boolean;
  };
  className?: string;
}

export function EmploymentConfidence({ confidenceScore, signals, className }: EmploymentConfidenceProps) {
  const signalItems = [
    { key: 'employerVerified', label: 'Employer verified', icon: Shield },
    { key: 'traineeConfirmed', label: 'Trainee confirmed', icon: CheckCircle },
    { key: 'ninetyDayConfirmed', label: '90D confirmation', icon: Clock },
    { key: 'salaryUpdated', label: 'Salary updated', icon: DollarSign },
  ];

  return (
    <Card padding="md" className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Employment Confidence</h3>
        <Badge variant={confidenceScore >= 80 ? 'success' : confidenceScore >= 60 ? 'warning' : 'error'} size="sm">
          {confidenceScore}%
        </Badge>
      </div>

      <div className="mb-4">
        <ProgressBar value={confidenceScore} max={100} size="md" color={confidenceScore >= 80 ? 'success' : confidenceScore >= 60 ? 'warning' : 'error'} />
      </div>

      <div className="space-y-2">
        {signalItems.map((item) => {
          const isActive = signals[item.key as keyof typeof signals];
          const Icon = item.icon;
          
          return (
            <div key={item.key} className="flex items-center gap-2">
              <div className={`flex-shrink-0 ${isActive ? 'text-status-success' : 'text-text-tertiary'}`}>
                <Icon size={14} />
              </div>
              <span className={`text-xs ${isActive ? 'text-text-primary' : 'text-text-tertiary'}`}>
                {isActive ? '✓' : '○'} {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
