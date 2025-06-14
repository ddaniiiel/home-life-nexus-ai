
import React from 'react';
import { Link } from 'react-router-dom';
import Widget from '@/components/Widget';
import { Shield } from 'lucide-react';

const InsuranceWidget = () => {
  return (
    <Widget title="Versicherungen" icon={<Shield />}>
      <div className="space-y-3">
        <div className="p-2.5 rounded-md border border-red-200 dark:border-red-700/60 bg-red-50/50 dark:bg-red-900/20">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium text-sm">Hausratversicherung</p>
            <span className="text-xs text-red-600 dark:text-red-400">Verlängerung fällig</span>
          </div>
          <p className="text-xs text-muted-foreground">Frist: 30.04.2025</p>
        </div>
        
        <div className="p-2.5 rounded-md border border-homepilot-warning/30 dark:border-yellow-600/50 bg-yellow-50/50 dark:bg-yellow-900/20">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium text-sm">Familienhaftpflicht</p>
            <span className="text-xs text-orange-600 dark:text-yellow-400">Prüfen</span>
          </div>
          <p className="text-xs text-muted-foreground">Deckung erhöhen?</p>
        </div>
        
        <Link to="/finances" className="text-xs text-primary hover:underline mt-3 block">
          Versicherungen verwalten →
        </Link>
      </div>
    </Widget>
  );
};

export default InsuranceWidget;
