
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CreditCard, ChevronRight, Wallet } from 'lucide-react';

const DashboardFinancialOverview = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-green-700 flex items-center">
        <Wallet className="h-5 w-5 mr-2" />
        Finanzübersicht
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-100 dark:border-green-800 shadow-md">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold mb-2">Gesamtvermögen</h3>
            <div className="flex items-end space-x-2 mb-4">
              <span className="text-2xl font-bold">CHF 479'700</span>
              <span className="text-green-600 text-sm">+1.4%</span>
            </div>
            
            <div className="space-y-1 border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Swissquote</span>
                <span className="text-sm font-medium">CHF 245'000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Saxo Bank</span>
                <span className="text-sm font-medium">CHF 178'500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Raiffeisen</span>
                <span className="text-sm font-medium">CHF 35'000</span>
              </div>
            </div>
            
            <div className="mt-4 pt-2 border-t">
              <Link to="/finances" className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                Portfolio ansehen
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-100 dark:border-green-800 shadow-md">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold mb-3">Nächste Rechnungen</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium">Stromrechnung</p>
                  <p className="text-xs text-gray-500">Fällig: 15.05.2025</p>
                </div>
                <span className="text-sm font-medium">CHF 120</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium">Internet</p>
                  <p className="text-xs text-gray-500">Fällig: 20.05.2025</p>
                </div>
                <span className="text-sm font-medium">CHF 85</span>
              </div>
            </div>
            
            <div className="mt-4 pt-2 border-t">
              <Link to="/finances" className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                Alle Rechnungen
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-100 dark:border-green-800 shadow-md">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold mb-3">Monatliches Budget</h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Verbraucht</span>
                <span className="text-sm font-medium">CHF 3'200 / 4'000</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="text-xs text-gray-500 text-right mt-1">20% verfügbar</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Lebensmittel</span>
                <span className="text-sm text-gray-600">70% verbraucht</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Freizeit</span>
                <span className="text-sm text-yellow-600">90% verbraucht</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Transport</span>
                <span className="text-sm text-red-600">100% verbraucht</span>
              </div>
            </div>
            
            <div className="mt-4 pt-2 border-t">
              <Link to="/finances" className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                Budget verwalten
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardFinancialOverview;
