
import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface DashboardWelcomeHeaderProps {
  today: Date;
}

const DashboardWelcomeHeader: React.FC<DashboardWelcomeHeaderProps> = ({ today }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-homepilot-primary">Willkommen bei HomePilot</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {format(today, "EEEE, d. MMMM yyyy", { locale: de })} • Ein schöner Tag für deine Familie
        </p>
      </div>
    </div>
  );
};

export default DashboardWelcomeHeader;
