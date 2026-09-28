'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Menu,
  User,
  Shield,
  GraduationCap,
  Building2,
  Search,
  Moon,
  Sun,
  Globe,
  LogOut,
  ChevronDown,
  HelpCircle,
  School,
  ExternalLink,
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { DistrictSelector } from './DistrictSelector';
import { NotificationBadge } from './NotificationBadge';
import { GlobalSearch } from './GlobalSearch';
import { CommandPalette } from './CommandPalette';
import { getBreadcrumbsForPath } from '@/lib/breadcrumbs';
import type { UserRole } from '@/types';

interface TopBarProps {
  role: UserRole;
  title?: string;
  subtitle?: string;
  onMenuClick: () => void;
  showDistrictSelector?: boolean;
}

const roleIcons: Record<UserRole, React.ReactNode> = {
  government: <Shield size={14} className="text-[#123B6D] dark:text-blue-400" />,
  trainee: <GraduationCap size={14} className="text-emerald-700 dark:text-emerald-400" />,
  employer: <Building2 size={14} className="text-amber-700 dark:text-amber-400" />,
  institution: <School size={14} className="text-purple-700 dark:text-purple-400" />,
};

export function TopBar({
  role,
  title,
  subtitle,
  onMenuClick,
  showDistrictSelector = true,
}: TopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbsForPath(pathname);
  const {
    user,
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    logout,
  } = useApp();

  const [searchOpen, setSearchOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 backdrop-blur-md transition-colors shadow-xs">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu toggle, Page title, Breadcrumb */}
          <div className="flex items-center gap-3 flex-1 min-w-0 py-1">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              {/* Only show breadcrumbs trail if we are inside a sub-route */}
              {breadcrumbs.length > 1 && (
                <div className="mb-0.5">
                  <Breadcrumb items={breadcrumbs} />
                </div>
              )}
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate leading-tight">
                  {title || user.title || 'DISHA Platform'}
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-[#123B6D] dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                  {language === 'mr'
                    ? (role === 'government' ? 'शासकीय कक्ष' : role === 'trainee' ? 'प्रशिक्षणार्थी कक्ष' : role === 'employer' ? 'नियोक्ता कक्ष' : 'संस्था कक्ष')
                    : `${role.toUpperCase()} DESK`}
                </span>
              </div>
              {subtitle && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate hidden md:block leading-tight mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right side Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Skill India Digital Style Quick Search Input */}
            <div 
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 cursor-pointer transition-colors w-52 lg:w-72 select-none"
              title="Search Portal (Ctrl+K)"
            >
              <Search size={14} className="text-slate-400 shrink-0" />
              <span className="truncate flex-1 text-slate-500">
                {language === 'mr' ? 'कौशल्ये, केंद्रे, योजना शोधा...' : 'Search Skills, Centres, Schemes...'}
              </span>
              <kbd className="shrink-0 text-[10px] font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400 whitespace-nowrap shadow-2xs">Ctrl K</kbd>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label="Global Search"
              title="Search Portal (Ctrl+K)"
            >
              <Search size={17} />
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle Dark/Light Mode"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun size={17} className="text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon size={17} className="text-[#123B6D] hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* District Selector (for government role) */}
            {showDistrictSelector && role === 'government' && (
              <div className="hidden xl:block">
                <DistrictSelector />
              </div>
            )}

            {/* Notification Badge */}
            <NotificationBadge role={role} />

            {/* Official Officer Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                aria-label="User profile menu"
              >
                <div className="w-7 h-7 rounded-full bg-[#123B6D]/15 dark:bg-blue-950 flex items-center justify-center text-[#123B6D] dark:text-blue-400 border border-[#123B6D]/20 dark:border-blue-800">
                  <User size={15} />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-200 leading-none">
                    {user.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize mt-0.5">
                    {language === 'mr' ? (role === 'government' ? 'शासकीय अधिकारी' : role === 'trainee' ? 'प्रशिक्षणार्थी' : role === 'employer' ? 'नियोक्ता' : 'संस्था') : role}
                  </p>
                </div>
                <ChevronDown size={13} className="text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 py-1.5 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-slate-700">
                    <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{user.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">{user.email}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/40 text-[#123B6D] dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                      {roleIcons[role]}
                      <span className="capitalize">
                        {language === 'mr' 
                          ? (role === 'government' ? 'शासकीय प्राधिकरण' : role === 'trainee' ? 'प्रशिक्षणार्थी प्राधिकरण' : role === 'employer' ? 'नियोक्ता प्राधिकरण' : 'संस्था प्राधिकरण')
                          : `${role} Authority`}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        router.push(`/${role}/profile`);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      <User size={14} className="text-slate-500" />
                      <span>{language === 'mr' ? 'माझे खाते व तपशील' : 'Account Profile'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        router.push(`/${role}/help`);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      <HelpCircle size={14} className="text-slate-500" />
                      <span>{language === 'mr' ? 'मदत व अधिकृत कार्यपद्धती (SOP)' : 'Help & Official SOPs'}</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-700">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-2.5 cursor-pointer font-medium"
                    >
                      <LogOut size={14} />
                      <span>{language === 'mr' ? 'पोर्टलमधून बाहेर पडा' : 'Sign Out of Portal'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} role={role} />
      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} role={role} />
    </>
  );
}
