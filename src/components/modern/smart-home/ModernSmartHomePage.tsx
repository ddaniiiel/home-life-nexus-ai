
import React, { useState } from 'react';
import { 
  Home, Thermometer, Lightbulb, Shield, Camera, Lock, 
  Zap, Wifi, Settings, Play, Pause, RotateCcw, 
  TrendingUp, TrendingDown, Activity, AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface Device {
  id: string;
  name: string;
  type: string;
  room: string;
  status: 'online' | 'offline' | 'warning';
  value?: number;
  unit?: string;
  isActive: boolean;
  icon: React.ReactNode;
}

interface Room {
  id: string;
  name: string;
  devices: number;
  temperature: number;
  humidity: number;
  lightsOn: number;
  totalLights: number;
}

const ModernSmartHomePage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Wohnzimmer Licht', type: 'light', room: 'Wohnzimmer', status: 'online', value: 75, unit: '%', isActive: true, icon: <Lightbulb className="h-5 w-5" /> },
    { id: '2', name: 'Heizung Hauptschlafzimmer', type: 'heating', room: 'Schlafzimmer', status: 'online', value: 21, unit: '°C', isActive: true, icon: <Thermometer className="h-5 w-5" /> },
    { id: '3', name: 'Eingangstür Schloss', type: 'lock', room: 'Eingang', status: 'online', isActive: false, icon: <Lock className="h-5 w-5" /> },
    { id: '4', name: 'Überwachungskamera', type: 'camera', room: 'Garten', status: 'online', isActive: true, icon: <Camera className="h-5 w-5" /> },
    { id: '5', name: 'WLAN Router', type: 'network', room: 'Büro', status: 'warning', isActive: true, icon: <Wifi className="h-5 w-5" /> },
  ]);

  const [rooms] = useState<Room[]>([
    { id: '1', name: 'Wohnzimmer', devices: 8, temperature: 22, humidity: 45, lightsOn: 3, totalLights: 5 },
    { id: '2', name: 'Küche', devices: 6, temperature: 23, humidity: 50, lightsOn: 2, totalLights: 4 },
    { id: '3', name: 'Schlafzimmer', devices: 5, temperature: 21, humidity: 40, lightsOn: 0, totalLights: 3 },
    { id: '4', name: 'Badezimmer', devices: 4, temperature: 24, humidity: 60, lightsOn: 1, totalLights: 2 },
  ]);

  const toggleDevice = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId ? { ...device, isActive: !device.isActive } : device
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case 'offline': return <Badge className="bg-red-100 text-red-800">Offline</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Warnung</Badge>;
      default: return <Badge>Unbekannt</Badge>;
    }
  };

  // Quick stats
  const totalDevices = devices.length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const activeDevices = devices.filter(d => d.isActive).length;
  const warningDevices = devices.filter(d => d.status === 'warning').length;

  const stats = [
    { name: 'Geräte Online', value: onlineDevices, total: totalDevices, icon: Activity, color: 'bg-green-500' },
    { name: 'Aktive Geräte', value: activeDevices, total: totalDevices, icon: Zap, color: 'bg-blue-500' },
    { name: 'Warnungen', value: warningDevices, total: totalDevices, icon: AlertTriangle, color: 'bg-yellow-500' },
    { name: 'Energiesparmodus', value: 2, total: totalDevices, icon: TrendingDown, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    {stat.total && (
                      <p className="text-sm text-gray-500">/ {stat.total}</p>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              {stat.total && (
                <div className="mt-4">
                  <Progress value={(stat.value / stat.total) * 100} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="devices">Geräte</TabsTrigger>
          <TabsTrigger value="rooms">Räume</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature Control */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="h-5 w-5 mr-2 text-blue-500" />
                  Temperatursteuerung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">21°C</div>
                  <p className="text-sm text-gray-500">Aktuelle Temperatur</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Zieltemperatur</span>
                    <span className="text-sm">22°C</span>
                  </div>
                  <Slider defaultValue={[22]} max={30} min={15} step={0.5} className="w-full" />
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Eco
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Home className="h-4 w-4 mr-2" />
                    Komfort
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lighting Control */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Beleuchtung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">6</div>
                    <p className="text-sm text-gray-500">Lichter an</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-400">14</div>
                    <p className="text-sm text-gray-500">Gesamt</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Helligkeit</span>
                    <span className="text-sm">75%</span>
                  </div>
                  <Slider defaultValue={[75]} max={100} min={0} step={5} className="w-full" />
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">Alle Ein</Button>
                  <Button size="sm" variant="outline" className="flex-1">Alle Aus</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                Sicherheitsstatus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Türschloss</p>
                    <p className="text-sm text-gray-500">Verriegelt</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Kameras</p>
                    <p className="text-sm text-gray-500">4 Aktiv</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Alarmsystem</p>
                    <p className="text-sm text-gray-500">Wartung nötig</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => (
              <Card key={device.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {device.icon}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{device.name}</CardTitle>
                        <p className="text-xs text-gray-500">{device.room}</p>
                      </div>
                    </div>
                    {getStatusBadge(device.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {device.value && (
                    <div className="text-center">
                      <div className="text-2xl font-bold">{device.value}{device.unit}</div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Switch 
                      checked={device.isActive} 
                      onCheckedChange={() => toggleDevice(device.id)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-4 w-4 mr-1" />
                      Einstellungen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <Card key={room.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{room.name}</span>
                    <Badge variant="outline">{room.devices} Geräte</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Thermometer className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                      <div className="text-lg font-bold">{room.temperature}°C</div>
                      <div className="text-xs text-gray-500">Temperatur</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Activity className="h-5 w-5 text-green-500 mx-auto mb-1" />
                      <div className="text-lg font-bold">{room.humidity}%</div>
                      <div className="text-xs text-gray-500">Luftfeuchtigkeit</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Beleuchtung</span>
                      <span className="text-sm">{room.lightsOn}/{room.totalLights}</span>
                    </div>
                    <Progress value={(room.lightsOn / room.totalLights) * 100} className="h-2" />
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">Szene aktivieren</Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Guten Morgen', description: 'Lichter einschalten, Heizung hochfahren', active: true, icon: <Lightbulb className="h-5 w-5" /> },
              { name: 'Abwesenheit', description: 'Alle Lichter aus, Temperatur reduzieren', active: false, icon: <Home className="h-5 w-5" /> },
              { name: 'Nachtmodus', description: 'Sicherheit aktivieren, Lichter dimmen', active: true, icon: <Shield className="h-5 w-5" /> },
              { name: 'Energiesparen', description: 'Unnötige Geräte abschalten', active: false, icon: <TrendingDown className="h-5 w-5" /> },
            ].map((automation) => (
              <Card key={automation.name} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-homepilot-primary bg-opacity-10 rounded-lg">
                        {automation.icon}
                      </div>
                      <CardTitle className="text-sm">{automation.name}</CardTitle>
                    </div>
                    <Switch checked={automation.active} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{automation.description}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Ausführen
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernSmartHomePage;
