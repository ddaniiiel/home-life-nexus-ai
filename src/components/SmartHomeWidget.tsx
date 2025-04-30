
import React, { useState } from 'react';
import { Lightbulb, Home, Thermometer, Tv, Speaker, DoorClosed, Fan, WifiIcon, BatteryMedium, Power, Lock, Sunrise, Sunset } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Widget from './Widget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const SmartHomeWidget = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Wohnzimmer Licht', type: 'light', isOn: false, brightness: 80, room: 'Wohnzimmer', icon: Lightbulb, color: 'yellow' },
    { id: 2, name: 'Küche Licht', type: 'light', isOn: true, brightness: 70, room: 'Küche', icon: Lightbulb, color: 'yellow' },
    { id: 3, name: 'Thermostat', type: 'thermostat', isOn: true, temp: 21, room: 'Wohnzimmer', icon: Thermometer, color: 'blue' },
    { id: 4, name: 'TV', type: 'tv', isOn: false, room: 'Wohnzimmer', icon: Tv, color: 'blue' },
    { id: 5, name: 'Smart Speaker', type: 'audio', isOn: true, volume: 40, room: 'Küche', icon: Speaker, color: 'purple' },
    { id: 6, name: 'Haustür', type: 'door', isOn: false, room: 'Eingang', icon: DoorClosed, color: 'green' },
    { id: 7, name: 'Schlafzimmer Licht', type: 'light', isOn: false, brightness: 60, room: 'Schlafzimmer', icon: Lightbulb, color: 'yellow' },
    { id: 8, name: 'Ventilator', type: 'fan', isOn: false, speed: 2, room: 'Schlafzimmer', icon: Fan, color: 'blue' },
    { id: 9, name: 'Kinderzimmer Licht', type: 'light', isOn: false, brightness: 50, room: 'Kinderzimmer', icon: Lightbulb, color: 'yellow' },
    { id: 10, name: 'WLAN-Router', type: 'network', isOn: true, room: 'Büro', icon: WifiIcon, color: 'green' },
  ]);
  
  const [activeTab, setActiveTab] = useState<string>('all');
  const [quickScenes] = useState([
    { id: 1, name: 'Guten Morgen', icon: Sunrise, devices: 4 },
    { id: 2, name: 'Gute Nacht', icon: Sunset, devices: 6 },
    { id: 3, name: 'Heimkino', icon: Tv, devices: 3 },
    { id: 4, name: 'Energiesparen', icon: Power, devices: 8 },
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
  
  const adjustVolume = (id: number, value: number[]) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, volume: value[0] } : device
    ));
  };
  
  const adjustFanSpeed = (id: number, value: number[]) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, speed: value[0] } : device
    ));
  };

  // Geräte nach Raum gruppieren
  const devicesByRoom: Record<string, typeof devices> = devices.reduce((acc: Record<string, typeof devices>, device) => {
    if (!acc[device.room]) {
      acc[device.room] = [];
    }
    acc[device.room].push(device);
    return acc;
  }, {});
  
  // Alle Räume für Tabs
  const rooms = Object.keys(devicesByRoom);
  
  // Get device icon component
  const DeviceIcon = ({ device }: { device: any }) => {
    const Icon = device.icon;
    const isOn = device.isOn;
    
    let colorClass = 'text-gray-400';
    if (isOn) {
      switch (device.color) {
        case 'yellow':
          colorClass = 'text-yellow-400';
          break;
        case 'blue':
          colorClass = 'text-blue-500';
          break;
        case 'green':
          colorClass = 'text-green-500';
          break;
        case 'purple':
          colorClass = 'text-purple-500';
          break;
        case 'red':
          colorClass = 'text-red-500';
          break;
        default:
          colorClass = 'text-homepilot-primary';
      }
    }
    
    return <Icon className={cn("h-5 w-5", colorClass)} />;
  };
  
  // Aktion basierend auf Gerätetyp rendern
  const renderDeviceAction = (device: any) => {
    switch (device.type) {
      case 'light':
        return (
          <div className="flex flex-col items-end">
            {device.isOn && (
              <div className="w-28 mb-2">
                <Slider
                  value={[device.brightness]} 
                  min={10}
                  max={100}
                  step={10}
                  className="mb-1"
                  onValueChange={(value) => adjustBrightness(device.id, value)}
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
            {device.isOn && (
              <div className="w-28 mb-2">
                <Slider
                  value={[device.temp]} 
                  min={16}
                  max={28}
                  step={0.5}
                  className="mb-1"
                  onValueChange={(value) => adjustTemperature(device.id, value)}
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
      case 'audio':
        return (
          <div className="flex flex-col items-end">
            {device.isOn && (
              <div className="w-28 mb-2">
                <Slider
                  value={[device.volume]} 
                  min={0}
                  max={100}
                  step={5}
                  className="mb-1"
                  onValueChange={(value) => adjustVolume(device.id, value)}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Leise</span>
                  <span>{device.volume}%</span>
                  <span>Laut</span>
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
      case 'fan':
        return (
          <div className="flex flex-col items-end">
            {device.isOn && (
              <div className="w-28 mb-2">
                <Slider
                  value={[device.speed]} 
                  min={1}
                  max={5}
                  step={1}
                  className="mb-1"
                  onValueChange={(value) => adjustFanSpeed(device.id, value)}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Min</span>
                  <span>Stufe {device.speed}</span>
                  <span>Max</span>
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

  // Renderlogik für Tabs mit Räumen
  const renderRoomContent = (roomName: string) => {
    const roomDevices = devicesByRoom[roomName] || [];
    
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="font-medium">{roomName}</Badge>
          <span className="text-xs text-gray-500">{roomDevices.length} Geräte</span>
        </div>
        
        {roomDevices.map((device) => (
          <div 
            key={device.id} 
            className={cn(
              "flex items-center justify-between py-3 px-4 rounded-lg transition-colors",
              device.isOn 
                ? "bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm" 
                : "border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <div className="flex items-center">
              <div className={cn(
                "w-9 h-9 flex items-center justify-center rounded-full mr-3",
                device.isOn 
                  ? device.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30' 
                  : device.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30'
                  : device.color === 'green' ? 'bg-green-100 dark:bg-green-900/30'
                  : device.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30'
                  : device.color === 'red' ? 'bg-red-100 dark:bg-red-900/30'
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
              {renderDeviceAction(device)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Widget title="Smart Home" icon={<Home className="h-5 w-5" />}>
      <div className="space-y-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-3">
            <TabsTrigger value="all" className="flex-1">Alle</TabsTrigger>
            <TabsTrigger value="scenes" className="flex-1">Szenen</TabsTrigger>
            {rooms.slice(0, 3).map(room => (
              <TabsTrigger key={room} value={room} className="flex-1">{room}</TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="space-y-5 pt-1">
            {rooms.map(room => renderRoomContent(room))}
          </TabsContent>
          
          <TabsContent value="scenes" className="pt-1">
            <div className="grid grid-cols-2 gap-3">
              {quickScenes.map(scene => (
                <Button 
                  key={scene.id}
                  variant="outline"
                  className="h-auto flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-homepilot-primary/10 mb-2">
                    <scene.icon className="h-5 w-5 text-homepilot-primary" />
                  </div>
                  <span className="text-sm font-medium">{scene.name}</span>
                  <span className="text-xs text-gray-500 mt-1">{scene.devices} Geräte</span>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          {rooms.map(room => (
            <TabsContent key={room} value={room}>
              {renderRoomContent(room)}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 mr-1.5">
                <BatteryMedium className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-xs">Energiemodus: Öko</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 mr-1.5">
                <Lock className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-xs">Sicherheitsstatus: Aktiv</span>
            </div>
          </div>
          <a 
            href="/smart-home" 
            className="text-xs text-homepilot-primary hover:underline flex items-center"
          >
            Mehr anzeigen →
          </a>
        </div>
      </div>
    </Widget>
  );
};

export default SmartHomeWidget;
