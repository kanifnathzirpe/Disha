'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { BookOpen, CheckCircle2, Clock, PlayCircle, Award, FileText } from 'lucide-react';

export default function LearningJourneyPage() {
  const { showToast } = useApp();

  const modules = [
    { id: 'MOD-1', title: 'Fundamentals of CNC Turning & Tooling', hours: 40, completed: 40, status: 'completed', grade: 'A+' },
    { id: 'MOD-2', title: 'G-Code & M-Code Programming', hours: 60, completed: 60, status: 'completed', grade: 'A' },
    { id: 'MOD-3', title: 'Precision Measurement & Micrometer Gauges', hours: 30, completed: 30, status: 'completed', grade: 'A+' },
    { id: 'MOD-4', title: 'Industrial Safety Standards & Machine Maintenance', hours: 25, completed: 25, status: 'completed', grade: 'A' },
    { id: 'MOD-5', title: 'Advanced 4-Axis & 5-Axis Milling Techniques', hours: 50, completed: 20, status: 'in-progress', grade: 'Ongoing' },
    { id: 'MOD-6', title: 'Automated Tool Offset Compensation', hours: 35, completed: 0, status: 'upcoming', grade: 'Pending' },
  ];

  return (
    <DashboardLayout
      role="trainee"
      title="Learning Journey"
      subtitle="Curriculum progress, technical coursework and vocational practical training"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">Curriculum Progress</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">75% Complete</p>
          <p className="text-[10px] text-emerald-600 mt-1">175 of 240 hours verified</p>
        </Card>
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">Modules Completed</span>
          <p className="text-2xl font-bold text-blue-600">4 / 6</p>
          <p className="text-[10px] text-slate-400 mt-1">Next exam: 15 Oct 2026</p>
        </Card>
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">Average Assessment Grade</span>
          <p className="text-2xl font-bold text-emerald-600">A (92%)</p>
          <p className="text-[10px] text-slate-400 mt-1">Top 5% in Pune district</p>
        </Card>
      </div>

      <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 mb-6">
        <CardTitle>Trade Curriculum Modules</CardTitle>
        <p className="text-xs text-slate-500 mb-4">Machinist &amp; CNC Operator (NCVT Approved)</p>

        <div className="space-y-3">
          {modules.map((m) => (
            <div key={m.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{m.title}</span>
                  <span className="text-[11px] text-slate-500 ml-2 font-mono">({m.hours} Hours)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={m.status === 'completed' ? 'success' : m.status === 'in-progress' ? 'warning' : 'neutral'} size="sm">
                    {m.status.toUpperCase()}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => showToast(`Opening course materials for ${m.title}`, 'info')}
                    className="text-xs h-7"
                  >
                    <PlayCircle size={12} className="mr-1" />
                    {m.status === 'completed' ? 'Review' : 'Continue'}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <ProgressBar value={Math.round((m.completed / m.hours) * 100)} size="sm" color={m.status === 'completed' ? 'success' : 'brand'} />
                </div>
                <span className="text-[11px] font-mono text-slate-500">{m.completed}/{m.hours} hrs</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
