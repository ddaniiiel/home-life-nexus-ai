
import React from 'react';
import DashboardHeader from './DashboardHeader';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import TaskWidget from '@/components/TaskWidget';
import CalendarWidget from '@/components/CalendarWidget';
import FinanceWidget from '@/components/FinanceWidget';
import { FileText, Package } from 'lucide-react';
import Widget from '@/components/Widget';

interface DashboardProps {
  userName: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, onLogout }) => {
  return (
    <div className="md:ml-64 min-h-screen">
      <div className="p-4 md:p-8 pt-20 md:pt-8">
        <DashboardHeader userName={userName} onLogout={onLogout} />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <SmartHomeWidget />
          <TaskWidget />
          <CalendarWidget />
        </div>
        
        <h2 className="text-xl font-semibold mb-4 mt-8">Finanzen & Dokumente</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FinanceWidget />
          
          <Widget title="Dokumente" icon={<FileText className="h-5 w-5" />}>
            <div className="space-y-3">
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Stromvertrag.pdf</p>
                  <p className="text-xs text-gray-500">Hinzugefügt: 15.04.2025</p>
                </div>
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Versicherung.pdf</p>
                  <p className="text-xs text-gray-500">Hinzugefügt: 10.03.2025</p>
                </div>
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Mietvertrag.pdf</p>
                  <p className="text-xs text-gray-500">Hinzugefügt: 01.01.2025</p>
                </div>
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              
              <a href="#" className="text-xs text-homepilot-primary hover:underline mt-2 block">Alle Dokumente anzeigen →</a>
            </div>
          </Widget>
          
          <Widget title="Vorräte" icon={<Package className="h-5 w-5" />}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Küche</span>
                <span className="text-xs text-gray-500">25 Artikel</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mehl</span>
                  <span className="text-xs text-red-500">Fast leer</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Zucker</span>
                  <span className="text-xs text-green-500">Ausreichend</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kaffee</span>
                  <span className="text-xs text-yellow-500">Mittel</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium">Bad</span>
                <span className="text-xs text-gray-500">12 Artikel</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Shampoo</span>
                  <span className="text-xs text-yellow-500">Mittel</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Zahnpasta</span>
                  <span className="text-xs text-red-500">Fast leer</span>
                </div>
              </div>
              
              <a href="#" className="text-xs text-homepilot-primary hover:underline mt-2 block">Zum Vorratsmanager →</a>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
