'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { trainingPrograms } from '@/data/mockGovernment';
import { employmentFunnel } from '@/data/mockCommandCenter';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { Activity, CheckCircle, TrendingUp, Briefcase, Award, ArrowUpRight, Filter } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';

export default function OutcomeAnalyticsPage() {
  const [selectedSector, setSelectedSector] = useState('All');

  const filteredPrograms = selectedSector === 'All'
    ? trainingPrograms
    : trainingPrograms.filter(p => p.sector === selectedSector);

  const retentionCurve = [
    { day: 'Day 0 (Placed)', rate: 100 },
    { day: 'Day 30', rate: 89.2 },
    { day: 'Day 60', rate: 78.4 },
    { day: 'Day 90', rate: 67.8 },
    { day: 'Day 120', rate: 61.2 },
    { day: 'Day 150', rate: 57.5 },
    { day: 'Day 180', rate: 54.6 },
  ];

  return (
    <DashboardLayout
      role="government"
      title="Outcome Analytics"
      subtitle="Deep-dive into trainee employment, retention benchmarks and wage growth"
    >
      {/* Top Outcomes Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500">Overall Placement</span>
            <Briefcase size={16} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">68.1%</p>
          <p className="text-[10px] text-emerald-600 font-semibold">+4.2% vs national benchmark</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500">90-Day Retention</span>
            <Activity size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">67.8%</p>
          <p className="text-[10px] text-blue-600 font-semibold">38,945 verified active</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500">Average Post-Skill Wage</span>
            <TrendingUp size={16} className="text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">₹18,450</p>
          <p className="text-[10px] text-indigo-600 font-semibold">+42% wage uplift</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500">Certification Efficiency</span>
            <Award size={16} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">85.2%</p>
          <p className="text-[10px] text-slate-500">71,820 certified of 84,320</p>
        </Card>
      </div>

      {/* Retention Curve Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>Post-Placement Retention Decay Curve</CardTitle>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Percentage of certified placed workforce remaining in active verified employment
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionCurve} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="%" domain={[40, 105]} />
                <Tooltip formatter={(v: any) => [`${v}%`, 'Active Retention']} />
                <Line type="monotone" dataKey="rate" stroke="#123B6D" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>Program Placement Rate Comparison</CardTitle>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Highest performing government skilling initiatives by outcome rate
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredPrograms.slice(0, 5).map(p => ({ name: p.name.split('–')[1] || p.name, rate: p.placementRate }))}
                margin={{ top: 5, right: 20, left: 0, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-10} textAnchor="end" />
                <YAxis tick={{ fontSize: 11 }} unit="%" domain={[0, 100]} />
                <Tooltip formatter={(v: any) => [`${v}%`, 'Placement Rate']} />
                <Bar dataKey="rate" fill="#2F80ED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Program Outcome Breakdown Table */}
      <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Program Outcome Matrix</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter Sector:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="text-xs px-2 py-1 border rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            >
              <option value="All">All Sectors</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="IT/ITES">IT/ITES</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Renewable Energy">Renewable Energy</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-600 dark:text-slate-300">
                <th className="p-3">Program Name</th>
                <th className="p-3">Sector</th>
                <th className="p-3">Enrolled</th>
                <th className="p-3">Completion %</th>
                <th className="p-3">Placement %</th>
                <th className="p-3">Avg Post Wage</th>
                <th className="p-3">Budget Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredPrograms.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-100">{p.name}</td>
                  <td className="p-3 text-slate-500">{p.sector}</td>
                  <td className="p-3 font-mono">{formatNumber(p.enrolled)}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={p.completionRate} size="sm" color="brand" />
                      <span>{p.completionRate}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">
                    {p.placementRate}%
                  </td>
                  <td className="p-3 font-mono">{formatCurrency(p.avgWageAfter)}</td>
                  <td className="p-3 font-mono">
                    {Math.round((p.spent / p.budget) * 100)}%
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
