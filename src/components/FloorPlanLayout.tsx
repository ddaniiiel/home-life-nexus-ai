
import React, { useState } from 'react';
import { Lightbulb, ThermometerIcon, Lock, Video, Fan, DoorClosed } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DeviceProps {
  id: number;
  name: string;
  type: 'light' | 'thermostat' | 'lock' | 'camera' | 'fan' | 'door';
  isOn: boolean;
  position: { x: number; y: number };
  room: string;
  value?: number; // For temperature or other values
}

const FloorPlanLayout = () => {
  const [devices, setDevices] = useState<DeviceProps[]>([
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
  ]);

  const toggleDevice = (id: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  const getDeviceIcon = (type: string, isOn: boolean, value?: number) => {
    switch (type) {
      case 'light':
        return <Lightbulb className={cn("h-5 w-5", isOn ? "text-yellow-400" : "text-gray-400")} />;
      case 'thermostat':
        return (
          <div className="relative flex items-center justify-center">
            <ThermometerIcon className={cn("h-5 w-5", isOn ? "text-red-500" : "text-gray-400")} />
            {value && isOn && (
              <span className="absolute -bottom-5 text-xs font-medium bg-white bg-opacity-75 px-1 rounded text-red-500">
                {value}°C
              </span>
            )}
          </div>
        );
      case 'door':
        return <DoorClosed className={cn("h-5 w-5", isOn ? "text-green-500" : "text-red-500")} />;
      case 'camera':
        return <Video className={cn("h-5 w-5", isOn ? "text-blue-500" : "text-gray-400")} />;
      case 'fan':
        return <Fan className={cn("h-5 w-5", isOn ? "text-blue-400" : "text-gray-400", isOn && "animate-spin")} style={isOn ? { animationDuration: '3s' } : {}} />;
      default:
        return <Lightbulb className="h-5 w-5 text-gray-400" />;
    }
  };

  // Define rooms for the floor plan
  const rooms = [
    { name: 'Wohnzimmer', path: 'M10,30 L45,30 L45,70 L10,70 Z', style: 'fill:rgb(240,240,240);stroke:rgb(200,200,200)', devices: devices.filter(d => d.room === 'Wohnzimmer') },
    { name: 'Küche', path: 'M45,30 L90,30 L90,60 L45,60 Z', style: 'fill:rgb(240,240,240);stroke:rgb(200,200,200)', devices: devices.filter(d => d.room === 'Küche') },
    { name: 'Bad', path: 'M70,60 L90,60 L90,85 L70,85 Z', style: 'fill:rgb(220,242,255);stroke:rgb(200,200,200)', devices: devices.filter(d => d.room === 'Bad') },
    { name: 'Schlafzimmer', path: 'M10,70 L70,70 L70,85 L10,85 Z', style: 'fill:rgb(240,240,240);stroke:rgb(200,200,200)', devices: devices.filter(d => d.room === 'Schlafzimmer') },
    { name: 'Flur', path: 'M45,10 L55,10 L55,30 L45,30 Z', style: 'fill:rgb(245,245,245);stroke:rgb(200,200,200)', devices: devices.filter(d => d.room === 'Flur') },
    { name: 'Terrasse', path: 'M0,30 L10,30 L10,70 L0,70 Z', style: 'fill:rgb(200,230,200);stroke:rgb(180,180,180);stroke-dasharray:2,1', devices: devices.filter(d => d.room === 'Terrasse') },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Wohnungslayout</h2>
      <div className="relative w-full border rounded-lg overflow-hidden" style={{ paddingTop: '66.67%' }}> {/* 3:2 aspect ratio */}
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="rounded-md">
            {/* Grid lines for visual reference */}
            <g stroke="rgba(200,200,200,0.2)" strokeWidth="0.2">
              {Array.from({ length: 10 }).map((_, i) => (
                <React.Fragment key={i}>
                  <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
                  <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
                </React.Fragment>
              ))}
            </g>
            
            {/* Rooms */}
            {rooms.map((room, index) => (
              <g key={index}>
                <path
                  d={room.path}
                  style={{ fill: room.style.split(':')[1].split(';')[0], stroke: room.style.split(':')[2].split(';')[0] }}
                  className="hover:fill-blue-50 dark:hover:fill-blue-900/30 transition-colors duration-200"
                  strokeWidth={room.style.includes('stroke-dasharray') ? 0.5 : 0.8}
                  strokeDasharray={room.style.includes('stroke-dasharray') ? "2,1" : ""}
                >
                  <title>{room.name}</title>
                </path>
                <text
                  x={room.name === 'Terrasse' ? 5 : room.name === 'Flur' ? 50 : parseInt(room.path.split(' ')[1]) + 5}
                  y={room.name === 'Terrasse' ? 50 : room.name === 'Flur' ? 20 : parseInt(room.path.split(' ')[2]) + 5}
                  fontSize="3"
                  textAnchor={room.name === 'Terrasse' || room.name === 'Flur' ? 'middle' : 'start'}
                  fill="#888888"
                  className="pointer-events-none"
                >
                  {room.name}
                </text>
              </g>
            ))}
            
            {/* Front door */}
            <line x1="50" y1="10" x2="40" y2="10" stroke="brown" strokeWidth="1.5" />
            
            {/* Terrace door */}
            <line x1="10" y1="40" x2="10" y2="50" stroke="brown" strokeWidth="1.5" />
            
            {/* Windows */}
            <line x1="0" y1="40" x2="0" y2="60" stroke="lightblue" strokeWidth="1.5" />
            <line x1="25" y1="85" x2="45" y2="85" stroke="lightblue" strokeWidth="1.5" />
            <line x1="75" y1="85" x2="85" y2="85" stroke="lightblue" strokeWidth="1.5" />
            <line x1="90" y1="40" x2="90" y2="50" stroke="lightblue" strokeWidth="1.5" />
            
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
                          device.isOn 
                            ? device.type === 'light' ? "bg-yellow-100 dark:bg-yellow-900/30" 
                            : device.type === 'thermostat' ? "bg-red-100 dark:bg-red-900/30" 
                            : device.type === 'door' ? (device.isOn ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30")
                            : device.type === 'camera' ? "bg-blue-100 dark:bg-blue-900/30"
                            : device.type === 'fan' ? "bg-blue-100 dark:bg-blue-900/30"
                            : "bg-gray-200 dark:bg-gray-700"
                          : "bg-gray-200 dark:bg-gray-700"
                        )}
                        onClick={() => toggleDevice(device.id)}
                      >
                        {getDeviceIcon(device.type, device.isOn, device.value)}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-50">
                      <div className="text-center">
                        <p className="font-medium">{device.name}</p>
                        <p className="text-xs">{device.isOn ? 'Aktiv' : 'Inaktiv'}</p>
                        {device.value && <p className="text-xs">{device.value}°C</p>}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </foreignObject>
            ))}

            {/* Add a legend for device types */}
            <foreignObject x="1" y="90" width="98" height="9">
              <div className="flex items-center justify-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
                  <span>Licht</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>Thermostat</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>Türen</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>Kamera</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                  <span>Ventilator</span>
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
        {rooms.slice(0, 5).map(room => (
          <Button 
            key={room.name} 
            variant="outline" 
            className="text-sm"
            size="sm"
          >
            {room.name}
          </Button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 border rounded-lg">
          <div className="text-sm font-medium mb-1 flex items-center">
            <Lightbulb className="h-4 w-4 mr-1" />
            <span>Beleuchtung</span>
          </div>
          <p className="text-xl font-bold">
            {devices.filter(d => d.type === 'light' && d.isOn).length}/{devices.filter(d => d.type === 'light').length} <span className="text-sm font-normal text-gray-500">aktiv</span>
          </p>
        </div>
        
        <div className="p-3 border rounded-lg">
          <div className="text-sm font-medium mb-1 flex items-center">
            <ThermometerIcon className="h-4 w-4 mr-1" />
            <span>Durchschnittstemp.</span>
          </div>
          <p className="text-xl font-bold">
            {Math.round(devices.filter(d => d.type === 'thermostat' && d.value && d.isOn).reduce((sum, d) => sum + (d.value || 0), 0) / 
              devices.filter(d => d.type === 'thermostat' && d.value && d.isOn).length)}°C
          </p>
        </div>
        
        <div className="p-3 border rounded-lg">
          <div className="text-sm font-medium mb-1 flex items-center">
            <DoorClosed className="h-4 w-4 mr-1" />
            <span>Türen</span>
          </div>
          <p className="text-xl font-bold">
            {!devices.some(d => d.type === 'door' && !d.isOn) ? 
              <span className="text-green-500">Alle geschlossen</span> : 
              <span className="text-red-500">Einige geöffnet</span>
            }
          </p>
        </div>
        
        <div className="p-3 border rounded-lg">
          <div className="text-sm font-medium mb-1 flex items-center">
            <Video className="h-4 w-4 mr-1" />
            <span>Sicherheit</span>
          </div>
          <p className="text-xl font-bold">
            {devices.filter(d => d.type === 'camera' && d.isOn).length > 0 ? 
              <span className="text-green-500">Aktiv</span> : 
              <span className="text-red-500">Inaktiv</span>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanLayout;
