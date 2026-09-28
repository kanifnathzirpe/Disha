'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ToastContainer, ToastItem } from '@/components/ui/Toast';
import type { UserRole } from '@/types';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  role: UserRole | 'all';
  type: 'critical' | 'alert' | 'success' | 'info';
  link?: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  organization: string;
}

export interface AuthorizedAccount {
  id: string;
  role: UserRole;
  identifier: string;
  secondaryIdentifiers: string[];
  password: string;
  name: string;
  title: string;
  organization: string;
  authMethod: string;
  badge: string;
  department: string;
}

export const AUTHORIZED_ACCOUNTS: Record<UserRole, AuthorizedAccount> = {
  government: {
    id: 'gov-001',
    role: 'government',
    identifier: 'officer@disha.gov.in',
    secondaryIdentifiers: ['admin@disha.gov.in', 'MH-GOV-8941'],
    password: 'demo123',
    name: 'Dr. Anjali Deshmukh, IAS',
    title: 'Joint Director of Skill Development & Employment',
    organization: 'Directorate of Vocational Education & Training, Government of Maharashtra',
    authMethod: 'Parichay / MeriPehchan SSO / NIC Govmail',
    badge: 'State Authority • Grade-1 IAS',
    department: 'कौशल्य विकास संचालनालय, मंत्रालय मुंबई',
  },
  trainee: {
    id: 'trainee-001',
    role: 'trainee',
    identifier: 'rahul.sharma@disha.gov.in',
    secondaryIdentifiers: ['9820012345', 'MH-TRN-10234'],
    password: 'demo123',
    name: 'Rahul Sharma',
    title: 'Certified Advanced CNC & Automation Specialist',
    organization: 'Government ITI Aundh, Pune',
    authMethod: 'Aadhaar OTP / DigiLocker Verification',
    badge: 'NCVT Level-4 Certified Learner',
    department: 'प्रशिक्षणार्थी पोर्टल (ITI Candidate Cell)',
  },
  employer: {
    id: 'employer-001',
    role: 'employer',
    identifier: 'hr@abcmfg.in',
    secondaryIdentifiers: ['U29100MH2012PLC234567', 'MH-EMP-4421'],
    password: 'demo123',
    name: 'Priya Joshi',
    title: 'Head of Talent Acquisition & Apprenticeship Cell',
    organization: 'ABC Manufacturing Ltd, Chakan Automotive Hub',
    authMethod: 'MCA CIN / EPFO Employer Est. Code',
    badge: 'MSSDS Industry Partner Tier-1',
    department: 'नियोक्ता व उद्योग भागीदारी मंच',
  },
  institution: {
    id: 'inst-001',
    role: 'institution',
    identifier: 'principal@apexiti.edu.in',
    secondaryIdentifiers: ['PR27000142', 'MH-INST-0082'],
    password: 'demo123',
    name: 'Dr. Suresh Kulkarni',
    title: 'Principal & Vocational Training Director',
    organization: 'Apex Vocational Institute & ITI, Pune',
    authMethod: 'NCVT MIS Code / AEBAS Biometric Terminal',
    badge: 'DVET Affiliated Grade-A Institute',
    department: 'प्रशिक्षण संस्था व ITI प्रशासन कक्ष',
  },
};

const DEFAULT_USERS: Record<UserRole, UserSession> = {
  government: {
    id: AUTHORIZED_ACCOUNTS.government.id,
    name: AUTHORIZED_ACCOUNTS.government.name,
    email: AUTHORIZED_ACCOUNTS.government.identifier,
    role: 'government',
    title: AUTHORIZED_ACCOUNTS.government.title,
    organization: AUTHORIZED_ACCOUNTS.government.organization,
  },
  trainee: {
    id: AUTHORIZED_ACCOUNTS.trainee.id,
    name: AUTHORIZED_ACCOUNTS.trainee.name,
    email: AUTHORIZED_ACCOUNTS.trainee.identifier,
    role: 'trainee',
    title: AUTHORIZED_ACCOUNTS.trainee.title,
    organization: AUTHORIZED_ACCOUNTS.trainee.organization,
  },
  employer: {
    id: AUTHORIZED_ACCOUNTS.employer.id,
    name: AUTHORIZED_ACCOUNTS.employer.name,
    email: AUTHORIZED_ACCOUNTS.employer.identifier,
    role: 'employer',
    title: AUTHORIZED_ACCOUNTS.employer.title,
    organization: AUTHORIZED_ACCOUNTS.employer.organization,
  },
  institution: {
    id: AUTHORIZED_ACCOUNTS.institution.id,
    name: AUTHORIZED_ACCOUNTS.institution.name,
    email: AUTHORIZED_ACCOUNTS.institution.identifier,
    role: 'institution',
    title: AUTHORIZED_ACCOUNTS.institution.title,
    organization: AUTHORIZED_ACCOUNTS.institution.organization,
  },
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Critical Skill Shortage',
    message: 'Pune district reported a deficit of 5,300 CNC technicians for Q3 2026.',
    time: '15 mins ago',
    read: false,
    role: 'government',
    type: 'critical',
    link: '/government/skill-gaps',
  },
  {
    id: 'notif-2',
    title: 'New Matching Job',
    message: 'ABC Manufacturing posted CNC Technician position matching 94% of your profile.',
    time: '1 hour ago',
    read: false,
    role: 'trainee',
    type: 'info',
    link: '/trainee/jobs',
  },
  {
    id: 'notif-3',
    title: 'Candidate Verification Request',
    message: '3 certified ITI trainees applied for EV Diagnostic Operator requiring badge check.',
    time: '2 hours ago',
    read: false,
    role: 'employer',
    type: 'alert',
    link: '/employer/verification',
  },
  {
    id: 'notif-4',
    title: 'Retention Milestone Reached',
    message: '90-day post-training retention reached 73.8% across Nashik engineering programs.',
    time: 'Yesterday',
    read: true,
    role: 'government',
    type: 'success',
    link: '/government',
  },
];

