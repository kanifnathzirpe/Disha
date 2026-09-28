'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar, Modal } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { curriculumAnalyses, type CurriculumAnalysis } from '@/data/mockCurriculumMismatch';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Send,
  Sparkles,
  Layers,
  Clock,
  Briefcase
} from 'lucide-react';

export default function InstitutionCurriculumMismatchPage() {
  const { showToast } = useApp();
  const [selectedAnalysis, setSelectedAnalysis] = useState<CurriculumAnalysis>(curriculumAnalyses[0]);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [proposalNotes, setProposalNotes] = useState('');

  const handleProposeRevision = () => {
    setSubmittingProposal(true);
    setTimeout(() => {
      setSubmittingProposal(false);
      setProposalModalOpen(false);
      showToast('Curriculum amendment proposal submitted to DVET & Sector Skill Council!', 'success');
      setProposalNotes('');
    }, 800);
  };

  return (
    <DashboardLayout
      role="institution"
      title="Curriculum–Industry Mismatch Intelligence"
      subtitle="Audit course syllabi against real-time industry vacancies and submit curriculum updates to DVET"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-xl p-5 mb-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 bg-white/10 rounded-md">
              <Sparkles size={16} className="text-amber-400" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
              State Skill Council Syllabus Alignment
            </span>
          </div>
          <h2 className="text-xl font-bold">Apex Vocational Institute &amp; ITI Syllabus Audit</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Live comparison of your accredited courses against 3,400+ active job specifications in Pune, Pimpri-Chinchwad, and Chakan industrial belts.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold shrink-0 text-xs flex items-center gap-1.5"
          onClick={() => setProposalModalOpen(true)}
        >
          <Send size={13} /> Propose Syllabus Amendment
        </Button>
      </div>

      {/* Program Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        {curriculumAnalyses.map(analysis => (
          <button
            key={analysis.programId}
            onClick={() => setSelectedAnalysis(analysis)}
            className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
              selectedAnalysis.programId === analysis.programId
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
            }`}
          >
            <BookOpen size={14} />
            <span>{analysis.programName}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              selectedAnalysis.programId === analysis.programId
                ? 'bg-blue-500 text-white'
                : analysis.overallMatch >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {analysis.overallMatch}%
            </span>
          </button>
        ))}
      </div>

      {/* Selected Analysis Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Card padding="sm" className="bg-white border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Industry Match Score</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-bold ${
              selectedAnalysis.overallMatch >= 80 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {selectedAnalysis.overallMatch}%
            </span>
            <span className="text-[10px] text-slate-400">/ 100 benchmark</span>
          </div>
          <ProgressBar value={selectedAnalysis.overallMatch} color={selectedAnalysis.overallMatch >= 80 ? 'success' : 'warning'} className="mt-2" />
        </Card>

        <Card padding="sm" className="bg-white border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Aligned Skills Taught</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-emerald-600">{selectedAnalysis.skillsAlignedWithIndustry}</span>
            <span className="text-[10px] text-slate-400">/ {selectedAnalysis.totalSkillsTaught} taught</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-medium">Valid industry demand</span>
        </Card>

        <Card padding="sm" className="bg-white border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Critical Missing Modules</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-red-600">{selectedAnalysis.missingCriticalSkills.length}</span>
            <span className="text-[10px] text-slate-400">urgent additions</span>
          </div>
          <span className="text-[10px] text-red-600 font-medium">High employer complaints</span>
        </Card>

        <Card padding="sm" className="bg-white border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Obsolete/Low-Demand</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-slate-700">{selectedAnalysis.obsoleteSkills.length}</span>
            <span className="text-[10px] text-slate-400">can be phased out</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Frees up 30-40 lab hrs</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Current Curriculum Syllabus Breakdown */}
        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900">Current Syllabus Modules &amp; Lab Hours</CardTitle>
              <p className="text-xs text-slate-500">Modules currently taught in batch schedule</p>
            </div>
            <Badge variant="neutral">{selectedAnalysis.curriculumSkills.length} Modules</Badge>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {selectedAnalysis.curriculumSkills.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-xs transition-colors ${
                  item.industryRelevance === 'high'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : item.industryRelevance === 'obsolete'
                    ? 'bg-red-50/50 border-red-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {item.industryRelevance === 'high' && <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />}
                    {item.industryRelevance === 'medium' && <Clock size={15} className="text-blue-500 shrink-0" />}
                    {item.industryRelevance === 'low' && <AlertTriangle size={15} className="text-amber-500 shrink-0" />}
                    {item.industryRelevance === 'obsolete' && <XCircle size={15} className="text-red-500 shrink-0" />}
                    <span className="font-bold text-slate-900">{item.name}</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.industryRelevance === 'high'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.industryRelevance === 'medium'
                      ? 'bg-blue-100 text-blue-800'
                      : item.industryRelevance === 'low'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.industryRelevance.toUpperCase()} RELEVANCE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mt-2">
                  <div>
                    <span className="text-slate-400">Allocated Hours: </span>
                    <span className="font-semibold text-slate-800">{item.hoursAllocated} hrs</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Syllabus Depth: </span>
                    <span className="font-semibold text-slate-800 capitalize">{item.coverage} coverage</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Real-Time Industry Skill Demand in Maharashtra */}
        <Card padding="md" className="bg-white border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">Industry Vacancies vs Syllabus Coverage</CardTitle>
                <p className="text-xs text-slate-500">Skills required by hiring employers in {selectedAnalysis.district}</p>
              </div>
              <Badge variant="info">Active Postings</Badge>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {selectedAnalysis.industrySkills.map((sk, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Briefcase size={14} className="text-blue-600" />
                      {sk.name}
                    </span>
                    <Badge variant={sk.taughtInCurriculum ? 'success' : 'error'} size="sm">
                      {sk.taughtInCurriculum ? 'Taught in Course' : 'Missing in Course'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mt-2">
                    <div>
                      <span className="text-slate-400">Demand Level: </span>
                      <span className={`font-semibold capitalize ${
                        sk.demandLevel === 'critical' ? 'text-red-600' : 'text-amber-600'
                      }`}>
                        {sk.demandLevel}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Active Job Postings: </span>
                      <span className="font-semibold text-slate-800">{sk.jobPostings} openings</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations List */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-900 block mb-2">
                Automated Curriculum Modernization Actions:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedAnalysis.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick DVET Grant Apply Footer */}
          <div className="mt-5 p-3.5 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-indigo-950">Laboratory Modernization Grant Available</p>
              <p className="text-[11px] text-indigo-700">DVET provides up to ₹15 Lakhs for advanced simulator kits when adopting new modules.</p>
            </div>
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shrink-0"
              onClick={() => showToast('Redirecting to DVET Lab Modernization Scheme portal...', 'info')}
            >
              Apply for Grant
            </Button>
          </div>
        </Card>
      </div>

      {/* Propose Syllabus Amendment Modal */}
      {proposalModalOpen && (
        <Modal
          open={proposalModalOpen}
          onClose={() => setProposalModalOpen(false)}
          title={`Propose Syllabus Amendment: ${selectedAnalysis.programName}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Submit formal curriculum restructuring requests to the Maharashtra Directorate of Vocational Education &amp; Training (DVET) and Sector Skill Council for accreditation approval.
            </p>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Trade / Course:</label>
              <input
                type="text"
                disabled
                value={selectedAnalysis.programName}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded text-slate-700 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Proposed Lab Hour Adjustments:</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-[11px]">
                  <span className="font-bold text-emerald-800 block">Add to Syllabus:</span>
                  <span>CAM Software + 5-Axis Turning (+40 hrs)</span>
                </div>
                <div className="p-2.5 bg-slate-100 border border-slate-300 rounded text-[11px]">
                  <span className="font-bold text-slate-700 block">Deprecate from Syllabus:</span>
                  <span>Manual Drafting (-40 hrs)</span>
                </div>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Instructor Readiness &amp; Notes:</label>
              <textarea
                rows={3}
                placeholder="Detail certified faculty availability, industrial partner support, or master trainer requirements..."
                value={proposalNotes}
                onChange={e => setProposalNotes(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t">
              <Button variant="outline" size="sm" onClick={() => setProposalModalOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                onClick={handleProposeRevision}
                disabled={submittingProposal}
              >
                {submittingProposal ? 'Submitting to Board...' : 'Submit Official Proposal'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
