'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, Drawer } from '@/components/ui';
import { DataTable } from '@/components/tables';
import { districtIntelligence } from '@/data/mockCommandCenter';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  AlertTriangle,
  Activity,
  Briefcase,
  IndianRupee
} from 'lucide-react';

interface DistrictData {
  district: string;
  skillGapStatus: string;
  placementRate: number;
  retention: number;
  enrolled: number;
  certified: number;
  placed: number;
  medianWage: number;
  criticalSkills: number;
  topSectors: string[];
  topSkillGaps: string[];
  recommendedAction: string;
}

export default function DistrictIntelligencePage() {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);

  const enrichedDistrictData: DistrictData[] = districtIntelligence.map(d => ({
    ...d,
    medianWage: d.district === 'Pune' ? 21400 : d.district === 'Mumbai' ? 23500 : d.district === 'Nashik' ? 17800 : d.district === 'Nagpur' ? 16500 : 15200,
    criticalSkills: d.skillGapStatus === 'critical' ? 12 : d.skillGapStatus === 'high' ? 8 : 4,
    topSectors: d.district === 'Pune' ? ['Manufacturing', 'Automotive', 'IT Services'] : d.district === 'Mumbai' ? ['IT Services', 'Finance', 'Healthcare'] : d.district === 'Nashik' ? ['Manufacturing', 'Agriculture', 'Automotive'] : ['Manufacturing', 'Textile', 'Construction'],
    topSkillGaps: d.district === 'Pune' ? ['EV Diagnostics', 'CNC', 'PLC'] : d.district === 'Mumbai' ? ['Full Stack Dev', 'Data Science', 'Cloud'] : d.district === 'Nashik' ? ['Welding', 'CNC', 'Automation'] : ['Textile Operations', 'Construction', 'Electrical'],
    recommendedAction: d.skillGapStatus === 'critical' ? `Increase manufacturing capacity.` : 'Monitor skill trends.',
  }));

  const columns = [
    { 
      key: 'district', 
      label: 'District', 
      sortable: true,
      render: (v: unknown, row: unknown) => {
        const data = row as DistrictData;
        return (
          <button 
            onClick={() => setSelectedDistrict(data)}
            className="flex items-center gap-2 text-left font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            <MapPin size={14} />
            {v as string}
          </button>
        );
      }
    },
    { 
      key: 'enrolled', 
      label: 'Trainees', 
      sortable: true, 
      render: (v: unknown) => formatNumber(v as number) 
    },
    {
      key: 'placementRate',
      label: 'Placement',
      sortable: true,
      render: (v: unknown) => `${v}%`,
    },
    {
      key: 'retention',
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
      key: 'criticalSkills',
      label: 'Skill Gaps',
      sortable: true,
      render: (v: unknown) => {
        const val = v as number;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{val}</span>
            {val > 8 && <AlertTriangle size={14} className="text-status-error" />}
          </div>
        );
      },
    },
    {
      key: 'skillGapStatus',
      label: 'Status',
      sortable: true,
      render: (v: unknown) => {
        const status = v as string;
        return (
          <Badge variant={status === 'critical' ? 'error' : status === 'high' ? 'warning' : 'info'} size="sm">
            {status}
          </Badge>
        );
      },
    },
  ];

  return (
    <DashboardLayout 
      role="government" 
      title="District Intelligence" 
      subtitle="Performance metrics and skill gaps by district across Maharashtra"
      showDistrictSelector={false}
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Districts</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <MapPin size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{enrichedDistrictData.length}</p>
          <p className="text-xs text-text-tertiary mt-1">Across Maharashtra</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Critical Districts</span>
            <div className="w-8 h-8 rounded-lg bg-status-error-bg flex items-center justify-center">
              <AlertTriangle size={16} className="text-status-error" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-error">
            {enrichedDistrictData.filter(d => d.skillGapStatus === 'critical').length}
          </p>
          <p className="text-xs text-text-tertiary mt-1">Require immediate attention</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Avg Placement Rate</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <Briefcase size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">
            {Math.round(enrichedDistrictData.reduce((sum, d) => sum + d.placementRate, 0) / enrichedDistrictData.length)}%
          </p>
          <p className="text-xs text-text-tertiary mt-1">State-wide average</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Trainees</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Activity size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">
            {formatNumber(enrichedDistrictData.reduce((sum, d) => sum + d.enrolled, 0))}
          </p>
          <p className="text-xs text-text-tertiary mt-1">Enrolled across districts</p>
        </Card>
      </div>

      {/* District Table */}
      <Card padding="md">
        <CardTitle>District Performance</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Click on any district to view detailed intelligence</p>
        <DataTable
          columns={columns}
          data={enrichedDistrictData as unknown as Record<string, unknown>[]}
          searchable
          searchPlaceholder="Search districts..."
        />
      </Card>

      {/* District Detail Drawer */}
      {selectedDistrict && (
        <Drawer
          open={!!selectedDistrict}
          onClose={() => setSelectedDistrict(null)}
          title={selectedDistrict.district}
          size="lg"
        >
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Training</p>
                <p className="text-lg font-bold text-text-primary">{formatNumber(selectedDistrict.enrolled)}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Placement</p>
                <p className="text-lg font-bold text-text-primary">{selectedDistrict.placementRate}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Retention</p>
                <p className="text-lg font-bold text-text-primary">{selectedDistrict.retention}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Median Wage</p>
                <p className="text-lg font-bold text-text-primary">{formatCurrency(selectedDistrict.medianWage)}</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <Badge variant={selectedDistrict.skillGapStatus === 'critical' ? 'error' : selectedDistrict.skillGapStatus === 'high' ? 'warning' : 'info'} size="md">
                {selectedDistrict.skillGapStatus.toUpperCase()} SKILL GAP STATUS
              </Badge>
              <div className="flex items-center gap-1 text-xs text-text-secondary">
                <AlertTriangle size={12} />
                {selectedDistrict.criticalSkills} Critical Skills
              </div>
            </div>

            {/* Top Sectors */}
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">Top Sectors</p>
              <div className="flex flex-wrap gap-2">
                {selectedDistrict.topSectors.map((sector) => (
                  <Badge key={sector} variant="neutral" size="sm">
                    {sector}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Top Skill Gaps */}
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">Top Skill Gaps</p>
              <div className="flex flex-wrap gap-2">
                {selectedDistrict.topSkillGaps.map((skill) => (
                  <Badge key={skill} variant="warning" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recommended Action */}
            <div className="p-4 bg-brand-50 border border-brand-200 rounded-md">
              <p className="text-sm font-medium text-brand-700 mb-2">Recommended Action</p>
              <p className="text-sm text-brand-600 mb-3">
                {selectedDistrict.recommendedAction}
              </p>
              <div className="flex items-center gap-2 text-xs text-brand-500">
                <MapPin size={12} />
                <span>Focus district: {selectedDistrict.district}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="primary" className="flex-1">
                View Programs
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline">
                View Employers
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </DashboardLayout>
  );
}
