'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, IndianRupee, ArrowUpRight, Calendar, Award } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function WageProgressionPage() {
  const wageData = [
    { period: 'Pre-Training', wage: 8000, label: 'Informal Helper' },
    { period: 'Training Stipend', wage: 5000, label: 'Govt ITI Stipend' },
    { period: 'Placement (M0)', wage: 18000, label: 'Junior Operator' },
    { period: '90D Milestone', wage: 20500, label: 'Confirmed Technician' },
    { period: 'Current (M6)', wage: 24000, label: 'CNC Floor Technician' },
    { period: 'Projected (M12)', wage: 32000, label: 'Senior Specialist' },
  ];

  return (
    <DashboardLayout
      role="trainee"
      title="Wage Progression &amp; Growth"
      subtitle="Verified salary records and long-term career earnings trajectory"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">Current Monthly Wage</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">₹24,000</p>
          <p className="text-[10px] text-emerald-600 font-semibold">+200% vs pre-training income</p>
        </Card>
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">EPFO Monthly Contribution</span>
          <p className="text-2xl font-bold text-blue-600">₹2,880</p>
          <p className="text-[10px] text-slate-400">Employer match: ₹2,880/mo</p>
        </Card>
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">Projected 12-Month Wage</span>
          <p className="text-2xl font-bold text-indigo-600">₹32,000</p>
          <p className="text-[10px] text-slate-400">With 5-Axis Milling certificate</p>
        </Card>
      </div>

      <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 mb-6">
        <CardTitle>Earnings Growth Timeline (₹)</CardTitle>
        <p className="text-xs text-slate-500 mb-4">Official EPFO verified compensation track</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wageData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Monthly Wage']} />
              <Line type="monotone" dataKey="wage" stroke="#123B6D" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardLayout>
  );
}
