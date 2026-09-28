'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Landmark,
  GraduationCap,
  Building2,
  TrendingUp,
  Award,
  Briefcase,
  FileSpreadsheet,
  ArrowRight,
  Globe,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Loader2,
  X,
  Lock,
  CheckCircle2,
  Cpu,
  Database,
  Cloud,
  Wrench,
  ChevronRight,
  Fingerprint,
  Users
} from 'lucide-react';
import type { UserRole } from '@/types';
import { Button } from '@/components/ui';

type RoleKey = 'government' | 'trainee' | 'employer' | 'institution';

interface RoleConfig {
  id: RoleKey;
  label: string;
  marathiLabel: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  route: string;
  welcomeTitle: string;
  marathiWelcomeTitle: string;
  demoBadge: string;
  identifierLabel: string;
  identifierValue: string;
  passwordValue: string;
  description: string;
}

const ROLES: Record<RoleKey, RoleConfig> = {
  government: {
    id: 'government',
    label: 'Government',
    marathiLabel: 'शासकीय अधिकारी',
    icon: Landmark,
    route: '/government',
    welcomeTitle: 'Government Command Center',
    marathiWelcomeTitle: 'शासकीय नियंत्रण कक्ष',
    demoBadge: 'Anjali Deshmukh, IAS • Joint Director',
    identifierLabel: 'Officer ID / Email',
    identifierValue: 'officer@disha.gov.in',
    passwordValue: 'demo123',
    description: 'State-wide workforce intelligence, 36-district analytics, ghost beneficiary alerts and policy ROI.',
  },
  trainee: {
    id: 'trainee',
    label: 'Learner / Trainee',
    marathiLabel: 'प्रशिक्षणार्थी',
    icon: GraduationCap,
    route: '/trainee',
    welcomeTitle: 'Trainee Career Passport',
    marathiWelcomeTitle: 'प्रशिक्षणार्थी कारकीर्द दालन',
    demoBadge: 'Rahul Sharma • NCVT Level 4 Certified',
    identifierLabel: 'Mobile Number / Email',
    identifierValue: 'rahul.sharma@disha.gov.in',
    passwordValue: 'demo123',
    description: 'Skill passport, 10-question gap diagnostic, verified job marketplace and recovery challenges.',
  },
  employer: {
    id: 'employer',
    label: 'Industry / Employer',
    marathiLabel: 'नियोक्ता / उद्योग',
    icon: Building2,
    route: '/employer',
    welcomeTitle: 'Employer Talent Portal',
    marathiWelcomeTitle: 'नियोक्ता प्रतिभा मंच',
    demoBadge: 'Priya Joshi • ABC Manufacturing Ltd',
    identifierLabel: 'Company Email',
    identifierValue: 'hr@abcmfg.in',
    passwordValue: 'demo123',
    description: 'Find verified candidates, conduct interviews, and confirm longitudinal retention for state subsidies.',
  },
  institution: {
    id: 'institution',
    label: 'Training Partner / ITI',
    marathiLabel: 'प्रशिक्षण संस्था / ITI',
    icon: Building2,
    route: '/institution',
    welcomeTitle: 'Training Institution Hub',
    marathiWelcomeTitle: 'प्रशिक्षण संस्था केंद्र',
    demoBadge: 'Dr. Suresh Kulkarni • Apex Vocational ITI',
    identifierLabel: 'Principal ID / Email',
    identifierValue: 'principal@apexiti.edu.in',
    passwordValue: 'demo123',
    description: 'Manage batches, AEBAS biometric terminal sync, dropout early warning and state placement claims.',
  },
};

