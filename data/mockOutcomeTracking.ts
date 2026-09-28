// Feature 14: Programme & Outcome Tracking Data

export interface OutcomeStage {
  stage: string;
  count: number;
  percentage: number;
  dropoff: number;
  color: string;
}

export interface ProgramOutcome {
  programId: string;
  programName: string;
  provider: string;
  sector: string;
  district: string;
  batchYear: string;
  stages: OutcomeStage[];
  retention90d: number;
  retention180d: number;
  medianWage: number;
  wageGrowth: number; // percentage over 6 months
  avgTimeToPlacement: number; // days
  totalEnrolled: number;
}

export const programOutcomes: ProgramOutcome[] = [
  {
    programId: 'PO-001',
    programName: 'PMKVY — CNC Operator Training',
    provider: 'Maharashtra ITI Network',
    sector: 'Manufacturing',
    district: 'Pune',
    batchYear: '2026-A',
    totalEnrolled: 480,
    stages: [
      { stage: 'Enrolled', count: 480, percentage: 100, dropoff: 0, color: '#1e40af' },
      { stage: 'Completed Training', count: 420, percentage: 87.5, dropoff: 12.5, color: '#2563eb' },
      { stage: 'Assessed', count: 408, percentage: 97.1, dropoff: 2.9, color: '#3b82f6' },
      { stage: 'Certified', count: 395, percentage: 96.8, dropoff: 3.2, color: '#0d9488' },
      { stage: 'Placed', count: 316, percentage: 80.0, dropoff: 20.0, color: '#059669' },
      { stage: '90-Day Retained', count: 248, percentage: 78.5, dropoff: 21.5, color: '#15803d' },
      { stage: '180-Day Retained', count: 198, percentage: 79.8, dropoff: 20.2, color: '#166534' },
    ],
    retention90d: 78.5,
    retention180d: 62.7,
    medianWage: 18500,
    wageGrowth: 12,
    avgTimeToPlacement: 28,
  },
  {
    programId: 'PO-002',
    programName: 'MSSDS — Full Stack Developer',
    provider: 'CDAC Pune',
    sector: 'IT/ITES',
    district: 'Pune',
    batchYear: '2026-A',
    totalEnrolled: 295,
    stages: [
      { stage: 'Enrolled', count: 295, percentage: 100, dropoff: 0, color: '#1e40af' },
      { stage: 'Completed Training', count: 260, percentage: 88.1, dropoff: 11.9, color: '#2563eb' },
      { stage: 'Assessed', count: 255, percentage: 98.1, dropoff: 1.9, color: '#3b82f6' },
      { stage: 'Certified', count: 248, percentage: 97.3, dropoff: 2.7, color: '#0d9488' },
      { stage: 'Placed', count: 223, percentage: 89.9, dropoff: 10.1, color: '#059669' },
      { stage: '90-Day Retained', count: 194, percentage: 87.0, dropoff: 13.0, color: '#15803d' },
      { stage: '180-Day Retained', count: 172, percentage: 88.7, dropoff: 11.3, color: '#166534' },
    ],
    retention90d: 87.0,
    retention180d: 77.1,
    medianWage: 28000,
    wageGrowth: 18,
    avgTimeToPlacement: 18,
  },
  {
    programId: 'PO-003',
    programName: 'DDUGKY — Healthcare Assistant',
    provider: 'Symbiosis Health Sciences',
    sector: 'Healthcare',
    district: 'Mumbai',
    batchYear: '2026-A',
    totalEnrolled: 390,
    stages: [
      { stage: 'Enrolled', count: 390, percentage: 100, dropoff: 0, color: '#1e40af' },
      { stage: 'Completed Training', count: 340, percentage: 87.2, dropoff: 12.8, color: '#2563eb' },
      { stage: 'Assessed', count: 332, percentage: 97.6, dropoff: 2.4, color: '#3b82f6' },
      { stage: 'Certified', count: 320, percentage: 96.4, dropoff: 3.6, color: '#0d9488' },
      { stage: 'Placed', count: 272, percentage: 85.0, dropoff: 15.0, color: '#059669' },
      { stage: '90-Day Retained', count: 218, percentage: 80.1, dropoff: 19.9, color: '#15803d' },
      { stage: '180-Day Retained', count: 174, percentage: 79.8, dropoff: 20.2, color: '#166534' },
    ],
    retention90d: 80.1,
    retention180d: 64.0,
    medianWage: 16000,
    wageGrowth: 8,
    avgTimeToPlacement: 35,
  },
  {
    programId: 'PO-004',
    programName: 'PMKVY — Welding Specialist',
    provider: 'L&T Skill Trainers',
    sector: 'Construction',
    district: 'Nagpur',
    batchYear: '2025-B',
    totalEnrolled: 340,
    stages: [
      { stage: 'Enrolled', count: 340, percentage: 100, dropoff: 0, color: '#1e40af' },
      { stage: 'Completed Training', count: 310, percentage: 91.2, dropoff: 8.8, color: '#2563eb' },
      { stage: 'Assessed', count: 302, percentage: 97.4, dropoff: 2.6, color: '#3b82f6' },
      { stage: 'Certified', count: 295, percentage: 97.7, dropoff: 2.3, color: '#0d9488' },
      { stage: 'Placed', count: 236, percentage: 80.0, dropoff: 20.0, color: '#059669' },
      { stage: '90-Day Retained', count: 170, percentage: 72.0, dropoff: 28.0, color: '#15803d' },
      { stage: '180-Day Retained', count: 118, percentage: 69.4, dropoff: 30.6, color: '#166534' },
    ],
    retention90d: 72.0,
    retention180d: 50.0,
    medianWage: 16500,
    wageGrowth: 5,
    avgTimeToPlacement: 42,
  },
];

export const outcomeSummary = {
  totalEnrolled: 84320,
  totalCertified: 71820,
  totalPlaced: 57420,
  avgRetention90d: 71,
  avgRetention180d: 58,
  avgWage: 17400,
  avgTimeToPlacement: 32,
  topPerformingProgram: 'MSSDS — Full Stack Developer (90% placement, 87% retention)',
  lowestRetention: 'PMKVY — Welding Specialist (50% 180-day retention)',
};
