'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { programOutcomes, type ProgramOutcome, type OutcomeStage } from '@/data/mockOutcomeTracking';
import { formatNumber, formatCurrency } from '@/lib/utils';
import {
  GitBranch,
  TrendingUp,
  Award,
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  IndianRupee,
  ShieldCheck,
  Download,
  Filter,
  ArrowRight,
  AlertCircle,
  Building2,
  Calendar,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Cell
} from 'recharts';

export default function OutcomeTrackingPage() {
  const { showToast } = useApp();

  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedProgram, setSelectedProgram] = useState<ProgramOutcome>(programOutcomes[0]);

  const sectors = useMemo(() => ['All', ...Array.from(new Set(programOutcomes.map(p => p.sector)))], []);
  const districts = useMemo(() => ['All', ...Array.from(new Set(programOutcomes.map(p => p.district)))], []);

  // Filtered programs
  const filteredPrograms = useMemo(() => {
    return programOutcomes.filter(p => {
      const matchSector = selectedSector === 'All' || p.sector === selectedSector;
      const matchDistrict = selectedDistrict === 'All' || p.district === selectedDistrict;
      return matchSector && matchDistrict;
    });
  }, [selectedSector, selectedDistrict]);

  // Aggregate statewide numbers
  const totalEnrolled = filteredPrograms.reduce((sum, p) => sum + p.totalEnrolled, 0);
  const totalCertified = filteredPrograms.reduce((sum, p) => {
    const certStage = p.stages.find(s => s.stage === 'Certified');
    return sum + (certStage ? certStage.count : 0);
  }, 0);
  const totalPlaced = filteredPrograms.reduce((sum, p) => {
    const placeStage = p.stages.find(s => s.stage === 'Placed');
    return sum + (placeStage ? placeStage.count : 0);
  }, 0);
  const totalRetained180 = filteredPrograms.reduce((sum, p) => {
    const retStage = p.stages.find(s => s.stage === '180-Day Retained');
    return sum + (retStage ? retStage.count : 0);
  }, 0);

  const avgPlacementRate = totalEnrolled > 0 ? Math.round((totalPlaced / totalEnrolled) * 100) : 0;
  const avgCertificationRate = totalEnrolled > 0 ? Math.round((totalCertified / totalEnrolled) * 100) : 0;
  const avg180RetentionRate = totalPlaced > 0 ? Math.round((totalRetained180 / totalPlaced) * 100) : 0;

  // Aggregate funnel stages
  const aggregatedFunnel = useMemo(() => {
    const stageNames = [
      'Enrolled',
      'Completed Training',
      'Assessed',
      'Certified',
      'Placed',
      '90-Day Retained',
      '180-Day Retained'
    ];

    return stageNames.map(name => {
      const totalForStage = filteredPrograms.reduce((sum, p) => {
        const found = p.stages.find(s => s.stage === name);
        return sum + (found ? found.count : 0);
      }, 0);

      const pctOfEnrolled = totalEnrolled > 0 ? Math.round((totalForStage / totalEnrolled) * 100) : 0;

      return {
        stage: name,
        count: totalForStage,
        pct: pctOfEnrolled,
      };
    });
  }, [filteredPrograms, totalEnrolled]);

  const handleExport = () => {
    showToast('Exporting State Skill Outcome & Retention Audit Report (PDF/Excel)...', 'info');
  };

  return (
    <DashboardLayout
      role="government"
      title="Programme & Outcome Tracking"
      subtitle="End-to-end lifecycle verification: Enrolment → Certification → Placement → 90/180-Day Job Retention"
    >
      {/* High-Level Outcome KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Enrolled Trainees</span>
            <Users size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatNumber(totalEnrolled)}</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            <span>Aadhaar-verified candidates</span>
          </div>
        </Card>

        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Certification Rate</span>
            <Award size={18} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">{avgCertificationRate}%</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-700">
            <span>{formatNumber(totalCertified)} certified by Sector Councils</span>
          </div>
        </Card>

        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Job Placement Rate</span>
            <Briefcase size={18} className="text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-indigo-600">{avgPlacementRate}%</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-indigo-700">
            <span>{formatNumber(totalPlaced)} verified hires with offer letters</span>
          </div>
        </Card>

        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">180-Day Retention Benchmark</span>
            <TrendingUp size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">{avg180RetentionRate}%</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            <span>Verified via monthly EPFO contribution</span>
          </div>
        </Card>
      </div>

      {/* Filter and Export Toolbar */}
      <Card padding="sm" className="bg-white border-slate-200 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1 mr-2">
              <Filter size={14} className="text-blue-600" /> Filter Outcomes:
            </span>

            {/* Sector Filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium">Sector:</span>
              <select
                aria-label="Filter by Sector"
                value={selectedSector}
                onChange={e => setSelectedSector(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {sectors.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All Sectors' : s}</option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium">District:</span>
              <select
                aria-label="Filter by District"
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {districts.map(d => (
                  <option key={d} value={d}>{d === 'All' ? 'All Districts' : d}</option>
                ))}
              </select>
            </div>

            {(selectedSector !== 'All' || selectedDistrict !== 'All') && (
              <button
                onClick={() => {
                  setSelectedSector('All');
                  setSelectedDistrict('All');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline ml-2"
              >
                Reset
              </button>
            )}
          </div>

          <Button size="sm" variant="outline" onClick={handleExport} className="text-xs flex items-center gap-1.5">
            <Download size={13} /> Export Detailed Outcomes (CSV/PDF)
          </Button>
        </div>
      </Card>

      {/* Main Funnel Pipeline Card */}
      <Card padding="md" className="bg-white border-slate-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Statewide Skill-to-Retention Pipeline Funnel
            </CardTitle>
            <p className="text-xs text-slate-500">
              Dropoff rate at each key transition milestone from enrolment to 6 months post-placement
            </p>
          </div>
          <Badge variant="info">Automated Portal &amp; EPFO Sync</Badge>
        </div>

        {/* Funnel Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 pt-2 pb-4">
          {aggregatedFunnel.map((item, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === aggregatedFunnel.length - 1;
            return (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Step {idx + 1}
                  </span>
                  <p className="text-xs font-bold text-slate-900 line-clamp-1">{item.stage}</p>
                </div>

                <div className="mt-3">
                  <p className="text-lg font-bold text-blue-700">{formatNumber(item.count)}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span>Funnel Yield:</span>
                    <span className="font-semibold text-slate-800">{item.pct}%</span>
                  </div>
                  <ProgressBar
                    value={item.pct}
                    color={idx < 4 ? 'brand' : idx === 4 ? 'success' : 'brand'}
                    className="mt-1.5 h-1.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Detailed Program Benchmarking & Program Drill-Down */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Program Outcomes Table */}
        <Card padding="md" className="bg-white border-slate-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">Program Performance Benchmarking</CardTitle>
              <p className="text-xs text-slate-500">Click any program to drill down into batch lifecycle metrics</p>
            </div>
            <Badge variant="neutral">{filteredPrograms.length} Programs Monitored</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Program &amp; Provider</th>
                  <th className="py-2.5 px-3">Sector</th>
                  <th className="py-2.5 px-3 text-right">Enrolled</th>
                  <th className="py-2.5 px-3 text-right">Placement</th>
                  <th className="py-2.5 px-3 text-right">90d Ret.</th>
                  <th className="py-2.5 px-3 text-right">Median Wage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPrograms.map((prog) => {
                  const isSelected = selectedProgram.programId === prog.programId;
                  const placedStage = prog.stages.find(s => s.stage === 'Placed');
                  const placementRate = placedStage ? Math.round((placedStage.count / prog.totalEnrolled) * 100) : 0;

                  return (
                    <tr
                      key={prog.programId}
                      onClick={() => setSelectedProgram(prog)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/80 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-900">{prog.programName}</p>
                        <p className="text-[10px] text-slate-500">{prog.provider} • {prog.district}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium">
                          {prog.sector}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-slate-900">
                        {formatNumber(prog.totalEnrolled)}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`font-bold ${placementRate >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {placementRate}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-slate-800">
                        {prog.retention90d}%
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">
                        {formatCurrency(prog.medianWage)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Selected Program Drill-Down Details */}
        <Card padding="md" className="bg-white border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Program Deep Dive
                </span>
                <h3 className="font-bold text-sm text-slate-900 leading-snug mt-0.5">
                  {selectedProgram.programName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedProgram.provider} ({selectedProgram.batchYear})
                </p>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-slate-50 rounded-lg text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Avg Time to Job:</span>
                <span className="font-bold text-slate-800">{selectedProgram.avgTimeToPlacement} days</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">6-Month Wage Growth:</span>
                <span className="font-bold text-emerald-600">+{selectedProgram.wageGrowth}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">90-Day Retention:</span>
                <span className="font-bold text-blue-700">{selectedProgram.retention90d}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">180-Day Retention:</span>
                <span className="font-bold text-indigo-700">{selectedProgram.retention180d}%</span>
              </div>
            </div>

            {/* Stage Drop-off Breakdown */}
            <div className="space-y-2 mt-4">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                Batch Lifecycle Stages
              </span>
              {selectedProgram.stages.map((st, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                  <span className="text-slate-600">{st.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{formatNumber(st.count)}</span>
                    <span className="text-[10px] text-slate-400">({st.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200">
            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
              onClick={() => showToast(`Generating full batch audit dossier for ${selectedProgram.programName}`, 'info')}
            >
              Generate Program Performance Dossier
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
