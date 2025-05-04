
import React, { useState } from 'react';
import { Settings, Zap } from 'lucide-react';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import AutomationList from './AutomationList';
import AutomationRuleEditor from './AutomationRuleEditor';
import { Device, Automation } from '../types/smart-home';

// Sample data for demo purposes
const sampleDevices: Device[] = [
  { 
    id: 1, 
    name: 'Wohnzimmer Licht', 
    type: 'light', 
    isOn: false, 
    room: 'Wohnzimmer',
    icon: Zap,
    color: 'yellow',
    brightness: 80
  },
  { 
    id: 2, 
    name: 'Schlafzimmer Licht', 
    type: 'light', 
    isOn: false, 
    room: 'Schlafzimmer',
    icon: Zap,
    color: 'yellow',
    brightness: 60
  },
  { 
    id: 3, 
    name: 'Wohnzimmer Thermostat', 
    type: 'thermostat', 
    isOn: true, 
    room: 'Wohnzimmer',
    icon: Settings,
    color: 'blue',
    temp: 21
  }
];

const sampleAutomations: Automation[] = [
  {
    id: 1,
    name: 'Abendlicht beim Sonnenuntergang',
    description: 'Schaltet das Wohnzimmerlicht bei Sonnenuntergang ein und dimmt es auf 70%',
    isEnabled: true,
    triggers: [
      {
        id: 1,
        type: 'time',
        timeSpec: '0 20 * * *'
      }
    ],
    conditions: [],
    actions: [
      {
        id: 1,
        type: 'device',
        deviceId: 1,
        property: 'isOn',
        value: true
      },
      {
        id: 2,
        type: 'device',
        deviceId: 1,
        property: 'brightness',
        value: 70
      }
    ],
    lastTriggered: '2025-05-03T20:00:00Z',
    created: '2025-05-01T10:00:00Z',
    modified: '2025-05-01T10:00:00Z'
  },
  {
    id: 2,
    name: 'Heizung morgens einschalten',
    description: 'Schaltet die Heizung jeden Morgen um 6 Uhr ein',
    isEnabled: true,
    triggers: [
      {
        id: 1,
        type: 'time',
        timeSpec: '0 6 * * *'
      }
    ],
    conditions: [],
    actions: [
      {
        id: 1,
        type: 'device',
        deviceId: 3,
        property: 'isOn',
        value: true
      },
      {
        id: 2,
        type: 'device',
        deviceId: 3,
        property: 'temp',
        value: 22
      }
    ],
    created: '2025-05-01T09:30:00Z',
    modified: '2025-05-01T09:30:00Z'
  }
];

const rooms = ['Wohnzimmer', 'Schlafzimmer', 'Küche', 'Bad'];

const AutomationsPage: React.FC = () => {
  const [automations, setAutomations] = useState<Automation[]>(sampleAutomations);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAutomation, setCurrentAutomation] = useState<Automation | undefined>();

  const handleCreateAutomation = () => {
    setCurrentAutomation(undefined);
    setIsEditMode(true);
  };

  const handleEditAutomation = (automation: Automation) => {
    setCurrentAutomation(automation);
    setIsEditMode(true);
  };

  const handleSaveAutomation = (automation: Automation) => {
    if (currentAutomation) {
      // Editing existing automation
      setAutomations(automations.map(a => 
        a.id === automation.id ? automation : a
      ));
    } else {
      // Creating new automation
      setAutomations([...automations, automation]);
    }
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleDeleteAutomation = (id: number) => {
    setAutomations(automations.filter(a => a.id !== id));
  };

  const handleToggleAutomation = (id: number, isEnabled: boolean) => {
    setAutomations(automations.map(a => 
      a.id === id ? { ...a, isEnabled } : a
    ));
  };

  const breadcrumbItems = [
    { label: 'Smart Home', link: '/smart-home' },
    { label: 'Automatisierungen', link: '/smart-home/automation' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNavigation items={breadcrumbItems} className="mb-6" />
      
      {isEditMode ? (
        <AutomationRuleEditor
          automation={currentAutomation}
          devices={sampleDevices}
          rooms={rooms}
          onSave={handleSaveAutomation}
          onCancel={handleCancelEdit}
        />
      ) : (
        <AutomationList
          automations={automations}
          onCreateAutomation={handleCreateAutomation}
          onEditAutomation={handleEditAutomation}
          onDeleteAutomation={handleDeleteAutomation}
          onToggleAutomation={handleToggleAutomation}
        />
      )}
    </div>
  );
};

export default AutomationsPage;
