import { ROIResults } from '@/lib/types';
import { formatCurrency } from '@/lib/calculations';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface FullROIProps {
  studentServicesResults: ROIResults | null;
  financialAidResults: ROIResults | null;
  humanResourcesResults: ROIResults | null;
}

export function FullROI({ studentServicesResults, financialAidResults, humanResourcesResults }: FullROIProps) {
  // Filter out null results and aggregate
  const completedResults = [studentServicesResults, financialAidResults, humanResourcesResults].filter(
    (result): result is ROIResults => result !== null
  );

  if (completedResults.length === 0) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Full ROI Summary</h2>
        <p className="text-gray-400">
          Complete at least one department calculation to see the full ROI summary.
        </p>
      </div>
    );
  }

  // Aggregate all the metrics
  const totalCurrentAnnualCost = completedResults.reduce((sum, r) => sum + r.currentAnnualCost, 0);
  const totalOptimizedAnnualCost = completedResults.reduce((sum, r) => sum + r.optimizedAnnualCost, 0);
  const totalAnnualSavings = completedResults.reduce((sum, r) => sum + r.annualSavings, 0);
  const totalFteReduction = completedResults.reduce((sum, r) => sum + r.fteReduction, 0);
  const totalImplementationCost = completedResults.reduce((sum, r) => sum + r.implementationCost, 0);
  const totalYear1NetSavings = totalAnnualSavings - totalImplementationCost;
  const totalRoiPercentage = ((totalAnnualSavings * 3 - totalImplementationCost) / totalImplementationCost) * 100;

  const costData = [
    { name: 'Current', cost: totalCurrentAnnualCost },
    { name: 'Optimized', cost: totalOptimizedAnnualCost }
  ];

  const timelineData = [
    { year: 'Year 1', savings: totalYear1NetSavings, cumulative: totalYear1NetSavings },
    { year: 'Year 2', savings: totalAnnualSavings, cumulative: totalYear1NetSavings + totalAnnualSavings },
    { year: 'Year 3', savings: totalAnnualSavings, cumulative: totalYear1NetSavings + (totalAnnualSavings * 2) }
  ];

  return (
    <div className="space-y-6">
      {/* Department Summary */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Full ROI Summary</h2>
        <p className="text-gray-400 mb-4">
          Aggregating {completedResults.length} of 3 departments:{' '}
          {completedResults.map(r => {
            if (r.department === 'student-services') return 'Student Services';
            if (r.department === 'financial-aid') return 'Financial Aid';
            return 'Human Resources';
          }).join(', ')}
        </p>
      </div>

      {/* Hero Metric */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-lg text-center">
        <div className="text-sm uppercase tracking-wide mb-2">Total Annual Savings</div>
        <div className="text-5xl font-bold">{formatCurrency(totalAnnualSavings)}</div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Total FTE Reduction</div>
          <div className="text-2xl font-bold">{totalFteReduction}</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">3-Year ROI</div>
          <div className="text-2xl font-bold">{totalRoiPercentage.toFixed(0)}%</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Year 1 Net</div>
          <div className="text-2xl font-bold">{formatCurrency(totalYear1NetSavings)}</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Total Implementation</div>
          <div className="text-2xl font-bold">{formatCurrency(totalImplementationCost)}</div>
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
