
import React, { useState } from 'react';
import { 
  Plus, X, ChevronRight, Save, Check, Clock, Thermometer, 
  BellRing, Timer, Smartphone, Home, Zap, Sun, Moon, CloudRain,
  Users, MapPin, ToggleLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Automation, AutomationTrigger, AutomationCondition, AutomationAction, Device } from '../types/smart-home';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';

interface AutomationRuleEditorProps {
  automation?: Automation;
  devices: Device[];
  rooms: string[];
  onSave: (automation: Automation) => void;
  onCancel: () => void;
}

const triggerTypeOptions = [
  { value: 'device', label: 'Gerät', icon: Smartphone },
  { value: 'time', label: 'Zeit', icon: Clock },
  { value: 'location', label: 'Standort', icon: MapPin },
  { value: 'sensor', label: 'Sensor', icon: Thermometer },
  { value: 'scene', label: 'Szene', icon: Zap },
  { value: 'manual', label: 'Manuell', icon: ToggleLeft }
];

const conditionTypeOptions = [
  { value: 'device', label: 'Gerät', icon: Smartphone },
  { value: 'time', label: 'Zeit', icon: Clock },
  { value: 'location', label: 'Standort', icon: MapPin },
  { value: 'weather', label: 'Wetter', icon: CloudRain },
  { value: 'presence', label: 'Anwesenheit', icon: Users }
];

const actionTypeOptions = [
  { value: 'device', label: 'Gerät steuern', icon: Smartphone },
  { value: 'scene', label: 'Szene aktivieren', icon: Home },
  { value: 'notification', label: 'Benachrichtigung senden', icon: BellRing },
  { value: 'delay', label: 'Verzögerung', icon: Timer },
  { value: 'service', label: 'Dienst aufrufen', icon: Zap }
];

const getEmptyTrigger = (): AutomationTrigger => ({
  id: Date.now(),
  type: 'device'
});

const getEmptyCondition = (): AutomationCondition => ({
  id: Date.now(),
  type: 'device',
  operator: 'equals',
  value: null
});

const getEmptyAction = (): AutomationAction => ({
  id: Date.now(),
  type: 'device'
});

