
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernCalendarPage from '@/components/modern/calendar/ModernCalendarPage';

const Calendar = () => {
  return (
    <ModernLayout 
      title="Kalender" 
      subtitle="Verwalten Sie Ihre Familientermine"
    >
      <ModernCalendarPage />
    </ModernLayout>
  );
};

export default Calendar;
