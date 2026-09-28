'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Users, Briefcase, MapPin, Target, Building2, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  type: 'trainee' | 'skill' | 'program' | 'employer' | 'job' | 'district';
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
}

import type { UserRole } from '@/types';

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
  role: UserRole;
}

export function GlobalSearch({ open, onClose, role }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    // Mock search results based on role
    const mockResults: SearchResult[] = [];

    if (role === 'government') {
      // Skills
      if (query.toLowerCase().includes('ev') || query.toLowerCase().includes('cnc') || query.toLowerCase().includes('skill')) {
        mockResults.push(
          { id: 'skill-1', type: 'skill', title: 'EV Diagnostics', subtitle: 'Critical skill gap', href: '/government/skill-gaps/SG001', icon: <Target size={16} /> },
          { id: 'skill-2', type: 'skill', title: 'CNC Programming', subtitle: 'High priority skill', href: '/government/skill-gaps/SG002', icon: <Target size={16} /> },
        );
      }

      // Districts
      if (query.toLowerCase().includes('pune') || query.toLowerCase().includes('district')) {
        mockResults.push(
          { id: 'district-1', type: 'district', title: 'Pune', subtitle: 'District Intelligence', href: '/government/district-intelligence', icon: <MapPin size={16} /> },
        );
      }

      // Programs
      if (query.toLowerCase().includes('program') || query.toLowerCase().includes('training')) {
        mockResults.push(
          { id: 'program-1', type: 'program', title: 'EV Diagnostics Training', subtitle: 'Active program', href: '/government/programs', icon: <FileText size={16} /> },
        );
      }
    }

    if (role === 'trainee') {
      // Jobs
      if (query.toLowerCase().includes('cnc') || query.toLowerCase().includes('job') || query.toLowerCase().includes('technician')) {
        mockResults.push(
          { id: 'job-1', type: 'job', title: 'CNC Technician', subtitle: 'ABC Manufacturing', href: '/trainee/jobs', icon: <Briefcase size={16} /> },
          { id: 'job-2', type: 'job', title: 'PLC Programmer', subtitle: 'Tech Industries', href: '/trainee/jobs', icon: <Briefcase size={16} /> },
        );
      }
    }

    if (role === 'employer') {
      // Candidates
      if (query.toLowerCase().includes('candidate') || query.toLowerCase().includes('rahul')) {
        mockResults.push(
          { id: 'candidate-1', type: 'trainee', title: 'Rahul Sharma', subtitle: '92% match', href: '/employer/candidates', icon: <Users size={16} /> },
        );
      }
    }

    setResults(mockResults);
  }, [query, role]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b border-border">
          <Search size={20} className="text-text-secondary ml-4" />
          <input
            type="text"
            placeholder="Search trainees, skills, programs, employers, jobs, districts..."
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

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.length < 2 ? (
            <div className="p-8 text-center">
              <Search size={48} className="text-text-tertiary mx-auto mb-4" />
              <p className="text-sm text-text-secondary">Start typing to search...</p>
              <p className="text-xs text-text-tertiary mt-2">
                Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">K</kbd> to open
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-text-secondary">No results found for "{query}"</p>
            </div>
          ) : (
            <div className="p-2">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={result.href}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <div className="text-text-secondary">{result.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{result.title}</p>
                    <p className="text-xs text-text-secondary truncate">{result.subtitle}</p>
                  </div>
                  <ArrowRight size={16} className="text-text-tertiary" />
                </a>
              ))}
            </div>
          )}
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
            <span>{results.length} results</span>
          </div>
        </div>
      </div>
    </div>
  );
}
