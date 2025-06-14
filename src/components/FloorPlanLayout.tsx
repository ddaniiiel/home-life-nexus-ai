
import React, { useState } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { initialDevices } from './floor-plan/data';
import { DeviceProps } from './floor-plan/types';
import FloorPlanSVG from './floor-plan/FloorPlanSVG';
import FloorPlanSummary from './floor-plan/FloorPlanSummary';

const FloorPlanLayout = () => {
  const [devices, setDevices] = useState<DeviceProps[]>(initialDevices);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const toggleDevice = (id: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

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
        <FloorPlanSVG
          devices={devices}
          hoveredRoom={hoveredRoom}
          isFullScreen={isFullScreen}
          onDeviceToggle={toggleDevice}
          onRoomHover={setHoveredRoom}
        />
      </div>
      
      <FloorPlanSummary devices={devices} />
    </div>
  );
};

export default FloorPlanLayout;
