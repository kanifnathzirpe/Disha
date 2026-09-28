// Feature 11: Employer Feedback → Curriculum Update Data

export interface EmployerFeedbackItem {
  id: string;
  employerId: string;
  employerName: string;
  hiredCandidateId: string;
  hiredCandidateName: string;
  trainingProgram: string;
  trainingProvider: string;
  hiringDate: string;
  feedbackDate: string;
  overallRating: number; // 1-5
  skillRatings: { skill: string; rating: number; comment: string }[];
  missingSkills: string[];
  suggestedImprovements: string[];
  wouldHireAgain: boolean;
  retentionStatus: 'retained' | 'left' | 'ongoing';
  trainingRelevance: 'highly-relevant' | 'somewhat-relevant' | 'needs-improvement' | 'not-relevant';
}

export interface FeedbackAggregation {
  program: string;
  provider: string;
  totalFeedbacks: number;
  avgRating: number;
  topMissingSkills: { skill: string; mentions: number }[];
  topStrengths: { skill: string; mentions: number }[];
  relevanceBreakdown: { label: string; value: number; color: string }[];
  wouldHireAgainPercent: number;
  actionsTaken: { action: string; status: 'implemented' | 'planned' | 'under-review' }[];
}

export const employerFeedbacks: EmployerFeedbackItem[] = [
  {
    id: 'FB001',
    employerId: 'EMP001',
    employerName: 'ABC Manufacturing',
    hiredCandidateId: 'TR006',
    hiredCandidateName: 'Rahul Sharma',
    trainingProgram: 'PMKVY – CNC Operator Training',
    trainingProvider: 'Maharashtra ITI Network',
    hiringDate: '2026-05-12',
    feedbackDate: '2026-08-20',
    overallRating: 3.5,
    skillRatings: [
      { skill: 'CNC Machine Operation', rating: 4, comment: 'Good foundation, able to run machines independently within 2 weeks' },
      { skill: 'G-Code Programming', rating: 3, comment: 'Basics covered but needed additional training on advanced cycles' },
      { skill: 'Quality Inspection', rating: 4, comment: 'Accurate with measurement instruments' },
      { skill: 'CAM Software', rating: 1, comment: 'No exposure — had to train from scratch on MasterCAM' },
      { skill: 'Safety Protocols', rating: 5, comment: 'Excellent safety awareness and practices' },
    ],
    missingSkills: ['CAM Software (MasterCAM)', 'Industry 4.0 concepts', 'SPC/Statistical Quality Control'],
    suggestedImprovements: [
      'Add CAM software training — essential for modern manufacturing',
      'Include Industry 4.0 / IoT basics',
      'More time on advanced CNC cycles (canned cycles)',
    ],
    wouldHireAgain: true,
    retentionStatus: 'retained',
    trainingRelevance: 'somewhat-relevant',
  },
  {
    id: 'FB002',
    employerId: 'EMP003',
    employerName: 'Infosys Ltd.',
    hiredCandidateId: 'TR001',
    hiredCandidateName: 'Priya Deshmukh',
    trainingProgram: 'MSSDS – Full Stack Developer',
    trainingProvider: 'CDAC Pune',
    hiringDate: '2026-08-20',
    feedbackDate: '2026-09-25',
    overallRating: 4.2,
    skillRatings: [
      { skill: 'React.js', rating: 4, comment: 'Good component architecture understanding' },
      { skill: 'Node.js', rating: 4, comment: 'Solid backend development skills' },
      { skill: 'SQL', rating: 4, comment: 'Good query writing, understands joins and indexes' },
      { skill: 'TypeScript', rating: 2, comment: 'Limited exposure — most projects require TypeScript now' },
      { skill: 'Git & DevOps', rating: 3, comment: 'Basic Git skills, needs improvement on CI/CD' },
    ],
    missingSkills: ['TypeScript', 'Cloud deployment (AWS)', 'CI/CD pipelines'],
    suggestedImprovements: [
      'Make TypeScript a core part of the curriculum',
      'Add cloud deployment module (AWS basics)',
      'More focus on automated testing',
    ],
    wouldHireAgain: true,
    retentionStatus: 'retained',
    trainingRelevance: 'highly-relevant',
  },
  {
    id: 'FB003',
    employerId: 'EMP006',
    employerName: 'L&T Construction',
    hiredCandidateId: 'TR002',
    hiredCandidateName: 'Rajesh Jadhav',
    trainingProgram: 'PMKVY – Welding Specialist',
    trainingProvider: 'L&T Skill Trainers',
    hiringDate: '2026-03-01',
    feedbackDate: '2026-06-15',
    overallRating: 3.0,
    skillRatings: [
      { skill: 'SMAW Welding', rating: 4, comment: 'Good manual arc welding skills' },
      { skill: 'GMAW/MIG Welding', rating: 3, comment: 'Needs more practice on automated MIG' },
      { skill: 'Blueprint Reading', rating: 2, comment: 'Struggled with complex structural drawings' },
      { skill: 'Welding Inspection', rating: 2, comment: 'Limited knowledge of NDT methods' },
      { skill: 'Safety', rating: 4, comment: 'Good compliance with PPE and safety protocols' },
    ],
    missingSkills: ['NDT basics (Non-Destructive Testing)', 'Automated welding systems', 'Advanced blueprint reading'],
    suggestedImprovements: [
      'Add NDT awareness module',
      'Include automated / robotic welding exposure',
      'Strengthen structural drawing interpretation skills',
    ],
    wouldHireAgain: true,
    retentionStatus: 'left',
    trainingRelevance: 'somewhat-relevant',
  },
  {
    id: 'FB004',
    employerId: 'EMP004',
    employerName: 'Apollo Hospitals',
    hiredCandidateId: 'TR003',
    hiredCandidateName: 'Sneha Patil',
    trainingProgram: 'DDUGKY – Healthcare Assistant',
    trainingProvider: 'Symbiosis Health Sciences',
    hiringDate: '2026-06-01',
    feedbackDate: '2026-09-10',
    overallRating: 4.0,
    skillRatings: [
      { skill: 'Patient Care', rating: 4, comment: 'Compassionate and attentive to patients' },
      { skill: 'Vital Signs', rating: 5, comment: 'Accurate and consistent monitoring' },
      { skill: 'Medical Records', rating: 3, comment: 'Needs training on digital EMR systems' },
      { skill: 'Emergency Response', rating: 4, comment: 'Good first aid knowledge and response time' },
      { skill: 'Communication', rating: 3, comment: 'Good in Marathi, needs English improvement for documentation' },
    ],
    missingSkills: ['Digital EMR Systems', 'English medical terminology', 'Infection control auditing'],
    suggestedImprovements: [
      'Add EMR/EHR software training module',
      'Include English medical terminology course',
      'Expand infection control beyond basics',
    ],
    wouldHireAgain: true,
    retentionStatus: 'retained',
    trainingRelevance: 'highly-relevant',
  },
];

