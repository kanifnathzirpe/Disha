'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { currentEmployment, wageProgression } from '@/data/mockTraineeExperience';
import { formatCurrency } from '@/lib/utils';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  ShieldCheck, 
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function TraineeEmploymentPage() {
  return (
    <DashboardLayout 
      role="trainee" 
      title="My Employment" 
      subtitle="Current employment status and career progression"
      showDistrictSelector={false}
    >
      {/* Current Employment Card */}
      <Card padding="md" className="mb-6 bg-brand-50 border-brand-200">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 flex-shrink-0">
            <Building2 size={28} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <CardTitle>{currentEmployment.role}</CardTitle>
                <p className="text-sm text-brand-600 mt-1">{currentEmployment.employer}</p>
              </div>
              <Badge variant="success" size="md">EMPLOYED</Badge>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-brand-500" />
                <div>
                  <p className="text-xs text-brand-500">Start Date</p>
                  <p className="text-sm font-medium text-brand-700">{currentEmployment.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee size={16} className="text-brand-500" />
                <div>
                  <p className="text-xs text-brand-500">Salary</p>
                  <p className="text-sm font-medium text-brand-700">{currentEmployment.salary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-500" />
                <div>
                  <p className="text-xs text-brand-500">Verification</p>
                  <div className="flex items-center gap-1">
                    <CheckCircle size={14} className="text-status-success" />
                    <span className="text-sm font-medium text-status-success">Verified</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-brand-500" />
                <div>
                  <p className="text-xs text-brand-500">Outcome Confidence</p>
                  <p className="text-sm font-medium text-brand-700">{currentEmployment.outcomeConfidence}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Wage Progression Chart */}
      <Card padding="md" className="mb-6">
        <CardTitle>Wage Progression</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Your salary growth trajectory from starting employment</p>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wageProgression}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="period" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: any) => formatCurrency(value)} />
              <Line 
                type="monotone" 
                dataKey="wage" 
                stroke="#047857" 
                strokeWidth={3} 
                dot={{ fill: '#047857', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {wageProgression.map((point) => (
            <div key={point.period} className="p-3 bg-gray-50 rounded-md text-center">
              <p className="text-xs text-text-secondary">{point.period}</p>
              <p className="text-sm font-bold text-text-primary mt-1">{formatCurrency(point.wage)}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Employment Milestones */}
      <Card padding="md">
        <CardTitle>Employment Milestones</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Key achievements and career progression markers</p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-status-success-bg border border-status-success/20 rounded-md">
            <div className="w-8 h-8 rounded-full bg-status-success flex items-center justify-center flex-shrink-0">
              <CheckCircle size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-status-success">90-Day Retention Completed</p>
              <p className="text-xs text-status-success/70">Successfully completed probation period</p>
            </div>
            <span className="text-xs text-status-success">10 Aug 2026</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-brand-50 border border-brand-200 rounded-md">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
              <Clock size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-700">180-Day Retention In Progress</p>
              <p className="text-xs text-brand-500">6-month career milestone approaching</p>
            </div>
            <span className="text-xs text-brand-500">10 Nov 2026</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 border border-border rounded-md">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Annual Performance Review</p>
              <p className="text-xs text-text-secondary">Scheduled for May 2027</p>
            </div>
            <span className="text-xs text-text-secondary">May 2027</span>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
