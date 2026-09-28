// ===== Core Types =====

export type UserRole = 'government' | 'trainee' | 'employer' | 'institution';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// ===== Government Types =====

export interface DistrictMetric {
  district: string;
  enrolled: number;
  certified: number;
  placed: number;
  avgWage: number;
  retentionRate: number;
  completionRate: number;
}

export interface SkillGap {
  id: string;
  skillName: string;
  demand: number;
  supply: number;
  gap: number;
  gapPercent: number;
  sector: string;
  district: string;
  trend: 'increasing' | 'stable' | 'decreasing';
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface TrainingProgram {
  id: string;
  name: string;
  sector: string;
  provider: string;
  district: string;
  totalSeats: number;
  enrolled: number;
  completed: number;
  certified: number;
  placed: number;
  avgWageAfter: number;
  status: 'active' | 'completed' | 'upcoming';
  startDate: string;
  endDate: string;
  completionRate: number;
  placementRate: number;
  budget: number;
  spent: number;
}

export interface PolicySimulation {
  id: string;
  name: string;
  parameter: string;
  currentValue: number;
  simulatedValue: number;
  projectedImpact: {
    employment: number;
    wages: number;
    enrollment: number;
    certification: number;
  };
}

export interface GovernmentDashboardData {
  totalTrainees: number;
  totalCertified: number;
  totalPlaced: number;
  avgWage: number;
  totalPrograms: number;
  totalBudget: number;
  budgetUtilized: number;
  retentionRate: number;
  enrollmentTrend: TrendDataPoint[];
  placementTrend: TrendDataPoint[];
  wageTrend: TrendDataPoint[];
  sectorDistribution: SectorData[];
  districtMetrics: DistrictMetric[];
  topSkillGaps: SkillGap[];
}

// ===== Trainee Types =====

export interface Trainee {
  id: string;
  name: string;
  aadhaarLast4: string;
  district: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  education: string;
  phone: string;
  enrolledPrograms: EnrolledProgram[];
  skills: TraineeSkill[];
  certifications: Certification[];
  employmentHistory: Employment[];
  currentStatus: 'enrolled' | 'certified' | 'employed' | 'seeking';
}

export interface EnrolledProgram {
  programId: string;
  programName: string;
  provider: string;
  sector: string;
  enrollDate: string;
  completionDate?: string;
  status: 'in-progress' | 'completed' | 'dropped';
  progress: number;
  grade?: string;
}

export interface TraineeSkill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verifiedBy?: string;
  verifiedDate?: string;
  category: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'revoked';
  credentialId: string;
  sector: string;
}

export interface Employment {
  id: string;
  employer: string;
  role: string;
  startDate: string;
  endDate?: string;
  wage: number;
  wageType: 'monthly' | 'daily';
  status: 'active' | 'ended';
  district: string;
  sector: string;
}

export interface TraineeDashboardData {
  profile: Trainee;
  recommendedJobs: Job[];
  upcomingDeadlines: Deadline[];
  skillProgress: SkillProgress[];
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'submission' | 'enrollment' | 'renewal';
}

export interface SkillProgress {
  skill: string;
  current: number;
  target: number;
  category: string;
}

// ===== Employer Types =====

export interface Employer {
  id: string;
  companyName: string;
  industry: string;
  district: string;
  contactPerson: string;
  email: string;
  phone: string;
  totalHired: number;
  activeJobs: number;
  verificationStatus: 'verified' | 'pending' | 'rejected';
}

export interface Job {
  id: string;
  title: string;
  employer: string;
  employerId: string;
  sector: string;
  district: string;
  wageMin: number;
  wageMax: number;
  wageType: 'monthly' | 'daily';
  requiredSkills: string[];
  requiredCertifications: string[];
  experience: string;
  education: string;
  positions: number;
  filled: number;
  status: 'open' | 'closed' | 'paused';
  postedDate: string;
  deadline: string;
  description: string;
  type: 'full-time' | 'part-time' | 'contract' | 'apprenticeship';
}

export interface Candidate {
  id: string;
  traineeId: string;
  name: string;
  skills: string[];
  certifications: string[];
  matchScore: number;
  experience: string;
  education: string;
  district: string;
  status: 'applied' | 'shortlisted' | 'interviewed' | 'offered' | 'hired' | 'rejected';
  appliedDate: string;
}

export interface VerificationRequest {
  id: string;
  traineeId: string;
  traineeName: string;
  certificateId: string;
  certificateName: string;
  issuer: string;
  requestDate: string;
  status: 'pending' | 'verified' | 'failed';
  verifiedDate?: string;
}

export interface EmployerDashboardData {
  totalHired: number;
  activeJobs: number;
  pendingApplications: number;
  avgTimeToHire: number;
  hiringTrend: TrendDataPoint[];
  topSkills: SkillDemand[];
  recentApplications: Candidate[];
}

// ===== Shared Types =====

export interface TrendDataPoint {
  month: string;
  value: number;
  label?: string;
}

export interface SectorData {
  sector: string;
  count: number;
  percentage: number;
  color: string;
}

export interface SkillDemand {
  skill: string;
  demand: number;
  available: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
}
