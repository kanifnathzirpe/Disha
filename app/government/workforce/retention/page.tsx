'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { Activity, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

export default function RetentionWageOutcomesPage() {
  const cohortData = [
    { cohort: 'Q1 2025', placed: 12400, m3Retention: 78.5, m6Retention: 68.2, wageGrowth: 18.5 },
    { cohort: 'Q2 2025', placed: 14100, m3Retention: 81.0, m6Retention: 71.4, wageGrowth: 21.2 },
    { cohort: 'Q3 2025', placed: 13800, m3Retention: 79.4, m6Retention: 69.8, wageGrowth: 19.8 },
    { cohort: 'Q4 2025', placed: 15600, m3Retention: 83.2, m6Retention: 73.5, wageGrowth: 24.1 },
    { cohort: 'Q1 2026', placed: 16800, m3Retention: 84.8, m6Retention: 75.0, wageGrowth: 26.4 },
  ];

  return (
    <DashboardLayout
      role="government"
      title="Retention &amp; Wage Outcomes"
      subtitle="Longitudinal tracking of workforce retention and post-placement wage progression"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>Cohort Retention Progression (%)</CardTitle>
          <p className="text-xs text-slate-500 mb-4">3-month vs 6-month retention rate across placement cohorts</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cohortData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="cohort" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="%" domain={[50, 100]} />
                <Tooltip formatter={(v: any) => [`${v}%`, '']} />
                <Bar dataKey="m3Retention" fill="#123B6D" name="90-Day Retention" radius={[3, 3, 0, 0]} />
                <Bar dataKey="m6Retention" fill="#2F80ED" name="180-Day Retention" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>Annual Wage Escalation by Placement Cohort (%)</CardTitle>
          <p className="text-xs text-slate-500 mb-4">Average real wage growth 12 months after skilling certification</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cohortData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="cohort" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="%" />
                <Tooltip formatter={(v: any) => [`+${v}%`, 'Wage Growth']} />
                <Line type="monotone" dataKey="wageGrowth" stroke="#15803d" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardTitle>Cohort Milestone Ledger</CardTitle>
        <p className="text-xs text-slate-500 mb-4">Official quarterly retention records</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-600 dark:text-slate-300">
                <th className="p-3">Cohort</th>
                <th className="p-3">Verified Placed</th>
                <th className="p-3">90D Retention</th>
                <th className="p-3">180D Retention</th>
                <th className="p-3">Avg Wage Growth</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {cohortData.map((c) => (
                <tr key={c.cohort} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{c.cohort}</td>
                  <td className="p-3 font-mono">{c.placed.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-medium text-blue-700 dark:text-blue-400">{c.m3Retention}%</td>
                  <td className="p-3 font-medium text-emerald-700 dark:text-emerald-400">{c.m6Retention}%</td>
                  <td className="p-3 font-bold text-slate-800 dark:text-slate-200">+{c.wageGrowth}%</td>
                  <td className="p-3 text-right">
                    <Badge variant="success" size="sm">Audited</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
