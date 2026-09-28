'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, Drawer } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { candidates } from '@/data/mockEmployers';
import { formatCurrency } from '@/lib/utils';
import { 
  Users, 
  MapPin, 
  Award, 
  Briefcase, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  Star,
  Filter,
  SlidersHorizontal,
  Bookmark,
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  IndianRupee,
  FileCheck
} from 'lucide-react';

interface CandidateRecord {
  id: string;
  name: string;
  traineeId: string;
  skills: string[];
  certifications: string[];
  matchScore: number;
  experience: string;
  education: string;
  district: string;
  expectedWage: number;
  status: string;
  phone: string;
  email: string;
  itiName: string;
  practicalScore: number;
}

export default function CandidateMatchingPage() {
  const { shortlistedCandidates, shortlistCandidate, showToast } = useApp();

  // Filter States
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');

  // Modals
  const [viewingCandidate, setViewingCandidate] = useState<CandidateRecord | null>(null);
  const [contactingCandidate, setContactingCandidate] = useState<CandidateRecord | null>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);

  const baseCandidates: CandidateRecord[] = [
    {
      id: 'cand-001',
      name: 'Rahul Sharma',
      traineeId: 'MH-PN-10234',
      skills: ['CNC', 'PLC', 'AutoCAD', 'Machine Operation'],
      certifications: ['NCVT Level 4 CNC Machining', 'Maharashtra Industry Safety (MSSDS)'],
      matchScore: 94,
      experience: '1.2 years',
      education: 'Diploma in Mechanical Engineering (Govt ITI Aundh)',
      district: 'Pune',
      expectedWage: 24000,
      status: 'Ready to Hire',
      phone: '+91 98230 44129',
      email: 'rahul.sharma@disha.gov.in',
      itiName: 'Government ITI Aundh, Pune',
      practicalScore: 96,
    },
    {
      id: 'cand-002',
      name: 'Snehal Pawar',
      traineeId: 'MH-PN-10582',
      skills: ['AutoCAD', 'Quality Control', 'CMM Inspection', 'CNC'],
      certifications: ['NCVT Quality Assurance Technician', 'ISO 9001 Metrology'],
      matchScore: 89,
      experience: '1.5 years',
      education: 'ITI Draughtsman (Mechanical)',
      district: 'Pune',
      expectedWage: 23000,
      status: 'Ready to Hire',
      phone: '+91 98231 88471',
      email: 'snehal.pawar@disha.gov.in',
      itiName: 'Government ITI Pimpri, Pune',
      practicalScore: 92,
    },
    {
      id: 'cand-003',
      name: 'Vikram Shinde',
      traineeId: 'MH-NS-20419',
      skills: ['CNC', 'G-Code Programming', 'Fanuc Controller'],
      certifications: ['MSSDS Certified CNC Specialist'],
      matchScore: 86,
      experience: '2 years',
      education: 'ITI Machinist Trade',
      district: 'Nashik',
      expectedWage: 22000,
      status: 'Ready to Hire',
      phone: '+91 94220 91823',
      email: 'vikram.shinde@disha.gov.in',
      itiName: 'Government ITI Nashik (Ambad)',
      practicalScore: 90,
    },
    {
      id: 'cand-004',
      name: 'Pooja Kulkarni',
      traineeId: 'MH-CS-30192',
      skills: ['PLC', 'SCADA', 'Industrial Automation', 'Ladder Logic'],
      certifications: ['Siemens Certified Automation Associate'],
      matchScore: 82,
      experience: '8 months',
      education: 'Diploma in Electrical Engineering',
      district: 'Chhatrapati Sambhajinagar',
      expectedWage: 22500,
      status: 'Ready to Hire',
      phone: '+91 98901 77218',
      email: 'pooja.k@disha.gov.in',
      itiName: 'Govt Polytechnic Chhatrapati Sambhajinagar',
      practicalScore: 88,
    },
    {
      id: 'cand-005',
      name: 'Amit Jadhav',
      traineeId: 'MH-TH-40128',
      skills: ['EV Diagnostics', 'Battery Systems', 'High Voltage Safety'],
      certifications: ['ARAI Certified EV Service Technician'],
      matchScore: 78,
      experience: '1 year',
      education: 'ITI Motor Mechanic Vehicle',
      district: 'Thane',
      expectedWage: 25000,
      status: 'Ready to Hire',
      phone: '+91 97654 32109',
      email: 'amit.jadhav@disha.gov.in',
      itiName: 'Government ITI Thane',
      practicalScore: 85,
    },
    {
      id: 'cand-006',
      name: 'Ganesh More',
      traineeId: 'MH-NG-50183',
      skills: ['Robotics', 'Welding', 'Assembly', 'CNC'],
      certifications: ['MSSDS Heavy Fabrication & Robotic Arc'],
      matchScore: 75,
      experience: '2.5 years',
      education: 'ITI Welder Trade',
      district: 'Nagpur',
      expectedWage: 21000,
      status: 'Ready to Hire',
      phone: '+91 93710 44582',
      email: 'ganesh.more@disha.gov.in',
      itiName: 'Government ITI Nagpur',
      practicalScore: 89,
    },
  ];

  // Dynamically compute filtered list and adjusted match scores
  const filteredCandidates = useMemo(() => {
    return baseCandidates.filter((cand) => {
      if (selectedSkill !== 'All' && !cand.skills.includes(selectedSkill)) {
        return false;
      }
      if (selectedDistrict !== 'All' && cand.district !== selectedDistrict) {
        return false;
      }
      if (selectedExperience !== 'All') {
        if (selectedExperience === 'Under 1 yr' && !cand.experience.includes('month') && parseFloat(cand.experience) >= 1) return false;
        if (selectedExperience === '1-2 yrs' && (parseFloat(cand.experience) < 1 || parseFloat(cand.experience) > 2)) return false;
        if (selectedExperience === '2+ yrs' && parseFloat(cand.experience) < 2) return false;
      }
      return true;
    });
  }, [selectedSkill, selectedDistrict, selectedExperience]);

  const toggleCompare = (candidateId: string) => {
    setSelectedForCompare(prev => {
      const next = new Set(prev);
      if (next.has(candidateId)) {
        next.delete(candidateId);
      } else {
        if (next.size >= 3) {
          showToast('You can compare a maximum of 3 candidates simultaneously', 'warning');
          return prev;
        }
        next.add(candidateId);
      }
      return next;
    });
  };

  const handleShortlist = (cand: CandidateRecord) => {
    shortlistCandidate(cand.id, cand.name);
  };

  const isShortlisted = (id: string) => shortlistedCandidates.includes(id);

  return (
    <DashboardLayout 
      role="employer" 
      title="Candidate Matching &amp; Talent Engine" 
      subtitle="Maharashtra Skill Commission verified certified talent pipeline mapped to your manufacturing requirements"
    >
      {/* Top Filter Configuration Bar */}
      <Card padding="md" className="mb-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal size={16} className="text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Precision Match Parameters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
              Target Job Role
            </label>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            >
              <option>All Roles</option>
              <option>CNC Technician</option>
              <option>Automation &amp; PLC Tech</option>
              <option>EV Service Specialist</option>
              <option>Quality Assurance Inspector</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
              Required Core Skill
            </label>
            <select 
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            >
              <option value="All">All Skills</option>
              <option value="CNC">CNC</option>
              <option value="PLC">PLC</option>
              <option value="AutoCAD">AutoCAD</option>
              <option value="EV Diagnostics">EV Diagnostics</option>
              <option value="Robotics">Robotics</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
              Location / District
            </label>
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            >
              <option value="All">All Districts</option>
              <option value="Pune">Pune</option>
              <option value="Nashik">Nashik</option>
              <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
              <option value="Thane">Thane</option>
              <option value="Nagpur">Nagpur</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
              Experience Level
            </label>
            <select 
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            >
              <option value="All">All Experience Levels</option>
              <option value="Under 1 yr">Fresh Certified (&lt; 1 yr)</option>
              <option value="1-2 yrs">1–2 Years Apprentice</option>
              <option value="2+ yrs">2+ Years Experienced</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          <span className="text-slate-500 font-medium">
            Showing <strong className="text-slate-900 dark:text-slate-100">{filteredCandidates.length}</strong> matching candidates
          </span>
          <div className="flex gap-2">
            {selectedForCompare.size > 0 && (
              <Button size="sm" variant="primary" onClick={() => setShowComparison(true)}>
                Compare ({selectedForCompare.size})
              </Button>
            )}
            {(selectedRole !== 'All Roles' || selectedSkill !== 'All' || selectedDistrict !== 'All' || selectedExperience !== 'All') && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setSelectedRole('All Roles');
                  setSelectedSkill('All');
                  setSelectedDistrict('All');
                  setSelectedExperience('All');
                }}
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.map((candidate) => {
          const shortlisted = isShortlisted(candidate.id);
          const isComparing = selectedForCompare.has(candidate.id);

          return (
            <Card 
              key={candidate.id} 
              padding="md" 
              className={`bg-white dark:bg-slate-800 border transition-all duration-200 ${
                isComparing 
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-card-hover'
              }`}
            >
              {/* Header with Match % Badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      {candidate.name}
                      <ShieldCheck size={14} className="text-emerald-600" />
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500">{candidate.traineeId}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    <Star size={11} className="fill-emerald-600 text-emerald-600" />
                    {candidate.matchScore}% Match
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">DISHA AI Score</p>
                </div>
              </div>

              {/* Skills with Verified Checkmarks */}
              <div className="mb-3">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Verified Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded"
                    >
                      <CheckCircle2 size={11} className="text-emerald-600 dark:text-emerald-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location & Experience details */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 py-2 border-t border-b border-slate-100 dark:border-slate-700/60 my-3">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400" />
                  <span>{candidate.district}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase size={13} className="text-slate-400" />
                  <span>{candidate.experience} exp</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <IndianRupee size={13} className="text-slate-400" />
                  <span>Expected: <strong>₹{candidate.expectedWage.toLocaleString('en-IN')}/mo</strong></span>
                </div>
              </div>

              {/* Action Buttons: View Profile, Shortlist, Contact */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setViewingCandidate(candidate)}
                  className="w-full text-[11px]"
                >
                  View Profile
                </Button>

                <Button 
                  size="sm" 
                  variant={shortlisted ? 'primary' : 'outline'}
                  onClick={() => handleShortlist(candidate)}
                  className={`w-full text-[11px] ${shortlisted ? 'bg-emerald-700 hover:bg-emerald-800 text-white' : ''}`}
                >
                  {shortlisted ? (
                    <>
                      <CheckCircle size={12} className="mr-1" />
                      Shortlisted
                    </>
                  ) : (
                    <>
                      <Bookmark size={12} className="mr-1" />
                      Shortlist
                    </>
                  )}
                </Button>

                <Button 
                  size="sm" 
                  variant="secondary" 
                  onClick={() => setContactingCandidate(candidate)}
                  className="w-full text-[11px]"
                >
                  <Phone size={12} className="mr-1" />
                  Contact
                </Button>
              </div>

              {/* Compare toggle */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex justify-between items-center text-[11px]">
                <button 
                  type="button" 
                  onClick={() => toggleCompare(candidate.id)}
                  className={`text-xs font-medium hover:underline ${isComparing ? 'text-blue-600 font-bold' : 'text-slate-500'}`}
                >
                  {isComparing ? '✓ Selected for Compare' : '+ Add to Compare'}
                </button>
                <span className="text-[10px] text-slate-400 font-mono">ITI Practical: {candidate.practicalScore}%</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Profile Detail Drawer / Modal */}
      {viewingCandidate && (
        <Drawer
          open={!!viewingCandidate}
          onClose={() => setViewingCandidate(null)}
          title={`Candidate Profile — ${viewingCandidate.name}`}
          size="lg"
        >
          <div className="space-y-5 text-xs text-slate-700 dark:text-slate-300">
            {/* Header info */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{viewingCandidate.name}</h3>
                <p className="text-slate-500 font-mono">{viewingCandidate.traineeId} • Government ITI Aundh</p>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                  MSSDS Verified Apprentice &amp; Trade Candidate
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-emerald-600">{viewingCandidate.matchScore}%</span>
                <p className="text-[10px] text-slate-400">Match Readiness</p>
              </div>
            </div>

            {/* Academic & Training Credentials */}
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2">
                Verified Government Certifications
              </p>
              <div className="space-y-2">
                {viewingCandidate.certifications.map((cert) => (
                  <div key={cert} className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded flex items-center justify-between">
                    <span className="font-medium text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                      <FileCheck size={14} className="text-emerald-600" />
                      {cert}
                    </span>
                    <Badge variant="success" size="sm">DigiLocker Verified</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance scores */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Practical Assessment Score</span>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{viewingCandidate.practicalScore} / 100</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Attendance &amp; Lab Hours</span>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">98.4% (520 Hours)</p>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => {
                  handleShortlist(viewingCandidate);
                  setViewingCandidate(null);
                }}
              >
                <Bookmark size={14} className="mr-1.5" />
                {isShortlisted(viewingCandidate.id) ? 'Shortlisted' : 'Shortlist Candidate'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setContactingCandidate(viewingCandidate);
                  setViewingCandidate(null);
                }}
              >
                <Phone size={14} className="mr-1.5" />
                Contact
              </Button>
            </div>
          </div>
        </Drawer>
      )}

      {/* Contact Details Modal / Drawer */}
      {contactingCandidate && (
        <Drawer
          open={!!contactingCandidate}
          onClose={() => setContactingCandidate(null)}
          title={`Contact Details — ${contactingCandidate.name}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-900">
              <p className="font-semibold text-blue-900 dark:text-blue-200">Official Placement Channel</p>
              <p className="text-blue-800 dark:text-blue-300 mt-1">
                Direct interviews and campus drives are facilitated with the institutional training placement cell.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block mb-0.5">Direct Phone / WhatsApp</span>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">{contactingCandidate.phone}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block mb-0.5">Registered Email</span>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">{contactingCandidate.email}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block mb-0.5">ITI Training Placement Officer (TPO)</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Shri. V. K. Deshmukh (TPO, Govt ITI Aundh)</p>
                <p className="font-mono text-slate-500 mt-0.5">+91 20 2565 1920 • tpo.aundh@disha.gov.in</p>
              </div>
            </div>

            <div className="pt-2">
              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => {
                  showToast(`Interview invite dispatched to ${contactingCandidate.name} via DISHA SMS/Email`, 'success');
                  setContactingCandidate(null);
                }}
              >
                Dispatch Official Interview Call Letter
              </Button>
            </div>
          </div>
        </Drawer>
      )}

      {/* Comparison Drawer */}
      {showComparison && (
        <Drawer
          open={showComparison}
          onClose={() => setShowComparison(false)}
          title="Candidate Comparison Matrix"
          size="xl"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-3">
              {baseCandidates.filter(c => selectedForCompare.has(c.id)).map(cand => (
                <div key={cand.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-center">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{cand.name}</p>
                  <p className="text-emerald-600 font-bold mt-1">{cand.matchScore}% Match</p>
                  <p className="text-slate-500 mt-0.5">{cand.district}</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-2">₹{cand.expectedWage.toLocaleString('en-IN')}</p>
                  <Button 
                    size="sm" 
                    variant="primary" 
                    className="mt-3 w-full"
                    onClick={() => handleShortlist(cand)}
                  >
                    {isShortlisted(cand.id) ? 'Shortlisted' : 'Shortlist'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      )}
    </DashboardLayout>
  );
}
