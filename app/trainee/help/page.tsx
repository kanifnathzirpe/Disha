'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle } from '@/components/ui';
import { HelpCircle, Phone, Mail, BookOpen, MessageSquare } from 'lucide-react';

export default function TraineeHelpPage() {
  return (
    <DashboardLayout role="trainee" title="Help & Support" showDistrictSelector={false}>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">How can we help you?</h2>
          <p className="text-sm text-text-secondary">
            Find answers to common questions or contact our support team for assistance with your training and career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card padding="md" className="hover:shadow-card-hover transition-shadow cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-500 flex-shrink-0">
                <BookOpen size={20} />
              </div>
              <div>
                <CardTitle className="mb-1">Training Guides</CardTitle>
                <p className="text-xs text-text-secondary">
                  Program information, certification details, and learning resources
                </p>
              </div>
            </div>
          </Card>

          <Card padding="md" className="hover:shadow-card-hover transition-shadow cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-500 flex-shrink-0">
                <MessageSquare size={20} />
              </div>
              <div>
                <CardTitle className="mb-1">FAQs</CardTitle>
                <p className="text-xs text-text-secondary">
                  Frequently asked questions about jobs, certifications, and employment
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card padding="md" className="mb-6">
          <CardTitle className="mb-4">Contact Support</CardTitle>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-text-secondary">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Helpline</p>
                <p className="text-xs text-text-secondary">1800-123-4567 (Toll Free)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-text-secondary">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Email</p>
                <p className="text-xs text-text-secondary">trainee-support@disha.maharashtra.gov.in</p>
              </div>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <CardTitle className="mb-4">Quick Links</CardTitle>
          <div className="space-y-2">
            <a href="#" className="block text-sm text-brand-600 hover:text-brand-700">
              How to Register for Programs
            </a>
            <a href="#" className="block text-sm text-brand-600 hover:text-brand-700">
              Certification Process
            </a>
            <a href="#" className="block text-sm text-brand-600 hover:text-brand-700">
              Job Application Guide
            </a>
            <a href="#" className="block text-sm text-brand-600 hover:text-brand-700">
              Privacy Policy
            </a>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
