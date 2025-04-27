
import React from 'react';
import Navigation from '@/components/Navigation';
import { Home, Calendar, FileText, CreditCard, Package, LineChart, Bell } from 'lucide-react';
import Widget from '@/components/Widget';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import TaskWidget from '@/components/TaskWidget';
import CalendarWidget from '@/components/CalendarWidget';
import FinanceWidget from '@/components/FinanceWidget';
import FloorPlanLayout from '@/components/FloorPlanLayout';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FloorPlanLayout />
            </div>
            
            <div className="space-y-6">
              <SmartHomeWidget />
              <TaskWidget />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <CalendarWidget />
            <FinanceWidget />
            
            <Widget title="Dokumente" icon={<FileText className="h-5 w-5" />}>
              <div className="space-y-2">
                <p className="text-sm">Letzte Uploads:</p>
                <div className="text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span>Energierechnung_2025.pdf</span>
                    <span className="text-xs text-gray-500">Heute</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span>Versicherung_2025.pdf</span>
                    <span className="text-xs text-gray-500">Gestern</span>
                  </div>
                </div>
                <a href="/documents" className="text-xs text-homepilot-primary hover:underline block mt-2">
                  Alle Dokumente →
                </a>
              </div>
            </Widget>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Widget title="Energie & Verbrauch" icon={<LineChart className="h-5 w-5" />}>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Stromverbrauch heute:</span>
                  <span className="text-sm font-medium">8.2 kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Heizung (Durchschnitt):</span>
                  <span className="text-sm font-medium">21.5°C</span>
                </div>
                <a href="/reports" className="text-xs text-homepilot-primary hover:underline block">
                  Zum Energiebericht →
                </a>
              </div>
            </Widget>

            <Widget title="Vorräte & Einkauf" icon={<Package className="h-5 w-5" />}>
              <div className="space-y-2">
                <p className="text-sm">Einkaufsliste:</p>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Milch</span>
                    <span className="text-red-500 text-xs">Wenig</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brot</span>
                    <span className="text-yellow-500 text-xs">Mittel</span>
                  </div>
                </div>
                <a href="/inventory" className="text-xs text-homepilot-primary hover:underline block mt-2">
                  Zum Vorratsmanager →
                </a>
              </div>
            </Widget>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
