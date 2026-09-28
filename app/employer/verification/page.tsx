'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, Drawer, Modal } from '@/components/ui';
import { DataTable } from '@/components/tables';
import { formatCurrency } from '@/lib/utils';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText,
  Building2,
  Calendar,
  IndianRupee,
  MapPin,
  ArrowRight,
  AlertTriangle,
  User
} from 'lucide-react';

interface VerificationRequest {
  id: string;
  traineeId: string;
  traineeName: string;
  employer: string;
  role: string;
  startDate: string;
  salary: number;
  district: string;
  status: 'pending' | 'employer-submitted' | 'trainee-confirmed' | 'verified' | 'rejected';
  submittedDate: string;
  lastUpdate: string;
}

export default function VerificationPage() {
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');

  const verificationRequests: VerificationRequest[] = [
    {
      id: 'VER-001',
      traineeId: 'TRN-001',
      traineeName: 'Amit Patil',
      employer: 'Tata Motors',
      role: 'EV Technician',
      startDate: 'May 15, 2026',
      salary: 22000,
      district: 'Pune',
      status: 'employer-submitted',
      submittedDate: 'Sep 20, 2026',
      lastUpdate: 'Sep 20, 2026',
    },
    {
      id: 'VER-002',
      traineeId: 'TRN-002',
      traineeName: 'Sneha Kulkarni',
      employer: 'Mahindra & Mahindra',
      role: 'CNC Operator',
      startDate: 'Jun 10, 2026',
      salary: 18500,
      district: 'Nashik',
      status: 'trainee-confirmed',
      submittedDate: 'Sep 18, 2026',
      lastUpdate: 'Sep 22, 2026',
    },
    {
      id: 'VER-003',
      traineeId: 'TRN-003',
      traineeName: 'Rajesh Deshmukh',
      employer: 'Bajaj Auto',
      role: 'Automation Engineer',
      startDate: 'Apr 20, 2026',
      salary: 19500,
      district: 'Pune',
      status: 'verified',
      submittedDate: 'Sep 15, 2026',
      lastUpdate: 'Sep 25, 2026',
    },
    {
      id: 'VER-004',
      traineeId: 'TRN-005',
      traineeName: 'Vikram Joshi',
      employer: 'Force Motors',
      role: 'PLC Programmer',
      startDate: 'Jul 5, 2026',
      salary: 21000,
      district: 'Pune',
      status: 'pending',
      submittedDate: 'Sep 25, 2026',
      lastUpdate: 'Sep 25, 2026',
    },
    {
      id: 'VER-005',
      traineeId: 'TRN-006',
      traineeName: 'Priya Sharma',
      employer: 'ABC Manufacturing',
      role: 'Quality Inspector',
      startDate: 'Aug 1, 2026',
      salary: 18000,
      district: 'Pune',
      status: 'rejected',
      submittedDate: 'Sep 10, 2026',
      lastUpdate: 'Sep 12, 2026',
    },
  ];

  const filteredRequests = filterStatus === 'all' 
    ? verificationRequests 
    : verificationRequests.filter(req => req.status === filterStatus);

  const columns = [
    { 
      key: 'traineeId', 
      label: 'Trainee ID', 
      sortable: true,
      render: (v: unknown) => <span className="font-mono text-xs">{v as string}</span>
    },
    { 
      key: 'traineeName', 
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
      key: 'salary',
      label: 'Salary',
      sortable: true,
      render: (v: unknown) => formatCurrency(v as number),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (v: unknown) => {
        const status = v as string;
        const statusConfig = {
          'pending': { variant: 'neutral' as const, label: 'Pending' },
          'employer-submitted': { variant: 'info' as const, label: 'Employer Submitted' },
          'trainee-confirmed': { variant: 'warning' as const, label: 'Trainee Confirmed' },
          'verified': { variant: 'success' as const, label: 'Verified' },
          'rejected': { variant: 'error' as const, label: 'Rejected' },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['pending'];
        return (
          <Badge variant={config.variant} size="sm">
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: 'action',
      label: 'Action',
      render: (_v: unknown, row: unknown) => {
        const data = row as VerificationRequest;
        return (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setSelectedRequest(data)}
          >
            View
          </Button>
        );
      },
    },
  ];

  const statusCounts = {
    all: verificationRequests.length,
    pending: verificationRequests.filter(r => r.status === 'pending').length,
    verified: verificationRequests.filter(r => r.status === 'verified').length,
    rejected: verificationRequests.filter(r => r.status === 'rejected').length,
  };

  const workflowSteps = [
    { step: 'Pending', status: 'pending', icon: <Clock size={16} /> },
    { step: 'Employer Submitted', status: 'employer-submitted', icon: <Building2 size={16} /> },
    { step: 'Trainee Confirmed', status: 'trainee-confirmed', icon: <User size={16} /> },
    { step: 'Verified', status: 'verified', icon: <CheckCircle size={16} /> },
  ];

  return (
    <DashboardLayout 
      role="employer" 
      title="Employment Verification" 
      subtitle="Verify employment details for outcome tracking and retention analysis"
      showDistrictSelector={false}
    >
      {/* Status Filter */}
      <div className="flex items-center gap-2 mb-6">
        {(['all', 'pending', 'verified', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filterStatus === status
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Requests</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <FileText size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{verificationRequests.length}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Pending</span>
            <div className="w-8 h-8 rounded-lg bg-status-warning-bg flex items-center justify-center">
              <Clock size={16} className="text-status-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-warning">{statusCounts.pending}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Verified</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <CheckCircle size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">{statusCounts.verified}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Rejected</span>
            <div className="w-8 h-8 rounded-lg bg-status-error-bg flex items-center justify-center">
              <XCircle size={16} className="text-status-error" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-error">{statusCounts.rejected}</p>
        </Card>
      </div>

      {/* Verification Workflow */}
      <Card padding="md" className="mb-6">
        <CardTitle>Verification Workflow</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Employment verification process stages</p>
        
        <div className="flex items-center justify-between">
          {workflowSteps.map((step, index) => (
            <div key={step.step} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.status === 'verified' ? 'bg-status-success-bg' :
                step.status === 'trainee-confirmed' ? 'bg-status-warning-bg' :
                step.status === 'employer-submitted' ? 'bg-brand-50' :
                'bg-gray-100'
              }`}>
                <div className={
                  step.status === 'verified' ? 'text-status-success' :
                  step.status === 'trainee-confirmed' ? 'text-status-warning' :
                  step.status === 'employer-submitted' ? 'text-brand-500' :
                  'text-text-secondary'
                }>
                  {step.icon}
                </div>
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-text-primary">{step.step}</p>
              </div>
              {index < workflowSteps.length - 1 && (
                <div className="flex-1 mx-4 h-0.5 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Verification Requests Table */}
      <Card padding="md">
        <CardTitle>Verification Requests</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Click on any request to view details and take action</p>
        <DataTable
          columns={columns}
          data={filteredRequests as unknown as Record<string, unknown>[]}
          searchable
          searchPlaceholder="Search verification requests..."
        />
      </Card>

      {/* Verification Detail Drawer */}
      {selectedRequest && (
        <Drawer
          open={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title="Employment Verification Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Badge 
                variant={
                  selectedRequest.status === 'verified' ? 'success' : 
                  selectedRequest.status === 'rejected' ? 'error' : 
                  selectedRequest.status === 'trainee-confirmed' ? 'warning' : 'info'
                } 
                size="md"
              >
                {selectedRequest.status === 'employer-submitted' ? 'Employer Submitted' :
                 selectedRequest.status === 'trainee-confirmed' ? 'Trainee Confirmed' :
                 selectedRequest.status === 'verified' ? 'Verified' :
                 selectedRequest.status === 'rejected' ? 'Rejected' : 'Pending'}
              </Badge>
            </div>

            {/* Trainee Info */}
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <User size={18} className="text-brand-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{selectedRequest.traineeName}</p>
                  <p className="text-xs text-text-secondary">{selectedRequest.traineeId}</p>
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Employer</p>
                <p className="text-sm font-medium text-text-primary">{selectedRequest.employer}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Role</p>
                <p className="text-sm font-medium text-text-primary">{selectedRequest.role}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Start Date</p>
                <p className="text-sm font-medium text-text-primary">{selectedRequest.startDate}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Salary</p>
                <p className="text-sm font-medium text-text-primary">{formatCurrency(selectedRequest.salary)}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">District</p>
                <p className="text-sm font-medium text-text-primary">{selectedRequest.district}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Submitted</p>
                <p className="text-sm font-medium text-text-primary">{selectedRequest.submittedDate}</p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <p className="text-sm font-medium text-text-primary mb-3">Verification Timeline</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                  <CheckCircle size={16} className="text-status-success" />
                  <div>
                    <p className="text-xs font-medium text-text-primary">Request Submitted</p>
                    <p className="text-xs text-text-secondary">{selectedRequest.submittedDate}</p>
                  </div>
                </div>
                {selectedRequest.status !== 'pending' && (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                    <CheckCircle size={16} className="text-status-success" />
                    <div>
                      <p className="text-xs font-medium text-text-primary">Employer Confirmation</p>
                      <p className="text-xs text-text-secondary">{selectedRequest.lastUpdate}</p>
                    </div>
                  </div>
                )}
                {selectedRequest.status === 'trainee-confirmed' || selectedRequest.status === 'verified' || selectedRequest.status === 'rejected' ? (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                    <CheckCircle size={16} className="text-status-success" />
                    <div>
                      <p className="text-xs font-medium text-text-primary">Trainee Confirmation</p>
                      <p className="text-xs text-text-secondary">{selectedRequest.lastUpdate}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                    <Clock size={16} className="text-text-secondary" />
                    <div>
                      <p className="text-xs font-medium text-text-primary">Trainee Confirmation</p>
                      <p className="text-xs text-text-secondary">Pending</p>
                    </div>
                  </div>
                )}
                {selectedRequest.status === 'verified' && (
                  <div className="flex items-center gap-3 p-2 bg-status-success-bg rounded-md">
                    <ShieldCheck size={16} className="text-status-success" />
                    <div>
                      <p className="text-xs font-medium text-status-success">Verification Complete</p>
                      <p className="text-xs text-status-success">{selectedRequest.lastUpdate}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {selectedRequest.status === 'trainee-confirmed' && (
              <div className="flex gap-2">
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={() => {
                    setShowVerifyModal(true);
                  }}
                >
                  Verify Employment
                  <ShieldCheck size={16} className="ml-2" />
                </Button>
                <Button variant="outline">
                  Request More Info
                </Button>
              </div>
            )}
          </div>
        </Drawer>
      )}

      {/* Verify Modal */}
      {showVerifyModal && selectedRequest && (
        <Modal
          open={showVerifyModal}
          onClose={() => setShowVerifyModal(false)}
          title="Verify Employment"
          size="md"
        >
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-text-secondary mb-1">Employment Details</p>
              <p className="text-sm font-medium text-text-primary">
                {selectedRequest.traineeName} - {selectedRequest.role} at {selectedRequest.employer}
              </p>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-1">Verification confirms that:</p>
              <ul className="text-xs text-text-primary list-disc list-inside space-y-1">
                <li>Employment details match submitted information</li>
                <li>Trainee is actively employed in the stated role</li>
                <li>Salary and start date are accurate</li>
                <li>Employment verification is complete for outcome tracking</li>
              </ul>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => {
                  setShowVerifyModal(false);
                  setSelectedRequest(null);
                }}
              >
                Confirm Verification
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowVerifyModal(false)}
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
