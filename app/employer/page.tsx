'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { DataTable } from '@/components/tables';
import { employerDashboard, candidates } from '@/data/mockEmployers';
import { formatDate, formatNumber } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/translations';
import { 
  Users, 
  Briefcase, 
  Clock, 
  UserCheck, 
  CheckCircle, 
  TrendingUp,
  ArrowRight,
  Target,
  Filter,
  Star,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function EmployerDashboard() {
  const { language } = useApp();
  const d = employerDashboard;

  const hiringFunnel = [
    { stage: language === 'mr' ? 'अर्ज' : 'Applications', value: 148, conversion: 100 },
    { stage: language === 'mr' ? 'निवडलेले' : 'Shortlisted', value: 31, conversion: 21 },
    { stage: language === 'mr' ? 'मुलाखत' : 'Interviewed', value: 18, conversion: 58 },
    { stage: language === 'mr' ? 'ऑफर' : 'Offers', value: 12, conversion: 67 },
    { stage: language === 'mr' ? 'रुजू' : 'Hired', value: 9, conversion: 75 },
  ];

  const topSkills = [
    { skill: 'CNC', percentage: 44, demand: 'high' },
    { skill: 'PLC', percentage: 31, demand: 'high' },
    { skill: 'AutoCAD', percentage: 28, demand: 'medium' },
    { skill: 'EV Diagnostics', percentage: 22, demand: 'high' },
    { skill: 'Industrial Automation', percentage: 18, demand: 'medium' },
  ];

  const hiringDifficulty = [
    { level: 'Easy', count: 3, percentage: 20 },
    { level: 'Medium', count: 8, percentage: 53 },
    { level: 'Hard', count: 4, percentage: 27 },
  ];

  const appColumns = [
    { 
      key: 'name', 
      label: language === 'mr' ? 'उमेदवार' : 'Candidate', 
      sortable: true,
      render: (v: unknown) => <span className="font-medium">{v as string}</span>
    },
    {
      key: 'matchScore', 
      label: language === 'mr' ? 'जुळवणी' : 'Match', 
      sortable: true,
      render: (v: unknown) => {
        const val = v as number;
        return (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${val >= 90 ? 'text-status-success' : val >= 75 ? 'text-status-warning' : 'text-status-error'}`}>
              {val}%
            </span>
            {val >= 90 && <Star size={12} className="text-status-warning fill-current" />}
          </div>
        );
      },
    },
    { 
      key: 'district', 
      label: language === 'mr' ? 'जिल्हा' : 'District', 
      sortable: true,
      render: (v: unknown) => <span className="text-xs">{v as string}</span>
    },
    { 
      key: 'experience', 
      label: language === 'mr' ? 'अनुभव' : 'Experience',
      render: (v: unknown) => <span className="text-xs">{v as string}</span>
    },
    { 
      key: 'status', 
      label: language === 'mr' ? 'स्थिती' : 'Status', 
      sortable: true, 
      render: (v: unknown) => {
        const status = v as string;
        return (
          <Badge 
            variant={status === 'hired' ? 'success' : status === 'interviewed' ? 'warning' : status === 'offered' ? 'info' : 'neutral'} 
            size="sm"
          >
            {status}
          </Badge>
        );
      }
    },
    { 
      key: 'appliedDate', 
      label: language === 'mr' ? 'अर्जाची तारीख' : 'Applied', 
      sortable: true, 
      render: (v: unknown) => <span className="text-xs">{formatDate(v as string)}</span>
    },
  ];

  const recentJobs = [
    { id: 'JOB001', title: 'CNC Technician', applicants: 24, status: 'active' },
    { id: 'JOB002', title: 'EV Technician', applicants: 18, status: 'active' },
    { id: 'JOB003', title: 'PLC Operator', applicants: 12, status: 'paused' },
  ];

  return (
    <DashboardLayout 
      role="employer" 
      title={language === 'mr' ? 'भरती व कार्यबल नियंत्रण कक्ष' : 'Recruitment & Workforce Command'} 
      subtitle={language === 'mr' ? 'एबीसी मॅन्युफॅक्चरिंग लि. — चाकण एमआयडीसी, पुणे' : 'ABC Manufacturing Ltd — Chakan MIDC, Pune'} 
      showDistrictSelector={false}
    >
      {/* Recruiter Profile Status Banner matching reference prototype */}
      <div className="bg-gradient-to-r from-slate-900 via-[#123B6D] to-[#0e2f57] text-white rounded-xl p-5 mb-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white">
                Mahaswayam Recruiter ID: MH-EMP-2026-4410
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <ShieldCheck size={12} />
                EPFO & GSTIN Verified
              </span>
              <span className="text-xs text-blue-200">
                Chakan Automotive Cluster • Tier-1 Supplier
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              ABC Manufacturing Ltd — Industrial Workforce Portal
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Real-time matching with certified ITI, Polytechnic, and Pradhan Mantri Kaushal Kendra (PMKK) graduates. Direct incentive eligibility: ₹8,000 per trainee hired.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Link href="/employer/applications">
                <Button
                  size="sm"
                  variant="primary"
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Users size={13} />
                  <span>Manage Applications (148)</span>
                </Button>
              </Link>

              <Link href="/employer/jobs">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20">
                  <Briefcase size={13} className="text-amber-300" />
                  <span>4 Active Openings</span>
                </span>
              </Link>

              <Link href="/employer/talent/matching">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20">
                  <Target size={13} className="text-blue-300" />
                  <span>AI Candidate Matching</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Recruiter Profile Completion Ring (100% COMPLETE) */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-4 sm:min-w-[280px]">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="transparent"
                  className="text-white/20"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={163.36}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  className="text-emerald-400"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-white">100%</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-white uppercase text-[11px] tracking-wider">Recruiter Profile</p>
              <p className="text-emerald-300 font-semibold flex items-center gap-1 text-[11px]">
                <CheckCircle2 size={12} />
                Corporate Verified
              </p>
              <p className="text-blue-200 text-[10px]">
                Mahaswayam & EPFO Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Active Jobs</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Briefcase size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{d.activeJobs}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Applications</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Users size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{d.pendingApplications}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Shortlisted</span>
            <div className="w-8 h-8 rounded-lg bg-status-warning-bg flex items-center justify-center">
              <CheckCircle size={16} className="text-status-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-warning">31</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Hired</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <UserCheck size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">{d.totalHired}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Pending Verification</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Clock size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">4</p>
        </Card>
      </div>

      {/* Hiring Funnel */}
      <Card padding="md" className="mb-6">
        <CardTitle>Hiring Funnel</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Current hiring pipeline conversion rates</p>
        
        <div className="space-y-3">
          {hiringFunnel.map((stage, index) => (
            <div key={stage.stage} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-text-primary">{stage.stage}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-text-primary">{stage.value}</span>
                  <span className="text-xs text-text-secondary">{stage.conversion}% conversion</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${(stage.value / hiringFunnel[0].value) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Skills & Hiring Difficulty */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card padding="md">
          <CardTitle>Top Skills Requested</CardTitle>
          <p className="text-xs text-text-secondary mb-4">Most in-demand skills across all job postings</p>
          
          <div className="space-y-3">
            {topSkills.map((skill) => (
              <div key={skill.skill} className="flex items-center gap-3">
                <div className="w-24 text-sm font-medium text-text-primary">{skill.skill}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-text-primary">{skill.percentage}%</span>
                    <Badge 
                      variant={skill.demand === 'high' ? 'error' : 'warning'} 
                      size="sm"
                    >
                      {skill.demand}
                    </Badge>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        skill.demand === 'high' ? 'bg-status-error' : 'bg-status-warning'
                      }`}
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <CardTitle>Hiring Difficulty</CardTitle>
          <p className="text-xs text-text-secondary mb-4">Analysis of hiring difficulty by role</p>
          
          <div className="space-y-3">
            {hiringDifficulty.map((level) => (
              <div key={level.level} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <span className="text-sm font-medium text-text-primary">{level.level}</span>
                  <span className="text-xs text-text-secondary ml-2">({level.count} roles)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        level.level === 'Easy' ? 'bg-status-success' : 
                        level.level === 'Medium' ? 'bg-status-warning' : 
                        'bg-status-error'
                      }`}
                      style={{ width: `${level.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{level.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Jobs */}
      <div className="flex items-center justify-between mb-4">
        <CardTitle>Recent Jobs</CardTitle>
        <Button size="sm" variant="primary">
          Post New Job
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {recentJobs.map((job) => (
          <Card key={job.id} padding="md" className="hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-text-primary">{job.title}</h3>
              <Badge variant={job.status === 'active' ? 'success' : 'warning'} size="sm">
                {job.status}
              </Badge>
            </div>
            <p className="text-xs text-text-secondary">{job.applicants} applicants</p>
          </Card>
        ))}
      </div>

      {/* Recent Candidates */}
      <div className="flex items-center justify-between mb-4">
        <CardTitle>Recent Candidates</CardTitle>
        <Button size="sm" variant="outline">
          <Filter size={14} className="mr-1" />
          Filter
        </Button>
      </div>
      <DataTable
        columns={appColumns}
        data={candidates as unknown as Record<string, unknown>[]}
        searchable
        searchPlaceholder="Search candidates..."
      />
    </DashboardLayout>
  );
}