const EVIDENCE_LOOP_STAGES = [
  {
    id: '01',
    name: 'Profile',
    title: 'Aadhaar e-KYC & Career Goal',
    desc: 'Learners define target destination and link DigiLocker credentials for verified identity.',
    badge: 'DigiLocker Linked'
  },
  {
    id: '02',
    name: 'Assess',
    title: 'Progressive Domain Diagnostics',
    desc: '10 standardized progressive technical questions to benchmark real-world capabilities.',
    badge: '10-Q Matrix'
  },
  {
    id: '03',
    name: 'Find Gap',
    title: 'AI Capability Deficit Engine',
    desc: 'Pinpoints specific capability gaps versus live employer requisition matrices.',
    badge: 'Radar Mapping'
  },
  {
    id: '04',
    name: 'Recommend',
    title: 'Targeted Micro-Curricula',
    desc: 'Aligns certified NSQF and vocational modules tailored to close diagnosed deficits.',
    badge: 'Evidence-Aligned'
  },
  {
    id: '05',
    name: 'Train & Attend',
    title: 'Geotagged AEBAS Biometrics',
    desc: 'Daily biometric attendance synchronization with machine-level GPS validation.',
    badge: 'Morpho AEBAS'
  },
  {
    id: '06',
    name: 'Track Outcome',
    title: 'Statutory Triangulation',
    desc: 'Cross-verifies employment claims against EPFO UAN deposits and GSTN employer returns.',
    badge: 'EPFO + GSTN'
  },
  {
    id: '07',
    name: 'Retain & Advance',
    title: 'Longitudinal Wage Audits',
    desc: 'Monitors career retention and wage progression milestones at 3, 6, and 12 months.',
    badge: 'LOI Index'
  },
  {
    id: '08',
    name: 'Evidence Loop',
    title: 'Policy & Fiscal Optimization',
    desc: 'Aggregated longitudinal outcomes dynamically guide state budget allocations and scheme design.',
    badge: 'Fiscal ROI'
  },
];

