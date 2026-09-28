'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { maharashtraDistricts, stateAggregates, topSkillGapsState, type DistrictSkillData } from '@/data/mockSkillMap';
import { formatNumber } from '@/lib/utils';
import {
  MapPin, Users, Briefcase, Building2, TrendingUp, AlertTriangle,
  ArrowRight, Target, IndianRupee, GraduationCap, Factory, X, ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const SEVERITY_COLORS = {
  critical: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', dot: 'bg-red-500' },
  high: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', dot: 'bg-amber-500' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', dot: 'bg-blue-500' },
  low: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300', dot: 'bg-emerald-500' },
};

export default function SkillIntelligenceMapPage() {
  const { showToast } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictSkillData | null>(null);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const skillFilters = ['All', 'CNC Programming', 'EV Diagnostics', 'Industrial Automation', 'Full Stack Development', 'Solar Installation'];

  const handleDistrictClick = (district: DistrictSkillData) => {
    setSelectedDistrict(district);
    showToast(`Loading intelligence for ${district.district}`, 'info');
  };

  return (
    <DashboardLayout
      role="government"
      title="Skill Intelligence Map"
      subtitle="Interactive Maharashtra map — district-level skill demand, supply, gaps, and employment flows"
    >
      {/* State-Level Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Total Trainees', value: formatNumber(stateAggregates.totalTrainees), icon: <Users size={16} />, color: 'text-blue-600' },
          { label: 'Total Placed', value: formatNumber(stateAggregates.totalPlaced), icon: <Briefcase size={16} />, color: 'text-emerald-600' },
          { label: 'Total Employers', value: formatNumber(stateAggregates.totalEmployers), icon: <Building2 size={16} />, color: 'text-indigo-600' },
          { label: 'Active Jobs', value: formatNumber(stateAggregates.totalJobs), icon: <Target size={16} />, color: 'text-amber-600' },
          { label: 'Training Centres', value: stateAggregates.trainingCentres.toString(), icon: <GraduationCap size={16} />, color: 'text-purple-600' },
          { label: 'Critical Gaps', value: stateAggregates.criticalSkillGaps.toString(), icon: <AlertTriangle size={16} />, color: 'text-red-600' },
        ].map((m, i) => (
          <Card key={i} padding="sm" className="bg-white border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <span className={m.color}>{m.icon}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wide">{m.label}</span>
            </div>
            <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <Card padding="md" className="bg-white border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Maharashtra Skill Map</CardTitle>
              <div className="flex items-center gap-2">
                <select
                  value={selectedSkillFilter}
                  onChange={(e) => setSelectedSkillFilter(e.target.value)}
                  className="disha-input text-xs h-8 w-48"
                >
                  {skillFilters.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* SVG Map of Maharashtra Districts */}
            <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200 p-4 min-h-[420px]">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ minHeight: '380px' }}>
                {/* Simplified Maharashtra outline */}
                <path
                  d="M15,20 L25,15 L40,12 L55,15 L70,10 L85,18 L90,30 L88,42 L82,52 L78,60 L70,65 L60,72 L50,78 L40,80 L30,76 L20,68 L15,58 L12,48 L10,38 L12,28 Z"
                  fill="#e2e8f0"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                />

                {/* District markers */}
                {maharashtraDistricts.map((d) => {
                  const severity = SEVERITY_COLORS[d.skillGapSeverity];
                  const isHovered = hoveredDistrict === d.id;
                  const isSelected = selectedDistrict?.id === d.id;
                  const radius = isHovered || isSelected ? 4.5 : 3.5;

                  return (
                    <g key={d.id}>
                      {/* Pulse animation for critical */}
                      {d.skillGapSeverity === 'critical' && (
                        <circle
                          cx={d.coordinates.x}
                          cy={d.coordinates.y}
                          r={5}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="0.5"
                          opacity={0.4}
                        >
                          <animate attributeName="r" from="4" to="8" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle
                        cx={d.coordinates.x}
                        cy={d.coordinates.y}
                        r={radius}
                        className={`cursor-pointer transition-all duration-200 ${
                          isSelected ? 'stroke-blue-600 stroke-[1.5]' : 'stroke-white stroke-[0.8]'
                        }`}
                        fill={
                          d.skillGapSeverity === 'critical' ? '#ef4444' :
                          d.skillGapSeverity === 'high' ? '#f59e0b' :
                          d.skillGapSeverity === 'medium' ? '#3b82f6' : '#22c55e'
                        }
                        onMouseEnter={() => setHoveredDistrict(d.id)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => handleDistrictClick(d)}
                      />
                      <text
                        x={d.coordinates.x}
                        y={d.coordinates.y - 5}
                        textAnchor="middle"
                        className="fill-slate-700 pointer-events-none"
                        style={{ fontSize: '2.5px', fontWeight: isHovered || isSelected ? '700' : '500' }}
                      >
                        {d.district}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Hover tooltip */}
              {hoveredDistrict && !selectedDistrict && (() => {
                const d = maharashtraDistricts.find(x => x.id === hoveredDistrict);
                if (!d) return null;
                return (
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-slate-200 p-3 max-w-[220px] animate-fade-in z-10">
                    <p className="font-semibold text-sm text-slate-900">{d.district}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-[10px]">
                      <span className="text-slate-500">Trainees:</span>
                      <span className="font-medium">{formatNumber(d.totalTrainees)}</span>
                      <span className="text-slate-500">Employers:</span>
                      <span className="font-medium">{formatNumber(d.totalEmployers)}</span>
                      <span className="text-slate-500">Placement:</span>
                      <span className="font-medium">{d.placementRate}%</span>
                      <span className="text-slate-500">Avg Wage:</span>
                      <span className="font-medium">₹{formatNumber(d.avgWage)}</span>
                    </div>
                    <div className="mt-2">
                      <Badge variant={d.skillGapSeverity === 'critical' ? 'error' : d.skillGapSeverity === 'high' ? 'warning' : 'info'} size="sm">
                        {d.skillGapSeverity.toUpperCase()} GAP
                      </Badge>
                    </div>
                  </div>
                );
              })()}

              {/* Legend */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 p-2.5">
                <p className="text-[10px] font-semibold text-slate-600 mb-1.5">Skill Gap Severity</p>
                {(['critical', 'high', 'medium', 'low'] as const).map(s => (
                  <div key={s} className="flex items-center gap-1.5 mb-0.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${SEVERITY_COLORS[s].dot}`} />
                    <span className="text-[10px] text-slate-600 capitalize">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Side Panel — District Detail or State Skill Gaps */}
        <div className="space-y-4">
          {selectedDistrict ? (
            <>
              {/* District Detail Panel */}
              <Card padding="md" className="bg-white border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600" />
                    <CardTitle>{selectedDistrict.district}</CardTitle>
                  </div>
                  <button onClick={() => setSelectedDistrict(null)} className="p-1 hover:bg-slate-100 rounded">
                    <X size={14} className="text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'Trainees', value: formatNumber(selectedDistrict.totalTrainees), color: 'text-blue-600' },
                    { label: 'Employers', value: formatNumber(selectedDistrict.totalEmployers), color: 'text-indigo-600' },
                    { label: 'Jobs', value: formatNumber(selectedDistrict.totalJobs), color: 'text-amber-600' },
                    { label: 'Placement', value: `${selectedDistrict.placementRate}%`, color: 'text-emerald-600' },
                  ].map((m, i) => (
                    <div key={i} className="p-2 bg-slate-50 rounded-md">
                      <span className="text-[10px] text-slate-500">{m.label}</span>
                      <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                    </div>
                  ))}
                </div>

                <Badge
                  variant={selectedDistrict.skillGapSeverity === 'critical' ? 'error' : selectedDistrict.skillGapSeverity === 'high' ? 'warning' : 'info'}
                  size="sm"
                >
                  {selectedDistrict.skillGapSeverity.toUpperCase()} SKILL GAP
                </Badge>
              </Card>

              {/* Top Skill Gaps in District */}
              <Card padding="md" className="bg-white border-slate-200">
                <CardTitle>Top Skill Gaps</CardTitle>
                <div className="space-y-2.5 mt-3">
                  {selectedDistrict.topSkills.map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">{s.skill}</span>
                        <span className="text-red-600 font-semibold">-{formatNumber(s.gap)}</span>
                      </div>
                      <div className="flex gap-1 h-4 rounded-full overflow-hidden bg-slate-100">
                        <div
                          className="bg-blue-500 rounded-l-full transition-all"
                          style={{ width: `${(s.supply / s.demand) * 100}%` }}
                          title={`Supply: ${formatNumber(s.supply)}`}
                        />
                        <div
                          className="bg-red-300 rounded-r-full transition-all"
                          style={{ width: `${(s.gap / s.demand) * 100}%` }}
                          title={`Gap: ${formatNumber(s.gap)}`}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                        <span>Supply: {formatNumber(s.supply)}</span>
                        <span>Demand: {formatNumber(s.demand)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Sector Breakdown */}
              <Card padding="md" className="bg-white border-slate-200">
                <CardTitle>Sector Employment</CardTitle>
                <div className="space-y-2 mt-3">
                  {selectedDistrict.sectors.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div>
                        <span className="text-xs font-medium text-slate-700">{s.sector}</span>
                        <span className="text-[10px] text-slate-400 ml-2">{s.jobs} jobs</span>
                      </div>
                      <span className="text-xs font-semibold text-blue-600">{formatNumber(s.trainees)} trainees</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Employment Flows */}
              <Card padding="md" className="bg-white border-slate-200">
                <CardTitle>Employment Outflow</CardTitle>
                <p className="text-[10px] text-slate-500 mb-3">Trainees moving to other districts for employment</p>
                <div className="space-y-2">
                  {selectedDistrict.employmentFlows.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{selectedDistrict.district}</span>
                        <ArrowRight size={12} className="text-slate-400" />
                        <span className="text-xs font-medium text-slate-700">{f.to}</span>
                      </div>
                      <span className="text-xs font-semibold text-amber-600">{formatNumber(f.count)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <>
              {/* State-level Top Skill Gaps */}
              <Card padding="md" className="bg-white border-slate-200">
                <CardTitle>Top Skill Gaps — Maharashtra</CardTitle>
                <p className="text-[10px] text-slate-500 mb-3">Click a district on the map for local intelligence</p>
                <div className="space-y-3">
                  {topSkillGapsState.map((g, i) => (
                    <div key={i} className="p-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-800">{g.skill}</span>
                        <Badge variant={g.trend === 'increasing' ? 'error' : 'neutral'} size="sm">
                          {g.trend === 'increasing' ? '↑ Growing' : '→ Stable'}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
                        <span>Gap: <strong className="text-red-600">{formatNumber(g.totalGap)}</strong></span>
                        <span>Median Wage: <strong className="text-emerald-600">₹{formatNumber(g.medianWage)}</strong></span>
                      </div>
                      <div className="flex gap-1">
                        {g.districts.map((d, j) => (
                          <span key={j} className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-full">{d}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick District Selection */}
              <Card padding="md" className="bg-white border-slate-200">
                <CardTitle>Select District</CardTitle>
                <div className="space-y-1.5 mt-3">
                  {maharashtraDistricts.map((d) => {
                    const sev = SEVERITY_COLORS[d.skillGapSeverity];
                    return (
                      <button
                        key={d.id}
                        onClick={() => handleDistrictClick(d)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${sev.dot}`} />
                          <span className="text-xs font-medium text-slate-700">{d.district}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-400">{formatNumber(d.totalTrainees)} trainees</span>
                          <ChevronRight size={12} className="text-slate-300" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Bottom Section — State-level Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Demand vs Supply by Skill */}
        <Card padding="md" className="bg-white border-slate-200">
          <CardTitle>State Skill Demand vs Supply</CardTitle>
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topSkillGapsState.slice(0, 6)}
                layout="vertical"
                margin={{ left: 100, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="skill" type="category" tick={{ fontSize: 10 }} width={95} />
                <Tooltip
                  contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: any) => formatNumber(Number(value))}
                />
                <Bar dataKey="totalGap" name="Skill Gap" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* District Placement Rate Comparison */}
        <Card padding="md" className="bg-white border-slate-200">
          <CardTitle>District Placement Rates</CardTitle>
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={maharashtraDistricts.map(d => ({
                  district: d.district.length > 12 ? d.district.slice(0, 12) + '…' : d.district,
                  rate: d.placementRate,
                  avgWage: d.avgWage,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="district" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Bar dataKey="rate" name="Placement %" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
