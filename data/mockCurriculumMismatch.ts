// Feature 8: Curriculum–Industry Mismatch Data

export interface CurriculumSkill {
  name: string;
  hoursAllocated: number;
  coverage: 'full' | 'partial' | 'none';
  industryRelevance: 'high' | 'medium' | 'low' | 'obsolete';
}

export interface IndustrySkill {
  name: string;
  demandLevel: 'critical' | 'high' | 'medium' | 'low';
  jobPostings: number;
  avgWage: number;
  taughtInCurriculum: boolean;
  coveragePercent: number;
}

export interface CurriculumAnalysis {
  programId: string;
  programName: string;
  provider: string;
  sector: string;
  district: string;
  overallMatch: number; // percentage
  totalSkillsTaught: number;
  skillsAlignedWithIndustry: number;
  missingCriticalSkills: string[];
  obsoleteSkills: string[];
  curriculumSkills: CurriculumSkill[];
  industrySkills: IndustrySkill[];
  recommendations: string[];
  lastUpdated: string;
}

export const curriculumAnalyses: CurriculumAnalysis[] = [
  {
    programId: 'CUR-001',
    programName: 'PMKVY — CNC Operator Training',
    provider: 'Maharashtra ITI Network',
    sector: 'Manufacturing',
    district: 'Pune',
    overallMatch: 61,
    totalSkillsTaught: 12,
    skillsAlignedWithIndustry: 8,
    missingCriticalSkills: ['CAM Software', 'Industry 4.0 / IoT', 'Multi-Axis Machining', 'CNC Simulation Software'],
    obsoleteSkills: ['Manual Drafting (excessive hours)', 'Slide Rule Calculations'],
    curriculumSkills: [
      { name: 'Manual Lathe Operations', hoursAllocated: 60, coverage: 'full', industryRelevance: 'medium' },
      { name: 'G-Code Programming', hoursAllocated: 40, coverage: 'full', industryRelevance: 'high' },
      { name: 'Precision Measurement', hoursAllocated: 30, coverage: 'full', industryRelevance: 'high' },
      { name: 'Workshop Safety', hoursAllocated: 20, coverage: 'full', industryRelevance: 'high' },
      { name: 'Blueprint Reading', hoursAllocated: 25, coverage: 'full', industryRelevance: 'high' },
      { name: 'CNC Turning', hoursAllocated: 50, coverage: 'full', industryRelevance: 'high' },
      { name: 'CNC Milling', hoursAllocated: 40, coverage: 'full', industryRelevance: 'high' },
      { name: 'Quality Control', hoursAllocated: 20, coverage: 'partial', industryRelevance: 'high' },
      { name: 'AutoCAD Basics', hoursAllocated: 15, coverage: 'partial', industryRelevance: 'high' },
      { name: 'Manual Drafting', hoursAllocated: 30, coverage: 'full', industryRelevance: 'low' },
      { name: 'Material Science Basics', hoursAllocated: 15, coverage: 'partial', industryRelevance: 'medium' },
      { name: 'Slide Rule Calculations', hoursAllocated: 10, coverage: 'full', industryRelevance: 'obsolete' },
    ],
    industrySkills: [
      { name: 'CNC Programming (G-Code)', demandLevel: 'critical', jobPostings: 342, avgWage: 22000, taughtInCurriculum: true, coveragePercent: 75 },
      { name: 'CAM Software (MasterCAM/Fusion)', demandLevel: 'critical', jobPostings: 280, avgWage: 25000, taughtInCurriculum: false, coveragePercent: 0 },
      { name: 'Quality Control (SPC)', demandLevel: 'high', jobPostings: 220, avgWage: 20000, taughtInCurriculum: true, coveragePercent: 40 },
      { name: 'AutoCAD / Solid Edge', demandLevel: 'high', jobPostings: 195, avgWage: 21000, taughtInCurriculum: true, coveragePercent: 30 },
      { name: 'Multi-Axis Machining', demandLevel: 'high', jobPostings: 180, avgWage: 28000, taughtInCurriculum: false, coveragePercent: 0 },
      { name: 'Precision Measurement', demandLevel: 'high', jobPostings: 310, avgWage: 18000, taughtInCurriculum: true, coveragePercent: 85 },
      { name: 'Industry 4.0 / IoT Basics', demandLevel: 'high', jobPostings: 160, avgWage: 24000, taughtInCurriculum: false, coveragePercent: 0 },
      { name: 'CNC Simulation Software', demandLevel: 'medium', jobPostings: 120, avgWage: 22000, taughtInCurriculum: false, coveragePercent: 0 },
      { name: 'Tool Path Optimization', demandLevel: 'medium', jobPostings: 95, avgWage: 24000, taughtInCurriculum: false, coveragePercent: 0 },
      { name: 'GD&T Standards', demandLevel: 'medium', jobPostings: 140, avgWage: 20000, taughtInCurriculum: true, coveragePercent: 25 },
    ],
    recommendations: [
      'Add CAM software module (MasterCAM or Fusion 360) — 40 hours',
      'Introduce Industry 4.0 basics and IoT sensor integration — 20 hours',
      'Reduce manual drafting from 30 to 10 hours, reallocate to AutoCAD',
      'Remove slide rule calculations module entirely',
      'Add CNC simulation software training — 15 hours',
      'Expand SPC / Statistical Quality Control content',
    ],
    lastUpdated: '2026-09-15',
  },
  {
    programId: 'CUR-002',
    programName: 'MSSDS — Full Stack Developer',
    provider: 'CDAC Pune',
    sector: 'IT/ITES',
    district: 'Pune',
    overallMatch: 82,
    totalSkillsTaught: 14,
    skillsAlignedWithIndustry: 12,
    missingCriticalSkills: ['Cloud Deployment (AWS/GCP)', 'TypeScript'],
    obsoleteSkills: ['jQuery (excessive focus)'],
    curriculumSkills: [
      { name: 'HTML5 & CSS3', hoursAllocated: 30, coverage: 'full', industryRelevance: 'high' },
      { name: 'JavaScript ES6+', hoursAllocated: 60, coverage: 'full', industryRelevance: 'high' },
      { name: 'React.js', hoursAllocated: 50, coverage: 'full', industryRelevance: 'high' },
      { name: 'Node.js & Express', hoursAllocated: 40, coverage: 'full', industryRelevance: 'high' },
      { name: 'SQL & PostgreSQL', hoursAllocated: 30, coverage: 'full', industryRelevance: 'high' },
      { name: 'MongoDB', hoursAllocated: 20, coverage: 'partial', industryRelevance: 'medium' },
      { name: 'Git & Version Control', hoursAllocated: 10, coverage: 'full', industryRelevance: 'high' },
      { name: 'REST API Design', hoursAllocated: 20, coverage: 'full', industryRelevance: 'high' },
      { name: 'Authentication & Security', hoursAllocated: 15, coverage: 'partial', industryRelevance: 'high' },
      { name: 'jQuery', hoursAllocated: 20, coverage: 'full', industryRelevance: 'low' },
      { name: 'Testing Basics', hoursAllocated: 10, coverage: 'partial', industryRelevance: 'high' },
      { name: 'Agile / Scrum', hoursAllocated: 10, coverage: 'full', industryRelevance: 'high' },
      { name: 'Deployment Basics', hoursAllocated: 10, coverage: 'partial', industryRelevance: 'high' },
      { name: 'Capstone Project', hoursAllocated: 60, coverage: 'full', industryRelevance: 'high' },
    ],
    industrySkills: [
      { name: 'React.js / Next.js', demandLevel: 'critical', jobPostings: 480, avgWage: 30000, taughtInCurriculum: true, coveragePercent: 80 },
      { name: 'Node.js', demandLevel: 'critical', jobPostings: 420, avgWage: 28000, taughtInCurriculum: true, coveragePercent: 75 },
      { name: 'TypeScript', demandLevel: 'high', jobPostings: 380, avgWage: 32000, taughtInCurriculum: false, coveragePercent: 0 },
      { name: 'SQL / PostgreSQL', demandLevel: 'high', jobPostings: 350, avgWage: 26000, taughtInCurriculum: true, coveragePercent: 85 },
      { name: 'Git & CI/CD', demandLevel: 'high', jobPostings: 320, avgWage: 28000, taughtInCurriculum: true, coveragePercent: 60 },
      { name: 'Cloud (AWS/GCP)', demandLevel: 'high', jobPostings: 290, avgWage: 35000, taughtInCurriculum: false, coveragePercent: 0 },
      { name: 'REST / GraphQL APIs', demandLevel: 'high', jobPostings: 300, avgWage: 28000, taughtInCurriculum: true, coveragePercent: 70 },
      { name: 'Testing (Jest/Cypress)', demandLevel: 'medium', jobPostings: 200, avgWage: 26000, taughtInCurriculum: true, coveragePercent: 30 },
    ],
    recommendations: [
      'Add TypeScript module — 20 hours (extremely high industry demand)',
      'Add Cloud deployment basics (AWS EC2, S3, Lambda) — 15 hours',
      'Reduce jQuery from 20 to 5 hours, reallocate to TypeScript and Cloud',
      'Expand testing coverage from 10 to 20 hours',
      'Add GraphQL basics alongside REST APIs',
    ],
    lastUpdated: '2026-09-20',
  },
  {
    programId: 'CUR-003',
    programName: 'State Skill Mission — EV Repair',
    provider: 'Tata STRIVE',
    sector: 'Automotive',
    district: 'Pune',
    overallMatch: 74,
    totalSkillsTaught: 10,
    skillsAlignedWithIndustry: 8,
    missingCriticalSkills: ['ADAS Systems', 'Software Diagnostics'],
    obsoleteSkills: [],
    curriculumSkills: [
      { name: 'EV Architecture', hoursAllocated: 30, coverage: 'full', industryRelevance: 'high' },
      { name: 'Battery Management Systems', hoursAllocated: 40, coverage: 'full', industryRelevance: 'high' },
      { name: 'Electric Motor Repair', hoursAllocated: 35, coverage: 'full', industryRelevance: 'high' },
      { name: 'High Voltage Safety', hoursAllocated: 20, coverage: 'full', industryRelevance: 'high' },
      { name: 'Charging Infrastructure', hoursAllocated: 15, coverage: 'partial', industryRelevance: 'high' },
      { name: 'Diagnostic Tools (OBD-II)', hoursAllocated: 25, coverage: 'full', industryRelevance: 'high' },
      { name: 'Regenerative Braking', hoursAllocated: 15, coverage: 'full', industryRelevance: 'high' },
      { name: 'Thermal Management', hoursAllocated: 15, coverage: 'partial', industryRelevance: 'high' },
      { name: 'Basic Electrical Theory', hoursAllocated: 20, coverage: 'full', industryRelevance: 'medium' },
      { name: 'Workshop Practice', hoursAllocated: 40, coverage: 'full', industryRelevance: 'high' },
    ],
    industrySkills: [
      { name: 'Battery Management Systems', demandLevel: 'critical', jobPostings: 220, avgWage: 24000, taughtInCurriculum: true, coveragePercent: 80 },
      { name: 'HV Safety & Protocols', demandLevel: 'critical', jobPostings: 200, avgWage: 22000, taughtInCurriculum: true, coveragePercent: 90 },
      { name: 'EV Diagnostics', demandLevel: 'critical', jobPostings: 280, avgWage: 24000, taughtInCurriculum: true, coveragePercent: 70 },
      { name: 'Electric Motor Repair', demandLevel: 'high', jobPostings: 180, avgWage: 22000, taughtInCurriculum: true, coveragePercent: 75 },
      { name: 'ADAS Systems', demandLevel: 'high', jobPostings: 150, avgWage: 28000, taughtInCurriculum: false, coveragePercent: 0 },
      { name: 'Software Diagnostics / CAN Bus', demandLevel: 'high', jobPostings: 140, avgWage: 26000, taughtInCurriculum: false, coveragePercent: 0 },
      { name: 'Charging Infrastructure', demandLevel: 'medium', jobPostings: 120, avgWage: 20000, taughtInCurriculum: true, coveragePercent: 50 },
    ],
    recommendations: [
      'Add ADAS systems basics module — 20 hours',
      'Add CAN Bus / software diagnostics training — 15 hours',
      'Expand charging infrastructure to cover DC fast charging — 10 more hours',
      'Add V2G (Vehicle-to-Grid) concepts — 5 hours',
    ],
    lastUpdated: '2026-09-22',
  },
];

export const mismatchSummary = {
  totalProgramsAnalyzed: 48,
  avgMatchScore: 64,
  programsBelowThreshold: 18,
  criticalGapsFound: 34,
  obsoleteSkillsFound: 12,
  recommendationsGenerated: 96,
};
