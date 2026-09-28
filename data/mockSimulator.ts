export interface SimulationInput {
  budget: number; // in crores
  district: string;
  sector: string;
  targetSkill: string;
  trainingCapacity: number;
  expectedPlacement: number;
  expectedRetention: number;
}

export interface SimulationOutput {
  projectedTrainees: number;
  projectedPlacement: number;
  projectedRetention: number;
  medianWage: number;
  projectedWageImpact: number;
  impactScore: number;
  recommendation: string;
}

export interface ComparisonOption {
  id: string;
  name: string;
  employment: number;
  medianWage: number;
  roi: number;
  recommended: boolean;
  description: string;
  retention: number;
}

export const districts = [
  'Pune',
  'Nashik',
  'Nagpur',
  'Mumbai',
  'Kolhapur',
  'Chhatrapati Sambhajinagar',
];

export const sectors = [
  'Manufacturing',
  'Automotive',
  'Renewable Energy',
  'Construction',
  'IT Services',
];

export const targetSkills = [
  'Industrial Automation',
  'EV Diagnostics',
  'CNC Programming',
  'Solar Installation',
  'Generic IT Training',
  'EV Technician',
  'PLC Programming',
];

export const skillWageMap: Record<string, number> = {
  'Industrial Automation': 22000,
  'EV Diagnostics': 24000,
  'CNC Programming': 21000,
  'Solar Installation': 18500,
  'Generic IT Training': 14000,
  'EV Technician': 19000,
  'PLC Programming': 21000,
};

export const defaultInputs: SimulationInput = {
  budget: 50,
  district: 'Pune',
  sector: 'Manufacturing',
  targetSkill: 'Industrial Automation',
  trainingCapacity: 12500,
  expectedPlacement: 72,
  expectedRetention: 54,
};

export const comparisonOptions: ComparisonOption[] = [
  {
    id: 'A',
    name: 'Generic IT Training',
    employment: 8200,
    medianWage: 14000,
    roi: 1.8,
    recommended: false,
    description: 'Basic computer applications and standard clerical IT training modules across district centers.',
    retention: 62,
  },
  {
    id: 'B',
    name: 'EV Technician',
    employment: 11600,
    medianWage: 19000,
    roi: 3.1,
    recommended: false,
    description: 'Automotive research association battery assembly and high-voltage maintenance certification.',
    retention: 76,
  },
  {
    id: 'C',
    name: 'Industrial Automation',
    employment: 9800,
    medianWage: 22000,
    roi: 3.6,
    recommended: true,
    description: 'Industry 4.0 smart manufacturing PLC, SCADA, and robotics turning automation cells.',
    retention: 84,
  },
];

// Deterministic calculation functions
export function calculateSimulation(inputs: SimulationInput): SimulationOutput {
  const { budget, trainingCapacity, expectedPlacement, expectedRetention, targetSkill } = inputs;
  
  const medianWage = skillWageMap[targetSkill] || 18000;
  
  // Projected trainees based on budget and capacity
  const projectedTrainees = Math.min(trainingCapacity, Math.floor(budget * 250));
  
  // Projected placement
  const projectedPlacement = Math.floor(projectedTrainees * (expectedPlacement / 100));
  
  // Projected retention (90-day)
  const projectedRetention = Math.floor(projectedPlacement * (expectedRetention / 100));
  
  // Projected wage impact (monthly wage * retained trainees * 12 months)
  const projectedWageImpact = projectedRetention * medianWage * 12;
  
  // Impact score calculation (0-100)
  const placementScore = expectedPlacement;
  const retentionScore = expectedRetention;
  const wageScore = Math.min(100, (medianWage / 25000) * 100);
  const impactScore = Math.round((placementScore * 0.4) + (retentionScore * 0.3) + (wageScore * 0.3));
  
  // Recommendation based on impact score
  let recommendation = 'MODERATE INVESTMENT';
  if (impactScore >= 85) {
    recommendation = 'RECOMMENDED INVESTMENT';
  } else if (impactScore >= 70) {
    recommendation = 'CONSIDER INVESTMENT';
  } else {
    recommendation = 'REVIEW REQUIRED';
  }
  
  return {
    projectedTrainees,
    projectedPlacement,
    projectedRetention,
    medianWage,
    projectedWageImpact,
    impactScore,
    recommendation,
  };
}

export function formatCurrencyCrores(value: number): string {
  if (value >= 100) {
    return `₹${(value / 100).toFixed(1)}k Cr`;
  }
  return `₹${value} Cr`;
}

export function formatWageImpact(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} L`;
  }
  return `₹${value.toLocaleString()}`;
}
