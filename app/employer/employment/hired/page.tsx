'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { UserCheck, ShieldCheck, Calendar, Download } from 'lucide-react';

export default function HiredEmployeesPage() {
  const hiredList = [
    { id: 'H-01', name: 'Rahul Sharma', role: 'CNC Technician', dept: 'Machine Shop 2', joining: '12 May 2026', wage: 22500, retentionStatus: '90D Completed', verified: true },
    { id: 'H-02', name: 'Vikram Shinde', role: 'CNC Operator', dept: 'Machine Shop 1', joining: '01 June 2026', wage: 21000, retentionStatus: '90D Completed', verified: true },
    { id: 'H-03', name: 'Snehal Pawar', role: 'Quality Inspector', dept: 'QA / Metrology', joining: '15 June 2026', wage: 23000, retentionStatus: 'Active (60D)', verified: true },
    { id: 'H-04', name: 'Ganesh More', role: 'Assembly Tech', dept: 'Powertrain Line', joining: '10 July 2026', wage: 20000, retentionStatus: 'Active (45D)', verified: true },
  ];

  return (
    <DashboardLayout
      role="employer"
      title="Hired Certified Employees"
      subtitle="Official company roster of ITI &amp; MSSDS placed candidates"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">Total Hired (2026)</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">9 Employees</p>
        </Card>
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">90-Day Retention Rate</span>
          <p className="text-2xl font-bold text-emerald-600">88.9%</p>
        </Card>
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500">EPFO Direct Verified</span>
          <p className="text-2xl font-bold text-blue-600">100%</p>
        </Card>
      </div>

      <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardTitle>Active Employee Roster</CardTitle>
        <p className="text-xs text-slate-500 mb-4">Official records submitted for state employer incentive subsidies</p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-600 dark:text-slate-300">
                <th className="p-3">Employee Name</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Department</th>
                <th className="p-3">Joining Date</th>
                <th className="p-3">Monthly Wage</th>
                <th className="p-3">Retention Milestone</th>
                <th className="p-3 text-right">Subsidy Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {hiredList.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{emp.name}</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-medium">{emp.role}</td>
                  <td className="p-3 text-slate-500">{emp.dept}</td>
                  <td className="p-3 font-mono text-slate-500">{emp.joining}</td>
                  <td className="p-3 font-mono font-semibold">{formatCurrency(emp.wage)}</td>
                  <td className="p-3">
                    <Badge variant="success" size="sm">{emp.retentionStatus}</Badge>
                  </td>
                  <td className="p-3 text-right">
                    <Badge variant="info" size="sm">Govt Incentive Approved</Badge>
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
