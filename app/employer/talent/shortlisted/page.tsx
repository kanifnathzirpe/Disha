'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { candidates } from '@/data/mockEmployers';
import { Bookmark, Star, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function ShortlistedCandidatesPage() {
  const { shortlistedCandidates, showToast } = useApp();

  const shortlistedList = candidates.filter(c => 
    shortlistedCandidates.includes(c.id) || c.status === 'shortlisted'
  );

  return (
    <DashboardLayout
      role="employer"
      title="Shortlisted Talent"
      subtitle="Candidates pinned for upcoming interview rounds and technical assessment"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-500">
          Showing <strong>{shortlistedList.length}</strong> shortlisted candidates
        </p>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => showToast('Dispatched batch interview invite emails', 'success')}
          className="text-xs"
        >
          Send Batch Interview Invites
        </Button>
      </div>

      <div className="space-y-3">
        {shortlistedList.map((c) => (
          <Card key={c.id} padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{c.name}</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    {c.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Location: <strong>{c.district}</strong> &bull; Experience: <strong>{c.experience}</strong> &bull; Education: <strong>{c.education}</strong>
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.skills.map((s) => (
                    <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => showToast(`Schedule phone call with ${c.name}`, 'info')}
                  className="text-xs h-8"
                >
                  <Phone size={12} className="mr-1" />
                  Call
                </Button>
                <Button 
                  size="sm" 
                  variant="primary" 
                  onClick={() => showToast(`Interview invite scheduled for ${c.name}`, 'success')}
                  className="text-xs h-8 bg-[#123B6D] hover:bg-[#0D2F5B]"
                >
                  Schedule Interview
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
