'use client';

import React, { useState } from 'react';
import { Sidebar, TopBar } from '@/components/navigation';
import { GovernmentMasthead } from '@/components/navigation/GovernmentMasthead';
import { GovernmentFooter } from '@/components/navigation/GovernmentFooter';
import { LiveTelemetryTicker } from '@/components/common/LiveTelemetryTicker';
import { AIAssistantWidget } from '@/components/common/AIAssistantWidget';
import type { UserRole } from '@/types';

interface DashboardLayoutProps {
  role: UserRole;
  title?: string;
  subtitle?: string;
  showDistrictSelector?: boolean;
  children: React.ReactNode;
}

export function DashboardLayout({ role, title, subtitle, showDistrictSelector, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex-col">
      {/* 1. Official Government of Maharashtra Masthead */}
      <GovernmentMasthead />

      {/* 2. Main Portal Shell (Sidebar + Workspace) */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
          {/* Real-time State Telemetry Ticker */}
          <LiveTelemetryTicker />

          {/* TopBar with Breadcrumbs and Streamlined Controls */}
          <TopBar 
            role={role} 
            title={title} 
            subtitle={subtitle} 
            onMenuClick={() => setSidebarOpen(true)}
            showDistrictSelector={showDistrictSelector}
          />

          {/* Main Content Workspace with Government Footer */}
          <div className="flex-1 overflow-y-auto flex flex-col justify-between" id="main-content" tabIndex={-1}>
            <main className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto w-full">
              {children}
            </main>

            {/* Official Government of Maharashtra & NIC Footer */}
            <GovernmentFooter />
          </div>

          {/* Global Interactive AI Assistant Widget */}
          <AIAssistantWidget />
        </div>
      </div>
    </div>
  );
}
