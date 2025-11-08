'use client';

import { useState } from 'react';
import { Department } from '@/lib/types';
import { Tabs } from '@/components/Tabs';
import { Calculator } from '@/components/Calculator';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Department>('student-services');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-6">Higher Education ROI Calculator</h1>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Higher education institutions face mounting financial pressure from declining enrollment,
            rising operational costs, and increased competition. Universities that fail to modernize
            administrative operations risk budget shortfalls that threaten program quality and institutional
            viability. Universities who adapt, however, will secure their financial futures and lead the charge
            for decades to come.
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

        {/* Calculator */}
        <Calculator department={activeTab} />
      </div>
    </main>
  );
}
