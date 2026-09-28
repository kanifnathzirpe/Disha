'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import {
  Trophy,
  Medal,
  Star,
  Search,
  Filter,
  TrendingUp,
  Zap,
  Target,
  Award,
  ArrowUp,
  Flame,
  Crown,
} from 'lucide-react';

type LeaderboardTab = 'active' | 'recovery' | 'all';

interface LeaderboardEntry {
  rank: number;
  name: string;
  institution: string;
  location: string;
  primarySkill: string;
  coursesCompleted: number;
  points: number;
  status: 'active' | 'recovery' | 'inactive';
  streak: number;
  isCurrentUser?: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'Priya Sharma', institution: 'Govt College of Engineering, Bangalore', location: 'Bengaluru', primarySkill: 'DBMS', coursesCompleted: 4, points: 990, status: 'active', streak: 28 },
  { rank: 2, name: 'Rohan Deshmukh', institution: 'Apex Technical Institute, Pune', location: 'Pune', primarySkill: 'Electrical Works', coursesCompleted: 4, points: 920, status: 'active', streak: 22 },
  { rank: 3, name: 'Aarav Mehta', institution: 'State Institute of Engineering, Jaipur', location: 'Jaipur', primarySkill: 'DSA', coursesCompleted: 3, points: 875, status: 'active', streak: 15 },
  { rank: 4, name: 'Rahul Sharma', institution: 'Govt ITI Aundh, Pune', location: 'Pune', primarySkill: 'CNC Turning', coursesCompleted: 4, points: 860, status: 'active', streak: 18, isCurrentUser: true },
  { rank: 5, name: 'Vikram Patel', institution: 'Mahavir Technical College, Hassan', location: 'Hassan', primarySkill: 'Electrical Works', coursesCompleted: 3, points: 810, status: 'active', streak: 12 },
  { rank: 6, name: 'Sneha Kulkarni', institution: 'DKTE College, Kolhapur', location: 'Kolhapur', primarySkill: 'AutoCAD', coursesCompleted: 3, points: 780, status: 'active', streak: 9 },
  { rank: 7, name: 'Aditya Joshi', institution: 'ITI Nashik', location: 'Nashik', primarySkill: 'Welding', coursesCompleted: 2, points: 720, status: 'active', streak: 7 },
  { rank: 8, name: 'Meera Patil', institution: 'MSBTE Center, Aurangabad', location: 'Aurangabad', primarySkill: 'IoT', coursesCompleted: 3, points: 690, status: 'recovery', streak: 0 },
  { rank: 9, name: 'Arjun Singh', institution: 'Sandip Foundation, Nashik', location: 'Nashik', primarySkill: 'PLC Programming', coursesCompleted: 2, points: 650, status: 'recovery', streak: 0 },
  { rank: 10, name: 'Kavita Desai', institution: 'MIT Polytechnic, Pune', location: 'Pune', primarySkill: 'EV Diagnostics', coursesCompleted: 2, points: 620, status: 'recovery', streak: 0 },
  { rank: 11, name: 'Nikhil Jadhav', institution: 'Govt ITI Thane', location: 'Thane', primarySkill: 'Mechatronics', coursesCompleted: 1, points: 440, status: 'inactive', streak: 0 },
  { rank: 12, name: 'Pooja Bhosale', institution: 'KJ Somaiya Polytechnic', location: 'Mumbai', primarySkill: 'Industrial Safety', coursesCompleted: 1, points: 380, status: 'inactive', streak: 0 },
];

