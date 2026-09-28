'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { mobilityFlows, districtMobilityData, type MobilityFlow, type DistrictMobilityData } from '@/data/mockMobilityMap';
import { formatNumber, formatCurrency } from '@/lib/utils';
import {
  ArrowRightLeft,
  MapPin,
  TrendingUp,
  Building2,
  Users,
  Compass,
  AlertTriangle,
  ArrowRight,
  Filter,
  CheckCircle2,
  Share2,
  Download,
  Info,
  Car,
  Briefcase
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';

export default function MobilityMapPage() {
  const { showToast } = useApp();
  const [selectedOrigin, setSelectedOrigin] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedDistrictDetail, setSelectedDistrictDetail] = useState<DistrictMobilityData | null>(null);

  // Available unique origins and destinations
  const origins = useMemo(() => ['All', ...Array.from(new Set(mobilityFlows.map(f => f.from)))], []);
  const destinations = useMemo(() => ['All', ...Array.from(new Set(mobilityFlows.map(f => f.to)))], []);
  const sectors = useMemo(() => ['All', ...Array.from(new Set(mobilityFlows.map(f => f.sector)))], []);

  // Filtered mobility corridors
  const filteredFlows = useMemo(() => {
    return mobilityFlows.filter(flow => {
      const matchOrigin = selectedOrigin === 'All' || flow.from === selectedOrigin;
      const matchDest = selectedDestination === 'All' || flow.to === selectedDestination;
      const matchSector = selectedSector === 'All' || flow.sector === selectedSector;
      return matchOrigin && matchDest && matchSector;
    });
  }, [selectedOrigin, selectedDestination, selectedSector]);

  // Total migrants in active filter
  const totalMigrants = useMemo(() => {
    return filteredFlows.reduce((sum, f) => sum + f.trainees, 0);
  }, [filteredFlows]);

  // Aggregate stats across all districts
  const totalTrained = districtMobilityData.reduce((acc, d) => acc + d.trainedLocally, 0);
  const totalEmployedLocally = districtMobilityData.reduce((acc, d) => acc + d.employedLocally, 0);
  const totalOutMigration = districtMobilityData.reduce((acc, d) => acc + d.outMigration, 0);
  const localRetentionRate = Math.round((totalEmployedLocally / totalTrained) * 100);

  // Top corridors for chart
  const topCorridorsChartData = useMemo(() => {
    return [...filteredFlows]
      .sort((a, b) => b.trainees - a.trainees)
      .slice(0, 7)
      .map(flow => ({
        corridor: `${flow.from} → ${flow.to}`,
        trainees: flow.trainees,
        retention: flow.retentionRate,
        wage: flow.avgWage,
      }));
  }, [filteredFlows]);

  // Mismatch badge helper
  const getMismatchBadge = (mismatch: DistrictMobilityData['geographicMismatch']) => {
    switch (mismatch) {
      case 'severe':
        return <Badge variant="error">Severe Talent Outflow</Badge>;
      case 'moderate':
        return <Badge variant="warning">Moderate Outflow</Badge>;
      case 'low':
        return <Badge variant="success">Talent Magnet</Badge>;
      default:
        return <Badge variant="default">Balanced</Badge>;
    }
  };

  const handleExport = () => {
    showToast('Exporting Maharashtra Inter-District Mobility Report (PDF/Excel)...', 'info');
  };

  return (
    <DashboardLayout
      role="government"
      title="Training → Employment Mobility Map"
      subtitle="Track inter-district workforce movement, training hubs vs industrial clusters, and geographic mismatches"
    >
      {/* High-Level State Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Trainees Monitored</span>
            <Users size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatNumber(totalTrained)}</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            <span className="text-blue-600 font-medium">36 Districts</span> statewide coverage
          </div>
        </Card>

        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">In-District Retention</span>
            <Building2 size={18} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">{localRetentionRate}%</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            <span>{formatNumber(totalEmployedLocally)} placed within home district</span>
          </div>
        </Card>

        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Inter-District Migration</span>
            <ArrowRightLeft size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">{formatNumber(totalOutMigration)}</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-700">
            <span>{Math.round((totalOutMigration / totalTrained) * 100)}% relocate for primary job placement</span>
          </div>
        </Card>

        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Average Migration Distance</span>
            <Car size={18} className="text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-indigo-600">214 km</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            <span>Median relocated wage: <strong className="text-slate-800 font-semibold">₹21,800/mo</strong></span>
          </div>
        </Card>
      </div>

      {/* Corridor Filter Bar */}
      <Card padding="sm" className="bg-white border-slate-200 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 mr-2">
              <Filter size={14} className="text-blue-600" /> Corridor Filters:
            </span>

            {/* Origin District */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium">Origin:</span>
              <select
                aria-label="Filter by Origin District"
                value={selectedOrigin}
                onChange={e => setSelectedOrigin(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {origins.map(o => (
                  <option key={o} value={o}>{o === 'All' ? 'All Origins' : o}</option>
                ))}
              </select>
            </div>

            {/* Destination District */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium">Destination:</span>
              <select
                aria-label="Filter by Destination District"
                value={selectedDestination}
                onChange={e => setSelectedDestination(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {destinations.map(d => (
                  <option key={d} value={d}>{d === 'All' ? 'All Destinations' : d}</option>
                ))}
              </select>
            </div>

            {/* Sector */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium">Sector:</span>
              <select
                aria-label="Filter by Sector"
                value={selectedSector}
                onChange={e => setSelectedSector(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {sectors.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All Sectors' : s}</option>
                ))}
              </select>
            </div>

            {(selectedOrigin !== 'All' || selectedDestination !== 'All' || selectedSector !== 'All') && (
              <button
                onClick={() => {
                  setSelectedOrigin('All');
                  setSelectedDestination('All');
                  setSelectedSector('All');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline ml-2"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-900">{filteredFlows.length}</strong> corridors ({formatNumber(totalMigrants)} candidates)
            </span>
            <Button size="sm" variant="outline" onClick={handleExport} className="text-xs flex items-center gap-1">
              <Download size={13} /> Export Mobility Data
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Visual Corridors Chart */}
        <Card padding="md" className="bg-white border-slate-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">Primary Inter-District Movement Corridors</CardTitle>
              <p className="text-xs text-slate-500">Volume of certified trainees migrating from training hub to hiring cluster</p>
            </div>
            <Badge variant="info">Real-time EPFO/ESIC Linkage</Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCorridorsChartData} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="corridor"
                  tick={{ fontSize: 11, fill: '#475569' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-lg">
                          <p className="font-bold text-sm text-blue-300 mb-1">{data.corridor}</p>
                          <p>Trainees Migrated: <span className="font-semibold text-white">{formatNumber(data.trainees)}</span></p>
                          <p>180-Day Retention: <span className="font-semibold text-emerald-400">{data.retention}%</span></p>
                          <p>Average Wage: <span className="font-semibold text-amber-300">{formatCurrency(data.wage)}/mo</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="trainees" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Migrated Trainees">
                  {topCorridorsChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#1d4ed8' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Policy Insight Box */}
          <div className="mt-4 p-3.5 bg-blue-50/70 border border-blue-100 rounded-lg flex items-start gap-3">
            <Info size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-blue-900 font-semibold">Strategic Mobility Insight: </strong>
              The <strong className="text-blue-900">Pune–Mumbai industrial axis</strong> absorbs over 64% of trainees originating from Chhatrapati Sambhajinagar, Solapur, and Kolhapur.
              While out-migration boosts candidate wages by +28%, rural manufacturing clusters face local technician shortages.
              Recommended action: Expand On-the-Job Training (OJT) subsidies for tier-2/3 industrial belts.
            </div>
          </div>
        </Card>

        {/* Geographic Mismatch District Analysis */}
        <Card padding="md" className="bg-white border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">District Net Talent Flows</CardTitle>
              <p className="text-xs text-slate-500">In-migration vs Out-migration net balance</p>
            </div>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {districtMobilityData.map(dist => {
              const isPositive = dist.netFlow >= 0;
              return (
                <div
                  key={dist.district}
                  onClick={() => setSelectedDistrictDetail(dist)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedDistrictDetail?.district === dist.district
                      ? 'border-blue-500 bg-blue-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900">{dist.district}</span>
                    {getMismatchBadge(dist.geographicMismatch)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] mb-2">
                    <div>
                      <span className="text-slate-400">Trained Locally: </span>
                      <span className="font-semibold text-slate-700">{formatNumber(dist.trainedLocally)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Local Jobs: </span>
                      <span className="font-semibold text-slate-700">{formatNumber(dist.employedLocally)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Net Workforce Flow:</span>
                    <span className={`font-bold flex items-center gap-0.5 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{formatNumber(dist.netFlow)} candidates
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Detailed Corridors Table */}
      <Card padding="md" className="bg-white border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">Inter-District Employment Corridors</CardTitle>
            <p className="text-xs text-slate-500">Breakdown of migration corridors with wage delta and 180-day post-placement retention</p>
          </div>
          <Badge variant="neutral">{filteredFlows.length} Registered Routes</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Origin (Training Hub)</th>
                <th className="py-3 px-3">Destination (Hiring Hub)</th>
                <th className="py-3 px-3">Primary Sector</th>
                <th className="py-3 px-3 text-right">Trainee Volume</th>
                <th className="py-3 px-3 text-right">Distance (km)</th>
                <th className="py-3 px-3 text-right">Avg Monthly Wage</th>
                <th className="py-3 px-3 text-right">180d Retention</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredFlows.map((flow, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-1.5">
                    <MapPin size={13} className="text-blue-500" />
                    {flow.from}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    <span className="flex items-center gap-1.5">
                      <ArrowRight size={12} className="text-slate-400" />
                      {flow.to}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                      {flow.sector}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    {formatNumber(flow.trainees)}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    {flow.avgDistance} km
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-emerald-700">
                    {formatCurrency(flow.avgWage)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className={`font-semibold ${flow.retentionRate >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {flow.retentionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[11px] h-7 px-2"
                      onClick={() => showToast(`Corridor ${flow.from} → ${flow.to}: Allocated transit subsidy & hostel support`, 'success')}
                    >
                      Allocate Support
                    </Button>
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
