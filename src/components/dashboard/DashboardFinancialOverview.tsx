
import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ChevronRight, CreditCard, Receipt, LineChart, PiggyBank } from 'lucide-react';
import Widget from '@/components/Widget';

const DashboardFinancialOverview = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-green-700 flex items-center">
        <Wallet className="h-5 w-5 mr-2" />
        Finanzübersicht
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Widget 
          title="Gesamtvermögen" 
          icon={<PiggyBank className="h-5 w-5" />}
          variant="secondary"
        >
          <div className="space-y-3">
            <div className="flex items-end space-x-2 mb-2">
              <span className="text-xl font-bold">CHF 479'700</span>
              <span className="text-green-600 text-sm">+1.4%</span>
            </div>
            
            <div className="space-y-2 border-t pt-3">
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
            
            <Link to="/finances" className="text-xs text-green-600 hover:underline mt-3 block">
              Portfolio ansehen <ChevronRight className="h-3 w-3 inline" />
            </Link>
          </div>
        </Widget>
        
        <Widget 
          title="Nächste Rechnungen" 
          icon={<Receipt className="h-5 w-5" />}
          variant="secondary"
        >
          <div className="space-y-3">
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
            
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium">Versicherung</p>
                <p className="text-xs text-gray-500">Fällig: 01.06.2025</p>
              </div>
              <span className="text-sm font-medium">CHF 240</span>
            </div>
            
            <Link to="/finances" className="text-xs text-green-600 hover:underline mt-2 block">
              Alle Rechnungen <ChevronRight className="h-3 w-3 inline" />
            </Link>
          </div>
        </Widget>
        
        <Widget 
          title="Monatliches Budget" 
          icon={<LineChart className="h-5 w-5" />}
          variant="secondary"
        >
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Verbraucht</span>
                <span className="text-sm font-medium">CHF 3'200 / 4'000</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="text-xs text-gray-500 text-right mt-1">20% verfügbar</div>
            </div>
            
            <div className="space-y-2 border-t pt-3">
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
            
            <Link to="/finances" className="text-xs text-green-600 hover:underline mt-2 block">
              Budget verwalten <ChevronRight className="h-3 w-3 inline" />
            </Link>
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default DashboardFinancialOverview;
