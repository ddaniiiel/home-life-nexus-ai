
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Home } from 'lucide-react';

interface DashboardWelcomeHeaderProps {
  // The 'today' prop was being passed from DashboardContent.tsx
  // but not defined here. Adding it to resolve the TypeScript error.
  // We are not using it in the component's rendering for now,
  // but it's now correctly typed.
  today?: Date; // Making it optional for now, or we can decide if it's mandatory.
                 // Given the error, it was passed, so it was expected.
                 // Let's assume it was intended to be passed, even if not used yet.
}

const DashboardWelcomeHeader: React.FC<DashboardWelcomeHeaderProps> = ({ today }) => {
  // The 'today' prop is now available here if needed in the future.
  // For example: {today && <p>Date: {today.toLocaleDateString()}</p>}
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-gray-100 mb-1">Willkommen bei HomePilot</h1>
        <p className="text-muted-foreground text-base">Ihr zentrales Dashboard für ein smartes Zuhause.</p>
      </div>
      <div className="flex items-center space-x-3 mt-4 md:mt-0">
        <Button size="sm" variant="outline" asChild className="rounded-sm">
          <Link to="/tasks">
            <Bell className="mr-2" />
            Aufgaben (5)
          </Link>
        </Button>
        <Button size="sm" asChild className="bg-homepilot-primary hover:bg-homepilot-secondary rounded-sm">
          <Link to="/smart-home">
            <Home className="mr-2" />
            Smart Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardWelcomeHeader;
