// Feature 1: Skill Intelligence Map — District-level skill intelligence data

export interface DistrictSkillData {
  id: string;
  district: string;
  coordinates: { x: number; y: number }; // Relative positions for SVG map
  population: number;
  totalTrainees: number;
  totalEmployers: number;
  totalJobs: number;
  trainingCentres: number;
  topSkills: { skill: string; demand: number; supply: number; gap: number }[];
  sectors: { sector: string; jobs: number; trainees: number }[];
  placementRate: number;
  avgWage: number;
  skillGapSeverity: 'critical' | 'high' | 'medium' | 'low';
  employmentFlows: { to: string; count: number }[];
}

export const maharashtraDistricts: DistrictSkillData[] = [
  {
    id: 'pune',
    district: 'Pune',
    coordinates: { x: 35, y: 58 },
    population: 9426959,
    totalTrainees: 15420,
    totalEmployers: 342,
    totalJobs: 4820,
    trainingCentres: 48,
    topSkills: [
      { skill: 'CNC Programming', demand: 4500, supply: 1800, gap: 2700 },
      { skill: 'Industrial Automation', demand: 3200, supply: 1400, gap: 1800 },
      { skill: 'EV Diagnostics', demand: 2800, supply: 800, gap: 2000 },
      { skill: 'Full Stack Development', demand: 3600, supply: 2100, gap: 1500 },
      { skill: 'AutoCAD', demand: 1800, supply: 1200, gap: 600 },
    ],
    sectors: [
      { sector: 'Manufacturing', jobs: 1820, trainees: 5200 },
      { sector: 'IT/ITES', jobs: 1540, trainees: 4100 },
      { sector: 'Automotive', jobs: 860, trainees: 3200 },
      { sector: 'Healthcare', jobs: 600, trainees: 2920 },
    ],
    placementRate: 78,
    avgWage: 20500,
    skillGapSeverity: 'critical',
    employmentFlows: [
      { to: 'Mumbai', count: 1200 },
      { to: 'Nashik', count: 340 },
      { to: 'Kolhapur', count: 180 },
    ],
  },
  {
    id: 'mumbai',
    district: 'Mumbai',
    coordinates: { x: 20, y: 55 },
    population: 12442373,
    totalTrainees: 18200,
    totalEmployers: 520,
    totalJobs: 6200,
    trainingCentres: 62,
    topSkills: [
      { skill: 'Full Stack Development', demand: 6200, supply: 3100, gap: 3100 },
      { skill: 'Data Entry & Digitization', demand: 5000, supply: 3500, gap: 1500 },
      { skill: 'Healthcare Assistance', demand: 3500, supply: 1750, gap: 1750 },
      { skill: 'Digital Marketing', demand: 3400, supply: 1700, gap: 1700 },
      { skill: 'HVAC Technician', demand: 2400, supply: 1600, gap: 800 },
    ],
    sectors: [
      { sector: 'IT/ITES', jobs: 2400, trainees: 6800 },
      { sector: 'Healthcare', jobs: 1600, trainees: 4200 },
      { sector: 'Manufacturing', jobs: 1100, trainees: 3800 },
      { sector: 'Construction', jobs: 1100, trainees: 3400 },
    ],
    placementRate: 82,
    avgWage: 22000,
    skillGapSeverity: 'high',
    employmentFlows: [
      { to: 'Pune', count: 800 },
      { to: 'Thane', count: 1400 },
      { to: 'Nashik', count: 200 },
    ],
  },
  {
    id: 'nagpur',
    district: 'Nagpur',
    coordinates: { x: 75, y: 32 },
    population: 4653570,
    totalTrainees: 8900,
    totalEmployers: 180,
    totalJobs: 2400,
    trainingCentres: 28,
    topSkills: [
      { skill: 'Welding (SMAW/GMAW)', demand: 3800, supply: 2280, gap: 1520 },
      { skill: 'Industrial Automation', demand: 2200, supply: 1100, gap: 1100 },
      { skill: 'Electrician (Industrial)', demand: 2800, supply: 1600, gap: 1200 },
      { skill: 'Solar Installation', demand: 1800, supply: 900, gap: 900 },
      { skill: 'CNC Programming', demand: 1400, supply: 800, gap: 600 },
    ],
    sectors: [
      { sector: 'Manufacturing', jobs: 900, trainees: 3200 },
      { sector: 'Construction', jobs: 680, trainees: 2400 },
      { sector: 'Renewable Energy', jobs: 420, trainees: 1800 },
      { sector: 'IT/ITES', jobs: 400, trainees: 1500 },
    ],
    placementRate: 70,
    avgWage: 16500,
    skillGapSeverity: 'high',
    employmentFlows: [
      { to: 'Pune', count: 600 },
      { to: 'Mumbai', count: 400 },
      { to: 'Nashik', count: 150 },
    ],
  },
  {
    id: 'nashik',
    district: 'Nashik',
    coordinates: { x: 30, y: 42 },
    population: 6107187,
    totalTrainees: 6700,
    totalEmployers: 145,
    totalJobs: 1800,
    trainingCentres: 22,
    topSkills: [
      { skill: 'EV Diagnostics', demand: 2400, supply: 600, gap: 1800 },
      { skill: 'Solar Installation', demand: 2200, supply: 1100, gap: 1100 },
      { skill: 'CNC Programming', demand: 1800, supply: 900, gap: 900 },
      { skill: 'Industrial Automation', demand: 1500, supply: 700, gap: 800 },
      { skill: 'Robotics', demand: 1200, supply: 400, gap: 800 },
    ],
    sectors: [
      { sector: 'Automotive', jobs: 620, trainees: 2400 },
      { sector: 'Manufacturing', jobs: 540, trainees: 1800 },
      { sector: 'Renewable Energy', jobs: 340, trainees: 1400 },
      { sector: 'Construction', jobs: 300, trainees: 1100 },
    ],
    placementRate: 72,
    avgWage: 15200,
    skillGapSeverity: 'critical',
    employmentFlows: [
      { to: 'Pune', count: 820 },
      { to: 'Mumbai', count: 340 },
      { to: 'Nagpur', count: 120 },
    ],
  },
  {
    id: 'aurangabad',
    district: 'Chhatrapati Sambhajinagar',
    coordinates: { x: 52, y: 45 },
    population: 3701282,
    totalTrainees: 5800,
    totalEmployers: 120,
    totalJobs: 1400,
    trainingCentres: 18,
    topSkills: [
      { skill: 'Data Entry & Digitization', demand: 2600, supply: 1800, gap: 800 },
      { skill: 'CNC Programming', demand: 1600, supply: 700, gap: 900 },
      { skill: 'Welding', demand: 1400, supply: 800, gap: 600 },
      { skill: 'Textile Machine Operation', demand: 1200, supply: 900, gap: 300 },
      { skill: 'Electrician', demand: 1000, supply: 500, gap: 500 },
    ],
    sectors: [
      { sector: 'IT/ITES', jobs: 480, trainees: 2200 },
      { sector: 'Manufacturing', jobs: 420, trainees: 1600 },
      { sector: 'Textile', jobs: 280, trainees: 1200 },
      { sector: 'Construction', jobs: 220, trainees: 800 },
    ],
    placementRate: 64,
    avgWage: 14800,
    skillGapSeverity: 'critical',
    employmentFlows: [
      { to: 'Pune', count: 920 },
      { to: 'Mumbai', count: 680 },
      { to: 'Nashik', count: 220 },
    ],
  },
  {
    id: 'thane',
    district: 'Thane',
    coordinates: { x: 22, y: 50 },
    population: 8070032,
    totalTrainees: 9200,
    totalEmployers: 280,
    totalJobs: 3200,
    trainingCentres: 35,
    topSkills: [
      { skill: 'Textile Machine Operation', demand: 3200, supply: 2240, gap: 960 },
      { skill: 'Plumbing & Pipe Fitting', demand: 2800, supply: 1680, gap: 1120 },
      { skill: 'Data Entry', demand: 2200, supply: 1600, gap: 600 },
      { skill: 'HVAC Technician', demand: 1800, supply: 1200, gap: 600 },
      { skill: 'Electrician', demand: 1500, supply: 900, gap: 600 },
    ],
    sectors: [
      { sector: 'Textile', jobs: 1100, trainees: 3200 },
      { sector: 'Construction', jobs: 800, trainees: 2400 },
      { sector: 'IT/ITES', jobs: 700, trainees: 2000 },
      { sector: 'Manufacturing', jobs: 600, trainees: 1600 },
    ],
    placementRate: 77,
    avgWage: 19800,
    skillGapSeverity: 'medium',
    employmentFlows: [
      { to: 'Mumbai', count: 1800 },
      { to: 'Pune', count: 400 },
      { to: 'Nashik', count: 120 },
    ],
  },
  {
    id: 'kolhapur',
    district: 'Kolhapur',
    coordinates: { x: 28, y: 72 },
    population: 3876001,
    totalTrainees: 4500,
    totalEmployers: 95,
    totalJobs: 1100,
    trainingCentres: 15,
    topSkills: [
      { skill: 'Food Processing', demand: 1800, supply: 900, gap: 900 },
      { skill: 'Welding', demand: 1400, supply: 800, gap: 600 },
      { skill: 'Solar Installation', demand: 1200, supply: 600, gap: 600 },
      { skill: 'Electrician', demand: 1000, supply: 600, gap: 400 },
      { skill: 'Textile Machine Operation', demand: 800, supply: 500, gap: 300 },
    ],
    sectors: [
      { sector: 'Agriculture', jobs: 380, trainees: 1600 },
      { sector: 'Manufacturing', jobs: 320, trainees: 1200 },
      { sector: 'Construction', jobs: 220, trainees: 900 },
      { sector: 'Renewable Energy', jobs: 180, trainees: 800 },
    ],
    placementRate: 66,
    avgWage: 14500,
    skillGapSeverity: 'medium',
    employmentFlows: [
      { to: 'Pune', count: 680 },
      { to: 'Mumbai', count: 380 },
      { to: 'Satara', count: 80 },
    ],
  },
  {
    id: 'solapur',
    district: 'Solapur',
    coordinates: { x: 48, y: 65 },
    population: 4317756,
    totalTrainees: 3800,
    totalEmployers: 72,
    totalJobs: 800,
    trainingCentres: 12,
    topSkills: [
      { skill: 'Textile Machine Operation', demand: 2200, supply: 1400, gap: 800 },
      { skill: 'Electrician', demand: 1200, supply: 700, gap: 500 },
      { skill: 'Welding', demand: 1000, supply: 600, gap: 400 },
      { skill: 'Food Processing', demand: 800, supply: 400, gap: 400 },
      { skill: 'Data Entry', demand: 600, supply: 400, gap: 200 },
    ],
    sectors: [
      { sector: 'Textile', jobs: 320, trainees: 1400 },
      { sector: 'Manufacturing', jobs: 220, trainees: 1000 },
      { sector: 'Agriculture', jobs: 140, trainees: 800 },
      { sector: 'IT/ITES', jobs: 120, trainees: 600 },
    ],
    placementRate: 68,
    avgWage: 13200,
    skillGapSeverity: 'medium',
    employmentFlows: [
      { to: 'Pune', count: 720 },
      { to: 'Mumbai', count: 280 },
      { to: 'Kolhapur', count: 80 },
    ],
  },
];

