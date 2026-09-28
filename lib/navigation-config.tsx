import type { UserRole } from '@/types';
import React from 'react';
import {
  LayoutDashboard,
  Target,
  BookOpen,
  FlaskConical,
  Award,
  Briefcase,
  Building2,
  Users,
  ClipboardCheck,
  ShieldCheck,
  User,
  LogOut,
  BarChart3,
  TrendingUp,
  MapPin,
  FileText,
  AlertTriangle,
  GraduationCap,
  Bookmark,
  FileSpreadsheet,
  Activity,
  Map,
  Gamepad2,
  Compass,
  MessageSquare,
  GitBranch,
  Brain,
  Radio,
  Sparkles,
  ArrowRightLeft,
  School
} from 'lucide-react';

export interface NavItem {
  label: string;
  labelMr: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface NavGroup {
  label: string;
  labelMr: string;
  items: NavItem[];
  collapsed?: boolean;
}

export interface BottomNavItem {
  label: string;
  labelMr: string;
  href: string;
  icon: React.ReactNode;
}

export interface RoleNavigation {
  mainNav: (NavItem | NavGroup)[];
  bottomNav: BottomNavItem[];
  roleLabel: string;
  roleLabelMr: string;
  roleName: string;
  roleNameMr: string;
}

export const navigationConfig: Record<UserRole, RoleNavigation> = {
  government: {
    mainNav: [
      {
        label: 'STATE COMMAND',
        labelMr: 'राज्य नियंत्रण',
        items: [
          { label: 'Command Center', labelMr: 'राज्य नियंत्रण कक्ष', href: '/government', icon: <LayoutDashboard size={18} /> },
          { label: 'Skill Intelligence Map', labelMr: 'कौशल्य बुद्धिमत्ता नकाशा', href: '/government/skill-map', icon: <Map size={18} /> },
        ],
      },
      {
        label: 'SKILL & LABOUR INTELLIGENCE',
        labelMr: 'कौशल्य व श्रम बुद्धिमत्ता',
        items: [
          { label: 'Skill Gaps & Demand', labelMr: 'कौशल्य तूट व मागणी', href: '/government/skill-gaps', icon: <Target size={18} /> },
          { label: 'Demand Forecast Trends', labelMr: 'मागणी अंदाज प्रवाह', href: '/government/demand-forecast', icon: <TrendingUp size={18} /> },
          { label: 'District Intelligence', labelMr: 'जिल्हास्तरीय बुद्धिमत्ता', href: '/government/district-intelligence', icon: <MapPin size={18} /> },
          { label: 'Sector Intelligence', labelMr: 'क्षेत्रीय बुद्धिमत्ता', href: '/government/sector-intelligence', icon: <BarChart3 size={18} /> },
          { label: 'Inter-District Mobility Map', labelMr: 'आंतर-जिल्हा गतिशीलता नकाशा', href: '/government/mobility-map', icon: <ArrowRightLeft size={18} /> },
        ],
      },
      {
        label: 'PROGRAMS & OUTCOMES',
        labelMr: 'योजना व निकाल',
        items: [
          { label: 'Training Centre Performance', labelMr: 'प्रशिक्षण केंद्र कामगिरी', href: '/government/programs', icon: <BookOpen size={18} /> },
          { label: 'Programme Outcome Tracking', labelMr: 'योजना निकाल मागोवा', href: '/government/outcomes', icon: <GitBranch size={18} /> },
          { label: 'Curriculum-Industry Mismatch', labelMr: 'अभ्यासक्रम-उद्योग विसंगती', href: '/government/curriculum-mismatch', icon: <AlertTriangle size={18} /> },
        ],
      },
      {
        label: 'POLICY & SIMULATION',
        labelMr: 'धोरण व अनुकरण',
        items: [
          { label: 'Policy Investment Simulator', labelMr: 'धोरण गुंतवणूक सिम्युलेटर', href: '/government/simulator', icon: <FlaskConical size={18} /> },
          { label: 'Executive Alerts & Reports', labelMr: 'कार्यकारी इशारे व अहवाल', href: '/government/reports', icon: <FileSpreadsheet size={18} /> },
        ],
      },
    ],
    bottomNav: [
      { label: 'Officer Profile', labelMr: 'अधिकारी खाते', href: '/government/profile', icon: <User size={18} /> },
      { label: 'Sign Out', labelMr: 'बाहेर पडा', href: '/login', icon: <LogOut size={18} /> },
    ],
    roleLabel: 'Joint Director (DVET)',
    roleLabelMr: 'सहसंचालक (DVET महाराष्ट्र)',
    roleName: 'Dr. Anjali Deshmukh, IAS',
    roleNameMr: 'डॉ. अंजली देशमुख, भा.प्र.से.',
  },
  trainee: {
    mainNav: [
      {
        label: 'TRAINEE DESK',
        labelMr: 'प्रशिक्षणार्थी कक्ष',
        items: [
          { label: 'My Dashboard', labelMr: 'माझे डॅशबोर्ड', href: '/trainee', icon: <LayoutDashboard size={18} /> },
          { label: 'Digital Skill Passport', labelMr: 'डिजिटल कौशल्य पासपोर्ट', href: '/trainee/skills', icon: <Award size={18} /> },
          { label: 'Career-Specific Paths', labelMr: 'कारकीर्द प्रगती मार्ग', href: '/trainee/career-paths', icon: <Compass size={18} /> },
          { label: 'Skill Courses & ITI', labelMr: 'कौशल्य व ITI अभ्यासक्रम', href: '/trainee/courses', icon: <BookOpen size={18} /> },
        ],
      },
      {
        label: 'EMPLOYABILITY & LEARNING',
        labelMr: 'रोजगारक्षमता व अध्ययन',
        items: [
          { label: 'SkillQuest Micro-learning', labelMr: 'स्किलक्वेस्ट सूक्ष्म-अध्ययन', href: '/trainee/skillquest', icon: <Gamepad2 size={18} />, badge: 3 },
          { label: 'Technical Assessments', labelMr: 'तांत्रिक मूल्यमापन चाचण्या', href: '/trainee/assessment', icon: <Brain size={18} /> },
          { label: 'AI Mock Interview', labelMr: 'एआय सराव मुलाखत', href: '/trainee/mock-interview', icon: <Radio size={18} /> },
        ],
      },
      {
        label: 'OPPORTUNITIES & TRACKING',
        labelMr: 'संधी व मागोवा',
        items: [
          { label: 'Verified Opportunities', labelMr: 'प्रमाणित संधी व नोकऱ्या', href: '/trainee/opportunities', icon: <Briefcase size={18} />, badge: 5 },
          { label: 'My Applications', labelMr: 'माझे नोकरी अर्ज', href: '/trainee/applications', icon: <FileText size={18} /> },
          { label: 'Biometric Attendance', labelMr: 'बायोमेट्रिक हजेरी', href: '/trainee/attendance', icon: <ClipboardCheck size={18} /> },
          { label: 'Batch Leaderboard', labelMr: 'बॅच गुणवत्ता यादी', href: '/trainee/leaderboard', icon: <Activity size={18} /> },
        ],
      },
    ],
    bottomNav: [
      { label: 'Candidate Profile', labelMr: 'उमेदवार प्रोफाइल', href: '/trainee/profile', icon: <User size={18} /> },
      { label: 'Sign Out', labelMr: 'बाहेर पडा', href: '/login', icon: <LogOut size={18} /> },
    ],
    roleLabel: 'NCVT Certified Trainee',
    roleLabelMr: 'एनसीव्हीटी स्तर-४ प्रमाणित उमेदवार',
    roleName: 'Rahul Sharma',
    roleNameMr: 'राहुल शर्मा',
  },
  employer: {
    mainNav: [
      {
        label: 'HIRING COMMAND',
        labelMr: 'भरती नियंत्रण',
        items: [
          { label: 'Employer Dashboard', labelMr: 'नियोक्ता डॅशबोर्ड', href: '/employer', icon: <LayoutDashboard size={18} /> },
          { label: 'Active Job Postings', labelMr: 'सक्रिय नोकरी जाहिराती', href: '/employer/jobs', icon: <Briefcase size={18} /> },
          { label: 'Candidate Applications', labelMr: 'उमेदवारांचे अर्ज', href: '/employer/applications', icon: <FileText size={18} />, badge: 4 },
        ],
      },
      {
        label: 'TALENT SOURCING',
        labelMr: 'प्रतिभा शोध',
        items: [
          { label: 'Explainable ATS Matching', labelMr: 'स्पष्टीकरणात्मक एटीएस जुळवणी', href: '/employer/talent/matching', icon: <Target size={18} /> },
          { label: 'Shortlisted Talent Pool', labelMr: 'निवडलेली प्रतिभा यादी', href: '/employer/talent/shortlisted', icon: <Bookmark size={18} /> },
        ],
      },
      {
        label: 'DVET FEEDBACK & REVISIONS',
        labelMr: 'अभिप्राय व सुधारणा',
        items: [
          { label: 'Training & Curriculum Feedback', labelMr: 'प्रशिक्षण व अभ्यासक्रम अभिप्राय', href: '/employer/feedback/training', icon: <MessageSquare size={18} /> },
          { label: 'Industry Demand Projections', labelMr: 'उद्योग मागणी अंदाज', href: '/employer/feedback/demand', icon: <TrendingUp size={18} /> },
        ],
      },
      {
        label: 'COMPLIANCE & SUBSIDIES',
        labelMr: 'अनुपालन व अनुदान',
        items: [
          { label: 'Retention & DBT Subsidies', labelMr: 'रोजगार धारणा व डीबीटी अनुदान', href: '/employer/employment/retention', icon: <ShieldCheck size={18} /> },
        ],
      },
    ],
    bottomNav: [
      { label: 'Company Profile', labelMr: 'कंपनी प्रोफाइल', href: '/employer/profile', icon: <User size={18} /> },
      { label: 'Sign Out', labelMr: 'बाहेर पडा', href: '/login', icon: <LogOut size={18} /> },
    ],
    roleLabel: 'Registered Industry Partner',
    roleLabelMr: 'नोंदणीकृत उद्योग भागीदार',
    roleName: 'Priya Joshi (ABC Mfg)',
    roleNameMr: 'प्रिया जोशी (एबीसी मॅन्युफॅक्चरिंग)',
  },
  institution: {
    mainNav: [
      {
        label: 'INSTITUTE DESK',
        labelMr: 'प्रशिक्षण संस्था कक्ष',
        items: [
          { label: 'Institution Hub', labelMr: 'संस्था केंद्र डॅशबोर्ड', href: '/institution', icon: <LayoutDashboard size={18} /> },
          { label: 'Curriculum-Industry Mismatch', labelMr: 'अभ्यासक्रम-उद्योग विसंगती', href: '/institution/curriculum-mismatch', icon: <AlertTriangle size={18} /> },
        ],
      },
    ],
    bottomNav: [
      { label: 'Institute Profile', labelMr: 'संस्था प्रोफाइल', href: '/institution#profile', icon: <Building2 size={18} /> },
      { label: 'Sign Out', labelMr: 'बाहेर पडा', href: '/login', icon: <LogOut size={18} /> },
    ],
    roleLabel: 'Accredited ITI / VTP',
    roleLabelMr: 'प्रमाणित आयटीआय / व्हीटीपी',
    roleName: 'Dr. Suresh Kulkarni (Apex ITI)',
    roleNameMr: 'डॉ. सुरेश कुलकर्णी (एपेक्स आयटीआय)',
  },
};

export const getNavigationForRole = (role: UserRole): RoleNavigation => {
  return navigationConfig[role];
};

export const getMainNavForRole = (role: UserRole): (NavItem | NavGroup)[] => {
  return navigationConfig[role].mainNav;
};

export const getBottomNavForRole = (role: UserRole): BottomNavItem[] => {
  return navigationConfig[role].bottomNav;
};

export const getRoleInfo = (role: UserRole): { label: string; name: string } => {
  return {
    label: navigationConfig[role].roleLabel,
    name: navigationConfig[role].roleName,
  };
};
