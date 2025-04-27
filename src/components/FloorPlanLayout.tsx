
import React, { useState } from 'react';
import { Lightbulb, ThermometerIcon, Lock, Video, Fan } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DeviceProps {
  id: number;
  name: string;
  type: 'light' | 'thermostat' | 'lock' | 'camera' | 'fan';
  isOn: boolean;
  position: { x: number; y: number };
  room: string;
}

const FloorPlanLayout = () => {
  const [devices, setDevices] = useState<DeviceProps[]>([
    { id: 1, name: 'Wohnzimmer Licht', type: 'light', isOn: true, position: { x: 25, y: 35 }, room: 'Wohnzimmer' },
    { id: 2, name: 'Küche Licht', type: 'light', isOn: false, position: { x: 70, y: 30 }, room: 'Küche' },
    { id: 3, name: 'Bad Licht', type: 'light', isOn: false, position: { x: 80, y: 70 }, room: 'Bad' },
    { id: 4, name: 'Schlafzimmer Licht', type: 'light', isOn: false, position: { x: 25, y: 75 }, room: 'Schlafzimmer' },
    { id: 5, name: 'Wohnzimmer Thermostat', type: 'thermostat', isOn: true, position: { x: 40, y: 40 }, room: 'Wohnzimmer' },
    { id: 6, name: 'Eingangstür', type: 'lock', isOn: true, position: { x: 50, y: 10 }, room: 'Eingang' },
    { id: 7, name: 'Überwachungskamera', type: 'camera', isOn: true, position: { x: 55, y: 5 }, room: 'Außen' },
    { id: 8, name: 'Schlafzimmer Ventilator', type: 'fan', isOn: false, position: { x: 30, y: 65 }, room: 'Schlafzimmer' },
  ]);

  const toggleDevice = (id: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  const getDeviceIcon = (type: string, isOn: boolean) => {
    switch (type) {
      case 'light':
        return <Lightbulb className={cn("h-5 w-5", isOn ? "text-yellow-400" : "text-gray-400")} />;
      case 'thermostat':
        return <ThermometerIcon className={cn("h-5 w-5", isOn ? "text-red-500" : "text-gray-400")} />;
      case 'lock':
        return <Lock className={cn("h-5 w-5", isOn ? "text-green-500" : "text-red-500")} />;
      case 'camera':
        return <Video className={cn("h-5 w-5", isOn ? "text-blue-500" : "text-gray-400")} />;
      case 'fan':
        return <Fan className={cn("h-5 w-5", isOn ? "text-blue-400" : "text-gray-400")} />;
      default:
        return <Lightbulb className="h-5 w-5 text-gray-400" />;
    }
  };

  const rooms = [
    { name: 'Wohnzimmer', path: 'M10,10 L45,10 L45,50 L10,50 Z', style: 'fill:rgb(240,240,240);stroke:rgb(200,200,200)' },
    { name: 'Küche', path: 'M45,10 L90,10 L90,50 L45,50 Z', style: 'fill:rgb(240,240,240);stroke:rgb(200,200,200)' },
    { name: 'Bad', path: 'M70,50 L90,50 L90,90 L70,90 Z', style: 'fill:rgb(220,242,255);stroke:rgb(200,200,200)' },
    { name: 'Schlafzimmer', path: 'M10,50 L70,50 L70,90 L10,90 Z', style: 'fill:rgb(240,240,240);stroke:rgb(200,200,200)' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Wohnungslayout</h2>
      <div className="relative w-full" style={{ paddingTop: '66.67%' }}> {/* 3:2 aspect ratio */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="border rounded-md">
            {/* Rooms */}
            {rooms.map((room, index) => (
              <path
                key={index}
                d={room.path}
                style={{ fill: room.style.split(':')[1].split(';')[0], stroke: room.style.split(':')[2] }}
                className="hover:fill-gray-200 transition-colors duration-200"
              >
                <title>{room.name}</title>
              </path>
            ))}
            
            {/* Door */}
            <line x1="50" y1="10" x2="60" y2="10" stroke="brown" strokeWidth="2" />
            
            {/* Devices */}
            {devices.map((device) => (
              <foreignObject
                key={device.id}
                x={`${device.position.x - 3}%`}
                y={`${device.position.y - 3}%`}
                width="6%"
                height="6%"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "w-full h-full rounded-full p-0",
                          device.isOn ? "bg-homepilot-primary/20" : "bg-gray-200"
                        )}
                        onClick={() => toggleDevice(device.id)}
                      >
                        {getDeviceIcon(device.type, device.isOn)}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{device.name}</p>
                      <p className="text-xs opacity-70">{device.isOn ? 'Ein' : 'Aus'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </foreignObject>
            ))}
          </svg>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-medium mb-2">Legende</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
            </div>
            <span className="text-sm">Licht</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2 flex items-center justify-center">
              <ThermometerIcon className="h-4 w-4 text-red-500" />
            </div>
            <span className="text-sm">Thermostat</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2 flex items-center justify-center">
              <Lock className="h-4 w-4 text-green-500" />
            </div>
            <span className="text-sm">Schloss</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2 flex items-center justify-center">
              <Video className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-sm">Kamera</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2 flex items-center justify-center">
              <Fan className="h-4 w-4 text-blue-400" />
            </div>
            <span className="text-sm">Ventilator</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanLayout;
