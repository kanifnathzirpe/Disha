'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { candidates } from '@/data/mockEmployers';
import { Search, MapPin, Award, CheckCircle2, Bookmark, UserCheck, Star } from 'lucide-react';

export default function TalentSearchPage() {
  const { shortlistCandidate, shortlistedCandidates, showToast } = useApp();
  const [skillQuery, setSkillQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filtered = candidates.filter((c) => {
    const matchSkill = skillQuery === '' || c.skills.some(s => s.toLowerCase().includes(skillQuery.toLowerCase()));
    const matchLoc = selectedLocation === 'All' || c.district === selectedLocation;
    return matchSkill && matchLoc;
  });

  return (
    <DashboardLayout
      role="employer"
      title="Talent &amp; Skill Search"
      subtitle="Query certified Maharashtra ITI and vocational graduates by certified trade"
    >
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-border dark:border-slate-700 mb-6 shadow-xs flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[240px] flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-2 border rounded-md">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search skill (e.g. CNC, PLC, Welding, AutoCAD)..."
            value={skillQuery}
            onChange={(e) => setSkillQuery(e.target.value)}
            className="text-xs bg-transparent focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">District:</span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-xs px-3 py-2 border rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
          >
            <option value="All">All Maharashtra</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Nashik">Nashik</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Kolhapur">Kolhapur</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => {
          const isShortlisted = shortlistedCandidates.includes(c.id);
          return (
            <Card key={c.id} padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{c.name}</h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} /> {c.district}, Maharashtra
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    {c.matchScore}% Match
                  </span>
                </div>

                <div className="my-3">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Verified Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[11px] bg-blue-50 dark:bg-blue-950/60 text-[#123B6D] dark:text-blue-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-500">Experience: <strong>{c.experience}</strong> &bull; Education: <strong>{c.education}</strong></p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => showToast(`Contact details dispatched to ${c.name}`, 'info')}
                  className="text-xs h-7"
                >
                  Contact
                </Button>

                <Button
                  size="sm"
                  variant={isShortlisted ? 'primary' : 'outline'}
                  onClick={() => shortlistCandidate(c.id, c.name)}
                  className="text-xs h-7"
                >
                  <Bookmark size={12} className="mr-1" />
                  {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
