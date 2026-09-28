'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { candidates as initialCandidates } from '@/data/mockEmployers';
import { 
  Users, 
  Star, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ArrowRight, 
  Filter, 
  Search,
  Calendar,
  Building2,
  MapPin,
  Award,
  FileSpreadsheet,
  Check,
  X,
  Phone,
  Mail,
  Video,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  List
} from 'lucide-react';

interface CandidateRecord {
  id: string;
  name: string;
  roleApplied: string;
  matchScore: number;
  examScore: number;
  skills: string[];
  district: string;
  education: string;
  experience: string;
  status: 'review' | 'exam' | 'shortlisted' | 'interview' | 'hired' | 'rejected';
  appliedDate: string;
  interviewDate?: string;
  phone?: string;
  email?: string;
}

const mockPipelineCandidates: CandidateRecord[] = [
  {
    id: 'cand-01',
    name: 'Rahul Sharma',
    roleApplied: 'CNC Turning Operator',
    matchScore: 94,
    examScore: 92,
    skills: ['CNC Turning', 'G-Code', 'AutoCAD', '5S Metrology'],
    district: 'Pune',
    education: 'ITI Aundh • NCVT Level 4',
    experience: '6 Months Apprentice',
    status: 'shortlisted',
    appliedDate: '2026-09-18',
    interviewDate: '28 Sep 2026, 11:30 AM',
    phone: '+91 98231 44512',
    email: 'rahul.sharma@disha.gov.in',
  },
  {
    id: 'cand-02',
    name: 'Sneha Patil',
    roleApplied: 'Quality Control Metrologist',
    matchScore: 91,
    examScore: 89,
    skills: ['CMM Inspection', 'Vernier Caliper', 'ISO 9001', 'SPC'],
    district: 'Kolhapur',
    education: 'Govt Polytechnic Kolhapur',
    experience: '1 Year Industrial Trainee',
    status: 'interview',
    appliedDate: '2026-09-20',
    interviewDate: '29 Sep 2026, 02:00 PM',
    phone: '+91 97654 88321',
    email: 'sneha.patil@mahaskill.in',
  },
  {
    id: 'cand-03',
    name: 'Amol Shinde',
    roleApplied: 'PLC & Automation Technician',
    matchScore: 88,
    examScore: 84,
    skills: ['Siemens PLC', 'SCADA Basics', 'Ladder Logic', 'Wiring'],
    district: 'Aurangabad',
    education: 'ITI Aurangabad • Electrician',
    experience: 'Fresh Certified',
    status: 'exam',
    appliedDate: '2026-09-21',
    phone: '+91 98450 12398',
    email: 'amol.shinde@aurangabad.in',
  },
  {
    id: 'cand-04',
    name: 'Pooja Kadam',
    roleApplied: 'EV Battery Assembly Specialist',
    matchScore: 96,
    examScore: 95,
    skills: ['BMS Wiring', 'Cell Diagnostics', 'High-Voltage Safety'],
    district: 'Pune',
    education: 'Tata Stryder Skill Center',
    experience: '8 Months EV Lab',
    status: 'hired',
    appliedDate: '2026-09-12',
    interviewDate: '22 Sep 2026 (Completed)',
    phone: '+91 99220 77610',
    email: 'pooja.kadam@techauto.org',
  },
  {
    id: 'cand-05',
    name: 'Ganesh Deshmukh',
    roleApplied: 'Industrial Welder (MIG/TIG)',
    matchScore: 82,
    examScore: 78,
    skills: ['MIG Welding', 'TIG 6G', 'Gas Cutting', 'WPS Standards'],
    district: 'Nashik',
    education: 'ITI Nashik',
    experience: '1 Year Fabrication',
    status: 'review',
    appliedDate: '2026-09-24',
    phone: '+91 94231 66540',
    email: 'ganesh.weld@nashikmfg.com',
  },
  {
    id: 'cand-06',
    name: 'Kavita Salunkhe',
    roleApplied: 'Solar PV Systems Installer',
    matchScore: 86,
    examScore: 81,
    skills: ['Inverter Sizing', 'DC Wiring', 'Rooftop Mounts'],
    district: 'Solapur',
    education: 'Surya Mitra Certified',
    experience: '4 Months Project',
    status: 'exam',
    appliedDate: '2026-09-22',
    phone: '+91 98555 43210',
    email: 'kavita.solapur@mahaurja.gov.in',
  },
  {
    id: 'cand-07',
    name: 'Vikram Jadhav',
    roleApplied: 'Senior CNC Turning Operator',
    matchScore: 93,
    examScore: 91,
    skills: ['Fanuc Oi-TF', 'Mastercam', 'Tool Offsetting', 'GD&T'],
    district: 'Nagpur',
    education: 'Govt ITI Nagpur',
    experience: '1.5 Years Toolroom',
    status: 'shortlisted',
    appliedDate: '2026-09-19',
    interviewDate: '30 Sep 2026, 10:00 AM',
    phone: '+91 97300 11984',
    email: 'vikram.jadhav@vidarbha.in',
  },
  {
    id: 'cand-08',
    name: 'Deepak Thorat',
    roleApplied: 'Hydraulics & Maintenance Fitter',
    matchScore: 79,
    examScore: 72,
    skills: ['Pump Overhaul', 'Valve Testing', 'Pneumatics'],
    district: 'Ahmednagar',
    education: 'ITI Ahmednagar',
    experience: 'Fresh Certified',
    status: 'review',
    appliedDate: '2026-09-25',
    phone: '+91 96041 33201',
    email: 'deepak.thorat@agroindustries.in',
  },
];

