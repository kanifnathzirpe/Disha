'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import {
  Building2,
  Users,
  ClipboardCheck,
  Award,
  AlertTriangle,
  Fingerprint,
  TrendingUp,
  Clock,
  CheckCircle2,
  FileCheck,
  Send,
  Download,
  Search,
  Eye,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/translations';

interface Batch {
  id: string;
  name: string;
  trade: string;
  enrolled: number;
  completedDays: number;
  totalDays: number;
  attendanceAvg: number;
  instructor: string;
  status: 'In Progress' | 'Assessment Pending' | 'Completed';
}

interface DropoutAlert {
  id: string;
  candidateName: string;
  batch: string;
  currentAttendance: number;
  consecutiveAbsences: number;
  reason: string;
  riskLevel: 'Critical' | 'High' | 'Moderate';
  contactPhone: string;
}

export default function InstitutionPage() {
  const { showToast, language } = useApp();
  const [activeTab, setActiveTab] = useState<'batches' | 'attendance' | 'dropout' | 'claims'>('batches');
  const [selectedBatch, setSelectedBatch] = useState<string>('All');
  const [claimSubmitted, setClaimSubmitted] = useState<string[]>([]);
  const [alertIntervened, setAlertIntervened] = useState<string[]>([]);

  const batches: Batch[] = [
    {
      id: 'BAT-2026-041',
      name: 'CNC Automation & Multi-Axis Operations',
      trade: 'Precision Engineering',
      enrolled: 40,
      completedDays: 44,
      totalDays: 60,
      attendanceAvg: 88.5,
      instructor: 'Prof. Sandeep Joshi',
      status: 'In Progress'
    },
    {
      id: 'BAT-2026-042',
      name: 'Electric Vehicle Battery & BMS Servicing',
      trade: 'Automotive & Clean Tech',
      enrolled: 35,
      completedDays: 52,
      totalDays: 60,
      attendanceAvg: 94.2,
      instructor: 'Er. Aniket Patil',
      status: 'In Progress'
    },
    {
      id: 'BAT-2026-043',
      name: 'Industrial IoT & Sensor Automation',
      trade: 'Electronics & Instrumentation',
      enrolled: 30,
      completedDays: 60,
      totalDays: 60,
      attendanceAvg: 91.0,
      instructor: 'Dr. Kavita Deshmukh',
      status: 'Assessment Pending'
    },
    {
      id: 'BAT-2026-044',
      name: 'Full Stack Web Architecture & APIs',
      trade: 'IT & Software Systems',
      enrolled: 45,
      completedDays: 60,
      totalDays: 60,
      attendanceAvg: 95.8,
      instructor: 'Tanmay Sharma',
      status: 'Completed'
    },
  ];

  const dropoutAlerts: DropoutAlert[] = [
    {
      id: 'DO-01',
      candidateName: 'Kunal Shirsat',
      batch: 'CNC Automation (BAT-2026-041)',
      currentAttendance: 68.2,
      consecutiveAbsences: 4,
      reason: 'Long commute from Shirur; transportation issue',
      riskLevel: 'Critical',
      contactPhone: '+91 98231 44019'
    },
    {
      id: 'DO-02',
      candidateName: 'Neha Waghmare',
      batch: 'Industrial IoT (BAT-2026-043)',
      currentAttendance: 72.0,
      consecutiveAbsences: 3,
      reason: 'Family medical emergency',
      riskLevel: 'High',
      contactPhone: '+91 98450 11928'
    },
    {
      id: 'DO-03',
      candidateName: 'Akash Salunkhe',
      batch: 'EV Battery Servicing (BAT-2026-042)',
      currentAttendance: 74.1,
      consecutiveAbsences: 2,
      reason: 'Part-time agricultural harvest support',
      riskLevel: 'Moderate',
      contactPhone: '+91 94220 89201'
    }
  ];

  const handleIntervention = (id: string, name: string) => {
    setAlertIntervened(prev => [...prev, id]);
    showToast(`Counselor assigned for ${name}. SMS & parent outreach triggered.`, 'success');
  };

  const handleSubmitClaim = (claimId: string, amount: string) => {
    setClaimSubmitted(prev => [...prev, claimId]);
    showToast(`Claim ${claimId} (${amount}) submitted to DVET for EPFO verification`, 'success');
  };

  return (
    <DashboardLayout
      role="institution"
      title={language === 'mr' ? 'प्रशिक्षण संस्था नियंत्रण केंद्र' : 'Training Institution Command Hub'}
      subtitle={language === 'mr' ? 'अपेक्स व्होकेशनल इन्स्टिट्यूट व ITI, पुणे • केंद्र कोड: TC-PUN-0194' : 'Apex Vocational Institute & ITI, Pune • Center Code: TC-PUN-0194'}
      showDistrictSelector={false}
    >
      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              {language === 'mr' ? 'नोंदणीकृत प्रशिक्षणार्थी' : 'Enrolled Trainees'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#123B6D] dark:text-blue-400">
              <Users size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">480</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            {language === 'mr' ? '६ तांत्रिक बॅचेसमध्ये' : 'across 6 technical batches'}
          </p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              {language === 'mr' ? 'AEBAS बायोमेट्रिक हजेरी' : 'AEBAS Biometric Punch'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
              <Fingerprint size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-600">92.4%</p>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr' ? '३ टर्मिनल्स सक्रिय व ऑनलाइन' : '3 terminals active & online'}
          </p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              {language === 'mr' ? 'नोकरी नियुक्ती क्लिअरन्स' : 'Placement Clearance'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
              <Award size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-purple-600">78.4%</p>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr' ? '३७६ EPFO पडताळणीसह नियुक्त' : '376 placed with EPFO link'}
          </p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              {language === 'mr' ? 'प्रलंबित शासकीय प्रोत्साहन' : 'Pending State Incentive'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
              <ShieldCheck size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600">₹14.8 L</p>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr' ? 'हप्ता-३ पडताळणीनंतर जमा' : 'Tranche-3 post-verification'}
          </p>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 mb-6 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('batches')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === 'batches'
              ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
        >
          <Building2 size={16} />
          <span>{language === 'mr' ? 'सक्रिय बॅचेस व अभ्यासक्रम' : 'Active Batches & Curriculum'}</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === 'attendance'
              ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
        >
          <Fingerprint size={16} />
          <span>{language === 'mr' ? 'AEBAS बायोमेट्रिक हार्डवेअर सिंक' : 'AEBAS Biometric Hardware Sync'}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>

        <button
          onClick={() => setActiveTab('dropout')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === 'dropout'
              ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
        >
          <AlertTriangle size={16} className="text-amber-500" />
          <span>{language === 'mr' ? 'गळती पूर्व चेतावणी कक्ष' : 'Dropout Risk Early Warnings'}</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
            {dropoutAlerts.filter(a => !alertIntervened.includes(a.id)).length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('claims')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === 'claims'
              ? 'border-[#123B6D] text-[#123B6D] dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
        >
          <ShieldCheck size={16} />
          <span>{language === 'mr' ? 'डीबीटी अनुदान व टप्पा दावे' : 'Placement Claims & Reimbursements'}</span>
        </button>
      </div>

      {/* TAB 1: ACTIVE BATCHES */}
      {activeTab === 'batches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Training Batches (Academic Year 2026-27)
            </h3>
            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast('Batch creation modal: Connected to DVET Portal', 'info')}
              className="bg-[#123B6D] hover:bg-[#0e2f57] text-xs"
            >
              <Plus size={14} className="mr-1" />
              Register New Batch
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {batches.map((batch) => (
              <Card key={batch.id} padding="md" className="border border-slate-200 dark:border-slate-800 hover:shadow-card-hover transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{batch.id}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{batch.name}</h4>
                    <p className="text-xs text-slate-500">{batch.trade}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    batch.status === 'In Progress' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                      : batch.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                  }`}>
                    {batch.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Curriculum Progress: {batch.completedDays}/{batch.totalDays} Days</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {Math.round((batch.completedDays / batch.totalDays) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#123B6D] rounded-full transition-all duration-500"
                      style={{ width: `${(batch.completedDays / batch.totalDays) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs mb-3">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Enrolled</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{batch.enrolled} Trainees</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Attendance</span>
                    <span className="font-bold text-emerald-600">{batch.attendanceAvg}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Lead Instructor</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">{batch.instructor}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 text-[11px]">NSQF Level 5 • DigiLocker Synced</span>
                  <div className="flex items-center gap-1.5">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showToast(`Opening roster for ${batch.name}`, 'info')}
                      className="h-7 px-2 text-xs"
                    >
                      View Roster
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => showToast(`Biometric logs downloaded for ${batch.id}`, 'success')}
                      className="h-7 px-2 text-xs"
                    >
                      <Download size={11} className="mr-1" />
                      Logs
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AEBAS BIOMETRIC SYNC */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Fingerprint size={20} className="text-emerald-400" />
                <h4 className="font-bold text-sm">AEBAS Geotagged Biometric Machine Network</h4>
              </div>
              <p className="text-xs text-emerald-200 max-w-xl">
                Real-time terminal synchronization with Government of Maharashtra central attendance servers. All punch events are cryptographically signed with machine GPS co-ordinates.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-xs font-bold text-emerald-300">
              100% ONLINE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Workshop Terminal 01</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <p className="text-xs text-slate-500">Morpho MSO-1300E3 • UID: AEBAS-PUN-0194-A</p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex justify-between"><span className="text-slate-400">Punches Today:</span><span className="font-bold">142</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Last Ping:</span><span className="text-emerald-600 font-semibold">1 min ago</span></div>
                <div className="flex justify-between"><span className="text-slate-400">GPS Status:</span><span className="text-slate-600 dark:text-slate-300">18.5590° N, 73.8074° E (Locked)</span></div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">CAD/CAM Lab Terminal 02</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-xs text-slate-500">Morpho MSO-1300E3 • UID: AEBAS-PUN-0194-B</p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex justify-between"><span className="text-slate-400">Punches Today:</span><span className="font-bold">128</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Last Ping:</span><span className="text-emerald-600 font-semibold">3 mins ago</span></div>
                <div className="flex justify-between"><span className="text-slate-400">GPS Status:</span><span className="text-slate-600 dark:text-slate-300">18.5592° N, 73.8076° E (Locked)</span></div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">EV Innovation Bay 03</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-xs text-slate-500">Morpho MSO-1300E3 • UID: AEBAS-PUN-0194-C</p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex justify-between"><span className="text-slate-400">Punches Today:</span><span className="font-bold">98</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Last Ping:</span><span className="text-emerald-600 font-semibold">2 mins ago</span></div>
                <div className="flex justify-between"><span className="text-slate-400">GPS Status:</span><span className="text-slate-600 dark:text-slate-300">18.5589° N, 73.8071° E (Locked)</span></div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 3: DROPOUT RISK EARLY WARNINGS */}
      {activeTab === 'dropout' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Early Intervention & Retention Safeguards
              </h3>
              <p className="text-xs text-slate-500">
                Trainees flagged by predictive model for falling below the 75% state certification attendance threshold.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {dropoutAlerts.map((alert) => {
              const isHandled = alertIntervened.includes(alert.id);
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isHandled
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-60'
                      : alert.riskLevel === 'Critical'
                      ? 'bg-red-50/60 dark:bg-red-950/20 border-red-200 dark:border-red-900'
                      : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{alert.candidateName}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          alert.riskLevel === 'Critical'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                        }`}>
                          {alert.riskLevel} Risk
                        </span>
                        {isHandled && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            ✓ Counselor Assigned
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{alert.batch}</p>
                      <p className="text-xs text-slate-500">Reported Issue: {alert.reason} • Contact: {alert.contactPhone}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">{alert.currentAttendance}%</span>
                        <span className="text-[10px] text-red-500">{alert.consecutiveAbsences} days absent</span>
                      </div>

                      <Button
                        variant={isHandled ? "outline" : "primary"}
                        size="sm"
                        disabled={isHandled}
                        onClick={() => handleIntervention(alert.id, alert.candidateName)}
                        className={`text-xs ${!isHandled ? 'bg-[#123B6D] hover:bg-[#0e2f57]' : ''}`}
                      >
                        {isHandled ? 'Handled' : 'Assign Counselor'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: CLAIMS & REIMBURSEMENTS */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#123B6D] dark:text-blue-300">
                Pramod Mahajan Kaushalya Vikas Abhiyan (PMKVY / MSSDS) Performance Reimbursements
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Submit certified batch outcome dossiers to trigger automated state subsidy disbursements based on EPFO 90-day retention confirmation.
              </p>
            </div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs bg-white dark:bg-slate-900">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Claim ID</th>
                  <th className="p-3">Batch & Trade</th>
                  <th className="p-3">Certified / Placed</th>
                  <th className="p-3">EPFO Retention Rate</th>
                  <th className="p-3">Claim Amount</th>
                  <th className="p-3">Verification Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-mono font-medium">CLM-2026-081</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Precision CNC Machining</td>
                  <td className="p-3">38 / 34 Placed</td>
                  <td className="p-3 text-emerald-600 font-bold">89.4% (30/34 EPFO active)</td>
                  <td className="p-3 font-bold">₹5,40,000</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      DVET Approved
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className="text-[11px] text-slate-400">Disbursed on 15-Sep</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-mono font-medium">CLM-2026-094</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">EV Battery Assembly</td>
                  <td className="p-3">35 / 31 Placed</td>
                  <td className="p-3 text-emerald-600 font-bold">93.5% (29/31 EPFO active)</td>
                  <td className="p-3 font-bold">₹4,95,000</td>
                  <td className="p-3">
                    {claimSubmitted.includes('CLM-2026-094') ? (
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[10px]">
                        Under DVET Review
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                        Ready to Submit
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={claimSubmitted.includes('CLM-2026-094')}
                      onClick={() => handleSubmitClaim('CLM-2026-094', '₹4,95,000')}
                      className="h-7 text-xs bg-[#123B6D] hover:bg-[#0e2f57]"
                    >
                      {claimSubmitted.includes('CLM-2026-094') ? 'Submitted' : 'Submit Claim'}
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-mono font-medium">CLM-2026-102</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Full Stack Software Web</td>
                  <td className="p-3">45 / 41 Placed</td>
                  <td className="p-3 text-emerald-600 font-bold">95.1% (39/41 EPFO active)</td>
                  <td className="p-3 font-bold">₹4,45,000</td>
                  <td className="p-3">
                    {claimSubmitted.includes('CLM-2026-102') ? (
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[10px]">
                        Under DVET Review
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                        Ready to Submit
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={claimSubmitted.includes('CLM-2026-102')}
                      onClick={() => handleSubmitClaim('CLM-2026-102', '₹4,45,000')}
                      className="h-7 text-xs bg-[#123B6D] hover:bg-[#0e2f57]"
                    >
                      {claimSubmitted.includes('CLM-2026-102') ? 'Submitted' : 'Submit Claim'}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
