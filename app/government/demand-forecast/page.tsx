'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { skillTrends, trendSummary } from '@/data/mockDemandTrend';
import { formatNumber } from '@/lib/utils';
import {
  TrendingUp, TrendingDown, ArrowRight, Target, IndianRupee,
  Sparkles, AlertTriangle, Minus
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from 'recharts';

const TREND_CONFIG = {
  emerging: { label: '🚀 Emerging', color: 'text-purple-600', bg: 'bg-purple-100', badge: 'info' as const },
  growing: { label: '📈 Growing', color: 'text-emerald-600', bg: 'bg-emerald-100', badge: 'success' as const },
  stable: { label: '→ Stable', color: 'text-blue-600', bg: 'bg-blue-100', badge: 'neutral' as const },
  declining: { label: '📉 Declining', color: 'text-red-600', bg: 'bg-red-100', badge: 'error' as const },
};

export default function DemandForecastPage() {
  const { showToast } = useApp();
  const [selectedSkill, setSelectedSkill] = useState(skillTrends[0]);
  const [filterTrend, setFilterTrend] = useState<string>('All');

  const filtered = filterTrend === 'All' ? skillTrends : skillTrends.filter(s => s.trend === filterTrend);

  return (
    <DashboardLayout
      role="government"
      title="Skill Demand Trends & Emerging Skills"
      subtitle="Track skill demand over time — identify growing, stable, and declining skills"
    >
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Emerging Skills', value: trendSummary.emergingSkills, icon: <Sparkles size={16} />, color: 'text-purple-600' },
          { label: 'Growing Skills', value: trendSummary.growingSkills, icon: <TrendingUp size={16} />, color: 'text-emerald-600' },
          { label: 'Stable Skills', value: trendSummary.stableSkills, icon: <Minus size={16} />, color: 'text-blue-600' },
          { label: 'Declining Skills', value: trendSummary.decliningSkills, icon: <TrendingDown size={16} />, color: 'text-red-600' },
        ].map((m, i) => (
          <Card key={i} padding="sm" className="bg-white border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <span className={m.color}>{m.icon}</span>
              <span className="text-[10px] text-slate-500 uppercase">{m.label}</span>
            </div>
            <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-700">Skills Tracked</h3>
            <select value={filterTrend} onChange={e => setFilterTrend(e.target.value)} className="disha-input text-xs h-8 w-32">
              <option value="All">All Trends</option>
              <option value="emerging">Emerging</option>
              <option value="growing">Growing</option>
              <option value="stable">Stable</option>
              <option value="declining">Declining</option>
            </select>
          </div>
          <div className="space-y-2">
            {filtered.map(skill => {
              const config = TREND_CONFIG[skill.trend];
              const isSelected = selectedSkill.skill === skill.skill;
              return (
                <button
                  key={skill.skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected ? 'border-blue-400 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-800">{skill.skill}</span>
                    <Badge variant={config.badge} size="sm">{config.label}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500">
                    <span>Demand: {formatNumber(skill.currentDemand)}</span>
                    <span className={skill.growthRate > 0 ? 'text-emerald-600' : 'text-red-600'}>
                      {skill.growthRate > 0 ? '+' : ''}{skill.growthRate}% YoY
                    </span>
                    <span>₹{formatNumber(skill.medianWage)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Skill Detail Header */}
          <Card padding="md" className="bg-white border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedSkill.skill}</h3>
                <p className="text-xs text-slate-500">{selectedSkill.sector}</p>
              </div>
              <Badge variant={TREND_CONFIG[selectedSkill.trend].badge} size="sm" className="text-sm">
                {TREND_CONFIG[selectedSkill.trend].label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Current Demand', value: formatNumber(selectedSkill.currentDemand), color: 'text-blue-600' },
                { label: '6M Projected', value: formatNumber(selectedSkill.projectedDemand6m), color: 'text-indigo-600' },
                { label: '12M Projected', value: formatNumber(selectedSkill.projectedDemand12m), color: 'text-purple-600' },
                { label: 'Growth Rate', value: `${selectedSkill.growthRate > 0 ? '+' : ''}${selectedSkill.growthRate}%`, color: selectedSkill.growthRate > 0 ? 'text-emerald-600' : 'text-red-600' },
              ].map((m, i) => (
                <div key={i} className="p-2.5 bg-slate-50 rounded-lg">
                  <p className="text-[10px] text-slate-500">{m.label}</p>
                  <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-2.5 bg-emerald-50 rounded-lg">
                <p className="text-[10px] text-slate-500">Median Wage</p>
                <p className="text-sm font-bold text-emerald-600">₹{formatNumber(selectedSkill.medianWage)}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${selectedSkill.wageGrowth > 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                <p className="text-[10px] text-slate-500">Wage Growth</p>
                <p className={`text-sm font-bold ${selectedSkill.wageGrowth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {selectedSkill.wageGrowth > 0 ? '+' : ''}{selectedSkill.wageGrowth}%
                </p>
              </div>
            </div>
          </Card>

          {/* Demand vs Supply Trend Chart */}
          <Card padding="md" className="bg-white border-slate-200">
            <CardTitle>Demand vs Supply Trend — {selectedSkill.skill}</CardTitle>
            <div className="h-64 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedSkill.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} formatter={(v: any) => formatNumber(Number(v))} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Area type="monotone" dataKey="demand" name="Demand" stroke="#ef4444" fill="#fecaca" fillOpacity={0.4} />
                  <Area type="monotone" dataKey="supply" name="Supply" stroke="#22c55e" fill="#bbf7d0" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Alerts */}
          {selectedSkill.trend === 'emerging' && (
            <Card padding="md" className="bg-purple-50 border-purple-200">
              <div className="flex items-start gap-2">
                <Sparkles size={16} className="text-purple-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-purple-700">🚀 Emerging Skill Alert</p>
                  <p className="text-[10px] text-purple-600 mt-1">
                    {selectedSkill.skill} shows {selectedSkill.growthRate}% annual growth with supply gap of {formatNumber(selectedSkill.currentDemand - selectedSkill.monthlyData[selectedSkill.monthlyData.length - 1].supply)}.
                    Consider prioritizing training capacity expansion.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {selectedSkill.trend === 'declining' && (
            <Card padding="md" className="bg-red-50 border-red-200">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-red-700">⚠ Declining Skill Warning</p>
                  <p className="text-[10px] text-red-600 mt-1">
                    {selectedSkill.skill} demand is declining at {selectedSkill.growthRate}% annually.
                    Consider redirecting training capacity toward emerging skills.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
