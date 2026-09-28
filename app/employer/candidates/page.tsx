'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { DataTable } from '@/components/tables';
import { StatusBadge, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { candidates } from '@/data/mockEmployers';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function EmployerCandidatesPage() {
  const { shortlistCandidate, shortlistedCandidates, showToast } = useApp();
  const columns = [
    { key: 'name', label: 'Candidate', sortable: true },
    {
      key: 'skills', label: 'Skills',
      render: (v: unknown) => {
        const skills = v as string[];
        return (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {skills.slice(0, 3).map((s) => (
              <Badge key={s} variant="neutral" size="sm">{s}</Badge>
            ))}
            {skills.length > 3 && <Badge variant="neutral" size="sm">+{skills.length - 3}</Badge>}
          </div>
        );
      },
    },
    {
      key: 'certifications', label: 'Certifications',
      render: (v: unknown) => {
        const certs = v as string[];
        return certs.length > 0
          ? <Badge variant="success" size="sm">{certs[0]}</Badge>
          : <span className="text-xs text-text-tertiary">None</span>;
      },
    },
    {
      key: 'matchScore', label: 'Match Score', sortable: true,
      render: (v: unknown) => {
        const val = v as number;
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${val >= 90 ? 'bg-status-success' : val >= 75 ? 'bg-status-warning' : 'bg-status-error'}`}
                style={{ width: `${val}%` }}
              />
            </div>
            <span className="text-xs font-semibold">{val}%</span>
          </div>
        );
      },
    },
    { key: 'experience', label: 'Experience' },
    { key: 'district', label: 'District', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (v: unknown) => <StatusBadge status={v as string} /> },
    { key: 'appliedDate', label: 'Applied', sortable: true, render: (v: unknown) => formatDate(v as string) },
    {
      key: 'actions', label: '',
      render: (_v: unknown, row: unknown) => {
        const r = row as Record<string, unknown>;
        const id = r.id as string;
        const status = r.status as string;
        if (status === 'hired') return null;
        const isShortlisted = shortlistedCandidates.includes(id);

        return (
          <div className="flex gap-1">
            <Link href={`/employer/candidates/${id}`}>
              <Button size="sm" variant="ghost">View</Button>
            </Link>
            {status === 'applied' && (
              <Button 
                size="sm" 
                variant={isShortlisted ? 'primary' : 'outline'}
                onClick={() => shortlistCandidate(id, r.name as string)}
              >
                {isShortlisted ? 'Shortlisted' : 'Shortlist'}
              </Button>
            )}
            {status === 'shortlisted' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => showToast(`Interview invite scheduled for ${r.name as string}`, 'success')}
              >
                Interview
              </Button>
            )}
            {status === 'interviewed' && (
              <Button 
                size="sm" 
                variant="primary"
                onClick={() => showToast(`Formal employment offer dispatched to ${r.name as string}`, 'success')}
              >
                Offer
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout role="employer" title="Candidates" subtitle="Review and manage candidate applications" showDistrictSelector>
      <DataTable
        columns={columns}
        data={candidates as unknown as Record<string, unknown>[]}
        searchable
        searchPlaceholder="Search candidates by name, skill, or district..."
      />
    </DashboardLayout>
  );
}
