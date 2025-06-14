
import React from 'react';
import { Lightbulb, ThermometerIcon, Video, Fan, DoorClosed } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DeviceProps } from './types';

type DeviceIconProps = Pick<DeviceProps, 'type' | 'isOn' | 'value'>;

const DeviceIcon = ({ type, isOn, value }: DeviceIconProps) => {
  switch (type) {
    case 'light':
      return <Lightbulb className={cn("h-5 w-5", isOn ? "text-yellow-300" : "text-gray-400")} />;
    case 'thermostat':
      return (
        <div className="relative flex items-center justify-center">
          <ThermometerIcon className={cn("h-5 w-5", isOn ? "text-red-400" : "text-gray-400")} />
          {value && (
            <span className={cn("absolute -bottom-5 text-xs font-medium px-1 rounded", isOn ? "text-red-400" : "text-gray-400")}>
              {value}°C
            </span>
          )}
        </div>
      );
    case 'door':
      return <DoorClosed className={cn("h-5 w-5", isOn ? "text-green-400" : "text-red-400")} />;
    case 'camera':
      return <Video className={cn("h-5 w-5", isOn ? "text-blue-400" : "text-gray-400")} />;
    case 'fan':
      return <Fan className={cn("h-5 w-5", isOn ? "text-cyan-400" : "text-gray-400", isOn && "animate-spin")} style={isOn ? { animationDuration: '3s' } : {}} />;
    default:
      return <Lightbulb className="h-5 w-5 text-gray-400" />;
  }
};

export default DeviceIcon;
