'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Activity, ShieldCheck, TrendingUp, Users, Briefcase, ChevronRight, X, Sparkles, RefreshCw } from 'lucide-react';
import { Modal, Badge, Button } from '@/components/ui';

export function LiveTelemetryTicker() {
  const { role, language, showToast } = useApp();
  const [activeCount, setActiveCount] = useState(54230);
  const [assessmentCount, setAssessmentCount] = useState(1482);
  const [showTelemetryModal, setShowTelemetryModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Micro-simulate dynamic telemetry changes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      setAssessmentCount(prev => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleManualSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Statewide Skill Telemetry synchronized with EPFO & DVET servers', 'success');
    }, 700);
  };

  return (
    <>
      <div className="bg-[#08172b] text-white text-xs border-b border-slate-800 px-3 sm:px-6 py-1.5 flex items-center justify-between gap-3 overflow-hidden select-none">
        {/* Left: Live indicator + Ticker */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
          <div
            onClick={() => setShowTelemetryModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-900/50 border border-amber-400/40 text-amber-300 font-semibold cursor-pointer hover:bg-blue-900/80 transition-colors shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase">
              {language === 'mr' ? 'डीव्हीईटी टेलिमेट्री नोड' : 'DVET TELEMETRY NODE'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300 shrink-0">
            <span className="flex items-center gap-1">
              <Users size={12} className="text-blue-400" />
              <strong className="text-white font-mono">{activeCount.toLocaleString()}</strong>{' '}
              {language === 'mr' ? 'सक्रिय प्रशिक्षणार्थी' : 'Active Trainees'}
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Activity size={12} className="text-emerald-400" />
              <strong className="text-white font-mono">{assessmentCount.toLocaleString()}</strong>{' '}
              {language === 'mr' ? 'आजच्या चाचण्या' : 'Tests Today'}
            </span>
            <span className="hidden lg:flex items-center gap-1">
              <Briefcase size={12} className="text-amber-400" />
              <strong className="text-white font-mono">3,240</strong>{' '}
              {language === 'mr' ? 'प्रमाणित नोकरी नियुक्ती (तिमाही ३)' : 'Verified Placements (Q3)'}
            </span>
            <span className="hidden xl:flex items-center gap-1">
              <ShieldCheck size={12} className="text-purple-400" />
              <strong className="text-white font-mono">94.8%</strong>{' '}
              {language === 'mr' ? 'आधार व कौशल्य अखंडता' : 'Aadhaar & Skill Passport Integrity'}
            </span>
          </div>
        </div>

        {/* Right: Quick Telemetry Action */}
        <div className="flex items-center gap-2 shrink-0 text-[11px]">
          <button
            onClick={() => setShowTelemetryModal(true)}
            className="text-blue-300 hover:text-white font-medium flex items-center gap-0.5 hover:underline"
          >
            <span>{language === 'mr' ? 'तपशील' : 'Diagnostics'}</span>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Telemetry Diagnostics Modal */}
      <Modal
        open={showTelemetryModal}
        onClose={() => setShowTelemetryModal(false)}
        title="Maharashtra State Skill Data Pipeline Telemetry"
        size="lg"
      >
        <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">Live Decentralized Registry Health</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">All 36 district skill administration nodes operating at 99.98% uptime</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleManualSync}
              disabled={isRefreshing}
              className="text-xs"
            >
              <RefreshCw size={12} className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Syncing...' : 'Sync Real-time'}
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Latency</span>
              <span className="text-lg font-bold text-emerald-600 font-mono">18 ms</span>
              <span className="text-[10px] text-slate-500 block">NIC Mumbai Gateway</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">EPFO Live Feed</span>
              <span className="text-lg font-bold text-blue-600 font-mono">Active</span>
              <span className="text-[10px] text-slate-500 block">Batch: 28-Sep-2026</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">ESIC Retention Feed</span>
              <span className="text-lg font-bold text-indigo-600 font-mono">Synced</span>
              <span className="text-[10px] text-slate-500 block">38,940 Records/day</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Aadhaar Vault</span>
              <span className="text-lg font-bold text-purple-600 font-mono">Verified</span>
              <span className="text-[10px] text-slate-500 block">Zero Tamper Status</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Live Event Stream</h4>
            <div className="space-y-1 font-mono text-[11px]">
              <p className="text-emerald-600 dark:text-emerald-400">[11:58:12] Candidate Rahul Sharma verified CNC Machine Operation (Passcode: MS-CNC-9481)</p>
              <p className="text-blue-600 dark:text-blue-400">[11:58:05] ABC Manufacturing posted 15 CNC Technician vacancies (Chakan MIDC)</p>
              <p className="text-amber-600 dark:text-amber-400">[11:57:48] DVET Pune issued lab equipment modernization grant to ITI Aundh</p>
              <p className="text-slate-500 dark:text-slate-400">[11:57:20] 90-day retention confirmation received for 42 candidates in Nashik cluster</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
