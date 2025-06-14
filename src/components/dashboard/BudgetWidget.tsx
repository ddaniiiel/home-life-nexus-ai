
import React from 'react';
import { Link } from 'react-router-dom';
import Widget from '@/components/Widget';
import { Wallet } from 'lucide-react';

const BudgetWidget = () => {
  return (
    <Widget title="Haushaltsbudget" icon={<Wallet />}>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2.5 border-b border-border/70">
          <span className="text-sm font-medium">Budget April</span>
          <span className="font-semibold">CHF 3'200 / 4'000</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center p-1.5 rounded-sm hover:bg-accent/30 dark:hover:bg-accent/10">
            <span className="text-sm text-muted-foreground">Lebensmittel</span>
            <span className="text-sm">CHF 850 / 1'200</span>
          </div>
          
          <div className="flex justify-between items-center p-1.5 rounded-sm hover:bg-accent/30 dark:hover:bg-accent/10">
            <span className="text-sm text-muted-foreground">Freizeit</span>
            <span className="text-sm">CHF 450 / 600</span>
          </div>
          
          <div className="flex justify-between items-center p-1.5 rounded-sm hover:bg-accent/30 dark:hover:bg-accent/10">
            <span className="text-sm text-muted-foreground">Kinder</span>
            <span className="text-sm">CHF 600 / 800</span>
          </div>
        </div>
        
        <Link to="/finances" className="text-xs text-primary hover:underline mt-3 block">
          Zum Budgetplaner →
        </Link>
      </div>
    </Widget>
  );
};

export default BudgetWidget;
