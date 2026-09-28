'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { 
  TrendingUp, 
  Send, 
  Building2, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';

interface DemandItem {
  id: string;
  trade: string;
  headcount: number;
  district: string;
  wage: string;
  timeframe: string;
  status: string;
  statusVariant: 'success' | 'info' | 'warning' | 'error';
  matchedTrainees: number;
}

export default function SkillDemandFeedbackPage() {
  const { showToast } = useApp();
  const [trade, setTrade] = useState('CNC Programming & 5-Axis Turning');
  const [headcount, setHeadcount] = useState(25);
  const [district, setDistrict] = useState('Pune (Chakan Auto Cluster)');
  const [timeframe, setTimeframe] = useState('Q4 2026 (Oct–Dec)');
  const [offeredWage, setOfferedWage] = useState('₹22,000–₹26,000');
  const [submitting, setSubmitting] = useState(false);

  const [activeDemands, setActiveDemands] = useState<DemandItem[]>([
    {
      id: 'DEM-2026-081',
      trade: 'CNC Programming & Turning',
      headcount: 25,
      district: 'Pune',
      wage: '₹22,000–₹26,000',
      timeframe: 'Q4 2026',
      status: 'Matched with ITI Aundh',
      statusVariant: 'success',
      matchedTrainees: 18,
    },
    {
      id: 'DEM-2026-049',
      trade: 'EV Battery Pack Assembler',
      headcount: 15,
      district: 'Pune',
      wage: '₹20,000–₹24,000',
      timeframe: 'Q1 2027',
      status: 'Batch In Training',
      statusVariant: 'info' as const,
      matchedTrainees: 15,
    },
    {
      id: 'DEM-2026-012',
      trade: 'Robotics Welding Tech',
      headcount: 10,
      district: 'Nashik',
      wage: '₹25,000–₹32,000',
      timeframe: 'Q2 2027',
      status: 'Shortage Detected (High Priority)',
      statusVariant: 'error' as const,
      matchedTrainees: 4,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const newDemand = {
        id: `DEM-2026-${Math.floor(100 + Math.random() * 900)}`,
        trade,
        headcount: Number(headcount),
        district: district.split(' ')[0],
        wage: offeredWage,
        timeframe,
        status: 'Under State Match Review',
        statusVariant: 'warning' as const,
        matchedTrainees: 0,
      };
      setActiveDemands([newDemand, ...activeDemands]);
      showToast(`Skill demand projection for ${headcount} ${trade} logged with Maharashtra Skill Commission`, 'success');
    }, 600);
  };

  return (
    <DashboardLayout
      role="employer"
      title="Employer Skill Demand Projections"
      subtitle="Signal upcoming hiring requirements to reserve upcoming graduating batches and guide state seat allocations"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demand Form */}
        <div className="lg:col-span-1 space-y-6">
          <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardTitle>Submit Hiring Requirement</CardTitle>
            <p className="text-xs text-slate-500 mb-4">
              State ITIs prioritize trainee seat expansions based on verified industry demand submissions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Required Skill / Trade
                </label>
                <select 
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  <option>CNC Programming &amp; 5-Axis Turning</option>
                  <option>EV Diagnostics &amp; Battery Assembly</option>
                  <option>PLC &amp; Industrial SCADA</option>
                  <option>Robotic Arm Welding</option>
                  <option>Solar PV Rooftop Technician</option>
                  <option>Mechatronics Operator</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Projected Headcount Needed
                </label>
                <input 
                  type="number"
                  min={1}
                  max={500}
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Plant Location / District
                </label>
                <select 
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  <option>Pune (Chakan Auto Cluster)</option>
                  <option>Pune (Talegaon / Bhosari)</option>
                  <option>Nashik (Ambad MIDC)</option>
                  <option>Chhatrapati Sambhajinagar (Shendra MIDC)</option>
                  <option>Nagpur (MIHAN SEZ)</option>
                  <option>Thane / Navi Mumbai Industrial Belt</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Target Hiring Quarter
                </label>
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  <option>Q4 2026 (Oct–Dec)</option>
                  <option>Q1 2027 (Jan–Mar)</option>
                  <option>Q2 2027 (Apr–Jun)</option>
                  <option>Q3 2027 (Jul–Sep)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Starting Monthly Wage Offer
                </label>
                <input 
                  type="text"
                  value={offeredWage}
                  onChange={(e) => setOfferedWage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                />
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full" disabled={submitting}>
                <Send size={14} className="mr-1.5" />
                {submitting ? 'Submitting...' : 'Submit Demand Projection'}
              </Button>
            </form>
          </Card>
        </div>

        {/* Demand Ledger */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle>Active Demand Forecasts &amp; Pipeline Matching</CardTitle>
                <p className="text-xs text-slate-500">Live synchronization with DVET institutional training calendar</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-600 dark:text-slate-300">
                    <th className="p-3">Reference ID</th>
                    <th className="p-3">Trade / Specialization</th>
                    <th className="p-3">Headcount</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Target Timeframe</th>
                    <th className="p-3">State Action Status</th>
                    <th className="p-3 text-right">Matched Trainees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {activeDemands.map((dem) => (
                    <tr key={dem.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <td className="p-3 font-mono font-semibold text-slate-700 dark:text-slate-300">{dem.id}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{dem.trade}</td>
                      <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">{dem.headcount} seats</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{dem.district}</td>
                      <td className="p-3 text-slate-500">{dem.timeframe}</td>
                      <td className="p-3">
                        <Badge variant={dem.statusVariant} size="sm">
                          {dem.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">
                        {dem.matchedTrainees} / {dem.headcount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card padding="md" className="bg-emerald-50 dark:bg-slate-800/80 border-emerald-200 dark:border-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Guaranteed Campus Placement Day</p>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-200 mt-1 leading-relaxed">
                    Employers pledging 20+ verified certified trainee positions receive exclusive first-round campus interview slots 30 days before trade completion.
                  </p>
                </div>
              </div>
            </Card>

            <Card padding="md" className="bg-amber-50 dark:bg-slate-800/80 border-amber-200 dark:border-slate-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-xs font-bold text-amber-900 dark:text-amber-300">State Priority Skills Alert</p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-200 mt-1 leading-relaxed">
                    Robotics Welding and EV Powertrain Diagnostics currently qualify for 100% state-funded internship stipend reimbursement under Scheme MH-TRAIN-26.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
