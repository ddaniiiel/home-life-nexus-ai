
import React, { useState } from 'react';
import { 
  Zap, Plus, MoreVertical, Calendar, Clock, Eye, PenLine, 
  Trash2, Play, Pause
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Automation } from '../types/smart-home';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface AutomationListProps {
  automations: Automation[];
  onCreateAutomation: () => void;
  onEditAutomation: (automation: Automation) => void;
  onDeleteAutomation: (id: number) => void;
  onToggleAutomation: (id: number, isEnabled: boolean) => void;
}

const AutomationList: React.FC<AutomationListProps> = ({
  automations,
  onCreateAutomation,
  onEditAutomation,
  onDeleteAutomation,
  onToggleAutomation
}) => {
  const [filterType, setFilterType] = useState<'all' | 'active' | 'inactive'>('all');
  
  const filteredAutomations = automations.filter(automation => {
    if (filterType === 'active') return automation.isEnabled;
    if (filterType === 'inactive') return !automation.isEnabled;
    return true;
  });

  const handleDelete = (id: number) => {
    if (confirm('Sind Sie sicher, dass Sie diese Automatisierung löschen möchten?')) {
      onDeleteAutomation(id);
      toast({
        title: "Gelöscht",
        description: "Die Automatisierung wurde erfolgreich gelöscht.",
      });
    }
  };

  const renderTriggerSummary = (automation: Automation) => {
    if (!automation.triggers.length) return 'Keine Auslöser definiert';
    
    return automation.triggers.map((trigger, index) => {
      switch (trigger.type) {
        case 'device':
          return `Wenn Gerät ${trigger.deviceId} sich ändert`;
        case 'time':
          return `Zeitplan: ${trigger.timeSpec || 'Nicht spezifiziert'}`;
        case 'location':
          return `Beim ${trigger.locationEvent === 'enter' ? 'Betreten' : 'Verlassen'} von ${trigger.locationZone || 'Zone'}`;
        case 'sensor':
          return `Wenn Sensor ${trigger.sensorId} sich ändert`;
        default:
          return `Auslöser ${index + 1}`;
      }
    }).join(', ');
  };

  const renderActionSummary = (automation: Automation) => {
    if (!automation.actions.length) return 'Keine Aktionen definiert';
    
    return automation.actions.map((action, index) => {
      switch (action.type) {
        case 'device':
          return `${action.property === 'isOn' ? (action.value ? 'Einschalten' : 'Ausschalten') : 'Ändern'} von Gerät ${action.deviceId}`;
        case 'scene':
          return `Szene ${action.sceneId} aktivieren`;
        case 'notification':
          return `Benachrichtigung senden: ${action.notification?.title || ''}`;
        case 'delay':
          return `${action.delaySeconds || 0} Sekunden warten`;
        case 'service':
          return `Dienst ${action.service?.name || ''} aufrufen`;
        default:
          return `Aktion ${index + 1}`;
      }
    }).join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Zap className="mr-2 h-6 w-6 text-homepilot-primary" />
          Automatisierungen
          <Badge variant="outline" className="ml-2">{automations.length}</Badge>
        </h2>
        <div className="flex items-center gap-2">
          <RadioGroup 
            className="flex" 
            defaultValue="all" 
            value={filterType}
            onValueChange={(value) => setFilterType(value as 'all' | 'active' | 'inactive')}
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="all" id="all" className="sr-only" />
              <Label
                htmlFor="all"
                className={cn(
                  "px-3 py-1 rounded-md text-sm cursor-pointer",
                  filterType === "all" ? "bg-homepilot-primary text-white" : "bg-transparent hover:bg-gray-100"
                )}
              >
                Alle
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="active" id="active" className="sr-only" />
              <Label
                htmlFor="active"
                className={cn(
                  "px-3 py-1 rounded-md text-sm cursor-pointer",
                  filterType === "active" ? "bg-homepilot-primary text-white" : "bg-transparent hover:bg-gray-100"
                )}
              >
                Aktiv
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="inactive" id="inactive" className="sr-only" />
              <Label
                htmlFor="inactive"
                className={cn(
                  "px-3 py-1 rounded-md text-sm cursor-pointer",
                  filterType === "inactive" ? "bg-homepilot-primary text-white" : "bg-transparent hover:bg-gray-100"
                )}
              >
                Inaktiv
              </Label>
            </div>
          </RadioGroup>

          <Button onClick={onCreateAutomation} className="ml-2">
            <Plus className="h-4 w-4 mr-2" /> Neu
          </Button>
        </div>
      </div>
      
      {filteredAutomations.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-8">
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Keine Automatisierungen vorhanden</h3>
              <p className="text-gray-500 mb-4">
                Erstellen Sie Automatisierungen, um Ihr Smart Home mit Regeln zu steuern.
              </p>
              <Button onClick={onCreateAutomation}>
                <Plus className="h-4 w-4 mr-2" /> Automatisierung erstellen
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAutomations.map((automation) => (
            <Card 
              key={automation.id} 
              className={cn(
                "transition-all",
                automation.isEnabled 
                  ? "border-homepilot-primary/20 shadow-sm" 
                  : "border-gray-200 opacity-75"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className={cn(
                    "text-lg",
                    !automation.isEnabled && "text-gray-500"
                  )}>
                    {automation.name}
                  </CardTitle>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Switch
                        checked={automation.isEnabled}
                        onCheckedChange={(checked) => {
                          onToggleAutomation(automation.id, checked);
                          toast({
                            title: checked ? "Aktiviert" : "Deaktiviert",
                            description: `Die Automatisierung wurde ${checked ? 'aktiviert' : 'deaktiviert'}.`,
                          });
                        }}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Optionen</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditAutomation(automation)}>
                          <PenLine className="h-4 w-4 mr-2" /> Bearbeiten
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(automation.id)}>
                          <Trash2 className="h-4 w-4 mr-2 text-red-500" /> Löschen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {automation.description && (
                  <CardDescription>
                    {automation.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="border-t pt-3">
                  <div className="text-xs text-gray-500 mb-1">WENN:</div>
                  <div className="text-sm">{renderTriggerSummary(automation)}</div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="text-xs text-gray-500 mb-1">DANN:</div>
                  <div className="text-sm">{renderActionSummary(automation)}</div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-gray-500 border-t pt-3">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Erstellt: {format(new Date(automation.created), 'dd.MM.yyyy', { locale: de })}
                    </div>
                    {automation.lastTriggered && (
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Zuletzt ausgelöst: {format(new Date(automation.lastTriggered), 'dd.MM.yyyy HH:mm', { locale: de })}
                      </div>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutomationList;
