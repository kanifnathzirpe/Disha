'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { comparisonOptions } from '@/data/mockSimulator';
import { Scale, CheckCircle2, TrendingUp, IndianRupee, Users, ArrowRight, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

export default function ScenariosComparisonPage() {
  const { savedScenarios, showToast } = useApp();
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(['opt-1', 'opt-2']);

  const chartData = comparisonOptions.map((opt) => ({
    name: opt.name,
    placements: opt.employment,
    wage: opt.medianWage,
    roi: opt.roi,
  }));

  const toggleSelect = (id: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout
      role="government"
      title="Scenario Comparison & ROI"
      subtitle="Side-by-side evaluation of policy investment options"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Compare Investment Models
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Analyze projected return on investment, employment generation, and median wage outcomes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => showToast('Refreshed scenario comparative matrix', 'info')}
          >
            Refresh Metrics
          </Button>
          <a href="/government/simulator">
            <Button size="sm" variant="primary" className="bg-[#123B6D] hover:bg-[#0D2F5B]">
              <Plus size={13} className="mr-1" />
              New Simulation
            </Button>
          </a>
        </div>
      </div>

      {/* Comparison Chart */}
      <Card padding="md" className="mb-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardTitle>Projected Additional Placements by Scenario</CardTitle>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Estimated state-wide placement output under alternative budget allocations
        </p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-10} textAnchor="end" />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => [Number(v).toLocaleString('en-IN'), 'Placements']} />
              <Bar dataKey="placements" fill="#123B6D" name="Additional Placements" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {comparisonOptions.map((opt) => {
          const isSelected = selectedScenarios.includes(opt.id);
          return (
            <Card
              key={opt.id}
              padding="md"
              className={`border transition-all ${
                isSelected
                  ? 'border-[#123B6D] dark:border-blue-500 shadow-md bg-blue-50/20 dark:bg-blue-950/20'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{opt.name}</span>
                <Badge variant={opt.roi >= 3 ? 'success' : 'info'} size="sm">
                  {opt.roi}x ROI
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {opt.description}
              </p>

              <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-700/60 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Projected Placements:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    +{Number(opt.employment).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Projected Median Wage:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    ₹{Number(opt.medianWage).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Retention Estimate:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{opt.retention}%</span>
                </div>
              </div>

              <div className="mt-4 pt-2">
                <Button
                  size="sm"
                  variant={isSelected ? 'primary' : 'outline'}
                  onClick={() => toggleSelect(opt.id)}
                  className="w-full text-xs"
                >
                  {isSelected ? 'Selected for Comparison' : 'Select to Compare'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Saved Scenarios from AppContext */}
      {savedScenarios.length > 0 && (
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>User Saved Simulations</CardTitle>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Custom policy models saved during the current simulation session
          </p>
          <div className="space-y-2">
            {savedScenarios.map((scen: any) => (
              <div
                key={scen.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-900/40"
              >
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{scen.name}</p>
                  <p className="text-[11px] text-slate-500">Saved on {scen.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-emerald-600 font-bold">{scen.projectedPlacement} jobs</span>
                  <span className="font-mono text-[#123B6D] font-bold">{scen.roi} ROI</span>
                  <span className="text-slate-500">{scen.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}
