'use client';

import React, { useState } from 'react';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { Sparkles, TrendingUp, Award, Briefcase, Plus, Check, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

interface UpgradeSkill {
  id: string;
  name: string;
  category: string;
  matchUplift: number; // percentage boost
  salaryUplift: number; // monthly in INR
  duration: string;
}

const availableUpgrades: UpgradeSkill[] = [
  { id: 'cam-01', name: 'MasterCAM 3D Programming', category: 'Software', matchUplift: 6, salaryUplift: 3500, duration: '3 weeks' },
  { id: 'cnc-02', name: '5-Axis Turning & Milling', category: 'Machining', matchUplift: 8, salaryUplift: 4500, duration: '4 weeks' },
  { id: 'iot-03', name: 'Industry 4.0 / Smart Sensors', category: 'Automation', matchUplift: 5, salaryUplift: 2500, duration: '2 weeks' },
  { id: 'gdt-04', name: 'Advanced GD&T Metrology', category: 'Quality', matchUplift: 4, salaryUplift: 2000, duration: '1 week' },
];

export function InteractiveReadinessSimulator() {
  const { showToast } = useApp();
  const [selectedIds, setSelectedIds] = useState<string[]>(['cam-01']);

  const baseReadiness = 78;
  const baseSalary = 24500;
  const baseJobs = 8;

  const totalMatchBoost = selectedIds.reduce((sum, id) => {
    const item = availableUpgrades.find(u => u.id === id);
    return sum + (item ? item.matchUplift : 0);
  }, 0);

  const totalSalaryBoost = selectedIds.reduce((sum, id) => {
    const item = availableUpgrades.find(u => u.id === id);
    return sum + (item ? item.salaryUplift : 0);
  }, 0);

  const calculatedReadiness = Math.min(98, baseReadiness + totalMatchBoost);
  const calculatedSalary = baseSalary + totalSalaryBoost;
  const calculatedJobs = baseJobs + selectedIds.length * 4;

  const toggleSkill = (id: string, name: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
      showToast(`Removed ${name} from projection`, 'info');
    } else {
      setSelectedIds([...selectedIds, id]);
      showToast(`Added ${name}! Projected wage increased by +₹${availableUpgrades.find(u => u.id === id)?.salaryUplift}`, 'success');
    }
  };

  return (
    <Card padding="md" className="bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 border-blue-200/80 dark:border-blue-900/40 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="p-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Sparkles size={14} />
            </span>
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              Interactive Career &amp; Wage Projection Engine
            </span>
          </div>
          <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
            Simulate Your Employability &amp; Wage Growth
          </CardTitle>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Toggle high-demand micro-credentials to see live impact on your readiness score and market wage.
          </p>
        </div>

        <Badge variant={calculatedReadiness >= 90 ? 'success' : 'info'} pulse={true}>
          {calculatedReadiness}% Job Readiness
        </Badge>
      </div>

      {/* Live Projected Metrics Counter Bar */}
      <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs mb-4">
        <div className="text-center">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 uppercase block">
            Readiness Score
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-display">
            {calculatedReadiness}%
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
            +{totalMatchBoost}% Boost
          </span>
        </div>

        <div className="text-center border-x border-slate-100 dark:border-slate-700/80">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 uppercase block">
            Projected Monthly Wage
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
            {formatCurrency(calculatedSalary)}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
            +{formatCurrency(totalSalaryBoost)}/mo
          </span>
        </div>

        <div className="text-center">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 uppercase block">
            Matched Vacancies
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
            {calculatedJobs}
          </span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold block">
            in Pune &amp; Chakan
          </span>
        </div>
      </div>

      {/* Interactive Micro-credential Selector Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
          Click to add micro-credentials to your simulated passport:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availableUpgrades.map(skill => {
            const isSelected = selectedIds.includes(skill.id);
            return (
              <button
                key={skill.id}
                onClick={() => toggleSkill(skill.id, skill.name)}
                className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-100 shadow-xs'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs">{skill.name}</span>
                    <span className="text-[10px] text-slate-400">({skill.duration})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">+{skill.matchUplift}% Match</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+{formatCurrency(skill.salaryUplift)}/mo</span>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-300 dark:border-slate-600 text-slate-400'
                }`}>
                  {isSelected ? <Check size={12} className="stroke-[3]" /> : <Plus size={12} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 text-[11px]">
          Government subsidy pays 100% of course fees for NCVT Level 4 holders.
        </span>
        <Link href="/trainee/opportunities">
          <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold h-7 px-3">
            View Matched Jobs ({calculatedJobs}) <ArrowRight size={12} className="ml-1" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
