'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge } from '@/components/ui';
import { User, MapPin, Building, Mail, Phone, Shield } from 'lucide-react';

export default function GovernmentProfilePage() {
  return (
    <DashboardLayout role="government" title="Profile" showDistrictSelector={false}>
      <div className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card padding="md" className="lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 font-bold text-2xl mb-4 border-2 border-brand-200">
                AD
              </div>
              <CardTitle className="mb-1">Anjali Deshmukh</CardTitle>
              <Badge variant="info" size="sm" className="mb-4">Government Officer</Badge>
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs">
                  <Building size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">Department</span>
                  <span className="text-text-primary font-medium">Skill Development</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <MapPin size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">Location</span>
                  <span className="text-text-primary font-medium">Mumbai</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Shield size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">Level</span>
                  <span className="text-text-primary font-medium">District Officer</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Details Card */}
          <Card padding="md" className="lg:col-span-2">
            <CardTitle className="mb-4">Profile Information</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-secondary mb-1">Employee ID</p>
                <p className="text-sm text-text-primary font-medium">GOV-2024-0847</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-text-secondary" />
                  <p className="text-sm text-text-primary font-medium">anjali.deshmukh@gov.in</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-text-secondary" />
                  <p className="text-sm text-text-primary font-medium">+91 22 2345 6789</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">District Assigned</p>
                <p className="text-sm text-text-primary font-medium">Mumbai City</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Joining Date</p>
                <p className="text-sm text-text-primary font-medium">March 15, 2021</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Reporting To</p>
                <p className="text-sm text-text-primary font-medium">Regional Director</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Account Settings */}
        <Card padding="md" className="mt-6">
          <CardTitle className="mb-4">Account Settings</CardTitle>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-text-primary">Email Notifications</p>
                <p className="text-xs text-text-secondary">Receive updates about program activities</p>
              </div>
              <div className="w-10 h-6 bg-brand-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-text-primary">SMS Alerts</p>
                <p className="text-xs text-text-secondary">Get critical alerts via SMS</p>
              </div>
              <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
