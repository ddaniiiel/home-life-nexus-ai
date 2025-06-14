
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DeviceProps } from './types';
import { roomDefinitions } from './data';
import DeviceIcon from './DeviceIcon';

interface FloorPlanSVGProps {
  devices: DeviceProps[];
  hoveredRoom: string | null;
  isFullScreen: boolean;
  onDeviceToggle: (id: number) => void;
  onRoomHover: (roomName: string | null) => void;
}

const FloorPlanSVG = ({ 
  devices, 
  hoveredRoom, 
  isFullScreen, 
  onDeviceToggle, 
  onRoomHover 
}: FloorPlanSVGProps) => {
  return (
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
        
        <g stroke="rgba(200,200,200,0.1)" strokeWidth="0.2">
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={i}>
              <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
              <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
            </React.Fragment>
          ))}
        </g>
        
        {roomDefinitions.map((room, index) => (
          <g key={index} 
             onMouseEnter={() => onRoomHover(room.name)} 
             onMouseLeave={() => onRoomHover(null)}
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
        
        <line x1="50" y1="10" x2="40" y2="10" stroke="brown" strokeWidth="1.5" />
        <line x1="10" y1="40" x2="10" y2="50" stroke="brown" strokeWidth="1.5" />
        <line x1="0" y1="40" x2="0" y2="60" stroke="lightblue" strokeWidth="1.5" />
        <line x1="25" y1="85" x2="45" y2="85" stroke="lightblue" strokeWidth="1.5" />
        <line x1="75" y1="85" x2="85" y2="85" stroke="lightblue" strokeWidth="1.5" />
        <line x1="90" y1="40" x2="90" y2="50" stroke="lightblue" strokeWidth="1.5" />
        
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
                    onClick={() => onDeviceToggle(device.id)}
                  >
                    <DeviceIcon type={device.type} isOn={device.isOn} value={device.value} />
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
  );
};

export default FloorPlanSVG;
