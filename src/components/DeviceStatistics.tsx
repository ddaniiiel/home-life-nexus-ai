
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Battery, ThermometerIcon, Power } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const DeviceStatistics = () => {
  // Sample energy consumption data for the past week
  const energyData = [
    { day: 'Mo', lights: 0.8, heating: 4.2, other: 3.1, total: 8.1 },
    { day: 'Di', lights: 0.7, heating: 4.0, other: 2.8, total: 7.5 },
    { day: 'Mi', lights: 0.9, heating: 4.5, other: 3.3, total: 8.7 },
    { day: 'Do', lights: 1.1, heating: 4.3, other: 3.5, total: 8.9 },
    { day: 'Fr', lights: 1.2, heating: 3.8, other: 3.7, total: 8.7 },
    { day: 'Sa', lights: 1.5, heating: 3.2, other: 4.1, total: 8.8 },
    { day: 'So', lights: 1.3, heating: 3.0, other: 3.8, total: 8.1 }
  ];

  // Sample temperature data
  const temperatureData = [
    { time: '6:00', wohnzimmer: 19, schlafzimmer: 18, kuche: 18 },
    { time: '9:00', wohnzimmer: 20, schlafzimmer: 19, kuche: 20 },
    { time: '12:00', wohnzimmer: 21, schlafzimmer: 19, kuche: 21 },
    { time: '15:00', wohnzimmer: 22, schlafzimmer: 20, kuche: 22 },
    { time: '18:00', wohnzimmer: 21, schlafzimmer: 21, kuche: 21 },
    { time: '21:00', wohnzimmer: 20, schlafzimmer: 20, kuche: 19 }
  ];

  // Current device status
  const deviceStatus = {
    activeDevices: 8,
    totalDevices: 12,
    energySavings: 23, // percentage compared to last month
    batteryLow: 2 // number of devices with low battery
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <Power className="h-5 w-5 mr-2 text-homepilot-primary" />
            Energieverbrauch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={energyData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" />
                <YAxis unit="kWh" />
                <Tooltip contentStyle={{ fontSize: '12px' }} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="lights" 
                  name="Beleuchtung"
                  stroke="#FFD700" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="heating" 
                  name="Heizung"
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="other" 
                  name="Andere Geräte" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">Gesamtverbrauch</p>
              <p className="text-2xl font-bold">58.8 <span className="text-sm font-normal text-gray-500">kWh</span></p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">-12% im Vergleich zur Vorwoche</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">Heizung</p>
              <p className="text-2xl font-bold">27.0 <span className="text-sm font-normal text-gray-500">kWh</span></p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">46% des Gesamtverbrauchs</p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-100 dark:border-yellow-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">Beleuchtung</p>
              <p className="text-2xl font-bold">7.5 <span className="text-sm font-normal text-gray-500">kWh</span></p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">13% des Gesamtverbrauchs</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">Andere Geräte</p>
              <p className="text-2xl font-bold">24.3 <span className="text-sm font-normal text-gray-500">kWh</span></p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">41% des Gesamtverbrauchs</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <ThermometerIcon className="h-5 w-5 mr-2 text-homepilot-primary" />
            Temperaturverlauf
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={temperatureData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" />
                <YAxis unit="°C" domain={[16, 24]} />
                <Tooltip contentStyle={{ fontSize: '12px' }} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="wohnzimmer" 
                  name="Wohnzimmer" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="schlafzimmer" 
                  name="Schlafzimmer" 
                  stroke="#6366F1" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="kuche" 
                  name="Küche" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-homepilot-primary" />
            Geräteübersicht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-center text-xl font-bold">{deviceStatus.activeDevices}/{deviceStatus.totalDevices}</p>
              <p className="text-center text-xs text-gray-500">Geräte aktiv</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <Power className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-center text-xl font-bold text-green-600">{deviceStatus.energySavings}%</p>
              <p className="text-center text-xs text-gray-500">Energieersparnis</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <Battery className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <p className="text-center text-xl font-bold">{deviceStatus.batteryLow}</p>
              <p className="text-center text-xs text-gray-500">Geräte mit schwacher Batterie</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                  <ThermometerIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <p className="text-center text-xl font-bold">21°C</p>
              <p className="text-center text-xs text-gray-500">Durchschnittstemperatur</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
            <h3 className="font-medium mb-2 flex items-center">
              <Battery className="h-4 w-4 mr-1 text-green-600" />
              Energiespartipps
            </h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Passe die Heizung in ungenutzten Räumen um 2°C an, um bis zu 12% Energie zu sparen.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Die Küchenbeleuchtung ist am häufigsten aktiv. Erwäge ein Upgrade auf energieeffizientere LEDs.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceStatistics;
