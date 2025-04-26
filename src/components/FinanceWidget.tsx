
import React from 'react';
import { CreditCard, TrendingDown, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Widget from './Widget';

const FinanceWidget = () => {
  return (
    <Widget title="Finanzen" icon={<CreditCard className="h-5 w-5" />}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Monatsbudget</p>
            <p className="text-xl font-semibold">€1.250,00</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Ausgegeben</p>
            <p className="text-xl font-semibold">€875,50</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-gray-500 flex justify-between">
            <span>70% verbraucht</span>
            <span>€374,50 übrig</span>
          </p>
          <Progress value={70} className="h-2" />
        </div>

        <div className="pt-2 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-red-100 p-1 rounded-full mr-2">
                <TrendingDown className="h-3 w-3 text-red-600" />
              </div>
              <span className="text-sm">Lebensmittel</span>
            </div>
            <span className="text-sm font-medium">€320,45</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-green-100 p-1 rounded-full mr-2">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-sm">Gehalt</span>
            </div>
            <span className="text-sm font-medium">€2.400,00</span>
          </div>
        </div>

        <a href="#" className="text-xs text-homepilot-primary hover:underline mt-2 block">Zur Finanzübersicht →</a>
      </div>
    </Widget>
  );
};

export default FinanceWidget;
