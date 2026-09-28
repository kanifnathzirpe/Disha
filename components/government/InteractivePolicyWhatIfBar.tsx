'use client';

import React, { useState } from 'react';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Sliders, TrendingUp, IndianRupee, Sparkles, Check, ArrowRight, ShieldAlert, Award } from 'lucide-react';
import Link from 'next/link';

export function InteractivePolicyWhatIfBar() {
  const { showToast, savePolicyScenario } = useApp();

  const [budgetCr, setBudgetCr] = useState<number>(18);
  const [selectedSector, setSelectedSector] = useState<string>('Manufacturing / EV');
  const [targetDistrict, setTargetDistrict] = useState<string>('Pune & Marathwada');
  const [stipendPerMonth, setStipendPerMonth] = useState<number>(3000);

  // Dynamic calculations
  const projectedPlacement = Math.round(budgetCr * 340 + (stipendPerMonth / 1000) * 120);
  const projectedRetentionRate = Math.min(88, Math.round(62 + (stipendPerMonth / 1000) * 4));
  const estimatedRoi = (2.2 + (budgetCr / 50) * 1.5).toFixed(1);
  const medianWageProjected = 18500 + (selectedSector === 'Manufacturing / EV' ? 3500 : selectedSector === 'IT / ITES' ? 5500 : 2000);

  const handleApplyScenario = () => {
    savePolicyScenario({
      name: `${targetDistrict} ${selectedSector} Uplift`,
      budget: `₹${budgetCr} Cr`,
      projectedPlacement: `+${formatNumber(projectedPlacement)}`,
      roi: `${estimatedRoi}x`,
      date: new Date().toISOString().split('T')[0],
    });
    showToast(`Policy scenario applied! Allocated ₹${budgetCr} Cr to ${selectedSector} in ${targetDistrict}. Projected: +${formatNumber(projectedPlacement)} placements.`, 'success');
  };

  return (
    <Card padding="md" className="bg-gradient-to-br from-white via-indigo-50/20 to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40 border-indigo-200/80 dark:border-indigo-900/50 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="p-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
              <Sliders size={14} />
            </span>
            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              Interactive State Policy What-If Simulator
            </span>
          </div>
          <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
            Rapid Capacity &amp; Placement Impact Forecaster
          </CardTitle>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Adjust state funding and stipend variables to project real-time employment yield, wage progression, and public ROI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="info" pulse={true}>
            Real-time Algorithmic Model
          </Badge>
          <Link href="/government/simulator">
            <Button size="sm" variant="outline" className="text-xs h-7">
              Full Simulator <ArrowRight size={11} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Interactive Controls & Projected Outcome Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Sliders & Selectors (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5 p-3.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Target District Cluster:
              </label>
              <select
                aria-label="Target District Cluster"
                value={targetDistrict}
                onChange={e => setTargetDistrict(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>Pune &amp; Marathwada</option>
                <option>Mumbai &amp; Thane Industrial Axis</option>
                <option>Vidarbha (Nagpur/Amravati)</option>
                <option>Western Maharashtra (Kolhapur/Solapur)</option>
                <option>All 36 Districts Statewide</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Priority Sector Track:
              </label>
              <select
                aria-label="Priority Sector Track"
                value={selectedSector}
                onChange={e => setSelectedSector(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>Manufacturing / EV</option>
                <option>IT / ITES &amp; Electronics</option>
                <option>Healthcare &amp; Allied Tech</option>
                <option>Green Energy / Solar</option>
              </select>
            </div>
          </div>

          {/* Budget Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Budget Reallocation:</span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400 font-mono text-sm">
                ₹{budgetCr} Crores
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={budgetCr}
              onChange={e => setBudgetCr(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>₹5 Cr (Pilot)</span>
              <span>₹30 Cr (Standard)</span>
              <span>₹60 Cr (Statewide Surge)</span>
            </div>
          </div>

          {/* Monthly Trainee Stipend Support */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Trainee Retention Stipend:</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                ₹{stipendPerMonth.toLocaleString()}/mo
              </span>
            </div>
            <input
              type="range"
              min={1500}
              max={6000}
              step={500}
              value={stipendPerMonth}
              onChange={e => setStipendPerMonth(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>₹1,500/mo (Basic DBT)</span>
              <span>₹3,500/mo (Recommended)</span>
              <span>₹6,000/mo (Full OJT Support)</span>
            </div>
          </div>
        </div>

        {/* Projected Real-Time Outcomes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full p-4 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-blue-800/80 pb-2">
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">
                Simulated Impact Forecast
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                {estimatedRoi}x State ROI
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <span className="text-[10px] text-blue-200 block">Projected Placements</span>
                <span className="text-2xl font-extrabold text-white font-display">
                  +{formatNumber(projectedPlacement)}
                </span>
                <span className="text-[10px] text-emerald-300 block">candidates employed</span>
              </div>

              <div>
                <span className="text-[10px] text-blue-200 block">180D Retention Rate</span>
                <span className="text-2xl font-extrabold text-amber-300 font-display">
                  {projectedRetentionRate}%
                </span>
                <span className="text-[10px] text-amber-200 block">EPFO verified stability</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-blue-200">Median Monthly Wage:</span>
                <span className="font-bold text-white">{formatCurrency(medianWageProjected)}/mo</span>
              </div>
              <div className="flex items-center justify-between text-[11px] mt-1">
                <span className="text-blue-200">Cost Per Placement:</span>
                <span className="font-bold text-white">₹{Math.round((budgetCr * 10000000) / projectedPlacement).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleApplyScenario}
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow-md"
          >
            <Check size={14} className="mr-1.5 stroke-[3]" />
            Save &amp; Commit Policy Scenario
          </Button>
        </div>
      </div>
    </Card>
  );
}
