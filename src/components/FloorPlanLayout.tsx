
import React, { useState } from 'react';
import { Lightbulb, ThermometerIcon, Video, Fan, DoorClosed, Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const toggleDevice = (id: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  const getDeviceIcon = (type: string, isOn: boolean, value?: number) => {
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

  const roomDefinitions = [
    { name: 'Wohnzimmer', path: 'M10,30 L45,30 L45,70 L10,70 Z', textPosition: { x: 27.5, y: 52 }, baseClass: 'fill-gray-100/80 dark:fill-gray-800/80', hoverClass: 'fill-homepilot-accent/60 dark:fill-homepilot-primary/30' },
    { name: 'Küche', path: 'M45,30 L90,30 L90,60 L45,60 Z', textPosition: { x: 67.5, y: 47 }, baseClass: 'fill-gray-100/80 dark:fill-gray-800/80', hoverClass: 'fill-homepilot-accent/60 dark:fill-homepilot-primary/30' },
    { name: 'Bad', path: 'M70,60 L90,60 L90,85 L70,85 Z', textPosition: { x: 80, y: 74.5 }, baseClass: 'fill-blue-50/80 dark:fill-blue-900/40', hoverClass: 'fill-blue-100/90 dark:fill-blue-900/60' },
    { name: 'Schlafzimmer', path: 'M10,70 L70,70 L70,85 L10,85 Z', textPosition: { x: 40, y: 79.5 }, baseClass: 'fill-gray-100/80 dark:fill-gray-800/80', hoverClass: 'fill-homepilot-accent/60 dark:fill-homepilot-primary/30' },
    { name: 'Flur', path: 'M45,10 L55,10 L55,30 L45,30 Z', textPosition: { x: 50, y: 22 }, baseClass: 'fill-gray-200/80 dark:fill-gray-700/80', hoverClass: 'fill-gray-300/90 dark:fill-gray-600/90' },
    { name: 'Terrasse', path: 'M0,30 L10,30 L10,70 L0,70 Z', textPosition: { x: 5, y: 52 }, baseClass: 'fill-green-50/80 dark:fill-green-900/40', hoverClass: 'fill-green-100/90 dark:fill-green-900/60' },
  ];

  return (
    <div className={cn(
      "w-full transition-all duration-300 ease-in-out",
      isFullScreen 
        ? "fixed inset-0 z-50 bg-background p-4 sm:p-8 flex flex-col" 
        : "relative"
    )}>
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h2 className="text-2xl font-bold text-homepilot-secondary">Wohnungsgrundriss</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsFullScreen(!isFullScreen)} className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFullScreen ? "Ansicht verkleinern" : "Vollbildansicht"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className={cn("relative w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 shadow-inner", 
          isFullScreen ? "flex-grow" : "h-[350px] md:h-[500px] lg:h-[600px]")}>
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="rounded-md">
            <defs>
              <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                <feOffset dx="0" dy="1" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.2"/>
                </feComponentTransfer>
                <feMerge> 
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>
            
            {/* Grid lines for visual reference */}
            <g stroke="rgba(200,200,200,0.1)" strokeWidth="0.2">
              {Array.from({ length: 10 }).map((_, i) => (
                <React.Fragment key={i}>
                  <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
                  <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
                </React.Fragment>
              ))}
            </g>
            
            {/* Rooms */}
            {roomDefinitions.map((room, index) => (
              <g key={index} 
                 onMouseEnter={() => setHoveredRoom(room.name)} 
                 onMouseLeave={() => setHoveredRoom(null)}
                 style={{ filter: 'url(#drop-shadow)' }}>
                <path
                  d={room.path}
                  className={cn(
                    "stroke-gray-400/50 dark:stroke-gray-500/50 transition-all duration-300",
                    hoveredRoom === room.name ? room.hoverClass : room.baseClass
                  )}
                  strokeWidth={hoveredRoom === room.name ? 1.2 : 0.8}
                  strokeDasharray={room.name === 'Terrasse' ? "2,1" : ""}
                />
                <text
                  x={room.textPosition.x}
                  y={room.textPosition.y}
                  fontSize={isFullScreen ? "3" : "4"}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#555"
                  className="pointer-events-none font-semibold dark:fill-gray-300 transition-all"
                >
                  {room.name}
                </text>
              </g>
            ))}
            
            {/* Front door */}
            <line x1="50" y1="10" x2="40" y2="10" stroke="brown" strokeWidth="1.5" />
            <line x1="10" y1="40" x2="10" y2="50" stroke="brown" strokeWidth="1.5" />
            <line x1="0" y1="40" x2="0" y2="60" stroke="lightblue" strokeWidth="1.5" />
            <line x1="25" y1="85" x2="45" y2="85" stroke="lightblue" strokeWidth="1.5" />
            <line x1="75" y1="85" x2="85" y2="85" stroke="lightblue" strokeWidth="1.5" />
            <line x1="90" y1="40" x2="90" y2="50" stroke="lightblue" strokeWidth="1.5" />
            
            {/* Devices */}
            {devices.map((device) => (
              <foreignObject
                key={device.id}
                x={`${device.position.x - 3.5}%`}
                y={`${device.position.y - 3.5}%`}
                width="7%"
                height="7%"
                className={cn(
                  "transition-all duration-300 hover:scale-110",
                  hoveredRoom && device.room !== hoveredRoom && "opacity-30 blur-sm",
                )}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "w-full h-full rounded-full p-0 flex items-center justify-center",
                          "border border-white/20 shadow-lg",
                          "bg-black/10 dark:bg-white/10 backdrop-blur-sm",
                          device.isOn ? "opacity-100" : "opacity-60"
                        )}
                        onClick={() => toggleDevice(device.id)}
                      >
                        {getDeviceIcon(device.type, device.isOn, device.value)}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-50 bg-black/70 text-white border-0">
                      <div className="text-center">
                        <p className="font-medium">{device.name}</p>
                        <p className="text-xs">{device.isOn ? 'Aktiv' : 'Inaktiv'}</p>
                        {device.type === 'thermostat' && device.value && <p className="text-xs">{device.value}°C</p>}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </foreignObject>
            ))}
          </svg>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Beleuchtung</CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">
                      {devices.filter(d => d.type === 'light' && d.isOn).length}/{devices.filter(d => d.type === 'light').length}
                  </div>
                  <p className="text-xs text-muted-foreground">aktiv</p>
              </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Durchschnittstemp.</CardTitle>
                  <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(devices.filter(d => d.type === 'thermostat' && d.value && d.isOn).reduce((sum, d) => sum + (d.value || 0), 0) / 
                      (devices.filter(d => d.type === 'thermostat' && d.value && d.isOn).length || 1))}°C
                  </div>
                  <p className="text-xs text-muted-foreground">in aktiven Räumen</p>
              </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Türen</CardTitle>
                  <DoorClosed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {!devices.some(d => d.type === 'door' && !d.isOn) ? 
                    <span className="text-green-500">Sicher</span> : 
                    <span className="text-red-500">Offen</span>
                  }
                </div>
                <p className="text-xs text-muted-foreground">Status aller Türen</p>
              </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sicherheit</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {devices.filter(d => d.type === 'camera' && d.isOn).length > 0 ? 
                    <span className="text-green-500">Aktiv</span> : 
                    <span className="text-red-500">Inaktiv</span>
                  }
                </div>
                <p className="text-xs text-muted-foreground">Kameraüberwachung</p>
              </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default FloorPlanLayout;
