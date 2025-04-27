
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { FileText, TrendingDown, TrendingUp, BarChart3 } from 'lucide-react';

const EnergyAnalysis = () => {
  const [period, setPeriod] = useState('month');

  // Sample data for energy consumption
  const monthlyData = [
    { name: 'Jan', strom: 220, gas: 380, wasser: 18 },
    { name: 'Feb', strom: 210, gas: 350, wasser: 17 },
    { name: 'Mär', strom: 190, gas: 300, wasser: 16 },
    { name: 'Apr', strom: 170, gas: 250, wasser: 15 },
    { name: 'Mai', strom: 160, gas: 180, wasser: 14 },
    { name: 'Jun', strom: 150, gas: 120, wasser: 15 },
    { name: 'Jul', strom: 155, gas: 90, wasser: 17 },
    { name: 'Aug', strom: 160, gas: 85, wasser: 18 },
    { name: 'Sep', strom: 170, gas: 110, wasser: 16 },
    { name: 'Okt', strom: 185, gas: 170, wasser: 15 },
    { name: 'Nov', strom: 200, gas: 280, wasser: 16 },
    { name: 'Dez', strom: 230, gas: 360, wasser: 17 }
  ];

  const weeklyData = [
    { name: 'Mo', strom: 32, gas: 45, wasser: 4 },
    { name: 'Di', strom: 30, gas: 42, wasser: 3.8 },
    { name: 'Mi', strom: 34, gas: 47, wasser: 4.2 },
    { name: 'Do', strom: 31, gas: 44, wasser: 4.1 },
    { name: 'Fr', strom: 38, gas: 52, wasser: 4.5 },
    { name: 'Sa', strom: 40, gas: 55, wasser: 5.2 },
    { name: 'So', strom: 36, gas: 50, wasser: 4.7 }
  ];

  const yearlyData = [
    { name: '2021', strom: 2400, gas: 3800, wasser: 200 },
    { name: '2022', strom: 2300, gas: 3600, wasser: 195 },
    { name: '2023', strom: 2100, gas: 3200, wasser: 190 },
    { name: '2024', strom: 1900, gas: 2800, wasser: 185 },
    { name: '2025', strom: 1800, gas: 2500, wasser: 180 }
  ];

  // Data for pie chart
  const distributionData = [
    { name: 'Heizung', value: 45, color: '#ff7c43' },
    { name: 'Warmwasser', value: 20, color: '#ffa600' },
    { name: 'Beleuchtung', value: 15, color: '#f95d6a' },
    { name: 'Küche', value: 12, color: '#d45087' },
    { name: 'Elektrogeräte', value: 8, color: '#a05195' }
  ];

  const COLORS = ['#ff7c43', '#ffa600', '#f95d6a', '#d45087', '#a05195'];

  const getData = () => {
    switch (period) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'year':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Energieverbrauch Analyse</h2>
            <p className="text-sm text-gray-500">Übersicht deines Energie- und Wasserverbrauchs</p>
          </div>
          <Tabs defaultValue="month" value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="week">Woche</TabsTrigger>
              <TabsTrigger value="month">Monat</TabsTrigger>
              <TabsTrigger value="year">Jahr</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Stromverbrauch</p>
                <p className="text-2xl font-bold">{period === 'month' ? '190' : period === 'week' ? '34' : '1900'} kWh</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                <TrendingDown className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <p className="text-xs text-green-600">-8% im Vergleich zum Vorjahr</p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Gasverbrauch</p>
                <p className="text-2xl font-bold">{period === 'month' ? '350' : period === 'week' ? '47' : '2800'} kWh</p>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-full">
                <TrendingDown className="h-5 w-5 text-orange-600 dark:text-orange-300" />
              </div>
            </div>
            <p className="text-xs text-green-600">-12% im Vergleich zum Vorjahr</p>
          </div>
          
          <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Wasserverbrauch</p>
                <p className="text-2xl font-bold">{period === 'month' ? '16' : period === 'week' ? '4.2' : '185'} m³</p>
              </div>
              <div className="p-2 bg-teal-100 dark:bg-teal-800 rounded-full">
                <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-300" />
              </div>
            </div>
            <p className="text-xs text-red-600">+3% im Vergleich zum Vorjahr</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <h3 className="text-md font-medium mb-4">Verbrauchsentwicklung</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getData()} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="strom" name="Strom (kWh)" stroke="#3b82f6" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="gas" name="Gas (kWh)" stroke="#f97316" />
                    <Line yAxisId="right" type="monotone" dataKey="wasser" name="Wasser (m³)" stroke="#14b8a6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
            <h3 className="text-md font-medium mb-4">Verbrauchsverteilung</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium">Hochgeladene Dokumente</h3>
            <Badge variant="outline">Alle anzeigen</Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
              <FileText className="text-blue-500 h-5 w-5 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium">Stromrechnung_Q1_2025.pdf</p>
                <p className="text-xs text-gray-500">Hochgeladen: 15.04.2025</p>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200">
                Analysiert
              </Badge>
            </div>
            
            <div className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
              <FileText className="text-orange-500 h-5 w-5 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium">Gasrechnung_Q1_2025.pdf</p>
                <p className="text-xs text-gray-500">Hochgeladen: 15.04.2025</p>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200">
                Analysiert
              </Badge>
            </div>
            
            <div className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
              <FileText className="text-teal-500 h-5 w-5 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium">Wasserrechnung_Q1_2025.pdf</p>
                <p className="text-xs text-gray-500">Hochgeladen: 16.04.2025</p>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200">
                Analysiert
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyAnalysis;