export const stateAggregates = {
  totalTrainees: 84320,
  totalCertified: 71820,
  totalPlaced: 57420,
  totalEmployers: 1890,
  totalJobs: 24200,
  trainingCentres: 310,
  avgPlacementRate: 73.8,
  avgWage: 17400,
  criticalSkillGaps: 12,
  totalBudget: 246.5,
  budgetUtilized: 78,
};

export const topSkillGapsState = [
  { skill: 'EV Diagnostics', totalGap: 11800, districts: ['Pune', 'Nashik', 'Nagpur'], trend: 'increasing' as const, medianWage: 24000 },
  { skill: 'CNC Programming', totalGap: 6100, districts: ['Pune', 'Mumbai', 'Chhatrapati Sambhajinagar'], trend: 'increasing' as const, medianWage: 22000 },
  { skill: 'Industrial Automation', totalGap: 5600, districts: ['Nashik', 'Pune', 'Nagpur'], trend: 'increasing' as const, medianWage: 23500 },
  { skill: 'Full Stack Development', totalGap: 4600, districts: ['Mumbai', 'Pune'], trend: 'increasing' as const, medianWage: 28000 },
  { skill: 'Healthcare Assistance', totalGap: 3500, districts: ['Mumbai', 'Pune', 'Nashik'], trend: 'stable' as const, medianWage: 16000 },
  { skill: 'Solar Installation', totalGap: 2700, districts: ['Nagpur', 'Nashik', 'Kolhapur'], trend: 'increasing' as const, medianWage: 18500 },
  { skill: 'Welding (SMAW/GMAW)', totalGap: 2320, districts: ['Nagpur', 'Kolhapur', 'Solapur'], trend: 'stable' as const, medianWage: 16500 },
  { skill: 'Electrician (Industrial)', totalGap: 2200, districts: ['Nagpur', 'Solapur', 'Thane'], trend: 'stable' as const, medianWage: 17000 },
];

export const sectorFlowData = [
  { from: 'Training', to: 'Manufacturing', value: 24200 },
  { from: 'Training', to: 'IT/ITES', value: 20100 },
  { from: 'Training', to: 'Healthcare', value: 12500 },
  { from: 'Training', to: 'Automotive', value: 10800 },
  { from: 'Training', to: 'Construction', value: 8900 },
  { from: 'Training', to: 'Renewable Energy', value: 5200 },
  { from: 'Training', to: 'Textile', value: 4100 },
];
