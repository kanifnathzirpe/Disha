'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';

interface SkillGapData {
  skill: string;
  demand: number;
  supply: number;
  gap: number;
}

interface SkillGapChartProps {
  data: SkillGapData[];
  height?: number | string;
}

export function SkillGapChart({ data }: SkillGapChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = data.map((item) => ({
    ...item,
    shortSkill: item.skill.length > 15 ? `${item.skill.substring(0, 13)}...` : item.skill,
  }));

  return (
    <div className="w-full flex flex-col justify-between" style={{ minHeight: 280 }}>
      {/* Grouped Bar Chart: Demand vs Supply */}
      <div className="w-full" style={{ height: 235 }}>
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 15, right: 15, left: -10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="shortSkill" 
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }}
                interval={0}
                angle={-15}
                textAnchor="end"
                stroke="#cbd5e1"
              />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <Tooltip
                formatter={(value: any, name: any) => [
                  `${Number(value).toLocaleString('en-IN')} positions`,
                  name === 'demand' ? 'Employer Demand' : name === 'supply' ? 'Certified Supply' : 'Deficit Gap'
                ]}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: 'none', 
                  borderRadius: '0.375rem', 
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="top" 
                align="right"
                wrapperStyle={{ paddingBottom: '8px', fontSize: '11px' }}
              />
              <Bar 
                dataKey="demand" 
                name="Employer Demand" 
                fill="#123B6D" 
                radius={[4, 4, 0, 0]} 
                barSize={18}
              />
              <Bar 
                dataKey="supply" 
                name="Certified Supply" 
                fill="#2F80ED" 
                radius={[4, 4, 0, 0]} 
                barSize={18}
              />
              <Bar 
                dataKey="gap" 
                name="Unmet Gap (Deficit)" 
                fill="#f59e0b" 
                radius={[4, 4, 0, 0]} 
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            Loading skill demand vs certified supply...
          </div>
        )}
      </div>

      {/* Quick summary gap badges */}
      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 text-slate-600">
        <span className="font-medium text-slate-500">Top Deficit Trades:</span>
        <div className="flex gap-2">
          {data.slice(0, 3).map((item) => (
            <span key={item.skill} className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded font-semibold text-[10px]">
              {item.skill.split(' ')[0]}: -{item.gap.toLocaleString('en-IN')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
