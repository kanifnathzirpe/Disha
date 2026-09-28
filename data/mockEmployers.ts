import type { Employer, Candidate, VerificationRequest, EmployerDashboardData, TrendDataPoint, SkillDemand } from '@/types';

export const employers: Employer[] = [
  { id: 'EMP001', companyName: 'ABC Manufacturing', industry: 'Manufacturing', district: 'Pune', contactPerson: 'Rajesh Sharma', email: 'hr@abcmfg.com', phone: '020-XXXXXXX', totalHired: 9, activeJobs: 12, verificationStatus: 'verified' },
  { id: 'EMP002', companyName: 'Bajaj Auto Ltd.', industry: 'Automotive / Manufacturing', district: 'Pune', contactPerson: 'Rajesh Sharma', email: 'hr@bajaj.com', phone: '020-XXXXXXX', totalHired: 120, activeJobs: 3, verificationStatus: 'verified' },
  { id: 'EMP003', companyName: 'Infosys Ltd.', industry: 'IT/ITES', district: 'Pune', contactPerson: 'Meera Kulkarni', email: 'campus@infosys.com', phone: '020-XXXXXXX', totalHired: 85, activeJobs: 2, verificationStatus: 'verified' },
  { id: 'EMP004', companyName: 'Apollo Hospitals', industry: 'Healthcare', district: 'Mumbai', contactPerson: 'Dr. Sunil Rao', email: 'hr@apollo.com', phone: '022-XXXXXXX', totalHired: 45, activeJobs: 2, verificationStatus: 'verified' },
  { id: 'EMP005', companyName: 'Tata Power Solar', industry: 'Renewable Energy', district: 'Nashik', contactPerson: 'Anand Bhosale', email: 'recruit@tatasolar.com', phone: '0253-XXXXXXX', totalHired: 30, activeJobs: 1, verificationStatus: 'verified' },
  { id: 'EMP006', companyName: 'L&T Construction', industry: 'Construction', district: 'Nagpur', contactPerson: 'Suresh Wankhede', email: 'talent@lt.com', phone: '0712-XXXXXXX', totalHired: 150, activeJobs: 4, verificationStatus: 'verified' },
  { id: 'EMP007', companyName: 'TCS iON', industry: 'IT/ITES', district: 'Aurangabad', contactPerson: 'Pooja Desai', email: 'ion.hr@tcs.com', phone: '0240-XXXXXXX', totalHired: 200, activeJobs: 3, verificationStatus: 'verified' },
  { id: 'EMP008', companyName: 'Mahindra Electric', industry: 'Automotive', district: 'Pune', contactPerson: 'Vikram Joshi', email: 'ev.hr@mahindra.com', phone: '020-XXXXXXX', totalHired: 15, activeJobs: 1, verificationStatus: 'verified' },
  { id: 'EMP009', companyName: 'Raymond Ltd.', industry: 'Textile', district: 'Thane', contactPerson: 'Nisha Pawar', email: 'hr@raymond.com', phone: '022-XXXXXXX', totalHired: 65, activeJobs: 2, verificationStatus: 'verified' },
  { id: 'EMP010', companyName: 'Mahanand Dairy', industry: 'Agriculture / Food', district: 'Kolhapur', contactPerson: 'Sanjay Chavan', email: 'hr@mahanand.coop', phone: '0231-XXXXXXX', totalHired: 40, activeJobs: 1, verificationStatus: 'pending' },
  { id: 'EMP011', companyName: 'Tech Mahindra', industry: 'IT/ITES', district: 'Mumbai', contactPerson: 'Arti Nair', email: 'campus@techmahindra.com', phone: '022-XXXXXXX', totalHired: 95, activeJobs: 2, verificationStatus: 'verified' },
];

