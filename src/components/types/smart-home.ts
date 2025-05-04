
import { LucideIcon } from 'lucide-react';

export interface Device {
  id: number;
  name: string;
  type: string;
  isOn: boolean;
  room: string;
  icon: LucideIcon;
  color: string;
  brightness?: number;
  temp?: number;
  volume?: number;
  speed?: number;
  batteryLevel?: number;
  signalStrength?: number;
  lastActivity?: string;
  firmware?: string;
  manufacturer?: string;
  model?: string;
}

export interface QuickScene {
  id: number;
  name: string;
  icon: LucideIcon;
  devices: number;
  isActive?: boolean;
  timeOfDay?: 'morning' | 'day' | 'evening' | 'night';
  lastActivated?: string;
  deviceTypes?: string[]; // Added this property
}

export interface Room {
  id: number;
  name: string;
  devices: number;
  temperature?: number;
  humidity?: number;
  occupancy?: boolean;
  lightLevel?: number;
}

export interface DeviceAction {
  icon: LucideIcon;
  label: string;
  action: () => void;
  isDisabled?: boolean;
}

export interface DeviceState {
  value: number | boolean | string;
  label: string;
  unit?: string;
  icon?: LucideIcon;
  color?: string;
}

export interface HomeAssistantEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface SmartHomeStats {
  totalDevices: number;
  onlineDevices: number;
  activeScenes: number;
  energyConsumption: {
    current: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    percentage: number;
  };
}

// New interfaces for automation
export interface Automation {
  id: number;
  name: string;
  description?: string;
  isEnabled: boolean;
  triggers: AutomationTrigger[];
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  lastTriggered?: string;
  created: string;
  modified: string;
}

export interface AutomationTrigger {
  id: number;
  type: 'device' | 'time' | 'location' | 'sensor' | 'scene' | 'manual';
  deviceId?: number;
  sceneId?: number;
  sensorId?: number;
  property?: string;
  operator?: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'changes';
  value?: any;
  timeSpec?: string; // cron-like specification for time triggers
  locationEvent?: 'enter' | 'leave';
  locationZone?: string;
}

export interface AutomationCondition {
  id: number;
  type: 'device' | 'time' | 'location' | 'weather' | 'presence';
  deviceId?: number;
  property?: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'between';
  value: any;
  secondValue?: any; // For "between" operator
  timeRange?: { start: string; end: string }; // For time conditions
  weekdays?: number[]; // 0 = Sunday, 1 = Monday, etc.
  locationPresence?: 'anyone' | 'everyone' | 'no_one';
  locationUsers?: number[];
}

export interface AutomationAction {
  id: number;
  type: 'device' | 'scene' | 'notification' | 'delay' | 'service';
  deviceId?: number;
  sceneId?: number;
  property?: string;
  value?: any;
  notification?: {
    title: string;
    body: string;
    priority: 'normal' | 'high' | 'urgent';
    recipients?: number[]; // User IDs
  };
  delaySeconds?: number;
  service?: {
    name: string;
    data?: Record<string, any>;
  };
}

export type AutomationTriggerType = AutomationTrigger['type'];
export type AutomationConditionType = AutomationCondition['type'];
export type AutomationActionType = AutomationAction['type'];

