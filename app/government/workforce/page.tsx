'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, Tabs } from '@/components/ui';
import { DataTable } from '@/components/tables';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  IndianRupee,
  Activity,
  CheckCircle,
  Clock,
  ArrowRight,
  Target,
  MapPin,
  GraduationCap
} from 'lucide-react';

export default function WorkforcePage() {
  const [activeTab, setActiveTab] = useState('outcomes');

  const workforceStats = {
    totalTrainees: 84320,
    employed: 57420,
    unemployed: 26900,
    retained90d: 38945,
    retained180d: 31820,
    avgWageGrowth: 24,
  };

  const cohortData = [
    { cohort: '2025 Cohort', trainees: 45000, placement: 72, retention90d: 65, retention180d: 58, avgWage: 16500 },
    { cohort: '2026 Cohort', trainees: 39320, placement: 68, retention90d: 71, retention180d: 69, avgWage: 19500 },
  ];

  const outcomeColumns = [
    { 
      key: 'traineeId', 
      label: 'Trainee ID', 
      sortable: true,
      render: (v: unknown) => <span className="font-mono text-xs">{v as string}</span>
    },
    { 
      key: 'name', 
      label: 'Name', 
      sortable: true,
      render: (v: unknown) => <span className="font-medium">{v as string}</span>
    },
    {
      key: 'district',
      label: 'District',
      sortable: true,
      render: (v: unknown) => {
        return (
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span className="text-xs">{v as string}</span>
          </div>
        );
      },
    },
    {
      key: 'program',
      label: 'Program',
      sortable: true,
      render: (v: unknown) => <span className="text-xs">{v as string}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (v: unknown) => {
        const status = v as string;
        return (
          <Badge 
            variant={status === 'employed' ? 'success' : status === 'seeking' ? 'warning' : 'info'} 
            size="sm"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      key: 'placementDate',
      label: 'Placement Date',
      sortable: true,
      render: (v: unknown) => <span className="text-xs">{v as string}</span>,
    },
    {
      key: 'currentWage',
      label: 'Current Wage',
      sortable: true,
      render: (v: unknown) => formatCurrency(v as number),
    },
    {
      key: 'wageGrowth',
      label: 'Wage Growth',
      sortable: true,
      render: (v: unknown) => {
        const growth = v as number;
        return (
          <div className="flex items-center gap-1">
            <TrendingUp size={12} className="text-status-success" />
            <span className="text-xs font-medium">+{growth}%</span>
          </div>
        );
      },
    },
  ];

  const traineeOutcomes = [
    { traineeId: 'TRN-001', name: 'Amit Patil', district: 'Pune', program: 'EV Diagnostics', status: 'employed', placementDate: 'May 2026', currentWage: 22000, wageGrowth: 24 },
    { traineeId: 'TRN-002', name: 'Sneha Kulkarni', district: 'Nashik', program: 'CNC Programming', status: 'employed', placementDate: 'Jun 2026', currentWage: 18500, wageGrowth: 18 },
    { traineeId: 'TRN-003', name: 'Rajesh Deshmukh', district: 'Nagpur', program: 'Industrial Automation', status: 'employed', placementDate: 'Apr 2026', currentWage: 19500, wageGrowth: 22 },
    { traineeId: 'TRN-004', name: 'Priya Sharma', district: 'Mumbai', program: 'Solar Installation', status: 'seeking', placementDate: '-', currentWage: 0, wageGrowth: 0 },
    { traineeId: 'TRN-005', name: 'Vikram Joshi', district: 'Pune', program: 'PLC', status: 'employed', placementDate: 'Jul 2026', currentWage: 21000, wageGrowth: 20 },
  ];

  const employmentColumns = [
    { 
      key: 'traineeId', 
      label: 'Trainee ID', 
      sortable: true,
      render: (v: unknown) => <span className="font-mono text-xs">{v as string}</span>
    },
    { 
      key: 'name', 
      label: 'Name', 
      sortable: true,
      render: (v: unknown) => <span className="font-medium">{v as string}</span>
    },
    {
      key: 'employer',
      label: 'Employer',
      sortable: true,
      render: (v: unknown) => <span className="text-xs">{v as string}</span>,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (v: unknown) => <span className="text-xs">{v as string}</span>,
    },
    {
      key: 'startDate',
      label: 'Start Date',
      sortable: true,
      render: (v: unknown) => <span className="text-xs">{v as string}</span>,
    },
    {
      key: 'currentWage',
      label: 'Current Wage',
      sortable: true,
      render: (v: unknown) => formatCurrency(v as number),
    },
    {
      key: 'verification',
      label: 'Verification',
      sortable: true,
      render: (v: unknown) => {
        const status = v as string;
        return (
          <Badge 
            variant={status === 'verified' ? 'success' : status === 'pending' ? 'warning' : 'error'} 
            size="sm"
          >
            {status}
          </Badge>
        );
      },
    },
  ];

  const employmentData = [
    { traineeId: 'TRN-001', name: 'Amit Patil', employer: 'Tata Motors', role: 'EV Technician', startDate: 'May 15, 2026', currentWage: 22000, verification: 'verified' },
    { traineeId: 'TRN-002', name: 'Sneha Kulkarni', employer: 'Mahindra & Mahindra', role: 'CNC Operator', startDate: 'Jun 10, 2026', currentWage: 18500, verification: 'verified' },
    { traineeId: 'TRN-003', name: 'Rajesh Deshmukh', employer: 'Bajaj Auto', role: 'Automation Engineer', startDate: 'Apr 20, 2026', currentWage: 19500, verification: 'verified' },
    { traineeId: 'TRN-005', name: 'Vikram Joshi', employer: 'Force Motors', role: 'PLC Programmer', startDate: 'Jul 5, 2026', currentWage: 21000, verification: 'pending' },
  ];

  const retentionColumns = [
    { 
      key: 'traineeId', 
      label: 'Trainee ID', 
      sortable: true,
      render: (v: unknown) => <span className="font-mono text-xs">{v as string}</span>
    },
    { 
      key: 'name', 
      label: 'Name', 
      sortable: true,
      render: (v: unknown) => <span className="font-medium">{v as string}</span>
    },
    {
      key: 'employer',
      label: 'Employer',
      sortable: true,
      render: (v: unknown) => <span className="text-xs">{v as string}</span>,
    },
    {
      key: 'daysEmployed',
      label: 'Days Employed',
      sortable: true,
      render: (v: unknown) => <span className="text-xs">{v as number} days</span>,
    },
    {
      key: 'retention90dStatus',
      label: '90D Status',
      sortable: true,
      render: (v: unknown) => {
        const status = v as string;
        return (
          <Badge 
            variant={status === 'retained' ? 'success' : 'warning'} 
            size="sm"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      key: 'retention180dStatus',
      label: '180D Status',
      sortable: true,
      render: (v: unknown) => {
        const status = v as string;
        return (
          <Badge 
            variant={status === 'retained' ? 'success' : status === 'pending' ? 'info' : 'warning'} 
            size="sm"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      key: 'wageProgression',
      label: 'Wage Progression',
      sortable: true,
      render: (v: unknown) => {
        const progression = v as number;
        return (
          <div className="flex items-center gap-1">
            <TrendingUp size={12} className="text-status-success" />
            <span className="text-xs font-medium">+{progression}%</span>
          </div>
        );
      },
    },
  ];

  const retentionData = [
    { traineeId: 'TRN-001', name: 'Amit Patil', employer: 'Tata Motors', daysEmployed: 135, retention90dStatus: 'retained', retention180dStatus: 'pending', wageProgression: 15 },
    { traineeId: 'TRN-002', name: 'Sneha Kulkarni', employer: 'Mahindra & Mahindra', daysEmployed: 109, retention90dStatus: 'retained', retention180dStatus: 'pending', wageProgression: 12 },
    { traineeId: 'TRN-003', name: 'Rajesh Deshmukh', employer: 'Bajaj Auto', daysEmployed: 160, retention90dStatus: 'retained', retention180dStatus: 'retained', wageProgression: 18 },
    { traineeId: 'TRN-005', name: 'Vikram Joshi', employer: 'Force Motors', daysEmployed: 84, retention90dStatus: 'pending', retention180dStatus: 'pending', wageProgression: 8 },
  ];

  return (
    <DashboardLayout 
      role="government" 
      title="Workforce Outcomes" 
      subtitle="Track trainee outcomes, employment, retention, and wage progression"
      showDistrictSelector={false}
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Trainees</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Users size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{formatNumber(workforceStats.totalTrainees)}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Employed</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <Briefcase size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">{formatNumber(workforceStats.employed)}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Unemployed</span>
            <div className="w-8 h-8 rounded-lg bg-status-warning-bg flex items-center justify-center">
              <Clock size={16} className="text-status-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-warning">{formatNumber(workforceStats.unemployed)}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">90D Retained</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <CheckCircle size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">{formatNumber(workforceStats.retained90d)}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">180D Retained</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Activity size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{formatNumber(workforceStats.retained180d)}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Avg Wage Growth</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <TrendingUp size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">+{workforceStats.avgWageGrowth}%</p>
        </Card>
      </div>

      {/* Cohort Comparison */}
      <Card padding="md" className="mb-6">
        <CardTitle>Cohort Analysis</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Compare outcomes between 2025 and 2026 cohorts</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cohortData.map((cohort) => (
            <div key={cohort.cohort} className="p-4 border border-border rounded-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-primary">{cohort.cohort}</h3>
                <Badge variant="neutral" size="sm">{formatNumber(cohort.trainees)} trainees</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-text-secondary">Placement:</span>
                  <span className="font-medium ml-1">{cohort.placement}%</span>
                </div>
                <div>
                  <span className="text-text-secondary">90D Retention:</span>
                  <span className="font-medium ml-1">{cohort.retention90d}%</span>
                </div>
                <div>
                  <span className="text-text-secondary">180D Retention:</span>
                  <span className="font-medium ml-1">{cohort.retention180d}%</span>
                </div>
                <div>
                  <span className="text-text-secondary">Avg Wage:</span>
                  <span className="font-medium ml-1">{formatCurrency(cohort.avgWage)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <Tabs
        items={[
          { value: 'outcomes', label: 'Trainee Outcomes' },
          { value: 'employment', label: 'Employment Tracking' },
          { value: 'retention', label: 'Retention & Wage' },
        ]}
        defaultValue={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      <Card padding="md" className="mt-4">
        {activeTab === 'outcomes' && (
          <>
            <CardTitle>Trainee Outcomes</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Overall trainee outcomes and employment status</p>
            <DataTable
              columns={outcomeColumns}
              data={traineeOutcomes as unknown as Record<string, unknown>[]}
              searchable
              searchPlaceholder="Search trainees..."
            />
          </>
        )}

        {activeTab === 'employment' && (
          <>
            <CardTitle>Employment Tracking</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Detailed employment information and verification status</p>
            <DataTable
              columns={employmentColumns}
              data={employmentData as unknown as Record<string, unknown>[]}
              searchable
              searchPlaceholder="Search employment records..."
            />
          </>
        )}

        {activeTab === 'retention' && (
          <>
            <CardTitle>Retention & Wage Outcomes</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Long-term retention metrics and wage progression analysis</p>
            <DataTable
              columns={retentionColumns}
              data={retentionData as unknown as Record<string, unknown>[]}
              searchable
              searchPlaceholder="Search retention records..."
            />
          </>
        )}
      </Card>
    </DashboardLayout>
  );
}