export default function EmployerApplicationsPage() {
  const { shortlistCandidate, showToast } = useApp();
  const [candidates, setCandidates] = useState<CandidateRecord[]>(mockPipelineCandidates);
  const [activeStage, setActiveStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [scheduleModalCandidate, setScheduleModalCandidate] = useState<CandidateRecord | null>(null);
  const [scheduleDate, setScheduleDate] = useState('2026-09-30');
  const [scheduleTime, setScheduleTime] = useState('11:00');
  const [scheduleType, setScheduleType] = useState('video');

  const stageCounts = {
    all: candidates.length,
    review: candidates.filter(c => c.status === 'review').length,
    exam: candidates.filter(c => c.status === 'exam').length,
    shortlisted: candidates.filter(c => c.status === 'shortlisted').length,
    interview: candidates.filter(c => c.status === 'interview').length,
    hired: candidates.filter(c => c.status === 'hired').length,
  };

  const filtered = candidates.filter(c => {
    const matchesStage = activeStage === 'all' || c.status === activeStage;
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.roleApplied.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStage && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: CandidateRecord['status']) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    const cand = candidates.find(c => c.id === id);
    showToast(`${cand?.name || 'Candidate'} moved to ${newStatus.toUpperCase()}`, 'success');
  };

  const handleScheduleConfirm = () => {
    if (!scheduleModalCandidate) return;
    const dateFormatted = `${scheduleDate} at ${scheduleTime} (${scheduleType === 'video' ? 'Virtual Meet' : 'Chakan Plant'})`;
    setCandidates(prev => prev.map(c => 
      c.id === scheduleModalCandidate.id 
        ? { ...c, status: 'interview', interviewDate: dateFormatted } 
        : c
    ));
    showToast(`Interview scheduled for ${scheduleModalCandidate.name}: ${dateFormatted}`, 'success');
    setScheduleModalCandidate(null);
  };

  const handleExportCSV = () => {
    const header = 'Candidate ID,Name,Applied Role,Match Score,Exam Score,Status,District,Education,Interview Date\n';
    const rows = candidates.map(c => 
      `"${c.id}","${c.name}","${c.roleApplied}",${c.matchScore}%,${c.examScore}/100,"${c.status.toUpperCase()}","${c.district}","${c.education}","${c.interviewDate || 'Not Scheduled'}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DISHA_Employer_Pipeline_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Applicant Pipeline exported to CSV successfully', 'success');
  };

  return (
    <DashboardLayout
      role="employer"
      title="Recruitment Pipeline & Candidate Applications"
      subtitle="Multi-stage talent tracking: screening, corporate exams, interviews, and verified hiring"
      showDistrictSelector={false}
    >
      {/* Top KPI Metric Cards matching reference prototype */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Active Openings</p>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">4 Roles</p>
          <span className="text-[10px] text-emerald-600 font-semibold">14 vacancies</span>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Applicants</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stageCounts.all}</p>
          <span className="text-[10px] text-slate-500">100% verified ITI</span>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Under Review</p>
          <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mt-1">{stageCounts.review}</p>
          <span className="text-[10px] text-slate-500">New submissions</span>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Corporate Exam</p>
          <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">{stageCounts.exam}</p>
          <span className="text-[10px] text-amber-600">Avg score: 84/100</span>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Interviews Active</p>
          <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">{stageCounts.interview}</p>
          <span className="text-[10px] text-purple-600">3 slots today</span>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Selected & Hired</p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stageCounts.hired}</p>
          <span className="text-[10px] text-emerald-600">₹8,000 subsidy/hire</span>
        </div>
      </div>

      {/* Filter Chips Bar & Actions matching reference prototype */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Stage Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Candidates', count: stageCounts.all },
              { id: 'review', label: 'Under Review', count: stageCounts.review },
              { id: 'exam', label: 'Corporate Exam', count: stageCounts.exam },
              { id: 'shortlisted', label: 'Shortlisted', count: stageCounts.shortlisted },
              { id: 'interview', label: 'Interview Scheduled', count: stageCounts.interview },
              { id: 'hired', label: 'Selected & Hired', count: stageCounts.hired },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveStage(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeStage === tab.id
                    ? 'bg-[#123B6D] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeStage === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Right Toolbar: Search, View Mode, Export */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidate, skill, district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 w-52 sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-100 dark:bg-slate-900">
              <button
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${viewMode === 'card' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
                title="Card View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${viewMode === 'table' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
                title="Table View"
              >
                <List size={15} />
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="text-xs flex items-center gap-1.5"
            >
              <FileSpreadsheet size={14} />
              <span>Export CSV</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Candidate Pipeline Cards View */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card 
              key={c.id} 
              padding="md" 
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md transition-all relative flex flex-col justify-between"
            >
              <div>
                {/* Header: Name, Match %, Stage Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#123B6D] dark:text-blue-300 font-bold flex items-center justify-center text-sm border border-blue-200 dark:border-blue-800">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{c.name}</h4>
                      <p className="text-xs font-medium text-blue-700 dark:text-blue-400">{c.roleApplied}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <Star size={11} className="fill-emerald-600 text-emerald-600" />
                      <span>{c.matchScore}% Match</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Applied: {c.appliedDate}</p>
                  </div>
                </div>

                {/* Academic & Location details */}
                <div className="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-2.5 mb-3 text-xs space-y-1.5 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Award size={13} className="text-blue-600" />
                      <span className="truncate">{c.education}</span>
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{c.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-rose-500" />
                      <span>{c.district}, Maharashtra</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
                      <TrendingUp size={12} />
                      Exam: {c.examScore}/100
                    </span>
                  </div>
                </div>

                {/* Verified Skills */}
                <div className="mb-4">
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Verified Skill Passport Badges:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <span 
                        key={s} 
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interview Date banner if scheduled */}
                {c.interviewDate && (
                  <div className="mb-4 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs flex items-center justify-between text-purple-900 dark:text-purple-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar size={13} className="text-purple-600" />
                      <span>Interview: {c.interviewDate}</span>
                    </span>
                    <Badge variant="neutral" size="sm" className="text-[10px]">Active Slot</Badge>
                  </div>
                )}
              </div>

              {/* Action Buttons matching reference prototype */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Badge 
                    variant={
                      c.status === 'hired' ? 'success' :
                      c.status === 'interview' ? 'warning' :
                      c.status === 'shortlisted' ? 'info' :
                      c.status === 'exam' ? 'neutral' : 'neutral'
                    }
                    size="sm"
                    className="capitalize"
                  >
                    {c.status === 'exam' ? 'Corporate Exam' : c.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-1.5">
                  {c.status !== 'interview' && c.status !== 'hired' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setScheduleModalCandidate(c)}
                      className="text-xs h-7 px-2.5 text-purple-700 dark:text-purple-400 border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950"
                    >
                      <Calendar size={12} className="mr-1" />
                      Schedule
                    </Button>
                  )}

                  {c.status !== 'shortlisted' && c.status !== 'hired' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateStatus(c.id, 'shortlisted')}
                      className="text-xs h-7 px-2 text-blue-700 dark:text-blue-400 border-blue-300 hover:bg-blue-50"
                    >
                      Shortlist
                    </Button>
                  )}

                  {c.status !== 'hired' ? (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleUpdateStatus(c.id, 'hired')}
                      className="text-xs h-7 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Check size={12} className="mr-1" />
                      Hire Candidate
                    </Button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      Direct Roll Hired
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-600 dark:text-slate-300">
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Role Applied</th>
                  <th className="p-3">Match</th>
                  <th className="p-3">Exam Score</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Pipeline Stage</th>
                  <th className="p-3">Interview / Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                    <td className="p-3">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{c.name}</p>
                      <p className="text-[10px] text-slate-400">{c.education}</p>
                    </td>
                    <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{c.roleApplied}</td>
                    <td className="p-3">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{c.matchScore}%</span>
                    </td>
                    <td className="p-3 font-semibold text-amber-700 dark:text-amber-400">
                      {c.examScore}/100
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{c.district}</td>
                    <td className="p-3">
                      <Badge 
                        variant={
                          c.status === 'hired' ? 'success' :
                          c.status === 'interview' ? 'warning' :
                          c.status === 'shortlisted' ? 'info' : 'neutral'
                        } 
                        size="sm"
                      >
                        {c.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-3 text-slate-500">
                      {c.interviewDate || 'Not Scheduled'}
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => setScheduleModalCandidate(c)}
                        className="px-2 py-1 rounded text-[11px] font-semibold text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 hover:bg-purple-50"
                      >
                        Schedule
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(c.id, 'hired')}
                        className="px-2 py-1 rounded text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100"
                      >
                        Hire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Schedule Interview Modal */}
      {scheduleModalCandidate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl max-w-md w-full p-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Schedule Technical Interview</h3>
                <p className="text-xs text-slate-500">Candidate: {scheduleModalCandidate.name} ({scheduleModalCandidate.roleApplied})</p>
              </div>
              <button 
                onClick={() => setScheduleModalCandidate(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Interview Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setScheduleType('video')}
                    className={`p-2.5 rounded-lg border text-left flex items-center gap-2 cursor-pointer ${
                      scheduleType === 'video' 
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    <Video size={16} className="text-blue-600" />
                    <span>Virtual (Google Meet)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleType('in-person')}
                    className={`p-2.5 rounded-lg border text-left flex items-center gap-2 cursor-pointer ${
                      scheduleType === 'in-person' 
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    <Building2 size={16} className="text-blue-600" />
                    <span>Chakan MIDC Plant</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Time Slot</label>
                  <select
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  >
                    <option value="10:00 AM">10:00 AM - 10:45 AM</option>
                    <option value="11:30 AM">11:30 AM - 12:15 PM</option>
                    <option value="02:00 PM">02:00 PM - 02:45 PM</option>
                    <option value="04:00 PM">04:00 PM - 04:45 PM</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <p className="font-semibold text-slate-800 dark:text-slate-200">Candidate Contact:</p>
                <p className="text-slate-500">Phone: {scheduleModalCandidate.phone}</p>
                <p className="text-slate-500">Email: {scheduleModalCandidate.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setScheduleModalCandidate(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmSchedule => handleScheduleConfirm()}
                className="bg-[#123B6D] hover:bg-[#0e2f57]"
              >
                Send Interview Invite
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
