'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import type { UserRole } from '@/types';
import { Shield, GraduationCap, Building2, School, ChevronDown, Check, Sparkles } from 'lucide-react';

const roles: { id: UserRole; label: string; sublabel: string; name: string; icon: React.ReactNode; badge: string }[] = [
  {
    id: 'government',
    label: 'State Command Portal',
    sublabel: 'G2G Executive Dashboard',
    name: 'Anjali Deshmukh (DVET)',
    icon: <Shield size={14} />,
    badge: 'Official',
  },
  {
    id: 'trainee',
    label: 'Candidate Citizen Portal',
    sublabel: 'G2C Skill Passport & Jobs',
    name: 'Rahul Sharma (Trainee)',
    icon: <GraduationCap size={14} />,
    badge: 'Citizen',
  },
  {
    id: 'employer',
    label: 'Industry Partner Portal',
    sublabel: 'G2B ATS & Subsidies',
    name: 'Priya Joshi (ABC Mfg)',
    icon: <Building2 size={14} />,
    badge: 'Industry',
  },
  {
    id: 'institution',
    label: 'Accredited Institute Portal',
    sublabel: 'G2B ITI / VTP Operations',
    name: 'Dr. Suresh Kulkarni (Apex ITI)',
    icon: <School size={14} />,
    badge: 'Provider',
  },
];

export function RoleQuickSwitcher() {
  const { role, switchRole, showToast } = useApp();
  const [open, setOpen] = useState(false);

  const currentRoleObj = roles.find(r => r.id === role) || roles[0];

  const handleSelect = (newRole: UserRole) => {
    if (newRole !== role) {
      switchRole(newRole);
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#123B6D]/10 dark:bg-blue-950/60 hover:bg-[#123B6D]/15 dark:hover:bg-blue-900/60 border border-[#123B6D]/30 dark:border-blue-700/50 transition-all text-xs font-semibold text-[#123B6D] dark:text-blue-300 cursor-pointer shadow-xs"
        aria-label="Select Portal Stakeholder View"
        title="Switch Official Portal View"
      >
        <span className="w-5 h-5 rounded bg-[#123B6D] text-white flex items-center justify-center shrink-0 shadow-xs">
          {currentRoleObj.icon}
        </span>
        <span className="hidden md:inline font-bold text-slate-700 dark:text-slate-300">Portal View:</span>
        <span className="font-bold text-[#123B6D] dark:text-blue-300">{currentRoleObj.label.split(' ')[0]} ({currentRoleObj.name.split(' ')[0]})</span>
        <ChevronDown size={13} className={`text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-zoom-in">
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Official Stakeholder Environments
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Switch perspective to view role-tailored intelligence:
              </p>
            </div>

            <div className="p-1 space-y-1">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => handleSelect(r.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                    r.id === role
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 font-bold border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      r.id === role ? 'bg-[#123B6D] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {r.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-slate-900 dark:text-slate-100">{r.label}</p>
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{r.name}</p>
                    </div>
                  </div>
                  {r.id === role && <Check size={14} className="text-blue-600 dark:text-blue-400" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
