'use client';

import { useState, useCallback } from 'react';
import { Department, ROIResults, CalculatorInputs } from '@/lib/types';
import { Tabs } from '@/components/Tabs';
import { Calculator } from '@/components/Calculator';
import { FullROI } from '@/components/FullROI';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Department>('student-services');

  // Store results and inputs for each department separately
  const [departmentResults, setDepartmentResults] = useState<Record<Department, ROIResults | null>>({
    'student-services': null,
    'financial-aid': null,
    'human-resources': null,
    'full-roi': null
  });

  const [departmentInputs, setDepartmentInputs] = useState<Record<Department, CalculatorInputs>>({
    'student-services': {
      totalEnrollment: 30000,
      aidApplicationRate: 70,
      totalEmployees: 3500,
      currentFTE: 15,
      averageSalary: 60000
    },
    'financial-aid': {
      totalEnrollment: 30000,
      aidApplicationRate: 70,
      totalEmployees: 3500,
      currentFTE: 15,
      averageSalary: 60000
    },
    'human-resources': {
      totalEnrollment: 30000,
      aidApplicationRate: 70,
      totalEmployees: 3500,
      currentFTE: 15,
      averageSalary: 60000
    },
    'full-roi': {
      totalEnrollment: 30000,
      aidApplicationRate: 70,
      totalEmployees: 3500,
      currentFTE: 15,
      averageSalary: 60000
    }
  });

  const handleResultsUpdate = useCallback((department: Department, results: ROIResults | null) => {
    setDepartmentResults(prev => ({
      ...prev,
      [department]: results
    }));
  }, []);

  const handleInputsUpdate = useCallback((department: Department, inputs: CalculatorInputs) => {
    setDepartmentInputs(prev => ({
      ...prev,
      [department]: inputs
    }));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-6">Higher Education ROI Calculator</h1>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Universities face financial pressure from declining enrollment and rising costs. Those who modernize will secure their futures.
          </p>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mt-4">
            See how much your university can save by installing simple AI solutions.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-left">
            Quantify AI automation savings for your institution
          </h2>
        </div>

        {/* Tabs */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Calculator or Full ROI */}
        {activeTab === 'full-roi' ? (
          <FullROI
            studentServicesResults={departmentResults['student-services']}
            financialAidResults={departmentResults['financial-aid']}
            humanResourcesResults={departmentResults['human-resources']}
          />
        ) : (
          <Calculator
            key={activeTab}
            department={activeTab}
            savedResults={departmentResults[activeTab]}
            savedInputs={departmentInputs[activeTab]}
            onResultsUpdate={handleResultsUpdate}
            onInputsUpdate={handleInputsUpdate}
          />
        )}
      </div>
    </main>
  );
}
