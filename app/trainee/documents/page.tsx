'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { FileText, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export default function TraineeDocumentsPage() {
  const { showToast } = useApp();

  const docs = [
    { title: 'Aadhaar Identity Card', id: 'AADHAAR-4819', type: 'Identity Verification', verified: true, date: '10 Jan 2026' },
    { title: 'Secondary School Certificate (SSC 10th)', id: 'SSC-MH-82194', type: 'Educational Proof', verified: true, date: '12 Jan 2026' },
    { title: 'Government ITI Trade Final Marksheet', id: 'MSBTE-MRK-2026', type: 'Vocational Transcript', verified: true, date: '20 Apr 2026' },
    { title: 'EPFO Form 11 (Declaration)', id: 'EPFO-F11-4491', type: 'Employment Document', verified: true, date: '15 May 2026' },
  ];

  return (
    <DashboardLayout
      role="trainee"
      title="Verified Documents"
      subtitle="Government identification and verified institutional records"
    >
      <div className="space-y-3">
        {docs.map((doc) => (
          <Card key={doc.id} padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">{doc.title}</h4>
                  <p className="text-[11px] text-slate-500">{doc.type} &bull; Verified on {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">
                  <CheckCircle2 size={11} className="mr-1 inline" />
                  Verified
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => showToast(`Opening document ${doc.id}`, 'info')}
                  className="text-xs h-7"
                >
                  <Download size={12} className="mr-1" />
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