export const feedbackAggregations: FeedbackAggregation[] = [
  {
    program: 'PMKVY – CNC Operator Training',
    provider: 'Maharashtra ITI Network',
    totalFeedbacks: 42,
    avgRating: 3.4,
    topMissingSkills: [
      { skill: 'CAM Software', mentions: 36 },
      { skill: 'Industry 4.0 / IoT', mentions: 28 },
      { skill: 'SPC / Statistical QC', mentions: 22 },
      { skill: 'Advanced CNC Cycles', mentions: 18 },
    ],
    topStrengths: [
      { skill: 'Safety Protocols', mentions: 40 },
      { skill: 'Basic CNC Operation', mentions: 38 },
      { skill: 'Measurement Skills', mentions: 35 },
    ],
    relevanceBreakdown: [
      { label: 'Highly Relevant', value: 22, color: '#15803d' },
      { label: 'Somewhat Relevant', value: 45, color: '#ca8a04' },
      { label: 'Needs Improvement', value: 28, color: '#dc2626' },
      { label: 'Not Relevant', value: 5, color: '#6b7280' },
    ],
    wouldHireAgainPercent: 76,
    actionsTaken: [
      { action: 'Add CAM software module (40 hrs)', status: 'planned' },
      { action: 'Introduce Industry 4.0 basics (20 hrs)', status: 'under-review' },
      { action: 'Expand SPC/QC content', status: 'implemented' },
    ],
  },
  {
    program: 'MSSDS – Full Stack Developer',
    provider: 'CDAC Pune',
    totalFeedbacks: 38,
    avgRating: 4.1,
    topMissingSkills: [
      { skill: 'TypeScript', mentions: 32 },
      { skill: 'Cloud Deployment', mentions: 26 },
      { skill: 'CI/CD Pipelines', mentions: 20 },
    ],
    topStrengths: [
      { skill: 'React.js', mentions: 36 },
      { skill: 'Node.js', mentions: 34 },
      { skill: 'SQL', mentions: 32 },
      { skill: 'Project Experience', mentions: 30 },
    ],
    relevanceBreakdown: [
      { label: 'Highly Relevant', value: 55, color: '#15803d' },
      { label: 'Somewhat Relevant', value: 32, color: '#ca8a04' },
      { label: 'Needs Improvement', value: 10, color: '#dc2626' },
      { label: 'Not Relevant', value: 3, color: '#6b7280' },
    ],
    wouldHireAgainPercent: 92,
    actionsTaken: [
      { action: 'Add TypeScript module (20 hrs)', status: 'implemented' },
      { action: 'Introduce AWS basics (15 hrs)', status: 'planned' },
      { action: 'Expand testing curriculum', status: 'under-review' },
    ],
  },
];

export const feedbackSummary = {
  totalFeedbacksReceived: 186,
  avgOverallRating: 3.6,
  mostCommonGap: 'Industry 4.0 / Digital Skills',
  programsWithFeedback: 24,
  curriculumUpdatesTriggered: 18,
  avgTimeToAction: '45 days',
};
