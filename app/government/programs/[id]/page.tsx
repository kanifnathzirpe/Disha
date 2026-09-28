'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar, Modal } from '@/components/ui';
import { 
  programsData, 
  retentionCohortData, 
  wageProgressionData, 
  diagnosticSignals, 
  recommendedActions 
} from '@/data/mockProgramsIntelligence';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  Briefcase, 
  Clock, 
  IndianRupee,
  Target,
  AlertTriangle,
  CheckCircle,
  Download,
  FileText
} from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart } from 'recharts';

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const program = programsData.find(p => p.id === params.id);

  if (!program) {
    return (
      <DashboardLayout role="government" title="Program Not Found" showDistrictSelector={false}>
        <Card padding="md">
          <p className="text-text-secondary">Program not found. Please return to the programs list.</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push('/government/programs')}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Programs
          </Button>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      role="government" 
      title={program.name} 
      showDistrictSelector={false}
    >
      {/* Back Button */}
      <Button variant="outline" size="sm" className="mb-4" onClick={() => router.push('/government/programs')}>
        <ArrowLeft size={16} className="mr-2" />
        Back to Programs
      </Button>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-brand-500" />
            <span className="text-xs text-text-secondary">Enrolled</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{formatNumber(program.enrolled)}</p>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-status-success" />
            <span className="text-xs text-text-secondary">Completion</span>
          </div>
          <p className="text-2xl font-bold text-status-success">{program.completion}%</p>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={16} className="text-brand-500" />
            <span className="text-xs text-text-secondary">Placement</span>
          </div>
          <p className="text-2xl font-bold text-brand-600">{program.placement}%</p>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-status-warning" />
            <span className="text-xs text-text-secondary">90D Retention</span>
          </div>
          <p className="text-2xl font-bold text-status-warning">{program.retention90d}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">180D Retention</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{program.retention180d}%</p>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee size={16} className="text-brand-500" />
            <span className="text-xs text-text-secondary">Median Wage</span>
          </div>
          <p className="text-2xl font-bold text-brand-600">{formatCurrency(program.medianWage)}</p>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-brand-500" />
            <span className="text-xs text-text-secondary">Skill Relevance</span>
          </div>
          <p className="text-2xl font-bold text-brand-600">{program.skillRelevance}%</p>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-brand-500" />
            <span className="text-xs text-text-secondary">Status</span>
          </div>
          <Badge variant={program.status === 'active' ? 'success' : 'info'} size="sm" className="mt-1">
            {program.status}
          </Badge>
        </Card>
      </div>

      {/* Retention Cohort Chart */}
      <Card padding="md" className="mb-6">
        <CardTitle>Retention Cohort Analysis</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Trainee retention over time after placement</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={retentionCohortData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(value) => `${value}%`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: any) => `${value}%`} />
              <Bar dataKey="retained" fill="#1e40af" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Wage Progression Chart */}
      <Card padding="md" className="mb-6">
        <CardTitle>Wage Progression</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Median wage growth over time after placement</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wageProgressionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="period" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: any) => formatCurrency(value)} />
              <Line type="monotone" dataKey="wage" stroke="#047857" strokeWidth={2} dot={{ fill: '#047857' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Diagnostic Section */}
      <Card padding="md" className="mb-6 border-2 border-brand-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <CardTitle>Program Performance Diagnostics</CardTitle>
            <p className="text-xs text-text-secondary mt-1">Analyze factors affecting program outcomes</p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setShowDiagnostic(true)}
          >
            <Target size={16} className="mr-2" />
            Diagnose Program
          </Button>
        </div>

        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-xs text-text-secondary">
            <span className="font-medium">Note:</span> These are rule-based diagnostic signals based on synthetic demonstration data.
          </p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setShowExportModal(true)}>
          <Download size={16} className="mr-2" />
          Export Analysis
        </Button>
        <Button variant="outline" onClick={() => setShowDiagnostic(true)}>
          <FileText size={16} className="mr-2" />
          View Recommendations
        </Button>
      </div>

      {/* Diagnostic Modal */}
      {showDiagnostic && (
        <Modal
          open={showDiagnostic}
          onClose={() => setShowDiagnostic(false)}
          title="Program Performance Diagnostics"
          size="lg"
        >
          <div className="space-y-6">
            {/* Program Overview */}
            <div className="p-4 bg-brand-50 border border-brand-200 rounded-md">
              <h3 className="text-sm font-semibold text-brand-700 mb-2">{program.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-brand-600">Provider:</span> {program.provider}
                </div>
                <div>
                  <span className="text-brand-600">District:</span> {program.district}
                </div>
                <div>
                  <span className="text-brand-600">180D Retention:</span> {program.retention180d}%
                </div>
                <div>
                  <span className="text-brand-600">Skill Relevance:</span> {program.skillRelevance}%
                </div>
              </div>
            </div>

            {/* Diagnostic Signals */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Why Did This Program Underperform?</h3>
              <div className="space-y-3">
                {diagnosticSignals.map((signal, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-text-primary">{signal.factor}</span>
                        <span className="text-sm font-bold text-text-primary">{signal.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            signal.severity === 'high' ? 'bg-status-error' : 
                            signal.severity === 'medium' ? 'bg-status-warning' : 
                            'bg-status-success'
                          }`}
                          style={{ width: `${signal.percentage}%` }}
                        />
                      </div>
                    </div>
                    <Badge 
                      variant={signal.severity === 'high' ? 'error' : signal.severity === 'medium' ? 'warning' : 'success'} 
                      size="sm"
                    >
                      {signal.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Recommended Actions</h3>
              <div className="space-y-3">
                {recommendedActions.map((action) => (
                  <div key={action.id} className="p-3 border border-border rounded-md hover:border-brand-300 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-sm font-medium text-text-primary">{action.action}</span>
                      <Badge variant={action.priority === 'high' ? 'error' : 'warning'} size="sm">
                        {action.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-text-secondary">{action.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-text-secondary">
                <span className="font-medium">Diagnostic Methodology:</span> These are rule-based diagnostic signals based on synthetic demonstration data. 
                Actual program performance may vary based on local market conditions, employer partnerships, and trainee demographics.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => setShowDiagnostic(false)}
              >
                Acknowledge Recommendations
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowDiagnostic(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <Modal
          open={showExportModal}
          onClose={() => setShowExportModal(false)}
          title="Export Analysis"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-3">Select export format:</p>
              <div className="space-y-2">
                <button className="w-full p-3 border border-border rounded-md hover:border-brand-300 transition-colors text-left">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-brand-500" />
                    <span className="text-sm font-medium">PDF Report</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">Complete analysis with charts and recommendations</p>
                </button>
                <button className="w-full p-3 border border-border rounded-md hover:border-brand-300 transition-colors text-left">
                  <div className="flex items-center gap-2">
                    <Download size={16} className="text-brand-500" />
                    <span className="text-sm font-medium">Excel Spreadsheet</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">Raw data and metrics for further analysis</p>
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => {
                  setShowExportModal(false);
                  // Mock export behavior
                }}
              >
                Export
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowExportModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
