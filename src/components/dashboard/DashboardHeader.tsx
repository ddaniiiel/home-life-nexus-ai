
import React from 'react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Willkommen zurück, {userName}!</h1>
          <p className="text-gray-500 mt-1">Hier ist deine tägliche Übersicht.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={onLogout}>Abmelden</Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
