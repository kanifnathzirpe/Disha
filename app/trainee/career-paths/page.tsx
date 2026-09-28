'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { careerPaths, type CareerPath } from '@/data/mockCareerPaths';
import {
  Compass, ChevronRight, Lock, CheckCircle2, Clock, Target,
  ArrowRight, Briefcase, IndianRupee, TrendingUp, BookOpen,
  Award, Play, Building2, Star, ChevronDown, ChevronUp
} from 'lucide-react';

export default function CareerPathsPage() {
  const { showToast } = useApp();
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const togglePhase = (id: string) => {
    setExpandedPhase(prev => prev === id ? null : id);
  };

  return (
    <DashboardLayout
      role="trainee"
      title="Career Learning Paths"
      subtitle="Select a target occupation and follow a structured journey to become job-ready"
    >
      {!selectedPath ? (
        <>
          {/* Active Path Banner */}
          {careerPaths.find(p => p.completedSkills > 0) && (() => {
            const active = careerPaths.find(p => p.completedSkills > 0)!;
            const progress = Math.round((active.completedSkills / active.totalSkills) * 100);
            return (
              <Card padding="md" className="bg-gradient-to-r from-blue-600 to-indigo-700 border-none text-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] opacity-80 uppercase tracking-wider">YOUR ACTIVE CAREER PATH</p>
                    <p className="text-lg font-bold mt-1">{active.title}</p>
                    <p className="text-xs opacity-80">{active.sector} • {active.duration}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 max-w-[200px] bg-white/20 rounded-full h-2">
                        <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-xs font-semibold">{progress}%</span>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedPath(active)}
                    className="border-white/30 text-white hover:bg-white/10 text-xs">
                    Continue <ArrowRight size={13} className="ml-1" />
                  </Button>
                </div>
              </Card>
            );
          })()}

          <h3 className="text-sm font-semibold text-slate-700 mb-3">Explore Career Paths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerPaths.map(path => {
              const progress = Math.round((path.completedSkills / path.totalSkills) * 100);
              return (
                <Card key={path.id} padding="md" className="bg-white border-slate-200 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setSelectedPath(path)}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{path.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="neutral" size="sm">{path.sector}</Badge>
                        <Badge variant={path.demand === 'very-high' ? 'error' : path.demand === 'high' ? 'warning' : 'info'} size="sm">
                          {path.demand === 'very-high' ? '🔥 Very High' : path.demand === 'high' ? '📈 High' : '📊 Medium'} Demand
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-3">{path.description}</p>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-1.5 bg-slate-50 rounded-md">
                      <IndianRupee size={12} className="text-emerald-500 mx-auto" />
                      <p className="text-[9px] text-slate-500">Avg Salary</p>
                      <p className="text-[10px] font-bold text-slate-700">{path.avgSalary.split('/')[0]}</p>
                    </div>
                    <div className="text-center p-1.5 bg-slate-50 rounded-md">
                      <Clock size={12} className="text-blue-500 mx-auto" />
                      <p className="text-[9px] text-slate-500">Duration</p>
                      <p className="text-[10px] font-bold text-slate-700">{path.duration}</p>
                    </div>
                    <div className="text-center p-1.5 bg-slate-50 rounded-md">
                      <BookOpen size={12} className="text-purple-500 mx-auto" />
                      <p className="text-[9px] text-slate-500">Skills</p>
                      <p className="text-[10px] font-bold text-slate-700">{path.totalSkills}</p>
                    </div>
                  </div>

                  {path.completedSkills > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-semibold text-blue-600">{progress}%</span>
                      </div>
                      <ProgressBar value={progress} size="sm" color="brand" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {path.employers.slice(0, 3).map((e, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                        <Building2 size={8} className="inline mr-0.5" />{e}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                    {path.completedSkills > 0 ? 'Continue Path' : 'View Path'} <ChevronRight size={13} />
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        /* Career Path Detail View */
        <div>
          <button onClick={() => setSelectedPath(null)} className="text-xs text-blue-600 hover:underline mb-4 flex items-center gap-1">
            ← Back to all paths
          </button>

          {/* Path Header */}
          <Card padding="md" className="bg-gradient-to-r from-blue-600 to-indigo-700 border-none text-white mb-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-bold">{selectedPath.title}</p>
                <p className="text-xs opacity-80 mt-1">{selectedPath.sector} • {selectedPath.duration} • {selectedPath.avgSalary}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedPath.prerequisites.map((p, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 bg-white/20 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{Math.round((selectedPath.completedSkills / selectedPath.totalSkills) * 100)}%</p>
                <p className="text-[10px] opacity-80">{selectedPath.completedSkills}/{selectedPath.totalSkills} skills</p>
              </div>
            </div>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${(selectedPath.completedSkills / selectedPath.totalSkills) * 100}%` }} />
            </div>
          </Card>

          {/* Hiring Employers */}
          <Card padding="sm" className="bg-emerald-50 border-emerald-200 mb-4">
            <p className="text-[10px] font-semibold text-emerald-700">🏢 Hiring Employers: {selectedPath.employers.join(' • ')}</p>
          </Card>

          {/* Phases */}
          <div className="space-y-4">
            {selectedPath.phases.map((phase, phaseIndex) => {
              const isExpanded = expandedPhase === phase.id;
              const completedCount = phase.skills.filter(s => s.status === 'completed').length;
              const phaseProgress = phase.skills.length > 0 ? Math.round((completedCount / phase.skills.length) * 100) : 0;

              return (
                <Card key={phase.id} padding="md" className={`border transition-all ${
                  phase.status === 'completed' ? 'border-emerald-200 bg-emerald-50/30' :
                  phase.status === 'in-progress' ? 'border-blue-200 bg-blue-50/30' :
                  'border-slate-200 bg-slate-50/30'
                }`}>
                  <button onClick={() => togglePhase(phase.id)} className="w-full text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          phase.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-200 text-slate-500'
                        }`}>
                          {phase.status === 'completed' ? <CheckCircle2 size={16} /> :
                           phase.status === 'locked' ? <Lock size={14} /> : phaseIndex + 1}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{phase.title}</p>
                          <p className="text-[10px] text-slate-500">{phase.description} • {phase.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className={`text-xs font-bold ${
                            phase.status === 'completed' ? 'text-emerald-600' :
                            phase.status === 'in-progress' ? 'text-blue-600' : 'text-slate-400'
                          }`}>{phaseProgress}%</p>
                          <p className="text-[10px] text-slate-400">{completedCount}/{phase.skills.length}</p>
                        </div>
                        {isExpanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                      </div>
                    </div>
                    {!isExpanded && (
                      <div className="mt-2">
                        <ProgressBar value={phaseProgress} size="sm" color={phase.status === 'completed' ? 'success' : 'brand'} />
                      </div>
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-2">
                      {phase.skills.map((skill, i) => (
                        <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg border ${
                          skill.status === 'completed' ? 'border-emerald-200 bg-emerald-50' :
                          skill.status === 'in-progress' ? 'border-blue-200 bg-blue-50' :
                          'border-slate-200 bg-slate-50'
                        }`}>
                          <div className="flex items-center gap-2.5">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              skill.status === 'completed' ? 'bg-emerald-200' :
                              skill.status === 'in-progress' ? 'bg-blue-200' : 'bg-slate-200'
                            }`}>
                              {skill.status === 'completed' ? <CheckCircle2 size={12} className="text-emerald-700" /> :
                               skill.status === 'locked' ? <Lock size={10} className="text-slate-400" /> :
                               <Play size={10} className="text-blue-600" />}
                            </span>
                            <div>
                              <p className="text-xs font-medium text-slate-700">{skill.name}</p>
                              <p className="text-[10px] text-slate-400">{skill.provider} • {skill.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              skill.type === 'certification' ? 'success' :
                              skill.type === 'assessment' ? 'warning' :
                              skill.type === 'practice' ? 'info' : 'neutral'
                            } size="sm">{skill.type}</Badge>
                            {skill.score !== undefined && (
                              <span className="text-[10px] font-bold text-emerald-600">{skill.score}%</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
