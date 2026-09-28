'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { Award, ShieldCheck, Download, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

export default function TraineeCertificatesPage() {
  const { verifyCertificate, showToast } = useApp();

  const certs = [
    {
      id: 'CERT-MH-2026-001',
      title: 'National Trade Certificate (NTC) – Machinist',
      issuer: 'National Council for Vocational Training (NCVT)',
      issueDate: '15 April 2026',
      credentialId: 'NCVT-TRN-994821',
      nsqfLevel: 'Level 5',
      verified: true,
    },
    {
      id: 'CERT-MH-2026-002',
      title: 'CNC Turning & Programming Specialization',
      issuer: 'Maharashtra State Skill Development Society (MSSDS)',
      issueDate: '28 March 2026',
      credentialId: 'MSSDS-CNC-48201',
      nsqfLevel: 'Level 5',
      verified: true,
    },
    {
      id: 'CERT-MH-2026-003',
      title: 'Industrial Safety & Factory Floor Compliance',
      issuer: 'Directorate of Industrial Safety & Health (DISH), Maharashtra',
      issueDate: '10 February 2026',
      credentialId: 'DISH-SAF-10928',
      nsqfLevel: 'Level 4',
      verified: true,
    },
  ];

  return (
    <DashboardLayout
      role="trainee"
      title="My Certificates"
      subtitle="Digital credentials cryptographically verified and backed by DigiLocker"
    >
      <div className="space-y-4">
        {certs.map((c) => (
          <Card key={c.id} padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-[#123B6D] dark:text-blue-400 border border-blue-200 dark:border-blue-800 shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">{c.title}</h3>
                    <Badge variant="success" size="sm">
                      <ShieldCheck size={11} className="mr-1 inline" />
                      DigiLocker Verified
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Issuer: <strong>{c.issuer}</strong></p>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-1">
                    <span>Credential ID: <code className="font-mono text-slate-600 dark:text-slate-300">{c.credentialId}</code></span>
                    <span>NSQF: <strong>{c.nsqfLevel}</strong></span>
                    <span>Issued: {c.issueDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    verifyCertificate(c.credentialId, c.title);
                  }}
                  className="text-xs h-8"
                >
                  <ShieldCheck size={13} className="mr-1 text-emerald-600" />
                  Validate
                </Button>
                <Button 
                  size="sm" 
                  variant="primary" 
                  onClick={() => {
                    showToast(`Downloading official Certificate ${c.credentialId}...`, 'info');
                    window.print();
                  }}
                  className="text-xs h-8 bg-[#123B6D] hover:bg-[#0D2F5B]"
                >
                  <Download size={13} className="mr-1" />
                  Download PDF
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
