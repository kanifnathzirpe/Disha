'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Globe, Eye, ShieldCheck, ExternalLink, Calendar, Clock } from 'lucide-react';

import { t } from '@/lib/translations';

export function GovernmentMasthead() {
  const { language, setLanguage, toggleLanguage, showToast } = useApp();
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'larger'>('normal');
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const locale = language === 'mr' ? 'mr-IN' : 'en-IN';
      setTimeString(
        now.toLocaleDateString(locale, {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) + ' | ' + now.toLocaleTimeString(locale, {
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
  }, [language]);

  const handleFontChange = (scale: 'normal' | 'large' | 'larger') => {
    setFontScale(scale);
    if (scale === 'larger') {
      document.documentElement.style.fontSize = '17px';
      showToast(language === 'mr' ? 'फॉन्ट आकार मोठा केला (A+)' : 'Font scale set to Large (A+)', 'info');
    } else if (scale === 'large') {
      document.documentElement.style.fontSize = '15.5px';
      showToast(language === 'mr' ? 'फॉन्ट आकार मध्यम केला (A)' : 'Font scale set to Medium (A)', 'info');
    } else {
      document.documentElement.style.fontSize = '14px';
      showToast(language === 'mr' ? 'फॉन्ट आकार पूर्ववत केला (A-)' : 'Font scale reset to Standard (A-)', 'info');
    }
  };

  return (
    <div className="w-full bg-[#0b1e36] text-white border-b border-slate-700/80 text-xs">
      {/* 1. Indian National Tricolor Line */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* 2. Official Masthead Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Official Maharashtra State Identity */}
        <div className="flex items-center gap-3">
          {/* Emblem of Maharashtra - Official Gov Logo */}
          <div className="w-10 h-10 shrink-0 bg-white rounded-full p-0.5 border border-amber-400/60 shadow-xs flex items-center justify-center overflow-hidden">
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
              <span className="font-bold text-amber-300 text-xs tracking-wide">
                महाराष्ट्र शासन
              </span>
              <span className="text-slate-400 text-[10px]">|</span>
              <span className="font-semibold text-slate-100 text-xs">
                Government of Maharashtra
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              {language === 'mr'
                ? 'कौशल्य विकास, रोजगार, उद्योजकता व नाविन्यता विभाग • महाराष्ट्र शासन'
                : 'Department of Skills, Employment, Entrepreneurship & Innovation • Govt of Maharashtra'}
            </p>
          </div>
        </div>

        {/* Right: Accessibility & Official Portal Utilities */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px]">
          {/* Live Indian Standard Time */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300 font-mono text-[10px] bg-black/30 px-2.5 py-1 rounded border border-white/10">
            <Clock size={12} className="text-amber-400" />
            <span>{timeString || (language === 'mr' ? '२८ सप्टें २०२६' : '28 Sep 2026')}</span>
          </div>

          {/* Standard Govt Accessibility Controls (A- / A / A+) */}
          <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded border border-white/15">
            <span className="text-[10px] text-slate-300 mr-1 hidden sm:inline">
              {t('masthead.text', language)}
            </span>
            <button
              onClick={() => handleFontChange('normal')}
              className={`px-1 rounded font-bold text-[10px] ${fontScale === 'normal' ? 'bg-amber-400 text-slate-900' : 'text-slate-200 hover:text-white'}`}
              title="Standard Font Size"
            >
              A-
            </button>
            <button
              onClick={() => handleFontChange('large')}
              className={`px-1 rounded font-bold text-[11px] ${fontScale === 'large' ? 'bg-amber-400 text-slate-900' : 'text-slate-200 hover:text-white'}`}
              title="Medium Font Size"
            >
              A
            </button>
            <button
              onClick={() => handleFontChange('larger')}
              className={`px-1 rounded font-bold text-[12px] ${fontScale === 'larger' ? 'bg-amber-400 text-slate-900' : 'text-slate-200 hover:text-white'}`}
              title="Large Font Size"
            >
              A+
            </button>
          </div>

          {/* Official MahaGov / Digital India Dual-Language Segmented Switcher */}
          <div className="flex items-center rounded-lg bg-black/40 border border-white/20 p-0.5 text-[11px] font-semibold">
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
              title="Switch to English"
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

          {/* Official Affiliation Badges */}
          <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-slate-700 text-[10px] text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>{t('masthead.digilocker', language)}</span>
            </span>
            <span className="text-slate-500">•</span>
            <span>{t('masthead.verified', language)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
