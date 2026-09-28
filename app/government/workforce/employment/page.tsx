'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { Briefcase, Building2, MapPin, CheckCircle2, Search, Filter } from 'lucide-react';

export default function EmploymentTrackingPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const employments = [
    { id: 'EMP-01', trainee: 'Rahul Sharma', employer: 'ABC Manufacturing Ltd', role: 'CNC Technician', district: 'Pune', wage: 22500, verified: true, date: '2026-05-12' },
    { id: 'EMP-02', trainee: 'Pooja Kadam', employer: 'Tata Motors EV Div', role: 'EV Diagnostics Tech', district: 'Pune', wage: 26000, verified: true, date: '2026-06-01' },
    { id: 'EMP-03', trainee: 'Sachin Patil', employer: 'Siemens Energy', role: 'PLC Programmer', district: 'Nashik', wage: 24000, verified: true, date: '2026-04-18' },
    { id: 'EMP-04', trainee: 'Anil Jadhav', employer: 'L&T Heavy Engineering', role: 'Welding Inspector', district: 'Nagpur', wage: 19500, verified: false, date: '2026-07-20' },
    { id: 'EMP-05', trainee: 'Sneha More', employer: 'Cognizant Pune', role: 'Full Stack Trainee', district: 'Pune', wage: 28000, verified: true, date: '2026-03-15' },
    { id: 'EMP-06', trainee: 'Deepak Shinde', employer: 'Bosch Automotive', role: 'Quality Technician', district: 'Nashik', wage: 21000, verified: true, date: '2026-05-28' },
  ];

  const filtered = employments.filter(e => 
    e.trainee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      role="government"
      title="Workforce Employment Tracking"
      subtitle="Real-time post-certification placement records verified via EPFO and DigiLocker"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 max-w-sm w-full bg-white dark:bg-slate-800 px-3 py-2 border rounded-md">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search trainee, employer, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs bg-transparent focus:outline-none w-full"
          />
        </div>
        <div className="text-xs text-slate-500">
          Total verified employment records: <strong>57,420</strong>
        </div>
      </div>

      <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardTitle>Verified Trainee Placements</CardTitle>
        <p className="text-xs text-slate-500 mb-4">Official employer reporting and wage verification feeds</p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-600 dark:text-slate-300">
                <th className="p-3">Trainee Name</th>
                <th className="p-3">Hiring Employer</th>
                <th className="p-3">Designation</th>
                <th className="p-3">District</th>
                <th className="p-3">Monthly Wage</th>
                <th className="p-3">Placement Date</th>
                <th className="p-3 text-right">EPFO Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{item.trainee}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{item.employer}</td>
                  <td className="p-3 font-medium text-blue-600 dark:text-blue-400">{item.role}</td>
                  <td className="p-3 text-slate-500">{item.district}</td>
                  <td className="p-3 font-mono font-semibold">{formatCurrency(item.wage)}</td>
                  <td className="p-3 font-mono text-slate-500">{item.date}</td>
                  <td className="p-3 text-right">
                    {item.verified ? (
                      <Badge variant="success" size="sm">
                        <CheckCircle2 size={11} className="mr-1 inline" />
                        EPFO Verified
                      </Badge>
                    ) : (
                      <Badge variant="warning" size="sm">Pending Verification</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
