'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';
import { 
  Users, 
  ShieldCheck, 
  Calendar, 
  Download, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export default function EmployerRetentionPage() {
  const { showToast } = useApp();
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const cohortData = [
    { milestone: 'Day 15', company: 100, stateAvg: 96 },
    { milestone: 'Day 30', company: 98, stateAvg: 91 },
    { milestone: 'Day 60', company: 94, stateAvg: 82 },
    { milestone: 'Day 90', company: 88.9, stateAvg: 73.8 },
    { milestone: 'Day 120', company: 83, stateAvg: 68 },
    { milestone: 'Day 180', company: 78.4, stateAvg: 62.5 },
  ];

  const employees = [
    {
      id: 'RET-001',
      name: 'Rahul Sharma',
      uan: '101239847192',
      trade: 'CNC Technician',
      joining: '12 May 2026',
      daysEmployed: 138,
      milestone: '90D Completed',
      wage: 22500,
      subsidy: '₹18,000',
      subsidyStatus: 'Disbursed',
    },
    {
      id: 'RET-002',
      name: 'Vikram Shinde',
      uan: '101847192841',
      trade: 'CNC Operator',
      joining: '01 June 2026',
      daysEmployed: 118,
      milestone: '90D Completed',
      wage: 21000,
      subsidy: '₹18,000',
      subsidyStatus: 'Disbursed',
    },
    {
      id: 'RET-003',
      name: 'Snehal Pawar',
      uan: '101748291048',
      trade: 'Quality Inspector',
      joining: '15 June 2026',
      daysEmployed: 104,
      milestone: '90D Completed',
      wage: 23000,
      subsidy: '₹18,000',
      subsidyStatus: 'Claim Eligible',
    },
    {
      id: 'RET-004',
      name: 'Ganesh More',
      uan: '101938472910',
      trade: 'Assembly Technician',
      joining: '10 July 2026',
      daysEmployed: 79,
      milestone: '60D Completed (Active)',
      wage: 20000,
      subsidy: '₹12,000',
      subsidyStatus: 'In Review',
    },
    {
      id: 'RET-005',
      name: 'Pooja Kulkarni',
      uan: '101648294719',
      trade: 'AutoCAD Draughtsman',
      joining: '01 Aug 2026',
      daysEmployed: 57,
      milestone: '30D Completed (Active)',
      wage: 21500,
      subsidy: '₹6,000',
      subsidyStatus: 'In Review',
    },
  ];

  const handleClaimSubsidy = (id: string, name: string) => {
    setClaimingId(id);
    setTimeout(() => {
      setClaimingId(null);
      showToast(`State Wage Subsidy claim initiated for ${name} (DBT Ref #MH-SUB-${Math.floor(10000 + Math.random() * 90000)})`, 'success');
    }, 600);
  };

  const handleExport = () => {
    showToast('Retention compliance report downloaded as CSV', 'info');
  };

  return (
    <DashboardLayout
      role="employer"
      title="Workforce Retention &amp; Subsidies"
      subtitle="Track post-placement retention milestones and claim Maharashtra state training incentive subsidies"
    >
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>90-Day Retention</span>
            <span className="text-emerald-600 font-bold">+15.1% vs State</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">88.9%</p>
          <div className="mt-2">
            <ProgressBar value={88.9} size="sm" color="success" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Target: 70.0% statutory benchmark</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>180-Day Retention</span>
            <span className="text-blue-600 font-bold">+15.9% vs State</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">78.4%</p>
          <div className="mt-2">
            <ProgressBar value={78.4} size="sm" color="brand" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Target: 60.0% statutory benchmark</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Subsidized Hires</span>
            <Badge variant="info" size="sm">EPFO Verified</Badge>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">9 Trainees</p>
          <p className="text-[11px] text-slate-500 mt-2">Placed from ITI Aundh &amp; Pimpri</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total State Subsidy</span>
            <Badge variant="success" size="sm">DBT</Badge>
          </div>
          <p className="text-2xl font-bold text-emerald-600">₹1,62,000</p>
          <p className="text-[11px] text-slate-500 mt-2">₹54,000 pending disbursement</p>
        </Card>
      </div>

      {/* Retention Chart */}
      <Card padding="md" className="mb-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <CardTitle>Cohort Retention Curve vs Maharashtra ITI Benchmark</CardTitle>
            <p className="text-xs text-slate-500 mt-1">Comparison of ABC Manufacturing retention against state-wide manufacturing cluster</p>
          </div>
          <Button size="sm" variant="outline" onClick={handleExport} className="self-start sm:self-auto">
            <FileSpreadsheet size={14} className="mr-1.5" />
            Export Compliance CSV
          </Button>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cohortData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="milestone" tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis domain={[50, 100]} unit="%" tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip 
                formatter={(val: any) => [`${val}%`, '']}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '12px' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="company" name="ABC Manufacturing Retention %" stroke="#123B6D" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="stateAvg" name="Maharashtra State ITI Average %" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Employee Retention Table */}
      <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>Trainee Retention Ledger &amp; Subsidy Claims</CardTitle>
            <p className="text-xs text-slate-500">Government of Maharashtra Apprentice &amp; Outcome Subsidy Scheme</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-600 dark:text-slate-300">
                <th className="p-3">Candidate / Employee</th>
                <th className="p-3">EPFO UAN</th>
                <th className="p-3">Trade</th>
                <th className="p-3">Joining Date</th>
                <th className="p-3">Active Days</th>
                <th className="p-3">Retention Milestone</th>
                <th className="p-3">Subsidy Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-3">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{emp.name}</p>
                    <span className="text-[10px] text-slate-500">{emp.id}</span>
                  </td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-300">{emp.uan}</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-medium">{emp.trade}</td>
                  <td className="p-3 text-slate-500">{emp.joining}</td>
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-200">{emp.daysEmployed} days</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded text-[11px]">
                      <CheckCircle2 size={12} />
                      {emp.milestone}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{emp.subsidy}</td>
                  <td className="p-3">
                    <Badge 
                      variant={
                        emp.subsidyStatus === 'Disbursed' ? 'success' :
                        emp.subsidyStatus === 'Claim Eligible' ? 'info' :
                        'warning'
                      } 
                      size="sm"
                    >
                      {emp.subsidyStatus}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    {emp.subsidyStatus === 'Claim Eligible' ? (
                      <Button 
                        size="sm" 
                        variant="primary"
                        disabled={claimingId === emp.id}
                        onClick={() => handleClaimSubsidy(emp.id, emp.name)}
                      >
                        {claimingId === emp.id ? 'Claiming...' : 'Claim Subsidy'}
                      </Button>
                    ) : emp.subsidyStatus === 'Disbursed' ? (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center justify-end gap-1">
                        <CheckCircle2 size={12} /> Disbursed
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">In Review</span>
                    )}
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
