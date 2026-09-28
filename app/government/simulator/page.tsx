'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar, Modal } from '@/components/ui';
import { 
  defaultInputs, 
  calculateSimulation, 
  comparisonOptions, 
  districts, 
  sectors, 
  targetSkills,
  formatCurrencyCrores,
  formatWageImpact,
  type SimulationInput 
} from '@/data/mockSimulator';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { 
  Info, 
  Play, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  Target,
  ArrowRight,
  Scale,
  CheckCircle
} from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function SimulatorPage() {
  const [inputs, setInputs] = useState<SimulationInput>(defaultInputs);
  const [results, setResults] = useState(calculateSimulation(defaultInputs));
  const [showCompareModal, setShowCompareModal] = useState(false);

  const handleInputChange = (field: keyof SimulationInput, value: string | number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    setResults(calculateSimulation(newInputs));
  };

  const runSimulation = () => {
    setResults(calculateSimulation(inputs));
  };

  const comparisonChartData = comparisonOptions.map(option => ({
    name: option.name.replace(' ', '\n'),
    employment: option.employment,
    wage: option.medianWage,
    roi: option.roi,
  }));

  return (
    <DashboardLayout 
      role="government" 
      title="Policy Investment Simulator" 
      subtitle="Estimate the potential employment impact of alternative skilling investments"
      showDistrictSelector={false}
    >
      {/* Information Banner */}
      <Card padding="md" className="mb-6 bg-brand-50 border-brand-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
            <Info size={16} className="text-brand-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-brand-700 mb-1">Simulation Disclaimer</p>
            <p className="text-sm text-brand-600">
              Simulation uses synthetic demonstration assumptions and is intended for policy scenario analysis.
              Results are based on deterministic calculations and should be validated with real-world data before implementation.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE: Simulation Inputs */}
        <div className="space-y-4">
          <Card padding="md">
            <CardTitle>Simulation Inputs</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Configure parameters for policy scenario analysis</p>

            <div className="space-y-4">
              {/* Available Budget */}
              <div>
                <label className="disha-label">Available Budget (₹ Crore)</label>
                <input
                  type="number"
                  value={inputs.budget}
                  onChange={(e) => handleInputChange('budget', Number(e.target.value))}
                  className="disha-input text-2xl font-bold"
                  min="1"
                  max="500"
                  step="5"
                />
                <p className="text-xs text-text-tertiary mt-1">Enter budget in crores (₹1 Crore = ₹10,000,000)</p>
              </div>

              {/* District */}
              <div>
                <label className="disha-label">District</label>
                <select
                  value={inputs.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="disha-input"
                >
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Sector */}
              <div>
                <label className="disha-label">Sector</label>
                <select
                  value={inputs.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  className="disha-input"
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              {/* Target Skill */}
              <div>
                <label className="disha-label">Target Skill</label>
                <select
                  value={inputs.targetSkill}
                  onChange={(e) => handleInputChange('targetSkill', e.target.value)}
                  className="disha-input"
                >
                  {targetSkills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              {/* Training Capacity */}
              <div>
                <label className="disha-label">Training Capacity</label>
                <input
                  type="number"
                  value={inputs.trainingCapacity}
                  onChange={(e) => handleInputChange('trainingCapacity', Number(e.target.value))}
                  className="disha-input"
                  min="100"
                  max="50000"
                  step="500"
                />
              </div>

              {/* Expected Placement */}
              <div>
                <label className="disha-label">Expected Placement Rate (%)</label>
                <input
                  type="number"
                  value={inputs.expectedPlacement}
                  onChange={(e) => handleInputChange('expectedPlacement', Number(e.target.value))}
                  className="disha-input"
                  min="0"
                  max="100"
                  step="1"
                />
              </div>

              {/* Expected Retention */}
              <div>
                <label className="disha-label">Expected 90D Retention Rate (%)</label>
                <input
                  type="number"
                  value={inputs.expectedRetention}
                  onChange={(e) => handleInputChange('expectedRetention', Number(e.target.value))}
                  className="disha-input"
                  min="0"
                  max="100"
                  step="1"
                />
              </div>

              <Button 
                variant="primary" 
                className="w-full"
                onClick={runSimulation}
              >
                <Play size={16} className="mr-2" />
                Run Simulation
              </Button>
            </div>
          </Card>
        </div>

        {/* RIGHT SIDE: Projected Impact */}
        <div className="space-y-4">
          <Card padding="md">
            <CardTitle>Projected Impact</CardTitle>
            <p className="text-xs text-text-secondary mb-4">Estimated outcomes based on current inputs</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={14} className="text-brand-500" />
                  <span className="text-xs text-text-secondary">Projected Trainees</span>
                </div>
                <p className="text-xl font-bold text-text-primary">{formatNumber(results.projectedTrainees)}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase size={14} className="text-brand-500" />
                  <span className="text-xs text-text-secondary">Projected Placement</span>
                </div>
                <p className="text-xl font-bold text-text-primary">{formatNumber(results.projectedPlacement)}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={14} className="text-brand-500" />
                  <span className="text-xs text-text-secondary">Projected Retention</span>
                </div>
                <p className="text-xl font-bold text-text-primary">{formatNumber(results.projectedRetention)}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <IndianRupee size={14} className="text-brand-500" />
                  <span className="text-xs text-text-secondary">Median Wage</span>
                </div>
                <p className="text-xl font-bold text-text-primary">{formatCurrency(results.medianWage)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-brand-50 rounded-md border border-brand-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-brand-600" />
                  <span className="text-xs text-brand-600">Projected Wage Impact</span>
                </div>
                <p className="text-lg font-bold text-brand-700">{formatWageImpact(results.projectedWageImpact)}</p>
                <p className="text-xs text-brand-500">Annual economic impact</p>
              </div>

              <div className="p-3 bg-brand-50 rounded-md border border-brand-200">
                <div className="flex items-center gap-2 mb-1">
                  <Target size={14} className="text-brand-600" />
                  <span className="text-xs text-brand-600">Impact Score</span>
                </div>
                <p className="text-lg font-bold text-brand-700">{results.impactScore} / 100</p>
                <p className="text-xs text-brand-500">Combined effectiveness metric</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className={results.impactScore >= 85 ? 'text-status-success' : results.impactScore >= 70 ? 'text-status-warning' : 'text-status-error'} />
                <span className="text-sm font-semibold text-text-primary">Recommendation</span>
              </div>
              <Badge 
                variant={results.impactScore >= 85 ? 'success' : results.impactScore >= 70 ? 'warning' : 'error'} 
                size="md"
              >
                {results.recommendation}
              </Badge>
              <p className="text-xs text-text-secondary mt-2">
                {inputs.targetSkill} in {inputs.district}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Visual Comparison */}
      <Card padding="md" className="mt-6">
        <CardTitle>Investment Option Comparison</CardTitle>
        <p className="text-xs text-text-secondary mb-4">Compare potential investment scenarios for the allocated budget</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {comparisonOptions.map((option) => (
            <div 
              key={option.id}
              className={`p-4 border-2 rounded-md transition-all ${
                option.recommended 
                  ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-200' 
                  : 'border-border hover:border-brand-300'
              }`}
            >
              {option.recommended && (
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={16} className="text-brand-600" />
                  <span className="text-sm font-semibold text-brand-700">RECOMMENDED</span>
                </div>
              )}
              <h3 className="text-sm font-semibold text-text-primary mb-3">{option.name}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Employment:</span>
                  <span className="font-medium text-text-primary">{formatNumber(option.employment)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Median Wage:</span>
                  <span className="font-medium text-text-primary">{formatCurrency(option.medianWage)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">ROI:</span>
                  <span className="font-medium text-brand-600">{option.roi}x</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <ProgressBar value={option.roi * 25} size="sm" color={option.roi >= 3 ? 'success' : option.roi >= 2 ? 'warning' : 'error'} />
                <p className="text-xs text-text-tertiary mt-1 text-center">ROI Score</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={(value) => formatNumber(value)} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: any) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="employment" name="Employment" fill="#1e40af" radius={[4, 4, 0, 0]} />
              <Bar dataKey="wage" name="Median Wage" fill="#047857" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => setShowCompareModal(true)}>
            <Scale size={16} className="mr-2" />
            Compare Scenarios
          </Button>
        </div>
      </Card>

      {/* Policy Recommendation */}
      <Card padding="md" className="mt-6 border-2 border-brand-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
            <Target size={20} className="text-brand-600" />
          </div>
          <div className="flex-1">
            <CardTitle>Policy Recommendation</CardTitle>
            <p className="text-sm text-text-secondary mt-2">
              Based on the current synthetic scenario, <span className="font-semibold text-brand-700">{inputs.targetSkill}</span> provides the strongest projected combination of employment, retention and wage outcomes for {inputs.district} district.
            </p>
            <div className="mt-3 p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-text-secondary">
                <span className="font-medium">Key Insights:</span> With {formatCurrencyCrores(inputs.budget)} budget allocation, this intervention is projected to train {formatNumber(results.projectedTrainees)} individuals, place {formatNumber(results.projectedPlacement)} in employment, and generate {formatWageImpact(results.projectedWageImpact)} in annual economic impact.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Compare Scenarios Modal */}
      {showCompareModal && (
        <Modal
          open={showCompareModal}
          onClose={() => setShowCompareModal(false)}
          title="Scenario Comparison"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card padding="md">
                <h3 className="text-sm font-semibold text-text-primary mb-2">Scenario A</h3>
                <p className="text-xs text-text-secondary mb-2">Budget: ₹25 Cr</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Trainees:</span>
                    <span>{formatNumber(Math.floor(25 * 250))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Placement:</span>
                    <span>{formatNumber(Math.floor(25 * 250 * 0.72))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Wage Impact:</span>
                    <span>{formatWageImpact(Math.floor(25 * 250 * 0.72 * 0.54 * 22000 * 12))}</span>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <h3 className="text-sm font-semibold text-text-primary mb-2">Scenario B (Current)</h3>
                <p className="text-xs text-text-secondary mb-2">Budget: ₹{inputs.budget} Cr</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Trainees:</span>
                    <span>{formatNumber(results.projectedTrainees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Placement:</span>
                    <span>{formatNumber(results.projectedPlacement)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Wage Impact:</span>
                    <span>{formatWageImpact(results.projectedWageImpact)}</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="p-3 bg-brand-50 border border-brand-200 rounded-md">
              <p className="text-xs text-brand-600">
                <span className="font-medium">Scenario Analysis:</span> Increasing budget from ₹25 Cr to ₹{inputs.budget} Cr would increase projected trainees by {formatNumber(results.projectedTrainees - Math.floor(25 * 250))} and generate additional {formatWageImpact(results.projectedWageImpact - Math.floor(25 * 250 * 0.72 * 0.54 * 22000 * 12))} in annual economic impact.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => setShowCompareModal(false)}
              >
                Apply Scenario B
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowCompareModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
