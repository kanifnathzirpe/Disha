'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, Drawer, Modal } from '@/components/ui';
import { skillGapsData, demandSupplyTrend } from '@/data/mockSkillGaps';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { 
  TrendingUp, 
  MapPin, 
  Target, 
  ArrowRight,
  Building2,
  Users,
  Briefcase,
  IndianRupee,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function SkillDetailPage() {
  const params = useParams();
  const skillId = params.skill as string;
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);

  const skillData = skillGapsData.find(s => s.id === skillId);

  if (!skillData) {
    return (
      <DashboardLayout 
        role="government" 
        title="Skill Not Found" 
        showDistrictSelector={false}
      >
        <Card padding="md">
          <p className="text-text-secondary">Skill not found. Please return to the skill intelligence page.</p>
          <Button variant="primary" className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Card>
      </DashboardLayout>
    );
  }

  const forecastData = [
    { month: 'Oct 2026', currentDemand: skillData.demand, projectedDemand: Math.round(skillData.demand * 1.05), currentSupply: skillData.supply, projectedSupply: Math.round(skillData.supply * 1.1) },
    { month: 'Nov 2026', currentDemand: Math.round(skillData.demand * 1.08), projectedDemand: Math.round(skillData.demand * 1.12), currentSupply: Math.round(skillData.supply * 1.12), projectedSupply: Math.round(skillData.supply * 1.18) },
    { month: 'Dec 2026', currentDemand: Math.round(skillData.demand * 1.12), projectedDemand: Math.round(skillData.demand * 1.18), currentSupply: Math.round(skillData.supply * 1.18), projectedSupply: Math.round(skillData.supply * 1.25) },
    { month: 'Jan 2027', currentDemand: Math.round(skillData.demand * 1.15), projectedDemand: Math.round(skillData.demand * 1.22), currentSupply: Math.round(skillData.supply * 1.22), projectedSupply: Math.round(skillData.supply * 1.30) },
    { month: 'Feb 2027', currentDemand: Math.round(skillData.demand * 1.18), projectedDemand: Math.round(skillData.demand * 1.26), currentSupply: Math.round(skillData.supply * 1.26), projectedSupply: Math.round(skillData.supply * 1.35) },
    { month: 'Mar 2027', currentDemand: Math.round(skillData.demand * 1.20), projectedDemand: Math.round(skillData.demand * 1.30), currentSupply: Math.round(skillData.supply * 1.30), projectedSupply: Math.round(skillData.supply * 1.40) },
  ];

  const topEmployers = [
    { name: 'Tata Motors', district: 'Pune', demand: 450, hiring: 'Active' },
    { name: 'Mahindra & Mahindra', district: 'Nashik', demand: 380, hiring: 'Active' },
    { name: 'Bajaj Auto', district: 'Pune', demand: 320, hiring: 'Active' },
    { name: 'Force Motors', district: 'Pune', demand: 280, hiring: 'Planning' },
  ];

  const trainingPrograms = [
    { name: 'EV Diagnostics Certification', provider: 'ITI Pune', capacity: 500, enrolled: 480, status: 'Active' },
    { name: 'Advanced EV Maintenance', provider: 'Tata STRIVE', capacity: 300, enrolled: 290, status: 'Active' },
    { name: 'Electric Vehicle Systems', provider: 'Government Polytechnic', capacity: 400, enrolled: 350, status: 'Active' },
  ];

  return (
    <DashboardLayout 
      role="government" 
      title={skillData.skill} 
      subtitle="Detailed skill intelligence and demand analysis"
      showDistrictSelector={false}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant={skillData.priority === 'critical' ? 'error' : skillData.priority === 'high' ? 'warning' : 'info'} size="md">
            {skillData.priority.toUpperCase()} SKILL GAP
          </Badge>
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <TrendingUp size={12} />
            {skillData.trend === 'increasing' ? 'Growing Demand' : skillData.trend === 'decreasing' ? 'Declining' : 'Stable'}
          </div>
        </div>
        <p className="text-sm text-text-secondary">{skillData.sector} • {skillData.districts.join(', ')}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-secondary">Demand</span>
            <div className="w-6 h-6 rounded-lg bg-brand-50 flex items-center justify-center">
              <Target size={12} className="text-brand-500" />
            </div>
          </div>
          <p className="text-xl font-bold text-text-primary">{formatNumber(skillData.demand)}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-secondary">Supply</span>
            <div className="w-6 h-6 rounded-lg bg-status-success-bg flex items-center justify-center">
              <CheckCircle size={12} className="text-status-success" />
            </div>
          </div>
          <p className="text-xl font-bold text-text-primary">{formatNumber(skillData.supply)}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-secondary">Gap</span>
            <div className="w-6 h-6 rounded-lg bg-status-error-bg flex items-center justify-center">
              <AlertTriangle size={12} className="text-status-error" />
            </div>
          </div>
          <p className="text-xl font-bold text-status-error">{skillData.gapPercent}%</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-secondary">Median Wage</span>
            <div className="w-6 h-6 rounded-lg bg-brand-50 flex items-center justify-center">
              <IndianRupee size={12} className="text-brand-500" />
            </div>
          </div>
          <p className="text-xl font-bold text-text-primary">{formatCurrency(skillData.medianWage)}</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-secondary">12M Growth</span>
            <div className="w-6 h-6 rounded-lg bg-status-success-bg flex items-center justify-center">
              <TrendingUp size={12} className="text-status-success" />
            </div>
          </div>
          <p className="text-xl font-bold text-status-success">+31%</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-secondary">Employer Demand</span>
            <div className="w-6 h-6 rounded-lg bg-brand-50 flex items-center justify-center">
              <Building2 size={12} className="text-brand-500" />
            </div>
          </div>
          <p className="text-xl font-bold text-text-primary capitalize">{skillData.employerDemand}</p>
        </Card>
      </div>

      {/* 12 Month Forecast */}
      <Card padding="md" className="mb-6">
        <CardTitle>12-Month Demand Forecast</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Projected demand vs supply over next 12 months</p>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(value) => formatNumber(value)} tick={{ fontSize: 11 }} />
              <Tooltip 
                formatter={(value: any) => formatNumber(value)}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
              />
              <Line type="monotone" dataKey="currentDemand" stroke="#1e40af" strokeWidth={2} name="Current Demand" />
              <Line type="monotone" dataKey="projectedDemand" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Projected Demand" />
              <Line type="monotone" dataKey="currentSupply" stroke="#059669" strokeWidth={2} name="Current Supply" />
              <Line type="monotone" dataKey="projectedSupply" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Projected Supply" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Employers & Training Programs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card padding="md">
          <CardTitle>Top Hiring Employers</CardTitle>
          <p className="text-xs text-text-secondary mb-4">Employers with highest demand for this skill</p>
          
          <div className="space-y-3">
            {topEmployers.map((employer) => (
              <div key={employer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium text-text-primary">{employer.name}</p>
                  <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                    <MapPin size={12} />
                    {employer.district}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{formatNumber(employer.demand)}</p>
                  <Badge variant={employer.hiring === 'Active' ? 'success' : 'info'} size="sm">
                    {employer.hiring}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <CardTitle>Available Training Programs</CardTitle>
          <p className="text-xs text-text-secondary mb-4">Current training capacity by provider</p>
          
          <div className="space-y-3">
            {trainingPrograms.map((program) => (
              <div key={program.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium text-text-primary">{program.name}</p>
                  <p className="text-xs text-text-secondary mt-1">{program.provider}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{program.enrolled}/{program.capacity}</p>
                  <Badge variant="success" size="sm">
                    {program.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Action Required */}
      <Card padding="md" className="mb-6 bg-brand-50 border-brand-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={16} className="text-brand-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-brand-700 mb-2">Action Required</p>
            <p className="text-sm text-brand-600 mb-3">
              Increase {skillData.skill} training capacity by approximately 2,500 seats to meet projected demand over the next 12 months.
            </p>
            <div className="flex items-center gap-4 text-xs text-brand-500">
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                Focus districts: {skillData.districts.slice(0, 2).join(', ')}
              </span>
              <span className="flex items-center gap-1">
                <Target size={12} />
                Priority: {skillData.priority}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          variant="primary" 
          className="flex-1"
          onClick={() => setShowRecommendationModal(true)}
        >
          Create Recommendation
          <ArrowRight size={16} className="ml-2" />
        </Button>
        <Button variant="outline">
          View Programs
        </Button>
        <Button variant="outline">
          View Employers
        </Button>
      </div>

      {/* Recommendation Modal */}
      {showRecommendationModal && (
        <Modal
          open={showRecommendationModal}
          onClose={() => setShowRecommendationModal(false)}
          title="Create Training Recommendation"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-secondary mb-1">Recommended Skill</p>
              <p className="text-sm font-medium text-text-primary">{skillData.skill}</p>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-1">Target Districts</p>
              <div className="flex flex-wrap gap-2">
                {skillData.districts.slice(0, 2).map((district) => (
                  <Badge key={district} variant="neutral" size="sm">
                    {district}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-1">Suggested Additional Seats</p>
              <p className="text-sm font-medium text-text-primary">2,500</p>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-1">Priority</p>
              <Badge variant={skillData.priority === 'critical' ? 'error' : 'warning'} size="sm">
                {skillData.priority.toUpperCase()}
              </Badge>
            </div>

            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-text-secondary">
                This recommendation will be sent to the State Skill Development Council for review and approval.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => setShowRecommendationModal(false)}
              >
                Submit Recommendation
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowRecommendationModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
