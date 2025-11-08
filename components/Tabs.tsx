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
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-2 md:flex md:gap-2 md:border-b md:border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-3 font-semibold transition-colors rounded-lg md:rounded-none ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white md:bg-transparent md:text-blue-400 md:border-b-2 md:border-blue-400'
                : 'bg-gray-700 text-gray-300 md:bg-transparent md:text-gray-400 hover:bg-gray-600 md:hover:bg-transparent md:hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
