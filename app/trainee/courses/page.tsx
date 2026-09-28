'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout';
import { Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import {
  Search,
  BookOpen,
  Clock,
  Users,
  Star,
  Award,
  GraduationCap,
  MapPin,
  Building2,
  Filter,
  ArrowRight,
  CheckCircle,
  Bookmark,
  TrendingUp,
  Share2,
  ChevronDown,
  ChevronUp,
  Globe,
  Zap,
  CheckSquare,
  Square,
  ArrowLeft,
  Sparkles,
  Layers,
  Calendar
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  council: string;
  category: string;
  language: string;
  duration: string;
  credits: string;
  rating: number;
  reviewsCount: number;
  type: 'Online' | 'Classroom' | 'Hybrid';
  pricing: 'Govt Sponsored' | 'Free' | 'Subsidy Aligned';
  gradient: string;
  accentColor: string;
  skills: string[];
  initiative: string;
  applied?: boolean;
}

const COURSES: Course[] = [
  {
    id: 'CRS-01',
    title: 'Livestock Green Management Promoter',
    council: 'Agriculture Skill Council of India',
    category: 'Agriculture',
    language: 'Marathi & English',
    duration: '3 Hours',
    credits: 'NSQF Level 4',
    rating: 5.0,
    reviewsCount: 14,
    type: 'Online',
    pricing: 'Govt Sponsored',
    gradient: 'from-emerald-700 via-teal-800 to-slate-900',
    accentColor: '#059669',
    skills: ['Fodder Preservation', 'Biogas Recycling', 'Green Farm Compliance'],
    initiative: 'PMKVY 4.0',
  },
  {
    id: 'CRS-02',
    title: 'Fundamentals of On-Farm Strategies to Mitigate Climate Risks',
    council: 'Agriculture Skill Council of India',
    category: 'Agriculture',
    language: 'English',
    duration: '2 Hours',
    credits: 'NSQF Level 3',
    rating: 4.9,
    reviewsCount: 22,
    type: 'Online',
    pricing: 'Free',
    gradient: 'from-amber-700 via-emerald-800 to-slate-900',
    accentColor: '#D97706',
    skills: ['Micro-Irrigation', 'Soil Carbon Metrics', 'Weather Advisory Systems'],
    initiative: 'Pramod Mahajan Scheme',
  },
  {
    id: 'CRS-03',
    title: 'Solar Pump Installation & Grid Technician',
    council: 'Skill Council for Green Jobs (SCGJ)',
    category: 'Agriculture',
    language: 'Marathi & Hindi',
    duration: '1 Hour',
    credits: 'NSQF Level 4',
    rating: 4.8,
    reviewsCount: 68,
    type: 'Online',
    pricing: 'Govt Sponsored',
    gradient: 'from-sky-700 via-blue-800 to-slate-900',
    accentColor: '#0284C7',
    skills: ['Solar PV Arrays', 'Submersible Pump Wiring', 'Inverter Telemetry'],
    initiative: 'KUSUM Solar Scheme',
  },
  {
    id: 'CRS-04',
    title: 'Precision Drone Agriculture Operator & Spraying Specialist',
    council: 'Aerospace & Aviation Sector Skill Council',
    category: 'Agriculture',
    language: 'English',
    duration: '4 Hours',
    credits: 'DGCA Certified • Level 4',
    rating: 4.9,
    reviewsCount: 89,
    type: 'Online',
    pricing: 'Govt Sponsored',
    gradient: 'from-indigo-700 via-purple-800 to-slate-900',
    accentColor: '#6366F1',
    skills: ['DGCA Drone Pilotage', 'Geo-Fencing', 'Pesticide Payload Calibration'],
    initiative: 'PMKVY 4.0',
  },
  {
    id: 'CRS-05',
    title: 'Advanced CNC Turning & Multi-Axis Machining',
    council: 'Capital Goods Skill Council (CGSC)',
    category: 'Manufacturing',
    language: 'Marathi & English',
    duration: '6 Months',
    credits: 'NCVT Level 5',
    rating: 4.7,
    reviewsCount: 142,
    type: 'Classroom',
    pricing: 'Govt Sponsored',
    gradient: 'from-blue-700 via-slate-800 to-slate-900',
    accentColor: '#123B6D',
    skills: ['G-Code Programming', 'CAM Automation', 'Tolerance Metrology'],
    initiative: 'DVET Craftsmen Training',
  },
  {
    id: 'CRS-06',
    title: 'EV Diagnostics, BMS Calibration & Pack Assembly',
    council: 'Automotive Skills Development Council (ASDC)',
    category: 'Automotive',
    language: 'English',
    duration: '5 Months',
    credits: 'ASDC Certified • Level 5',
    rating: 4.9,
    reviewsCount: 110,
    type: 'Hybrid',
    pricing: 'Subsidy Aligned',
    gradient: 'from-teal-700 via-cyan-900 to-slate-900',
    accentColor: '#0D9488',
    skills: ['CAN Bus Diagnostics', 'Lithium Pack Balancing', 'High-Voltage Safety'],
    initiative: 'Maharashtra EV Policy',
  },
  {
    id: 'CRS-07',
    title: 'Grain Silo Operations & Post-Harvest Storage Technology',
    council: 'Agriculture Skill Council of India',
    category: 'Agriculture',
    language: 'Marathi & Hindi',
    duration: '3 Hours',
    credits: 'NSQF Level 4',
    rating: 4.6,
    reviewsCount: 31,
    type: 'Online',
    pricing: 'Free',
    gradient: 'from-amber-800 via-yellow-900 to-slate-900',
    accentColor: '#B45309',
    skills: ['Moisture Telemetry', 'Fumigation Protocols', 'Supply Logistics'],
    initiative: 'Pramod Mahajan Scheme',
  },
  {
    id: 'CRS-08',
    title: 'Industrial PLC, SCADA & Robotics Automation',
    council: 'Instrumentation Automation Surveillance SSC',
    category: 'Automation',
    language: 'English',
    duration: '4 Months',
    credits: 'Siemens Aligned • Level 5',
    rating: 4.8,
    reviewsCount: 76,
    type: 'Hybrid',
    pricing: 'Govt Sponsored',
    gradient: 'from-violet-700 via-purple-900 to-slate-900',
    accentColor: '#7C3AED',
    skills: ['Ladder Logic', 'Wonderware SCADA', 'Robotic Arm Teaching'],
    initiative: 'STRIVE World Bank',
  },
];

export default function TraineeCourseCatalogPage() {
  const { showToast, applyToJob } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>(['All']);
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedInitiative, setSelectedInitiative] = useState('All');
  const [appliedList, setAppliedList] = useState<string[]>(['CRS-01']);

  // Accordion open/close states
  const [langOpen, setLangOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [typeOpen, setTypeOpen] = useState(true);
  const [initiativeOpen, setInitiativeOpen] = useState(true);

  const toggleLanguageFilter = (lang: string) => {
    if (lang === 'All') {
      setSelectedLanguage(['All']);
      return;
    }
    setSelectedLanguage((prev) => {
      const filtered = prev.filter((l) => l !== 'All');
      if (filtered.includes(lang)) {
        const next = filtered.filter((l) => l !== lang);
        return next.length === 0 ? ['All'] : next;
      } else {
        return [...filtered, lang];
      }
    });
  };

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.council.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesType = selectedType === 'All' || course.type === selectedType;
    const matchesInitiative = selectedInitiative === 'All' || course.initiative === selectedInitiative;

    const matchesLang =
      selectedLanguage.includes('All') ||
      selectedLanguage.some((l) => course.language.toLowerCase().includes(l.toLowerCase()));

    return matchesSearch && matchesCategory && matchesType && matchesInitiative && matchesLang;
  });

  const handleApply = (course: Course) => {
    if (appliedList.includes(course.id)) {
      showToast(`Already enrolled in "${course.title}". Check your Active Batches.`, 'info');
      return;
    }
    setAppliedList((prev) => [...prev, course.id]);
    showToast(`Application successfully submitted for "${course.title}". Digital enrollment badge issued!`, 'success');
  };

  return (
    <DashboardLayout
      role="trainee"
      title="Skill & Vocational Courses"
      subtitle="National Skill India & Government of Maharashtra Certified Technical Programs"
    >
      <div className="space-y-4">
        {/* 1. Skill India Breadcrumb & Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Link href="/trainee" className="hover:text-[#123B6D] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-400">Skill Courses</span>
            <span>/</span>
            <span className="font-bold text-[#123B6D] dark:text-blue-400">Technical &amp; Vocational Courses</span>
          </div>

          <Link
            href="/trainee"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#123B6D] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* 2. Hero Header with Official Count Badge */}
        <div className="space-y-1.5 pt-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Skill &amp; Vocational Courses
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-bold text-xs">
              {COURSES.length} Certified Courses
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
            The Maharashtra vocational ecosystem is poised for rapid high-wage transformation across agriculture, automated manufacturing, and clean mobility. Explore calibrated programs recognized by the Ministry of Skill Development &amp; Entrepreneurship (MSDE) and MSSDS.
          </p>
        </div>

        {/* 3. Main Two-Column Layout (Matching Skill India Digital SIDH Image 2) */}
        <div className="flex flex-col lg:flex-row gap-6 pt-3">
          
          {/* ========================================================
              LEFT SIDEBAR: FILTER ACCORDION DRAWER
              ======================================================== */}
          <aside className="w-full lg:w-72 shrink-0 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-5">
              
              {/* Filter Search Input */}
              <div className="space-y-1.5">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Skill Courses"
                    className="w-full pl-3 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]"
                  />
                  <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Accordion 1: Language */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={() => setLangOpen(!langOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 mb-2 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Globe size={14} className="text-[#123B6D]" />
                    <span>Language</span>
                  </span>
                  {langOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {langOpen && (
                  <div className="space-y-1.5 pl-1 pt-1 text-xs text-slate-600 dark:text-slate-300">
                    {['All', 'Marathi', 'English', 'Hindi', 'Gujarati'].map((lang) => {
                      const isChecked = selectedLanguage.includes(lang);
                      return (
                        <label
                          key={lang}
                          onClick={() => toggleLanguageFilter(lang)}
                          className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                        >
                          {isChecked ? (
                            <CheckSquare size={14} className="text-[#123B6D]" />
                          ) : (
                            <Square size={14} className="text-slate-400" />
                          )}
                          <span>{lang === 'All' ? 'All Languages' : lang}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion 2: Learning Product Type */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={() => setTypeOpen(!typeOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 mb-2 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers size={14} className="text-[#123B6D]" />
                    <span>Learning Product Type</span>
                  </span>
                  {typeOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {typeOpen && (
                  <div className="space-y-1.5 pl-1 pt-1 text-xs text-slate-600 dark:text-slate-300">
                    {['All', 'Online', 'Classroom', 'Hybrid'].map((t) => (
                      <label
                        key={t}
                        onClick={() => setSelectedType(t)}
                        className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                      >
                        {selectedType === t ? (
                          <CheckSquare size={14} className="text-[#123B6D]" />
                        ) : (
                          <Square size={14} className="text-slate-400" />
                        )}
                        <span>{t === 'All' ? 'All Modes' : `${t} Training`}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 3: Domain / Sector */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={() => setDurationOpen(!durationOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 mb-2 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} className="text-[#123B6D]" />
                    <span>Sector &amp; Domain</span>
                  </span>
                  {durationOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {durationOpen && (
                  <div className="space-y-1.5 pl-1 pt-1 text-xs text-slate-600 dark:text-slate-300">
                    {['All', 'Agriculture', 'Manufacturing', 'Automotive', 'Automation'].map((cat) => (
                      <label
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                      >
                        {selectedCategory === cat ? (
                          <CheckSquare size={14} className="text-[#123B6D]" />
                        ) : (
                          <Square size={14} className="text-slate-400" />
                        )}
                        <span>{cat === 'All' ? 'All Sectors' : cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Initiative / Program By */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={() => setInitiativeOpen(!initiativeOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 mb-2 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Award size={14} className="text-[#123B6D]" />
                    <span>Program / Initiative</span>
                  </span>
                  {initiativeOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {initiativeOpen && (
                  <div className="space-y-1.5 pl-1 pt-1 text-xs text-slate-600 dark:text-slate-300">
                    {[
                      { id: 'All', label: 'All Government Schemes' },
                      { id: 'PMKVY 4.0', label: 'PMKVY 4.0' },
                      { id: 'Pramod Mahajan Scheme', label: 'Pramod Mahajan Scheme' },
                      { id: 'DVET Craftsmen Training', label: 'DVET ITI Apprenticeship' },
                    ].map((item) => (
                      <label
                        key={item.id}
                        onClick={() => setSelectedInitiative(item.id)}
                        className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                      >
                        {selectedInitiative === item.id ? (
                          <CheckSquare size={14} className="text-[#123B6D]" />
                        ) : (
                          <Square size={14} className="text-slate-400" />
                        )}
                        <span className="truncate">{item.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset Filters Action */}
              {(searchQuery || selectedCategory !== 'All' || !selectedLanguage.includes('All') || selectedType !== 'All') && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedLanguage(['All']);
                      setSelectedType('All');
                      setSelectedInitiative('All');
                    }}
                    className="w-full py-1.5 text-xs text-red-600 font-semibold hover:underline text-center cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* ========================================================
              RIGHT AREA: SKILL INDIA DIGITAL COURSE GRID (IMAGE 2)
              ======================================================== */}
          <main className="flex-1 space-y-4">
            
            {/* Catalog Subheader Bar */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <BookOpen size={16} className="text-[#123B6D] dark:text-blue-400" />
                <span>Certified Courses ({filteredCourses.length})</span>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <span className="hidden sm:inline">Sort:</span>
                <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-700 dark:text-slate-200">
                  <option>Most Relevant</option>
                  <option>Highest Rated</option>
                  <option>Duration: Shortest</option>
                </select>
              </div>
            </div>

            {/* Course Cards Grid (Matching Skill India Digital Card Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCourses.map((c) => {
                const isEnrolled = appliedList.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Visual Graphic Banner */}
                      <div className={`relative h-36 bg-gradient-to-br ${c.gradient} p-3 flex flex-col justify-between text-white overflow-hidden`}>
                        {/* Decorative watermark */}
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border-4 border-white/10 pointer-events-none" />
                        
                        {/* Badges Row */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                            {c.type}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-xs">
                            {c.pricing}
                          </span>
                        </div>

                        {/* Banner Category Tag */}
                        <div className="relative z-10">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                            {c.initiative}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 space-y-2.5">
                        {/* Course Title */}
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-[#123B6D] dark:group-hover:text-blue-400 transition-colors">
                          {c.title}
                        </h3>

                        {/* Skill Council / Authority */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="truncate max-w-[200px]">{c.council}</span>
                          <button
                            type="button"
                            onClick={() => showToast(`Share link copied for ${c.title}`, 'info')}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
                            title="Share Course"
                          >
                            <Share2 size={13} />
                          </button>
                        </div>

                        {/* Domain Category Pill */}
                        <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                          {c.category}
                        </div>

                        {/* Metadata Rows (Exact Skill India Digital Layout) */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Globe size={12} className="text-slate-400" />
                              <span>{c.language}</span>
                            </span>
                            <span className="flex items-center gap-1 font-medium">
                              <Clock size={12} className="text-slate-400" />
                              <span>{c.duration}</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-[#123B6D] dark:text-blue-400 font-semibold">
                              <Zap size={12} className="text-amber-500" />
                              <span>{c.credits}</span>
                            </span>
                            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
                              <Star size={12} className="text-amber-500 fill-amber-500" />
                              <span>{c.rating.toFixed(1)}</span>
                              <span className="text-[10px] text-slate-400">({c.reviewsCount})</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="p-4 pt-0">
                      <button
                        type="button"
                        onClick={() => handleApply(c)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isEnrolled
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-[#123B6D] hover:text-white text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <span>{isEnrolled ? 'Enrolled & Verified' : 'Apply Now'}</span>
                        {isEnrolled ? (
                          <CheckCircle size={14} className="text-emerald-600" />
                        ) : (
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
