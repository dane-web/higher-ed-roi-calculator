'use client';

import { useState } from 'react';
import { Department, CalculatorInputs, ROIResults } from '@/lib/types';
import { calculateStudentServices, calculateFinancialAid, calculateHumanResources } from '@/lib/calculations';
import { Results } from './Results';

interface CalculatorProps {
  department: Department;
}

export function Calculator({ department }: CalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    totalEnrollment: 30000,
    aidApplicationRate: 70,
    totalEmployees: 3500,
    currentFTE: 15,
    averageSalary: 60000
  });
  const [results, setResults] = useState<ROIResults | null>(null);

  const handleCalculate = () => {
    let result: ROIResults;

    if (department === 'student-services') {
      result = calculateStudentServices(inputs);
    } else if (department === 'financial-aid') {
      result = calculateFinancialAid(inputs);
    } else {
      result = calculateHumanResources(inputs);
    }

    setResults(result);
  };

  // Get department-specific label for salary field
  const getDepartmentLabel = () => {
    if (department === 'student-services') return 'Student Services';
    if (department === 'financial-aid') return 'Financial Aid';
    return 'Human Resources';
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Calculator Inputs</h2>

        {department !== 'human-resources' && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Total Student Enrollment
            </label>
            <input
              type="number"
              value={inputs.totalEnrollment}
              onChange={e => setInputs({...inputs, totalEnrollment: Number(e.target.value)})}
              className="w-full px-4 py-2 bg-gray-700 rounded text-white"
            />
          </div>
        )}

        {department === 'financial-aid' && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              % Students Applying for Aid
            </label>
            <input
              type="number"
              value={inputs.aidApplicationRate}
              onChange={e => setInputs({...inputs, aidApplicationRate: Number(e.target.value)})}
              className="w-full px-4 py-2 bg-gray-700 rounded text-white"
            />
          </div>
        )}

        {department === 'human-resources' && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Total Employees (Faculty + Staff)
            </label>
            <input
              type="number"
              value={inputs.totalEmployees}
              onChange={e => setInputs({...inputs, totalEmployees: Number(e.target.value)})}
              className="w-full px-4 py-2 bg-gray-700 rounded text-white"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Current Full-Time Employee (FTE) Staffing
          </label>
          <input
            type="number"
            value={inputs.currentFTE}
            onChange={e => setInputs({...inputs, currentFTE: Number(e.target.value)})}
            className="w-full px-4 py-2 bg-gray-700 rounded text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Average Loaded Salary per {getDepartmentLabel()} FTE
          </label>
          <input
            type="number"
            value={inputs.averageSalary}
            onChange={e => setInputs({...inputs, averageSalary: Number(e.target.value)})}
            className="w-full px-4 py-2 bg-gray-700 rounded text-white"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
        >
          Calculate ROI
        </button>
      </div>

      {/* Results */}
      {results && <Results results={results} />}
    </div>
  );
}
