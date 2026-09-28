'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, StatusBadge, Badge, Button, ProgressBar } from '@/components/ui';
import { mockJobs } from '@/data/mockJobs';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MapPin, Users, Calendar, Plus } from 'lucide-react';
import Link from 'next/link';

export default function EmployerJobsPage() {
  // Filter to show jobs from ABC Manufacturing
  const employerJobs = mockJobs.filter(j => j.employerId === 'EMP001');

  // Mock applicant counts for demo
  const applicantCounts: Record<string, number> = {
    'JOB001': 24,
    'JOB002': 18,
    'JOB003': 12,
  };

  return (
    <DashboardLayout role="employer" title="Jobs" subtitle="Manage your active job listings" showDistrictSelector>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-secondary">{employerJobs.length} job postings</p>
        <Button size="sm" variant="primary">
          <Plus size={14} /> Post New Job
        </Button>
      </div>

      <div className="space-y-3">
        {employerJobs.map((job) => (
          <Card key={job.id} padding="md" hover>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-text-primary">{job.title}</h3>
                  <StatusBadge status={job.status} />
                  <Badge variant={job.type === 'full-time' ? 'default' : 'info'} size="sm">{job.type}</Badge>
                </div>
                <p className="text-xs text-text-secondary mt-1">{job.description}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-text-secondary">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.district}</span>
                  <span className="flex items-center gap-1">₹ {formatCurrency(job.wageMin)}–{formatCurrency(job.wageMax)}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> Deadline: {formatDate(job.deadline)}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="neutral" size="sm">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 min-w-[140px]">
                <div className="text-xs text-text-secondary mb-1">Applicants</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium whitespace-nowrap">{applicantCounts[job.id] || 0} applicants</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Link href={`/employer/jobs/${job.id}`}>
                    <Button size="sm" variant="ghost">View</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
