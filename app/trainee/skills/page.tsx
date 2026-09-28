'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { skillPassport, skillGap } from '@/data/mockTraineeExperience';
import { useApp } from '@/context/AppContext';
import { 
  Award, 
  Target, 
  BookOpen, 
  TrendingUp, 
  QrCode, 
  Download, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar,
  Building,
  User,
  Printer,
  Copy
} from 'lucide-react';

export default function TraineeSkillsPage() {
  const { user, verifyCertificate, verifiedCertificates, showToast } = useApp();
  const [showQR, setShowQR] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const skillsList = [
    { name: 'CNC Machine Operation & G-Code', category: 'Manufacturing', level: 'Advanced', proficiency: 92, verifiedDate: '15 Apr 2026', certId: 'MS-CNC-9481' },
    { name: 'PLC Programming (Siemens/Delta)', category: 'Automation', level: 'Intermediate', proficiency: 78, verifiedDate: '02 May 2026', certId: 'MS-PLC-4102' },
    { name: 'AutoCAD 2D/3D Mechanical', category: 'Design', level: 'Intermediate', proficiency: 74, verifiedDate: '20 May 2026', certId: 'MS-CAD-8831' },
    { name: 'Industrial Safety & OSHA Protocols', category: 'Safety', level: 'Advanced', proficiency: 95, verifiedDate: '10 Feb 2026', certId: 'MS-SAF-1092' },
    { name: 'Precision Machine Operations', category: 'Machining', level: 'Advanced', proficiency: 88, verifiedDate: '28 Mar 2026', certId: 'MS-PMO-3041' },
  ];

  const handleDownloadPassport = () => {
    showToast('Generating official Maharashtra State Skill Passport PDF...', 'info');
    setTimeout(() => {
      window.print();
    }, 600);
  };

  const handleVerifyCert = (id: string, name: string) => {
    verifyCertificate(id, name);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Public verified credential link copied to clipboard!', 'success');
    setShareModal(false);
  };

  return (
    <DashboardLayout 
      role="trainee" 
      title="Digital Skill Passport" 
      subtitle="Maharashtra State Skill Outcome &amp; Credential Registry"
      showDistrictSelector={false}
    >
      {/* Top Profile & Action Header Card */}
      <Card padding="md" className="mb-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-[#123B6D] dark:text-blue-400 border-2 border-blue-200 dark:border-blue-800 text-xl font-black">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{user.name}</h2>
                <Badge variant="success" size="sm">
                  <ShieldCheck size={12} className="mr-1 inline" />
                  DigiLocker Verified
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aadhaar: XXXX-XXXX-4819 • Registration ID: DISHA-TRN-2026-08149
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                Training Provider: <strong>Government ITI Aundh, Pune</strong> • Certificate Date: <strong>15 April 2026</strong>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowQR(!showQR)}
              className="text-xs h-8"
            >
              <QrCode size={14} className="mr-1 text-slate-600" />
              {showQR ? 'Hide QR' : 'QR Verification'}
            </Button>

            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShareModal(true)}
              className="text-xs h-8"
            >
              <Share2 size={14} className="mr-1 text-slate-600" />
              Share Profile
            </Button>

            <Button 
              size="sm" 
              variant="primary" 
              onClick={handleDownloadPassport}
              className="text-xs h-8 bg-[#123B6D] hover:bg-[#0D2F5B]"
            >
              <Download size={14} className="mr-1" />
              Download Skill Passport
            </Button>
          </div>
        </div>

        {/* QR Code Reveal Card */}
        {showQR && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
            <div className="w-20 h-20 bg-white p-2 rounded border border-slate-300 flex items-center justify-center">
              <QrCode size={64} className="text-[#123B6D]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                Official Government QR Credential
              </p>
              <p className="text-[11px] text-slate-500 mb-1">
                Scan with any government verification app or camera to validate certified status.
              </p>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200">
                STATUS: CRYPTOGRAPHICALLY SECURE &bull; VALID
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Verified Skills Ledger */}
      <Card padding="md" className="mb-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>Verified Competencies &amp; Technical Skills</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assessed and certified under National Skills Qualification Framework (NSQF Level 5)
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">5 Total Verified Skills</span>
        </div>

        <div className="space-y-3">
          {skillsList.map((skill) => {
            const isVerified = verifiedCertificates.includes(skill.certId) || true;
            return (
              <div 
                key={skill.name} 
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 hover:border-blue-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                      {skill.name}
                    </span>
                    <span className="text-[11px] text-slate-500 ml-2">({skill.category})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={skill.level === 'Advanced' ? 'success' : 'info'} size="sm">
                      {skill.level}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleVerifyCert(skill.certId, skill.name)}
                      className="text-[10px] h-6 px-2 text-blue-700 dark:text-blue-400"
                    >
                      <CheckCircle2 size={11} className="mr-1 inline" />
                      Verify Certificate
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={skill.proficiency} size="md" color={skill.proficiency >= 85 ? 'success' : 'brand'} />
                  </div>
                  <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-200 w-10 text-right">
                    {skill.proficiency}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2">
                  <span>Certificate ID: <strong className="font-mono text-slate-600 dark:text-slate-300">{skill.certId}</strong></span>
                  <span>Certified Date: {skill.verifiedDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Target Role & Gap Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>Next Career Milestone</CardTitle>
          <p className="text-xs text-slate-500 mb-3">Pathway to Senior CNC &amp; Automation Specialist</p>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#123B6D] dark:text-blue-300">Target Role: Senior CNC Machinist</span>
              <span className="text-xs font-mono font-bold text-emerald-600">₹32,000–₹40,000/mo</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Requirements: Multi-axis CNC milling, Fanuc controller proficiency, 1-year verified machine floor experience.
            </p>
          </div>

          <div className="space-y-1.5 text-xs">
            <p className="font-semibold text-slate-700 dark:text-slate-200">Recommended Next Steps:</p>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Complete 5-Axis Milling short-module at Aundh ITI</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Attain Fanuc Level 2 operator badge</span>
            </div>
          </div>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>Certification Providers &amp; Accreditation</CardTitle>
          <p className="text-xs text-slate-500 mb-3">Authorized state evaluation bodies</p>
          
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
              <p className="font-bold text-slate-800 dark:text-slate-200">Maharashtra State Skill Development Society (MSSDS)</p>
              <p className="text-[11px] text-slate-500">Accreditation Body ID: MSSDS-GOV-MH-01</p>
            </div>
            <div className="p-2.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
              <p className="font-bold text-slate-800 dark:text-slate-200">National Council for Vocational Training (NCVT)</p>
              <p className="text-[11px] text-slate-500">Trade: Machinist &bull; Center Code: ITI-PUN-04</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Share Profile Modal */}
      {shareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-sm w-full p-5 border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">Share Digital Skill Passport</h3>
            <p className="text-xs text-slate-500 mb-4">
              Employers can view this cryptographically verified credential passport without logging in:
            </p>
            <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded font-mono text-[11px] text-slate-700 dark:text-slate-300 break-all mb-4">
              https://disha.gov.in/verify/passport/TRN-2026-08149
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setShareModal(false)}>Cancel</Button>
              <Button size="sm" variant="primary" onClick={handleShare}>
                <Copy size={13} className="mr-1" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
