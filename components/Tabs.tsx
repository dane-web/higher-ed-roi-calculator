import { Department } from '@/lib/types';

interface TabsProps {
  activeTab: Department;
  onTabChange: (tab: Department) => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = [
    { id: 'student-services' as Department, label: 'Student Services' },
    { id: 'financial-aid' as Department, label: 'Financial Aid' },
    { id: 'human-resources' as Department, label: 'Human Resources' },
    { id: 'full-roi' as Department, label: 'Full ROI' }
  ];

  return (
    <div className="flex gap-2 border-b border-gray-700 mb-8">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === tab.id
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
