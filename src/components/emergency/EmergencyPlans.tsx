
import React from 'react';
import { Calendar, BadgeAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmergencyPlan {
  id: number;
  title: string;
  description: string;
  steps: string[];
  lastUpdated: string;
  category: string;
  important?: boolean;
}

interface EmergencyPlansProps {
  plans: EmergencyPlan[];
}

const EmergencyPlans: React.FC<EmergencyPlansProps> = ({ plans }) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Notfallpläne</CardTitle>
        <CardDescription>
          Vorbereitete Handlungsanweisungen für verschiedene Notfallszenarien
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.id} className={cn(
            "border rounded-lg overflow-hidden",
            plan.important ? "border-red-200 bg-red-50/50" : ""
          )}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center">
                  {plan.important && (
                    <BadgeAlert className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  {plan.title}
                </h3>
                <Badge variant="outline" className={cn(
                  plan.category === "home" ? "border-blue-200 bg-blue-50 text-blue-700" :
                  plan.category === "medical" ? "border-green-200 bg-green-50 text-green-700" :
                  "border-yellow-200 bg-yellow-50 text-yellow-700"
                )}>
                  {plan.category === "home" ? "Zuhause" : 
                   plan.category === "medical" ? "Medizinisch" : "Fahrzeug"}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
              
              <div className="text-sm space-y-1">
                <p className="font-medium">Schritte:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  {plan.steps.slice(0, 3).map((step, index) => (
                    <li key={index} className="text-sm">{step}</li>
                  ))}
                  {plan.steps.length > 3 && (
                    <li className="text-sm text-gray-500">...und {plan.steps.length - 3} weitere Schritte</li>
                  )}
                </ol>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-2 border-t">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Aktualisiert: {new Date(plan.lastUpdated).toLocaleDateString('de-CH')}</span>
                </div>
                <Button variant="ghost" size="sm">
                  Vollständig anzeigen
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Neuen Notfallplan erstellen
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmergencyPlans;
