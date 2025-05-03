
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { cn } from "@/lib/utils";
import { Slider } from '@/components/ui/slider';
import { Device } from './types/smart-home';

interface DeviceItemProps {
  device: Device;
  toggleDevice: (id: number) => void;
  adjustBrightness?: (id: number, value: number[]) => void;
  adjustTemperature?: (id: number, value: number[]) => void;
}

const DeviceIcon = ({ device }: { device: Device }) => {
  const Icon = device.icon;
  const isOn = device.isOn;
  
  let colorClass = 'text-gray-400';
  if (isOn) {
    switch (device.color) {
      case 'yellow':
        colorClass = 'text-homepilot-primary';
        break;
      case 'blue':
        colorClass = 'text-blue-500';
        break;
      case 'green':
        colorClass = 'text-homepilot-secondary';
        break;
      default:
        colorClass = 'text-homepilot-primary';
    }
  }
  
  return <Icon className={cn("h-5 w-5", colorClass)} />;
};

export const SmartHomeWidgetItem = ({
  device,
  toggleDevice,
  adjustBrightness,
  adjustTemperature
}: DeviceItemProps) => {
  
  const renderDeviceAction = () => {
    switch (device.type) {
      case 'light':
        return (
          <div className="flex flex-col items-end">
            {device.isOn && device.brightness !== undefined && (
              <div className="w-28 mb-2">
                <Slider
                  value={[device.brightness]} 
                  min={10}
                  max={100}
                  step={10}
                  className="mb-1"
                  onValueChange={(value) => adjustBrightness && adjustBrightness(device.id, value)}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Dunkel</span>
                  <span>{device.brightness}%</span>
                  <span>Hell</span>
                </div>
              </div>
            )}
            <Switch 
              checked={device.isOn} 
              onCheckedChange={() => toggleDevice(device.id)}
              className="data-[state=checked]:bg-homepilot-primary"
            />
          </div>
        );
      case 'thermostat':
        return (
          <div className="flex flex-col items-end">
            {device.isOn && device.temp !== undefined && (
              <div className="w-28 mb-2">
                <Slider
                  value={[device.temp]} 
                  min={16}
                  max={28}
                  step={0.5}
                  className="mb-1"
                  onValueChange={(value) => adjustTemperature && adjustTemperature(device.id, value)}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Kalt</span>
                  <span>{device.temp}°C</span>
                  <span>Warm</span>
                </div>
              </div>
            )}
            <Switch 
              checked={device.isOn} 
              onCheckedChange={() => toggleDevice(device.id)}
              className="data-[state=checked]:bg-homepilot-primary"
            />
          </div>
        );
      default:
        return (
          <Switch 
            checked={device.isOn} 
            onCheckedChange={() => toggleDevice(device.id)}
            className="data-[state=checked]:bg-homepilot-primary"
          />
        );
    }
  };
  
  return (
    <div 
      key={device.id} 
      className={cn(
        "flex items-center justify-between py-3 px-4 rounded-lg transition-colors",
        device.isOn 
          ? "bg-homepilot-accent/10 border border-homepilot-primary/20 shadow-sm" 
          : "border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
      )}
    >
      <div className="flex items-center">
        <div className={cn(
          "w-9 h-9 flex items-center justify-center rounded-full mr-3",
          device.isOn 
            ? device.color === 'yellow' ? 'bg-homepilot-accent dark:bg-homepilot-primary/30' 
            : device.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30'
            : device.color === 'green' ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-gray-100 dark:bg-gray-800'
            : 'bg-gray-100 dark:bg-gray-800'
        )}>
          <DeviceIcon device={device} />
        </div>
        <div>
          <span className="text-sm font-medium">{device.name}</span>
          <div className="text-xs text-gray-500">
            {device.isOn ? 'Eingeschaltet' : 'Ausgeschaltet'}
          </div>
        </div>
      </div>
      <div>
        {renderDeviceAction()}
      </div>
    </div>
  );
};
