
import React, { useState } from 'react';
import { Lightbulb, Home, Thermometer, Tv, Speaker, DoorClosed, Fan } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Widget from './Widget';

const SmartHomeWidget = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Wohnzimmer Licht', type: 'light', isOn: false, room: 'Wohnzimmer' },
    { id: 2, name: 'Küche Licht', type: 'light', isOn: true, room: 'Küche' },
    { id: 3, name: 'Thermostat', type: 'thermostat', isOn: true, temp: 21, room: 'Wohnzimmer' },
    { id: 4, name: 'TV', type: 'tv', isOn: false, room: 'Wohnzimmer' },
    { id: 5, name: 'Smart Speaker', type: 'audio', isOn: true, room: 'Küche' },
  ]);

  const toggleDevice = (id: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  // Icon Komponente basierend auf Gerätetyp
  const DeviceIcon = ({ type, isOn }: { type: string, isOn: boolean }) => {
    switch (type) {
      case 'light':
        return <Lightbulb className={cn("h-5 w-5", isOn ? "text-yellow-400" : "text-gray-400")} />;
      case 'thermostat':
        return <Thermometer className="h-5 w-5 text-homepilot-accent" />;
      case 'tv':
        return <Tv className={cn("h-5 w-5", isOn ? "text-blue-500" : "text-gray-400")} />;
      case 'audio':
        return <Speaker className={cn("h-5 w-5", isOn ? "text-purple-500" : "text-gray-400")} />;
      case 'door':
        return <DoorClosed className={cn("h-5 w-5", isOn ? "text-green-500" : "text-gray-400")} />;
      case 'fan':
        return <Fan className={cn("h-5 w-5", isOn ? "text-blue-400" : "text-gray-400")} />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  // Geräte nach Raum gruppieren
  const devicesByRoom: Record<string, typeof devices> = devices.reduce((acc: Record<string, typeof devices>, device) => {
    if (!acc[device.room]) {
      acc[device.room] = [];
    }
    acc[device.room].push(device);
    return acc;
  }, {});

  return (
    <Widget title="Smart Home" icon={<Home className="h-5 w-5" />}>
      <div className="space-y-4">
        {Object.entries(devicesByRoom).map(([room, roomDevices]) => (
          <div key={room} className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-medium">{room}</Badge>
              <span className="text-xs text-gray-500">{roomDevices.length} Geräte</span>
            </div>
            
            {roomDevices.map((device) => (
              <div 
                key={device.id} 
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mr-3">
                    <DeviceIcon type={device.type} isOn={device.isOn} />
                  </div>
                  <span className="text-sm font-medium">{device.name}</span>
                </div>
                <div className="flex items-center">
                  {device.type === 'thermostat' && device.isOn && (
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 mr-3">{device.temp}°C</span>
                  )}
                  <Switch 
                    checked={device.isOn} 
                    onCheckedChange={() => toggleDevice(device.id)}
                    className="data-[state=checked]:bg-homepilot-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
        
        <a 
          href="/smart-home" 
          className="text-xs text-homepilot-primary hover:underline mt-4 flex items-center justify-center py-2 border-t pt-3 font-medium"
        >
          Alle Geräte anzeigen →
        </a>
      </div>
    </Widget>
  );
};

export default SmartHomeWidget;
