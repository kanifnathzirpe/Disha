import type { Trainee, TraineeDashboardData, Deadline, SkillProgress } from '@/types';
import { mockJobs } from './mockJobs';

export const trainees: Trainee[] = [
  {
    id: 'TR001',
    name: 'Priya Deshmukh',
    aadhaarLast4: '4523',
    district: 'Pune',
    age: 23,
    gender: 'female',
    education: '12th Pass (Science)',
    phone: '98765XXXXX',
    currentStatus: 'employed',
    enrolledPrograms: [
      {
        programId: 'tp2', programName: 'MSSDS – Full Stack Developer', provider: 'CDAC Pune',
        sector: 'IT/ITES', enrollDate: '2026-02-01', completionDate: '2026-08-01',
        status: 'completed', progress: 100, grade: 'A',
      },
    ],
    skills: [
      { id: 'sk1', name: 'JavaScript', level: 'advanced', verifiedBy: 'CDAC Pune', verifiedDate: '2026-07-20', category: 'Programming' },
      { id: 'sk2', name: 'React.js', level: 'intermediate', verifiedBy: 'CDAC Pune', verifiedDate: '2026-07-20', category: 'Programming' },
      { id: 'sk3', name: 'Node.js', level: 'intermediate', verifiedBy: 'CDAC Pune', verifiedDate: '2026-07-20', category: 'Programming' },
      { id: 'sk4', name: 'SQL', level: 'intermediate', verifiedBy: 'CDAC Pune', verifiedDate: '2026-07-20', category: 'Database' },
    ],
    certifications: [
      { id: 'c1', name: 'CDAC Full Stack Developer Certificate', issuer: 'CDAC Pune', issueDate: '2026-08-01', status: 'active', credentialId: 'CDAC-FS-2026-0142', sector: 'IT/ITES' },
    ],
    employmentHistory: [
      { id: 'e1', employer: 'Infosys Ltd.', role: 'Junior Developer', startDate: '2026-08-20', wage: 28000, wageType: 'monthly', status: 'active', district: 'Pune', sector: 'IT/ITES' },
    ],
  },
  {
    id: 'TR002',
    name: 'Rahul Jadhav',
    aadhaarLast4: '7891',
    district: 'Nagpur',
    age: 21,
    gender: 'male',
    education: '10th Pass',
    phone: '97654XXXXX',
    currentStatus: 'certified',
    enrolledPrograms: [
      {
        programId: 'tp5', programName: 'PMKVY – Welding Specialist', provider: 'L&T Skill Trainers',
        sector: 'Construction', enrollDate: '2025-08-01', completionDate: '2026-02-01',
        status: 'completed', progress: 100, grade: 'B+',
      },
    ],
    skills: [
      { id: 'sk5', name: 'SMAW Welding', level: 'advanced', verifiedBy: 'L&T Skill Trainers', verifiedDate: '2026-01-25', category: 'Welding' },
      { id: 'sk6', name: 'GMAW Welding', level: 'intermediate', verifiedBy: 'L&T Skill Trainers', verifiedDate: '2026-01-25', category: 'Welding' },
      { id: 'sk7', name: 'Blueprint Reading', level: 'intermediate', category: 'Technical' },
    ],
    certifications: [
      { id: 'c2', name: 'PMKVY Welding Specialist Level 4', issuer: 'NSDC', issueDate: '2026-02-01', status: 'active', credentialId: 'PMKVY-WS-2026-0891', sector: 'Construction' },
    ],
    employmentHistory: [],
  },
  {
    id: 'TR003',
    name: 'Sneha Patil',
    aadhaarLast4: '3456',
    district: 'Mumbai',
    age: 25,
    gender: 'female',
    education: 'B.Sc. Nursing',
    phone: '99876XXXXX',
    currentStatus: 'enrolled',
    enrolledPrograms: [
      {
        programId: 'tp3', programName: 'DDUGKY – Healthcare Assistant', provider: 'Symbiosis Health Sciences',
        sector: 'Healthcare', enrollDate: '2026-03-01',
        status: 'in-progress', progress: 65,
      },
    ],
    skills: [
      { id: 'sk8', name: 'Patient Care', level: 'intermediate', category: 'Healthcare' },
      { id: 'sk9', name: 'Vital Signs Monitoring', level: 'beginner', category: 'Healthcare' },
      { id: 'sk10', name: 'First Aid', level: 'advanced', verifiedBy: 'Red Cross', verifiedDate: '2025-06-15', category: 'Healthcare' },
    ],
    certifications: [
      { id: 'c3', name: 'Red Cross First Aid Certificate', issuer: 'Indian Red Cross', issueDate: '2025-06-15', expiryDate: '2027-06-15', status: 'active', credentialId: 'IRC-FA-2025-3456', sector: 'Healthcare' },
    ],
    employmentHistory: [],
  },
  {
    id: 'TR004',
    name: 'Amit Shinde',
    aadhaarLast4: '9012',
    district: 'Nashik',
    age: 20,
    gender: 'male',
    education: 'ITI (Electrician)',
    phone: '98234XXXXX',
    currentStatus: 'enrolled',
    enrolledPrograms: [
      {
        programId: 'tp4', programName: 'NSDC – Solar Technician', provider: 'MEDA Training Centre',
        sector: 'Renewable Energy', enrollDate: '2026-04-01',
        status: 'in-progress', progress: 45,
      },
    ],
    skills: [
      { id: 'sk11', name: 'Electrical Wiring', level: 'advanced', verifiedBy: 'NCVT', verifiedDate: '2025-05-10', category: 'Electrical' },
      { id: 'sk12', name: 'Solar Panel Basics', level: 'beginner', category: 'Renewable Energy' },
    ],
    certifications: [
      { id: 'c4', name: 'NCVT Electrician Certificate', issuer: 'NCVT', issueDate: '2025-05-10', status: 'active', credentialId: 'NCVT-EL-2025-9012', sector: 'Manufacturing' },
    ],
    employmentHistory: [],
  },
  {
    id: 'TR005',
    name: 'Kavita More',
    aadhaarLast4: '5678',
    district: 'Aurangabad',
    age: 22,
    gender: 'female',
    education: '12th Pass (Commerce)',
    phone: '97123XXXXX',
    currentStatus: 'employed',
    enrolledPrograms: [
      {
        programId: 'tp7', programName: 'DDUGKY – Data Entry Operator', provider: 'NIIT Foundation',
        sector: 'IT/ITES', enrollDate: '2025-06-01', completionDate: '2025-12-01',
        status: 'completed', progress: 100, grade: 'A+',
      },
    ],
    skills: [
      { id: 'sk13', name: 'Data Entry', level: 'expert', verifiedBy: 'NIIT Foundation', verifiedDate: '2025-11-20', category: 'IT' },
      { id: 'sk14', name: 'MS Office', level: 'advanced', verifiedBy: 'NIIT Foundation', verifiedDate: '2025-11-20', category: 'IT' },
      { id: 'sk15', name: 'Tally ERP', level: 'intermediate', verifiedBy: 'NIIT Foundation', verifiedDate: '2025-11-20', category: 'Accounting' },
    ],
    certifications: [
      { id: 'c5', name: 'DDUGKY Data Entry Operator Certificate', issuer: 'MoRD', issueDate: '2025-12-01', status: 'active', credentialId: 'DDU-DEO-2025-5678', sector: 'IT/ITES' },
    ],
    employmentHistory: [
      { id: 'e2', employer: 'TCS iON', role: 'Data Processing Executive', startDate: '2026-01-15', wage: 15000, wageType: 'monthly', status: 'active', district: 'Aurangabad', sector: 'IT/ITES' },
    ],
  },
  {
    id: 'TR006',
    name: 'Mangesh Kulkarni',
    aadhaarLast4: '2345',
    district: 'Pune',
    age: 24,
    gender: 'male',
    education: 'Diploma (Mechanical)',
    phone: '98456XXXXX',
    currentStatus: 'seeking',
    enrolledPrograms: [
      {
        programId: 'tp1', programName: 'PMKVY – CNC Operator Training', provider: 'Maharashtra ITI Network',
        sector: 'Manufacturing', enrollDate: '2026-01-15', completionDate: '2026-07-15',
        status: 'completed', progress: 100, grade: 'B',
      },
    ],
    skills: [
      { id: 'sk16', name: 'CNC Programming', level: 'intermediate', verifiedBy: 'Maharashtra ITI', verifiedDate: '2026-07-10', category: 'Manufacturing' },
      { id: 'sk17', name: 'CAD/CAM', level: 'intermediate', verifiedBy: 'Maharashtra ITI', verifiedDate: '2026-07-10', category: 'Design' },
      { id: 'sk18', name: 'Quality Control', level: 'beginner', category: 'Manufacturing' },
    ],
    certifications: [
      { id: 'c6', name: 'PMKVY CNC Operator Level 5', issuer: 'NSDC', issueDate: '2026-07-15', status: 'active', credentialId: 'PMKVY-CNC-2026-2345', sector: 'Manufacturing' },
    ],
    employmentHistory: [
      { id: 'e3', employer: 'Bajaj Auto Ltd.', role: 'Machinist Trainee', startDate: '2025-03-01', endDate: '2025-12-31', wage: 12000, wageType: 'monthly', status: 'ended', district: 'Pune', sector: 'Automotive' },
    ],
  },
];

