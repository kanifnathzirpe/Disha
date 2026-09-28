'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  LabelList 
} from 'recharts';

interface FunnelData {
  stage: string;
  value: number;
  conversion: number;
  dropoff: number;
  color: string;
}

interface FunnelChartProps {
  data: FunnelData[];
  height?: number | string;
}

export function FunnelChart({ data }: FunnelChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format numbers nicely
  const formatVal = (v: number) => {
    if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
    return v.toLocaleString('en-IN');
  };

  const chartData = data.map((item) => ({
    ...item,
    formatted: item.value.toLocaleString('en-IN'),
    percentOfTotal: ((item.value / (data[0]?.value || 1)) * 100).toFixed(1),
  }));

  return (
    <div className="w-full flex flex-col justify-between" style={{ minHeight: 280 }}>
      {/* Visual horizontal funnel bars with stats */}
      <div className="w-full" style={{ height: 230 }}>
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical" 
              margin={{ top: 10, right: 60, left: 10, bottom: 0 }}
            >
              <XAxis 
                type="number" 
                domain={[0, data[0]?.value ? Math.round(data[0].value * 1.1) : 100000]}
                tickFormatter={formatVal}
                tick={{ fontSize: 11, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <YAxis 
                dataKey="stage" 
                type="category" 
                width={105} 
                tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 600 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: any, name: any, props: any) => {
                  const entry = props.payload;
                  return [
                    `${Number(value).toLocaleString('en-IN')} trainees (${entry.percentOfTotal}% of enrolled)`,
                    entry.stage
                  ];
                }}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: 'none', 
                  borderRadius: '0.375rem', 
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                <LabelList 
                  dataKey="formatted" 
                  position="right" 
                  style={{ fontSize: 11, fontWeight: 700, fill: '#1e293b' }} 
                />
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color || '#123B6D'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            Loading statewide employment funnel...
          </div>
        )}
      </div>

      {/* Stage-to-stage conversion metric ribbon */}
      <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-slate-100 text-center">
        {chartData.map((item, i) => (
          <div key={item.stage} className="bg-slate-50 p-1.5 rounded border border-slate-200/80">
            <span className="text-[10px] text-slate-500 block truncate">{item.stage}</span>
            <span className="text-xs font-bold text-slate-900 block">{formatVal(item.value)}</span>
            <span className={`text-[10px] font-semibold ${i === 0 ? 'text-blue-600' : 'text-emerald-600'}`}>
              {i === 0 ? 'Base 100%' : `${item.conversion}% conv`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
