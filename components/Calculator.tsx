'use client';

import { useCallback } from 'react';
import { Department, CalculatorInputs, ROIResults } from '@/lib/types';
import { calculateStudentServices, calculateFinancialAid, calculateHumanResources } from '@/lib/calculations';
import { Results } from './Results';

interface CalculatorProps {
  department: Department;
  savedResults: ROIResults | null;
  savedInputs: CalculatorInputs;
  onResultsUpdate: (department: Department, results: ROIResults | null) => void;
  onInputsUpdate: (department: Department, inputs: CalculatorInputs) => void;
}

export function Calculator({
  department,
  savedResults,
  savedInputs,
  onResultsUpdate,
  onInputsUpdate
}: CalculatorProps) {
  const handleCalculate = useCallback(() => {
    let result: ROIResults;

    if (department === 'student-services') {
      result = calculateStudentServices(savedInputs);
    } else if (department === 'financial-aid') {
      result = calculateFinancialAid(savedInputs);
    } else if (department === 'human-resources') {
      result = calculateHumanResources(savedInputs);
    } else {
      return; // Skip for full-roi tab
    }

    onResultsUpdate(department, result);
  }, [department, savedInputs, onResultsUpdate]);

  const handleInputChange = useCallback((newInputs: CalculatorInputs) => {
    onInputsUpdate(department, newInputs);
  }, [department, onInputsUpdate]);

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
              value={savedInputs.totalEnrollment}
              onChange={e => handleInputChange({...savedInputs, totalEnrollment: Number(e.target.value)})}
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
              value={savedInputs.aidApplicationRate}
              onChange={e => handleInputChange({...savedInputs, aidApplicationRate: Number(e.target.value)})}
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
              value={savedInputs.totalEmployees}
              onChange={e => handleInputChange({...savedInputs, totalEmployees: Number(e.target.value)})}
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
            value={savedInputs.currentFTE}
            onChange={e => handleInputChange({...savedInputs, currentFTE: Number(e.target.value)})}
            className="w-full px-4 py-2 bg-gray-700 rounded text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Average Loaded Salary per {getDepartmentLabel()} FTE
          </label>
          <input
            type="number"
            value={savedInputs.averageSalary}
            onChange={e => handleInputChange({...savedInputs, averageSalary: Number(e.target.value)})}
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
      {savedResults && <Results results={savedResults} />}
    </div>
  );
}
