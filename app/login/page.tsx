'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp, AUTHORIZED_ACCOUNTS } from '@/context/AppContext';
import { t } from '@/lib/translations';
import {
  Landmark,
  GraduationCap,
  Building2,
  School,
  Shield,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Globe,
  Clock,
  ExternalLink,
  Smartphone,
  Mail,
  Fingerprint,
  Info,
  PhoneCall,
  KeyRound,
  FileText
} from 'lucide-react';
import type { UserRole } from '@/types';

interface StakeholderTab {
  role: UserRole;
  labelEn: string;
  labelMr: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  accentColor: string;
  badge: string;
  authMethod: string;
  primaryPlaceholder: string;
  primaryLabel: string;
  hint: string;
}

const STAKEHOLDERS: StakeholderTab[] = [
  {
    role: 'government',
    labelEn: 'State Government',
    labelMr: 'शासकीय अधिकारी',
    icon: Landmark,
    accentColor: '#123B6D',
    badge: 'DVET Mantralaya • Level-1 Clearance',
    authMethod: 'Parichay SSO / Govmail ID',
    primaryPlaceholder: 'officer@disha.gov.in or MH-GOV-8941',
    primaryLabel: 'Officer Email / Employee ID / NIC Govmail',
    hint: 'Official credentials registered with Directorate of Vocational Education & Training, Mantralaya Mumbai.',
  },
  {
    role: 'trainee',
    labelEn: 'Learner / Trainee',
    labelMr: 'प्रशिक्षणार्थी / नागरिक',
    icon: GraduationCap,
    accentColor: '#059669',
    badge: 'NCVT Level-4 • Aadhaar e-KYC',
    authMethod: 'Aadhaar / Mobile OTP / Candidate ID',
    primaryPlaceholder: 'rahul.sharma@disha.gov.in or 9820012345',
    primaryLabel: 'Candidate Mobile / Aadhaar ID / Email',
    hint: 'Candidate roll number or DigiLocker linked phone registered during ITI or MSSDS enrollment.',
  },
  {
    role: 'employer',
    labelEn: 'Industry Employer',
    labelMr: 'नियोक्ता / उद्योग',
    icon: Building2,
    accentColor: '#D97706',
    badge: 'EPFO & GSTN Triangulated • Tier-1',
    authMethod: 'Corporate CIN / TAN / HR ID',
    primaryPlaceholder: 'hr@abcmfg.in or U29100MH2012PLC234567',
    primaryLabel: 'Corporate HR Email / MCA CIN / TAN',
    hint: 'Registered company email or Corporate Identity Number (CIN) verified with EPFO & GSTN.',
  },
  {
    role: 'institution',
    labelEn: 'Training Partner / ITI',
    labelMr: 'प्रशिक्षण संस्था / ITI',
    icon: School,
    accentColor: '#7C3AED',
    badge: 'DVET Affiliated • NCVT MIS Synced',
    authMethod: 'NCVT MIS Code / Institute ID',
    primaryPlaceholder: 'principal@apexiti.edu.in or PR27000142',
    primaryLabel: 'Principal Email / NCVT MIS Code',
    hint: 'Official institute code or Principal credentials authorized on the DGT/DVET portal.',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { loginWithCredentials, loginWithDemo, language, toggleLanguage, setLanguage, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('government');
  const [authMode, setAuthMode] = useState<'credentials' | 'sso_otp'>('credentials');
  const [identifier, setIdentifier] = useState(AUTHORIZED_ACCOUNTS.government.identifier);
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Security Captcha
  const [captchaNum1, setCaptchaNum1] = useState(7);
  const [captchaNum2, setCaptchaNum2] = useState(4);
  const [captchaInput, setCaptchaInput] = useState('');
  
  // States
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timeString, setTimeString] = useState('');

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) + ' | ' + now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Preselect role from URL if provided (e.g., /login?role=trainee)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role') as UserRole | null;
      if (roleParam && AUTHORIZED_ACCOUNTS[roleParam]) {
        setSelectedRole(roleParam);
        const demo = AUTHORIZED_ACCOUNTS[roleParam];
        setIdentifier(demo.identifier);
        setPassword(demo.password);
      }
    } catch {}
  }, []);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setCaptchaInput('');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    const demo = AUTHORIZED_ACCOUNTS[role];
    setIdentifier(demo.identifier);
    setPassword(demo.password);
    setAuthMode('credentials');
    generateCaptcha();
  };

  const handleQuickFillDemo = () => {
    const demo = AUTHORIZED_ACCOUNTS[selectedRole];
    setIdentifier(demo.identifier);
    setPassword(demo.password);
    setErrorMessage(null);
    showToast(`Loaded verified credentials for ${demo.name}. Enter captcha to authorize.`, 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Verify Captcha
    const expected = captchaNum1 + captchaNum2;
    if (parseInt(captchaInput.trim(), 10) !== expected) {
      setErrorMessage(`Security captcha verification failed. What is ${captchaNum1} + ${captchaNum2}? Please solve to proceed.`);
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = loginWithCredentials(selectedRole, identifier, password);
      if (!result.success) {
        setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotIdentifier) {
      showToast('Please enter your registered email or phone', 'warning');
      return;
    }
    setOtpSent(true);
    showToast(`Verification OTP dispatched to registered endpoint for ${forgotIdentifier}`, 'success');
  };

  const activeTabConfig = STAKEHOLDERS.find((s) => s.role === selectedRole)!;
  const currentDemo = AUTHORIZED_ACCOUNTS[selectedRole];

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4F8] text-slate-900 font-sans selection:bg-[#123B6D] selection:text-white">
      {/* 1. Indian National Tricolor Ribbon */}
      <div className="h-1.5 w-full flex sticky top-0 z-50">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* 2. Official Government Masthead Bar */}
      <header className="w-full bg-[#0D2F5B] text-white border-b border-slate-700/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* State Emblem & Dept */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Emblem of Maharashtra - Official Gov Logo */}
            <div className="w-10 h-10 shrink-0 bg-white rounded-full p-0.5 border border-amber-400/60 shadow-xs flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
              <Image
                src="/govlogo.png"
                alt="Government of Maharashtra Official Emblem"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300 text-xs tracking-wide">महाराष्ट्र शासन</span>
                <span className="text-slate-400 text-[10px]">|</span>
                <span className="font-bold text-white text-xs">Government of Maharashtra</span>
              </div>
              <p className="text-[11px] text-blue-200">
                Department of Skills, Employment, Entrepreneurship &amp; Innovation
              </p>
            </div>
          </Link>

          {/* Right Utilities */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-blue-200 font-mono text-[11px] bg-black/25 px-2.5 py-1 rounded border border-white/10">
              <Clock size={12} className="text-amber-400" />
              <span>{timeString || '28 Sep 2026 IST'}</span>
            </div>

            {/* Official MahaGov / Digital India Dual-Language Segmented Switcher */}
            <div className="flex items-center rounded-lg bg-black/40 border border-white/20 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  if (language !== 'en') {
                    setLanguage('en');
                    showToast('Switched to English', 'info');
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Switch platform to English"
              >
                <span>English</span>
              </button>
              <span className="text-white/20 text-[10px] px-0.5 select-none">|</span>
              <button
                type="button"
                onClick={() => {
                  if (language !== 'mr') {
                    setLanguage('mr');
                    showToast('भाषा मराठीमध्ये बदलली आहे', 'info');
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all cursor-pointer ${
                  language === 'mr'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="मराठी भाषेमध्ये बदला"
              >
                <span>मराठी</span>
              </button>
            </div>

            <Link
              href="/overview"
              className="text-xs font-semibold text-blue-200 hover:text-white transition-colors flex items-center gap-1 pl-2 border-l border-white/20"
            >
              <span>{language === 'mr' ? 'प्लॅटफॉर्म माहिती' : 'Platform Overview'}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Main Login Portal Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Official Context & Stakeholder Selection */}
          <div className="w-full md:w-5/12 bg-gradient-to-br from-[#0D2F5B] via-[#123B6D] to-[#0A2548] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background seal watermarking */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full border-8 border-white/5 pointer-events-none" />
            <div className="absolute -right-4 -bottom-4 w-48 h-48 rounded-full border-4 border-amber-400/10 pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold text-blue-200 mb-2">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>{language === 'mr' ? 'एनआयसी प्रमाणित सुरक्षित गेटवे' : 'NIC Certified Secure Gateway'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white p-0.5 border border-white/20 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 overflow-hidden">
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
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {language === 'mr' ? 'दिशा ' : 'DISHA '}<span className="text-amber-400">{language === 'mr' ? 'पोर्टल' : 'Portal'}</span>
                  </h1>
                </div>
                <p className="text-xs text-blue-100/90 mt-1 leading-relaxed">
                  {t('login.subtitle', language)}
                </p>
              </div>

              {/* Stakeholder Selector Vertical Tabs */}
              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  {t('login.selectRole', language)}
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {STAKEHOLDERS.map((stk) => {
                    const Icon = stk.icon;
                    const isSelected = selectedRole === stk.role;
                    return (
                      <button
                        key={stk.role}
                        type="button"
                        onClick={() => handleRoleSelect(stk.role)}
                        className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-white text-slate-900 border-amber-400 shadow-md scale-[1.02]'
                            : 'bg-white/10 hover:bg-white/15 text-white border-white/15 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-[#123B6D] text-white' : 'bg-white/15 text-blue-200'
                            }`}
                          >
                            <Icon size={17} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold leading-tight">
                                {language === 'mr' ? stk.labelMr : stk.labelEn}
                              </span>
                              {isSelected && (
                                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                              )}
                            </div>
                            <p
                              className={`text-[10px] truncate max-w-[160px] ${
                                isSelected ? 'text-slate-500 font-medium' : 'text-blue-200/80'
                              }`}
                            >
                              {stk.authMethod}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded capitalize ${
                            isSelected
                              ? 'bg-blue-100 text-[#123B6D]'
                              : 'bg-white/10 text-blue-200'
                          }`}
                        >
                          {stk.role}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Profile Info Box */}
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                  <span>{t('login.authorizedTestAccount', language)}</span>
                  <span className="text-[10px] font-mono text-emerald-300">● {t('login.active', language)}</span>
                </div>
                <p className="font-semibold text-white">{currentDemo.name}</p>
                <p className="text-[11px] text-blue-200 leading-tight">{currentDemo.title}</p>
                <p className="text-[10px] text-blue-300/80">{currentDemo.organization}</p>
              </div>
            </div>

            {/* Bottom Support Notice */}
            <div className="relative z-10 pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-blue-200">
              <span className="flex items-center gap-1">
                <PhoneCall size={12} className="text-amber-400" />
                <span>{t('login.helpline', language)}</span>
              </span>
              <span>{t('login.auditNotice', language)}</span>
            </div>
          </div>

          {/* Right Column: Authentication Form */}
          <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div className="space-y-5">
              {/* Header inside form */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {activeTabConfig.badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-1.5">
                    {language === 'mr' ? `${activeTabConfig.labelMr} प्रवेश` : `${activeTabConfig.labelEn} Login`}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{activeTabConfig.hint}</p>
                </div>

                {/* 1-Click Quick Demo Button */}
                <button
                  type="button"
                  onClick={handleQuickFillDemo}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="Automatically fills authorized demo credentials for this role"
                >
                  <Sparkles size={13} className="text-amber-600" />
                  <span>{t('login.fillDemo', language)}</span>
                </button>
              </div>

              {/* Authentication Mode Switcher */}
              <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAuthMode('credentials')}
                  className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === 'credentials'
                      ? 'bg-white text-[#123B6D] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lock size={13} />
                  <span>{t('login.officialCreds', language)}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('sso_otp');
                    showToast(
                      selectedRole === 'government'
                        ? 'Simulating MeriPehchan / Parichay National SSO Gateway'
                        : selectedRole === 'trainee'
                        ? 'Simulating Aadhaar / Mobile OTP Verification'
                        : selectedRole === 'employer'
                        ? 'Simulating EPFO / GSTN Corporate Est. Verification'
                        : 'Simulating NCVT MIS Terminal Sync',
                      'info'
                    );
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === 'sso_otp'
                      ? 'bg-white text-[#123B6D] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {selectedRole === 'government' ? (
                    <Shield size={13} />
                  ) : selectedRole === 'trainee' ? (
                    <Smartphone size={13} />
                  ) : selectedRole === 'employer' ? (
                    <FileText size={13} />
                  ) : (
                    <Fingerprint size={13} />
                  )}
                  <span>
                    {selectedRole === 'government'
                      ? 'Parichay SSO'
                      : selectedRole === 'trainee'
                      ? 'Mobile / OTP'
                      : selectedRole === 'employer'
                      ? 'CIN / GSTN'
                      : 'NCVT MIS'}
                  </span>
                </button>
              </div>

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-semibold">{errorMessage}</p>
                    <p className="text-[11px] text-red-600/80 mt-0.5">
                      Tip: Click &quot;Fill Demo&quot; button above to automatically populate verified test credentials.
                    </p>
                  </div>
                </div>
              )}

              {/* Main Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Identifier Field */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>{activeTabConfig.primaryLabel}</span>
                    <span className="text-[10px] text-slate-500 font-normal">Required</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      {selectedRole === 'trainee' ? <Smartphone size={15} /> : <Mail size={15} />}
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={activeTabConfig.primaryPlaceholder}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#123B6D] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password / Pin Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      {authMode === 'sso_otp' 
                        ? (language === 'mr' ? 'पडताळणी पिन / सुरक्षा की' : 'Verification PIN / Security Key')
                        : (language === 'mr' ? 'खाते पासवर्ड (संकेतशब्द)' : 'Account Password')}
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(true)}
                      className="text-[11px] text-[#123B6D] hover:underline font-semibold cursor-pointer"
                    >
                      {t('login.forgotPassword', language)}
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={15} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter authorized password (demo123)"
                      className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#123B6D] focus:border-transparent transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Security Captcha (Mandatory for Govt Portals) */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#123B6D]" />
                      <span>{t('login.securityVerification', language)}</span>
                    </span>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                      title="Reload Captcha"
                    >
                      <RefreshCw size={11} />
                      <span>{t('login.refresh', language)}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Math Captcha Badge */}
                    <div className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-mono font-black text-sm tracking-wider shadow-inner select-none border border-blue-950 flex items-center gap-1">
                      <span>{captchaNum1}</span>
                      <span>+</span>
                      <span>{captchaNum2}</span>
                      <span>=</span>
                      <span className="text-amber-400">?</span>
                    </div>

                    <input
                      type="text"
                      required
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder={language === 'mr' ? 'उत्तर' : 'Answer'}
                      className="flex-1 px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#123B6D] font-mono text-center"
                    />
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-[#123B6D] focus:ring-[#123B6D] cursor-pointer"
                    />
                    <span className="text-slate-600">{t('login.rememberTerminal', language)}</span>
                  </label>

                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>{t('login.sslEncrypted', language)}</span>
                  </span>
                </div>

                {/* Submit Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-[#123B6D] hover:bg-[#0D2F5B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" />
                        <span>{t('login.verifying', language)}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('login.authorizeAndSignIn', language)}</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Statutory Compliance Footer Notice */}
            <div className="pt-4 mt-4 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
              <p className="flex items-start gap-1 leading-tight">
                <Info size={11} className="shrink-0 mt-0.5 text-slate-400" />
                <span>
                  {language === 'mr' 
                    ? t('login.statutoryWarning', language)
                    : (
                      <>
                        <strong>Statutory Warning (IT Act 2000, Sec 43/66):</strong> Authorized access only.
                        All activities are logged with IP &amp; biometric telemetry for audit compliance.
                      </>
                    )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Forgot Password / OTP Reset Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#123B6D] flex items-center justify-center">
                  <KeyRound size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Credential Recovery</h3>
                  <p className="text-[10px] text-slate-500">Government of Maharashtra Self-Service Portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(false);
                  setOtpSent(false);
                }}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendOtp} className="pt-4 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your registered official email, mobile number, or employee ID. A secure verification OTP will be dispatched to your Aadhaar or Govmail address.
              </p>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Registered Endpoint / ID</label>
                <input
                  type="text"
                  required
                  value={forgotIdentifier}
                  onChange={(e) => setForgotIdentifier(e.target.value)}
                  placeholder="e.g. officer@disha.gov.in or 9820012345"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#123B6D]"
                />
              </div>

              {otpSent ? (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>OTP Dispatched Successfully!</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Use default verification OTP <code className="font-mono font-bold bg-white px-1 py-0.5 rounded border">894102</code> to authenticate on this terminal.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPassword('demo123');
                      setForgotModalOpen(false);
                      setOtpSent(false);
                      showToast('Security PIN verified and applied to login form', 'success');
                    }}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply Verified PIN to Login
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#123B6D] hover:bg-[#0D2F5B] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Dispatch Verification OTP
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 5. Official Portal Disclaimer Footer */}
      <footer className="w-full bg-[#0D2F5B] text-white text-[11px] py-4 border-t border-slate-700/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="space-y-0.5">
            <p className="font-bold text-white">
              DISHA • Maharashtra Skill Outcome Intelligence Platform
            </p>
            <p className="text-blue-200/80 text-[10px]">
              Designed, developed &amp; hosted by National Informatics Centre (NIC) for Government of Maharashtra.
            </p>
          </div>

          <div className="flex items-center gap-4 text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">Portal Home</Link>
            <span>•</span>
            <span className="text-slate-400">Security Policy</span>
            <span>•</span>
            <span className="text-slate-400">RTI Act</span>
            <span>•</span>
            <span className="text-amber-300 font-semibold">Toll Free: 1800-120-8040</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
