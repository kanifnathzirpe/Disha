'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, Drawer } from '@/components/ui';
import { DataTable } from '@/components/tables';
import { providerPerformance } from '@/data/mockCommandCenter';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Award,
  Users,
  Briefcase,
  Target,
  ArrowRight,
  MapPin
} from 'lucide-react';

interface ProviderData {
  provider: string;
  district: string;
  programs: number;
  enrollment: number;
  completion: number;
  placement: number;
  retention90d: number;
  medianWage: number;
  skillRelevance: number;
  performance: 'excellent' | 'good' | 'moderate' | 'needs-improvement';
  rank: number;
}

export default function ProviderPerformancePage() {
  const [selectedProvider, setSelectedProvider] = useState<ProviderData | null>(null);

  const enrichedProviders: ProviderData[] = providerPerformance.map((p, index) => ({
    ...p,
    district: p.provider.includes('Pune') ? 'Pune' : p.provider.includes('Nashik') ? 'Nashik' : p.provider.includes('Nagpur') ? 'Nagpur' : p.provider.includes('Mumbai') ? 'Mumbai' : 'Kolhapur',
    programs: Math.floor(Math.random() * 3) + 2,
    performance: index === 2 ? 'excellent' : index < 4 ? 'good' : index < 6 ? 'moderate' : 'needs-improvement',
    rank: index + 1,
  }));

  const columns = [
    { 
      key: 'rank', 
      label: 'Rank', 
      sortable: true,
      render: (v: unknown) => {
        const rank = v as number;
        return (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            rank === 1 ? 'bg-yellow-100 text-yellow-700' :
            rank === 2 ? 'bg-gray-100 text-gray-700' :
            rank === 3 ? 'bg-orange-100 text-orange-700' :
            'bg-gray-50 text-text-secondary'
          }`}>
            {rank}
          </div>
        );
      }
    },
    { 
      key: 'provider', 
      label: 'Provider', 
      sortable: true,
      render: (v: unknown, row: unknown) => {
        const data = row as ProviderData;
        return (
          <button 
            onClick={() => setSelectedProvider(data)}
            className="text-left font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            {v as string}
          </button>
        );
      }
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
      key: 'programs',
      label: 'Programs',
      sortable: true,
      render: (v: unknown) => v as number,
    },
    { 
      key: 'enrollment', 
      label: 'Enrollment', 
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
            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  val >= 85 ? 'bg-status-success' : 
                  val >= 70 ? 'bg-status-warning' : 
                  'bg-status-error'
                }`}
                style={{ width: `${val}%` }}
              />
            </div>
            <span className="text-xs font-medium">{val}%</span>
          </div>
        );
      },
    },
    {
      key: 'performance',
      label: 'Performance',
      sortable: true,
      render: (v: unknown) => {
        const perf = v as string;
        return (
          <Badge 
            variant={perf === 'excellent' ? 'success' : perf === 'good' ? 'success' : perf === 'moderate' ? 'warning' : 'error'} 
            size="sm"
          >
            {perf === 'excellent' ? 'Excellent' : perf === 'good' ? 'Good' : perf === 'moderate' ? 'Moderate' : 'Needs Improvement'}
          </Badge>
        );
      },
    },
  ];

  const topPerformers = enrichedProviders.slice(0, 3);

  return (
    <DashboardLayout 
      role="government" 
      title="Training Provider Performance" 
      subtitle="Monitor and evaluate training provider outcomes across Maharashtra"
      showDistrictSelector={false}
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Providers</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Building2 size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{enrichedProviders.length}</p>
          <p className="text-xs text-text-tertiary mt-1">Active providers</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Programs</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Briefcase size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">
            {enrichedProviders.reduce((sum, p) => sum + p.programs, 0)}
          </p>
          <p className="text-xs text-text-tertiary mt-1">Training programs</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Enrollment</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Users size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">
            {formatNumber(enrichedProviders.reduce((sum, p) => sum + p.enrollment, 0))}
          </p>
          <p className="text-xs text-text-tertiary mt-1">Trainees enrolled</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Avg Placement Rate</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <Target size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">
            {Math.round(enrichedProviders.reduce((sum, p) => sum + p.placement, 0) / enrichedProviders.length)}%
          </p>
          <p className="text-xs text-text-tertiary mt-1">State-wide average</p>
        </Card>
      </div>

      {/* Top Performers */}
      <Card padding="md" className="mb-6">
        <CardTitle>Top Performing Providers</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Highest ranked training providers by overall performance</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((provider) => (
            <div key={provider.provider} className="p-4 border border-border rounded-md hover:border-brand-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  provider.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                  provider.rank === 2 ? 'bg-gray-100 text-gray-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  #{provider.rank}
                </div>
                <Badge variant="success" size="sm">
                  {provider.performance === 'excellent' ? 'Excellent' : 'Good'}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">{provider.provider}</h3>
              <div className="flex items-center gap-1 text-xs text-text-secondary mb-2">
                <MapPin size={12} />
                {provider.district}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-text-secondary">Placement:</span>
                  <span className="font-medium ml-1">{provider.placement}%</span>
                </div>
                <div>
                  <span className="text-text-secondary">Retention:</span>
                  <span className="font-medium ml-1">{provider.retention90d}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Provider Performance Table */}
      <Card padding="md">
        <CardTitle>Provider Performance Details</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Click on any provider to view detailed performance metrics</p>
        <DataTable
          columns={columns}
          data={enrichedProviders as unknown as Record<string, unknown>[]}
          searchable
          searchPlaceholder="Search providers..."
        />
      </Card>

      {/* Provider Detail Drawer */}
      {selectedProvider && (
        <Drawer
          open={!!selectedProvider}
          onClose={() => setSelectedProvider(null)}
          title={selectedProvider.provider}
          size="lg"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                selectedProvider.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                selectedProvider.rank === 2 ? 'bg-gray-100 text-gray-700' :
                selectedProvider.rank === 3 ? 'bg-orange-100 text-orange-700' :
                'bg-gray-50 text-text-secondary'
              }`}>
                #{selectedProvider.rank}
              </div>
              <div>
                <Badge 
                  variant={selectedProvider.performance === 'excellent' ? 'success' : selectedProvider.performance === 'good' ? 'success' : selectedProvider.performance === 'moderate' ? 'warning' : 'error'} 
                  size="md"
                >
                  {selectedProvider.performance === 'excellent' ? 'EXCELLENT' : selectedProvider.performance === 'good' ? 'GOOD' : selectedProvider.performance === 'moderate' ? 'MODERATE' : 'NEEDS IMPROVEMENT'}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-text-secondary mt-1">
                  <MapPin size={12} />
                  {selectedProvider.district}
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Programs</p>
                <p className="text-lg font-bold text-text-primary">{selectedProvider.programs}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Enrollment</p>
                <p className="text-lg font-bold text-text-primary">{formatNumber(selectedProvider.enrollment)}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Completion</p>
                <p className="text-lg font-bold text-text-primary">{selectedProvider.completion}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Placement</p>
                <p className="text-lg font-bold text-text-primary">{selectedProvider.placement}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">90D Retention</p>
                <p className="text-lg font-bold text-text-primary">{selectedProvider.retention90d}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Median Wage</p>
                <p className="text-lg font-bold text-text-primary">{formatCurrency(selectedProvider.medianWage)}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Skill Relevance</p>
                <p className="text-lg font-bold text-text-primary">{selectedProvider.skillRelevance}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Performance</p>
                <p className="text-lg font-bold text-text-primary capitalize">{selectedProvider.performance}</p>
              </div>
            </div>

            {/* Performance Analysis */}
            <div>
              <p className="text-sm font-medium text-text-primary mb-3">Performance Analysis</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <span className="text-sm text-text-secondary">Completion Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${selectedProvider.completion}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{selectedProvider.completion}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <span className="text-sm text-text-secondary">Placement Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          selectedProvider.placement >= 80 ? 'bg-status-success' : 
                          selectedProvider.placement >= 70 ? 'bg-status-warning' : 
                          'bg-status-error'
                        }`}
                        style={{ width: `${selectedProvider.placement}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{selectedProvider.placement}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <span className="text-sm text-text-secondary">Retention Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          selectedProvider.retention90d >= 75 ? 'bg-status-success' : 
                          selectedProvider.retention90d >= 65 ? 'bg-status-warning' : 
                          'bg-status-error'
                        }`}
                        style={{ width: `${selectedProvider.retention90d}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{selectedProvider.retention90d}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="primary" className="flex-1">
                View Programs
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline">
                Download Report
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </DashboardLayout>
  );
}
