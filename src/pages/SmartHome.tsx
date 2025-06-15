
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernSmartHomePage from '@/components/modern/smart-home/ModernSmartHomePage';

const SmartHome = () => {
  return (
    <ModernLayout 
      title="Smart Home" 
      subtitle="Steuern Sie Ihr intelligentes Zuhause"
    >
      <ModernSmartHomePage />
    </ModernLayout>
  );
};

export default SmartHome;
