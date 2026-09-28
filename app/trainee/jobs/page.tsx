'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, Drawer, Tabs } from '@/components/ui';
import { jobRecommendations } from '@/data/mockTraineeExperience';
import { useApp } from '@/context/AppContext';
import { MapPin, IndianRupee, Briefcase, ArrowRight, CheckCircle, Bookmark, Clock, Star } from 'lucide-react';

export default function TraineeJobsPage() {
  const { appliedJobs: globalAppliedJobs, applyToJob } = useApp();
  const [selectedJob, setSelectedJob] = useState<typeof jobRecommendations[0] | null>(null);
  const [activeTab, setActiveTab] = useState('recommended');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [localAppliedJobs, setLocalAppliedJobs] = useState<Set<string>>(new Set());

  const isJobApplied = (id: string) => globalAppliedJobs.includes(id) || localAppliedJobs.has(id);

  const allJobs = [
    ...jobRecommendations,
    {
      id: 'JOB-006',
      title: 'Industrial Electrician',
      employer: 'L&T Construction',
      district: 'Mumbai',
      salaryRange: '₹18K–₹22K',
      type: 'full-time',
      matchScore: 78,
      matchedSkills: ['Electrical Systems', 'Safety Protocols'],
      missingSkills: ['Industrial Wiring', 'Panel Design'],
      experienceMatch: 'moderate',
      locationMatch: 'weak',
      postedDate: '2 days ago',
    },
    {
      id: 'JOB-007',
      title: 'Quality Control Inspector',
      employer: 'Bosch India',
      district: 'Nashik',
      salaryRange: '₹20K–₹25K',
      type: 'full-time',
      matchScore: 75,
      matchedSkills: ['Quality Standards', 'Measurement'],
      missingSkills: ['ISO Standards', 'Statistical Analysis'],
      experienceMatch: 'moderate',
      locationMatch: 'strong',
      postedDate: '3 days ago',
    },
    {
      id: 'JOB-008',
      title: 'Maintenance Technician',
      employer: 'Siemens India',
      district: 'Pune',
      salaryRange: '₹19K–₹24K',
      type: 'full-time',
      matchScore: 82,
      matchedSkills: ['Machine Maintenance', 'Troubleshooting'],
      missingSkills: ['Preventive Maintenance', 'CMMS'],
      experienceMatch: 'strong',
      locationMatch: 'strong',
      postedDate: '1 week ago',
    },
  ];

  const applications = [
    {
      id: 'APP-001',
      jobId: 'JOB-001',
      jobTitle: 'CNC Technician',
      employer: 'ABC Manufacturing',
      appliedDate: 'Sep 20, 2026',
      status: 'interviewed',
      lastUpdate: 'Sep 25, 2026',
    },
    {
      id: 'APP-002',
      jobId: 'JOB-002',
      jobTitle: 'PLC Programmer',
      employer: 'Tech Industries',
      appliedDate: 'Sep 18, 2026',
      status: 'pending',
      lastUpdate: 'Sep 18, 2026',
    },
  ];

  const toggleSave = (jobId: string) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleApply = (jobId: string, jobTitle: string) => {
    setLocalAppliedJobs(prev => new Set(prev).add(jobId));
    applyToJob(jobId, jobTitle);
  };

  const renderJobCard = (job: typeof jobRecommendations[0], showApply = true) => {
    const applied = isJobApplied(job.id);

    return (
      <Card key={job.id} padding="md" hover onClick={() => setSelectedJob(job)} className="cursor-pointer">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h3 className="text-sm font-semibold text-text-primary">{job.title}</h3>
              <Badge variant={job.matchScore >= 85 ? 'success' : job.matchScore >= 70 ? 'warning' : 'info'} size="sm">
                {job.matchScore}% Match
              </Badge>
              <Badge variant="neutral" size="sm">{job.type}</Badge>
              {'postedDate' in job && (
                <span className="text-xs text-text-tertiary">{(job as any).postedDate}</span>
              )}
            </div>
            <p className="text-xs text-text-secondary mb-2">{job.employer}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><MapPin size={12} /> {job.district}</span>
              <span className="flex items-center gap-1"><IndianRupee size={12} /> {job.salaryRange}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.matchedSkills.map((skill) => (
                <Badge key={skill} variant="success" size="sm">{skill}</Badge>
              ))}
              {job.missingSkills.map((skill) => (
                <Badge key={skill} variant="error" size="sm">{skill}</Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(job.id);
              }}
            >
              <Bookmark size={14} className={savedJobs.has(job.id) ? 'fill-current' : ''} />
            </Button>
            {showApply && !applied && (
              <Button 
                size="sm" 
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApply(job.id, job.title);
                }}
              >
                Apply
              </Button>
            )}
            {applied && (
              <Button size="sm" variant="success" disabled>
                <CheckCircle size={14} className="mr-1" />
                Applied
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <DashboardLayout 
      role="trainee" 
      title="Job Opportunities" 
      subtitle="Personalized job recommendations based on your skills"
      showDistrictSelector={false}
    >
      {/* Tabs */}
      <Tabs
        items={[
          { value: 'recommended', label: 'Recommended', count: jobRecommendations.length },
          { value: 'all', label: 'All Jobs', count: allJobs.length },
          { value: 'applications', label: 'Applications', count: applications.length },
          { value: 'saved', label: 'Saved', count: savedJobs.size },
        ]}
        defaultValue={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'recommended' && (
          <div className="space-y-3">
            {jobRecommendations.map((job) => renderJobCard(job))}
          </div>
        )}

        {activeTab === 'all' && (
          <div className="space-y-3">
            {allJobs.map((job) => renderJobCard(job as any))}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-3">
            {applications.map((app) => (
              <Card key={app.id} padding="md">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{app.jobTitle}</h3>
                    <p className="text-xs text-text-secondary mb-2">{app.employer}</p>
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Applied: {app.appliedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        Last update: {app.lastUpdate}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Badge 
                      variant={app.status === 'interviewed' ? 'success' : app.status === 'offered' ? 'success' : 'warning'} 
                      size="md"
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-3">
            {savedJobs.size === 0 ? (
              <Card padding="md">
                <p className="text-sm text-text-secondary text-center py-8">
                  No saved jobs yet. Click the bookmark icon on any job to save it for later.
                </p>
              </Card>
            ) : (
              allJobs
                .filter((job) => savedJobs.has(job.id))
                .map((job) => renderJobCard(job as any))
            )}
          </div>
        )}
      </div>

      {/* Job Match Detail Drawer */}
      {selectedJob && (
        <Drawer
          open={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title={selectedJob.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={selectedJob.matchScore >= 85 ? 'success' : selectedJob.matchScore >= 70 ? 'warning' : 'info'} size="md">
                {selectedJob.matchScore}% Skill Match
              </Badge>
              <Badge variant="neutral" size="md">{selectedJob.type}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Employer</p>
                <p className="text-sm font-medium text-text-primary">{selectedJob.employer}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Location</p>
                <p className="text-sm font-medium text-text-primary">{selectedJob.district}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Salary Range</p>
                <p className="text-sm font-medium text-text-primary">{selectedJob.salaryRange}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Employment Type</p>
                <p className="text-sm font-medium text-text-primary capitalize">{selectedJob.type}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-text-primary mb-2">Matched Skills</p>
              <div className="flex flex-wrap gap-2">
                {selectedJob.matchedSkills.map((skill) => (
                  <Badge key={skill} variant="success" size="sm">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-text-primary mb-2">Skills to Acquire</p>
              <div className="flex flex-wrap gap-2">
                {selectedJob.missingSkills.map((skill) => (
                  <Badge key={skill} variant="error" size="sm">{skill}</Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Experience Match</p>
                <Badge variant={selectedJob.experienceMatch === 'strong' ? 'success' : 'warning'} size="sm">
                  {selectedJob.experienceMatch}
                </Badge>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Location Match</p>
                <Badge variant={selectedJob.locationMatch === 'strong' ? 'success' : 'warning'} size="sm">
                  {selectedJob.locationMatch}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => {
                  handleApply(selectedJob.id, selectedJob.title);
                  setSelectedJob(null);
                }}
                disabled={isJobApplied(selectedJob.id)}
              >
                {isJobApplied(selectedJob.id) ? (
                  <>
                    <CheckCircle size={16} className="mr-2" />
                    Applied
                  </>
                ) : (
                  <>
                    Apply Now
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
              <Button 
                variant="outline"
                onClick={() => toggleSave(selectedJob.id)}
              >
                <Bookmark size={16} className={savedJobs.has(selectedJob.id) ? 'fill-current' : ''} />
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </DashboardLayout>
  );
}
