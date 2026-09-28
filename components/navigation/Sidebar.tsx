'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { X, ChevronDown, ChevronUp, Sparkles, Shield } from 'lucide-react';
import type { UserRole } from '@/types';
import type { NavItem, NavGroup } from '@/lib/navigation-config';
import { getNavigationForRole } from '@/lib/navigation-config';

interface SidebarProps {
  role: UserRole;
  open: boolean;
  onClose: () => void;
}

function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return 'items' in item;
}

export function Sidebar({ role, open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { language } = useApp();
  const isMr = language === 'mr';
  const { mainNav, bottomNav, roleLabel, roleLabelMr, roleName, roleNameMr } = getNavigationForRole(role);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupLabel: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupLabel]: !prev[groupLabel]
    }));
  };

  const renderNavItem = (link: NavItem, isNested = false) => {
    const isActive = pathname === link.href || (link.href !== `/${role}` && pathname.startsWith(link.href));
    const labelText = isMr ? link.labelMr || link.label : link.label;

    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={onClose}
        className={cn(
          'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-blue-400',
          isNested ? 'ml-3 text-[11px] py-2' : '',
          isActive
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 font-bold'
            : 'text-slate-300 hover:bg-white/10 hover:text-white hover:translate-x-1',
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {isActive && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-white rounded-r-full" />
        )}
        <span className={cn('transition-transform duration-200 group-hover:scale-110', isActive ? 'text-white' : 'text-blue-300')}>
          {link.icon}
        </span>
        <span className="truncate">{labelText}</span>
        {link.badge && (
          <span className={cn(
            'ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs',
            isActive ? 'bg-white text-blue-700' : 'bg-blue-500/80 text-white'
          )}>
            {link.badge}
          </span>
        )}
      </Link>
    );
  };

  const renderNavGroup = (group: NavGroup) => {
    const isCollapsed = collapsedGroups[group.label];
    const hasActiveItem = group.items.some(item => 
      pathname === item.href || (item.href !== `/${role}` && pathname.startsWith(item.href))
    );
    const groupText = isMr ? group.labelMr || group.label : group.label;

    return (
      <div key={group.label} className="pt-2">
        <button
          onClick={() => toggleGroup(group.label)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-1.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer',
            hasActiveItem && !isCollapsed ? 'text-blue-200' : ''
          )}
        >
          <span>{groupText}</span>
          {isCollapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
        </button>
        {!isCollapsed && (
          <div className="mt-1 space-y-1">
            {group.items.map(item => renderNavItem(item, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-gradient-to-b from-[#091526] via-[#0d1e36] to-[#060e1a] text-white flex flex-col border-r border-slate-800/80 shadow-2xl transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          'w-64',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo area with Maharashtra State Insignia styling */}
        <div className="flex items-center justify-between px-4 lg:px-5 py-4 border-b border-slate-800/80 bg-black/20">
          <Link href={`/${role}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 border border-slate-700/50 shadow-md shadow-blue-500/10 flex items-center justify-center shrink-0 group-hover:border-blue-400/60 group-hover:scale-105 transition-all overflow-hidden">
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
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-wide font-display text-white group-hover:text-blue-200 transition-colors">DISHA</span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-blue-500/30 text-blue-300 border border-blue-400/30 rounded">MH</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                {isMr ? 'कौशल्य निकाल बुद्धिमत्ता' : 'Skill Outcome Intelligence'}
              </p>
            </div>
          </Link>
          <button 
            onClick={onClose} 
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Role Badge Card */}
        <div className="px-4 py-3 bg-gradient-to-r from-blue-950/40 to-indigo-950/30 border-b border-slate-800/60 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
            <Shield size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {isMr ? roleNameMr || roleName : roleName}
            </p>
            <p className="text-[10px] text-blue-300/80 font-medium truncate">
              {isMr ? roleLabelMr || roleLabel : roleLabel}
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 no-scrollbar">
          {mainNav.map(item =>
            isNavGroup(item) ? renderNavGroup(item) : renderNavItem(item)
          )}
        </nav>

        {/* Bottom navigation */}
        <div className="p-3 border-t border-slate-800/80 bg-black/20 space-y-1">
          {bottomNav.map(link => {
            const labelText = isMr ? link.labelMr || link.label : link.label;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <span className="text-slate-400">{link.icon}</span>
                <span>{labelText}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
