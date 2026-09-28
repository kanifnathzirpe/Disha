'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, Modal } from '@/components/ui';
import { formatNumber } from '@/lib/utils';
import { 
  Target, 
  MapPin, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  BarChart3
} from 'lucide-react';

interface Recommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium';
  title: string;
  description: string;
  district: string;
  impact: 'High' | 'Medium' | 'Low';
  evidence: string[];
  expectedOutcome: string;
  estimatedCost: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export default function RecommendationsPage() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const recommendations: Recommendation[] = [
    {
      id: 'REC-001',
      priority: 'critical',
      title: 'Increase EV Diagnostics training capacity',
      description: 'Critical skill gap of 64% in EV Diagnostics across Pune district. Current training capacity of 6,600 seats insufficient to meet demand of 18,400 positions.',
      district: 'Pune',
      impact: 'High',
      evidence: [
        'Demand increased 31% in last 6 months',
        'Employer demand: Very High',
        'Current utilization: 95%',
        'Wage premium: 24% above average',
      ],
      expectedOutcome: 'Reduce skill shortage by 40%, increase placement rate by 15%',
      estimatedCost: '₹12.5 Cr',
      status: 'pending',
      createdAt: '2026-09-20',
    },
    {
      id: 'REC-002',
      priority: 'high',
      title: 'Review Welding wage alignment',
      description: 'Welding program 180D retention rate of 58% below target of 70%. Wage misalignment causing trainee attrition to higher-paying sectors.',
      district: 'Nashik',
      impact: 'Medium',
      evidence: [
        'Retention dropped 12% vs last quarter',
        'Median wage: ₹16.5K vs market ₹18.5K',
        'Placement rate: 68% (below target)',
        'Employer feedback: Wage dissatisfaction',
      ],
      expectedOutcome: 'Improve 180D retention to 70%, reduce attrition by 25%',
      estimatedCost: '₹2.8 Cr',
      status: 'in-progress',
      createdAt: '2026-09-18',
    },
    {
      id: 'REC-003',
      priority: 'critical',
      title: 'Expand Industrial Automation training',
      description: 'Industrial Automation demand growing at 27% annually. Current capacity insufficient for projected demand in Nashik and Nagpur districts.',
      district: 'Nashik, Nagpur',
      impact: 'High',
      evidence: [
        'Demand growth: 27% YoY',
        'Supply gap: 5,600 workers',
        'Employer demand: High',
        'Wage growth: 18% post-certification',
      ],
      expectedOutcome: 'Train 1,800 additional workers, meet 85% of demand',
      estimatedCost: '₹8.5 Cr',
      status: 'pending',
      createdAt: '2026-09-15',
    },
    {
      id: 'REC-004',
      priority: 'high',
      title: 'Improve data quality for employment tracking',
      description: '4,200 trainees certified in last 90 days have no employment status update. Data quality issues affecting outcome tracking accuracy.',
      district: 'State-wide',
      impact: 'Medium',
      evidence: [
        '4,200 trainees missing employment data',
        'Data completeness: 94% (target: 98%)',
        'Verification backlog: 15 days',
        'Impact on retention tracking',
      ],
      expectedOutcome: 'Achieve 98% data completeness, reduce verification time to 5 days',
      estimatedCost: '₹1.2 Cr',
      status: 'pending',
      createdAt: '2026-09-12',
    },
    {
      id: 'REC-005',
      priority: 'medium',
      title: 'Establish CNC Programming excellence center',
      description: 'CNC Programming showing strong demand growth. Establish specialized excellence center in Pune to improve quality and placement.',
      district: 'Pune',
      impact: 'High',
      evidence: [
        'Demand growth: 17% YoY',
        'Placement rate: 78% (above average)',
        'Employer satisfaction: 85%',
        'Skill complexity: High',
      ],
      expectedOutcome: 'Improve placement to 85%, establish industry benchmark',
      estimatedCost: '₹6.5 Cr',
      status: 'completed',
      createdAt: '2026-08-25',
    },
  ];

  const priorityCounts = {
    critical: recommendations.filter(r => r.priority === 'critical').length,
    high: recommendations.filter(r => r.priority === 'high').length,
    medium: recommendations.filter(r => r.priority === 'medium').length,
  };

  const statusCounts = {
    pending: recommendations.filter(r => r.status === 'pending').length,
    'in-progress': recommendations.filter(r => r.status === 'in-progress').length,
    completed: recommendations.filter(r => r.status === 'completed').length,
  };

  return (
    <DashboardLayout 
      role="government" 
      title="Policy Recommendations" 
      subtitle="Data-driven recommendations for government intervention and policy action"
      showDistrictSelector={false}
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Recommendations</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <FileText size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{recommendations.length}</p>
          <p className="text-xs text-text-tertiary mt-1">Active recommendations</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Critical Priority</span>
            <div className="w-8 h-8 rounded-lg bg-status-error-bg flex items-center justify-center">
              <AlertTriangle size={16} className="text-status-error" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-error">{priorityCounts.critical}</p>
          <p className="text-xs text-text-tertiary mt-1">Immediate action</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">In Progress</span>
            <div className="w-8 h-8 rounded-lg bg-status-warning-bg flex items-center justify-center">
              <Clock size={16} className="text-status-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-warning">{statusCounts['in-progress']}</p>
          <p className="text-xs text-text-tertiary mt-1">Currently being implemented</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Completed</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-bg flex items-center justify-center">
              <CheckCircle size={16} className="text-status-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-success">{statusCounts.completed}</p>
          <p className="text-xs text-text-tertiary mt-1">Successfully implemented</p>
        </Card>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <Card key={rec.id} padding="md" className="hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-brand-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant={rec.priority === 'critical' ? 'error' : rec.priority === 'high' ? 'warning' : 'info'} 
                      size="sm"
                    >
                      {rec.priority.toUpperCase()}
                    </Badge>
                    <Badge 
                      variant={rec.status === 'completed' ? 'success' : rec.status === 'in-progress' ? 'warning' : 'neutral'} 
                      size="sm"
                    >
                      {rec.status === 'in-progress' ? 'In Progress' : rec.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">{rec.title}</h3>
                  <p className="text-xs text-text-secondary mb-2">{rec.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {rec.district}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target size={12} />
                      Impact: {rec.impact}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 size={12} />
                      {rec.estimatedCost}
                    </span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSelectedRecommendation(rec)}
              >
                View Details
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Recommendation Detail Modal */}
      {selectedRecommendation && (
        <Modal
          open={!!selectedRecommendation}
          onClose={() => setSelectedRecommendation(null)}
          title={selectedRecommendation.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge 
                variant={selectedRecommendation.priority === 'critical' ? 'error' : selectedRecommendation.priority === 'high' ? 'warning' : 'info'} 
                size="md"
              >
                {selectedRecommendation.priority.toUpperCase()} PRIORITY
              </Badge>
              <Badge 
                variant={selectedRecommendation.status === 'completed' ? 'success' : selectedRecommendation.status === 'in-progress' ? 'warning' : 'neutral'} 
                size="md"
              >
                {selectedRecommendation.status === 'in-progress' ? 'In Progress' : selectedRecommendation.status}
              </Badge>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-1">Description</p>
              <p className="text-sm text-text-primary">{selectedRecommendation.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-secondary mb-1">District</p>
                <p className="text-sm font-medium text-text-primary">{selectedRecommendation.district}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Impact</p>
                <p className="text-sm font-medium text-text-primary">{selectedRecommendation.impact}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Estimated Cost</p>
                <p className="text-sm font-medium text-text-primary">{selectedRecommendation.estimatedCost}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Created</p>
                <p className="text-sm font-medium text-text-primary">{selectedRecommendation.createdAt}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-2">Evidence</p>
              <div className="space-y-2">
                {selectedRecommendation.evidence.map((evidence, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-gray-50 rounded-md">
                    <CheckCircle size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-text-primary">{evidence}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-1">Expected Outcome</p>
              <p className="text-sm text-text-primary">{selectedRecommendation.expectedOutcome}</p>
            </div>

            <div className="flex gap-2 pt-2">
              {selectedRecommendation.status === 'pending' && (
                <>
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedRecommendation(null);
                      setShowStatusModal(true);
                    }}
                  >
                    Start Implementation
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedRecommendation(null)}>
                    Close
                  </Button>
                </>
              )}
              {selectedRecommendation.status === 'in-progress' && (
                <>
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => setSelectedRecommendation(null)}
                  >
                    Mark as Completed
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedRecommendation(null)}>
                    Close
                  </Button>
                </>
              )}
              {selectedRecommendation.status === 'completed' && (
                <Button variant="outline" onClick={() => setSelectedRecommendation(null)}>
                  Close
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
