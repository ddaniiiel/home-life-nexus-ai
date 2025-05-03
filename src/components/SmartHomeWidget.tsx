
import React, { useState, lazy, Suspense } from 'react';
import { Lightbulb, Home, Thermometer, Tv, BatteryMedium, Sunrise, Sunset } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from '@/components/ui/badge';
import Widget from './Widget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SmartHomeWidgetItem } from './SmartHomeWidgetItem';
import { Device, QuickScene } from './types/smart-home';

// Import these components only when needed
const SceneItem = lazy(() => import('./smart-home/SceneItem'));

const SmartHomeWidget = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'Wohnzimmer Licht', type: 'light', isOn: false, brightness: 80, room: 'Wohnzimmer', icon: Lightbulb, color: 'yellow' },
    { id: 2, name: 'Küche Licht', type: 'light', isOn: true, brightness: 70, room: 'Küche', icon: Lightbulb, color: 'yellow' },
    { id: 3, name: 'Thermostat', type: 'thermostat', isOn: true, temp: 21, room: 'Wohnzimmer', icon: Thermometer, color: 'blue' },
    { id: 4, name: 'TV', type: 'tv', isOn: false, room: 'Wohnzimmer', icon: Tv, color: 'blue' }
  ]);
  
  const [activeTab, setActiveTab] = useState<string>('all');
  const [quickScenes] = useState<QuickScene[]>([
    { id: 1, name: 'Guten Morgen', icon: Sunrise, devices: 4 },
    { id: 2, name: 'Gute Nacht', icon: Sunset, devices: 6 }
  ]);

  const toggleDevice = (id: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };
  
  const adjustBrightness = (id: number, value: number[]) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, brightness: value[0] } : device
    ));
  };
  
  const adjustTemperature = (id: number, value: number[]) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, temp: value[0] } : device
    ));
  };
  
  // Geräte nach Raum gruppieren
  const devicesByRoom = devices.reduce<Record<string, Device[]>>((acc, device) => {
    if (!acc[device.room]) {
      acc[device.room] = [];
    }
    acc[device.room].push(device);
    return acc;
  }, {});
  
  // Alle Räume für Tabs
  const rooms = Object.keys(devicesByRoom);

  // Renderlogik für Tabs mit Räumen
  const renderRoomContent = (roomName: string) => {
    const roomDevices = devicesByRoom[roomName] || [];
    
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="font-medium bg-homepilot-accent/30 text-homepilot-secondary border-homepilot-primary/20">{roomName}</Badge>
          <span className="text-xs text-gray-500">{roomDevices.length} Geräte</span>
        </div>
        
        {roomDevices.map((device) => (
          <SmartHomeWidgetItem
            key={device.id}
            device={device}
            toggleDevice={toggleDevice}
            adjustBrightness={adjustBrightness}
            adjustTemperature={adjustTemperature}
          />
        ))}
      </div>
    );
  };

  return (
    <Widget 
      title="Smart Home" 
      icon={<Home className="h-5 w-5" />}
      description="Steuere deine smarten Geräte zuhause"
      className="border-homepilot-primary/20"
    >
      <div className="space-y-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-3 bg-homepilot-accent/20">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-homepilot-primary data-[state=active]:text-white">Alle</TabsTrigger>
            <TabsTrigger value="scenes" className="flex-1 data-[state=active]:bg-homepilot-primary data-[state=active]:text-white">Szenen</TabsTrigger>
            {rooms.map(room => (
              <TabsTrigger 
                key={room} 
                value={room} 
                className="flex-1 data-[state=active]:bg-homepilot-primary data-[state=active]:text-white"
              >
                {room}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="space-y-5 pt-1">
            {rooms.map(room => renderRoomContent(room))}
          </TabsContent>
          
          <TabsContent value="scenes" className="pt-1">
            <div className="grid grid-cols-2 gap-3">
              <Suspense fallback={<div className="p-4 text-center">Lade Szenen...</div>}>
                {quickScenes.map(scene => (
                  <SceneItem key={scene.id} scene={scene} />
                ))}
              </Suspense>
            </div>
          </TabsContent>
          
          {rooms.map(room => (
            <TabsContent key={room} value={room}>
              {renderRoomContent(room)}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-between items-center pt-2 border-t border-homepilot-primary/10">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-homepilot-accent mr-1.5">
                <BatteryMedium className="h-3 w-3 text-homepilot-secondary" />
              </div>
              <span className="text-xs">Energiemodus: Öko</span>
            </div>
          </div>
          <Link 
            to="/smart-home" 
            className="text-xs text-homepilot-primary hover:underline flex items-center group"
          >
            Mehr anzeigen <span className="transform transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </Widget>
  );
};

export default SmartHomeWidget;
