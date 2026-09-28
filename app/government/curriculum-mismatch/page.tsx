'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { curriculumAnalyses, mismatchSummary, type CurriculumAnalysis } from '@/data/mockCurriculumMismatch';
import {
  AlertTriangle, CheckCircle2, XCircle, Target, BookOpen,
  ArrowRight, TrendingUp, ChevronRight, IndianRupee, Search
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';

export default function CurriculumMismatchPage() {
  const { showToast } = useApp();
  const [selectedAnalysis, setSelectedAnalysis] = useState<CurriculumAnalysis | null>(null);

  return (
    <DashboardLayout
      role="government"
      title="Curriculum–Industry Mismatch"
      subtitle="Compare skills taught in training programs with skills demanded by employers"
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Programs Analyzed', value: mismatchSummary.totalProgramsAnalyzed, color: 'text-blue-600' },
          { label: 'Avg Match Score', value: `${mismatchSummary.avgMatchScore}%`, color: 'text-amber-600' },
          { label: 'Below Threshold', value: mismatchSummary.programsBelowThreshold, color: 'text-red-600' },
          { label: 'Critical Gaps', value: mismatchSummary.criticalGapsFound, color: 'text-red-600' },
          { label: 'Obsolete Skills', value: mismatchSummary.obsoleteSkillsFound, color: 'text-slate-600' },
          { label: 'Recommendations', value: mismatchSummary.recommendationsGenerated, color: 'text-emerald-600' },
        ].map((m, i) => (
          <Card key={i} padding="sm" className="bg-white border-slate-200">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">{m.label}</p>
            <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
          </Card>
        ))}
      </div>

      {!selectedAnalysis ? (
        <>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Program Curriculum Analyses</h3>
          <div className="space-y-3">
            {curriculumAnalyses.map(analysis => {
              const matchColor = analysis.overallMatch >= 80 ? 'text-emerald-600' : analysis.overallMatch >= 60 ? 'text-amber-600' : 'text-red-600';
              return (
                <Card key={analysis.programId} padding="md" className="bg-white border-slate-200 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => setSelectedAnalysis(analysis)}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-slate-900">{analysis.programName}</p>
                        <Badge variant={analysis.overallMatch >= 80 ? 'success' : analysis.overallMatch >= 60 ? 'warning' : 'error'} size="sm">
                          {analysis.overallMatch}% Match
                        </Badge>
                      </div>
                      <p className="text-[10px] text-slate-500">{analysis.provider} • {analysis.district} • {analysis.sector}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-emerald-600">✓ {analysis.skillsAlignedWithIndustry} aligned</span>
                        <span className="text-[10px] text-red-600">✗ {analysis.missingCriticalSkills.length} missing</span>
                        <span className="text-[10px] text-slate-400">⚠ {analysis.obsoleteSkills.length} obsolete</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {analysis.missingCriticalSkills.slice(0, 3).map((s, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded-full">⚠ {s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${matchColor}`}>{analysis.overallMatch}%</p>
                        <p className="text-[10px] text-slate-400">Industry Match</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        /* Detailed Analysis View */
        <div>
          <button onClick={() => setSelectedAnalysis(null)} className="text-xs text-blue-600 hover:underline mb-4 flex items-center gap-1">
            ← Back to all programs
          </button>

          {/* Header */}
          <Card padding="md" className={`border-2 mb-6 ${
            selectedAnalysis.overallMatch >= 80 ? 'bg-emerald-50 border-emerald-300' :
            selectedAnalysis.overallMatch >= 60 ? 'bg-amber-50 border-amber-300' :
            'bg-red-50 border-red-300'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-slate-900">{selectedAnalysis.programName}</p>
                <p className="text-xs text-slate-600">{selectedAnalysis.provider} • {selectedAnalysis.district} • Updated {selectedAnalysis.lastUpdated}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{selectedAnalysis.overallMatch}%</p>
                <p className="text-[10px] text-slate-500">Industry Match</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Curriculum Skills */}
            <Card padding="md" className="bg-white border-slate-200">
              <CardTitle>Curriculum Skills ({selectedAnalysis.curriculumSkills.length})</CardTitle>
              <div className="space-y-2 mt-3">
                {selectedAnalysis.curriculumSkills.map((s, i) => (
                  <div key={i} className={`flex items-center justify-between p-2 rounded-md border ${
                    s.industryRelevance === 'high' ? 'border-emerald-200 bg-emerald-50/30' :
                    s.industryRelevance === 'medium' ? 'border-blue-200 bg-blue-50/30' :
                    s.industryRelevance === 'obsolete' ? 'border-red-200 bg-red-50/30' :
                    'border-slate-200 bg-slate-50/30'
                  }`}>
                    <div className="flex items-center gap-2">
                      {s.industryRelevance === 'high' ? <CheckCircle2 size={12} className="text-emerald-500" /> :
                       s.industryRelevance === 'obsolete' ? <XCircle size={12} className="text-red-500" /> :
                       <AlertTriangle size={12} className="text-amber-500" />}
                      <span className="text-xs text-slate-700">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{s.hoursAllocated}h</span>
                      <Badge variant={
                        s.industryRelevance === 'high' ? 'success' :
                        s.industryRelevance === 'medium' ? 'info' :
                        s.industryRelevance === 'obsolete' ? 'error' : 'warning'
                      } size="sm">{s.industryRelevance}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Industry Skills Demanded */}
            <Card padding="md" className="bg-white border-slate-200">
              <CardTitle>Industry Skills Demanded</CardTitle>
              <div className="space-y-2 mt-3">
                {selectedAnalysis.industrySkills.map((s, i) => (
                  <div key={i} className="p-2 rounded-md border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={s.demandLevel === 'critical' ? 'error' : s.demandLevel === 'high' ? 'warning' : 'neutral'} size="sm">
                          {s.demandLevel}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">{s.jobPostings} job postings • ₹{(s.avgWage / 1000).toFixed(0)}K avg</span>
                      <span className={s.taughtInCurriculum ? 'text-emerald-600' : 'text-red-600'}>
                        {s.taughtInCurriculum ? `${s.coveragePercent}% covered` : '⚠ Not taught'}
                      </span>
                    </div>
                    <ProgressBar value={s.coveragePercent} size="sm" color={s.coveragePercent >= 70 ? 'success' : s.coveragePercent > 0 ? 'warning' : 'error'} />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Missing & Obsolete */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card padding="md" className="bg-red-50 border-red-200">
              <CardTitle>⚠ Missing Critical Skills</CardTitle>
              <div className="space-y-1.5 mt-2">
                {selectedAnalysis.missingCriticalSkills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-white rounded-md">
                    <XCircle size={12} className="text-red-500" />
                    <span className="text-xs text-slate-700">{s}</span>
                  </div>
                ))}
              </div>
            </Card>

            {selectedAnalysis.obsoleteSkills.length > 0 && (
              <Card padding="md" className="bg-slate-50 border-slate-200">
                <CardTitle>🗑 Obsolete / Low-Value Skills</CardTitle>
                <div className="space-y-1.5 mt-2">
                  {selectedAnalysis.obsoleteSkills.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-white rounded-md">
                      <AlertTriangle size={12} className="text-slate-400" />
                      <span className="text-xs text-slate-500">{s}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Recommendations */}
          <Card padding="md" className="bg-blue-50 border-blue-200 mt-6">
            <CardTitle>📋 Curriculum Update Recommendations</CardTitle>
            <div className="space-y-2 mt-3">
              {selectedAnalysis.recommendations.map((r, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-white rounded-md">
                  <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-700">{r}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Demand vs Coverage Chart */}
          <Card padding="md" className="bg-white border-slate-200 mt-6">
            <CardTitle>Industry Demand vs Curriculum Coverage</CardTitle>
            <div className="h-64 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedAnalysis.industrySkills.slice(0, 8).map(s => ({
                  skill: s.name.length > 18 ? s.name.slice(0, 18) + '…' : s.name,
                  coverage: s.coveragePercent,
                  postings: Math.min(100, Math.round(s.jobPostings / 5)),
                }))} layout="vertical" margin={{ left: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <YAxis dataKey="skill" type="category" tick={{ fontSize: 9 }} width={115} />
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="coverage" name="Curriculum Coverage %" fill="#22c55e" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="postings" name="Industry Demand (scaled)" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
