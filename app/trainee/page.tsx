'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { InteractiveReadinessSimulator } from '@/components/trainee/InteractiveReadinessSimulator';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/translations';
import { 
  Award, 
  Briefcase, 
  CheckCircle, 
  TrendingUp, 
  IndianRupee,
  Clock, 
  Target, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Activity,
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Star,
  Sparkles,
  ClipboardCheck,
  X,
  Check
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function TraineeDashboard() {
  const { appliedJobs, applyToJob, showToast, language } = useApp();

  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [readinessScore, setReadinessScore] = useState(78);

  // Get Back on Track (Recovery Mode) State
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryTasks, setRecoveryTasks] = useState([
    { id: 1, title: 'Complete Fanuc CNC G-Code Review Quiz', completed: true, points: '+25 XP' },
    { id: 2, title: 'Submit GD&T Measurement Verification Worksheet', completed: true, points: '+35 XP' },
    { id: 3, title: 'Attend Saturday Workshop Catch-up Lab (28 Sep)', completed: false, points: '+40 XP' },
    { id: 4, title: 'Pass Safety & Machine Metrology Clearance Retest', completed: false, points: '+50 XP' },
  ]);

  const toggleRecoveryTask = (id: number) => {
    setRecoveryTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    showToast('Recovery progress updated!', 'info');
  };

  const assessmentQuestions = [
    {
      id: 1,
      question: 'Which G-Code represents linear interpolation with feed rate on a CNC Turning machine?',
      options: ['G00 (Rapid Traverse)', 'G01 (Linear Cutting)', 'G02 (Clockwise Arc)', 'G28 (Return Home)'],
      correct: 1,
    },
    {
      id: 2,
      question: 'What is the least count of a standard Vernier Caliper with 50 vernier divisions matching 49 main scale divisions?',
      options: ['0.1 mm', '0.05 mm', '0.02 mm', '0.001 mm'],
      correct: 2,
    },
    {
      id: 3,
      question: 'In 5S Industrial Metrology and Shopfloor Standards, what does "Seiri" stand for?',
      options: ['Sort / Eliminate Unnecessary', 'Set in Order / Straighten', 'Shine / Cleanliness', 'Sustain / Discipline'],
      correct: 0,
    },
  ];

  const handleAssessmentSubmit = () => {
    let correctCount = 0;
    assessmentQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    const percentage = Math.round((correctCount / assessmentQuestions.length) * 100);
    setAssessmentSubmitted(true);
    setReadinessScore(Math.min(95, readinessScore + (correctCount > 1 ? 5 : 2)));
    showToast(`Assessment Completed! Score: ${percentage}%. Skill Readiness boosted to ${Math.min(95, readinessScore + (correctCount > 1 ? 5 : 2))}%!`, 'success');
  };

  const journeyProgress = 78;
  const journeyStages = [
    { name: 'Enrollment', status: 'completed', date: 'Jan 2026', desc: 'Govt ITI Aundh' },
    { name: 'Training', status: 'completed', date: 'Mar 2026', desc: '520 Practical Hrs' },
    { name: 'Certification', status: 'completed', date: 'Apr 2026', desc: 'NCVT Level 4' },
    { name: 'Employment', status: 'completed', date: 'May 2026', desc: 'ABC Mfg Ltd' },
    { name: '90D Retention', status: 'completed', date: 'Aug 2026', desc: 'Verified on EPFO' },
    { name: '180D Retention', status: 'in-progress', date: 'Nov 2026', desc: 'In Progress (Day 138)' },
  ];

  // Radar chart data for skill readiness
  const skillReadinessData = [
    { skill: 'CNC Turning', score: 88, fullMark: 100 },
    { skill: 'G-Code', score: 76, fullMark: 100 },
    { skill: 'AutoCAD', score: 65, fullMark: 100 },
    { skill: 'Industrial Safety', score: 94, fullMark: 100 },
    { skill: 'Quality Metrology', score: 82, fullMark: 100 },
    { skill: 'Maintenance', score: 70, fullMark: 100 },
  ];

  // Wage progression data
  const wageData = [
    { milestone: 'Apprentice Start', wage: 12500, benchmark: 11000 },
    { milestone: 'Certification', wage: 16000, benchmark: 14500 },
    { milestone: 'Joining (May 26)', wage: 21000, benchmark: 18000 },
    { milestone: '90D Milestone', wage: 22500, benchmark: 19500 },
    { milestone: 'Current Wage', wage: 24500, benchmark: 20500 },
    { milestone: 'Target (Year 1)', wage: 28000, benchmark: 23000 },
  ];

  const recommendedJobs = [
    {
      id: 'job-01',
      title: 'Senior CNC Turning Operator',
      company: 'ABC Manufacturing Ltd',
      location: 'Chakan MIDC, Pune',
      salary: '₹24,000–₹28,000 / mo',
      matchScore: 94,
      skills: ['CNC Turning', 'G-Code', '5S Safety'],
      type: 'Full-time • Direct Roll',
    },
    {
      id: 'job-02',
      title: 'Precision Machining Specialist',
      company: 'Bharat Forge Industrial',
      location: 'Mundhwa, Pune',
      salary: '₹26,000–₹32,000 / mo',
      matchScore: 89,
      skills: ['CNC Milling', 'CMM Inspection', 'AutoCAD'],
      type: 'Full-time • Shift Allowance',
    },
    {
      id: 'job-03',
      title: 'Automation Cell Technician',
      company: 'Tata Motors Component Div',
      location: 'Pimpri MIDC, Pune',
      salary: '₹25,000–₹30,000 / mo',
      matchScore: 85,
      skills: ['PLC Basics', 'Hydraulics', 'CNC'],
      type: 'Full-time • Subsidized Transport',
    },
  ];

  const recommendedActions = [
    { 
      id: 1, 
      title: 'Complete 5-Axis Fanuc Controller Module', 
      description: 'Advance to NCVT Level 5 to qualify for +₹4,500/month wage increment',
      priority: 'high',
      category: 'Learning',
      href: '/trainee/learning',
    },
    { 
      id: 2, 
      title: 'Apply for Senior CNC Technician Roles', 
      description: '3 premium tier manufacturing units in Chakan match >85% of your passport',
      priority: 'medium',
      category: 'Career',
      href: '/trainee/jobs',
    },
    { 
      id: 3, 
      title: 'Download DigiLocker Verified Certificate', 
      description: 'QR-coded National Trade Certificate ready for official verification',
      priority: 'low',
      category: 'Services',
      href: '/trainee/certificates',
    },
  ];

  return (
    <DashboardLayout 
      role="trainee" 
      title={language === 'mr' ? 'शुभ प्रभात, राहुल' : 'Good morning, Rahul'} 
      subtitle={language === 'mr' ? 'आपली कारकीर्द प्रगती ७८% पूर्ण झाली आहे' : 'Your career journey is 78% complete'}
      showDistrictSelector={false}
    >
      {/* Welcome Hero Banner with Profile Completion Ring matching reference prototype */}
      <div className="bg-gradient-to-r from-[#123B6D] via-[#1a4a84] to-[#0e2f57] text-white rounded-xl p-5 mb-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          {/* Left Greeting & Context */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs">
                {language === 'mr' ? 'शासकीय ITI औंध (पुणे)' : 'Govt ITI Aundh (Pune)'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {language === 'mr' ? 'NCVT स्तर ४ प्रमाणित' : 'NCVT Level 4 Certified'}
              </span>
              <span className="text-xs text-blue-200">
                {language === 'mr' ? '२८ सप्टें २०२६ • सत्र ४७ सक्रिय' : '28 Sep 2026 • Session 47 Active'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {language === 'mr' ? 'स्वागत आहे, राहुल शर्मा' : 'Welcome back, Rahul Sharma'}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              {language === 'mr' 
                ? 'नियमित प्रात्यक्षिक सराव उच्च-धारणा औद्योगिक कारकीर्द घडवतो. आपण ५० पैकी ४६ सत्रे ९२% हजेरीसह पूर्ण केली आहेत.'
                : '"Consistent hands-on practice builds high-retention industrial careers." You have completed 46 of 50 training sessions with a 92% attendance rate.'}
            </p>

            {/* Quick Navigation Badges matching reference */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                size="sm"
                variant="primary"
                onClick={() => setShowAssessmentModal(true)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <Sparkles size={13} />
                <span>{language === 'mr' ? 'कौशल्य चाचणी द्या' : 'Take Skill Assessment'}</span>
              </Button>

              <Link href="/trainee/attendance">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20">
                  <ClipboardCheck size={13} className="text-emerald-400" />
                  <span>{language === 'mr' ? 'हजेरी: ९२%' : 'Attendance: 92%'}</span>
                </span>
              </Link>

              <Link href="/trainee/leaderboard">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20">
                  <Award size={13} className="text-amber-300" />
                  <span>{language === 'mr' ? 'रँक #४ पुणे' : 'Rank #4 Pune'}</span>
                </span>
              </Link>

              <Link href="/trainee/courses">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20">
                  <BookOpen size={13} className="text-blue-300" />
                  <span>{language === 'mr' ? 'अभ्यासक्रम सूची' : 'Course Catalog'}</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Profile Completion Ring (85% COMPLETE) */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-4 sm:min-w-[280px]">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="transparent"
                  className="text-white/20"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={163.36}
                  strokeDashoffset={163.36 * (1 - 0.85)}
                  strokeLinecap="round"
                  className="text-emerald-400"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-white">85%</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-white uppercase text-[11px] tracking-wider">Profile Status</p>
              <p className="text-emerald-300 font-semibold flex items-center gap-1 text-[11px]">
                <ShieldCheck size={12} />
                Aadhaar e-KYC Verified
              </p>
              <p className="text-blue-200 text-[10px]">
                DigiLocker NCVT Synced • Passport Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Career Readiness & Wage Simulation Engine */}
      <div className="mb-6">
        <InteractiveReadinessSimulator />
      </div>

      {/* Get Back on Track (Recovery Mode Banner) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 dark:border-amber-700/60 rounded-xl p-4 mb-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-slate-900">
                RECOVERY CHALLENGES WAITING
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Leaderboard Status: <strong className="text-amber-600">Conditionally Active</strong>
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
              Complete <strong>2 remaining recovery milestones</strong> to restore full 100% placement eligibility. <strong>14 days remaining</strong> in current cycle.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {recoveryTasks.filter(t => t.completed).length} / {recoveryTasks.length} Completed
            </span>
            <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full" 
                style={{ width: `${(recoveryTasks.filter(t => t.completed).length / recoveryTasks.length) * 100}%` }}
              />
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowRecoveryModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shadow-xs"
          >
            <span>Continue Recovery</span>
            <ArrowRight size={13} className="ml-1" />
          </Button>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Skill Readiness</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
              <Award size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{readinessScore}%</p>
          <p className="text-[11px] text-slate-500 mt-1">Industry benchmark: 65%</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Employment</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
              <Briefcase size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Verified</p>
            <ShieldCheck size={18} className="text-emerald-600" />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">ABC Mfg (Since May 2026)</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">90D Retention</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
              <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Completed</p>
          <p className="text-[11px] text-slate-500 mt-1">EPFO Active (138 Days)</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Current Wage</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
              <IndianRupee size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">₹20K–₹25K</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">+96% above stipend</p>
        </Card>
      </div>

      {/* Main: Your Journey Visual Timeline */}
      <Card padding="md" className="mb-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <CardTitle>Your Career Journey</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">Continuous verification from ITI enrollment to long-term industrial retention</p>
          </div>
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900 self-start sm:self-auto">
            Stage 5 of 6 Active
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Overall Milestone Completion</span>
            <span className="font-bold text-blue-700 dark:text-blue-400">{journeyProgress}%</span>
          </div>
          <ProgressBar value={journeyProgress} size="md" color="brand" />

          {/* Stepper Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
            {journeyStages.map((stage, idx) => {
              const isDone = stage.status === 'completed';
              const isInProgress = stage.status === 'in-progress';

              return (
                <div 
                  key={stage.name}
                  className={`p-3 rounded-lg border transition-all ${
                    isDone 
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' 
                      : isInProgress
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 ring-1 ring-blue-400/30'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100">{stage.name}</span>
                    {isDone ? (
                      <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Clock size={14} className="text-blue-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300">{stage.date}</p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{stage.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Two Column Charts: Skill Readiness Radar & Wage Progression Line */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Radar Chart: Skill Readiness */}
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Skill Readiness Radar</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Competency breakdown across core mechanical trades</p>
            </div>
            <Link href="/trainee/skills">
              <Button size="sm" variant="outline">
                View Passport
              </Button>
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillReadinessData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                <Radar name="Rahul Sharma" dataKey="score" stroke="#123B6D" fill="#123B6D" fillOpacity={0.4} />
                <Tooltip 
                  formatter={(val: any) => [`${val}%`, 'Proficiency']}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[11px] text-slate-500 mt-2">
            Strongest in <strong className="text-slate-800 dark:text-slate-200">Industrial Safety (94%)</strong> and <strong className="text-slate-800 dark:text-slate-200">CNC Turning (88%)</strong>
          </p>
        </Card>

        {/* Line Chart: Wage Progression */}
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Wage Progression Over Time</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Actual monthly earnings vs Maharashtra district ITI benchmark</p>
            </div>
            <Link href="/trainee/wages">
              <Button size="sm" variant="outline">
                Full Analytics
              </Button>
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wageData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="milestone" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis unit="₹" tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip 
                  formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, '']}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '12px' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="wage" name="Rahul's Wage" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="benchmark" name="District ITI Average" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[11px] text-slate-500 mt-2">
            Current trajectory exceeds Pune district average by <strong className="text-emerald-600 font-bold">+₹4,000 / month</strong>
          </p>
        </Card>
      </div>

      {/* Recommended Jobs */}
      <Card padding="md" className="mb-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>Recommended Employment Opportunities</CardTitle>
            <p className="text-xs text-slate-500">Verified employer vacancies with high skill passport match</p>
          </div>
          <Link href="/trainee/jobs">
            <Button size="sm" variant="outline">
              View All Jobs <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedJobs.map((job) => {
            const hasApplied = appliedJobs.includes(job.id);

            return (
              <div 
                key={job.id} 
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{job.title}</h4>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">{job.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <Star size={10} className="fill-emerald-600 text-emerald-600" />
                      {job.matchScore}%
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-semibold">
                      <IndianRupee size={12} />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.skills.map((s) => (
                      <span key={s} className="text-[10px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  size="sm" 
                  variant={hasApplied ? 'secondary' : 'primary'}
                  className="w-full"
                  disabled={hasApplied}
                  onClick={() => {
                    applyToJob(job.id, job.title);
                  }}
                >
                  {hasApplied ? (
                    <>
                      <CheckCircle2 size={12} className="mr-1 text-emerald-600" />
                      Applied
                    </>
                  ) : (
                    'Apply with Skill Passport'
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recommended Actions */}
      <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardTitle>Recommended Progression Actions</CardTitle>
        <p className="text-xs text-slate-500 mb-4">State skill interventions tailored to accelerate your career growth</p>
        
        <div className="space-y-3">
          {recommendedActions.map((action) => (
            <div key={action.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 transition-colors gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  action.category === 'Learning' ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' :
                  action.category === 'Career' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' :
                  'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {action.category === 'Learning' ? <BookOpen size={16} /> :
                   action.category === 'Career' ? <Target size={16} /> :
                   <Activity size={16} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">{action.title}</h3>
                    <Badge 
                      variant={action.priority === 'high' ? 'error' : action.priority === 'medium' ? 'warning' : 'info'} 
                      size="sm"
                    >
                      {action.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{action.description}</p>
                </div>
              </div>

              <Link href={action.href} className="self-end sm:self-auto">
                <Button size="sm" variant="outline">
                  {action.category === 'Learning' ? 'Start Module' :
                   action.category === 'Career' ? 'Explore Roles' :
                   'Open Registry'}
                  <ArrowRight size={13} className="ml-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>

      {/* Skill Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl max-w-xl w-full p-6 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">NCVT Skill Assessment</h3>
                  <p className="text-xs text-slate-500">Trade: CNC Turning Operator • Benchmark Verification</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowAssessmentModal(false);
                  setAssessmentSubmitted(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              {!assessmentSubmitted ? (
                assessmentQuestions.map((q, idx) => (
                  <div key={q.id} className="p-3.5 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2.5">
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                      Q{idx + 1}. {q.question}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-2.5 p-2 rounded-md border cursor-pointer transition-colors ${
                            answers[q.id] === optIdx
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-semibold'
                              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            checked={answers[q.id] === optIdx}
                            onChange={() => setAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Assessment Successfully Logged</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Your responses have been validated against NCVT Level 4 criteria. Your verified Skill Readiness score has been updated to <strong>{readinessScore}%</strong>.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-700">
              <span className="text-[11px] text-slate-400">
                {Object.keys(answers).length} of {assessmentQuestions.length} answered
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowAssessmentModal(false);
                    setAssessmentSubmitted(false);
                  }}
                >
                  {assessmentSubmitted ? 'Done' : 'Cancel'}
                </Button>
                {!assessmentSubmitted && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAssessmentSubmit}
                    disabled={Object.keys(answers).length < assessmentQuestions.length}
                    className="bg-[#123B6D] hover:bg-[#0e2f57]"
                  >
                    Submit Answers
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GET BACK ON TRACK RECOVERY MODAL */}
      {showRecoveryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 bg-gradient-to-r from-amber-600 to-amber-700 text-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900/10 flex items-center justify-center text-slate-900">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-950">Get Back on Track: Recovery Plan</h3>
                  <p className="text-[11px] text-slate-900/80">Restore 100% Verified Active Placement Status</p>
                </div>
              </div>
              <button
                onClick={() => setShowRecoveryModal(false)}
                className="text-slate-900 hover:text-black p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Recovery Milestone Completion:</span>
                  <span className="font-bold text-amber-600">
                    {Math.round((recoveryTasks.filter(t => t.completed).length / recoveryTasks.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-amber-200 dark:bg-amber-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-600 rounded-full transition-all duration-300"
                    style={{ width: `${(recoveryTasks.filter(t => t.completed).length / recoveryTasks.length) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Complete all 4 items before <strong>12-Oct-2026</strong> to restore your profile to the top recruiter tier.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-700 dark:text-slate-300">Action Milestones:</p>
                {recoveryTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleRecoveryTask(task.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      task.completed
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded flex items-center justify-center ${
                        task.completed ? 'bg-emerald-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                      }`}>
                        {task.completed && <Check size={12} />}
                      </div>
                      <span className={`text-xs ${task.completed ? 'line-through text-slate-400' : 'font-medium text-slate-800 dark:text-slate-200'}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      {task.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Government ITI Aundh Academic Guidance Cell</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowRecoveryModal(false);
                  showToast('Recovery status saved!', 'success');
                }}
                className="bg-[#123B6D] hover:bg-[#0e2f57]"
              >
                Close & Save Progress
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
