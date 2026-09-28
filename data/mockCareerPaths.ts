// Feature 7: Career-Specific Learning Paths

export interface CareerPath {
  id: string;
  title: string;
  sector: string;
  description: string;
  avgSalary: string;
  demand: 'very-high' | 'high' | 'medium';
  duration: string;
  totalSkills: number;
  completedSkills: number;
  phases: CareerPhase[];
  prerequisites: string[];
  employers: string[];
}

export interface CareerPhase {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: CareerSkillItem[];
  assessments: string[];
  status: 'completed' | 'in-progress' | 'locked';
}

export interface CareerSkillItem {
  name: string;
  type: 'course' | 'practice' | 'assessment' | 'certification';
  duration: string;
  provider: string;
  status: 'completed' | 'in-progress' | 'locked';
  score?: number;
}

export const careerPaths: CareerPath[] = [
  {
    id: 'cp-cnc-programmer',
    title: 'CNC Programmer',
    sector: 'Manufacturing',
    description: 'Master CNC machine programming from basics to multi-axis operations. High demand across Pune, Nashik, and Mumbai manufacturing clusters.',
    avgSalary: '₹22,000 – ₹35,000/month',
    demand: 'very-high',
    duration: '8-12 months',
    totalSkills: 18,
    completedSkills: 11,
    prerequisites: ['10th Pass / ITI', 'Basic Mathematics', 'Mechanical Aptitude'],
    employers: ['ABC Manufacturing', 'Bajaj Auto', 'L&T', 'Bharat Forge'],
    phases: [
      {
        id: 'phase-1',
        title: 'Foundation',
        description: 'Core machining and measurement skills',
        duration: '2 months',
        status: 'completed',
        assessments: ['Foundation Assessment'],
        skills: [
          { name: 'Workshop Safety & 5S', type: 'course', duration: '1 week', provider: 'ITI Pune', status: 'completed', score: 92 },
          { name: 'Engineering Drawing & Blueprint Reading', type: 'course', duration: '2 weeks', provider: 'ITI Pune', status: 'completed', score: 88 },
          { name: 'Precision Measurement (Vernier, Micrometer)', type: 'practice', duration: '2 weeks', provider: 'ITI Pune', status: 'completed', score: 95 },
          { name: 'Manual Lathe & Milling Basics', type: 'practice', duration: '3 weeks', provider: 'ITI Pune', status: 'completed', score: 85 },
          { name: 'Foundation Assessment', type: 'assessment', duration: '1 day', provider: 'NCVT', status: 'completed', score: 90 },
        ],
      },
      {
        id: 'phase-2',
        title: 'CNC Fundamentals',
        description: 'CNC machine operation and basic programming',
        duration: '3 months',
        status: 'completed',
        assessments: ['CNC Level 3 Certification'],
        skills: [
          { name: 'CNC Machine Components & Setup', type: 'course', duration: '2 weeks', provider: 'TechForward', status: 'completed', score: 88 },
          { name: 'G-Code & M-Code Programming', type: 'course', duration: '4 weeks', provider: 'TechForward', status: 'completed', score: 82 },
          { name: 'CNC Turning Operations', type: 'practice', duration: '3 weeks', provider: 'TechForward', status: 'completed', score: 86 },
          { name: 'CNC Milling Operations', type: 'practice', duration: '2 weeks', provider: 'TechForward', status: 'completed', score: 80 },
          { name: 'Quality Control & Inspection', type: 'course', duration: '1 week', provider: 'TechForward', status: 'completed', score: 91 },
          { name: 'PMKVY CNC Level 3 Certification', type: 'certification', duration: '2 days', provider: 'NSDC', status: 'completed', score: 84 },
        ],
      },
      {
        id: 'phase-3',
        title: 'Advanced Programming',
        description: 'Complex programming and CAM software',
        duration: '3 months',
        status: 'in-progress',
        assessments: ['CNC Level 5 Certification'],
        skills: [
          { name: 'AutoCAD for Manufacturing', type: 'course', duration: '3 weeks', provider: 'CDAC Pune', status: 'completed', score: 78 },
          { name: 'CAM Software (MasterCAM / Fusion 360)', type: 'course', duration: '4 weeks', provider: 'CDAC Pune', status: 'in-progress' },
          { name: 'Multi-axis Machining Concepts', type: 'course', duration: '2 weeks', provider: 'TechForward', status: 'locked' },
          { name: 'Tool Path Optimization', type: 'practice', duration: '2 weeks', provider: 'TechForward', status: 'locked' },
          { name: 'PMKVY CNC Level 5 Certification', type: 'certification', duration: '2 days', provider: 'NSDC', status: 'locked' },
        ],
      },
      {
        id: 'phase-4',
        title: 'Industry Specialization',
        description: 'Real-world project experience and placement',
        duration: '2 months',
        status: 'locked',
        assessments: ['Industry Project Evaluation'],
        skills: [
          { name: 'Industry 4.0 & IoT in Manufacturing', type: 'course', duration: '2 weeks', provider: 'CDAC Pune', status: 'locked' },
          { name: 'Industry Apprenticeship', type: 'practice', duration: '6 weeks', provider: 'Employer Partner', status: 'locked' },
        ],
      },
    ],
  },
  {
    id: 'cp-ev-technician',
    title: 'EV Technician',
    sector: 'Automotive',
    description: 'Become a certified Electric Vehicle technician with expertise in battery systems, motors, and diagnostics. Rapidly growing field.',
    avgSalary: '₹20,000 – ₹30,000/month',
    demand: 'very-high',
    duration: '6-10 months',
    totalSkills: 14,
    completedSkills: 0,
    prerequisites: ['ITI Electrical/Mechanical', 'Basic Electronics Knowledge'],
    employers: ['Mahindra Electric', 'Tata Motors EV', 'Ola Electric', 'Bajaj Auto'],
    phases: [
      {
        id: 'ev-phase-1', title: 'Electrical Fundamentals', description: 'Core electrical and electronics concepts', duration: '2 months', status: 'locked',
        assessments: ['Electrical Fundamentals Test'],
        skills: [
          { name: 'DC/AC Circuits & Power Electronics', type: 'course', duration: '3 weeks', provider: 'Green Tech Academy', status: 'locked' },
          { name: 'Battery Chemistry & Types', type: 'course', duration: '2 weeks', provider: 'Green Tech Academy', status: 'locked' },
          { name: 'High Voltage Safety Protocols', type: 'course', duration: '1 week', provider: 'ARAI Pune', status: 'locked' },
          { name: 'Electrical Safety Certification', type: 'certification', duration: '1 day', provider: 'ARAI', status: 'locked' },
        ],
      },
      {
        id: 'ev-phase-2', title: 'EV Systems', description: 'Electric vehicle architecture and components', duration: '3 months', status: 'locked',
        assessments: ['EV Systems Assessment'],
        skills: [
          { name: 'EV Architecture & Powertrain', type: 'course', duration: '3 weeks', provider: 'Green Tech Academy', status: 'locked' },
          { name: 'Battery Management Systems (BMS)', type: 'course', duration: '3 weeks', provider: 'Green Tech Academy', status: 'locked' },
          { name: 'Electric Motor Types & Repair', type: 'practice', duration: '3 weeks', provider: 'Tata STRIVE', status: 'locked' },
          { name: 'EV Charging Infrastructure', type: 'course', duration: '2 weeks', provider: 'Green Tech Academy', status: 'locked' },
        ],
      },
      {
        id: 'ev-phase-3', title: 'Diagnostics & Repair', description: 'Hands-on diagnosis and repair skills', duration: '3 months', status: 'locked',
        assessments: ['EV Technician Certification'],
        skills: [
          { name: 'OBD-II & EV Diagnostic Tools', type: 'practice', duration: '3 weeks', provider: 'ARAI Pune', status: 'locked' },
          { name: 'Common EV Faults & Troubleshooting', type: 'practice', duration: '3 weeks', provider: 'Tata STRIVE', status: 'locked' },
          { name: 'EV Repair Apprenticeship', type: 'practice', duration: '6 weeks', provider: 'Mahindra Electric', status: 'locked' },
          { name: 'State EV Technician Certification', type: 'certification', duration: '2 days', provider: 'Maharashtra Skill Mission', status: 'locked' },
        ],
      },
    ],
  },
  {
    id: 'cp-fullstack',
    title: 'Full Stack Web Developer',
    sector: 'IT/ITES',
    description: 'Learn modern web development from frontend to backend. High placement rates in Pune and Mumbai IT hubs.',
    avgSalary: '₹25,000 – ₹40,000/month',
    demand: 'high',
    duration: '6-9 months',
    totalSkills: 16,
    completedSkills: 0,
    prerequisites: ['12th Pass (any stream)', 'Basic Computer Skills', 'English Proficiency'],
    employers: ['Infosys', 'TCS', 'Tech Mahindra', 'Wipro', 'Persistent Systems'],
    phases: [
      {
        id: 'fs-phase-1', title: 'Web Fundamentals', description: 'HTML, CSS, JavaScript basics', duration: '2 months', status: 'locked',
        assessments: ['Web Fundamentals Test'],
        skills: [
          { name: 'HTML5 & Semantic Markup', type: 'course', duration: '2 weeks', provider: 'CDAC Pune', status: 'locked' },
          { name: 'CSS3 & Responsive Design', type: 'course', duration: '2 weeks', provider: 'CDAC Pune', status: 'locked' },
          { name: 'JavaScript ES6+ Fundamentals', type: 'course', duration: '4 weeks', provider: 'CDAC Pune', status: 'locked' },
        ],
      },
      {
        id: 'fs-phase-2', title: 'Frontend Development', description: 'React.js and modern UI development', duration: '2 months', status: 'locked',
        assessments: ['Frontend Project Evaluation'],
        skills: [
          { name: 'React.js & Component Architecture', type: 'course', duration: '4 weeks', provider: 'CDAC Pune', status: 'locked' },
          { name: 'State Management & API Integration', type: 'course', duration: '2 weeks', provider: 'CDAC Pune', status: 'locked' },
          { name: 'Frontend Project', type: 'practice', duration: '2 weeks', provider: 'CDAC Pune', status: 'locked' },
        ],
      },
      {
        id: 'fs-phase-3', title: 'Backend & Database', description: 'Node.js, Express, SQL/NoSQL', duration: '2 months', status: 'locked',
        assessments: ['Backend Assessment'],
        skills: [
          { name: 'Node.js & Express.js', type: 'course', duration: '3 weeks', provider: 'CDAC Pune', status: 'locked' },
          { name: 'SQL & Database Design', type: 'course', duration: '2 weeks', provider: 'CDAC Pune', status: 'locked' },
          { name: 'REST API Development', type: 'practice', duration: '2 weeks', provider: 'CDAC Pune', status: 'locked' },
          { name: 'Authentication & Security', type: 'course', duration: '1 week', provider: 'CDAC Pune', status: 'locked' },
        ],
      },
      {
        id: 'fs-phase-4', title: 'Capstone & Placement', description: 'Full stack project and industry placement', duration: '2 months', status: 'locked',
        assessments: ['CDAC Full Stack Certification'],
        skills: [
          { name: 'Full Stack Capstone Project', type: 'practice', duration: '4 weeks', provider: 'CDAC Pune', status: 'locked' },
          { name: 'Git, CI/CD & Deployment', type: 'course', duration: '1 week', provider: 'CDAC Pune', status: 'locked' },
          { name: 'Industry Internship', type: 'practice', duration: '4 weeks', provider: 'IT Partner Company', status: 'locked' },
          { name: 'CDAC Full Stack Developer Certificate', type: 'certification', duration: '2 days', provider: 'CDAC', status: 'locked' },
        ],
      },
    ],
  },
  {
    id: 'cp-healthcare',
    title: 'Healthcare Assistant',
    sector: 'Healthcare',
    description: 'Certified healthcare assistant training covering patient care, vital signs, and medical procedures.',
    avgSalary: '₹14,000 – ₹20,000/month',
    demand: 'high',
    duration: '6 months',
    totalSkills: 12,
    completedSkills: 0,
    prerequisites: ['12th Pass (Science preferred)', 'Basic English', 'Physical Fitness'],
    employers: ['Apollo Hospitals', 'Fortis', 'Ruby Hall Clinic', 'Sahyadri Hospitals'],
    phases: [
      {
        id: 'hc-phase-1', title: 'Medical Fundamentals', description: 'Anatomy, terminology, hygiene', duration: '2 months', status: 'locked',
        assessments: ['Medical Fundamentals Exam'],
        skills: [
          { name: 'Basic Anatomy & Physiology', type: 'course', duration: '3 weeks', provider: 'Symbiosis Health Sciences', status: 'locked' },
          { name: 'Medical Terminology', type: 'course', duration: '2 weeks', provider: 'Symbiosis Health Sciences', status: 'locked' },
          { name: 'Infection Control & Hygiene', type: 'course', duration: '2 weeks', provider: 'Symbiosis Health Sciences', status: 'locked' },
        ],
      },
      {
        id: 'hc-phase-2', title: 'Patient Care Skills', description: 'Vital signs, patient handling, first aid', duration: '2 months', status: 'locked',
        assessments: ['Clinical Skills Assessment'],
        skills: [
          { name: 'Vital Signs Monitoring', type: 'practice', duration: '3 weeks', provider: 'Symbiosis Health Sciences', status: 'locked' },
          { name: 'Patient Handling & Mobility', type: 'practice', duration: '2 weeks', provider: 'Symbiosis Health Sciences', status: 'locked' },
          { name: 'First Aid & Emergency Response', type: 'course', duration: '2 weeks', provider: 'Red Cross', status: 'locked' },
          { name: 'Red Cross First Aid Certificate', type: 'certification', duration: '2 days', provider: 'Indian Red Cross', status: 'locked' },
        ],
      },
      {
        id: 'hc-phase-3', title: 'Clinical Placement', description: 'Hospital internship and certification', duration: '2 months', status: 'locked',
        assessments: ['Healthcare Assistant Certificate'],
        skills: [
          { name: 'Hospital Ward Internship', type: 'practice', duration: '6 weeks', provider: 'Apollo Hospitals', status: 'locked' },
          { name: 'DDUGKY Healthcare Assistant Certificate', type: 'certification', duration: '2 days', provider: 'MoRD / NSDC', status: 'locked' },
        ],
      },
    ],
  },
];
