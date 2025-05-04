
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Lightbulb, Plus, Settings, Home, Thermometer, LineChart, Wifi, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FloorPlanLayout from '@/components/FloorPlanLayout';
import DeviceStatistics from '@/components/DeviceStatistics';
import IoTIntegration from '@/components/IoTIntegration';
import AutomationsPage from '@/components/smart-home/AutomationsPage';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SmartHome = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [devices, setDevices] = useState([
    { id: 1, name: 'Wohnzimmer Licht', type: 'light', isOn: false, room: 'Wohnzimmer' },
    { id: 2, name: 'Küche Licht', type: 'light', isOn: true, room: 'Küche' },
    { id: 3, name: 'Bad Licht', type: 'light', isOn: false, room: 'Bad' },
    { id: 4, name: 'Schlafzimmer Licht', type: 'light', isOn: false, room: 'Schlafzimmer' },
    { id: 5, name: 'Wohnzimmer Thermostat', type: 'thermostat', isOn: true, temp: 21, room: 'Wohnzimmer' },
    { id: 6, name: 'Küche Thermostat', type: 'thermostat', isOn: true, temp: 22, room: 'Küche' },
    { id: 7, name: 'Eingangstür', type: 'lock', isOn: true, room: 'Eingang' },
    { id: 8, name: 'Überwachungskamera', type: 'camera', isOn: true, room: 'Außen' },
  ]);

  const toggleDevice = (id: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  const rooms = ['Alle', 'Wohnzimmer', 'Küche', 'Schlafzimmer', 'Bad'];
  const [selectedRoom, setSelectedRoom] = useState('Alle');

  const filteredDevices = selectedRoom === 'Alle' 
    ? devices 
    : devices.filter(device => device.room === selectedRoom);

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
              <TabsTrigger value="automation" className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Automatisierung
              </TabsTrigger>
              <TabsTrigger value="iot" className="flex items-center">
                <Wifi className="h-4 w-4 mr-2" />
                IoT & Sensoren
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                Verbrauch
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <FloorPlanLayout />
                </div>
                <div>
                  <DeviceStatistics />
                </div>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDevices.map((device) => (
                    <div 
                      key={device.id} 
                      className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-gray-500">{device.room}</p>
                      </div>
                      <Button 
                        variant={device.isOn ? "default" : "outline"}
                        onClick={() => toggleDevice(device.id)}
                      >
                        {device.isOn ? 'Ein' : 'Aus'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="automation">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <AutomationsPage />
              </div>
            </TabsContent>
            
            <TabsContent value="iot">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <IoTIntegration />
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6">Energieverbrauch</h2>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: 'Jan', strom: 120, heizung: 240 },
                        { month: 'Feb', strom: 110, heizung: 220 },
                        { month: 'Mär', strom: 105, heizung: 190 },
                        { month: 'Apr', strom: 90, heizung: 150 },
                        { month: 'Mai', strom: 85, heizung: 90 },
                        { month: 'Jun', strom: 80, heizung: 30 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="strom" name="Strom (kWh)" fill="#3b82f6" />
                      <Bar dataKey="heizung" name="Heizung (kWh)" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
