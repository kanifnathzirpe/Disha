'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { DataTable } from '@/components/tables';
import { formatNumber } from '@/lib/utils';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp,
  Activity,
  Database,
  FileText,
  RefreshCw
} from 'lucide-react';

interface DatasetQuality {
  dataset: string;
  records: number;
  quality: number;
  lastUpdated: string;
  issues: number;
  status: 'healthy' | 'warning' | 'critical';
}

export default function DataQualityPage() {
  const [refreshing, setRefreshing] = useState(false);

  const overallStats = {
    recordsProcessed: 84320,
    valid: 97.1,
    warnings: 2.4,
    errors: 0.5,
    lastSync: '27 Sep 2026, 14:30',
  };

  const datasetQuality: DatasetQuality[] = [
    {
      dataset: 'Trainees',
      records: 84320,
      quality: 98,
      lastUpdated: '27 Sep 2026, 14:25',
      issues: 12,
      status: 'healthy',
    },
    {
      dataset: 'Programs',
      records: 48,
      quality: 100,
      lastUpdated: '27 Sep 2026, 14:20',
      issues: 0,
      status: 'healthy',
    },
    {
      dataset: 'Employment',
      records: 57420,
      quality: 96,
      lastUpdated: '27 Sep 2026, 14:15',
      issues: 8,
      status: 'warning',
    },
    {
      dataset: 'Skills',
      records: 137,
      quality: 99,
      lastUpdated: '27 Sep 2026, 14:10',
      issues: 2,
      status: 'healthy',
    },
    {
      dataset: 'Providers',
      records: 19,
      quality: 100,
      lastUpdated: '27 Sep 2026, 14:05',
      issues: 0,
      status: 'healthy',
    },
    {
      dataset: 'Employers',
      records: 42,
      quality: 98,
      lastUpdated: '27 Sep 2026, 14:00',
      issues: 1,
      status: 'healthy',
    },
    {
      dataset: 'Certifications',
      records: 71820,
      quality: 97,
      lastUpdated: '27 Sep 2026, 13:55',
      issues: 15,
      status: 'warning',
    },
    {
      dataset: 'Skill Assessments',
      records: 68950,
      quality: 95,
      lastUpdated: '27 Sep 2026, 13:50',
      issues: 22,
      status: 'warning',
    },
  ];

  const recentIssues = [
    { id: 'ISS-001', type: 'warning', dataset: 'Employment', issue: 'Missing employment status for 4,200 trainees', records: 4200, time: '2 hours ago' },
    { id: 'ISS-002', type: 'warning', dataset: 'Certifications', issue: 'Certification expiry dates missing for 15 records', records: 15, time: '5 hours ago' },
    { id: 'ISS-003', type: 'error', dataset: 'Skill Assessments', issue: 'Invalid assessment scores detected', records: 8, time: '1 day ago' },
    { id: 'ISS-004', type: 'warning', dataset: 'Trainees', issue: 'Incomplete contact information for 12 trainees', records: 12, time: '1 day ago' },
    { id: 'ISS-005', type: 'info', dataset: 'Employers', issue: 'Duplicate employer records detected', records: 2, time: '2 days ago' },
  ];

  const columns = [
    { 
      key: 'dataset', 
      label: 'Dataset', 
      sortable: true,
      render: (v: unknown) => {
        const data = v as string;
        const icon = data === 'Trainees' ? <Activity size={14} /> :
                     data === 'Programs' ? <FileText size={14} /> :
                     data === 'Employment' ? <CheckCircle size={14} /> :
                     data === 'Skills' ? <TrendingUp size={14} /> :
                     <Database size={14} />;
        return (
          <div className="flex items-center gap-2">
            <div className="text-brand-500">{icon}</div>
            <span className="font-medium">{data}</span>
          </div>
        );
      }
    },
    { 
      key: 'records', 
      label: 'Records', 
      sortable: true, 
      render: (v: unknown) => formatNumber(v as number) 
    },
    {
      key: 'quality',
      label: 'Quality',
      sortable: true,
      render: (v: unknown, row: unknown) => {
        const val = v as number;
        const data = row as DatasetQuality;
        return (
          <div className="flex items-center gap-2">
            <ProgressBar value={val} size="sm" color={data.status === 'healthy' ? 'success' : data.status === 'warning' ? 'warning' : 'error'} />
            <span className="text-xs font-medium">{val}%</span>
          </div>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (v: unknown) => {
        const status = v as string;
        return (
          <Badge variant={status === 'healthy' ? 'success' : status === 'warning' ? 'warning' : 'error'} size="sm">
            {status}
          </Badge>
        );
      },
    },
    {
      key: 'issues',
      label: 'Issues',
      sortable: true,
      render: (v: unknown) => {
        const val = v as number;
        return val > 0 ? (
          <div className="flex items-center gap-1">
            <AlertTriangle size={12} className={val > 10 ? 'text-status-error' : 'text-status-warning'} />
            <span className="text-xs font-medium">{val}</span>
          </div>
        ) : (
          <span className="text-xs text-text-tertiary">None</span>
        );
      },
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      sortable: true,
      render: (v: unknown) => <span className="text-xs">{v as string}</span>,
    },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <DashboardLayout 
      role="government" 
      title="Data Quality" 
      subtitle="Monitor data integrity, completeness, and quality across all datasets"
      showDistrictSelector={false}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Activity size={14} />
          Last sync: {overallStats.lastSync}
        </div>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? (
            <>
              <RefreshCw size={14} className="mr-1 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw size={14} className="mr-1" />
              Refresh Data
            </>
          )}
        </Button>
      </div>

      {/* Overall Quality Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Records Processed</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Database size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{formatNumber(overallStats.recordsProcessed)}</p>
          <p className="text-xs text-text-tertiary mt-1">Total records</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Valid Records</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <CheckCircle size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">{overallStats.valid}%</p>
          <p className="text-xs text-text-tertiary mt-1">Data integrity</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Warnings</span>
            <div className="w-8 h-8 rounded-lg bg-status-warning-bg flex items-center justify-center">
              <AlertTriangle size={16} className="text-status-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-warning">{overallStats.warnings}%</p>
          <p className="text-xs text-text-tertiary mt-1">Requires attention</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Errors</span>
            <div className="w-8 h-8 rounded-lg bg-status-error-bg flex items-center justify-center">
              <XCircle size={16} className="text-status-error" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-error">{overallStats.errors}%</p>
          <p className="text-xs text-text-tertiary mt-1">Critical issues</p>
        </Card>
      </div>

      {/* Dataset Quality Table */}
      <Card padding="md" className="mb-6">
        <CardTitle>Dataset Quality Overview</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Quality metrics for all data sources</p>
        <DataTable
          columns={columns}
          data={datasetQuality as unknown as Record<string, unknown>[]}
          searchable
          searchPlaceholder="Search datasets..."
        />
      </Card>

      {/* Recent Issues */}
      <Card padding="md">
        <CardTitle>Recent Data Issues</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Latest data quality issues detected</p>
        
        <div className="space-y-3">
          {recentIssues.map((issue) => (
            <div key={issue.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  issue.type === 'error' ? 'bg-status-error-bg' :
                  issue.type === 'warning' ? 'bg-status-warning-bg' :
                  'bg-status-info-bg'
                }`}>
                  {issue.type === 'error' ? <XCircle size={14} className="text-status-error" /> :
                   issue.type === 'warning' ? <AlertTriangle size={14} className="text-status-warning" /> :
                   <Activity size={14} className="text-status-info" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{issue.issue}</p>
                  <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                    <span>{issue.dataset}</span>
                    <span>•</span>
                    <span>{formatNumber(issue.records)} records</span>
                    <span>•</span>
                    <span>{issue.time}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Investigate
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
