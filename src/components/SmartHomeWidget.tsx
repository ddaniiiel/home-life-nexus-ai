
import React, { useState } from 'react';
import { Lightbulb, Home, Thermometer } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import Widget from './Widget';

const SmartHomeWidget = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Wohnzimmer Licht', type: 'light', isOn: false },
    { id: 2, name: 'Küche Licht', type: 'light', isOn: true },
    { id: 3, name: 'Thermostat', type: 'thermostat', isOn: true, temp: 21 },
  ]);

  const toggleDevice = (id: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  return (
    <Widget title="Smart Home" icon={<Home className="h-5 w-5" />}>
      <div className="space-y-3">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between py-1">
            <div className="flex items-center">
              {device.type === 'light' ? (
                <Lightbulb className={cn("h-4 w-4 mr-2", device.isOn ? "text-yellow-400" : "text-gray-400")} />
              ) : (
                <Thermometer className="h-4 w-4 mr-2 text-homepilot-accent" />
              )}
              <span className="text-sm">{device.name}</span>
            </div>
            <div className="flex items-center">
              {device.type === 'thermostat' && device.isOn && (
                <span className="text-sm text-gray-600 dark:text-gray-300 mr-3">{device.temp}°C</span>
              )}
              <Switch 
                checked={device.isOn} 
                onCheckedChange={() => toggleDevice(device.id)}
              />
            </div>
          </div>
        ))}
        <a href="#" className="text-xs text-homepilot-primary hover:underline mt-2 block">Alle Geräte anzeigen →</a>
      </div>
    </Widget>
  );
};

export default SmartHomeWidget;
