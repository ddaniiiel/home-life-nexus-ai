
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernReportsPage from '@/components/modern/reports/ModernReportsPage';

const Reports = () => {
  return (
    <ModernLayout 
      title="Berichte" 
      subtitle="Analysen und Statistiken Ihres Haushalts"
    >
      <ModernReportsPage />
    </ModernLayout>
  );
};

export default Reports;