const DOMAIN_PATHWAYS = [
  {
    id: 'software',
    title: 'Software & Web Engineering',
    category: 'Full Stack & APIs',
    icon: <Cpu className="text-blue-500" size={20} />,
    description: 'Modern architectures, REST/GraphQL APIs, asynchronous execution, and data structures.',
    competencies: ['REST API Design', 'State Management', 'SQL Indexing', 'Asynchronous Queues', 'DSA Optimization'],
    role: 'trainee' as RoleKey
  },
  {
    id: 'data-ai',
    title: 'Data Analytics & Applied AI',
    category: 'Data & Pipelines',
    icon: <Database className="text-indigo-500" size={20} />,
    description: 'Relational query optimization, 3NF schemas, window functions, and predictive pipelines.',
    competencies: ['Query Plan Tuning', 'Window Aggregations', 'Pandas Transforms', 'Feature Engineering', 'Model Deployment'],
    role: 'trainee' as RoleKey
  },
  {
    id: 'cloud-infra',
    title: 'Cloud & Systems Infrastructure',
    category: 'DevOps & Reliability',
    icon: <Cloud className="text-teal-500" size={20} />,
    description: 'Docker containerization, CI/CD automated deployments, reverse proxies, and system reliability.',
    competencies: ['Docker Containers', 'CI/CD Pipelines', 'Reverse Proxy Tuning', 'Linux Systems', 'Security Hardening'],
    role: 'trainee' as RoleKey
  },
  {
    id: 'core-trades',
    title: 'Precision Trades & Advanced Mfg',
    category: 'Industrial Automation',
    icon: <Wrench className="text-amber-500" size={20} />,
    description: 'CNC multi-axis turning, Fanuc G-Code programming, EV battery diagnostics, and LOTO safety.',
    competencies: ['CNC Multi-Axis', 'G-Code Programming', 'EV Powertrain Diagnostics', 'GD&T Metrology', 'LOTO Protocol'],
    role: 'trainee' as RoleKey
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { language, setLanguage, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<RoleKey>('government');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Diagnostic Matrix Modal State
  const [selectedPathway, setSelectedPathway] = useState<typeof DOMAIN_PATHWAYS[0] | null>(null);
  const [selectedEvidenceStage, setSelectedEvidenceStage] = useState<typeof EVIDENCE_LOOP_STAGES[0] | null>(null);

  const activeRole = ROLES[selectedRole];

  const handleRoleChange = (role: RoleKey) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F5F7FA] font-sans text-slate-800 select-none">
      {/* ========================================================
          GLOBAL HEADER NAVBAR
          ======================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#0D2F5B] text-white border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white p-0.5 border border-blue-400/30 flex items-center justify-center shadow-md shrink-0 overflow-hidden">
            <Image
              src="/logo.png"
              alt="Maharashtra DISHA Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              priority
              unoptimized
            />
          </div>
          <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-amber-400/60 shadow-xs flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src="/govlogo.png"
              alt="Government of Maharashtra Official Emblem"
              width={36}
              height={36}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-wider text-white">DISHA</span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-blue-200 border-l border-white/20 pl-2">
                {language === 'mr' ? 'महाराष्ट्र कौशल्य परिणाम व्यासपीठ' : 'MAHARASHTRA SKILL OUTCOME INTELLIGENCE'}
              </span>
            </div>
            <p className="text-[10px] text-blue-200/80">
              Department of Skills, Employment, Entrepreneurship & Innovation • Govt of Maharashtra
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-white bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Globe size={13} />
              <span>{language === 'mr' ? 'मराठी' : 'English'}</span>
              <span className="text-[10px] text-blue-200">▾</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-32 bg-white text-slate-800 border border-slate-200 rounded-md shadow-lg z-50 py-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en');
                    setLangMenuOpen(false);
                    showToast('Language set to English', 'info');
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center justify-between ${
                    language === 'en' ? 'font-bold text-[#123B6D]' : 'text-slate-700'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <span>✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('mr');
                    setLangMenuOpen(false);
                    showToast('भाषा मराठीत बदलली आहे', 'info');
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center justify-between ${
                    language === 'mr' ? 'font-bold text-[#123B6D]' : 'text-slate-700'
                  }`}
                >
                  <span>मराठी</span>
                  {language === 'mr' && <span>✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Official Authorized Stakeholder Login Portal CTA */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF9933] hover:bg-[#e08528] text-slate-950 text-xs font-extrabold rounded-md shadow-sm transition-all hover:scale-105"
          >
            <Lock size={12} />
            <span>Authorized Stakeholder Login</span>
          </Link>
        </div>
      </header>

      {/* ========================================================
          HERO SECTION & 4-PORTAL SELECTOR
          ======================================================== */}
      <section className="relative w-full bg-gradient-to-br from-[#0D2F5B] via-[#123B6D] to-[#0A2548] text-white py-12 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-200 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Official Government of Maharashtra Longitudinal Workforce Platform
            </div>

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-md transition-all hover:scale-105"
            >
              <Lock size={13} />
              <span>4-Stakeholder Authorized Login Gateway →</span>
            </Link>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Bridging Talent with Opportunity Across <span className="text-[#5AA9FF]">Maharashtra</span>
            </h1>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
              A unified longitudinal intelligence platform connecting learners, vocational institutions, private employers, and the Maharashtra State Skill Development Society (MSSDS) with multi-agency verification (DigiLocker, EPFO, GSTN).
            </p>
          </div>

          {/* 4 Interactive Portal Switcher Cards (Direct to Authorized Login) */}
          <div className="pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-3 flex items-center gap-2">
              <span>EXPLORE PLATFORM PORTALS (AUTHORIZED STAKEHOLDER GATEWAYS):</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Portal 1: Learner / Trainee */}
              <div
                onClick={() => router.push('/login?role=trainee')}
                className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
                      <GraduationCap size={18} />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      Trainee
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-blue-200">
                    Learner Portal
                  </h3>
                  <p className="text-xs text-blue-100/80 mt-1 line-clamp-2">
                    Skill assessment, 10-Q diagnostics, job marketplace with 5-stage tracker, and recovery mode.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-200 font-semibold">
                  <span>Sign In as Trainee</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 2: Institution / ITI */}
              <div
                onClick={() => router.push('/login?role=institution')}
                className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                      <Building2 size={18} />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      Institution
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-purple-200">
                    Institution Portal
                  </h3>
                  <p className="text-xs text-blue-100/80 mt-1 line-clamp-2">
                    Batch management, AEBAS biometric terminal sync, dropout early warning, and state claims.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-200 font-semibold">
                  <span>Sign In as Institution</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 3: Employer */}
              <div
                onClick={() => router.push('/login?role=employer')}
                className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform">
                      <Briefcase size={18} />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300">
                      Employer
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-teal-200">
                    Employer Portal
                  </h3>
                  <p className="text-xs text-blue-100/80 mt-1 line-clamp-2">
                    Verified candidate sourcing, DigiLocker credentials, live interview calls, and retention subsidies.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-200 font-semibold">
                  <span>Sign In as Employer</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 4: Government */}
              <div
                onClick={() => router.push('/login?role=government')}
                className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200 cursor-pointer group flex flex-col justify-between ring-1 ring-amber-400/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                      <Landmark size={18} />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                      State Analytics
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-amber-200">
                    Government Analytics
                  </h3>
                  <p className="text-xs text-blue-100/80 mt-1 line-clamp-2">
                    Maharashtra 36-district intelligence, EPFO triangulation, candidate audit dossiers, and ROI simulator.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                  <span>Sign In as State Officer</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          THE COMPLETE EVIDENCE LOOP (8 SEQUENTIAL STAGES)
          ======================================================== */}
      <section className="py-12 px-4 sm:px-8 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              CONTINUOUS LONGITUDINAL PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The Complete Evidence Loop
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              From verified candidate enrollment to 12-month career retention and evidence-backed policy decisions.
            </p>
          </div>

          {/* 8-Stage Horizontal Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-4">
            {EVIDENCE_LOOP_STAGES.map((stg) => (
              <div
                key={stg.id}
                onClick={() => setSelectedEvidenceStage(stg)}
                className="p-3 rounded-xl border border-slate-200 hover:border-[#123B6D] bg-slate-50/60 hover:bg-blue-50/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-[#123B6D] font-mono">{stg.id}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#123B6D]"></span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#123B6D] mb-1">
                    {stg.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-3">
                    {stg.desc}
                  </p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-slate-200/60">
                  <span className="text-[9px] font-bold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {stg.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          TARGETED CAREER PATHWAYS & DOMAIN DIAGNOSTICS ENGINE
          ======================================================== */}
      <section className="py-12 px-4 sm:px-8 bg-[#F5F7FA] border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                ROLE-TAILORED EVALUATION & LEARNING ENGINE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Targeted Career Pathways & Domain Diagnostics
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                No generic tests. When candidates choose their target destination, DISHA delivers calibrated domain assessments, intelligent gap diagnostics, and targeted micro-curricula.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/login?role=trainee')}
              className="text-xs text-[#123B6D] border-[#123B6D] whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              Take Skill Diagnostics →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOMAIN_PATHWAYS.map((pathway) => (
              <div
                key={pathway.id}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                    {pathway.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{pathway.category}</span>
                  <h3 className="font-bold text-sm text-slate-900 mt-0.5">{pathway.title}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{pathway.description}</p>

                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Capability Matrix:</span>
                    <div className="flex flex-wrap gap-1">
                      {pathway.competencies.map((comp, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedPathway(pathway)}
                    className="w-full py-1.5 px-3 bg-slate-50 hover:bg-[#123B6D] text-slate-700 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View 10-Q Assessment Matrix</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          AUTHENTICATION & GATEWAY SECTION
          ======================================================== */}
      <section className="py-12 px-4 sm:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-xl mx-auto space-y-5 text-center">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-100/70 px-2.5 py-0.5 rounded-full border border-blue-200">
                GOVERNMENT OF MAHARASHTRA SECURE GATEWAY
              </span>
              <h3 className="text-2xl font-black text-[#123B6D]">Authorized Stakeholder Portal</h3>
              <p className="text-xs text-slate-600">
                Multi-agency authenticated access for state departments, learners, verified employers, and accredited ITIs.
              </p>
            </div>

            {/* Role Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 p-1 bg-slate-200/70 rounded-xl text-xs font-bold gap-1">
              {(Object.keys(ROLES) as RoleKey[]).map((rKey) => {
                const r = ROLES[rKey];
                const Icon = r.icon;
                const isSelected = selectedRole === rKey;
                return (
                  <button
                    key={rKey}
                    type="button"
                    onClick={() => handleRoleChange(rKey)}
                    className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#123B6D] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    <Icon size={13} />
                    <span className="truncate">{r.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Selected Role Card */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">{activeRole.welcomeTitle}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Official Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{activeRole.description}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Authorized Profile: {activeRole.demoBadge}</p>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/login?role=${selectedRole}`)}
                className="px-4 py-2.5 rounded-xl bg-[#123B6D] hover:bg-[#0D2F5B] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Lock size={13} />
                <span>Enter Official Login Gateway</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FOOTER STRIP
          ======================================================== */}
      <footer className="mt-auto bg-[#0D2F5B] text-white py-6 px-4 sm:px-8 border-t border-white/10 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white">DISHA — Maharashtra Skill Outcome Intelligence Platform</p>
            <p className="text-[11px] text-blue-200/80">Department of Skills, Employment, Entrepreneurship & Innovation • Government of Maharashtra</p>
          </div>
          <div className="flex items-center gap-3 text-blue-200">
            <span>MSSDS / DVET</span>
            <span>•</span>
            <span>DigiLocker Verified</span>
            <span>•</span>
            <span>EPFO Triangulation</span>
            <span>•</span>
            <span>AEBAS Biometrics</span>
          </div>
        </div>
      </footer>

      {/* ========================================================
          MODAL 1: 10-Q DIAGNOSTIC MATRIX PREVIEW
          ======================================================== */}
      {selectedPathway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                  {selectedPathway.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{selectedPathway.title}</h3>
                  <p className="text-[11px] text-slate-500">10-Question Progressive Capability Diagnostic Matrix</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPathway(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Candidates undergo 10 standardized progressive questions mapped to industry skill taxonomies. Scores directly feed the <strong>Longitudinal Outcome Index (LOI)</strong> and trigger personalized course recommendations.
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase">
                  Verified Skill Domains Assessed:
                </span>
                {selectedPathway.competencies.map((comp, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span className="font-medium text-slate-800 dark:text-slate-200">{comp}</span>
                    <span className="text-[10px] font-bold text-emerald-600">Level {idx + 1} Benchmark</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2 text-xs">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPathway(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedPathway(null);
                  router.push('/login?role=trainee');
                }}
                className="bg-[#123B6D] hover:bg-[#0e2f57] cursor-pointer"
              >
                Take Diagnostic Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: EVIDENCE STAGE INSPECTOR
          ======================================================== */}
      {selectedEvidenceStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-[#123B6D] font-mono px-2 py-0.5 bg-blue-50 rounded">
                  STAGE {selectedEvidenceStage.id}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{selectedEvidenceStage.name}</h3>
              </div>
              <button
                onClick={() => setSelectedEvidenceStage(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedEvidenceStage.title}</span>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {selectedEvidenceStage.desc}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-[11px] space-y-1">
                <span className="font-bold text-[#123B6D] dark:text-blue-300 block">Verification Standard:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Backed by Government of Maharashtra DVET circulars and automated API data pipelines.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedEvidenceStage(null)}
                className="bg-[#123B6D] hover:bg-[#0e2f57] text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
