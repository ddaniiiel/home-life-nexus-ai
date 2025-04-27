
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DeviceStatistics = () => {
  // Sample data for device usage and energy consumption
  const energyData = [
    { name: 'Montag', usage: 3.7 },
    { name: 'Dienstag', usage: 4.1 },
    { name: 'Mittwoch', usage: 3.9 },
    { name: 'Donnerstag', usage: 4.2 },
    { name: 'Freitag', usage: 4.5 },
    { name: 'Samstag', usage: 3.8 },
    { name: 'Sonntag', usage: 3.2 },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Gerätestatistiken</h2>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Täglicher Energieverbrauch</span>
          <span className="text-sm font-medium">4.2 kWh</span>
        </div>
        <Progress value={66} className="h-2" />
        <p className="text-xs text-gray-500 mt-1">66% des durchschnittlichen Verbrauchs</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={energyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} kWh`, 'Verbrauch']} />
            <Legend />
            <Bar dataKey="usage" name="Energieverbrauch (kWh)" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <h3 className="text-md font-medium mb-2">Top Verbraucher</h3>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Heizung</span>
              <span className="text-sm font-medium">1.8 kWh</span>
            </div>
            <Progress value={42} className="h-1.5" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Beleuchtung</span>
              <span className="text-sm font-medium">0.9 kWh</span>
            </div>
            <Progress value={21} className="h-1.5" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Kühlschrank</span>
              <span className="text-sm font-medium">0.7 kWh</span>
            </div>
            <Progress value={17} className="h-1.5" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeviceStatistics;
