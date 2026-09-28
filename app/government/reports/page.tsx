'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  MapPin, 
  BarChart3, 
  Users, 
  TrendingUp, 
  IndianRupee, 
  Activity, 
  X, 
  CheckCircle, 
  FileSpreadsheet,
  ShieldCheck,
  Search,
  Filter,
  Fingerprint,
  Building2,
  ExternalLink
} from 'lucide-react';

import { useApp } from '@/context/AppContext';
import { districtIntelligence, skillDemandSupply } from '@/data/mockCommandCenter';
import AuditDossierModal, { AuditCandidate } from '@/components/government/AuditDossierModal';

interface Report {
  id: string;
  name: string;
  description: string;
  category: string;
  lastUpdated: string;
  format: string;
  size: string;
  icon: React.ReactNode;
}

const MOCK_AUDIT_CANDIDATES: AuditCandidate[] = [
  {
    id: 'cand-001',
    dossierId: 'MH-AUD-2026-08912',
    name: 'Rahul Sharma',
    trade: 'Precision CNC Machining & Automation',
    district: 'Pune',
    itiCenter: 'Government ITI Aundh, Pune',
    completionDate: '28-May-2026',
    employer: 'Bharat Forge Ltd, Mundhwa',
    gstn: '27AAACB2194K1Z8',
    epfoUan: '101489291823',
    attendanceRate: 89.2,
    entryWage: '₹18,500/mo',
    currentWage: '₹21,000/mo',
    wageGrowth: '+13.5%',
    retentionMonths: 6,
    loiScore: 94,
    status: 'Verified',
    verificationSource: ['DigiLocker', 'EPFO', 'AEBAS', 'GSTN']
  },
  {
    id: 'cand-002',
    dossierId: 'MH-AUD-2026-09144',
    name: 'Pooja Jadhav',
    trade: 'Electric Vehicle Battery Assembly',
    district: 'Chhatrapati Sambhajinagar',
    itiCenter: 'Govt Technical Institute, Waluj',
    completionDate: '15-Apr-2026',
    employer: 'Bajaj Auto EV Division',
    gstn: '27AAACB1801F1ZM',
    epfoUan: '101684920194',
    attendanceRate: 94.6,
    entryWage: '₹19,200/mo',
    currentWage: '₹22,500/mo',
    wageGrowth: '+17.2%',
    retentionMonths: 8,
    loiScore: 96,
    status: 'Verified',
    verificationSource: ['DigiLocker', 'EPFO', 'AEBAS', 'GSTN']
  },
  {
    id: 'cand-003',
    dossierId: 'MH-AUD-2026-07419',
    name: 'Amol Deshmukh',
    trade: 'Industrial IoT & Sensor Instrumentation',
    district: 'Nashik',
    itiCenter: 'Nashik Industrial Training Center, Ambad',
    completionDate: '10-Feb-2026',
    employer: 'Mahindra & Mahindra Ltd',
    gstn: '27AAACM1294A1ZD',
    epfoUan: '100918274019',
    attendanceRate: 86.8,
    entryWage: '₹17,800/mo',
    currentWage: '₹20,400/mo',
    wageGrowth: '+14.6%',
    retentionMonths: 10,
    loiScore: 91,
    status: 'Verified',
    verificationSource: ['DigiLocker', 'EPFO', 'AEBAS', 'GSTN']
  },
  {
    id: 'cand-004',
    dossierId: 'MH-AUD-2026-10283',
    name: 'Tanvi Shinde',
    trade: 'Solar Photovoltaic Maintenance & Grid',
    district: 'Nagpur',
    itiCenter: 'Nagpur Multi-Skill Training Hub, Hingna',
    completionDate: '02-Jun-2026',
    employer: 'Tata Power Solar Systems',
    gstn: '27AAACT2727Q1ZB',
    epfoUan: '101928471920',
    attendanceRate: 91.0,
    entryWage: '₹16,500/mo',
    currentWage: '₹18,800/mo',
    wageGrowth: '+13.9%',
    retentionMonths: 5,
    loiScore: 89,
    status: 'Verified',
    verificationSource: ['DigiLocker', 'EPFO', 'AEBAS', 'GSTN']
  },
  {
    id: 'cand-005',
    dossierId: 'MH-AUD-2026-11029',
    name: 'Siddhesh Kadam',
    trade: 'Mechatronics & Automated Assembly',
    district: 'Thane',
    itiCenter: 'Thane District Skill Academy',
    completionDate: '20-May-2026',
    employer: 'Godrej & Boyce Mfg Co',
    gstn: '27AAACG0823H1ZW',
    epfoUan: '101294817293',
    attendanceRate: 74.5,
    entryWage: '₹16,000/mo',
    currentWage: '₹16,000/mo',
    wageGrowth: '0.0%',
    retentionMonths: 3,
    loiScore: 72,
    status: 'Under Review',
    verificationSource: ['DigiLocker', 'AEBAS']
  },
  {
    id: 'cand-006',
    dossierId: 'MH-AUD-2026-12490',
    name: 'Vijay Gaikwad',
    trade: 'Heavy Equipment Maintenance',
    district: 'Kolhapur',
    itiCenter: 'Shiroli Industrial Training Institute',
    completionDate: '18-Jan-2026',
    employer: 'Kirloskar Oil Engines',
    gstn: '27AAACK1904P1Z3',
    epfoUan: '100481920194',
    attendanceRate: 88.0,
    entryWage: '₹18,000/mo',
    currentWage: '₹21,500/mo',
    wageGrowth: '+19.4%',
    retentionMonths: 11,
    loiScore: 93,
    status: 'Verified',
    verificationSource: ['DigiLocker', 'EPFO', 'AEBAS', 'GSTN']
  }
];

