
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { Home, Calendar, FileText, Wallet, Package, Newspaper, Lightbulb, Phone } from 'lucide-react';

const iconGridItems = [
  { to: "/smart-home", icon: Lightbulb, label: "Smart Home" },
  { to: "/tasks", icon: Calendar, label: "Familienkalender" },
  { to: "/documents", icon: FileText, label: "Dokumente" },
  { to: "/finances", icon: Wallet, label: "Familienbudget" },
  { to: "/inventory", icon: Package, label: "Haushalt" },
  { to: "/news", icon: Newspaper, label: "Wichtiges" },
  { to: "/emergency", icon: Phone, label: "Notfälle", special: true },
];

const DashboardIconGrid = () => {
  return (
    <EnhancedCard 
      title="Familien-Dashboard"
      variant="gradient"
      className="mb-8 shadow-sm"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {iconGridItems.map(item => (
          <Button 
            key={item.label}
            variant="outline" 
            asChild 
            className={`h-auto flex flex-col py-4 px-2 text-center rounded-md hover:bg-accent/50 dark:hover:bg-accent/20 border-border/70 ${item.special ? 'hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50/50 dark:hover:bg-red-900/20' : 'hover:border-primary/30 dark:hover:border-primary/70'}`}
          >
            <Link to={item.to}>
              <item.icon className={`h-6 w-6 mb-2 ${item.special ? 'text-red-600 dark:text-red-500' : 'text-primary'}`} />
              <span className="text-xs font-medium text-foreground/80">{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </EnhancedCard>
  );
};

export default DashboardIconGrid;
