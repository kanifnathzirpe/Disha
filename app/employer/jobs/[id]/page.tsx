'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, Badge, Button, ProgressBar } from '@/components/ui';
import { mockJobs } from '@/data/mockJobs';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MapPin, Calendar, ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = mockJobs.find(j => j.id === params.id);

  if (!job) {
    return (
      <DashboardLayout role="employer" title="Job Not Found" showDistrictSelector>
        <Card padding="md">
          <p className="text-text-secondary">Job not found</p>
          <Link href="/employer/jobs">
            <Button size="sm" variant="outline" className="mt-4">
              <ArrowLeft size={14} /> Back to Jobs
            </Button>
          </Link>
        </Card>
      </DashboardLayout>
    );
  }

  const matchedCandidates = [
    { id: 'CA001', name: 'Rahul Sharma', matchScore: 92 },
    { id: 'CA002', name: 'Amit Patil', matchScore: 89 },
    { id: 'CA003', name: 'Sneha Jadhav', matchScore: 84 },
  ];

  return (
    <DashboardLayout role="employer" title={job.title} subtitle="Job Details" showDistrictSelector>
      <Link href="/employer/jobs">
        <Button size="sm" variant="ghost" className="mb-4">
          <ArrowLeft size={14} /> Back to Jobs
        </Button>
      </Link>

      {/* Job Details */}
      <Card padding="md" className="mb-6">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <h2 className="text-lg font-semibold text-text-primary">{job.title}</h2>
          <Badge variant="default">{job.type}</Badge>
        </div>
        <p className="text-sm text-text-secondary mb-4">{job.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-text-secondary mb-1">Location</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <MapPin size={14} /> {job.district}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary mb-1">Salary</div>
            <div className="text-sm font-medium">
              ₹{formatCurrency(job.wageMin)}–₹{formatCurrency(job.wageMax)}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary mb-1">Deadline</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <Calendar size={14} /> {formatDate(job.deadline)}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary mb-1">Positions</div>
            <div className="text-sm font-medium">
              {job.filled}/{job.positions} filled
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-text-secondary mb-2">Required Skills</div>
          <div className="flex flex-wrap gap-1.5">
            {job.requiredSkills.map((skill) => (
              <Badge key={skill} variant="neutral" size="sm">{skill}</Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-text-secondary mb-2">Required Certifications</div>
          {job.requiredCertifications.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {job.requiredCertifications.map((cert) => (
                <Badge key={cert} variant="success" size="sm">{cert}</Badge>
              ))}
            </div>
          ) : (
            <span className="text-xs text-text-tertiary">None specified</span>
          )}
        </div>
      </Card>

      {/* Candidate Matching */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="disha-section-title">Candidate Matching</h2>
        <Badge variant="neutral" size="sm">{matchedCandidates.length} candidates</Badge>
      </div>

      <div className="space-y-3">
        {matchedCandidates.map((candidate) => (
          <Card key={candidate.id} padding="md" hover>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary">{candidate.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${candidate.matchScore >= 90 ? 'bg-status-success' : candidate.matchScore >= 75 ? 'bg-status-warning' : 'bg-status-error'}`}
                        style={{ width: `${candidate.matchScore}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${candidate.matchScore >= 90 ? 'text-status-success' : candidate.matchScore >= 75 ? 'text-status-warning' : 'text-status-error'}`}>
                      {candidate.matchScore}%
                    </span>
                  </div>
                </div>
              </div>
              <Link href={`/employer/candidates/${candidate.id}`}>
                <Button size="sm" variant="outline">View Profile</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
