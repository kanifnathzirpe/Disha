export interface ProgramData {
  id: string;
  name: string;
  provider: string;
  district: string;
  sector: string;
  year: string;
  enrolled: number;
  completion: number;
  placement: number;
  retention90d: number;
  retention180d: number;
  medianWage: number;
  skillRelevance: number;
  status: 'active' | 'completed' | 'upcoming';
}

export const programsData: ProgramData[] = [
  {
    id: 'PRG001',
    name: 'Welding Program — Pune 2026',
    provider: 'Maha Skills',
    district: 'Pune',
    sector: 'Manufacturing',
    year: '2026',
    enrolled: 5000,
    completion: 92,
    placement: 78,
    retention90d: 71,
    retention180d: 42,
    medianWage: 14500,
    skillRelevance: 61,
    status: 'active',
  },
  {
    id: 'PRG002',
    name: 'Industrial Automation — Pune',
    provider: 'TechForward',
    district: 'Pune',
    sector: 'Manufacturing',
    year: '2026',
    enrolled: 4000,
    completion: 89,
    placement: 81,
    retention90d: 76,
    retention180d: 68,
    medianWage: 21500,
    skillRelevance: 87,
    status: 'active',
  },
  {
    id: 'PRG003',
    name: 'EV Diagnostics — Nashik',
    provider: 'Green Tech Academy',
    district: 'Nashik',
    sector: 'Automotive',
    year: '2026',
    enrolled: 3500,
    completion: 94,
    placement: 86,
    retention90d: 82,
    retention180d: 75,
    medianWage: 24000,
    skillRelevance: 92,
    status: 'active',
  },
  {
    id: 'PRG004',
    name: 'CNC Programming — Mumbai',
    provider: 'Precision Skills',
    district: 'Mumbai',
    sector: 'Manufacturing',
    year: '2026',
    enrolled: 2800,
    completion: 91,
    placement: 79,
    retention90d: 74,
    retention180d: 65,
    medianWage: 22000,
    skillRelevance: 84,
    status: 'active',
  },
  {
    id: 'PRG005',
    name: 'Solar Installation — Nagpur',
    provider: 'Renewable Training Hub',
    district: 'Nagpur',
    sector: 'Renewable Energy',
    year: '2026',
    enrolled: 3200,
    completion: 88,
    placement: 74,
    retention90d: 68,
    retention180d: 58,
    medianWage: 18500,
    skillRelevance: 78,
    status: 'active',
  },
  {
    id: 'PRG006',
    name: 'PLC Programming — Pune',
    provider: 'Industrial Training Institute',
    district: 'Pune',
    sector: 'Manufacturing',
    year: '2025',
    enrolled: 4500,
    completion: 90,
    placement: 77,
    retention90d: 72,
    retention180d: 64,
    medianWage: 21000,
    skillRelevance: 82,
    status: 'completed',
  },
  {
    id: 'PRG007',
    name: 'HVAC Technician — Mumbai',
    provider: 'Building Skills Academy',
    district: 'Mumbai',
    sector: 'Construction',
    year: '2026',
    enrolled: 2200,
    completion: 87,
    placement: 71,
    retention90d: 66,
    retention180d: 55,
    medianWage: 18000,
    skillRelevance: 75,
    status: 'active',
  },
  {
    id: 'PRG008',
    name: 'Robotics — Nashik',
    provider: 'TechForward',
    district: 'Nashik',
    sector: 'Manufacturing',
    year: '2026',
    enrolled: 1800,
    completion: 93,
    placement: 84,
    retention90d: 79,
    retention180d: 72,
    medianWage: 25000,
    skillRelevance: 89,
    status: 'active',
  },
];

export const summaryStats = {
  totalPrograms: 48,
  avgPlacement: 76,
  avgRetention90d: 64,
  avgWage: 17400,
};

export const retentionCohortData = [
  { period: '30D', retained: 92, label: '30 Days' },
  { period: '90D', retained: 71, label: '90 Days' },
  { period: '180D', retained: 42, label: '180 Days' },
  { period: '365D', retained: 28, label: '365 Days' },
];

export const wageProgressionData = [
  { period: 'Starting', wage: 12000 },
  { period: '3 Months', wage: 13000 },
  { period: '6 Months', wage: 14000 },
  { period: '12 Months', wage: 15000 },
];

export const diagnosticSignals = [
  { factor: 'Salary mismatch', percentage: 40, severity: 'high' },
  { factor: 'Skill mismatch', percentage: 30, severity: 'high' },
  { factor: 'Location / commute', percentage: 18, severity: 'medium' },
  { factor: 'Employer mismatch', percentage: 12, severity: 'low' },
];

export const recommendedActions = [
  {
    id: 1,
    action: 'Review wage alignment',
    description: 'Analyze current wage rates vs industry standards for welding positions',
    priority: 'high',
  },
  {
    id: 2,
    action: 'Increase practical training',
    description: 'Add more hands-on welding hours and industry equipment training',
    priority: 'high',
  },
  {
    id: 3,
    action: 'Target employers paying >₹16K',
    description: 'Focus placement efforts on employers offering competitive wages',
    priority: 'medium',
  },
  {
    id: 4,
    action: 'Create nearby placement cluster',
    description: 'Develop partnerships with local manufacturing units to reduce commute',
    priority: 'medium',
  },
];
