'use client';

import React, { useState, useEffect } from 'react';
import { Search, LayoutDashboard, Target, BookOpen, Briefcase, Users, ShieldCheck, FileText, AlertTriangle, BarChart3, TrendingUp, MapPin, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  category: string;
}

import type { UserRole } from '@/types';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  role: UserRole;
}

export function CommandPalette({ open, onClose, role }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    // Institution commands
    ...(role === 'institution' ? [
      { id: 'inst-1', label: 'Go to Institution Hub', icon: <LayoutDashboard size={16} />, href: '/institution', category: 'Batches' },
      { id: 'inst-2', label: 'View Biometric Hardware Terminals', icon: <Target size={16} />, href: '/institution', category: 'Attendance' },
      { id: 'inst-3', label: 'View Dropout Early Warnings', icon: <AlertTriangle size={16} />, href: '/institution', category: 'Retention' },
      { id: 'inst-4', label: 'View Placement Claims & Subsidies', icon: <ShieldCheck size={16} />, href: '/institution', category: 'Claims' },
    ] : []),
    // Government commands
    ...(role === 'government' ? [
      { id: 'gov-1', label: 'Go to Command Center', icon: <LayoutDashboard size={16} />, href: '/government', category: 'Overview' },
      { id: 'gov-2', label: 'Open Skill Intelligence', icon: <Target size={16} />, href: '/government/skill-gaps', category: 'Intelligence' },
      { id: 'gov-3', label: 'Open Demand Forecast', icon: <TrendingUp size={16} />, href: '/government/demand-forecast', category: 'Intelligence' },
      { id: 'gov-4', label: 'Open District Intelligence', icon: <MapPin size={16} />, href: '/government/district-intelligence', category: 'Intelligence' },
      { id: 'gov-5', label: 'Open Programs', icon: <BookOpen size={16} />, href: '/government/programs', category: 'Programs' },
      { id: 'gov-6', label: 'Open Provider Performance', icon: <Users size={16} />, href: '/government/programs/providers', category: 'Programs' },
      { id: 'gov-7', label: 'Open Workforce Outcomes', icon: <Users size={16} />, href: '/government/workforce', category: 'Workforce' },
      { id: 'gov-8', label: 'View Alerts', icon: <AlertTriangle size={16} />, href: '/government/alerts', category: 'Monitoring' },
      { id: 'gov-9', label: 'View Recommendations', icon: <ShieldCheck size={16} />, href: '/government/recommendations', category: 'Policy' },
      { id: 'gov-10', label: 'View Reports', icon: <FileText size={16} />, href: '/government/reports', category: 'Monitoring' },
      { id: 'gov-11', label: 'View Data Quality', icon: <BarChart3 size={16} />, href: '/government/data-quality', category: 'Monitoring' },
      { id: 'gov-12', label: 'Open Investment Simulator', icon: <BookOpen size={16} />, href: '/government/simulator', category: 'Policy' },
    ] : []),
    // Trainee commands
    ...(role === 'trainee' ? [
      { id: 'trn-1', label: 'Go to Overview', icon: <LayoutDashboard size={16} />, href: '/trainee', category: 'My Journey' },
      { id: 'trn-2', label: 'Open Skill Passport', icon: <Target size={16} />, href: '/trainee/skills', category: 'My Journey' },
      { id: 'trn-3', label: 'Open Jobs', icon: <Briefcase size={16} />, href: '/trainee/jobs', category: 'Career' },
      { id: 'trn-4', label: 'Open Employment', icon: <Users size={16} />, href: '/trainee/employment', category: 'Career' },
      { id: 'trn-5', label: 'Open Profile', icon: <ShieldCheck size={16} />, href: '/trainee/profile', category: 'Services' },
    ] : []),
    // Employer commands
    ...(role === 'employer' ? [
      { id: 'emp-1', label: 'Go to Dashboard', icon: <LayoutDashboard size={16} />, href: '/employer', category: 'Hiring' },
      { id: 'emp-2', label: 'Open Jobs', icon: <Briefcase size={16} />, href: '/employer/jobs', category: 'Hiring' },
      { id: 'emp-3', label: 'Open Candidates', icon: <Users size={16} />, href: '/employer/candidates', category: 'Hiring' },
      { id: 'emp-4', label: 'Open Candidate Matching', icon: <Target size={16} />, href: '/employer/talent/matching', category: 'Talent' },
      { id: 'emp-5', label: 'Open Verification', icon: <ShieldCheck size={16} />, href: '/employer/verification', category: 'Employment' },
      { id: 'emp-6', label: 'Open Profile', icon: <Users size={16} />, href: '/employer/profile', category: 'Services' },
    ] : []),
    // Common commands
    { id: 'common-1', label: 'Switch Role', icon: <X size={16} />, href: '/login', category: 'System' },
  ];

  const filteredCommands = query.length === 0 
    ? commands 
    : commands.filter(cmd => 
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.category.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, filteredCommands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter' && filteredCommands.length > 0) {
        window.location.href = filteredCommands[selectedIndex].href;
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredCommands, selectedIndex, onClose]);

  if (!open) return null;

  const groupedCommands = filteredCommands.reduce((groups, cmd) => {
    if (!groups[cmd.category]) {
      groups[cmd.category] = [];
    }
    groups[cmd.category].push(cmd);
    return groups;
  }, {} as Record<string, Command[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b border-border">
          <Search size={20} className="text-text-secondary ml-4" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-4 text-sm focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Commands */}
        <div className="max-h-96 overflow-y-auto p-2">
          {Object.entries(groupedCommands).map(([category, cmds]) => (
            <div key={category}>
              <div className="px-3 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                {category}
              </div>
              {cmds.map((cmd, index) => {
                const globalIndex = filteredCommands.indexOf(cmd);
                return (
                  <button
                    key={cmd.id}
                    onClick={() => (window.location.href = cmd.href)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors',
                      globalIndex === selectedIndex ? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-50'
                    )}
                  >
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <div className="text-text-secondary">{cmd.icon}</div>
                    </div>
                    <span className="flex-1 text-sm">{cmd.label}</span>
                    {globalIndex === selectedIndex && <ChevronRight size={16} className="text-text-secondary" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-3 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-border rounded">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-border rounded">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-border rounded">Esc</kbd>
                Close
              </span>
            </div>
            <span>{filteredCommands.length} commands</span>
          </div>
        </div>
      </div>
    </div>
  );
}
