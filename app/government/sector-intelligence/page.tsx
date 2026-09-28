'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { governmentDashboard } from '@/data/mockGovernment';
import { formatNumber } from '@/lib/utils';
import { BarChart3, TrendingUp, Users, Briefcase, Award, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

export default function SectorIntelligencePage() {
  const [selectedSector, setSelectedSector] = useState<string>('Manufacturing');

  const sectors = [
    { name: 'Manufacturing', trainees: 24200, growth: '+14.2%', placementRate: 74.5, demand: 'High', color: '#1e40af' },
    { name: 'IT / ITES', trainees: 20100, growth: '+21.5%', placementRate: 88.2, demand: 'Very High', color: '#0369a1' },
    { name: 'Healthcare', trainees: 12500, growth: '+18.0%', placementRate: 81.0, demand: 'High', color: '#047857' },
    { name: 'Automotive', trainees: 10800, growth: '+9.4%', placementRate: 71.3, demand: 'Medium', color: '#b45309' },
    { name: 'Construction', trainees: 8900, growth: '+6.1%', placementRate: 64.0, demand: 'Medium', color: '#7c3aed' },
    { name: 'Logistics', trainees: 5200, growth: '+15.8%', placementRate: 69.5, demand: 'High', color: '#ea580c' },
    { name: 'Renewable Energy', trainees: 3900, growth: '+34.2%', placementRate: 82.5, demand: 'Critical', color: '#15803d' },
  ];

  const activeSectorData = sectors.find(s => s.name === selectedSector) || sectors[0];

  return (
    <DashboardLayout
      role="government"
      title="Sector Intelligence"
      subtitle="Industry-wise demand trends, workforce absorption, and skill prioritization"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sector Donut Chart */}
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>Workforce Absorption by Sector</CardTitle>
          <p className="text-xs text-slate-500 mb-2">Distribution of 85,600 certified trainees</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectors}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="trainees"
                >
                  {sectors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => [Number(v).toLocaleString('en-IN') + ' Trainees', '']} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sector Placement Comparison Bar Chart */}
        <div className="lg:col-span-2">
          <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardTitle>Placement Rate Benchmark Across Sectors (%)</CardTitle>
            <p className="text-xs text-slate-500 mb-4">Post-certification employment conversion</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectors} margin={{ top: 5, right: 20, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-10} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 11 }} unit="%" domain={[0, 100]} />
                  <Tooltip formatter={(v: any) => [`${v}%`, 'Placement Rate']} />
                  <Bar dataKey="placementRate" fill="#123B6D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Sector Deep Dive Matrix */}
      <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardTitle>Sector Skilling &amp; Demand Breakdown</CardTitle>
        <p className="text-xs text-slate-500 mb-4">Click a sector row to filter policy metrics</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-600 dark:text-slate-300">
                <th className="p-3">Sector Name</th>
                <th className="p-3">Annual Trainees</th>
                <th className="p-3">YoY Demand Growth</th>
                <th className="p-3">Placement Rate</th>
                <th className="p-3">Priority Level</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {sectors.map((sec) => (
                <tr 
                  key={sec.name} 
                  onClick={() => setSelectedSector(sec.name)}
                  className={`cursor-pointer transition-colors ${
                    selectedSector === sec.name 
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 font-semibold' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/40'
                  }`}
                >
                  <td className="p-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sec.color }} />
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{sec.name}</span>
                  </td>
                  <td className="p-3 font-mono">{formatNumber(sec.trainees)}</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">{sec.growth}</td>
                  <td className="p-3">{sec.placementRate}%</td>
                  <td className="p-3">
                    <Badge variant={sec.demand === 'Critical' ? 'error' : sec.demand === 'Very High' ? 'warning' : 'info'} size="sm">
                      {sec.demand}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <span className="text-[#123B6D] dark:text-blue-400 font-medium hover:underline">
                      View Skills →
                    </span>
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
