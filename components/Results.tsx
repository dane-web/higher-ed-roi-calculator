import { ROIResults } from '@/lib/types';
import { formatCurrency } from '@/lib/calculations';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ResultsProps {
  results: ROIResults;
}

export function Results({ results }: ResultsProps) {
  const costData = [
    { name: 'Current', cost: results.currentAnnualCost },
    { name: 'Optimized', cost: results.optimizedAnnualCost }
  ];

  const timelineData = [
    { year: 'Year 1', savings: results.year1NetSavings, cumulative: results.year1NetSavings },
    { year: 'Year 2', savings: results.annualSavings, cumulative: results.year1NetSavings + results.annualSavings },
    { year: 'Year 3', savings: results.annualSavings, cumulative: results.year1NetSavings + (results.annualSavings * 2) }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Metric */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-lg text-center">
        <div className="text-sm uppercase tracking-wide mb-2">Annual Savings</div>
        <div className="text-5xl font-bold">{formatCurrency(results.annualSavings)}</div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">FTE Reduction</div>
          <div className="text-2xl font-bold">{results.fteReduction}</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">3-Year ROI</div>
          <div className="text-2xl font-bold">{results.roiPercentage.toFixed(0)}%</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Year 1 Net</div>
          <div className="text-2xl font-bold">{formatCurrency(results.year1NetSavings)}</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Implementation</div>
          <div className="text-2xl font-bold">{formatCurrency(results.implementationCost)}</div>
        </div>
      </div>

      {/* Cost Comparison Chart */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Cost Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={costData}>
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
            />
            <Bar dataKey="cost" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline Chart */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">3-Year Savings Projection</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timelineData}>
            <XAxis dataKey="year" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
            />
            <Legend />
            <Line type="monotone" dataKey="savings" stroke="#3B82F6" strokeWidth={3} name="Annual Savings" />
            <Line type="monotone" dataKey="cumulative" stroke="#10B981" strokeWidth={3} name="Cumulative" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