const deadlines: Deadline[] = [
  { id: 'd1', title: 'Module 5 Assessment – Healthcare Fundamentals', date: '2026-10-05', type: 'exam' },
  { id: 'd2', title: 'Practical Assignment Submission', date: '2026-10-12', type: 'submission' },
  { id: 'd3', title: 'Red Cross First Aid Renewal', date: '2027-06-15', type: 'renewal' },
  { id: 'd4', title: 'NSDC Solar Technician Exam', date: '2026-12-15', type: 'exam' },
];

const skillProgress: SkillProgress[] = [
  { skill: 'Patient Care', current: 65, target: 100, category: 'Healthcare' },
  { skill: 'Vital Signs Monitoring', current: 40, target: 100, category: 'Healthcare' },
  { skill: 'First Aid', current: 90, target: 100, category: 'Healthcare' },
  { skill: 'Medical Documentation', current: 30, target: 100, category: 'Healthcare' },
  { skill: 'Infection Control', current: 55, target: 100, category: 'Healthcare' },
];

export const traineeDashboard: TraineeDashboardData = {
  profile: trainees[2], // Sneha Patil — in-progress trainee
  recommendedJobs: mockJobs.filter(j => j.sector === 'Healthcare').slice(0, 3),
  upcomingDeadlines: deadlines,
  skillProgress,
};
