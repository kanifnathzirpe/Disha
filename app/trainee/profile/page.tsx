'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, ProgressBar } from '@/components/ui';
import { User, MapPin, Phone, Mail, GraduationCap, Award, Briefcase } from 'lucide-react';
import { traineeDashboard } from '@/data/mockTrainees';

export default function TraineeProfilePage() {
  const { profile } = traineeDashboard;

  return (
    <DashboardLayout role="trainee" title="My Profile" showDistrictSelector={false}>
      <div className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card padding="md" className="lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 font-bold text-2xl mb-4 border-2 border-brand-200">
                {profile.name.charAt(0)}
              </div>
              <CardTitle className="mb-1">{profile.name}</CardTitle>
              <Badge variant={profile.currentStatus === 'employed' ? 'success' : 'info'} size="sm" className="mb-4">
                {profile.currentStatus}
              </Badge>
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">District</span>
                  <span className="text-text-primary font-medium">{profile.district}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <GraduationCap size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">Education</span>
                  <span className="text-text-primary font-medium">{profile.education}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Award size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">Skills</span>
                  <span className="text-text-primary font-medium">{profile.skills.length} verified</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Details Card */}
          <Card padding="md" className="lg:col-span-2">
            <CardTitle className="mb-4">Personal Information</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-secondary mb-1">Trainee ID</p>
                <p className="text-sm text-text-primary font-medium">TRN-2024-1234</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Aadhaar Number</p>
                <p className="text-sm text-text-primary font-medium">XXXX-XXXX-{profile.aadhaarLast4}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-text-secondary" />
                  <p className="text-sm text-text-primary font-medium">rahul.sharma@email.com</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-text-secondary" />
                  <p className="text-sm text-text-primary font-medium">{profile.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Age</p>
                <p className="text-sm text-text-primary font-medium">{profile.age} years</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Gender</p>
                <p className="text-sm text-text-primary font-medium capitalize">{profile.gender}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills Section */}
        <Card padding="md" className="mt-6">
          <CardTitle className="mb-4">Verified Skills</CardTitle>
          <div className="space-y-4">
            {profile.skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{skill.name}</p>
                    <p className="text-xs text-text-secondary">{skill.category}</p>
                  </div>
                  <Badge variant="success" size="sm">Verified</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <ProgressBar value={skill.level === 'expert' ? 100 : skill.level === 'advanced' ? 75 : skill.level === 'intermediate' ? 50 : 25} size="sm" color="brand" />
                  <span className="text-xs text-text-secondary capitalize">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Certifications Section */}
        <Card padding="md" className="mt-6">
          <CardTitle className="mb-4">Certifications</CardTitle>
          <div className="space-y-3">
            {profile.certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <div className="w-10 h-10 rounded-md bg-brand-50 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <Award size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{cert.name}</p>
                  <p className="text-xs text-text-secondary">{cert.issuer} • {cert.sector}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={cert.status === 'active' ? 'success' : 'warning'} size="sm">
                      {cert.status}
                    </Badge>
                    <span className="text-xs text-text-tertiary">ID: {cert.credentialId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Employment History */}
        <Card padding="md" className="mt-6">
          <CardTitle className="mb-4">Employment History</CardTitle>
          <div className="space-y-3">
            {profile.employmentHistory.map((emp) => (
              <div key={emp.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <div className="w-10 h-10 rounded-md bg-brand-50 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <Briefcase size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{emp.role}</p>
                  <p className="text-xs text-text-secondary">{emp.employer} • {emp.sector}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={emp.status === 'active' ? 'success' : 'neutral'} size="sm">
                      {emp.status}
                    </Badge>
                    <span className="text-xs text-text-tertiary">{emp.district}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
