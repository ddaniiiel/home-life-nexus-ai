
import React from 'react';
import { 
  Lightbulb, Plus, Calendar, FileText, CreditCard, 
  Thermometer, Lock, Camera, Users, ShoppingCart,
  Car, Home, Phone, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
  description?: string;
}

const QuickActionsGrid: React.FC = () => {
  const quickActions: QuickAction[] = [
    {
      id: 'lights-all',
      label: 'Alle Lichter',
      icon: <Lightbulb className="h-5 w-5" />,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      action: () => console.log('Toggle all lights'),
      description: 'Ein/Aus'
    },
    {
      id: 'security',
      label: 'Sicherheit',
      icon: <Lock className="h-5 w-5" />,
      color: 'bg-red-500 hover:bg-red-600',
      action: () => console.log('Toggle security'),
      description: 'Aktivieren'
    },
    {
      id: 'temperature',
      label: 'Heizung',
      icon: <Thermometer className="h-5 w-5" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => console.log('Adjust temperature'),
      description: '21°C'
    },
    {
      id: 'add-task',
      label: 'Aufgabe',
      icon: <Plus className="h-5 w-5" />,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Add task'),
      description: 'Hinzufügen'
    },
    {
      id: 'shopping',
      label: 'Einkaufen',
      icon: <ShoppingCart className="h-5 w-5" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('Shopping list'),
      description: '5 Artikel'
    },
    {
      id: 'calendar',
      label: 'Termine',
      icon: <Calendar className="h-5 w-5" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => console.log('Calendar'),
      description: 'Heute: 3'
    },
    {
      id: 'energy',
      label: 'Energie',
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      action: () => console.log('Energy'),
      description: 'Sparmodus'
    },
    {
      id: 'family',
      label: 'Familie',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-pink-500 hover:bg-pink-600',
      action: () => console.log('Family'),
      description: '4 Zuhause'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-homepilot-secondary">Schnellzugriff</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Häufig verwendete Aktionen
          </p>
        </div>
        <Button variant="ghost" size="sm">
          Anpassen
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="group flex flex-col items-center p-4 rounded-xl transition-all hover:scale-105 hover:shadow-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white mb-3 transition-all group-hover:scale-110",
              action.color
            )}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              {action.label}
            </span>
            {action.description && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {action.description}
              </span>
            )}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActionsGrid;
