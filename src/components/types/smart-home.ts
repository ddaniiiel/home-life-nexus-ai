
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
}

export interface QuickScene {
  id: number;
  name: string;
  icon: LucideIcon;
  devices: number;
}
