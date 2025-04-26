
import React from 'react';
import DashboardHeader from './DashboardHeader';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import TaskWidget from '@/components/TaskWidget';
import CalendarWidget from '@/components/CalendarWidget';

interface DashboardProps {
  userName: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, onLogout }) => {
  return (
    <div className="md:ml-64 min-h-screen">
      <div className="p-4 md:p-8 pt-20 md:pt-8">
        <DashboardHeader userName={userName} onLogout={onLogout} />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SmartHomeWidget />
          <TaskWidget />
          <CalendarWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
