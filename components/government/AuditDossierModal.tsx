'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Building2,
  Calendar,
  MapPin,
  FileText,
  Download,
  X,
  Clock,
  Fingerprint,
  TrendingUp,
  FileCheck,
  ExternalLink,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Badge, Button } from '@/components/ui';

export interface AuditCandidate {
  id: string;
  dossierId: string;
  name: string;
  trade: string;
  district: string;
  itiCenter: string;
  completionDate: string;
  employer: string;
  gstn: string;
  epfoUan: string;
  attendanceRate: number;
  entryWage: string;
  currentWage: string;
  wageGrowth: string;
  retentionMonths: number;
  loiScore: number;
  status: 'Verified' | 'Flagged' | 'Under Review';
  verificationSource: string[];
}

interface AuditDossierModalProps {
  candidate: AuditCandidate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditDossierModal({ candidate, isOpen, onClose }: AuditDossierModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'triangulation' | 'retention'>('overview');
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !candidate) return null;

  const handlePrint = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dossier-title"
      >
        {/* Header Bar */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#0D2F5B] to-[#123B6D] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  MAHARASHTRA SKILL OUTCOME INTELLIGENCE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  OFFICIAL AUDIT DOSSIER
                </span>
              </div>
              <h2 id="dossier-title" className="text-lg font-bold text-white flex items-center gap-2">
                {candidate.name} <span className="text-xs font-normal text-slate-300 font-mono">({candidate.dossierId})</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={downloading}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer border border-white/15"
              title="Print official dossier"
            >
              <Printer size={14} />
              <span>{downloading ? 'Preparing...' : 'Print Report'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Sub-header Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-5 text-xs font-medium text-slate-600 dark:text-slate-400 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <UserCheck size={14} />
            <span>Profile & Credentials</span>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'attendance'
                ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Fingerprint size={14} />
            <span>Biometric ITI Logs ({candidate.attendanceRate}%)</span>
          </button>
          <button
            onClick={() => setActiveTab('triangulation')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'triangulation'
                ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Building2 size={14} />
            <span>EPFO / GSTN Triangulation</span>
          </button>
          <button
            onClick={() => setActiveTab('retention')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'retention'
                ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <TrendingUp size={14} />
            <span>Wage & 12M Retention</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-slate-800 dark:text-slate-100">
          
          {/* TAB 1: OVERVIEW & CREDENTIALS */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Identity & Status Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase text-slate-400">Candidate Identity</span>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{candidate.name}</p>
                  <p className="text-xs text-slate-500">Aadhaar (Masked): XXXX-XXXX-4819</p>
                  <div className="pt-1 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <CheckCircle2 size={10} /> DigiLocker Verified
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                      EPFO Linked
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase text-slate-400">Training & Certification</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{candidate.trade}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{candidate.itiCenter}</p>
                  <p className="text-[11px] text-slate-400">Certified on {candidate.completionDate} • NSQF Level 5</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase text-slate-400">Longitudinal Outcome Index (LOI)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{candidate.loiScore}</span>
                    <span className="text-xs text-slate-400">/ 100</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                      Tier-1 Star Outcome
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Zero fraud flag • Active verified wage progression</p>
                </div>
              </div>

              {/* Multi-Agency Verification Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">DigiLocker Identity</span>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  </div>
                  <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">DL-MH-2026-99412</p>
                  <p className="text-[10px] text-slate-500 mt-1">Certified marksheet authenticity 100% verified via DVET gateway.</p>
                </div>

                <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Biometric Attendance</span>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{candidate.attendanceRate}% Valid Punch</p>
                  <p className="text-[10px] text-slate-500 mt-1">Geo-fenced Morpho scanner at ITI Aundh (0 proxy punches).</p>
                </div>

                <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">EPFO Triangulation</span>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  </div>
                  <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">UAN: {candidate.epfoUan}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Active employer statutory deposit verified for last 4 consecutive months.</p>
                </div>

                <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">GSTN Employer Check</span>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  </div>
                  <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">GST: {candidate.gstn}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Active corporate GSTIN filing under Pune Industrial Ward 4.</p>
                </div>
              </div>

              {/* Anti-Fraud / Ghost Beneficiary Assessment */}
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={18} className="text-[#123B6D] dark:text-blue-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#123B6D] dark:text-blue-300">
                    Anti-Ghost Beneficiary & Scheme Integrity Clearance
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Facial Recognition Match:</span>
                    <span className="font-semibold text-emerald-600">99.4% Match Score (Pass)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Duplicate Registration Check:</span>
                    <span className="font-semibold text-emerald-600">0 Duplicate Records across 36 Districts</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">State Subsidy Eligibility:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Cleared for Tranche-3 Disbursement</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BIOMETRIC ITI LOGS */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Aadhaar-Enabled Biometric Attendance System (AEBAS)</h4>
                  <p className="text-xs text-slate-500">Live hardware logs recorded at {candidate.itiCenter}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  {candidate.attendanceRate}% Aggregate Attendance
                </span>
              </div>

              {/* Terminal Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Device Model</span>
                  <span className="font-semibold">Morpho MSO-1300E3</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Machine UID</span>
                  <span className="font-mono text-[11px]">AEBAS-PUN-0419</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">GPS Co-ordinates</span>
                  <span className="font-mono text-[11px]">18.5590° N, 73.8074° E</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Geo-Fence Status</span>
                  <span className="text-emerald-600 font-semibold">Matched (±6m radius)</span>
                </div>
              </div>

              {/* Sample Session Logs Table */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                    <tr>
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Morning In</th>
                      <th className="p-2.5">Evening Out</th>
                      <th className="p-2.5">Duration</th>
                      <th className="p-2.5">Liveness Verification</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                    <tr>
                      <td className="p-2.5 font-sans font-medium">2026-08-14</td>
                      <td className="p-2.5 text-slate-700 dark:text-slate-300">08:58:14 IST</td>
                      <td className="p-2.5 text-slate-700 dark:text-slate-300">17:02:41 IST</td>
                      <td className="p-2.5">8h 04m</td>
                      <td className="p-2.5 text-emerald-600 font-sans">99.8% Iris + Fingerprint</td>
                      <td className="p-2.5"><span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-sans">Present</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium">2026-08-13</td>
                      <td className="p-2.5 text-slate-700 dark:text-slate-300">09:02:05 IST</td>
                      <td className="p-2.5 text-slate-700 dark:text-slate-300">17:15:30 IST</td>
                      <td className="p-2.5">8h 13m</td>
                      <td className="p-2.5 text-emerald-600 font-sans">99.1% Iris + Fingerprint</td>
                      <td className="p-2.5"><span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-sans">Present</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium">2026-08-12</td>
                      <td className="p-2.5 text-slate-700 dark:text-slate-300">08:55:40 IST</td>
                      <td className="p-2.5 text-slate-700 dark:text-slate-300">17:00:10 IST</td>
                      <td className="p-2.5">8h 05m</td>
                      <td className="p-2.5 text-emerald-600 font-sans">99.5% Iris + Fingerprint</td>
                      <td className="p-2.5"><span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-sans">Present</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium">2026-08-11</td>
                      <td className="p-2.5 text-slate-400">—</td>
                      <td className="p-2.5 text-slate-400">—</td>
                      <td className="p-2.5 text-slate-400">0h 00m</td>
                      <td className="p-2.5 text-slate-400 font-sans">Medical Exemption Logged</td>
                      <td className="p-2.5"><span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-sans">Excused</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: EPFO / GSTN TRIANGULATION */}
          {activeTab === 'triangulation' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Triangulated Statutory Verification</h4>
                <p className="text-xs text-slate-500">Cross-verified via Shram Suvidha, EPFO, and GSTN API Connectors</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="text-[#123B6D] dark:text-blue-400" size={18} />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{candidate.employer}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    Active Verified Employer
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Corporate GSTIN</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{candidate.gstn}</span>
                    <p className="text-[10px] text-emerald-600 mt-0.5">GSTR-3B filings current up to August 2026.</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">EPFO Establishment Code</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">MH/PUN/0048129/000</span>
                    <p className="text-[10px] text-emerald-600 mt-0.5">Compliant with Maharashtra Apprenticeship & PF Rules.</p>
                  </div>
                </div>
              </div>

              {/* Monthly Contribution History */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                  Electronic Challan Cum Return (ECR) Contribution Audit
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-2.5">Wage Month</th>
                      <th className="p-2.5">Gross Wages</th>
                      <th className="p-2.5">EPF Contribution</th>
                      <th className="p-2.5">Deposit Date</th>
                      <th className="p-2.5">Challan TRRN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                    <tr>
                      <td className="p-2.5 font-sans font-medium">August 2026</td>
                      <td className="p-2.5 text-slate-900 dark:text-white font-sans">{candidate.currentWage}</td>
                      <td className="p-2.5 text-emerald-600">₹2,160 (12%)</td>
                      <td className="p-2.5">14-Sep-2026</td>
                      <td className="p-2.5">TRRN-4910284719</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium">July 2026</td>
                      <td className="p-2.5 text-slate-900 dark:text-white font-sans">{candidate.currentWage}</td>
                      <td className="p-2.5 text-emerald-600">₹2,160 (12%)</td>
                      <td className="p-2.5">12-Aug-2026</td>
                      <td className="p-2.5">TRRN-4890192841</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium">June 2026</td>
                      <td className="p-2.5 text-slate-900 dark:text-white font-sans">{candidate.entryWage}</td>
                      <td className="p-2.5 text-emerald-600">₹1,980 (12%)</td>
                      <td className="p-2.5">13-Jul-2026</td>
                      <td className="p-2.5">TRRN-4871928411</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: RETENTION & WAGE PROGRESSION */}
          {activeTab === 'retention' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Longitudinal Retention Progression</h4>
                <p className="text-xs text-slate-500">Milestone checks at 30, 90, 180, and 365 days post-placement</p>
              </div>

              {/* Timeline Stepper */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {/* Step 1 */}
                  <div className="relative p-3 rounded-lg bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 shadow-2xs">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-1">
                      Day 30 Milestone
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{candidate.entryWage}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Confirmed placement start & first payroll run.</p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600">✓ Verified</span>
                  </div>

                  {/* Step 2 */}
                  <div className="relative p-3 rounded-lg bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 shadow-2xs">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-1">
                      Day 90 Milestone
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{candidate.entryWage}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Full probation clearance & supervisor review.</p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600">✓ Verified</span>
                  </div>

                  {/* Step 3 */}
                  <div className="relative p-3 rounded-lg bg-white dark:bg-slate-800 border border-blue-400 dark:border-blue-600 shadow-2xs ring-1 ring-blue-400">
                    <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400 block mb-1">
                      Day 180 Milestone (Current)
                    </span>
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300">{candidate.currentWage}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{candidate.wageGrowth} wage hike confirmed by HR.</p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-blue-600">✓ Active in Role</span>
                  </div>

                  {/* Step 4 */}
                  <div className="relative p-3 rounded-lg bg-slate-100 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                      Day 365 Milestone
                    </span>
                    <p className="text-sm font-bold text-slate-500">₹24,000 / mo</p>
                    <p className="text-[11px] text-slate-400 mt-1">Projected annual retention target.</p>
                    <span className="inline-block mt-2 text-[10px] font-semibold text-slate-400">Pending Date</span>
                  </div>
                </div>
              </div>

              {/* Wage Impact Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase">Starting Wage</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200">{candidate.entryWage}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Post-completion entry wage</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase">Current Wage (Month 6)</span>
                  <span className="text-base font-bold text-emerald-600">{candidate.currentWage}</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">{candidate.wageGrowth} real growth</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase">State Subsidy Multiplier</span>
                  <span className="text-base font-bold text-[#123B6D] dark:text-blue-400">1.25x (Bonus Grade)</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Awarded to ITI for &gt;80% 6-month retention</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Cryptographically sealed under Government of Maharashtra DVET Standards</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              disabled={downloading}
              className="bg-[#123B6D] hover:bg-[#0e2f57]"
            >
              <Download size={14} className="mr-1.5" />
              Download Official PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
