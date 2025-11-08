import { CalculatorInputs, ROIResults } from './types';

export function calculateStudentServices(inputs: CalculatorInputs): ROIResults {
  const { totalEnrollment = 0, currentFTE, averageSalary } = inputs;

  const currentAnnualCost = currentFTE * averageSalary;
  const fteReduction = Math.round(currentFTE * 0.67); // 67% reduction
  const optimizedAnnualCost = (currentFTE - fteReduction) * averageSalary + 90000; // +90K tech
  const annualSavings = currentAnnualCost - optimizedAnnualCost;
  const implementationCost = 700000;
  const year1NetSavings = annualSavings - implementationCost;
  const roiPercentage = ((annualSavings * 3 - implementationCost) / implementationCost) * 100;

  return {
    department: 'student-services',
    currentAnnualCost,
    optimizedAnnualCost,
    annualSavings,
    fteReduction,
    implementationCost,
    year1NetSavings,
    roiPercentage
  };
}

export function calculateFinancialAid(inputs: CalculatorInputs): ROIResults {
  const { totalEnrollment = 0, aidApplicationRate = 70, currentFTE, averageSalary } = inputs;

  const currentAnnualCost = currentFTE * averageSalary;
  const fteReduction = Math.round(currentFTE * 0.58); // 58% reduction
  const optimizedAnnualCost = (currentFTE - fteReduction) * averageSalary + 75000;
  const annualSavings = currentAnnualCost - optimizedAnnualCost;
  const implementationCost = 450000;
  const year1NetSavings = annualSavings - implementationCost;
  const roiPercentage = ((annualSavings * 3 - implementationCost) / implementationCost) * 100;

  return {
    department: 'financial-aid',
    currentAnnualCost,
    optimizedAnnualCost,
    annualSavings,
    fteReduction,
    implementationCost,
    year1NetSavings,
    roiPercentage
  };
}

export function calculateHumanResources(inputs: CalculatorInputs): ROIResults {
  const { totalEmployees = 0, currentFTE, averageSalary } = inputs;

  const currentAnnualCost = currentFTE * averageSalary;
  const fteReduction = Math.round(currentFTE * 0.58); // 58% reduction
  const optimizedAnnualCost = (currentFTE - fteReduction) * averageSalary + 100000;
  const annualSavings = currentAnnualCost - optimizedAnnualCost;
  const implementationCost = 500000;
  const year1NetSavings = annualSavings - implementationCost;
  const roiPercentage = ((annualSavings * 3 - implementationCost) / implementationCost) * 100;

  return {
    department: 'human-resources',
    currentAnnualCost,
    optimizedAnnualCost,
    annualSavings,
    fteReduction,
    implementationCost,
    year1NetSavings,
    roiPercentage
  };
}

// Helper
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}
