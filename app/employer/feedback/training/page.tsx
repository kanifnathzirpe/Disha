'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { employerFeedbacks, feedbackAggregations, type EmployerFeedbackItem } from '@/data/mockEmployerFeedback';
import {
  ClipboardCheck,
  Send,
  Star,
  Building2,
  BookOpen,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  Sparkles,
  GitBranch,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function TrainingFeedbackPage() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'submit' | 'curriculum-loop'>('submit');

  // Form State
  const [selectedCandidate, setSelectedCandidate] = useState('Rahul Sharma (CNC Operator)');
  const [provider, setProvider] = useState('Government ITI Aundh, Pune');
  const [trade, setTrade] = useState('CNC Machining & Turning');
  const [overallRating, setOverallRating] = useState(4);
  const [practicalScore, setPracticalScore] = useState(4);
  const [theoreticalScore, setTheoreticalScore] = useState(5);
  const [safetyScore, setSafetyScore] = useState(4);
  const [missingSkillsInput, setMissingSkillsInput] = useState('MasterCAM, 5-Axis Turning');
  const [comments, setComments] = useState('Trainees demonstrate good basic understanding of G-Code but need more hands-on time on 4-axis and 5-axis Fanuc controllers.');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast('Training feedback submitted successfully to Department of Skill Development & Curriculum Board', 'success');
      setComments('');
    }, 600);
  };

  return (
    <DashboardLayout
      role="employer"
      title="Training & Curriculum Feedback Loop"
      subtitle="Direct channel to Maharashtra DVET & Sector Skill Councils to update vocational syllabi"
    >
      {/* Top Navigation Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('submit')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'submit'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Submit Hired Trainee Feedback
        </button>
        <button
          onClick={() => setActiveTab('curriculum-loop')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'curriculum-loop'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Curriculum Actions &amp; State Board Updates</span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
            Active Loop
          </span>
        </button>
      </div>

      {activeTab === 'submit' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Feedback Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card padding="md" className="bg-white border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Assess Hired Candidate &amp; ITI Provider
                  </CardTitle>
                  <p className="text-xs text-slate-500">
                    Your assessment provides direct evidence for DVET curriculum modernization and lab equipment allocation.
                  </p>
                </div>
                <Badge variant="info">Rule 4B Accredited</Badge>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">
                      Hired Candidate on Probation
                    </label>
                    <select
                      value={selectedCandidate}
                      onChange={e => setSelectedCandidate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-slate-50 text-slate-800"
                    >
                      <option>Rahul Sharma (CNC Operator - PMKVY)</option>
                      <option>Sneha Patil (Quality Inspector - ITI)</option>
                      <option>Amit Deshmukh (PLC Maintenance - MSSDS)</option>
                      <option>Vikram Joshi (EV Battery Assembly - Apprentice)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">
                      Training Provider / ITI
                    </label>
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-slate-50 text-slate-800"
                    >
                      <option>Government ITI Aundh, Pune</option>
                      <option>Government ITI Pimpri, Pune</option>
                      <option>MSSDS Advanced Training Center, Nashik</option>
                      <option>Government ITI Chhatrapati Sambhajinagar</option>
                      <option>Government ITI Thane</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Trade / Specialization Track
                  </label>
                  <select
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-slate-50 text-slate-800"
                  >
                    <option>CNC Machining &amp; Turning</option>
                    <option>PLC &amp; Industrial Automation</option>
                    <option>EV Diagnostics &amp; Battery Tech</option>
                    <option>AutoCAD Draughtsman</option>
                    <option>Welding &amp; Metal Fabrication</option>
                  </select>
                </div>

                {/* Rating metrics */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                  <p className="text-xs font-bold text-slate-800">Competency Assessment (1 to 5 Stars)</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Practical Machine Handling &amp; Tooling</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPracticalScore(num)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star size={16} className={num <= practicalScore ? 'text-amber-500 fill-amber-500' : 'text-slate-300'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Theoretical Foundations &amp; Standards</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTheoreticalScore(num)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star size={16} className={num <= theoreticalScore ? 'text-amber-500 fill-amber-500' : 'text-slate-300'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Industrial Safety &amp; 5S Protocols</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setSafetyScore(num)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star size={16} className={num <= safetyScore ? 'text-amber-500 fill-amber-500' : 'text-slate-300'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Observed Missing Industry Skills / Tools
                  </label>
                  <input
                    type="text"
                    value={missingSkillsInput}
                    onChange={e => setMissingSkillsInput(e.target.value)}
                    placeholder="e.g. MasterCAM, GD&T, 5-Axis Turning, SCADA..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-slate-50 text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Detailed Industry Feedback &amp; Suggestions for Syllabus
                  </label>
                  <textarea
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Detail exact machine brands, software versions, or procedural gaps observed during probation..."
                    className="w-full p-3 border border-slate-300 rounded-md text-xs bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setComments('')}>
                    Reset
                  </Button>
                  <Button type="submit" variant="primary" size="sm" disabled={submitting}>
                    <Send size={14} className="mr-1.5" />
                    {submitting ? 'Submitting...' : 'Submit Official Assessment'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Column: Past Submissions */}
          <div className="space-y-6">
            <Card padding="md" className="bg-white border-slate-200">
              <CardTitle className="text-sm font-bold text-slate-900 mb-1">
                Your Past Feedback &amp; State Action
              </CardTitle>
              <p className="text-xs text-slate-500 mb-4">
                Tracking formal state actions taken on company assessments
              </p>

              <div className="space-y-3">
                {employerFeedbacks.slice(0, 3).map((fb) => (
                  <div key={fb.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{fb.trainingProvider}</span>
                      <Badge variant="success" size="sm">Actioned</Badge>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Trainee: <strong className="text-slate-800">{fb.hiredCandidateName}</strong> • {fb.trainingProgram}
                    </div>
                    <div className="p-2 bg-white rounded border border-slate-200 text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800 block mb-0.5">Missing Skills Flagged:</span>
                      {fb.missingSkills.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="md" className="bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="text-blue-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-xs font-bold text-blue-900">Policy Impact Guarantee</p>
                  <p className="text-[11px] text-blue-800 mt-1 leading-relaxed">
                    Under the Maharashtra Skill Quality Framework, every 5 verified employer assessments trigger a mandatory syllabus review by the Sector Skill Council within 60 days.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* State Curriculum Action Loop View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbackAggregations.map((agg, idx) => (
              <Card key={idx} padding="md" className="bg-white border-slate-200">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                      {agg.provider}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                      {agg.program}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm justify-end">
                      <Star size={14} className="fill-amber-500" /> {agg.avgRating}
                    </div>
                    <span className="text-[10px] text-slate-400">{agg.totalFeedbacks} verified reviews</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 my-3 p-3 bg-slate-50 rounded-lg text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Would Hire Again:</span>
                    <span className="font-bold text-emerald-600">{agg.wouldHireAgainPercent}% Employers</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Top Industry Strength:</span>
                    <span className="font-bold text-slate-800">{agg.topStrengths[0]?.skill}</span>
                  </div>
                </div>

                {/* Top Missing Skills */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    Top Missing Skills Reported by Industry:
                  </span>
                  <div className="space-y-1">
                    {agg.topMissingSkills.map((sk, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-0.5">
                        <span className="text-slate-600 flex items-center gap-1">
                          <AlertCircle size={12} className="text-amber-500" /> {sk.skill}
                        </span>
                        <span className="font-semibold text-slate-700">{sk.mentions} companies</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Actions Taken */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-blue-900 block mb-1.5 flex items-center gap-1">
                    <GitBranch size={13} className="text-blue-600" />
                    Government DVET / Council Actions Taken:
                  </span>
                  <div className="space-y-1.5">
                    {agg.actionsTaken.map((act, i) => (
                      <div key={i} className="p-2 bg-emerald-50/70 border border-emerald-200 rounded text-xs flex items-center justify-between">
                        <span className="text-emerald-900 font-medium">{act.action}</span>
                        <Badge variant={act.status === 'implemented' ? 'success' : 'info'} size="sm">
                          {act.status.toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
