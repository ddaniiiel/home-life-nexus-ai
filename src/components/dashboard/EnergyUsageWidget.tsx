
import React from 'react';
import { Link } from 'react-router-dom';
import Widget from '@/components/Widget';
import { LineChart } from 'lucide-react';

const EnergyUsageWidget = () => {
  return (
    <Widget title="Aktueller Energieverbrauch" icon={<LineChart />}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Strom heute</span>
          <span className="text-sm font-medium">8.2 kWh <span className="text-homepilot-primary">(-12%)</span></span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Heizung (∅)</span>
          <span className="text-sm font-medium">21.5°C</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Wasser heute</span>
          <span className="text-sm font-medium">120 L <span className="text-homepilot-primary">(-5%)</span></span>
        </div>
        <Link to="/reports" className="text-xs text-primary hover:underline block mt-3">
          Zum Energiebericht →
        </Link>
      </div>
    </Widget>
  );
};

export default EnergyUsageWidget;
