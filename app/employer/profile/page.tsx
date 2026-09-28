'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge } from '@/components/ui';
import { Building2, MapPin, Mail, Phone, UserCheck, Briefcase, Shield } from 'lucide-react';
import { employerDashboard } from '@/data/mockEmployers';

export default function EmployerProfilePage() {
  const companyInfo = {
    companyName: 'ABC Manufacturing',
    industry: 'Automotive',
    district: 'Pune',
    contactPerson: 'Rajesh Kumar',
    email: 'rajesh.kumar@abcmanufacturing.com',
    phone: '+91 20 2345 6789',
    totalHired: employerDashboard.totalHired,
    activeJobs: employerDashboard.activeJobs,
    verificationStatus: 'verified' as const,
  };

  return (
    <DashboardLayout role="employer" title="Company Profile" showDistrictSelector={false}>
      <div className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Card */}
          <Card padding="md" className="lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 font-bold text-2xl mb-4 border-2 border-brand-200">
                <Building2 size={32} />
              </div>
              <CardTitle className="mb-1">{companyInfo.companyName}</CardTitle>
              <Badge variant={companyInfo.verificationStatus === 'verified' ? 'success' : 'warning'} size="sm" className="mb-4">
                {companyInfo.verificationStatus}
              </Badge>
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs">
                  <Building2 size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">Industry</span>
                  <span className="text-text-primary font-medium">{companyInfo.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <MapPin size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">Location</span>
                  <span className="text-text-primary font-medium">{companyInfo.district}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <UserCheck size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">Total Hired</span>
                  <span className="text-text-primary font-medium">{companyInfo.totalHired}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Details Card */}
          <Card padding="md" className="lg:col-span-2">
            <CardTitle className="mb-4">Company Information</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-secondary mb-1">Company ID</p>
                <p className="text-sm text-text-primary font-medium">EMP-2024-0567</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Contact Person</p>
                <p className="text-sm text-text-primary font-medium">{companyInfo.contactPerson}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-text-secondary" />
                  <p className="text-sm text-text-primary font-medium">{companyInfo.email}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-text-secondary" />
                  <p className="text-sm text-text-primary font-medium">{companyInfo.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Active Jobs</p>
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-text-secondary" />
                  <p className="text-sm text-text-primary font-medium">{companyInfo.activeJobs}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Registration Date</p>
                <p className="text-sm text-text-primary font-medium">January 10, 2023</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Verification Status */}
        <Card padding="md" className="mt-6">
          <CardTitle className="mb-4">Verification Status</CardTitle>
          <div className="flex items-start gap-4 p-4 bg-status-success-bg rounded-md border border-status-success/20">
            <div className="w-12 h-12 rounded-full bg-status-success/10 flex items-center justify-center text-status-success flex-shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-status-success mb-1">Verified Employer</p>
              <p className="text-xs text-text-secondary">
                Your company has been verified by the Maharashtra Skill Development Department. You can post jobs and verify candidate credentials.
              </p>
              <p className="text-xs text-text-tertiary mt-2">Verified on: February 15, 2023</p>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card padding="md" className="mt-6">
          <CardTitle className="mb-4">Account Settings</CardTitle>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-text-primary">Email Notifications</p>
                <p className="text-xs text-text-secondary">Receive updates about applications and candidates</p>
              </div>
              <div className="w-10 h-6 bg-brand-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-text-primary">Auto-verify Candidates</p>
                <p className="text-xs text-text-secondary">Automatically verify candidate credentials</p>
              </div>
              <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
