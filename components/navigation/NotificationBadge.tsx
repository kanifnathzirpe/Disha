'use client';

import React, { useState } from 'react';
import { Bell, X, Check, AlertTriangle, Briefcase, Target, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'critical' | 'warning' | 'info' | 'success';
}

const roleNotifications: Record<UserRole, Notification[]> = {
  government: [
    {
      id: 'gov-1',
      title: 'Critical Skill Gap Detected',
      message: 'EV Diagnostics shortage in Pune requires immediate attention',
      time: '2 hours ago',
      read: false,
      type: 'critical',
    },
    {
      id: 'gov-2',
      title: 'Provider Performance Changed',
      message: 'Skill Development Center Nashik placement rate dropped 11%',
      time: '5 hours ago',
      read: false,
      type: 'warning',
    },
    {
      id: 'gov-3',
      title: 'Retention Dropped',
      message: 'Welding program 180D retention below target in Nashik',
      time: '1 day ago',
      read: false,
      type: 'warning',
    },
    {
      id: 'gov-4',
      title: 'New Recommendation Available',
      message: 'Policy recommendation for Industrial Automation expansion ready',
      time: '2 days ago',
      read: true,
      type: 'info',
    },
    {
      id: 'gov-5',
      title: 'Industrial Automation Demand Increased',
      message: '27% demand growth detected across Pune and Nagpur',
      time: '3 days ago',
      read: true,
      type: 'info',
    },
    {
      id: 'gov-6',
      title: 'Data Quality Alert',
      message: '4,200 trainees missing employment status updates',
      time: '4 days ago',
      read: true,
      type: 'warning',
    },
    {
      id: 'gov-7',
      title: 'Monthly Report Generated',
      message: 'September skill outcome report is ready for review',
      time: '5 days ago',
      read: true,
      type: 'success',
    },
  ],
  trainee: [
    {
      id: 'trn-1',
      title: 'New Job Match',
      message: 'CNC Technician position at ABC Manufacturing - 92% match',
      time: '1 hour ago',
      read: false,
      type: 'success',
    },
    {
      id: 'trn-2',
      title: 'New Job Match',
      message: 'PLC Programmer role at Tech Industries - 89% match',
      time: '3 hours ago',
      read: false,
      type: 'success',
    },
    {
      id: 'trn-3',
      title: 'G-Code Training Available',
      message: 'Complete G-Code certification to improve job prospects',
      time: '1 day ago',
      read: true,
      type: 'info',
    },
    {
      id: 'trn-4',
      title: 'Application Status Update',
      message: 'Your application for EV Technician is under review',
      time: '2 days ago',
      read: true,
      type: 'info',
    },
  ],
  employer: [
    {
      id: 'emp-1',
      title: '4 Candidates Matched',
      message: 'New candidates matching CNC Technician requirements',
      time: '1 hour ago',
      read: false,
      type: 'success',
    },
    {
      id: 'emp-2',
      title: 'Application Received',
      message: 'Rahul Sharma applied for CNC Technician position',
      time: '2 hours ago',
      read: false,
      type: 'info',
    },
    {
      id: 'emp-3',
      title: 'Verification Pending',
      message: '3 employment verifications awaiting trainee confirmation',
      time: '1 day ago',
      read: true,
      type: 'warning',
    },
    {
      id: 'emp-4',
      title: 'Interview Scheduled',
      message: 'Interview with Amit Patil for CNC Operator role tomorrow',
      time: '2 days ago',
      read: true,
      type: 'info',
    },
  ],
  institution: [
    {
      id: 'inst-1',
      title: 'AEBAS Biometric Alert',
      message: 'Morpho Terminal 01 in CNC Workshop synchronized 142 valid punches',
      time: '15 mins ago',
      read: false,
      type: 'success',
    },
    {
      id: 'inst-2',
      title: 'Dropout Risk Warning',
      message: '3 trainees flagged below 75% attendance threshold in BAT-2026-041',
      time: '2 hours ago',
      read: false,
      type: 'warning',
    },
    {
      id: 'inst-3',
      title: 'State Subsidy Claim Approved',
      message: 'DVET approved Tranche-3 reimbursement of ₹5.4 Lakhs for Batch #40',
      time: '1 day ago',
      read: true,
      type: 'info',
    },
  ],
};

interface NotificationBadgeProps {
  className?: string;
  role: UserRole;
}

export function NotificationBadge({ className, role }: NotificationBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = roleNotifications[role];
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle size={14} className="text-status-error" />;
      case 'warning': return <Clock size={14} className="text-status-warning" />;
      case 'success': return <Check size={14} className="text-status-success" />;
      default: return <Bell size={14} className="text-text-secondary" />;
    }
  };

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md hover:bg-gray-100 text-text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-error rounded-full" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-96 bg-surface border border-border rounded-md shadow-dropdown z-20">
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                <span className="text-xs text-text-secondary">{unreadCount} unread</span>
              </div>
            </div>
            <div className="py-2 max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'px-3 py-2 border-b border-border-light last:border-0 hover:bg-gray-50 transition-colors cursor-pointer',
                    !notification.read && 'bg-brand-50'
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-text-primary">{notification.title}</p>
                        {!notification.read && (
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-text-tertiary mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-gray-100 rounded-md transition-colors"
              >
                Mark all as read
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 rounded-md transition-colors"
              >
                View all
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
