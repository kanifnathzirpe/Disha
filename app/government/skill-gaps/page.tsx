'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar, Modal, Drawer, Tabs } from '@/components/ui';
import { DataTable } from '@/components/tables';
import { skillGapsData, demandSupplyTrend, summaryStats } from '@/data/mockSkillGaps';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Info, 
  ArrowRight, 
  MapPin, 
  Target,
  LineChart as LineChartIcon,
  ScatterChart,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  Cell, 
  ReferenceLine 
} from 'recharts';

interface SkillGapData {
  id: string;
  skill: string;
  demand: number;
  supply: number;
  gap: number;
  gapPercent: number;
  priority: 'critical' | 'high' | 'moderate' | 'low';
  medianWage: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  sector: string;
  districts: string[];
  employerDemand: 'very-high' | 'high' | 'moderate' | 'low';
}

export default function SkillGapsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('Pune');
  const [selectedSector, setSelectedSector] = useState('Manufacturing');
  const [selectedPeriod, setSelectedPeriod] = useState('2026');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillGapData | null>(null);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [chartView, setChartView] = useState<'volume' | 'percentage'>('volume');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const columns = [
    { 
      key: 'skill', 
      label: 'Skill', 
      sortable: true,
      render: (v: unknown, row: unknown) => {
        const skill = v as string;
        const data = row as SkillGapData;
        return (
          <button 
            onClick={() => setSelectedSkill(data)}
            className="text-left font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            {skill}
          </button>
        );
      }
    },
    { 
      key: 'demand', 
      label: 'Demand', 
      sortable: true, 
      render: (v: unknown) => formatNumber(v as number) 
    },
    { 
      key: 'supply', 
      label: 'Available Supply', 
      sortable: true, 
      render: (v: unknown) => formatNumber(v as number) 
    },
    {
      key: 'gap',
      label: 'Gap',
      sortable: true,
      render: (v: unknown, row: unknown) => {
        const data = row as SkillGapData;
        return (
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  data.gapPercent >= 50 ? 'bg-status-error' : 
                  data.gapPercent >= 30 ? 'bg-status-warning' : 
                  'bg-status-success'
                }`}
                style={{ width: `${data.gapPercent}%` }}
              />
            </div>
            <span className="text-xs font-medium">{data.gapPercent}%</span>
          </div>
        );
      },
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (v: unknown) => {
        const priority = v as string;
        return (
          <Badge variant={priority === 'critical' ? 'error' : priority === 'high' ? 'warning' : 'info'} size="sm">
            {priority}
          </Badge>
        );
      },
    },
    {
      key: 'medianWage',
      label: 'Median Wage',
      sortable: true,
      render: (v: unknown) => formatCurrency(v as number),
    },
    {
      key: 'trend',
      label: 'Trend',
      sortable: true,
      render: (v: unknown) => {
        const trend = v as string;
        return (
          <div className="flex items-center gap-1">
            {trend === 'increasing' && <TrendingUp size={14} className="text-status-error" />}
            {trend === 'decreasing' && <TrendingDown size={14} className="text-status-success" />}
            {trend === 'stable' && <Minus size={14} className="text-text-tertiary" />}
            <span className="text-xs capitalize">{trend}</span>
          </div>
        );
      },
    },
    {
      key: 'action',
      label: 'Action',
      render: (_v: unknown, row: unknown) => {
        const data = row as SkillGapData;
        return (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setSelectedSkill(data)}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <DashboardLayout 
      role="government" 
      title="Skill Gap Intelligence" 
      subtitle="Identify where workforce supply does not meet employer demand"
      showDistrictSelector={false}
    >
      {/* Filter Bar */}
      <Card padding="md" className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">District:</span>
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-md text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="Pune">Pune</option>
              <option value="Nashik">Nashik</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Mumbai">Mumbai</option>
              <option value="All Districts">All Districts</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Sector:</span>
            <select 
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-md text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="Manufacturing">Manufacturing</option>
              <option value="Automotive">Automotive</option>
              <option value="Renewable Energy">Renewable Energy</option>
              <option value="Construction">Construction</option>
              <option value="All Sectors">All Sectors</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Time Period:</span>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-md text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Skill Category:</span>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-md text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All</option>
              <option value="Technical">Technical</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Digital">Digital</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Critical Gaps</span>
            <div className="w-8 h-8 rounded-lg bg-status-error-bg flex items-center justify-center">
              <Target size={16} className="text-status-error" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-error">{summaryStats.criticalGaps}</p>
          <p className="text-xs text-text-tertiary mt-1">Requires immediate attention</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">High Priority</span>
            <div className="w-8 h-8 rounded-lg bg-status-warning-bg flex items-center justify-center">
              <TrendingUp size={16} className="text-status-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-warning">{summaryStats.highPriority}</p>
          <p className="text-xs text-text-tertiary mt-1">Plan intervention required</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Moderate</span>
            <div className="w-8 h-8 rounded-lg bg-status-info-bg flex items-center justify-center">
              <Minus size={16} className="text-status-info" />
            </div>
          </div>
          <p className="text-2xl font-bold text-status-info">{summaryStats.moderate}</p>
          <p className="text-xs text-text-tertiary mt-1">Monitor trend</p>
        </Card>

        <Card padding="md" className="hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Skills Tracked</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <LineChartIcon size={16} className="text-brand-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600">{summaryStats.skillsTracked}</p>
          <p className="text-xs text-text-tertiary mt-1">Total skills analyzed</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'critical-gaps', label: 'Critical Gaps' },
          { value: 'emerging', label: 'Emerging Skills' },
          { value: 'oversupply', label: 'Oversupply' },
          { value: 'forecast', label: 'Forecast' },
        ]}
        defaultValue={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'overview' && (
          <>
            {/* Attractive Demand vs Supply & Shortage Gap Intelligence */}
            <Card padding="lg" className="mb-6 border border-slate-200 shadow-sm bg-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#123B6D] animate-pulse" />
                    <CardTitle className="text-lg font-bold text-slate-900">
                      Workforce Demand vs Certified Supply & Net Deficit
                    </CardTitle>
                  </div>
                  <p className="text-xs text-slate-500">
                    Comparative analysis of industrial employer vacancies vs ITI & vocational certified talent across Maharashtra
                  </p>
                </div>

                {/* View switcher & Quick stats */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex rounded-lg p-1 bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setChartView('volume')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        chartView === 'volume'
                          ? 'bg-white text-[#123B6D] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Comparative Headcount
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartView('percentage')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        chartView === 'percentage'
                          ? 'bg-white text-[#123B6D] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Shortage Severity (% Deficit)
                    </button>
                  </div>
                </div>
              </div>

              {/* Chart Canvas */}
              <div className="h-[400px] w-full">
                {mounted ? (
                  chartView === 'volume' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={skillGapsData}
                        margin={{ top: 15, right: 20, left: 10, bottom: 75 }}
                        barGap={6}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="skill" 
                          tick={{ fontSize: 11, fill: '#475569' }} 
                          interval={0}
                          angle={-30}
                          textAnchor="end"
                          height={75}
                        />
                        <YAxis 
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                          tick={{ fontSize: 11, fill: '#64748b' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const d = payload[0].payload as SkillGapData;
                              return (
                                <div className="bg-white p-3.5 rounded-xl shadow-xl border border-slate-200 text-xs min-w-[240px]">
                                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                                    <div>
                                      <p className="font-bold text-slate-800 text-sm">{d.skill}</p>
                                      <span className="text-[10px] text-slate-400 font-medium">{d.sector} Sector</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                      d.priority === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                                      d.priority === 'high' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                      d.priority === 'moderate' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                      'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                    }`}>
                                      {d.priority}
                                    </span>
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between items-center text-slate-600">
                                      <span className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-sm bg-[#123B6D] inline-block" />
                                        Employer Demand:
                                      </span>
                                      <span className="font-bold text-slate-800">{formatNumber(d.demand)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-600">
                                      <span className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-sm bg-[#0284c7] inline-block" />
                                        Certified Supply:
                                      </span>
                                      <span className="font-bold text-slate-800">{formatNumber(d.supply)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-600 pt-1.5 border-t border-slate-100">
                                      <span className="flex items-center gap-1.5 text-red-600 font-semibold">
                                        <span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" />
                                        Net Deficit Gap:
                                      </span>
                                      <span className="font-bold text-red-600">-{formatNumber(d.gap)} ({d.gapPercent}%)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-500 text-[11px] pt-1">
                                      <span>Median Wage:</span>
                                      <span className="font-semibold text-slate-700">{formatCurrency(d.medianWage)}/mo</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend 
                          verticalAlign="top" 
                          align="right" 
                          iconType="circle"
                          wrapperStyle={{ paddingBottom: 16, fontSize: 12 }} 
                        />
                        <Bar 
                          dataKey="demand" 
                          name="Employer Vacancy Demand" 
                          fill="#123B6D" 
                          radius={[4, 4, 0, 0]} 
                          maxBarSize={26}
                        />
                        <Bar 
                          dataKey="supply" 
                          name="Certified Available Supply" 
                          fill="#0284c7" 
                          radius={[4, 4, 0, 0]} 
                          maxBarSize={26}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[...skillGapsData].sort((a, b) => b.gapPercent - a.gapPercent)}
                        margin={{ top: 15, right: 20, left: 10, bottom: 75 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="skill" 
                          tick={{ fontSize: 11, fill: '#475569' }} 
                          interval={0}
                          angle={-30}
                          textAnchor="end"
                          height={75}
                        />
                        <YAxis 
                          domain={[0, 100]}
                          tickFormatter={(value) => `${value}%`}
                          tick={{ fontSize: 11, fill: '#64748b' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const d = payload[0].payload as SkillGapData;
                              return (
                                <div className="bg-white p-3.5 rounded-xl shadow-xl border border-slate-200 text-xs min-w-[240px]">
                                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                                    <div>
                                      <p className="font-bold text-slate-800 text-sm">{d.skill}</p>
                                      <span className="text-[10px] text-slate-400 font-medium">{d.sector} Sector</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                                      {d.gapPercent}% Gap
                                    </span>
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between items-center text-slate-600">
                                      <span>Employer Demand:</span>
                                      <span className="font-bold text-slate-800">{formatNumber(d.demand)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-600">
                                      <span>Certified Supply:</span>
                                      <span className="font-bold text-slate-800">{formatNumber(d.supply)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-red-600 font-semibold pt-1 border-t border-slate-100">
                                      <span>Shortage Deficit:</span>
                                      <span className="font-bold">-{formatNumber(d.gap)} positions</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <ReferenceLine 
                          y={50} 
                          stroke="#ef4444" 
                          strokeDasharray="4 4" 
                          label={{ value: 'Critical Deficit (50%)', fill: '#ef4444', fontSize: 11, position: 'top' }} 
                        />
                        <ReferenceLine 
                          y={30} 
                          stroke="#f59e0b" 
                          strokeDasharray="4 4" 
                          label={{ value: 'High Priority (30%)', fill: '#f59e0b', fontSize: 11, position: 'top' }} 
                        />
                        <Bar 
                          dataKey="gapPercent" 
                          name="Skill Shortage Deficit %" 
                          radius={[4, 4, 0, 0]} 
                          maxBarSize={34}
                        >
                          {[...skillGapsData].sort((a, b) => b.gapPercent - a.gapPercent).map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={
                                entry.gapPercent >= 50 ? '#ef4444' : 
                                entry.gapPercent >= 30 ? '#f59e0b' : 
                                entry.gapPercent >= 20 ? '#0284c7' : 
                                '#10b981'
                              } 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400">
                    Loading workforce intelligence chart...
                  </div>
                )}
              </div>

              {/* Attractive category summary breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-100">
                <div className="p-3.5 bg-red-50/70 border border-red-200/80 rounded-xl hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-red-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Critical Shortage
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                      &gt; 50% Deficit
                    </span>
                  </div>
                  <p className="text-xs text-red-700 mb-1 font-medium">EV Diagnostics, Robotics, EV Maint.</p>
                  <p className="text-[11px] text-red-600">Immediate sanction of new ITI batches required</p>
                </div>

                <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      High Priority
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                      30% – 50%
                    </span>
                  </div>
                  <p className="text-xs text-amber-700 mb-1 font-medium">CNC Prog., Automation, PLC</p>
                  <p className="text-[11px] text-amber-600">Upgrade lab equipment and trainer pool</p>
                </div>

                <div className="p-3.5 bg-sky-50/70 border border-sky-200/80 rounded-xl hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-500" />
                      Moderate Shortage
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700">
                      20% – 30%
                    </span>
                  </div>
                  <p className="text-xs text-sky-700 mb-1 font-medium">Solar Installation, 3D Printing</p>
                  <p className="text-[11px] text-sky-600">Align curriculum with regional green industry</p>
                </div>

                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Near Balanced
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      &lt; 20%
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700 mb-1 font-medium">Welding, HVAC Tech</p>
                  <p className="text-[11px] text-emerald-600">Supply currently fulfills baseline demand</p>
                </div>
              </div>
            </Card>

            {/* Main Table */}
            <Card padding="md">
              <CardTitle>Skill Gap Analysis</CardTitle>
              <p className="text-xs text-text-secondary mb-4">Click on any skill to view detailed analysis and recommendations</p>
              <DataTable
                columns={columns}
                data={skillGapsData as unknown as Record<string, unknown>[]}
                searchable
                searchPlaceholder="Search skills..."
              />
            </Card>
          </>
        )}

        {activeTab === 'critical-gaps' && (
          <Card padding="md">
            <CardTitle>Critical Skill Gaps</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Skills requiring immediate attention</p>
            <DataTable
              columns={columns}
              data={skillGapsData.filter(s => s.priority === 'critical') as unknown as Record<string, unknown>[]}
              searchable
              searchPlaceholder="Search critical skills..."
            />
          </Card>
        )}

        {activeTab === 'emerging' && (
          <Card padding="md">
            <CardTitle>Emerging Skills</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Skills with increasing demand trends</p>
            <DataTable
              columns={columns}
              data={skillGapsData.filter(s => s.trend === 'increasing') as unknown as Record<string, unknown>[]}
              searchable
              searchPlaceholder="Search emerging skills..."
            />
          </Card>
        )}

        {activeTab === 'oversupply' && (
          <Card padding="md">
            <CardTitle>Oversupplied Skills</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Skills with excess supply relative to demand</p>
            <DataTable
              columns={columns}
              data={skillGapsData.filter(s => s.gapPercent < 20) as unknown as Record<string, unknown>[]}
              searchable
              searchPlaceholder="Search oversupplied skills..."
            />
          </Card>
        )}

        {activeTab === 'forecast' && (
          <Card padding="md">
            <CardTitle>Demand Forecast</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Projected demand vs supply over time</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demandSupplyTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(value) => formatNumber(value)} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: any) => formatNumber(value)} />
                  <Line type="monotone" dataKey="demand" stroke="#1e40af" strokeWidth={2} name="Demand" />
                  <Line type="monotone" dataKey="supply" stroke="#3b82f6" strokeWidth={2} name="Supply" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </div>

      {/* Detail Drawer */}
      {selectedSkill && (
        <Drawer
          open={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          title={selectedSkill.skill}
          size="lg"
        >
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Demand</p>
                <p className="text-lg font-bold text-text-primary">{formatNumber(selectedSkill.demand)}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Supply</p>
                <p className="text-lg font-bold text-text-primary">{formatNumber(selectedSkill.supply)}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Gap</p>
                <p className="text-lg font-bold text-status-error">{selectedSkill.gapPercent}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-text-secondary">Median Wage</p>
                <p className="text-lg font-bold text-text-primary">{formatCurrency(selectedSkill.medianWage)}</p>
              </div>
            </div>

            {/* Priority Badge */}
            <div className="flex items-center gap-3">
              <Badge variant={selectedSkill.priority === 'critical' ? 'error' : selectedSkill.priority === 'high' ? 'warning' : 'info'} size="md">
                {selectedSkill.priority.toUpperCase()} PRIORITY
              </Badge>
              <div className="flex items-center gap-1 text-xs text-text-secondary">
                <MapPin size={12} />
                {selectedSkill.districts.join(', ')}
              </div>
            </div>

            {/* Employer Demand */}
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">Employer Demand</p>
              <Badge variant={selectedSkill.employerDemand === 'very-high' ? 'error' : selectedSkill.employerDemand === 'high' ? 'warning' : 'info'} size="sm">
                {selectedSkill.employerDemand.toUpperCase()}
              </Badge>
            </div>

            {/* Top Districts */}
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">Top Districts</p>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.districts.map((district) => (
                  <Badge key={district} variant="neutral" size="sm">
                    {district}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Demand vs Supply Chart */}
            <div>
              <p className="text-sm font-medium text-text-primary mb-3">Demand vs Supply Over Time</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demandSupplyTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(value) => formatNumber(value)} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value: any) => formatNumber(value)} />
                    <Line type="monotone" dataKey="demand" stroke="#1e40af" strokeWidth={2} name="Demand" />
                    <Line type="monotone" dataKey="supply" stroke="#3b82f6" strokeWidth={2} name="Supply" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="p-4 bg-brand-50 border border-brand-200 rounded-md">
              <p className="text-sm font-medium text-brand-700 mb-2">Recommended Action</p>
              <p className="text-sm text-brand-600 mb-3">
                Increase {selectedSkill.skill} training capacity in {selectedSkill.districts.slice(0, 2).join(' and ')}.
              </p>
              <div className="flex items-center gap-2 text-xs text-brand-500">
                <MapPin size={12} />
                <span>Focus districts: {selectedSkill.districts.slice(0, 2).join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-500 mt-1">
                <Target size={12} />
                <span>Expected effect: Reduce projected skill shortage</span>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => setShowRecommendationModal(true)}
            >
              Create Training Recommendation
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Drawer>
      )}

      {/* Training Recommendation Modal */}
      {showRecommendationModal && selectedSkill && (
        <Modal
          open={showRecommendationModal}
          onClose={() => setShowRecommendationModal(false)}
          title="Create Training Recommendation"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-secondary mb-1">Recommended Skill</p>
              <p className="text-sm font-medium text-text-primary">{selectedSkill.skill}</p>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-1">Target Districts</p>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.districts.slice(0, 2).map((district) => (
                  <Badge key={district} variant="neutral" size="sm">
                    {district}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-1">Suggested Seats</p>
              <p className="text-sm font-medium text-text-primary">2,500</p>
            </div>

            <div>
              <p className="text-xs text-text-secondary mb-1">Priority</p>
              <Badge variant={selectedSkill.priority === 'critical' ? 'error' : 'warning'} size="sm">
                {selectedSkill.priority.toUpperCase()}
              </Badge>
            </div>

            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-text-secondary">
                This recommendation will be sent to the State Skill Development Council for review and approval.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => {
                  setShowRecommendationModal(false);
                  setSelectedSkill(null);
                }}
              >
                Submit Recommendation
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowRecommendationModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
