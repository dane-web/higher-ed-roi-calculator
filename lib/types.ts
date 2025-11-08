export type Department = 'student-services' | 'financial-aid' | 'human-resources';

export interface CalculatorInputs {
  // Student Services & Financial Aid
  totalEnrollment?: number;
  aidApplicationRate?: number;

  // Human Resources
  totalEmployees?: number;

  // Common
  currentFTE: number;
  averageSalary: number;
}

export interface ROIResults {
  department: Department;
  currentAnnualCost: number;
  optimizedAnnualCost: number;
  annualSavings: number;
  fteReduction: number;
  implementationCost: number;
  year1NetSavings: number;
  roiPercentage: number;
}
