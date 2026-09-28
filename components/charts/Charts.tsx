'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';

const CHART_COLORS = ['#1e40af', '#0369a1', '#047857', '#b45309', '#7c3aed', '#be185d', '#ea580c', '#15803d'];

interface TrendChartProps {
  data: Array<{ month: string; value: number }>;
  color?: string;
  type?: 'area' | 'bar';
  yAxisLabel?: string;
  formatValue?: (v: number) => string;
}

export function TrendChart({ data, color = '#1e40af', type = 'area', formatValue }: TrendChartProps) {
  const formatter = formatValue || ((v: number) => v.toLocaleString('en-IN'));

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} tickFormatter={formatter} width={50} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}
            formatter={(value: unknown) => [formatter(Number(value)), 'Value']}
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.15} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} tickFormatter={formatter} width={50} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}
          formatter={(value: unknown) => [formatter(Number(value)), 'Value']}
        />
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#gradient-${color})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface SectorPieChartProps {
  data: Array<{ sector: string; count: number; percentage: number; color: string }>;
}

export function SectorPieChart({ data }: SectorPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="count"
          nameKey="sector"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
          formatter={(value: unknown, name: unknown) => [Number(value).toLocaleString('en-IN'), String(name)]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface SkillGapBarChartProps {
  data: Array<{ skill: string; demand: number; available: number }>;
}

export function SkillGapBarChart({ data }: SkillGapBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="skill" tick={{ fontSize: 11, fill: '#475569' }} tickLine={false} axisLine={false} width={130} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
        <Bar dataKey="demand" fill="#1e40af" name="Demand" radius={[0, 4, 4, 0]} maxBarSize={16} />
        <Bar dataKey="available" fill="#93c5fd" name="Available" radius={[0, 4, 4, 0]} maxBarSize={16} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
