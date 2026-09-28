'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Video,
  MessageSquare,
  FileCheck,
  ChevronRight,
  X,
  ExternalLink,
  Award
} from 'lucide-react';

interface ApplicationStage {
  id: number;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  detail?: string;
  badge?: string;
}

interface Application {
  id: string;
  role: string;
  company: string;
  district: string;
  salary: string;
  appliedDate: string;
  currentStage: number; // 1 to 5
  stages: ApplicationStage[];
  examScore?: string;
  interviewDate?: string;
  interviewMeetUrl?: string;
  recruiterName: string;
  recruiterNote: string;
}

export default function TraineeApplicationsPage() {
  const { appliedJobs, showToast } = useApp();
  const [selectedInterviewApp, setSelectedInterviewApp] = useState<Application | null>(null);
  const [chatModalApp, setChatModalApp] = useState<Application | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'trainee' | 'recruiter'; text: string; time: string }[]>([
    {
      sender: 'recruiter',
      text: 'Hello Rahul! We were impressed by your 89% score in CNC Turning & G-Code diagnostics. Are you comfortable with 3-shift rotation at our Chakan facility?',
      time: '10:45 AM'
    },
    {
      sender: 'trainee',
      text: 'Yes sir, I have undergone 6 months practical workshop training at Govt ITI Aundh and am fully prepared for rotational shifts.',
      time: '11:12 AM'
    }
  ]);

  const applications: Application[] = [
    {
      id: 'APP-001',
      role: 'Senior CNC Turning Operator & Programmer',
      company: 'ABC Manufacturing Ltd',
      district: 'Pune (Chakan MIDC)',
      salary: '₹22,000–₹28,000/month',
      appliedDate: '20 Sep 2026',
      currentStage: 4,
      examScore: '94 / 100 (Top 5% Percentile)',
      interviewDate: '28 Sep 2026, 14:00 IST',
      interviewMeetUrl: 'https://meet.google.com/disha-abcmfg-interview',
      recruiterName: 'Priya Joshi (Talent Head)',
      recruiterNote: 'Candidate cleared technical simulation test with distinction. Proceed to round-2 floor interview.',
      stages: [
        { id: 1, label: 'Profile Screened', status: 'completed', detail: 'DigiLocker & NCVT Level-4 Verified' },
        { id: 2, label: 'HR Shortlisted', status: 'completed', detail: 'Selected for Technical Evaluation' },
        { id: 3, label: 'Technical Exam', status: 'completed', detail: 'Scored 94/100 on CNC Metrology' },
        { id: 4, label: 'Technical Interview', status: 'current', detail: 'Scheduled on 28 Sep 2026 at 14:00 IST' },
        { id: 5, label: 'Offer Release', status: 'upcoming', detail: 'Pending final interview outcome' },
      ]
    },
    {
      id: 'APP-002',
      role: 'PLC & Automation Technician',
      company: 'Tech Industries Pune',
      district: 'Pune (Bhosari)',
      salary: '₹24,000–₹32,000/month',
      appliedDate: '18 Sep 2026',
      currentStage: 2,
      recruiterName: 'Mahesh Kulkarni',
      recruiterNote: 'Application reviewed. Technical screening assessment will be scheduled shortly.',
      stages: [
        { id: 1, label: 'Profile Screened', status: 'completed', detail: 'Qualifications verified' },
        { id: 2, label: 'HR Shortlisted', status: 'current', detail: 'Shortlisted for online screening' },
        { id: 3, label: 'Technical Exam', status: 'upcoming', detail: 'Awaiting exam schedule slot' },
        { id: 4, label: 'Technical Interview', status: 'upcoming', detail: 'Floor round' },
        { id: 5, label: 'Offer Release', status: 'upcoming', detail: 'Offer package' },
      ]
    },
    {
      id: 'APP-003',
      role: 'Quality Control Specialist & CMM Inspector',
      company: 'Bosch Automotive India',
      district: 'Nashik (Satpur MIDC)',
      salary: '₹20,000–₹26,000/month',
      appliedDate: '12 Sep 2026',
      currentStage: 1,
      recruiterName: 'Sunita Rao',
      recruiterNote: 'Awaiting batch completion certificate from ITI Aundh.',
      stages: [
        { id: 1, label: 'Profile Screened', status: 'current', detail: 'Document verification in progress' },
        { id: 2, label: 'HR Shortlisted', status: 'upcoming', detail: 'Pending clearance' },
        { id: 3, label: 'Technical Exam', status: 'upcoming', detail: 'Metrology test' },
        { id: 4, label: 'Technical Interview', status: 'upcoming', detail: 'Virtual panel' },
        { id: 5, label: 'Offer Release', status: 'upcoming', detail: 'Final offer' },
      ]
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory(prev => [
      ...prev,
      { sender: 'trainee', text: chatMessage.trim(), time: 'Just now' }
    ]);
    setChatMessage('');
    showToast('Message sent to recruiter', 'success');
  };

  return (
    <DashboardLayout
      role="trainee"
      title="My Job Applications & Selection Pipeline"
      subtitle="Track your stage-by-stage hiring progress, technical exam scores, and live interviews"
    >
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 font-semibold uppercase">Total Applications</span>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{applications.length}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">100% Verified Profiles</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 font-semibold uppercase">Shortlisted</span>
          <p className="text-2xl font-black text-blue-600">2</p>
          <p className="text-[11px] text-slate-400 mt-1">Passed initial screening</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 font-semibold uppercase">Interviews Scheduled</span>
          <p className="text-2xl font-black text-amber-600">1</p>
          <p className="text-[11px] text-amber-600 font-medium mt-1">Next: 28 Sep 14:00 IST</p>
        </Card>

        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 font-semibold uppercase">Average Exam Score</span>
          <p className="text-2xl font-black text-emerald-600">94%</p>
          <p className="text-[11px] text-slate-400 mt-1">Top 5% Statewide</p>
        </Card>
      </div>

      {/* Applications List with 5-Stage Pipeline */}
      <div className="space-y-5">
        {applications.map((app) => (
          <Card key={app.id} padding="md" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{app.role}</h3>
                  <span className="text-xs font-mono text-slate-400">({app.id})</span>
                  {app.currentStage === 4 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                      ● Interview Round
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                  <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                    <Building2 size={14} className="text-[#123B6D] dark:text-blue-400" /> {app.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {app.district}
                  </span>
                  <span className="font-semibold text-emerald-600">{app.salary}</span>
                  <span className="text-slate-400">Applied: {app.appliedDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {app.interviewMeetUrl && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedInterviewApp(app)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-xs shadow-xs"
                  >
                    <Video size={13} className="mr-1.5" />
                    Join Interview Room
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setChatModalApp(app)}
                  className="text-xs"
                >
                  <MessageSquare size={13} className="mr-1.5" />
                  Chat Recruiter
                </Button>
              </div>
            </div>

            {/* 5-STAGE SELECTION PIPELINE STEPPER */}
            <div className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
                {app.stages.map((stage, idx) => {
                  const isCompleted = stage.status === 'completed';
                  const isCurrent = stage.status === 'current';
                  return (
                    <div 
                      key={stage.id} 
                      className={`p-2.5 rounded-xl border transition-all text-xs ${
                        isCompleted 
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' 
                          : isCurrent 
                          ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-400 dark:border-blue-600 ring-2 ring-blue-400/20' 
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 0{stage.id}</span>
                        {isCompleted ? (
                          <CheckCircle2 size={14} className="text-emerald-600" />
                        ) : isCurrent ? (
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                        ) : (
                          <Clock size={12} className="text-slate-400" />
                        )}
                      </div>
                      <p className={`font-bold text-xs ${
                        isCompleted ? 'text-emerald-800 dark:text-emerald-300' : isCurrent ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {stage.label}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {stage.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recruiter Feedback Note & Exam Badge Strip */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Recruiter ({app.recruiterName}):</span>
                <span className="text-slate-700 dark:text-slate-300 italic">&ldquo;{app.recruiterNote}&rdquo;</span>
              </div>
              {app.examScore && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <Award size={14} className="text-emerald-600" />
                  <span className="font-bold text-emerald-600">Technical Exam: {app.examScore}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* LIVE INTERVIEW MODAL */}
      {selectedInterviewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video size={18} className="text-emerald-400" />
                <h3 className="font-bold text-sm">Official DISHA Video Interview Room</h3>
              </div>
              <button
                onClick={() => setSelectedInterviewApp(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-2">
                  <Video size={28} />
                </div>
                <p className="text-sm font-bold text-white">Connecting to {selectedInterviewApp.company} Interview Panel...</p>
                <p className="text-xs text-slate-400 mt-1">Candidate: Rahul Sharma • Trade: CNC Precision Engineering</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold">
                    Camera & Microphone: Ready
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Scheduled Time:</span>
                  <span className="text-white font-medium">{selectedInterviewApp.interviewDate}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Interview Room Link:</span>
                  <span className="text-emerald-400 font-mono underline">{selectedInterviewApp.interviewMeetUrl}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Interviewer:</span>
                  <span className="text-white font-medium">{selectedInterviewApp.recruiterName}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/80 border-t border-slate-700 flex justify-end gap-2 text-xs">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedInterviewApp(null)}
                className="text-slate-300 border-slate-700 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  showToast('Connecting to video stream...', 'info');
                  setTimeout(() => {
                    showToast('Interview session connected!', 'success');
                  }, 800);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Video size={14} className="mr-1.5" />
                Join Video Call Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CHAT RECRUITER MODAL */}
      {chatModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg h-[500px] flex flex-col overflow-hidden animate-in fade-in">
            <div className="p-4 bg-[#123B6D] text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-sm">{chatModalApp.company} Recruiter</h3>
                <p className="text-xs text-blue-200">{chatModalApp.recruiterName} • {chatModalApp.role}</p>
              </div>
              <button
                onClick={() => setChatModalApp(null)}
                className="text-slate-300 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50 dark:bg-slate-950">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'trainee' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.sender === 'trainee'
                        ? 'bg-[#123B6D] text-white rounded-br-none'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2 shrink-0">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your response to the recruiter..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#123B6D]"
              />
              <Button type="submit" variant="primary" size="sm" className="bg-[#123B6D] text-xs">
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
