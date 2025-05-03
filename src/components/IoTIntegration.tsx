import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Plus, BarChart3, BatteryMedium, RefreshCw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface SensorData {
  id: number;
  name: string;
  type: string;
  status: 'online' | 'offline';
  battery: number;
  lastUpdate: string;
  reading: string;
  unit: string;
  room: string;
  history?: { time: string; value: number }[];
}

const IoTIntegration = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Sample IoT sensor data
  const [sensors, setSensors] = useState<SensorData[]>([
    {
      id: 1,
      name: 'Wohnzimmer Temperatur',
      type: 'temperature',
      status: 'online',
      battery: 72,
      lastUpdate: 'Vor 5 Minuten',
      reading: '21.5',
      unit: '°C',
      room: 'Wohnzimmer',
      history: [
        { time: '10:00', value: 20 },
        { time: '12:00', value: 21 },
        { time: '14:00', value: 22 },
        { time: '16:00', value: 21.5 },
        { time: '18:00', value: 21 },
      ]
    },
    {
      id: 2,
      name: 'Schlafzimmer Luftfeuchtigkeit',
      type: 'humidity',
      status: 'online',
      battery: 45,
      lastUpdate: 'Vor 12 Minuten',
      reading: '58',
      unit: '%',
      room: 'Schlafzimmer',
      history: [
        { time: '10:00', value: 55 },
        { time: '12:00', value: 57 },
        { time: '14:00', value: 56 },
        { time: '16:00', value: 60 },
        { time: '18:00', value: 58 },
      ]
    },
    {
      id: 3,
      name: 'Küche CO2',
      type: 'co2',
      status: 'online',
      battery: 93,
      lastUpdate: 'Vor 3 Minuten',
      reading: '550',
      unit: 'ppm',
      room: 'Küche',
      history: [
        { time: '10:00', value: 450 },
        { time: '12:00', value: 600 },
        { time: '14:00', value: 700 },
        { time: '16:00', value: 650 },
        { time: '18:00', value: 550 },
      ]
    },
    {
      id: 4,
      name: 'Badezimmer Bewegung',
      type: 'motion',
      status: 'offline',
      battery: 15,
      lastUpdate: 'Vor 2 Stunden',
      reading: 'Keine',
      unit: '',
      room: 'Badezimmer'
    },
    {
      id: 5,
      name: 'Eingangstür Sensor',
      type: 'contact',
      status: 'online',
      battery: 88,
      lastUpdate: 'Vor 2 Minuten',
      reading: 'Geschlossen',
      unit: '',
      room: 'Eingang'
    },
    {
      id: 6,
      name: 'Wohnzimmer Helligkeitssensor',
      type: 'light',
      status: 'online',
      battery: 67,
      lastUpdate: 'Vor 7 Minuten',
      reading: '480',
      unit: 'lux',
      room: 'Wohnzimmer',
      history: [
        { time: '10:00', value: 350 },
        { time: '12:00', value: 520 },
        { time: '14:00', value: 630 },
        { time: '16:00', value: 540 },
        { time: '18:00', value: 480 },
      ]
    }
  ]);

  // Get unique rooms for filtering
  const rooms = Array.from(new Set(sensors.map(sensor => sensor.room)));

  // Filter sensors based on search and room filter
  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       sensor.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRoom = !selectedRoom || sensor.room === selectedRoom;
    return matchesSearch && matchesRoom;
  });

  // Get sensor type icon
  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 13V5c0-1.7-1.3-3-3-3S9 3.3 9 5v8c-1.2 1.1-2 2.7-2 4.5C7 20 9 22 12 22s5-2 5-4.5c0-1.8-.8-3.4-2-4.5m-3 6c-1.7 0-3-1.3-3-3 0-1 .5-1.9 1.2-2.4L11 13V5c0-.6.4-1 1-1s1 .4 1 1v8l.8.6c.7.5 1.2 1.4 1.2 2.4 0 1.7-1.3 3-3 3Z"/>
          </svg>
        );
      case 'humidity':
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 20c-3.31 0-6-2.69-6-6 0-2.89 2.4-7.05 6-10.85 3.6 3.8 6 8 6 10.85 0 3.31-2.69 6-6 6m0-2c2.21 0 4-1.79 4-4 0-1.72-1.5-4.93-4-7.91C9.5 9.07 8 12.28 8 14c0 2.21 1.79 4 4 4m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"/>
          </svg>
        );
      case 'co2':
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5Zm0-2h14V7H5v10Zm2-3h2v-4H7v4Zm4 0h2V8h-2v6Zm4 0h2v-2h-2v2Z"/>
          </svg>
        );
      case 'motion':
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="m13.67 22l-.83-7.5l5.83-3.5c.62-.37.83-1.17.46-1.79c-.37-.62-1.17-.83-1.79-.46l-3.34 2l-2.5-4.33l3.17-3.17c.5-.5.5-1.33 0-1.83s-1.33-.5-1.83 0L11.67 3H9.5V2c0-.67-.57-1.22-1.25-1.22S7 1.33 7 2v1H4.83c-.67 0-1.25.57-1.25 1.25s.58 1.25 1.25 1.25H7v2l-1.17 1.17c-.5.5-.5 1.33 0 1.83s1.33.5 1.83 0L8.83 9l2.5 4.33L9.15 15c-.45.25-.73.76-.69 1.33L9.5 24H17v-2h-3.33Z"/>
          </svg>
        );
      case 'contact':
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/>
          </svg>
        );
      case 'light':
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zM2 13h2c.6 0 1-.4 1-1s-.4-1-1-1H2c-.6 0-1 .4-1 1s.4 1 1 1zm18 0h2c.6 0 1-.4 1-1s-.4-1-1-1h-2c-.6 0-1 .4-1 1s.4 1 1 1zM11 2v2c0 .6.4 1 1 1s1-.4 1-1V2c0-.6-.4-1-1-1s-1 .4-1 1zm0 18v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1s-1 .4-1 1zm6.364-2.636l1.424 1.424c.391.391 1.023.391 1.414 0s.391-1.023 0-1.414l-1.424-1.424c-.391-.391-1.02-.391-1.41-.001c-.39.391-.39 1.019 0 1.42z"/>
          </svg>
        );
      default:
        return <Wifi className="h-5 w-5" />;
    }
  };

  // Get sensor type color
  const getSensorColor = (type: string) => {
    switch (type) {
      case 'temperature':
        return 'text-red-500';
      case 'humidity':
        return 'text-blue-500';
      case 'co2':
        return 'text-purple-500';
      case 'motion':
        return 'text-yellow-500';
      case 'contact':
        return 'text-green-500';
      case 'light':
        return 'text-amber-500';
      default:
        return 'text-gray-500';
    }
  };

  // Get battery color based on level
  const getBatteryColor = (level: number) => {
    if (level <= 20) return 'text-red-500';
    if (level <= 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  // Toggle sensor status
  const toggleSensor = (id: number) => {
    setSensors(sensors.map(sensor => 
      sensor.id === id 
        ? { ...sensor, status: sensor.status === 'online' ? 'offline' : 'online' } 
        : sensor
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">IoT & Sensoren</h2>
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-1/3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.62-.59 3.1-1.57 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.5 6.5 0 1 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"/>
            </svg>
            <Input 
              type="search" 
              placeholder="Sensoren durchsuchen..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedRoom === null ? "default" : "outline"}
              onClick={() => setSelectedRoom(null)}
              size="sm"
            >
              Alle Räume
            </Button>
            {rooms.map(room => (
              <Button 
                key={room}
                variant={selectedRoom === room ? "default" : "outline"}
                onClick={() => setSelectedRoom(room)}
                size="sm"
              >
                {room}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Status Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Status Übersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium flex items-center">
                    <Wifi className="h-4 w-4 mr-1 text-green-600" />
                    <span>Online</span>
                  </h3>
                  <span className="text-2xl font-bold text-green-600">
                    {sensors.filter(s => s.status === 'online').length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Sensoren senden Daten
                </p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium flex items-center">
                    <WifiOff className="h-4 w-4 mr-1 text-red-600" />
                    <span>Offline</span>
                  </h3>
                  <span className="text-2xl font-bold text-red-600">
                    {sensors.filter(s => s.status === 'offline').length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Sensoren nicht verbunden
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium flex items-center">
                    <BatteryMedium className="h-4 w-4 mr-1 text-yellow-600" />
                    <span>Niedriger Batteriestand</span>
                  </h3>
                  <span className="text-2xl font-bold text-yellow-600">
                    {sensors.filter(s => s.battery < 20).length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Sensoren benötigen neue Batterien
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Sensors List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredSensors.map((sensor) => (
            <Card key={sensor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className={`p-4 flex justify-between items-center ${
                  sensor.status === 'online' ? '' : 'opacity-60'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      sensor.status === 'online' 
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      <span className={getSensorColor(sensor.type)}>
                        {getSensorIcon(sensor.type)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-sm">{sensor.name}</h3>
                      <div className="flex items-center text-xs">
                        <Badge variant="secondary" className="mr-1">
                          {sensor.room}
                        </Badge>
                        <span className="text-gray-500">{sensor.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {sensor.reading && sensor.reading !== 'Keine' && (
                      <div className="text-xl font-semibold">
                        {sensor.reading}{sensor.unit}
                      </div>
                    )}
                    <div className="flex items-center text-xs">
                      <span className={`mr-1 ${getBatteryColor(sensor.battery)}`}>
                        {sensor.battery}%
                      </span>
                      <Switch 
                        checked={sensor.status === 'online'} 
                        onCheckedChange={() => toggleSensor(sensor.id)}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
                
                {sensor.history && sensor.status === 'online' && (
                  <div className="px-4 pb-4 pt-0">
                    <Separator className="mb-3" />
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500">Tagesverlauf</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <BarChart3 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="h-20">
                      <div className="flex items-end justify-between h-full">
                        {sensor.history.map((point, index) => {
                          // Calculate height based on min and max values
                          const values = sensor.history!.map(h => h.value);
                          const min = Math.min(...values);
                          const max = Math.max(...values);
                          const range = max - min;
                          const height = range === 0 ? 50 : ((point.value - min) / range * 70) + 10;
                          
                          return (
                            <div key={index} className="flex flex-col items-center justify-end flex-1">
                              <div 
                                className={`w-4 ${getSensorColor(sensor.type)} rounded-t opacity-80`} 
                                style={{ height: `${height}%` }}
                              ></div>
                              <span className="text-[10px] text-gray-500 whitespace-nowrap mt-1">
                                {point.time}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {/* Add New Sensor Card */}
          <Card className="border-dashed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="font-medium">Neuen Sensor hinzufügen</h3>
              <p className="text-xs text-center text-gray-500 mt-1">
                Klicke hier, um einen neuen IoT-Sensor zu verbinden
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* System Health */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <RefreshCw className="h-5 w-5 mr-2" />
              System Gesundheit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Hub Konnektivität</span>
                  <span className="text-sm">99.7%</span>
                </div>
                <Progress value={99.7} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Sensor Ansprechrate</span>
                  <span className="text-sm">92.4%</span>
                </div>
                <Progress value={92.4} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">API Latenz</span>
                  <span className="text-sm">178ms</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-medium mb-2">Automatisierungsoptionen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Temperaturbasierte Beleuchtung</span>
                  <Switch size="default" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">CO2-basierte Lüftung</span>
                  <Switch size="default" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bewegungsbasierte Sicherheit</span>
                  <Switch size="default" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Adaptive Heizungssteuerung</span>
                  <Switch size="default" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IoTIntegration;
