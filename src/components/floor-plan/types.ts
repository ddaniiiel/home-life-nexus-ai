
export interface DeviceProps {
  id: number;
  name: string;
  type: 'light' | 'thermostat' | 'lock' | 'camera' | 'fan' | 'door';
  isOn: boolean;
  position: { x: number; y: number };
  room: string;
  value?: number; // For temperature or other values
}

export interface RoomDefinition {
  name: string;
  path: string;
  textPosition: { x: number; y: number };
  baseClass: string;
  hoverClass: string;
}
