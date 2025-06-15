
import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar }) => {
  const currentTime = new Date().toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const notifications = [
    { id: 1, type: 'warning', message: 'Waschmaschine fertig' },
    { id: 2, type: 'info', message: 'Energieverbrauch heute: 15% unter Durchschnitt' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex-1">
          <BreadcrumbNavigation className="mb-2" />
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-homepilot-secondary">
                Guten Tag, Thomas!
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date().toLocaleDateString('de-DE', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Global Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suchen..."
              className="pl-10 w-64 bg-gray-50 dark:bg-gray-800 border-0"
            />
          </div>

          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-4 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-center">
              <p className="text-xs text-gray-500">Temperatur</p>
              <p className="text-sm font-medium">21°C</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Energie</p>
              <p className="text-sm font-medium text-green-600">-15%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Geräte</p>
              <p className="text-sm font-medium">8/12</p>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" />
            <AvatarFallback>TS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