export const candidates: Candidate[] = [
  { id: 'CA001', traineeId: 'TR006', name: 'Rahul Sharma', skills: ['CNC', 'AutoCAD', 'Machine Operation', 'G-Code'], certifications: ['PMKVY CNC Operator Level 5'], matchScore: 92, experience: '1 year (Machinist Trainee)', education: 'Diploma (Mechanical)', district: 'Pune', status: 'shortlisted', appliedDate: '2026-09-18' },
  { id: 'CA002', traineeId: 'TR001', name: 'Amit Patil', skills: ['CNC', 'AutoCAD', 'Machine Operation'], certifications: ['PMKVY CNC Operator Level 4'], matchScore: 89, experience: '6 months (Trainee)', education: 'ITI (Mechanical)', district: 'Pune', status: 'applied', appliedDate: '2026-09-20' },
  { id: 'CA003', traineeId: 'TR002', name: 'Sneha Jadhav', skills: ['CNC', 'Machine Operation'], certifications: ['PMKVY CNC Operator Level 3'], matchScore: 84, experience: 'Fresher', education: '12th Pass', district: 'Pune', status: 'applied', appliedDate: '2026-09-22' },
  { id: 'CA004', traineeId: 'TR005', name: 'Priya Deshmukh', skills: ['JavaScript', 'React.js', 'Node.js', 'SQL'], certifications: ['CDAC Full Stack Developer Certificate'], matchScore: 95, experience: '1 month (Junior Developer)', education: '12th Pass (Science)', district: 'Pune', status: 'hired', appliedDate: '2026-08-10' },
  { id: 'CA005', traineeId: 'TR004', name: 'Kavita More', skills: ['Data Entry', 'MS Office', 'Tally ERP'], certifications: ['DDUGKY Data Entry Operator Certificate'], matchScore: 85, experience: '9 months (Data Processing Executive)', education: '12th Pass (Commerce)', district: 'Aurangabad', status: 'interviewed', appliedDate: '2026-09-15' },
];

export const verificationRequests: VerificationRequest[] = [
  { id: 'VR001', traineeId: 'TR001', traineeName: 'Priya Deshmukh', certificateId: 'CDAC-FS-2026-0142', certificateName: 'CDAC Full Stack Developer Certificate', issuer: 'CDAC Pune', requestDate: '2026-08-05', status: 'verified', verifiedDate: '2026-08-06' },
  { id: 'VR002', traineeId: 'TR002', traineeName: 'Rahul Jadhav', certificateId: 'PMKVY-WS-2026-0891', certificateName: 'PMKVY Welding Specialist Level 4', issuer: 'NSDC', requestDate: '2026-09-22', status: 'pending' },
  { id: 'VR003', traineeId: 'TR005', traineeName: 'Kavita More', certificateId: 'DDU-DEO-2025-5678', certificateName: 'DDUGKY Data Entry Operator Certificate', issuer: 'MoRD', requestDate: '2026-09-15', status: 'verified', verifiedDate: '2026-09-16' },
  { id: 'VR004', traineeId: 'TR006', traineeName: 'Mangesh Kulkarni', certificateId: 'PMKVY-CNC-2026-2345', certificateName: 'PMKVY CNC Operator Level 5', issuer: 'NSDC', requestDate: '2026-09-18', status: 'pending' },
  { id: 'VR005', traineeId: 'TR004', traineeName: 'Amit Shinde', certificateId: 'NCVT-EL-2025-9012', certificateName: 'NCVT Electrician Certificate', issuer: 'NCVT', requestDate: '2026-09-25', status: 'verified', verifiedDate: '2026-09-25' },
];

const hiringTrend: TrendDataPoint[] = [
  { month: 'Oct 2025', value: 12 },
  { month: 'Nov 2025', value: 15 },
  { month: 'Dec 2025', value: 8 },
  { month: 'Jan 2026', value: 18 },
  { month: 'Feb 2026', value: 22 },
  { month: 'Mar 2026', value: 20 },
  { month: 'Apr 2026', value: 25 },
  { month: 'May 2026', value: 28 },
  { month: 'Jun 2026', value: 24 },
  { month: 'Jul 2026', value: 30 },
  { month: 'Aug 2026', value: 32 },
  { month: 'Sep 2026', value: 35 },
];

const topSkills: SkillDemand[] = [
  { skill: 'CNC Programming', demand: 45, available: 18 },
  { skill: 'JavaScript', demand: 62, available: 31 },
  { skill: 'Welding (SMAW)', demand: 38, available: 23 },
  { skill: 'Data Entry', demand: 50, available: 35 },
  { skill: 'Solar Installation', demand: 28, available: 8 },
  { skill: 'Healthcare Assist.', demand: 35, available: 17 },
];

export const employerDashboard: EmployerDashboardData = {
  totalHired: 9,
  activeJobs: 12,
  pendingApplications: 148,
  avgTimeToHire: 14,
  hiringTrend,
  topSkills,
  recentApplications: candidates.slice(0, 5),
};
