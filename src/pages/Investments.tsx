
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernInvestmentsPage from '@/components/modern/investments/ModernInvestmentsPage';

const Investments = () => {
  return (
    <ModernLayout 
      title="Investitionen" 
      subtitle="Verwalten Sie Ihr Investment-Portfolio"
    >
      <ModernInvestmentsPage />
    </ModernLayout>
  );
};

export default Investments;
