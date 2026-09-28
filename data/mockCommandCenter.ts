import { TrendDataPoint, SectorData } from '@/types';

// Funnel Data
export const employmentFunnel = [
  { stage: 'Enrolled', value: 84320, conversion: 100, dropoff: 0, color: '#1e40af' },
  { stage: 'Certification', value: 71820, conversion: 85.2, dropoff: 14.8, color: '#2563eb' },
  { stage: 'Placement', value: 57420, conversion: 79.9, dropoff: 20.1, color: '#3b82f6' },
  { stage: '90D Retention', value: 38945, conversion: 67.8, dropoff: 32.2, color: '#60a5fa' },
  { stage: '180D Retention', value: 31820, conversion: 81.7, dropoff: 18.3, color: '#93c5fd' },
];

// Skill Demand vs Supply
export const skillDemandSupply = [
  { skill: 'EV Diagnostics', demand: 8500, supply: 3200, gap: 5300 },
  { skill: 'CNC Programming', demand: 6200, supply: 2800, gap: 3400 },
  { skill: 'Industrial Automation', demand: 5800, supply: 2500, gap: 3300 },
  { skill: 'PLC', demand: 4900, supply: 2200, gap: 2700 },
  { skill: 'Solar Installation', demand: 4200, supply: 1900, gap: 2300 },
];

// District Intelligence
export const districtIntelligence = [
  {
    district: 'Pune',
    skillGapStatus: 'critical',
    placementRate: 72,
    retention: 68,
    enrolled: 15420,
    certified: 13120,
    placed: 9446,
  },
  {
    district: 'Nashik',
    skillGapStatus: 'high',
    placementRate: 68,
    retention: 65,
    enrolled: 12350,
    certified: 10520,
    placed: 7154,
  },
  {
    district: 'Nagpur',
    skillGapStatus: 'high',
    placementRate: 70,
    retention: 67,
    enrolled: 11280,
    certified: 9580,
    placed: 6706,
  },
  {
    district: 'Mumbai',
    skillGapStatus: 'medium',
    placementRate: 75,
    retention: 70,
    enrolled: 9840,
    certified: 8360,
    placed: 6270,
  },
  {
    district: 'Kolhapur',
    skillGapStatus: 'medium',
    placementRate: 66,
    retention: 62,
    enrolled: 8760,
    certified: 7440,
    placed: 4910,
  },
  {
    district: 'Chhatrapati Sambhajinagar',
    skillGapStatus: 'critical',
    placementRate: 64,
    retention: 60,
    enrolled: 9120,
    certified: 7750,
    placed: 4960,
  },
  {
    district: 'Satara',
    skillGapStatus: 'low',
    placementRate: 71,
    retention: 66,
    enrolled: 7890,
    certified: 6700,
    placed: 4757,
  },
  {
    district: 'Ahmednagar',
    skillGapStatus: 'medium',
    placementRate: 67,
    retention: 63,
    enrolled: 8660,
    certified: 7350,
    placed: 4925,
  },
];

// Training Provider Performance
export const providerPerformance = [
  {
    provider: 'ITI Pune',
    enrollment: 2450,
    completion: 89,
    placement: 78,
    retention90d: 72,
    medianWage: 18500,
    skillRelevance: 85,
  },
  {
    provider: 'Skill Development Center Nashik',
    enrollment: 1890,
    completion: 86,
    placement: 74,
    retention90d: 68,
    medianWage: 17200,
    skillRelevance: 82,
  },
  {
    provider: 'Government Polytechnic Nagpur',
    enrollment: 1650,
    completion: 91,
    placement: 80,
    retention90d: 75,
    medianWage: 19200,
    skillRelevance: 88,
  },
  {
    provider: 'Industrial Training Institute Mumbai',
    enrollment: 1420,
    completion: 84,
    placement: 76,
    retention90d: 70,
    medianWage: 17800,
    skillRelevance: 80,
  },
  {
    provider: 'Technical Training Center Kolhapur',
    enrollment: 1280,
    completion: 82,
    placement: 71,
    retention90d: 65,
    medianWage: 16500,
    skillRelevance: 78,
  },
];

// At-Risk Trainees
export const atRiskTrainees = {
  total: 12400,
  highRisk: 3200,
  mediumRisk: 5200,
  lowRisk: 4000,
  breakdown: [
    { traineeId: 'TRN-001', name: 'Amit Patil', district: 'Pune', program: 'EV Diagnostics', risk: 'high', reason: 'Low attendance' },
    { traineeId: 'TRN-002', name: 'Sneha Kulkarni', district: 'Nashik', program: 'CNC Programming', risk: 'high', reason: 'Assessment failure' },
    { traineeId: 'TRN-003', name: 'Rajesh Deshmukh', district: 'Nagpur', program: 'Industrial Automation', risk: 'medium', reason: 'Progress delay' },
    { traineeId: 'TRN-004', name: 'Priya Sharma', district: 'Mumbai', program: 'Solar Installation', risk: 'medium', reason: 'Skill gap' },
    { traineeId: 'TRN-005', name: 'Vikram Joshi', district: 'Pune', program: 'PLC', risk: 'low', reason: 'Placement delay' },
  ],
};

// Recommendations
export const recommendations = [
  {
    id: 1,
    priority: 'critical',
    title: 'Increase EV Diagnostics capacity in Pune',
    district: 'Pune',
    expectedImpact: '+2,400 trained annually',
    action: 'Expand program capacity',
  },
  {
    id: 2,
    priority: 'high',
    title: 'Review Welding wage alignment',
    district: 'State-wide',
    expectedImpact: '+15% placement rate',
    action: 'Conduct wage survey',
  },
  {
    id: 3,
    priority: 'medium',
    title: 'Expand Industrial Automation training',
    district: 'Nashik, Nagpur',
    expectedImpact: '+1,800 skilled workers',
    action: 'Add training centers',
  },
];