export default function TraineeLeaderboardPage() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('active');
  const [searchQuery, setSearchQuery] = useState('');
  
  const tabs: { key: LeaderboardTab; label: string; count: number }[] = [
    { key: 'active', label: 'Active Roster', count: leaderboardData.filter(e => e.status === 'active').length },
    { key: 'recovery', label: 'In Recovery / Marked', count: leaderboardData.filter(e => e.status === 'recovery').length },
    { key: 'all', label: 'All Registered', count: leaderboardData.length },
  ];

  const filteredData = leaderboardData
    .filter(entry => {
      if (activeTab === 'active') return entry.status === 'active';
      if (activeTab === 'recovery') return entry.status === 'recovery';
      return true;
    })
    .filter(entry =>
      searchQuery === '' ||
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.primarySkill.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const currentUserEntry = leaderboardData.find(e => e.isCurrentUser);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={18} className="text-amber-500" />;
    if (rank === 2) return <Medal size={18} className="text-slate-400" />;
    if (rank === 3) return <Medal size={18} className="text-amber-700" />;
    return <span className="text-sm font-bold text-slate-500">#{rank}</span>;
  };

  return (
    <DashboardLayout
      role="trainee"
      title="Leaderboard"
      subtitle="Track your rank and compare progress with peers across Maharashtra"
    >
      {/* Your Rank Summary */}
      {currentUserEntry && (
        <Card padding="md" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <span className="text-xl font-bold">#{currentUserEntry.rank}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Your Rank: #{currentUserEntry.rank}</h3>
                <p className="text-sm text-slate-600">
                  {currentUserEntry.points} points · {currentUserEntry.coursesCompleted} courses completed · Top {Math.round((currentUserEntry.rank / leaderboardData.length) * 100)}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-orange-500" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Streak</p>
                  <p className="text-sm font-bold text-slate-800">{currentUserEntry.streak} days</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target size={18} className="text-emerald-500" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Next Rank In</p>
                  <p className="text-sm font-bold text-slate-800">15 pts</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => showToast('Recovery challenge started! Complete 2 tasks to regain active status.', 'info')}
                className="text-xs"
              >
                <Zap size={14} className="mr-1" />
                Earn Points
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Recovery Challenge Banner */}
      <Card padding="md" className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Zap size={20} className="text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="warning" size="sm">RECOVERY CHALLENGES WAITING</Badge>
              <span className="text-[10px] text-slate-500">Leaderboard Status: Active</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">GET BACK ON TRACK</h3>
            <p className="text-xs text-slate-600 mb-2">
              You have recovery challenges waiting for you. Complete them to return to the active leaderboard.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-600">2 / 4 completed</span>
              <span className="text-xs text-slate-500">· 14 days remaining</span>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => showToast('Starting recovery challenge...', 'info')}
            className="text-xs flex-shrink-0"
          >
            Continue Recovery →
          </Button>
        </div>
      </Card>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search student or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs pl-8 pr-3 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 w-64"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <Card padding="none" className="bg-white border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600 uppercase text-[10px] tracking-wider">
                <th className="p-3 w-16">Rank</th>
                <th className="p-3">Student</th>
                <th className="p-3">Location & Institution</th>
                <th className="p-3">Primary Skill</th>
                <th className="p-3 text-center">Courses</th>
                <th className="p-3 text-center">Points</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((entry) => (
                <tr
                  key={entry.rank}
                  className={`hover:bg-slate-50 transition-colors ${
                    entry.isCurrentUser ? 'bg-blue-50/50 border-l-2 border-l-blue-500' : ''
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className={`font-semibold ${entry.isCurrentUser ? 'text-blue-700' : 'text-slate-900'}`}>
                          {entry.name} {entry.isCurrentUser && <span className="text-[10px] text-blue-500">(You)</span>}
                        </p>
                        <p className="text-[10px] text-slate-500">Capability: {Math.round(entry.points / 10)}%</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="text-slate-700">{entry.location}</p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[180px]">{entry.institution}</p>
                  </td>
                  <td className="p-3">
                    <Badge variant="neutral" size="sm">{entry.primarySkill}</Badge>
                  </td>
                  <td className="p-3 text-center font-medium text-slate-800">{entry.coursesCompleted}</td>
                  <td className="p-3 text-center">
                    <span className="font-bold text-slate-900">{entry.points}</span>
                    <span className="text-[10px] text-slate-500 block">pts</span>
                  </td>
                  <td className="p-3 text-center">
                    <Badge
                      variant={entry.status === 'active' ? 'success' : entry.status === 'recovery' ? 'warning' : 'error'}
                      size="sm"
                    >
                      {entry.status === 'active' ? '● Active' : entry.status === 'recovery' ? '↻ Recovery' : '○ Inactive'}
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
