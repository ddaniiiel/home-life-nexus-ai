
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernTasksPage from '@/components/modern/tasks/ModernTasksPage';

const Tasks = () => {
  return (
    <ModernLayout 
      title="Aufgaben" 
      subtitle="Verwalten Sie Ihre Familienaufgaben"
    >
      <ModernTasksPage />
    </ModernLayout>
  );
};

export default Tasks;
