'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { InteractivePolicyWhatIfBar } from '@/components/government/InteractivePolicyWhatIfBar';
import { DataTable } from '@/components/tables';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { SkillGapChart } from '@/components/charts/SkillGapChart';
import { SectorPieChart, TrendChart } from '@/components/charts/Charts';
import { useApp } from '@/context/AppContext';
import { 
  employmentFunnel, 
  skillDemandSupply, 
  districtIntelligence, 
  providerPerformance, 
  atRiskTrainees, 
  recommendations 
} from '@/data/mockCommandCenter';
import { governmentDashboard, districtMetrics, skillGaps } from '@/data/mockGovernment';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { t } from '@/lib/translations';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  IndianRupee, 
  AlertTriangle, 
  MapPin,
  ArrowRight,
  Target,
  Clock,
  ShieldAlert,
  CheckCircle,
  Activity,
  Download,
  Printer,
  FileSpreadsheet,
  Filter,
  PieChart as PieIcon,
  BarChart2,
  Calendar,
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function GovernmentCommandCenter() {
  const { showToast, language } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('2026');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState('All');

  // Multi-series Monthly Trend Data (Jan-Dec 2026)
  const monthlyTrendsData = [
    { month: 'Jan', enrolled: 6100, certified: 5200, placed: 3800 },
    { month: 'Feb', enrolled: 6500, certified: 5500, placed: 4100 },
    { month: 'Mar', enrolled: 7200, certified: 6100, placed: 4500 },
    { month: 'Apr', enrolled: 6800, certified: 5800, placed: 4200 },
    { month: 'May', enrolled: 7400, certified: 6300, placed: 4700 },
    { month: 'Jun', enrolled: 7100, certified: 6000, placed: 4400 },
    { month: 'Jul', enrolled: 7800, certified: 6600, placed: 4900 },
    { month: 'Aug', enrolled: 8200, certified: 7000, placed: 5200 },
    { month: 'Sep', enrolled: 8500, certified: 7200, placed: 5500 },
    { month: 'Oct', enrolled: 8900, certified: 7600, placed: 5800 },
    { month: 'Nov', enrolled: 9200, certified: 7900, placed: 6100 },
    { month: 'Dec', enrolled: 9500, certified: 8100, placed: 6400 },
  ];

  // Sector distribution data
  const sectorData = [
    { name: 'Manufacturing', value: 24200, color: '#1e40af' },
    { name: 'IT / ITES', value: 20100, color: '#0369a1' },
    { name: 'Healthcare', value: 12500, color: '#047857' },
    { name: 'Automotive', value: 10800, color: '#b45309' },
    { name: 'Construction', value: 8900, color: '#7c3aed' },
    { name: 'Logistics', value: 5200, color: '#ea580c' },
    { name: 'Retail', value: 4100, color: '#be185d' },
  ];

  // Outcome Health distribution
  const outcomeHealthData = [
    { name: 'Placement (82%)', value: 82, color: '#15803d' },
    { name: 'Retention (74%)', value: 74, color: '#0369a1' },
    { name: 'Wage Growth (68%)', value: 68, color: '#2563eb' },
    { name: 'Skill Relevance (54%)', value: 54, color: '#b45309' },
  ];

  // Filtered District Data
  const filteredDistricts = selectedDistrict === 'All' 
    ? districtIntelligence 
    : districtIntelligence.filter(d => d.district === selectedDistrict);

  // Top KPI Row Cards
  const topKPIs = [
    {
      label: t('gov.kpi.trainingEnrolment', language),
      value: '84.3K',
      indicator: '+12.4% YoY',
      icon: <Users size={18} />,
      color: 'text-brand-600',
      sparkline: language === 'mr' ? '▲ ९.२ हजार नवीन या तिमाहीत' : '▲ 9.2K new this quarter',
    },
    {
      label: t('gov.kpi.certification', language),
      value: '71.8K',
      indicator: '+8.7% YoY',
      icon: <CheckCircle size={18} />,
      color: 'text-status-success',
      sparkline: language === 'mr' ? '८५.२% उत्तीर्ण दर' : '85.2% pass rate',
    },
    {
      label: t('gov.kpi.placement', language),
      value: '57.4K',
      indicator: '+15.2% YoY',
      icon: <Briefcase size={18} />,
      color: 'text-status-success',
      sparkline: language === 'mr' ? '६८.१% प्रमाणित उमेदवार रुजू' : '68.1% of certified',
    },
    {
      label: t('gov.kpi.retention', language),
      value: '38.9K',
      indicator: '+9.1% YoY',
      icon: <Activity size={18} />,
      color: 'text-status-warning',
      sparkline: language === 'mr' ? '६७.८% टिकून राहण्याचा दर' : '67.8% retention rate',
    },
    {
      label: t('gov.kpi.medianWage', language),
      value: '₹17.8K',
      indicator: '+11.3% YoY',
      icon: <IndianRupee size={18} />,
      color: 'text-brand-600',
      sparkline: language === 'mr' ? '₹२.१ हजार वेतन वाढ' : '₹2.1K wage premium',
    },
    {
      label: t('gov.kpi.criticalGaps', language),
      value: '137',
      indicator: '-18 YoY',
      icon: <AlertTriangle size={18} />,
      color: 'text-status-error',
      sparkline: language === 'mr' ? '४२ उच्च-मागणी क्लस्टर्स' : '42 high-demand clusters',
    },
  ];

  // Export handlers
  const handleExportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      'District,Enrolled,Certified,Placed,PlacementRate,Retention\n' +
      districtIntelligence.map(d => `${d.district},${d.enrolled},${d.certified},${d.placed},${d.placementRate}%,${d.retention}%`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DISHA_Maharashtra_Workforce_Data_${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Workforce dataset exported to CSV successfully', 'success');
  };

  const handleDownloadReport = () => {
    showToast('Preparing official Department Executive Brief (PDF)...', 'info');
    setTimeout(() => {
      window.print();
    }, 600);
  };

  return (
    <DashboardLayout 
      role="government" 
      title={language === 'mr' ? 'महाराष्ट्र कौशल्य बुद्धिमत्ता नियंत्रण कक्ष' : 'Statewide Command Center'} 
      subtitle={language === 'mr' ? 'प्रशिक्षण, रोजगार, टिकून राहणे आणि वेतन परिणामांचे राज्यस्तरीय विश्लेषण' : 'Statewide view of training, employment, retention and wage outcomes'}
      showDistrictSelector={false}
    >
      {/* Top Filter Bar & Actions */}
      <div className="bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-xl border border-border dark:border-slate-700 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Filter size={14} className="text-[#123B6D] dark:text-blue-400" />
            <span>{language === 'mr' ? 'फिल्टर्स:' : 'Filters:'}</span>
          </div>

          {/* District Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-secondary dark:text-slate-400">{t('filter.district', language)}</span>
            <select 
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                showToast(`Filtered by District: ${e.target.value}`, 'info');
              }}
              className="px-2.5 py-1 border border-border dark:border-slate-700 rounded-md text-xs bg-surface dark:bg-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#123B6D]"
            >
              <option value="All">{t('filter.allDistricts', language)}</option>
              {districtIntelligence.map(d => (
                <option key={d.district} value={d.district}>{d.district}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-secondary dark:text-slate-400">{t('filter.year', language)}</span>
            <select 
              value={selectedPeriod}
              onChange={(e) => {
                setSelectedPeriod(e.target.value);
                showToast(`Updated year view to ${e.target.value}`, 'info');
              }}
              className="px-2.5 py-1 border border-border dark:border-slate-700 rounded-md text-xs bg-surface dark:bg-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#123B6D]"
            >
              <option value="2026">{language === 'mr' ? '२०२६ (चालू)' : '2026 (Current)'}</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          {/* Sector Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-secondary dark:text-slate-400">{t('filter.sector', language)}</span>
            <select 
              value={selectedSector}
              onChange={(e) => {
                setSelectedSector(e.target.value);
                showToast(`Filtered sector: ${e.target.value}`, 'info');
              }}
              className="px-2.5 py-1 border border-border dark:border-slate-700 rounded-md text-xs bg-surface dark:bg-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#123B6D]"
            >
              <option value="All">{t('filter.allSectors', language)}</option>
              <option value="Manufacturing">{language === 'mr' ? 'उत्पादन (Manufacturing)' : 'Manufacturing'}</option>
              <option value="IT">{language === 'mr' ? 'माहिती तंत्रज्ञान (IT / ITES)' : 'IT / ITES'}</option>
              <option value="Healthcare">{language === 'mr' ? 'आरोग्य सेवा (Healthcare)' : 'Healthcare'}</option>
              <option value="Automotive">{language === 'mr' ? 'वाहन उद्योग (Automotive)' : 'Automotive'}</option>
              <option value="Construction">{language === 'mr' ? 'बांधकाम (Construction)' : 'Construction'}</option>
              <option value="Logistics">{language === 'mr' ? 'लॉजिस्टिक्स व पुरवठा' : 'Logistics'}</option>
            </select>
          </div>

          {/* Program Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-secondary dark:text-slate-400">{t('filter.program', language)}</span>
            <select 
              value={selectedProgram}
              onChange={(e) => {
                setSelectedProgram(e.target.value);
                showToast(`Filtered scheme: ${e.target.value}`, 'info');
              }}
              className="px-2.5 py-1 border border-border dark:border-slate-700 rounded-md text-xs bg-surface dark:bg-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#123B6D]"
            >
              <option value="All">{t('filter.allPrograms', language)}</option>
              <option value="PMKVY">PMKVY 4.0</option>
              <option value="MSSDS">MSSDS Pramod Mahajan</option>
              <option value="ITI">{language === 'mr' ? 'शासकीय ITI आधुनिकीकरण' : 'Govt ITI Modernization'}</option>
              <option value="DDUGKY">DDU-GKY</option>
            </select>
          </div>
        </div>

        {/* Action / Export Buttons */}
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleExportCSV}
            className="text-xs h-8"
          >
            <Download size={13} className="mr-1 text-slate-500" />
            {t('action.exportCsv', language)}
          </Button>

          <Button 
            size="sm" 
            variant="primary" 
            onClick={handleDownloadReport}
            className="text-xs h-8 bg-[#123B6D] hover:bg-[#0D2F5B]"
          >
            <Printer size={13} className="mr-1" />
            {t('action.printReport', language)}
          </Button>
        </div>
      </div>

      {/* Interactive State Policy What-If Simulator Bar */}
      <div className="mb-6">
        <InteractivePolicyWhatIfBar />
      </div>

      {/* Top Dynamic KPI Metric Cards with Interactive Sparklines */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 mb-6">
        {topKPIs.map((kpi, index) => {
          const changeVal = parseFloat(kpi.indicator.replace(/[^\d.-]/g, '')) * (kpi.indicator.includes('-') ? -1 : 1);
          return (
            <MetricCard
              key={index}
              title={kpi.label}
              value={kpi.value}
              subtitle={kpi.sparkline}
              change={isNaN(changeVal) ? undefined : changeVal}
              icon={kpi.icon}
              sparklineData={
                index === 0 ? [52, 58, 64, 61, 72, 78, 84] :
                index === 1 ? [45, 50, 54, 58, 63, 68, 71] :
                index === 2 ? [30, 36, 42, 45, 50, 54, 57] :
                index === 3 ? [25, 28, 31, 33, 35, 37, 39] :
                index === 4 ? [14, 14.5, 15.2, 16, 16.8, 17.2, 17.8] :
                [180, 165, 155, 148, 142, 140, 137]
              }
              onClick={() => showToast(`Drilling down into ${kpi.label} dataset for ${selectedDistrict}`, 'info')}
            />
          );
        })}
      </div>

      {/* SECTION 1: Employment Funnel & Skill Demand vs Supply */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* CHART A: Employment Funnel */}
        <Card padding="md" className="bg-white border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <CardTitle>{t('gov.chart.employmentFunnel', language)}</CardTitle>
              <p className="text-xs text-slate-500">
                {t('gov.chart.employmentFunnelSub', language)}
              </p>
            </div>
            <Badge variant="success" size="sm">{language === 'mr' ? '६८.१% नियुक्ती' : '68.1% Placement'}</Badge>
          </div>
          <div className="w-full flex-1 pt-1">
            <FunnelChart data={employmentFunnel} />
          </div>
        </Card>

        {/* CHART B: Skill Demand vs Supply */}
        <Card padding="md" className="bg-white border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <CardTitle>{t('gov.chart.skillDemandSupply', language)}</CardTitle>
              <p className="text-xs text-slate-500">
                {t('gov.chart.skillDemandSupplySub', language)}
              </p>
            </div>
            <Badge variant="error" size="sm">{language === 'mr' ? '१३७ गंभीर तुटी' : '137 Critical Gaps'}</Badge>
          </div>
          <div className="w-full flex-1 pt-1">
            <SkillGapChart data={skillDemandSupply} />
          </div>
        </Card>
      </div>

      {/* SECTION 2: Monthly Trend (Line Chart) & Sector Distribution (Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* CHART E: Monthly Trend (Jan–Dec 2026) */}
        <div className="lg:col-span-2">
          <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div>
                <CardTitle>{t('gov.chart.monthlyTrajectory', language)}</CardTitle>
                <p className="text-xs text-text-secondary dark:text-slate-400">
                  {t('gov.chart.monthlyTrajectorySub', language)}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#123B6D]" /> {language === 'mr' ? 'नोंदणीकृत' : 'Enrolled'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F80ED]" /> {language === 'mr' ? 'प्रमाणित' : 'Certified'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" /> {language === 'mr' ? 'नियुक्त' : 'Placed'}
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData} margin={{ top: 5, right: 15, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={35} />
                  <Tooltip 
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(v: any) => [Number(v).toLocaleString('en-IN'), '']}
                  />
                  <Line type="monotone" dataKey="enrolled" stroke="#123B6D" strokeWidth={2.5} dot={{ r: 3 }} name={language === 'mr' ? 'नोंदणीकृत' : 'Enrolled'} />
                  <Line type="monotone" dataKey="certified" stroke="#2F80ED" strokeWidth={2} dot={{ r: 3 }} name={language === 'mr' ? 'प्रमाणित' : 'Certified'} />
                  <Line type="monotone" dataKey="placed" stroke="#15803d" strokeWidth={2} dot={{ r: 3 }} name={language === 'mr' ? 'नियुक्त' : 'Placed'} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* CHART F: Sector Distribution */}
        <div>
          <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardTitle>{t('gov.chart.sectorDistribution', language)}</CardTitle>
            <p className="text-xs text-text-secondary dark:text-slate-400 mb-2">
              {t('gov.chart.sectorDistributionSub', language)}
            </p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any) => [Number(v).toLocaleString('en-IN') + (language === 'mr' ? ' प्रशिक्षणार्थी' : ' Trainees'), '']} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* SECTION 3: District Performance (Chart + Comparison Table) */}
      <div className="mb-6">
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>{language === 'mr' ? 'ड. जिल्हा कामगिरी तुलना व सांख्यिकी' : 'D. District Performance Comparison'}</CardTitle>
              <p className="text-xs text-text-secondary dark:text-slate-400">
                {language === 'mr' ? 'महाराष्ट्र राज्यातील सर्व जिल्ह्यांमधील कौशल्य व रोजगार निकाल' : 'Key skilling and employment outcomes across Maharashtra districts'}
              </p>
            </div>
            <div className="text-xs text-slate-500">
              {language === 'mr' ? `एकूण ${filteredDistricts.length} जिल्हे दाखवत आहे` : `Showing ${filteredDistricts.length} district intelligence units`}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300">
                  <th className="p-3 font-semibold">{language === 'mr' ? 'जिल्हा' : 'District'}</th>
                  <th className="p-3 font-semibold">{language === 'mr' ? 'नोंदणी' : 'Enrolment'}</th>
                  <th className="p-3 font-semibold">{language === 'mr' ? 'प्रमाणीकरण' : 'Certification'}</th>
                  <th className="p-3 font-semibold">{language === 'mr' ? 'नियुक्ती दर' : 'Placement Rate'}</th>
                  <th className="p-3 font-semibold">{language === 'mr' ? '९०-दिवस टिकून राहणे' : '90D Retention'}</th>
                  <th className="p-3 font-semibold">{language === 'mr' ? 'कौशल्य तूट स्थिती' : 'Skill Gap Status'}</th>
                  <th className="p-3 font-semibold text-right">{language === 'mr' ? 'कृती' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-slate-700/60">
                {filteredDistricts.map((d) => (
                  <tr key={d.district} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#123B6D] dark:text-blue-400" />
                      <span>{d.district}</span>
                    </td>
                    <td className="p-3 font-mono">{formatNumber(d.enrolled)}</td>
                    <td className="p-3 font-mono">{formatNumber(d.certified)}</td>
                    <td className="p-3 font-medium text-emerald-700 dark:text-emerald-400">
                      {d.placementRate}%
                    </td>
                    <td className="p-3 font-medium text-blue-700 dark:text-blue-400">
                      {d.retention}%
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant={d.skillGapStatus === 'critical' ? 'error' : d.skillGapStatus === 'high' ? 'warning' : 'info'} 
                        size="sm"
                      >
                        {d.skillGapStatus.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <a 
                        href={`/government/district-intelligence?district=${d.district}`}
                        className="text-[#123B6D] dark:text-blue-400 font-semibold hover:underline"
                      >
                        View Intelligence →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* SECTION 4: Training Provider Performance & Policy Interventions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Provider Performance */}
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>Training Provider Performance</CardTitle>
          <p className="text-xs text-text-secondary dark:text-slate-400 mb-3">
            Outcome metrics by registered training partner
          </p>
          <div className="space-y-2.5">
            {providerPerformance.slice(0, 4).map((p: any) => (
              <div key={p.provider} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-slate-100">{p.provider}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{p.placement}% Placed</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Enrolled: {formatNumber(p.enrollment)}</span>
                  <span>Completion: {p.completion}%</span>
                  <span>Wage: {formatCurrency(p.medianWage)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended Actions */}
        <Card padding="md" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardTitle>Targeted Policy Recommendations</CardTitle>
          <p className="text-xs text-text-secondary dark:text-slate-400 mb-3">
            Algorithmic interventions based on current district deficits
          </p>
          <div className="space-y-2.5">
            {recommendations.slice(0, 3).map((rec: any) => (
              <div key={rec.id} className="p-3 border border-border dark:border-slate-700 rounded-lg hover:border-brand-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Badge variant={rec.priority === 'critical' ? 'error' : 'warning'} size="sm">
                      {rec.priority}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{rec.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{rec.district}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  Expected Impact: {rec.expectedImpact}
                </p>
                <div className="flex justify-end">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => showToast(`Simulating intervention: ${rec.title}`, 'info')}
                    className="text-[11px] h-7"
                  >
                    Simulate Intervention →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
