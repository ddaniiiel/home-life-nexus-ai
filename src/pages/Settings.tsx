
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernSettingsPage from '@/components/modern/settings/ModernSettingsPage';

const Settings = () => {
  return (
    <ModernLayout 
      title="Einstellungen" 
      subtitle="Konfigurieren Sie Ihre HomePilot Einstellungen"
    >
      <ModernSettingsPage />
    </ModernLayout>
  );
};

export default Settings;
