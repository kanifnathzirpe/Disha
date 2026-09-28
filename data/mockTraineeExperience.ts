export interface TraineeProfile {
  id: string;
  name: string;
  skillId: string;
  district: string;
  role: string;
  status: 'employed' | 'seeking' | 'training' | 'certified';
  salaryRange: string;
  retention90d: 'completed' | 'pending' | 'upcoming';
  retention180d: 'completed' | 'pending' | 'upcoming';
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  progress: number;
  category: string;
}

export interface SkillGap {
  targetRole: string;
  missingSkills: string[];
  recommendedCourse: string;
  duration: string;
  provider: string;
}

export interface JobRecommendation {
  id: string;
  title: string;
  salaryRange: string;
  district: string;
  matchScore: number;
  employer: string;
  type: 'full-time' | 'contract';
  matchedSkills: string[];
  missingSkills: string[];
  experienceMatch: 'strong' | 'moderate' | 'weak';
  locationMatch: 'strong' | 'moderate' | 'weak';
}

export interface Employment {
  employer: string;
  role: string;
  startDate: string;
  salary: string;
  verification: 'verified' | 'pending' | 'failed';
  outcomeConfidence: number;
}

export interface WageProgression {
  period: string;
  wage: number;
}

export interface TimelineItem {
  id: string;
  label: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  date?: string;
}

export const traineeProfile: TraineeProfile = {
  id: 'TRN-001',
  name: 'Rahul Sharma',
  skillId: 'MH-PN-10234',
  district: 'Pune',
  role: 'CNC Technician',
  status: 'employed',
  salaryRange: '₹20K–₹25K',
  retention90d: 'completed',
  retention180d: 'upcoming',
};

export const skillPassport: Skill[] = [
  { name: 'CNC', level: 'advanced', progress: 85, category: 'Manufacturing' },
  { name: 'AutoCAD', level: 'intermediate', progress: 65, category: 'Design' },
  { name: 'Machine Operation', level: 'advanced', progress: 80, category: 'Manufacturing' },
  { name: 'G-Code', level: 'beginner', progress: 35, category: 'Programming' },
  { name: 'CAM', level: 'beginner', progress: 25, category: 'Programming' },
];

export const skillGap: SkillGap = {
  targetRole: 'CNC Programmer',
  missingSkills: ['G-Code', 'CAM'],
  recommendedCourse: 'Advanced CNC Programming',
  duration: '4 weeks',
  provider: 'TechForward Training',
};

export const jobRecommendations: JobRecommendation[] = [
  {
    id: 'JOB001',
    title: 'CNC Technician',
    salaryRange: '₹18K–₹24K',
    district: 'Pune',
    matchScore: 92,
    employer: 'Precision Manufacturing Ltd',
    type: 'full-time',
    matchedSkills: ['CNC', 'AutoCAD', 'Machine Operation'],
    missingSkills: ['G-Code'],
    experienceMatch: 'strong',
    locationMatch: 'strong',
  },
  {
    id: 'JOB002',
    title: 'EV Technician',
    salaryRange: '₹20K–₹28K',
    district: 'Pune',
    matchScore: 76,
    employer: 'Green Auto Solutions',
    type: 'full-time',
    matchedSkills: ['Machine Operation'],
    missingSkills: ['EV Diagnostics', 'Battery Systems'],
    experienceMatch: 'moderate',
    locationMatch: 'strong',
  },
  {
    id: 'JOB003',
    title: 'PLC Operator',
    salaryRange: '₹22K–₹30K',
    district: 'Nashik',
    matchScore: 68,
    employer: 'Industrial Automation Corp',
    type: 'full-time',
    matchedSkills: ['Machine Operation'],
    missingSkills: ['PLC Programming', 'Ladder Logic'],
    experienceMatch: 'moderate',
    locationMatch: 'weak',
  },
];

export const currentEmployment: Employment = {
  employer: 'ABC Manufacturing',
  role: 'CNC Technician',
  startDate: '12 May 2026',
  salary: '₹20K–₹25K',
  verification: 'verified',
  outcomeConfidence: 85,
};

export const wageProgression: WageProgression[] = [
  { period: 'Starting', wage: 14000 },
  { period: '3 Months', wage: 15000 },
  { period: '6 Months', wage: 17000 },
  { period: '12 Months', wage: 20000 },
];

export const skillJourney: TimelineItem[] = [
  { id: '1', label: 'Enrollment', status: 'completed', date: '15 Jan 2026' },
  { id: '2', label: 'Training Completed', status: 'completed', date: '15 Apr 2026' },
  { id: '3', label: 'Assessment', status: 'completed', date: '20 Apr 2026' },
  { id: '4', label: 'Certification', status: 'completed', date: '25 Apr 2026' },
  { id: '5', label: 'Employment', status: 'completed', date: '12 May 2026' },
  { id: '6', label: '90D Retention', status: 'completed', date: '10 Aug 2026' },
  { id: '7', label: '180D Retention', status: 'upcoming', date: '10 Nov 2026' },
];
