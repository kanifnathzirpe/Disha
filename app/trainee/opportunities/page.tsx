'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar, Modal } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { mockJobs } from '@/data/mockJobs';
import { traineeProfile, skillPassport } from '@/data/mockTraineeExperience';
import { formatCurrency, formatNumber } from '@/lib/utils';
import {
  Sparkles,
  Briefcase,
  MapPin,
  Building2,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Share2,
  ExternalLink,
  ChevronRight,
  Filter,
  Award,
  IndianRupee,
  Clock,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import Link from 'next/link';

interface ExtendedOpportunity {
  id: string;
  title: string;
  employer: string;
  employerId: string;
  sector: string;
  district: string;
  type: 'full-time' | 'apprenticeship' | 'internship';
  wageMin: number;
  wageMax: number;
  requiredSkills: string[];
  requiredCertifications: string[];
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  stipendSubsidized: boolean;
  postedDate: string;
  description: string;
}

export default function TraineeOpportunitiesPage() {
  const { showToast } = useApp();

  // Filter state
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minMatch, setMinMatch] = useState<number>(60);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['JOB001']);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [activeModalOpportunity, setActiveModalOpportunity] = useState<ExtendedOpportunity | null>(null);

  // Candidate verified skill set
  const candidateSkills = useMemo(() => {
    return skillPassport.map(s => s.name.toLowerCase());
  }, []);

  // Compute matched and missing skills with explainable match scores
  const opportunities: ExtendedOpportunity[] = useMemo(() => {
    const rawOpportunities: ExtendedOpportunity[] = [
      ...mockJobs.map(job => {
        const req = job.requiredSkills;
        const matched = req.filter(skill =>
          candidateSkills.some(cs => cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs))
        );
        const missing = req.filter(skill =>
          !candidateSkills.some(cs => cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs))
        );
        const matchPct = Math.round((matched.length / Math.max(req.length, 1)) * 40 + (job.district === traineeProfile.district ? 20 : 10) + 35);
        const finalScore = Math.min(Math.max(matchPct, 65), 98);

        return {
          id: job.id,
          title: job.title,
          employer: job.employer,
          employerId: job.employerId,
          sector: job.sector,
          district: job.district,
          type: (job.id === 'JOB003' ? 'apprenticeship' : 'full-time') as ExtendedOpportunity['type'],
          wageMin: job.wageMin,
          wageMax: job.wageMax,
          requiredSkills: job.requiredSkills,
          requiredCertifications: job.requiredCertifications,
          matchScore: finalScore,
          matchedSkills: matched.length > 0 ? matched : [req[0]],
          missingSkills: missing,
          stipendSubsidized: job.id === 'JOB002' || job.id === 'JOB003',
          postedDate: job.postedDate,
          description: job.description,
        };
      }),
      // Additional Apprenticeship and Training Placement Opportunities
      {
        id: 'OPP-APP-101',
        title: 'National Apprenticeship Promotion Scheme (NAPS) — CNC Specialist',
        employer: 'Bharat Forge Ltd',
        employerId: 'EMP-BF',
        sector: 'Manufacturing',
        district: 'Pune',
        type: 'apprenticeship',
        wageMin: 15500,
        wageMax: 18000,
        requiredSkills: ['CNC', 'Machine Operation', 'G-Code', 'Industrial Safety'],
        requiredCertifications: ['PMKVY Level 4/5'],
        matchScore: 96,
        matchedSkills: ['CNC', 'Machine Operation', 'Industrial Safety'],
        missingSkills: ['G-Code Advanced'],
        stipendSubsidized: true,
        postedDate: '2026-09-15',
        description: '1-year subsidized apprenticeship with direct conversion to permanent junior technician based on assessment.',
      },
      {
        id: 'OPP-INT-202',
        title: 'Industrial Automation Trainee',
        employer: 'Siemens India Partner Network',
        employerId: 'EMP-SIEMENS',
        sector: 'Automotive',
        district: 'Pune',
        type: 'internship',
        wageMin: 16000,
        wageMax: 20000,
        requiredSkills: ['PLC Programming', 'AutoCAD', 'Sensor Integration'],
        requiredCertifications: ['Diploma or ITI Certification'],
        matchScore: 84,
        matchedSkills: ['AutoCAD', 'Machine Operation'],
        missingSkills: ['Sensor Integration'],
        stipendSubsidized: true,
        postedDate: '2026-09-18',
        description: 'Hands-on training internship on live robotic assembly lines and automated conveying systems.',
      },
      {
        id: 'OPP-EV-303',
        title: 'EV Battery Assembly Technician',
        employer: 'Mahindra Electric Mobility',
        employerId: 'EMP-MM',
        sector: 'Automotive',
        district: 'Chhatrapati Sambhajinagar',
        type: 'full-time',
        wageMin: 22000,
        wageMax: 28000,
        requiredSkills: ['EV Systems', 'Battery Testing', 'Electrical Wiring'],
        requiredCertifications: ['EV Technician Certificate'],
        matchScore: 78,
        matchedSkills: ['Electrical Wiring'],
        missingSkills: ['EV Systems', 'Battery Testing'],
        stipendSubsidized: false,
        postedDate: '2026-09-20',
        description: 'Assembly, testing, and quality diagnostics of high-voltage battery packs for commercial electric vehicles.',
      }
    ];

    return rawOpportunities.sort((a, b) => b.matchScore - a.matchScore);
  }, [candidateSkills]);

  // Filtered opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const matchType = selectedType === 'All' || opp.type === selectedType;
      const matchSector = selectedSector === 'All' || opp.sector === selectedSector;
      const matchDistrict = selectedDistrict === 'All' || opp.district === selectedDistrict;
      const matchScoreOk = opp.matchScore >= minMatch;
      const matchQuery = !searchQuery ||
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.employer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchType && matchSector && matchDistrict && matchScoreOk && matchQuery;
    });
  }, [opportunities, selectedType, selectedSector, selectedDistrict, minMatch, searchQuery]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(x => x !== id));
      showToast('Removed from saved opportunities', 'info');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      showToast('Opportunity saved to your bookmarks!', 'success');
    }
  };

  const handleApply = (opp: ExtendedOpportunity, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (appliedIds.includes(opp.id)) {
      showToast('You have already applied for this opening.', 'info');
      return;
    }
    setAppliedIds([...appliedIds, opp.id]);
    setActiveModalOpportunity(null);
    showToast(`Application successfully submitted to ${opp.employer} with Verified Skill Passport!`, 'success');
  };

  const sectors = useMemo(() => ['All', ...Array.from(new Set(opportunities.map(o => o.sector)))], [opportunities]);
  const districts = useMemo(() => ['All', ...Array.from(new Set(opportunities.map(o => o.district)))], [opportunities]);

  return (
    <DashboardLayout
      role="trainee"
      title="Personalized Opportunity Feed"
      subtitle="AI-matched jobs, apprenticeships, and paid training placements verified against your Skill Passport"
    >
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-xl p-5 mb-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 bg-white/20 rounded-md">
              <Sparkles size={16} className="text-yellow-300" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">
              Verified Job Readiness: 92% (High Employability)
            </span>
          </div>
          <h2 className="text-xl font-bold">Recommendations tailored for {traineeProfile.name}</h2>
          <p className="text-xs text-blue-100 mt-1 max-w-2xl">
            Our explainable AI matches your practical assessment scores, ITI credentials, and verified modules with active vacancies from 480+ certified Maharashtra employers.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/trainee/skills">
            <Button size="sm" variant="outline" className="text-xs bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Award size={14} className="mr-1" /> View Passport
            </Button>
          </Link>
          <Link href="/trainee/assessment">
            <Button size="sm" className="text-xs bg-white text-blue-900 hover:bg-blue-50 font-bold">
              Boost Score (+5%)
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card padding="sm" className="bg-white border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role, company, or skill (e.g. CNC, PLC, Pune)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Opportunity Type */}
            <select
              aria-label="Filter by Opportunity Type"
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-2.5 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="full-time">Full-Time Jobs</option>
              <option value="apprenticeship">NAPS Apprenticeship</option>
              <option value="internship">Paid Internship</option>
            </select>

            {/* Sector */}
            <select
              aria-label="Filter by Sector"
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="px-2.5 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {sectors.map(sec => (
                <option key={sec} value={sec}>{sec === 'All' ? 'All Sectors' : sec}</option>
              ))}
            </select>

            {/* District */}
            <select
              aria-label="Filter by District"
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="px-2.5 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {districts.map(dist => (
                <option key={dist} value={dist}>{dist === 'All' ? 'All Locations' : dist}</option>
              ))}
            </select>

            {/* Minimum Match Filter */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
              <span className="text-[11px] font-medium text-slate-500">Min Match:</span>
              <span className="font-bold text-blue-600">{minMatch}%</span>
              <input
                type="range"
                min={50}
                max={95}
                step={5}
                value={minMatch}
                onChange={e => setMinMatch(Number(e.target.value))}
                className="w-16 h-1 bg-slate-300 rounded-lg cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Main Opportunities Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filteredOpportunities.map(opp => {
          const isApplied = appliedIds.includes(opp.id);
          const isSaved = bookmarkedIds.includes(opp.id);

          return (
            <Card
              key={opp.id}
              padding="md"
              className="bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
              onClick={() => setActiveModalOpportunity(opp)}
            >
              <div>
                {/* Header row: Match badge + bookmark */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        opp.matchScore >= 90
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : opp.matchScore >= 80
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      <Sparkles size={12} /> {opp.matchScore}% Match
                    </span>
                    {opp.stipendSubsidized && (
                      <span className="text-[10px] bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded-full">
                        Govt Subsidized
                      </span>
                    )}
                  </div>

                  <button
                    onClick={e => toggleBookmark(opp.id, e)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <Bookmark size={16} className={isSaved ? 'fill-blue-600 text-blue-600' : ''} />
                  </button>
                </div>

                {/* Role Title & Employer */}
                <h3 className="font-bold text-sm text-slate-900 line-clamp-1 hover:text-blue-600 transition-colors">
                  {opp.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                  <Building2 size={13} className="text-slate-400" />
                  <span className="font-medium text-slate-800">{opp.employer}</span>
                  <span title="Verified Employer"><ShieldCheck size={13} className="text-emerald-500" /></span>
                </div>

                {/* Location and Wage */}
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 pb-2.5 border-b border-slate-100">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" /> {opp.district}
                  </span>
                  <span className="font-bold text-slate-900 flex items-center gap-0.5">
                    <IndianRupee size={12} className="text-slate-600" />
                    {formatCurrency(opp.wageMin).replace('₹', '')} - {formatCurrency(opp.wageMax).replace('₹', '')}/mo
                  </span>
                </div>

                {/* Explainable Skill Alignment */}
                <div className="mt-3">
                  <div className="text-[11px] font-semibold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Matched Skills ({opp.matchedSkills.length})</span>
                    <span className="text-[10px] text-emerald-600 font-bold">Verified on Passport</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {opp.matchedSkills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded text-[10px] font-medium flex items-center gap-0.5">
                        <Check size={10} /> {sk}
                      </span>
                    ))}
                  </div>

                  {opp.missingSkills.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 mb-1">
                        Skill Gaps ({opp.missingSkills.length})
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {opp.missingSkills.map((sk, i) => (
                          <span key={i} className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded text-[10px] font-medium">
                            +{sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400 capitalize">
                  {opp.type.replace('-', ' ')}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs px-2.5 h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalOpportunity(opp);
                    }}
                  >
                    Details
                  </Button>

                  <Button
                    size="sm"
                    className={`text-xs px-3 h-8 font-semibold ${
                      isApplied ? 'bg-emerald-600 text-white cursor-default' : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    onClick={(e) => handleApply(opp, e)}
                    disabled={isApplied}
                  >
                    {isApplied ? (
                      <span className="flex items-center gap-1"><CheckCircle2 size={13} /> Applied</span>
                    ) : (
                      'Apply with Passport'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredOpportunities.length === 0 && (
        <Card padding="lg" className="bg-white border-slate-200 text-center py-12">
          <AlertCircle size={32} className="mx-auto text-slate-400 mb-3" />
          <h3 className="font-bold text-base text-slate-800">No matching opportunities found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            Try adjusting your match score threshold, lowering district restrictions, or exploring complementary sectors.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedType('All');
              setSelectedSector('All');
              setSelectedDistrict('All');
              setSearchQuery('');
              setMinMatch(60);
            }}
          >
            Reset Filters
          </Button>
        </Card>
      )}

      {/* Opportunity Detail & 1-Click Application Modal */}
      {activeModalOpportunity && (
        <Modal
          open={!!activeModalOpportunity}
          onClose={() => setActiveModalOpportunity(null)}
          title={activeModalOpportunity.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 size={16} className="text-blue-600" />
                  {activeModalOpportunity.employer}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={13} /> {activeModalOpportunity.district}, Maharashtra
                </p>
              </div>

              <div className="text-right">
                <Badge variant={activeModalOpportunity.matchScore >= 85 ? 'success' : 'info'}>
                  {activeModalOpportunity.matchScore}% Match
                </Badge>
                <p className="text-xs font-bold text-emerald-700 mt-1">
                  {formatCurrency(activeModalOpportunity.wageMin)} - {formatCurrency(activeModalOpportunity.wageMax)}/mo
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">Role Description</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeModalOpportunity.description}
              </p>
            </div>

            {/* Explainable Skill Match Breakdown */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Award size={15} className="text-blue-600" />
                Explainable Match Breakdown
              </h4>

              <div className="space-y-2">
                <div>
                  <span className="text-[11px] font-semibold text-slate-600">Skills Verified in Your Digital Passport:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {activeModalOpportunity.matchedSkills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-medium flex items-center gap-1">
                        <Check size={12} /> {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {activeModalOpportunity.missingSkills.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600">Recommended Skills to Add:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {activeModalOpportunity.missingSkills.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded text-xs font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Government Benefit notice */}
            {activeModalOpportunity.stipendSubsidized && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs text-purple-900">
                <strong className="font-semibold">NAPS / DBT Subsidy Eligible: </strong>
                This opportunity includes ₹1,500/month government direct benefit transfer (DBT) credit directly into your linked bank account.
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveModalOpportunity(null)}
              >
                Close
              </Button>

              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                onClick={() => handleApply(activeModalOpportunity)}
                disabled={appliedIds.includes(activeModalOpportunity.id)}
              >
                {appliedIds.includes(activeModalOpportunity.id)
                  ? 'Application Submitted'
                  : 'Submit Application with Digital Passport'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