const AutomationRuleEditor: React.FC<AutomationRuleEditorProps> = ({ 
  automation, 
  devices, 
  rooms, 
  onSave, 
  onCancel 
}) => {
  const isNew = !automation;
  const currentDate = new Date().toISOString();

  const [rule, setRule] = useState<Automation>(automation || {
    id: Date.now(),
    name: '',
    isEnabled: true,
    triggers: [getEmptyTrigger()],
    conditions: [],
    actions: [getEmptyAction()],
    created: currentDate,
    modified: currentDate
  });

  const handleSave = () => {
    if (!rule.name.trim()) {
      toast({
        title: "Fehler",
        description: "Die Automatisierung benötigt einen Namen.",
        variant: "destructive"
      });
      return;
    }

    if (rule.triggers.length === 0) {
      toast({
        title: "Fehler",
        description: "Die Automatisierung benötigt mindestens einen Auslöser.",
        variant: "destructive"
      });
      return;
    }

    if (rule.actions.length === 0) {
      toast({
        title: "Fehler",
        description: "Die Automatisierung benötigt mindestens eine Aktion.",
        variant: "destructive"
      });
      return;
    }

    const updatedRule = {
      ...rule,
      modified: new Date().toISOString()
    };

    onSave(updatedRule);
    toast({
      title: "Gespeichert",
      description: "Die Automatisierung wurde erfolgreich gespeichert.",
    });
  };

  const addTrigger = () => {
    setRule({
      ...rule,
      triggers: [...rule.triggers, getEmptyTrigger()]
    });
  };

  const updateTrigger = (index: number, updatedTrigger: Partial<AutomationTrigger>) => {
    const updatedTriggers = [...rule.triggers];
    updatedTriggers[index] = { ...updatedTriggers[index], ...updatedTrigger };
    setRule({ ...rule, triggers: updatedTriggers });
  };

  const removeTrigger = (index: number) => {
    if (rule.triggers.length <= 1) {
      toast({
        title: "Hinweis",
        description: "Mindestens ein Auslöser ist erforderlich.",
      });
      return;
    }
    const updatedTriggers = rule.triggers.filter((_, i) => i !== index);
    setRule({ ...rule, triggers: updatedTriggers });
  };

  const addCondition = () => {
    setRule({
      ...rule,
      conditions: [...rule.conditions, getEmptyCondition()]
    });
  };

  const updateCondition = (index: number, updatedCondition: Partial<AutomationCondition>) => {
    const updatedConditions = [...rule.conditions];
    updatedConditions[index] = { ...updatedConditions[index], ...updatedCondition };
    setRule({ ...rule, conditions: updatedConditions });
  };

  const removeCondition = (index: number) => {
    const updatedConditions = rule.conditions.filter((_, i) => i !== index);
    setRule({ ...rule, conditions: updatedConditions });
  };

  const addAction = () => {
    setRule({
      ...rule,
      actions: [...rule.actions, getEmptyAction()]
    });
  };

  const updateAction = (index: number, updatedAction: Partial<AutomationAction>) => {
    const updatedActions = [...rule.actions];
    updatedActions[index] = { ...updatedActions[index], ...updatedAction };
    setRule({ ...rule, actions: updatedActions });
  };

  const removeAction = (index: number) => {
    if (rule.actions.length <= 1) {
      toast({
        title: "Hinweis",
        description: "Mindestens eine Aktion ist erforderlich.",
      });
      return;
    }
    const updatedActions = rule.actions.filter((_, i) => i !== index);
    setRule({ ...rule, actions: updatedActions });
  };

  const renderTriggerConfig = (trigger: AutomationTrigger, index: number) => {
    switch(trigger.type) {
      case 'device':
        return (
          <div className="space-y-4">
            <div>
              <Label>Gerät</Label>
              <Select 
                value={trigger.deviceId?.toString()} 
                onValueChange={(value) => updateTrigger(index, { deviceId: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Gerät auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map(device => (
                    <SelectItem key={device.id} value={device.id.toString()}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {trigger.deviceId && (
              <>
                <div>
                  <Label>Eigenschaft</Label>
                  <Select 
                    value={trigger.property} 
                    onValueChange={(value) => updateTrigger(index, { property: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Eigenschaft auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="isOn">Status (An/Aus)</SelectItem>
                      {devices.find(d => d.id === trigger.deviceId)?.brightness !== undefined && (
                        <SelectItem value="brightness">Helligkeit</SelectItem>
                      )}
                      {devices.find(d => d.id === trigger.deviceId)?.temp !== undefined && (
                        <SelectItem value="temp">Temperatur</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {trigger.property && (
                  <div>
                    <Label>Bedingung</Label>
                    <Select 
                      value={trigger.operator} 
                      onValueChange={(value) => updateTrigger(index, { 
                        operator: value as AutomationTrigger['operator'] 
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Bedingung auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Ist gleich</SelectItem>
                        <SelectItem value="not_equals">Ist nicht gleich</SelectItem>
                        {trigger.property !== 'isOn' && (
                          <>
                            <SelectItem value="greater_than">Ist größer als</SelectItem>
                            <SelectItem value="less_than">Ist kleiner als</SelectItem>
                          </>
                        )}
                        <SelectItem value="changes">Ändert sich</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {trigger.operator && trigger.operator !== 'changes' && (
                  <div>
                    <Label>Wert</Label>
                    {trigger.property === 'isOn' ? (
                      <Select 
                        value={trigger.value?.toString()} 
                        onValueChange={(value) => updateTrigger(index, { value: value === 'true' })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wert auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Ein</SelectItem>
                          <SelectItem value="false">Aus</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : trigger.property === 'brightness' ? (
                      <>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[trigger.value || 0]}
                          onValueChange={(newValue) => updateTrigger(index, { value: newValue[0] })}
                          className="mt-2"
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                          {trigger.value || 0}%
                        </div>
                      </>
                    ) : trigger.property === 'temp' ? (
                      <>
                        <Slider
                          min={16}
                          max={30}
                          step={0.5}
                          value={[trigger.value || 21]}
                          onValueChange={(newValue) => updateTrigger(index, { value: newValue[0] })}
                          className="mt-2"
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                          {trigger.value || 21}°C
                        </div>
                      </>
                    ) : (
                      <Input 
                        type="text" 
                        value={trigger.value || ''} 
                        onChange={(e) => updateTrigger(index, { value: e.target.value })}
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        );
      
      case 'time':
        return (
          <div className="space-y-4">
            <div>
              <Label>Zeitplan</Label>
              <Input 
                type="text" 
                value={trigger.timeSpec || ''} 
                onChange={(e) => updateTrigger(index, { timeSpec: e.target.value })}
                placeholder="z.B. '0 7 * * 1-5' (Mo-Fr um 7:00 Uhr)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Cron-Format: Minute Stunde Tag Monat Wochentag
              </p>
            </div>
          </div>
        );
      
      // Additional trigger types could be implemented here
      
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Bitte wählen Sie einen Auslösertyp aus
          </div>
        );
    }
  };

  const renderActionConfig = (action: AutomationAction, index: number) => {
    switch(action.type) {
      case 'device':
        return (
          <div className="space-y-4">
            <div>
              <Label>Gerät</Label>
              <Select 
                value={action.deviceId?.toString()} 
                onValueChange={(value) => updateAction(index, { deviceId: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Gerät auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map(device => (
                    <SelectItem key={device.id} value={device.id.toString()}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {action.deviceId && (
              <>
                <div>
                  <Label>Eigenschaft</Label>
                  <Select 
                    value={action.property} 
                    onValueChange={(value) => updateAction(index, { property: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Eigenschaft auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="isOn">Status (An/Aus)</SelectItem>
                      {devices.find(d => d.id === action.deviceId)?.brightness !== undefined && (
                        <SelectItem value="brightness">Helligkeit</SelectItem>
                      )}
                      {devices.find(d => d.id === action.deviceId)?.temp !== undefined && (
                        <SelectItem value="temp">Temperatur</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {action.property && (
                  <div>
                    <Label>Wert</Label>
                    {action.property === 'isOn' ? (
                      <Select 
                        value={action.value?.toString()} 
                        onValueChange={(value) => updateAction(index, { value: value === 'true' })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wert auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Ein</SelectItem>
                          <SelectItem value="false">Aus</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : action.property === 'brightness' ? (
                      <>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[action.value || 0]}
                          onValueChange={(newValue) => updateAction(index, { value: newValue[0] })}
                          className="mt-2"
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                          {action.value || 0}%
                        </div>
                      </>
                    ) : action.property === 'temp' ? (
                      <>
                        <Slider
                          min={16}
                          max={30}
                          step={0.5}
                          value={[action.value || 21]}
                          onValueChange={(newValue) => updateAction(index, { value: newValue[0] })}
                          className="mt-2"
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                          {action.value || 21}°C
                        </div>
                      </>
                    ) : (
                      <Input 
                        type="text" 
                        value={action.value || ''} 
                        onChange={(e) => updateAction(index, { value: e.target.value })}
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        );
      
      case 'notification':
        return (
          <div className="space-y-4">
            <div>
              <Label>Titel</Label>
              <Input 
                type="text" 
                value={action.notification?.title || ''} 
                onChange={(e) => updateAction(index, { 
                  notification: { 
                    ...action.notification, 
                    title: e.target.value,
                    body: action.notification?.body || '',
                    priority: action.notification?.priority || 'normal'
                  } 
                })}
                placeholder="Benachrichtigungstitel"
              />
            </div>
            <div>
              <Label>Nachricht</Label>
              <Textarea 
                value={action.notification?.body || ''} 
                onChange={(e) => updateAction(index, { 
                  notification: { 
                    ...action.notification, 
                    body: e.target.value,
                    title: action.notification?.title || '',
                    priority: action.notification?.priority || 'normal'
                  } 
                })}
                placeholder="Nachrichteninhalt"
              />
            </div>
            <div>
              <Label>Priorität</Label>
              <Select 
                value={action.notification?.priority || 'normal'} 
                onValueChange={(value) => updateAction(index, { 
                  notification: { 
                    ...action.notification, 
                    priority: value as 'normal' | 'high' | 'urgent',
                    title: action.notification?.title || '',
                    body: action.notification?.body || ''
                  } 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priorität auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Hoch</SelectItem>
                  <SelectItem value="urgent">Dringend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'delay':
        return (
          <div className="space-y-4">
            <div>
              <Label>Verzögerung (Sekunden)</Label>
              <Input 
                type="number" 
                value={action.delaySeconds || ''} 
                onChange={(e) => updateAction(index, { 
                  delaySeconds: parseInt(e.target.value) || 0 
                })}
                min="0"
              />
            </div>
          </div>
        );

      // Additional action types could be implemented here
      
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Bitte wählen Sie einen Aktionstyp aus
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{isNew ? 'Neue Automatisierung' : 'Automatisierung bearbeiten'}</CardTitle>
            <CardDescription>Erstellen Sie Wenn-Dann-Regeln für Ihre Smart Home Geräte</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Aktiviert</span>
            <Switch 
              checked={rule.isEnabled} 
              onCheckedChange={(checked) => setRule({...rule, isEnabled: checked})}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="rule-name">Name</Label>
          <Input 
            id="rule-name"
            value={rule.name} 
            onChange={(e) => setRule({...rule, name: e.target.value})}
            placeholder="Name der Automatisierung"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="rule-description">Beschreibung (optional)</Label>
          <Textarea 
            id="rule-description"
            value={rule.description || ''} 
            onChange={(e) => setRule({...rule, description: e.target.value})}
            placeholder="Beschreibung der Automatisierung"
            className="mt-1"
          />
        </div>

        <Tabs defaultValue="triggers" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="triggers" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Auslöser
            </TabsTrigger>
            <TabsTrigger value="conditions" className="flex items-center">
              <Thermometer className="h-4 w-4 mr-2" />
              Bedingungen
            </TabsTrigger>
            <TabsTrigger value="actions" className="flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Aktionen
            </TabsTrigger>
          </TabsList>

          {/* Triggers Tab */}
          <TabsContent value="triggers">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {rule.triggers.map((trigger, index) => (
                    <div 
                      key={trigger.id} 
                      className="p-4 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {index + 1}
                          </Badge>
                          <h4 className="font-medium">Auslöser</h4>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTrigger(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Entfernen</span>
                        </Button>
                      </div>

                      <div className="mb-4">
                        <Label>Typ</Label>
                        <Select
                          value={trigger.type}
                          onValueChange={(value) => updateTrigger(index, { 
                            type: value as AutomationTrigger['type'] 
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Typ auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            {triggerTypeOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center">
                                  <option.icon className="h-4 w-4 mr-2" />
                                  {option.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {renderTriggerConfig(trigger, index)}
                    </div>
                  ))}

                  <Button 
                    variant="outline" 
                    onClick={addTrigger} 
                    className="w-full flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Auslöser hinzufügen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conditions Tab */}
          <TabsContent value="conditions">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {rule.conditions.length > 0 ? (
                    rule.conditions.map((condition, index) => (
                      <div 
                        key={condition.id} 
                        className="p-4 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {index + 1}
                            </Badge>
                            <h4 className="font-medium">Bedingung</h4>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCondition(index)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Entfernen</span>
                          </Button>
                        </div>

                        <div className="mb-4">
                          <Label>Typ</Label>
                          <Select
                            value={condition.type}
                            onValueChange={(value) => updateCondition(index, { 
                              type: value as AutomationCondition['type'] 
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Typ auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                              {conditionTypeOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center">
                                    <option.icon className="h-4 w-4 mr-2" />
                                    {option.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Condition-specific configuration would go here */}
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-6 border border-dashed rounded-md">
                      <p className="text-gray-500 mb-2">Keine Bedingungen festgelegt</p>
                      <p className="text-sm text-gray-400">Die Automatisierung wird ausgeführt, sobald ein Auslöser aktiviert wird.</p>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    onClick={addCondition} 
                    className="w-full flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Bedingung hinzufügen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {rule.actions.map((action, index) => (
                    <div 
                      key={action.id} 
                      className="p-4 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {index + 1}
                          </Badge>
                          <h4 className="font-medium">Aktion</h4>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAction(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Entfernen</span>
                        </Button>
                      </div>

                      <div className="mb-4">
                        <Label>Typ</Label>
                        <Select
                          value={action.type}
                          onValueChange={(value) => updateAction(index, { 
                            type: value as AutomationAction['type'] 
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Typ auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            {actionTypeOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center">
                                  <option.icon className="h-4 w-4 mr-2" />
                                  {option.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {renderActionConfig(action, index)}
                    </div>
                  ))}

                  <Button 
                    variant="outline" 
                    onClick={addAction} 
                    className="w-full flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Aktion hinzufügen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Abbrechen</Button>
        <Button onClick={handleSave} className="flex items-center">
          <Save className="h-4 w-4 mr-2" /> Speichern
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AutomationRuleEditor;
