'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar, Tabs } from '@/components/ui';
import { DataTable } from '@/components/tables';
import { programsData, summaryStats } from '@/data/mockProgramsIntelligence';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { ArrowRight, TrendingUp, Users, Briefcase, Clock, IndianRupee, Building2, BarChart3 } from 'lucide-react';

export default function ProgramsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [activeTab, setActiveTab] = useState('performance');

  // Aggregate provider data
  const providerData = Array.from(new Set(programsData.map(p => p.provider))).map(provider => {
    const providerPrograms = programsData.filter(p => p.provider === provider);
    return {
      provider,
      programs: providerPrograms.length,
      trainees: providerPrograms.reduce((sum, p) => sum + p.enrolled, 0),
      avgCompletion: Math.round(providerPrograms.reduce((sum, p) => sum + p.completion, 0) / providerPrograms.length),
      avgPlacement: Math.round(providerPrograms.reduce((sum, p) => sum + p.placement, 0) / providerPrograms.length),
      avgRetention: Math.round(providerPrograms.reduce((sum, p) => sum + p.retention90d, 0) / providerPrograms.length),
      avgWage: Math.round(providerPrograms.reduce((sum, p) => sum + p.medianWage, 0) / providerPrograms.length),
    };
  });

  // Aggregate sector data
  const sectorData = Array.from(new Set(programsData.map(p => p.sector))).map(sector => {
    const sectorPrograms = programsData.filter(p => p.sector === sector);
    return {
      sector,
      programs: sectorPrograms.length,
      avgPlacement: Math.round(sectorPrograms.reduce((sum, p) => sum + p.placement, 0) / sectorPrograms.length),
      avgRetention: Math.round(sectorPrograms.reduce((sum, p) => sum + p.retention90d, 0) / sectorPrograms.length),
      avgWage: Math.round(sectorPrograms.reduce((sum, p) => sum + p.medianWage, 0) / sectorPrograms.length),
    };
  });

  const columns = [
    { 
      key: 'name', 
      label: 'Program', 
      sortable: true,
      render: (v: unknown, row: unknown) => {
        const name = v as string;
        const data = row as { id: string };
        return (
          <Link 
            href={`/government/programs/${data.id}`}
            className="text-left font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            {name}
          </Link>
        );
      }
    },
    { key: 'provider', label: 'Provider', sortable: true },
    { 
      key: 'enrolled', 
      label: 'Enrolled', 
      sortable: true, 
      render: (v: unknown) => formatNumber(v as number) 
    },
    {
      key: 'completion',
      label: 'Completion',
      sortable: true,
      render: (v: unknown) => `${v}%`,
    },
    {
      key: 'placement',
      label: 'Placement',
      sortable: true,
      render: (v: unknown) => `${v}%`,
    },
    {
      key: 'retention90d',
      label: '90D Retention',
      sortable: true,
      render: (v: unknown) => `${v}%`,
    },
    {
      key: 'retention180d',
      label: '180D Retention',
      sortable: true,
      render: (v: unknown) => `${v}%`,
    },
    {
      key: 'medianWage',
      label: 'Median Wage',
      sortable: true,
      render: (v: unknown) => formatCurrency(v as number),
    },
    {
      key: 'skillRelevance',
      label: 'Skill Relevance',
      sortable: true,
      render: (v: unknown) => {
        const val = v as number;
        return (
          <div className="flex items-center gap-2">
            <ProgressBar value={val} size="sm" color={val >= 80 ? 'success' : val >= 60 ? 'brand' : 'warning'} />
            <span className="text-xs">{val}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout 
      role="government" 
      title="Training Program Intelligence" 
      subtitle="Compare programs using employment, retention, wage and skill relevance"
      showDistrictSelector={false}
    >
      {/* Top Filters */}
      <Card padding="md" className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">District:</span>
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-md text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Districts</option>
              <option value="Pune">Pune</option>
              <option value="Nashik">Nashik</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Nagpur">Nagpur</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Sector:</span>
            <select 
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-md text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Sectors</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Automotive">Automotive</option>
              <option value="Renewable Energy">Renewable Energy</option>
              <option value="Construction">Construction</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Provider:</span>
            <select 
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-md text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Providers</option>
              <option value="Maha Skills">Maha Skills</option>
              <option value="TechForward">TechForward</option>
              <option value="Green Tech Academy">Green Tech Academy</option>
              <option value="Precision Skills">Precision Skills</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Year:</span>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-md text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Programs</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Users size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text-primary">{summaryStats.totalPrograms}</p>
          <p className="text-xs text-text-tertiary mt-1">Active programs</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Avg Placement</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <Briefcase size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">{summaryStats.avgPlacement}%</p>
          <p className="text-xs text-text-tertiary mt-1">Placement rate</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Avg 90D Retention</span>
            <div className="w-8 h-8 rounded-lg bg-status-warning-bg flex items-center justify-center">
              <Clock size={16} className="text-status-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-warning">{summaryStats.avgRetention90d}%</p>
          <p className="text-xs text-text-tertiary mt-1">Retention rate</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Avg Wage</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <IndianRupee size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{formatCurrency(summaryStats.avgWage)}</p>
          <p className="text-xs text-text-tertiary mt-1">Median wage</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        items={[
          { value: 'performance', label: 'Program Performance' },
          { value: 'providers', label: 'Provider Performance' },
          { value: 'outcomes', label: 'Outcome Analytics' },
        ]}
        defaultValue={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'performance' && (
          <Card padding="md">
            <CardTitle>Program Performance</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Click on any program to view detailed analysis and diagnostics</p>
            <DataTable
              columns={columns}
              data={programsData as unknown as Record<string, unknown>[]}
              searchable
              searchPlaceholder="Search programs, providers, sectors..."
            />
          </Card>
        )}

        {activeTab === 'providers' && (
          <Card padding="md">
            <CardTitle>Provider Performance</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Training provider performance ranking and metrics</p>
            <div className="mb-4">
              <Link 
                href="/government/programs/providers"
                className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 transition-colors"
              >
                View detailed provider analysis
                <ArrowRight size={14} />
              </Link>
            </div>
            <DataTable
              columns={[
                { key: 'provider', label: 'Provider', sortable: true },
                { 
                  key: 'programs', 
                  label: 'Programs', 
                  sortable: true,
                  render: (v: unknown) => v as number,
                },
                { 
                  key: 'trainees', 
                  label: 'Trainees', 
                  sortable: true,
                  render: (v: unknown) => formatNumber(v as number),
                },
                { 
                  key: 'avgCompletion', 
                  label: 'Avg Completion', 
                  sortable: true,
                  render: (v: unknown) => `${v}%`,
                },
                { 
                  key: 'avgPlacement', 
                  label: 'Avg Placement', 
                  sortable: true,
                  render: (v: unknown) => `${v}%`,
                },
                { 
                  key: 'avgRetention', 
                  label: 'Avg 90D Retention', 
                  sortable: true,
                  render: (v: unknown) => `${v}%`,
                },
                { 
                  key: 'avgWage', 
                  label: 'Avg Median Wage', 
                  sortable: true,
                  render: (v: unknown) => formatCurrency(v as number),
                },
              ]}
              data={providerData as unknown as Record<string, unknown>[]}
              searchable
              searchPlaceholder="Search providers..."
            />
          </Card>
        )}

        {activeTab === 'outcomes' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card padding="md">
              <CardTitle>Outcome Metrics by Sector</CardTitle>
              <p className="text-xs text-text-secondary mb-4">Average outcomes across different sectors</p>
              <DataTable
                columns={[
                  { key: 'sector', label: 'Sector', sortable: true },
                  { 
                    key: 'programs', 
                    label: 'Programs', 
                    sortable: true,
                    render: (v: unknown) => v as number,
                  },
                  { 
                    key: 'avgPlacement', 
                    label: 'Avg Placement', 
                    sortable: true,
                    render: (v: unknown) => `${v}%`,
                  },
                  { 
                    key: 'avgRetention', 
                    label: 'Avg 90D Retention', 
                    sortable: true,
                    render: (v: unknown) => `${v}%`,
                  },
                  { 
                    key: 'avgWage', 
                    label: 'Avg Wage', 
                    sortable: true,
                    render: (v: unknown) => formatCurrency(v as number),
                  },
                ]}
                data={sectorData as unknown as Record<string, unknown>[]}
                searchable
                searchPlaceholder="Search sectors..."
              />
            </Card>

            <Card padding="md">
              <CardTitle>Outcome Trends</CardTitle>
              <p className="text-xs text-text-secondary mb-4">Key outcome indicators and trends</p>
              <div className="space-y-4">
                <div className="p-4 bg-brand-50 border border-brand-200 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-brand-700">Overall Placement Rate</span>
                    <Badge variant="success" size="sm">+5.2%</Badge>
                  </div>
                  <p className="text-2xl font-bold text-brand-600">{summaryStats.avgPlacement}%</p>
                  <p className="text-xs text-brand-500 mt-1">Above target of 65%</p>
                </div>

                <div className="p-4 bg-status-warning-bg border border-status-warning border-opacity-30 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-status-warning">90-Day Retention</span>
                    <Badge variant="warning" size="sm">-2.1%</Badge>
                  </div>
                  <p className="text-2xl font-bold text-status-warning">{summaryStats.avgRetention90d}%</p>
                  <p className="text-xs text-status-warning mt-1">Below target of 70%</p>
                </div>

                <div className="p-4 bg-status-success-bg border border-status-success border-opacity-30 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-status-success">Wage Growth</span>
                    <Badge variant="success" size="sm">+8.6%</Badge>
                  </div>
                  <p className="text-2xl font-bold text-status-success">{formatCurrency(summaryStats.avgWage)}</p>
                  <p className="text-xs text-status-success mt-1">Median wage across all programs</p>
                </div>

                <div className="p-4 bg-status-info-bg border border-status-info border-opacity-30 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-status-info">Skill Relevance</span>
                    <Badge variant="info" size="sm">Stable</Badge>
                  </div>
                  <p className="text-2xl font-bold text-status-info">78%</p>
                  <p className="text-xs text-status-info mt-1">Average skill relevance score</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
