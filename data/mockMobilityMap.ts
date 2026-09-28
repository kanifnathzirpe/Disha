// Feature 10: Training → Employment Mobility Map Data

export interface MobilityFlow {
  from: string;
  to: string;
  trainees: number;
  sector: string;
  avgWage: number;
  avgDistance: number; // km
  retentionRate: number;
}

export interface DistrictMobilityData {
  district: string;
  trainedLocally: number;
  employedLocally: number;
  outMigration: number;
  inMigration: number;
  netFlow: number;
  trainingCentres: number;
  employers: number;
  geographicMismatch: 'severe' | 'moderate' | 'low' | 'balanced';
}

export const mobilityFlows: MobilityFlow[] = [
  // FROM Pune
  { from: 'Pune', to: 'Mumbai', trainees: 1200, sector: 'IT/ITES', avgWage: 28000, avgDistance: 150, retentionRate: 72 },
  { from: 'Pune', to: 'Nashik', trainees: 340, sector: 'Manufacturing', avgWage: 18000, avgDistance: 210, retentionRate: 68 },
  // FROM Nashik
  { from: 'Nashik', to: 'Pune', trainees: 820, sector: 'Automotive', avgWage: 22000, avgDistance: 210, retentionRate: 65 },
  { from: 'Nashik', to: 'Mumbai', trainees: 340, sector: 'IT/ITES', avgWage: 26000, avgDistance: 180, retentionRate: 60 },
  // FROM Nagpur
  { from: 'Nagpur', to: 'Pune', trainees: 600, sector: 'Manufacturing', avgWage: 20000, avgDistance: 720, retentionRate: 58 },
  { from: 'Nagpur', to: 'Mumbai', trainees: 400, sector: 'IT/ITES', avgWage: 24000, avgDistance: 840, retentionRate: 52 },
  // FROM Chhatrapati Sambhajinagar
  { from: 'Chhatrapati Sambhajinagar', to: 'Pune', trainees: 920, sector: 'Manufacturing', avgWage: 18000, avgDistance: 240, retentionRate: 62 },
  { from: 'Chhatrapati Sambhajinagar', to: 'Mumbai', trainees: 680, sector: 'IT/ITES', avgWage: 20000, avgDistance: 330, retentionRate: 55 },
  // FROM Kolhapur
  { from: 'Kolhapur', to: 'Pune', trainees: 680, sector: 'Manufacturing', avgWage: 17000, avgDistance: 230, retentionRate: 64 },
  { from: 'Kolhapur', to: 'Mumbai', trainees: 380, sector: 'Healthcare', avgWage: 16000, avgDistance: 380, retentionRate: 58 },
  // FROM Solapur
  { from: 'Solapur', to: 'Pune', trainees: 720, sector: 'Textile', avgWage: 15000, avgDistance: 260, retentionRate: 60 },
  { from: 'Solapur', to: 'Mumbai', trainees: 280, sector: 'Construction', avgWage: 16000, avgDistance: 400, retentionRate: 54 },
  // FROM Thane
  { from: 'Thane', to: 'Mumbai', trainees: 1800, sector: 'IT/ITES', avgWage: 22000, avgDistance: 35, retentionRate: 78 },
  { from: 'Thane', to: 'Pune', trainees: 400, sector: 'Manufacturing', avgWage: 19000, avgDistance: 160, retentionRate: 66 },
  // IN Migrations
  { from: 'Mumbai', to: 'Pune', trainees: 800, sector: 'Manufacturing', avgWage: 20000, avgDistance: 150, retentionRate: 74 },
  { from: 'Mumbai', to: 'Thane', trainees: 1400, sector: 'Textile', avgWage: 18000, avgDistance: 35, retentionRate: 76 },
];

export const districtMobilityData: DistrictMobilityData[] = [
  { district: 'Pune', trainedLocally: 15420, employedLocally: 9800, outMigration: 1540, inMigration: 3220, netFlow: 1680, trainingCentres: 48, employers: 342, geographicMismatch: 'low' },
  { district: 'Mumbai', trainedLocally: 18200, employedLocally: 12400, outMigration: 2200, inMigration: 4900, netFlow: 2700, trainingCentres: 62, employers: 520, geographicMismatch: 'low' },
  { district: 'Nagpur', trainedLocally: 8900, employedLocally: 4200, outMigration: 1150, inMigration: 270, netFlow: -880, trainingCentres: 28, employers: 180, geographicMismatch: 'severe' },
  { district: 'Nashik', trainedLocally: 6700, employedLocally: 3400, outMigration: 1280, inMigration: 460, netFlow: -820, trainingCentres: 22, employers: 145, geographicMismatch: 'moderate' },
  { district: 'Chhatrapati Sambhajinagar', trainedLocally: 5800, employedLocally: 2600, outMigration: 1820, inMigration: 320, netFlow: -1500, trainingCentres: 18, employers: 120, geographicMismatch: 'severe' },
  { district: 'Thane', trainedLocally: 9200, employedLocally: 5800, outMigration: 2200, inMigration: 1400, netFlow: -800, trainingCentres: 35, employers: 280, geographicMismatch: 'moderate' },
  { district: 'Kolhapur', trainedLocally: 4500, employedLocally: 2100, outMigration: 1140, inMigration: 160, netFlow: -980, trainingCentres: 15, employers: 95, geographicMismatch: 'severe' },
  { district: 'Solapur', trainedLocally: 3800, employedLocally: 1600, outMigration: 1080, inMigration: 120, netFlow: -960, trainingCentres: 12, employers: 72, geographicMismatch: 'severe' },
];

export const mobilitySummary = {
  totalOutMigration: 12410,
  totalInMigration: 10850,
  avgMigrationDistance: 245,
  retentionImpact: 'Trainees migrating >200km show 18% lower 90-day retention',
  topCorridor: 'Chhatrapati Sambhajinagar → Pune (920 trainees)',
  highestMismatch: 'Chhatrapati Sambhajinagar (net outflow: -1,500)',
};
