'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, Badge, Button, ProgressBar, EmploymentConfidence } from '@/components/ui';
import { candidates } from '@/data/mockEmployers';
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CandidateDetailPage({ params }: { params: { id: string } }) {
  const candidate = candidates.find(c => c.id === params.id);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [ratings, setRatings] = useState({
    skillReadiness: 4,
    technicalSkills: 4,
    softSkills: 3,
  });
  const [missingSkills, setMissingSkills] = useState('PLC, Advanced CNC');

  if (!candidate) {
    return (
      <DashboardLayout role="employer" title="Candidate Not Found" showDistrictSelector>
        <Card padding="md">
          <p className="text-text-secondary">Candidate not found</p>
          <Link href="/employer/candidates">
            <Button size="sm" variant="outline" className="mt-4">
              <ArrowLeft size={14} /> Back to Candidates
            </Button>
          </Link>
        </Card>
      </DashboardLayout>
    );
  }

  const skillScores = {
    skillMatch: 92,
    experience: 85,
    education: 75,
    location: 95,
  };

  const matchedSkills = ['CNC', 'AutoCAD', 'Machine Operation'];
  const missingSkillsList = ['G-Code'];

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 75) return 'warning';
    return 'error';
  };

  const handleRatingChange = (key: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true);
  };

  const renderStars = (rating: number, onChange: (value: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-lg ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout role="employer" title={candidate.name} subtitle="Candidate Profile" showDistrictSelector>
      <Link href="/employer/candidates">
        <Button size="sm" variant="ghost" className="mb-4">
          <ArrowLeft size={14} /> Back to Candidates
        </Button>
      </Link>

      {/* Candidate Overview */}
      <Card padding="md" className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{candidate.name}</h2>
            <p className="text-sm text-text-secondary mt-1">{candidate.experience}</p>
            <p className="text-sm text-text-secondary">{candidate.education}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-status-success">{candidate.matchScore}%</div>
            <div className="text-xs text-text-secondary">Skill Match</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {candidate.skills.map((skill) => (
            <Badge key={skill} variant="neutral" size="sm">{skill}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <MapPin size={12} /> {candidate.district}
        </div>
      </Card>

      {/* Employment Confidence */}
      <div className="mb-6">
        <EmploymentConfidence
          confidenceScore={85}
          signals={{
            employerVerified: true,
            traineeConfirmed: true,
            ninetyDayConfirmed: true,
            salaryUpdated: true,
          }}
        />
      </div>

      {/* Skill Breakdown */}
      <Card padding="md" className="mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Skill Breakdown</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Star size={14} />
                <span className="text-sm text-text-primary">Skill Match</span>
              </div>
              <span className="text-sm font-semibold text-status-success">{skillScores.skillMatch}%</span>
            </div>
            <ProgressBar value={skillScores.skillMatch} max={100} size="sm" color="success" />
            <div className="text-xs text-text-secondary mt-1">{getScoreLabel(skillScores.skillMatch)}</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Briefcase size={14} />
                <span className="text-sm text-text-primary">Experience</span>
              </div>
              <span className="text-sm font-semibold text-status-warning">{skillScores.experience}%</span>
            </div>
            <ProgressBar value={skillScores.experience} max={100} size="sm" color="warning" />
            <div className="text-xs text-text-secondary mt-1">{getScoreLabel(skillScores.experience)}</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <GraduationCap size={14} />
                <span className="text-sm text-text-primary">Education</span>
              </div>
              <span className="text-sm font-semibold text-status-warning">{skillScores.education}%</span>
            </div>
            <ProgressBar value={skillScores.education} max={100} size="sm" color="warning" />
            <div className="text-xs text-text-secondary mt-1">{getScoreLabel(skillScores.education)}</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span className="text-sm text-text-primary">Location</span>
              </div>
              <span className="text-sm font-semibold text-status-success">{skillScores.location}%</span>
            </div>
            <ProgressBar value={skillScores.location} max={100} size="sm" color="success" />
            <div className="text-xs text-text-secondary mt-1">{getScoreLabel(skillScores.location)}</div>
          </div>
        </div>
      </Card>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card padding="md">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Matched Skills</h3>
          <div className="space-y-2">
            {matchedSkills.map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-success" />
                <span className="text-sm text-text-primary">{skill}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Missing Skills</h3>
          <div className="space-y-2">
            {missingSkillsList.map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-error" />
                <span className="text-sm text-text-primary">{skill}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Training Relevance Feedback */}
      <Card padding="md" className="mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Training Relevance</h3>
        
        {feedbackSubmitted ? (
          <div className="flex items-center gap-2 text-status-success">
            <CheckCircle size={20} />
            <span className="text-sm font-medium">Feedback submitted successfully!</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary">Skill readiness</span>
              <div className="flex items-center gap-2">
                {renderStars(ratings.skillReadiness, (value) => handleRatingChange('skillReadiness', value))}
                <span className="text-xs text-text-secondary">{ratings.skillReadiness}/5</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary">Technical skills</span>
              <div className="flex items-center gap-2">
                {renderStars(ratings.technicalSkills, (value) => handleRatingChange('technicalSkills', value))}
                <span className="text-xs text-text-secondary">{ratings.technicalSkills}/5</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary">Soft skills</span>
              <div className="flex items-center gap-2">
                {renderStars(ratings.softSkills, (value) => handleRatingChange('softSkills', value))}
                <span className="text-xs text-text-secondary">{ratings.softSkills}/5</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-text-primary block mb-2">Missing skills</label>
              <input
                type="text"
                value={missingSkills}
                onChange={(e) => setMissingSkills(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Enter missing skills separated by commas"
              />
            </div>

            <Button size="sm" variant="primary" onClick={handleSubmitFeedback}>
              Submit Feedback
            </Button>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button size="sm" variant="primary">Shortlist</Button>
        <Button size="sm" variant="outline">Schedule Interview</Button>
        <Button size="sm" variant="ghost">Message</Button>
      </div>
    </DashboardLayout>
  );
}
