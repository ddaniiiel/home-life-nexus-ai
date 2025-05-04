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
