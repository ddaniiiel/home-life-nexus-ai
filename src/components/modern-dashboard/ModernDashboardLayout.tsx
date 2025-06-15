
import React, { useState } from 'react';
import ModernSidebar from '../ModernSidebar';
import DashboardHeader from './DashboardHeader';
import QuickActionsGrid from './QuickActionsGrid';
import FamilyActivityFeed from './FamilyActivityFeed';
import FloorPlanLayout from '../FloorPlanLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnergyUsageWidget from '../dashboard/EnergyUsageWidget';
import { cn } from '@/lib/utils';

const ModernDashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModernSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={cn(
        "transition-all duration-300",
        sidebarOpen ? "md:ml-80" : "md:ml-80"
      )}>
        <DashboardHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Quick Actions */}
            <QuickActionsGrid />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Activity Feed */}
              <div className="lg:col-span-1">
                <FamilyActivityFeed />
              </div>
              
              {/* Right Column - Floor Plan and Energy */}
              <div className="lg:col-span-2 space-y-6">
                <FloorPlanLayout />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EnergyUsageWidget />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Heute geplant</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div>
                            <p className="font-medium">Zahnarzt Termin</p>
                            <p className="text-sm text-gray-600">14:30 - Max</p>
                          </div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div>
                            <p className="font-medium">Einkaufen</p>
                            <p className="text-sm text-gray-600">Nachmittag - Lisa</p>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div>
                            <p className="font-medium">Putzhilfe</p>
                            <p className="text-sm text-gray-600">16:00 - 18:00</p>
                          </div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModernDashboardLayout;
