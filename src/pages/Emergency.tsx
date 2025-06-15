
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernEmergencyPage from '@/components/modern/emergency/ModernEmergencyPage';

const Emergency = () => {
  return (
    <ModernLayout 
      title="Notfälle" 
      subtitle="Wichtige Kontakte und Notfallpläne"
    >
      <ModernEmergencyPage />
    </ModernLayout>
  );
};

export default Emergency;
