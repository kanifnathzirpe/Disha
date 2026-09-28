'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Download,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

type AttendanceStatus = 'present' | 'absent' | 'leave' | 'holiday' | 'future';

interface DayRecord {
  date: number;
  status: AttendanceStatus;
  session?: string;
  hours?: number;
}

interface SessionLog {
  id: string;
  date: string;
  session: string;
  checkIn: string;
  checkOut: string;
  hours: number;
  status: 'present' | 'absent' | 'late';
  topic: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateAttendanceData(year: number, month: number): DayRecord[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const records: DayRecord[] = [];
  
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dayOfWeek = date.getDay();
    
    if (date > today) {
      records.push({ date: d, status: 'future' });
    } else if (dayOfWeek === 0) {
      records.push({ date: d, status: 'holiday' });
    } else {
      const rand = Math.random();
      if (rand > 0.12) {
        records.push({ date: d, status: 'present', session: 'Full Day', hours: 8 });
      } else if (rand > 0.05) {
        records.push({ date: d, status: 'absent' });
      } else {
        records.push({ date: d, status: 'leave', session: 'Approved Leave' });
      }
    }
  }
  return records;
}

const sessionLogs: SessionLog[] = [
  { id: 'S001', date: '27 Sep 2026', session: 'Morning', checkIn: '09:02 AM', checkOut: '01:05 PM', hours: 4, status: 'present', topic: 'CNC G-Code Programming Lab' },
  { id: 'S002', date: '27 Sep 2026', session: 'Afternoon', checkIn: '02:00 PM', checkOut: '05:55 PM', hours: 4, status: 'present', topic: 'Precision Measurement Workshop' },
  { id: 'S003', date: '26 Sep 2026', session: 'Morning', checkIn: '09:15 AM', checkOut: '01:00 PM', hours: 3.75, status: 'late', topic: 'AutoCAD Mechanical Drawing' },
  { id: 'S004', date: '26 Sep 2026', session: 'Afternoon', checkIn: '02:00 PM', checkOut: '06:00 PM', hours: 4, status: 'present', topic: 'Industrial Safety Training' },
  { id: 'S005', date: '25 Sep 2026', session: 'Full Day', checkIn: '—', checkOut: '—', hours: 0, status: 'absent', topic: 'Quality Control Methods' },
  { id: 'S006', date: '24 Sep 2026', session: 'Morning', checkIn: '08:58 AM', checkOut: '01:02 PM', hours: 4, status: 'present', topic: 'Lathe Operation Practicals' },
  { id: 'S007', date: '24 Sep 2026', session: 'Afternoon', checkIn: '02:05 PM', checkOut: '06:00 PM', hours: 4, status: 'present', topic: '5S Workplace Organization' },
  { id: 'S008', date: '23 Sep 2026', session: 'Morning', checkIn: '09:00 AM', checkOut: '01:00 PM', hours: 4, status: 'present', topic: 'CNC Turning Operations' },
];

