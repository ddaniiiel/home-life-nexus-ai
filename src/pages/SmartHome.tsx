import React, { useState, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import { Lightbulb, Plus, Settings, Home, Thermometer, LineChart, Wifi, Zap, Camera, Gauge, Server, BellRing, LightbulbOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FloorPlanLayout from '@/components/FloorPlanLayout';
import DeviceStatistics from '@/components/DeviceStatistics';
import IoTIntegration from '@/components/IoTIntegration';
import AutomationsPage from '@/components/smart-home/AutomationsPage';
import SensorHistoryChart from '@/components/smart-home/SensorHistoryChart';
import SmartHomeCamera from '@/components/smart-home/SmartHomeCamera';
import { Device, QuickScene } from '@/components/types/smart-home';
import { SmartHomeWidgetItem } from '@/components/SmartHomeWidgetItem';

const SceneItem = lazy(() => import('@/components/smart-home/SceneItem'));

const SmartHome = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'Wohnzimmer Licht', type: 'light', isOn: false, room: 'Wohnzimmer', icon: Lightbulb, color: 'yellow', brightness: 80 },
    { id: 2, name: 'Küche Licht', type: 'light', isOn: true, room: 'Küche', icon: Lightbulb, color: 'yellow', brightness: 70 },
    { id: 3, name: 'Bad Licht', type: 'light', isOn: false, room: 'Bad', icon: Lightbulb, color: 'yellow', brightness: 60 },
    { id: 4, name: 'Schlafzimmer Licht', type: 'light', isOn: false, room: 'Schlafzimmer', icon: Lightbulb, color: 'yellow', brightness: 60 },
    { id: 5, name: 'Wohnzimmer Thermostat', type: 'thermostat', isOn: true, temp: 21, room: 'Wohnzimmer', icon: Thermometer, color: 'blue' },
    { id: 6, name: 'Küche Thermostat', type: 'thermostat', isOn: true, temp: 22, room: 'Küche', icon: Thermometer, color: 'blue' },
    { id: 7, name: 'Eingangstür', type: 'lock', isOn: true, room: 'Eingang', icon: Zap, color: 'green' },
    { id: 8, name: 'Überwachungskamera', type: 'camera', isOn: true, room: 'Außen', icon: Camera, color: 'blue' },
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

  const rooms = ['Alle', 'Wohnzimmer', 'Küche', 'Schlafzimmer', 'Bad'];
  const [selectedRoom, setSelectedRoom] = useState('Alle');

  const filteredDevices = selectedRoom === 'Alle' 
    ? devices 
    : devices.filter(device => device.room === selectedRoom);

  const quickScenes: QuickScene[] = [
    { id: 1, name: 'Alles Ein', icon: Lightbulb, devices: devices.filter(d => d.type === 'light').length },
    { id: 2, name: 'Alles Aus', icon: LightbulbOff, devices: devices.filter(d => d.type === 'light').length },
    { id: 3, name: 'Zuhause', icon: Home, devices: 6 },
    { id: 4, name: 'Nacht', icon: BellRing, devices: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <Lightbulb className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Smart Home</h1>
          </div>
          
          <Tabs defaultValue="dashboard" className="mb-8">
            <TabsList>
              <TabsTrigger value="dashboard" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Geräte
              </TabsTrigger>
              <TabsTrigger value="sensors" className="flex items-center">
                <Gauge className="h-4 w-4 mr-2" />
                Sensoren
              </TabsTrigger>
              <TabsTrigger value="cameras" className="flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                Kameras
              </TabsTrigger>
              <TabsTrigger value="automation" className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Automatisierung
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                Verbrauch
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 gap-8">
                <Card className="shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-homepilot-secondary">Übersicht</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <FloorPlanLayout />
                      </div>
                      <div className="space-y-6">
                        <DeviceStatistics />
                        <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                          <h3 className="font-medium text-lg mb-2">Schnellzugriff</h3>
                          <div className="grid grid-cols-2 gap-3">
                            <Suspense fallback={<div className="p-4 text-center col-span-2">Lade Szenen...</div>}>
                              {quickScenes.map(scene => (
                                <SceneItem key={scene.id} scene={scene} variant="colored" />
                              ))}
                            </Suspense>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SensorHistoryChart 
                    title="Temperatur" 
                    type="temperature" 
                    unit="°C" 
                    currentValue={21.5} 
                    roomName="Wohnzimmer"
                  />
                  <SensorHistoryChart 
                    title="Luftfeuchtigkeit" 
                    type="humidity" 
                    unit="%" 
                    currentValue={62} 
                    roomName="Wohnzimmer"
                  />
                  <SensorHistoryChart 
                    title="Energieverbrauch" 
                    type="energy" 
                    unit="W" 
                    currentValue={230} 
                  />
                </div>
                
                <Card className="shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-homepilot-secondary">Sicherheit</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SmartHomeCamera 
                        name="Eingangstür" 
                        location="Eingang"
                        imageUrl="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1350&q=80"
                        isRecording={false}
                        isOnline={true}
                        lastMotion="Vor 5 Minuten"
                      />
                      <SmartHomeCamera 
                        name="Garten" 
                        location="Hinterhof"
                        imageUrl="https://images.unsplash.com/photo-1620219365994-f451f9108666?auto=format&fit=crop&w=1350&q=80"
                        isRecording={true}
                        isOnline={true}
                        lastMotion="Jetzt"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="devices">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Geräteübersicht</h2>
                  <Button className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" /> Neues Gerät
                  </Button>
                </div>
                
                <div className="flex overflow-x-auto space-x-2 pb-4 mb-4">
                  {rooms.map((room) => (
                    <Button 
                      key={room} 
                      variant={selectedRoom === room ? "default" : "outline"}
                      onClick={() => setSelectedRoom(room)}
                      className="whitespace-nowrap"
                    >
                      {room}
                    </Button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDevices.map((device) => (
                    <SmartHomeWidgetItem
                      key={device.id}
                      device={device}
                      toggleDevice={toggleDevice}
                      adjustBrightness={adjustBrightness}
                      adjustTemperature={adjustTemperature}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sensors">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Sensoren & Messwerte</h2>
                  <Button className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" /> Sensor hinzufügen
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SensorHistoryChart 
                    title="Temperatur" 
                    type="temperature" 
                    unit="°C" 
                    currentValue={21.5} 
                    roomName="Wohnzimmer"
                  />
                  <SensorHistoryChart 
                    title="Temperatur" 
                    type="temperature" 
                    unit="°C" 
                    currentValue={23.2} 
                    roomName="Küche"
                  />
                  <SensorHistoryChart 
                    title="Temperatur" 
                    type="temperature" 
                    unit="°C" 
                    currentValue={19.8} 
                    roomName="Schlafzimmer"
                  />
                  <SensorHistoryChart 
                    title="Luftfeuchtigkeit" 
                    type="humidity" 
                    unit="%" 
                    currentValue={62} 
                    roomName="Wohnzimmer"
                  />
                  <SensorHistoryChart 
                    title="Luftfeuchtigkeit" 
                    type="humidity" 
                    unit="%" 
                    currentValue={58} 
                    roomName="Küche"
                  />
                  <SensorHistoryChart 
                    title="CO2" 
                    type="co2" 
                    unit="ppm" 
                    currentValue={820} 
                    roomName="Wohnzimmer"
                  />
                  <SensorHistoryChart 
                    title="Helligkeit" 
                    type="light" 
                    unit="lux" 
                    currentValue={630} 
                    roomName="Wohnzimmer"
                  />
                  <SensorHistoryChart 
                    title="Energieverbrauch" 
                    type="energy" 
                    unit="W" 
                    currentValue={230} 
                  />
                  <SensorHistoryChart 
                    title="Energieverbrauch" 
                    type="energy" 
                    unit="W" 
                    currentValue={145} 
                    roomName="Küche"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cameras">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Kameras & Überwachung</h2>
                  <Button className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" /> Kamera hinzufügen
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SmartHomeCamera 
                    name="Eingangstür" 
                    location="Eingang"
                    imageUrl="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1350&q=80"
                    isRecording={false}
                    isOnline={true}
                    lastMotion="Vor 5 Minuten"
                  />
                  <SmartHomeCamera 
                    name="Garten" 
                    location="Hinterhof"
                    imageUrl="https://images.unsplash.com/photo-1620219365994-f451f9108666?auto=format&fit=crop&w=1350&q=80"
                    isRecording={true}
                    isOnline={true}
                    lastMotion="Jetzt"
                  />
                  <SmartHomeCamera 
                    name="Garage" 
                    location="Außen"
                    imageUrl="https://images.unsplash.com/photo-1595760780346-f972eb49709f?auto=format&fit=crop&w=1350&q=80"
                    isRecording={false}
                    isOnline={true}
                    lastMotion="Vor 25 Minuten"
                  />
                  <SmartHomeCamera 
                    name="Wohnzimmer" 
                    location="Innen"
                    imageUrl="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1350&q=80"
                    isRecording={false}
                    isOnline={false}
                    lastMotion="Heute, 12:45"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="automation">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <AutomationsPage />
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6">Energieverbrauch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SensorHistoryChart 
                    title="Gesamtenergieverbrauch" 
                    type="energy" 
                    unit="kWh" 
                    currentValue={8.2} 
                  />
                  <SensorHistoryChart 
                    title="Heizungsenergie" 
                    type="energy" 
                    unit="kWh" 
                    currentValue={4.5} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm text-gray-500 mb-2">Aktueller Monat</h3>
                    <p className="text-2xl font-bold">185 kWh</p>
                    <p className="text-xs text-green-500">-12% im Vergleich zum Vormonat</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm text-gray-500 mb-2">Prognose Jahresverbrauch</h3>
                    <p className="text-2xl font-bold">2.150 kWh</p>
                    <p className="text-xs text-green-500">-8% im Vergleich zum Vorjahr</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm text-gray-500 mb-2">CO₂-Einsparung</h3>
                    <p className="text-2xl font-bold">352 kg</p>
                    <p className="text-xs text-gray-500">seit Januar 2025</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SmartHome;
