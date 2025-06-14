
import { DeviceProps, RoomDefinition } from './types';

export const initialDevices: DeviceProps[] = [
  { id: 1, name: 'Wohnzimmer Licht', type: 'light', isOn: true, position: { x: 25, y: 35 }, room: 'Wohnzimmer' },
  { id: 2, name: 'Küche Licht', type: 'light', isOn: false, position: { x: 70, y: 30 }, room: 'Küche' },
  { id: 3, name: 'Bad Licht', type: 'light', isOn: false, position: { x: 80, y: 70 }, room: 'Bad' },
  { id: 4, name: 'Schlafzimmer Licht', type: 'light', isOn: false, position: { x: 25, y: 75 }, room: 'Schlafzimmer' },
  { id: 5, name: 'Wohnzimmer Thermostat', type: 'thermostat', isOn: true, position: { x: 40, y: 40 }, room: 'Wohnzimmer', value: 21 },
  { id: 6, name: 'Schlafzimmer Thermostat', type: 'thermostat', isOn: true, position: { x: 30, y: 85 }, room: 'Schlafzimmer', value: 19 },
  { id: 7, name: 'Eingangstür', type: 'door', isOn: true, position: { x: 50, y: 10 }, room: 'Eingang' },
  { id: 8, name: 'Überwachungskamera', type: 'camera', isOn: true, position: { x: 55, y: 5 }, room: 'Außen' },
  { id: 9, name: 'Schlafzimmer Ventilator', type: 'fan', isOn: false, position: { x: 30, y: 65 }, room: 'Schlafzimmer' },
  { id: 10, name: 'Küche Thermostat', type: 'thermostat', isOn: true, position: { x: 80, y: 40 }, room: 'Küche', value: 22 },
  { id: 11, name: 'Terrassentür', type: 'door', isOn: false, position: { x: 15, y: 40 }, room: 'Terrasse' },
];

export const roomDefinitions: RoomDefinition[] = [
  { name: 'Wohnzimmer', path: 'M10,30 L45,30 L45,70 L10,70 Z', textPosition: { x: 27.5, y: 52 }, baseClass: 'fill-gray-100/80 dark:fill-gray-800/80', hoverClass: 'fill-homepilot-accent/60 dark:fill-homepilot-primary/30' },
  { name: 'Küche', path: 'M45,30 L90,30 L90,60 L45,60 Z', textPosition: { x: 67.5, y: 47 }, baseClass: 'fill-gray-100/80 dark:fill-gray-800/80', hoverClass: 'fill-homepilot-accent/60 dark:fill-homepilot-primary/30' },
  { name: 'Bad', path: 'M70,60 L90,60 L90,85 L70,85 Z', textPosition: { x: 80, y: 74.5 }, baseClass: 'fill-blue-50/80 dark:fill-blue-900/40', hoverClass: 'fill-blue-100/90 dark:fill-blue-900/60' },
  { name: 'Schlafzimmer', path: 'M10,70 L70,70 L70,85 L10,85 Z', textPosition: { x: 40, y: 79.5 }, baseClass: 'fill-gray-100/80 dark:fill-gray-800/80', hoverClass: 'fill-homepilot-accent/60 dark:fill-homepilot-primary/30' },
  { name: 'Flur', path: 'M45,10 L55,10 L55,30 L45,30 Z', textPosition: { x: 50, y: 22 }, baseClass: 'fill-gray-200/80 dark:fill-gray-700/80', hoverClass: 'fill-gray-300/90 dark:fill-gray-600/90' },
  { name: 'Terrasse', path: 'M0,30 L10,30 L10,70 L0,70 Z', textPosition: { x: 5, y: 52 }, baseClass: 'fill-green-50/80 dark:fill-green-900/40', hoverClass: 'fill-green-100/90 dark:fill-green-900/60' },
];