interface AppContextType {
  role: UserRole;
  user: UserSession;
  isAuthenticated: boolean;
  language: 'en' | 'mr';
  theme: 'light' | 'dark';
  notifications: AppNotification[];
  unreadNotificationCount: number;
  appliedJobs: string[];
  shortlistedCandidates: string[];
  savedScenarios: any[];
  verifiedCertificates: string[];
  login: (role: UserRole, email?: string) => void;
  loginWithCredentials: (
    role: UserRole,
    identifier: string,
    password: string
  ) => { success: boolean; error?: string };
  loginWithDemo: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'mr') => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  applyToJob: (jobId: string, jobTitle: string) => void;
  shortlistCandidate: (candidateId: string, candidateName: string) => void;
  savePolicyScenario: (scenario: any) => void;
  verifyCertificate: (certId: string, certName: string) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [role, setRole] = useState<UserRole>('government');
  const [user, setUser] = useState<UserSession>(DEFAULT_USERS.government);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [language, setLanguageState] = useState<'en' | 'mr'>('en');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(['job-1']);
  const [shortlistedCandidates, setShortlistedCandidates] = useState<string[]>(['cand-1']);
  const [savedScenarios, setSavedScenarios] = useState<any[]>([
    {
      id: 'scen-1',
      name: 'Pune CNC Apprenticeship Surge',
      date: '2026-09-15',
      budget: '₹14.5 Cr',
      projectedPlacement: '+5,200',
      roi: '3.1x',
    },
  ]);
  const [verifiedCertificates, setVerifiedCertificates] = useState<string[]>(['cert-1']);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Load persisted session on initial mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('disha_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed.role && DEFAULT_USERS[parsed.role as UserRole]) {
          setRole(parsed.role);
          setUser(DEFAULT_USERS[parsed.role as UserRole]);
          setIsAuthenticated(true);
        }
      }

      // Initialize theme from storage or default to light
      const savedTheme = (localStorage.getItem('disha_theme') as 'light' | 'dark') || 'light';
      setThemeState(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }

      const savedLang = localStorage.getItem('disha_lang') as 'en' | 'mr' | null;
      if (savedLang) {
        setLanguageState(savedLang);
      }

      const savedJobs = localStorage.getItem('disha_applied_jobs');
      if (savedJobs) setAppliedJobs(JSON.parse(savedJobs));

      const savedShortlist = localStorage.getItem('disha_shortlisted');
      if (savedShortlist) setShortlistedCandidates(JSON.parse(savedShortlist));
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Toggle between dark and light theme
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('disha_theme', nextTheme);
    } catch {}
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Mode (Deep Slate & Neon Blue)' : 'Light Mode (Frost & Royal Indigo)'}`, 'info');
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'mr' : 'en';
    setLanguageState(nextLang);
    try {
      localStorage.setItem('disha_lang', nextLang);
    } catch {}
    showToast(nextLang === 'mr' ? 'भाषा मराठीत बदलली आहे' : 'Language set to English', 'info');
  };

  const setLanguage = (lang: 'en' | 'mr') => {
    setLanguageState(lang);
    try {
      localStorage.setItem('disha_lang', lang);
    } catch {}
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loginWithCredentials = (
    targetRole: UserRole,
    identifier: string,
    password: string
  ): { success: boolean; error?: string } => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanId) {
      return { success: false, error: 'Please enter your registered Email, ID, or Mobile number.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Please enter your password or security PIN.' };
    }

    const authConfig = AUTHORIZED_ACCOUNTS[targetRole];
    if (!authConfig) {
      return { success: false, error: 'Invalid stakeholder role specified.' };
    }

    // Match identifier against primary or secondary identifiers
    const matchesPrimary = authConfig.identifier.toLowerCase() === cleanId;
    const matchesSecondary = authConfig.secondaryIdentifiers.some(
      (sec) => sec.toLowerCase() === cleanId
    );

    // Support admin credentials or demo credentials
    const matchesPassword = 
      cleanPass === authConfig.password || 
      (cleanId.includes('admin') && cleanPass === 'admin123') ||
      cleanPass === 'demo123';

    if (!matchesPrimary && !matchesSecondary) {
      return {
        success: false,
        error: `No authorized ${targetRole} record found for "${identifier}". Check the Quick Fill Demo button or use registered official credentials.`,
      };
    }

    if (!matchesPassword) {
      return {
        success: false,
        error: 'Invalid password or PIN. Authorized password for demo access is "demo123".',
      };
    }

    // Authenticated successfully!
    const targetUser: UserSession = {
      id: authConfig.id,
      name: authConfig.name,
      email: authConfig.identifier,
      role: targetRole,
      title: authConfig.title,
      organization: authConfig.organization,
    };

    setRole(targetRole);
    setUser(targetUser);
    setIsAuthenticated(true);

    try {
      localStorage.setItem(
        'disha_session',
        JSON.stringify({
          role: targetRole,
          email: targetUser.email,
          name: targetUser.name,
          title: targetUser.title,
          badge: authConfig.badge,
          loginAt: new Date().toISOString(),
        })
      );
    } catch {}

    showToast(`Access Granted: Welcome ${targetUser.name} (${authConfig.badge})`, 'success');
    router.push(`/${targetRole}`);
    return { success: true };
  };

  const loginWithDemo = (demoRole: UserRole) => {
    const authConfig = AUTHORIZED_ACCOUNTS[demoRole];
    if (authConfig) {
      loginWithCredentials(demoRole, authConfig.identifier, authConfig.password);
    }
  };

  const login = (newRole: UserRole, email?: string) => {
    setRole(newRole);
    const base = DEFAULT_USERS[newRole];
    const targetUser: UserSession = {
      ...base,
      email: email || base.email,
    };
    setUser(targetUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(
        'disha_session',
        JSON.stringify({ role: newRole, email: targetUser.email, name: targetUser.name, loginAt: new Date().toISOString() })
      );
    } catch {}
    showToast(`Welcome back, ${targetUser.name}`, 'success');
    router.push(`/${newRole}`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('disha_session');
    } catch {}
    showToast('Signed out of DISHA platform', 'info');
    router.push('/login');
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(DEFAULT_USERS[newRole]);
    try {
      localStorage.setItem(
        'disha_session',
        JSON.stringify({ role: newRole, email: DEFAULT_USERS[newRole].email, loginAt: new Date().toISOString() })
      );
    } catch {}
    showToast(`Switched role to ${DEFAULT_USERS[newRole].title}`, 'info');
    router.push(`/${newRole}`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const applyToJob = (jobId: string, jobTitle: string) => {
    if (appliedJobs.includes(jobId)) {
      showToast(`You have already applied for ${jobTitle}`, 'warning');
      return;
    }
    const updated = [...appliedJobs, jobId];
    setAppliedJobs(updated);
    try {
      localStorage.setItem('disha_applied_jobs', JSON.stringify(updated));
    } catch {}
    showToast(`Application submitted successfully for ${jobTitle}`, 'success');
  };

  const shortlistCandidate = (candidateId: string, candidateName: string) => {
    if (shortlistedCandidates.includes(candidateId)) {
      showToast(`${candidateName} is already in your shortlist`, 'info');
      return;
    }
    const updated = [...shortlistedCandidates, candidateId];
    setShortlistedCandidates(updated);
    try {
      localStorage.setItem('disha_shortlisted', JSON.stringify(updated));
    } catch {}
    showToast(`Candidate ${candidateName} added to shortlist`, 'success');
  };

  const savePolicyScenario = (scenario: any) => {
    const newScen = {
      id: `scen-${Date.now()}`,
      name: scenario.name || 'Custom Policy Simulation',
      date: new Date().toISOString().split('T')[0],
      budget: scenario.budget || '₹18.4 Cr',
      projectedPlacement: scenario.projectedPlacement || '+6,420',
      roi: scenario.roi || '2.8x',
    };
    setSavedScenarios((prev) => [newScen, ...prev]);
    showToast(`Scenario "${newScen.name}" saved to policy archive`, 'success');
  };

  const verifyCertificate = (certId: string, certName: string) => {
    if (!verifiedCertificates.includes(certId)) {
      setVerifiedCertificates((prev) => [...prev, certId]);
    }
    showToast(`Maharashtra State Skill Certificate #${certId} verified via DigiLocker`, 'success');
  };

  const unreadNotificationCount = notifications.filter(
    (n) => !n.read && (n.role === 'all' || n.role === role)
  ).length;

  return (
    <AppContext.Provider
      value={{
        role,
        user,
        isAuthenticated,
        language,
        theme,
        notifications,
        unreadNotificationCount,
        appliedJobs,
        shortlistedCandidates,
        savedScenarios,
        verifiedCertificates,
        login,
        loginWithCredentials,
        loginWithDemo,
        logout,
        switchRole,
        toggleTheme,
        toggleLanguage,
        setLanguage,
        markNotificationRead,
        markAllNotificationsRead,
        applyToJob,
        shortlistCandidate,
        savePolicyScenario,
        verifyCertificate,
        showToast,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
