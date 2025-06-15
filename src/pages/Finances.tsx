
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernFinancesPage from '@/components/modern/finances/ModernFinancesPage';

const Finances = () => {
  return (
    <ModernLayout 
      title="Finanzen" 
      subtitle="Verwalten Sie Ihr Budget und Ihre Ausgaben"
    >
      <ModernFinancesPage />
    </ModernLayout>
  );
};

export default Finances;