export default function ReportsPage() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'reports' | 'audits'>('reports');
  const [exportingReport, setExportingReport] = useState<string | null>(null);
  const [previewReport, setPreviewReport] = useState<Report | null>(null);

  // Audit Dossier State
  const [selectedAuditCandidate, setSelectedAuditCandidate] = useState<AuditCandidate | null>(null);
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditDistrictFilter, setAuditDistrictFilter] = useState('All');

  const reports: Report[] = [
    {
      id: 'RPT-001',
      name: 'State Skill Outcome Report',
      description: 'Comprehensive analysis of training outcomes, placement rates, and wage growth across Maharashtra',
      category: 'Executive',
      lastUpdated: '27 Sep 2026',
      format: 'PDF, CSV',
      size: '2.4 MB',
      icon: <BarChart3 size={20} />,
    },
    {
      id: 'RPT-002',
      name: 'District Performance Report',
      description: 'District-wise performance metrics including enrollment, certification, placement, and retention',
      category: 'District',
      lastUpdated: '25 Sep 2026',
      format: 'PDF, CSV',
      size: '1.8 MB',
      icon: <MapPin size={20} />,
    },
    {
      id: 'RPT-003',
      name: 'Skill Gap Report',
      description: 'Detailed analysis of skill gaps, demand-supply mismatch, and emerging skill requirements',
      category: 'Intelligence',
      lastUpdated: '26 Sep 2026',
      format: 'PDF, CSV',
      size: '3.1 MB',
      icon: <TrendingUp size={20} />,
    },
    {
      id: 'RPT-004',
      name: 'Program Performance Report',
      description: 'Training program performance including completion rates, placement outcomes, and provider metrics',
      category: 'Program',
      lastUpdated: '24 Sep 2026',
      format: 'PDF, CSV',
      size: '2.0 MB',
      icon: <FileText size={20} />,
    },
    {
      id: 'RPT-005',
      name: 'Employment Outcome Report',
      description: 'Employment tracking data including placement rates, employer satisfaction, and retention',
      category: 'Workforce',
      lastUpdated: '27 Sep 2026',
      format: 'PDF, CSV',
      size: '1.5 MB',
      icon: <Users size={20} />,
    },
    {
      id: 'RPT-006',
      name: 'Wage & Retention Report',
      description: 'Wage progression analysis, retention rates, and employment stability metrics',
      category: 'Workforce',
      lastUpdated: '23 Sep 2026',
      format: 'PDF, CSV',
      size: '1.2 MB',
      icon: <IndianRupee size={20} />,
    },
    {
      id: 'RPT-007',
      name: 'Provider Performance Report',
      description: 'Training provider performance benchmarking and quality assessment',
      category: 'Program',
      lastUpdated: '22 Sep 2026',
      format: 'PDF, CSV',
      size: '1.6 MB',
      icon: <Activity size={20} />,
    },
    {
      id: 'RPT-008',
      name: 'Alert Summary Report',
      description: 'Summary of critical alerts, exceptions, and resolution status',
      category: 'Monitoring',
      lastUpdated: '27 Sep 2026',
      format: 'PDF, CSV',
      size: '0.8 MB',
      icon: <FileText size={20} />,
    },
  ];

  const handleExport = (reportId: string, reportName: string) => {
    setExportingReport(reportId);
    
    let csvRows = '';
    if (reportId === 'RPT-002' || reportId === 'RPT-001') {
      csvRows = 'District,Enrolled,Certified,Placed,PlacementRate,RetentionRate\n' +
        districtIntelligence.map(d => `"${d.district}",${d.enrolled},${d.certified},${d.placed},${d.placementRate}%,${d.retention}%`).join('\n');
    } else if (reportId === 'RPT-003') {
      csvRows = 'Skill,Demand,Supply,Gap,DeficitRatio\n' +
        skillDemandSupply.map(s => `"${s.skill}",${s.demand},${s.supply},${s.gap},"${Math.round((s.gap / s.demand) * 100)}%"`).join('\n');
    } else {
      csvRows = 'Record ID,Metric,Category,Achieved,Target,Variance,Status\n' +
        `"R1","State Enrolment Target","Statewide","84,300","75,000","+12.4%","Surpassed"\n` +
        `"R2","Certification Clearance","Statewide","71,800","65,000","+10.5%","Optimal"\n` +
        `"R3","Industrial Placement","Statewide","57,400","50,000","+14.8%","Exceeded"\n` +
        `"R4","90-Day EPFO Retention","Statewide","38,900","36,000","+8.1%","Compliant"\n` +
        `"R5","Median Entry Wage","Industrial","₹17,800","₹16,000","+11.3%","Above Benchmark"`;
    }

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DISHA_${reportName.replace(/\s+/g, '_')}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
      setExportingReport(null);
      showToast(`${reportName} CSV export completed successfully`, 'success');
    }, 400);
  };

  const categoryGroups = reports.reduce((groups, report) => {
    const category = report.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(report);
    return groups;
  }, {} as Record<string, Report[]>);

  // Filtered audit candidates
  const filteredAuditCandidates = MOCK_AUDIT_CANDIDATES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
      c.trade.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
      c.employer.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
      c.dossierId.toLowerCase().includes(auditSearchQuery.toLowerCase());
    const matchesDistrict = auditDistrictFilter === 'All' || c.district === auditDistrictFilter;
    return matchesSearch && matchesDistrict;
  });

  return (
    <DashboardLayout 
      role="government" 
      title="Reports & Audit Intelligence" 
      subtitle="State-wide statutory reports, candidate audit dossiers, and multi-source verification"
      showDistrictSelector={false}
    >
      {/* Top Level Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 mb-6 pb-1">
        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-2.5 px-3 text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
            activeTab === 'reports'
              ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
        >
          <FileSpreadsheet size={16} />
          <span>Statutory Reports & Datasets ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audits')}
          className={`pb-2.5 px-3 text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
            activeTab === 'audits'
              ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
        >
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>Candidate Progress & Retention Audit Dossiers</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            EPFO Triangulated
          </span>
        </button>
      </div>

      {/* VIEW 1: STATUTORY REPORTS & DATASETS */}
      {activeTab === 'reports' && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card padding="md" className="hover:shadow-card-hover transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Total Reports</span>
                <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                  <FileText size={16} className="text-brand-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-brand-600">{reports.length}</p>
              <p className="text-xs text-text-tertiary mt-1">Available reports</p>
            </Card>

            <Card padding="md" className="hover:shadow-card-hover transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Categories</span>
                <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                  <BarChart3 size={16} className="text-brand-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-brand-600">{Object.keys(categoryGroups).length}</p>
              <p className="text-xs text-text-tertiary mt-1">Report categories</p>
            </Card>

            <Card padding="md" className="hover:shadow-card-hover transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Last Updated</span>
                <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                  <Calendar size={16} className="text-brand-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-brand-600">Today</p>
              <p className="text-xs text-text-tertiary mt-1">Latest report update</p>
            </Card>

            <Card padding="md" className="hover:shadow-card-hover transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Total Size</span>
                <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                  <Download size={16} className="text-brand-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-brand-600">14.4 MB</p>
              <p className="text-xs text-text-tertiary mt-1">All reports combined</p>
            </Card>
          </div>

          {/* Report Categories */}
          {Object.entries(categoryGroups).map(([category, categoryReports]) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-semibold text-text-primary mb-3">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryReports.map((report) => (
                  <Card key={report.id} padding="md" className="hover:shadow-card-hover transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                        <div className="text-brand-500">
                          {report.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-text-primary mb-1 truncate">{report.name}</h4>
                        <p className="text-xs text-text-secondary line-clamp-2">{report.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-text-tertiary pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span>{report.format}</span>
                        <span className="mx-1">•</span>
                        <span>{report.size}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setPreviewReport(report)}
                          className="h-7 px-2 text-xs"
                        >
                          <Eye size={12} className="mr-1" />
                          Preview
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={exportingReport === report.id}
                          onClick={() => handleExport(report.id, report.name)}
                          className="h-7 px-2 text-xs"
                        >
                          <Download size={12} className="mr-1" />
                          {exportingReport === report.id ? 'Exporting...' : 'CSV'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* VIEW 2: CANDIDATE PROGRESS & RETENTION AUDIT DOSSIERS */}
      {activeTab === 'audits' && (
        <div className="space-y-5">
          {/* Header Description & Controls */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-400" />
                <h3 className="text-base font-bold">Statewide Master Candidate Registry & Verification Audits</h3>
              </div>
              <p className="text-xs text-blue-200/90 max-w-2xl leading-relaxed">
                Inspect end-to-end evidence dossiers for individual trainees across Maharashtra. Every dossier combines DigiLocker certificates, ITI biometric attendance logs, EPFO UAN contribution records, and longitudinal wage tracking.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle size={14} /> 98.2% Statutory Triangulation
              </span>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={auditSearchQuery}
                onChange={(e) => setAuditSearchQuery(e.target.value)}
                placeholder="Search by candidate, trade, employer or dossier ID..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123B6D]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Filter District:</span>
              <select
                value={auditDistrictFilter}
                onChange={(e) => setAuditDistrictFilter(e.target.value)}
                className="text-xs py-1.5 px-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="All">All 36 Districts</option>
                <option value="Pune">Pune</option>
                <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
                <option value="Nashik">Nashik</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Thane">Thane</option>
                <option value="Kolhapur">Kolhapur</option>
              </select>
            </div>
          </div>

          {/* Audit Candidate Records Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">Candidate & Dossier</th>
                    <th className="p-3.5">Trade & Institution</th>
                    <th className="p-3.5">Biometric Attendance</th>
                    <th className="p-3.5">Employer & EPFO Status</th>
                    <th className="p-3.5">Wage Progression</th>
                    <th className="p-3.5 text-center">LOI Score</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredAuditCandidates.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {c.name}
                          {c.status === 'Verified' ? (
                            <CheckCircle size={13} className="text-emerald-600" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          )}
                        </div>
                        <p className="text-[11px] font-mono text-slate-400">{c.dossierId}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {c.district}
                          </span>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <p className="font-medium text-slate-800 dark:text-slate-200">{c.trade}</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-[200px]">{c.itiCenter}</p>
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <Fingerprint size={14} className={c.attendanceRate >= 80 ? 'text-emerald-600' : 'text-amber-500'} />
                          <span className="font-bold text-slate-900 dark:text-slate-100">{c.attendanceRate}%</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Morpho AEBAS Geotagged</span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1">
                          <Building2 size={13} className="text-blue-500" />
                          <span className="truncate max-w-[170px]">{c.employer}</span>
                        </div>
                        <p className="text-[10px] font-mono text-emerald-600 mt-0.5">UAN: {c.epfoUan} (Active)</p>
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-baseline gap-1 font-bold text-slate-900 dark:text-white">
                          <span>{c.currentWage}</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">{c.wageGrowth}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Entry: {c.entryWage} • {c.retentionMonths}M retained</span>
                      </td>

                      <td className="p-3.5 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {c.loiScore}
                        </span>
                      </td>

                      <td className="p-3.5 text-right">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedAuditCandidate(c)}
                          className="h-8 px-2.5 text-xs bg-[#123B6D] hover:bg-[#0e2f57] inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <ShieldCheck size={13} />
                          <span>Inspect Dossier</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAuditCandidates.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                No candidate dossiers match the query &ldquo;{auditSearchQuery}&rdquo;.
              </div>
            )}
          </div>
        </div>
      )}

      {/* REPORT PREVIEW MODAL */}
      {previewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[85vh] flex flex-col p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#123B6D] dark:text-blue-400">
                  {previewReport.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{previewReport.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{previewReport.id}</span>
                    <span>•</span>
                    <span>Updated: {previewReport.lastUpdated}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setPreviewReport(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 text-xs space-y-4 my-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{previewReport.description}</p>
              </div>

              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">Sample Dataset Snapshot:</p>
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-2.5">Entity / Metric</th>
                        <th className="p-2.5">Enrolled / Target</th>
                        <th className="p-2.5">Certified</th>
                        <th className="p-2.5">Placement %</th>
                        <th className="p-2.5">EPFO 90D Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="p-2.5 font-medium text-slate-900 dark:text-slate-100">Pune Industrial Cluster</td>
                        <td className="p-2.5">18,400</td>
                        <td className="p-2.5">15,800</td>
                        <td className="p-2.5 text-emerald-600 font-bold">84.2%</td>
                        <td className="p-2.5 text-blue-600 font-semibold">91.4% Verified</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-slate-900 dark:text-slate-100">Nagpur Logistics Hub</td>
                        <td className="p-2.5">9,600</td>
                        <td className="p-2.5">8,100</td>
                        <td className="p-2.5 text-emerald-600 font-bold">78.5%</td>
                        <td className="p-2.5 text-blue-600 font-semibold">88.0% Verified</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-slate-900 dark:text-slate-100">Chhatrapati Sambhajinagar Auto</td>
                        <td className="p-2.5">8,200</td>
                        <td className="p-2.5">6,950</td>
                        <td className="p-2.5 text-emerald-600 font-bold">76.8%</td>
                        <td className="p-2.5 text-blue-600 font-semibold">86.2% Verified</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-slate-900 dark:text-slate-100">Nashik Engineering Belt</td>
                        <td className="p-2.5">7,400</td>
                        <td className="p-2.5">6,300</td>
                        <td className="p-2.5 text-emerald-600 font-bold">74.1%</td>
                        <td className="p-2.5 text-blue-600 font-semibold">83.5% Verified</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">Government of Maharashtra • Skill Development Department</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewReport(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleExport(previewReport.id, previewReport.name);
                    setPreviewReport(null);
                  }}
                  className="bg-[#123B6D] hover:bg-[#0e2f57]"
                >
                  <Download size={13} className="mr-1.5" />
                  Download Complete CSV
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL AUDIT DOSSIER MODAL */}
      <AuditDossierModal
        candidate={selectedAuditCandidate}
        isOpen={!!selectedAuditCandidate}
        onClose={() => setSelectedAuditCandidate(null)}
      />
    </DashboardLayout>
  );
}
