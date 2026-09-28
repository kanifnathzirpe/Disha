'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { formatNumber } from '@/lib/utils';
import { 
  AlertTriangle, 
  MapPin, 
  Target, 
  ArrowRight,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  TrendingDown,
  ShieldAlert,
  Users
} from 'lucide-react';

interface Alert {
  id: string;
  category: 'critical' | 'high' | 'warning' | 'info';
  title: string;
  description: string;
  district: string;
  program?: string;
  affectedTrainees?: number;
  timeAgo: string;
  recommendedAction: string;
}

export default function AlertsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'critical' | 'high' | 'warning' | 'info'>('all');

  const alerts: Alert[] = [
    {
      id: 'ALT-001',
      category: 'critical',
      title: 'EV Diagnostics shortage in Pune',
      description: 'Critical skill gap detected with 64% shortage in EV Diagnostics skill. Current training capacity insufficient to meet employer demand.',
      district: 'Pune',
      program: 'EV Diagnostics Training',
      affectedTrainees: 2400,
      timeAgo: '2 hours ago',
      recommendedAction: 'Increase training capacity by 2,500 seats immediately',
    },
    {
      id: 'ALT-002',
      category: 'high',
      title: 'Welding program 180D retention below target',
      description: 'Welding program in Nashik showing 180D retention rate of 58%, below the target of 70%. Wage misalignment suspected.',
      district: 'Nashik',
      program: 'Welding Specialist Program',
      affectedTrainees: 320,
      timeAgo: '5 hours ago',
      recommendedAction: 'Review wage alignment and improve employer partnerships',
    },
    {
      id: 'ALT-003',
      category: 'warning',
      title: 'Provider XYZ placement rate dropped 11%',
      description: 'Skill Development Center Nashik placement rate dropped from 74% to 63% in the last quarter. Quality concern.',
      district: 'Nashik',
      program: 'Multiple Programs',
      affectedTrainees: 890,
      timeAgo: '1 day ago',
      recommendedAction: 'Conduct quality audit and provider review',
    },
    {
      id: 'ALT-004',
      category: 'warning',
      title: '4,200 trainees have no employment update',
      description: 'Trainees certified in the last 90 days have no employment status update. Risk of data quality issues.',
      district: 'State-wide',
      affectedTrainees: 4200,
      timeAgo: '2 days ago',
      recommendedAction: 'Initiate employment status verification campaign',
    },
    {
      id: 'ALT-005',
      category: 'info',
      title: 'Industrial Automation demand increased 27%',
      description: 'Industrial Automation skill demand has increased by 27% in the last quarter across Pune and Nagpur districts.',
      district: 'Pune, Nagpur',
      timeAgo: '3 days ago',
      recommendedAction: 'Monitor trend and consider capacity expansion',
    },
    {
      id: 'ALT-006',
      category: 'high',
      title: 'Retention drop in IT sector programs',
      description: 'IT sector programs showing 15% drop in 90D retention rates in Mumbai district. Industry shifts detected.',
      district: 'Mumbai',
      program: 'Full Stack Development',
      affectedTrainees: 450,
      timeAgo: '4 days ago',
      recommendedAction: 'Review curriculum alignment with industry requirements',
    },
    {
      id: 'ALT-007',
      category: 'critical',
      title: 'Solar Installation capacity exhausted',
      description: 'All Solar Installation training centers at maximum capacity. Demand exceeding supply by 40%.',
      district: 'Nashik',
      program: 'Solar Technician',
      affectedTrainees: 580,
      timeAgo: '5 days ago',
      recommendedAction: 'Immediate capacity expansion required',
    },
  ];

  const filteredAlerts = selectedCategory === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.category === selectedCategory);

  const categoryCounts = {
    critical: alerts.filter(a => a.category === 'critical').length,
    high: alerts.filter(a => a.category === 'high').length,
    warning: alerts.filter(a => a.category === 'warning').length,
    info: alerts.filter(a => a.category === 'info').length,
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'critical': return <ShieldAlert size={16} />;
      case 'high': return <AlertTriangle size={16} />;
      case 'warning': return <Clock size={16} />;
      case 'info': return <Info size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  return (
    <DashboardLayout 
      role="government" 
      title="Alerts & Exceptions" 
      subtitle="Real-time monitoring of critical issues and exceptions"
      showDistrictSelector={false}
    >
      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-brand-600 text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          All ({alerts.length})
        </button>
        <button
          onClick={() => setSelectedCategory('critical')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === 'critical'
              ? 'bg-status-error text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          Critical ({categoryCounts.critical})
        </button>
        <button
          onClick={() => setSelectedCategory('high')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === 'high'
              ? 'bg-status-warning text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          High ({categoryCounts.high})
        </button>
        <button
          onClick={() => setSelectedCategory('warning')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === 'warning'
              ? 'bg-brand-500 text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          Warning ({categoryCounts.warning})
        </button>
        <button
          onClick={() => setSelectedCategory('info')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === 'info'
              ? 'bg-status-info text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          Info ({categoryCounts.info})
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Alerts</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <AlertTriangle size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{alerts.length}</p>
          <p className="text-xs text-text-tertiary mt-1">Active alerts</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Critical</span>
            <div className="w-8 h-8 rounded-lg bg-status-error-bg flex items-center justify-center">
              <ShieldAlert size={16} className="text-status-error" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-error">{categoryCounts.critical}</p>
          <p className="text-xs text-text-tertiary mt-1">Immediate action required</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Affected Trainees</span>
            <div className="w-8 h-8 rounded-lg bg-status-warning-bg flex items-center justify-center">
              <Users size={16} className="text-status-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-warning">
            {formatNumber(alerts.reduce((sum, a) => sum + (a.affectedTrainees || 0), 0))}
          </p>
          <p className="text-xs text-text-tertiary mt-1">Trainees impacted</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Districts Affected</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <MapPin size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">
            {new Set(alerts.map(a => a.district)).size}
          </p>
          <p className="text-xs text-text-tertiary mt-1">Districts with alerts</p>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} padding="md" className="hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  alert.category === 'critical' ? 'bg-status-error-bg' :
                  alert.category === 'high' ? 'bg-status-warning-bg' :
                  alert.category === 'warning' ? 'bg-brand-50' :
                  'bg-status-info-bg'
                }`}>
                  <div className={
                    alert.category === 'critical' ? 'text-status-error' :
                    alert.category === 'high' ? 'text-status-warning' :
                    alert.category === 'warning' ? 'text-brand-500' :
                    'text-status-info'
                  }>
                    {getCategoryIcon(alert.category)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant={alert.category === 'critical' ? 'error' : alert.category === 'high' ? 'warning' : 'info'} 
                      size="sm"
                    >
                      {alert.category.toUpperCase()}
                    </Badge>
                    <h3 className="text-sm font-semibold text-text-primary">{alert.title}</h3>
                  </div>
                  <p className="text-xs text-text-secondary">{alert.timeAgo}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Investigate
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-3">{alert.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary mb-3">
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {alert.district}
              </span>
              {alert.program && (
                <span className="flex items-center gap-1">
                  <Building2 size={12} />
                  {alert.program}
                </span>
              )}
              {alert.affectedTrainees && (
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {formatNumber(alert.affectedTrainees)} affected
                </span>
              )}
            </div>

            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex items-start gap-2">
                <Target size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-brand-700">Recommended Action</p>
                  <p className="text-xs text-brand-600">{alert.recommendedAction}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