export default function TraineeAttendancePage() {
  const { showToast } = useApp();
  const [currentMonth, setCurrentMonth] = useState(8); // September (0-indexed)
  const [currentYear] = useState(2026);
  
  const attendanceData = generateAttendanceData(currentYear, currentMonth);
  
  const presentDays = attendanceData.filter(d => d.status === 'present').length;
  const absentDays = attendanceData.filter(d => d.status === 'absent').length;
  const leaveDays = attendanceData.filter(d => d.status === 'leave').length;
  const totalWorkingDays = presentDays + absentDays + leaveDays;
  const attendanceRate = totalWorkingDays > 0 ? Math.round((presentDays / totalWorkingDays) * 100) : 0;
  const totalHours = attendanceData.reduce((sum, d) => sum + (d.hours || 0), 0);
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return 'bg-emerald-500 text-white';
      case 'absent': return 'bg-red-400 text-white';
      case 'leave': return 'bg-amber-400 text-white';
      case 'holiday': return 'bg-slate-200 text-slate-500';
      case 'future': return 'bg-slate-50 text-slate-300 border border-dashed border-slate-200';
    }
  };

  // SVG ring constants
  const ringRadius = 54;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (attendanceRate / 100) * ringCircumference;

  return (
    <DashboardLayout
      role="trainee"
      title="Attendance Tracker"
      subtitle="Track your daily session attendance and training hours"
    >
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Present</p>
              <p className="text-xl font-bold text-slate-900">{presentDays}</p>
            </div>
          </div>
        </Card>
        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <XCircle size={20} className="text-red-500" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Absent</p>
              <p className="text-xl font-bold text-slate-900">{absentDays}</p>
            </div>
          </div>
        </Card>
        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Total Hours</p>
              <p className="text-xl font-bold text-slate-900">{totalHours}</p>
            </div>
          </div>
        </Card>
        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Working Days</p>
              <p className="text-xl font-bold text-slate-900">{totalWorkingDays}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Attendance Calendar */}
        <Card padding="md" className="lg:col-span-2 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Monthly Attendance Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth(m => Math.max(0, m - 1))}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-slate-800 min-w-[140px] text-center">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </span>
              <button
                onClick={() => setCurrentMonth(m => Math.min(11, m + 1))}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAY_NAMES.map(day => (
              <div key={day} className="text-center text-[10px] font-semibold text-slate-500 uppercase py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {/* Actual day cells */}
            {attendanceData.map((day) => (
              <div
                key={day.date}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all ${getStatusColor(day.status)} ${day.status !== 'future' ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-blue-300' : ''}`}
                title={`${day.date} ${MONTH_NAMES[currentMonth]}: ${day.status.toUpperCase()}${day.hours ? ` — ${day.hours}h` : ''}`}
              >
                <span className="font-bold text-[13px]">{day.date}</span>
                {day.hours && <span className="text-[9px] opacity-80">{day.hours}h</span>}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-[10px] text-slate-600">Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-red-400" />
              <span className="text-[10px] text-slate-600">Absent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-400" />
              <span className="text-[10px] text-slate-600">Leave</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-200" />
              <span className="text-[10px] text-slate-600">Holiday</span>
            </div>
          </div>
        </Card>

        {/* Attendance Rate Ring */}
        <Card padding="md" className="bg-white border-slate-200 flex flex-col items-center justify-center">
          <CardTitle className="mb-6">Attendance Rate</CardTitle>
          <div className="relative">
            <svg width="140" height="140" viewBox="0 0 120 120">
              {/* Background ring */}
              <circle cx="60" cy="60" r={ringRadius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
              {/* Progress ring */}
              <circle
                cx="60" cy="60" r={ringRadius}
                fill="none"
                stroke={attendanceRate >= 75 ? '#10b981' : attendanceRate >= 60 ? '#f59e0b' : '#ef4444'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                transform="rotate(-90 60 60)"
                className="transition-all duration-1000"
              />
              <text x="60" y="55" textAnchor="middle" className="text-2xl font-bold" fill="#0f172a" fontSize="24">{attendanceRate}%</text>
              <text x="60" y="72" textAnchor="middle" fill="#64748b" fontSize="10">of sessions</text>
            </svg>
          </div>

          <div className="w-full mt-6 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Present Days</span>
              <span className="font-bold text-emerald-600">{presentDays}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Absent Days</span>
              <span className="font-bold text-red-500">{absentDays}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Leave Days</span>
              <span className="font-bold text-amber-500">{leaveDays}</span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-2">
              <span className="text-slate-600">Total Working Days</span>
              <span className="font-bold text-slate-900">{totalWorkingDays}</span>
            </div>
          </div>

          {attendanceRate < 75 && (
            <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex gap-2">
              <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              <span>Attendance below 75% threshold. Minimum 75% required for certification eligibility.</span>
            </div>
          )}
        </Card>
      </div>

      {/* Session Logs Table */}
      <Card padding="md" className="bg-white border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Session Logs</CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={() => showToast('Attendance log exported successfully', 'success')}
            className="text-xs"
          >
            <Download size={14} className="mr-1.5" />
            Export Log
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600">
                <th className="p-3">Date</th>
                <th className="p-3">Session</th>
                <th className="p-3">Topic</th>
                <th className="p-3">Check In</th>
                <th className="p-3">Check Out</th>
                <th className="p-3">Hours</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessionLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-800">{log.date}</td>
                  <td className="p-3 text-slate-600">{log.session}</td>
                  <td className="p-3 text-slate-700 max-w-[200px] truncate">{log.topic}</td>
                  <td className="p-3 text-slate-600">{log.checkIn}</td>
                  <td className="p-3 text-slate-600">{log.checkOut}</td>
                  <td className="p-3 font-medium text-slate-800">{log.hours > 0 ? `${log.hours}h` : '—'}</td>
                  <td className="p-3">
                    <Badge
                      variant={log.status === 'present' ? 'success' : log.status === 'late' ? 'warning' : 'error'}
                      size="sm"
                    >
                      {log.status.toUpperCase()}
                    </Badge>
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
