
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalendarIcon, Download, Upload, Lightbulb, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const EnergyAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const formattedDate = date 
    ? selectedPeriod === 'year' 
      ? format(date, 'yyyy', { locale: de })
      : selectedPeriod === 'month'
        ? format(date, 'MMMM yyyy', { locale: de })
        : format(date, 'MMMM yyyy', { locale: de })
    : '';
  
  // Sample data for energy usage
  const monthlyData = [
    { day: '01', usage: 12.4, average: 11.2, peak: 'Abend' },
    { day: '02', usage: 13.1, average: 11.2, peak: 'Morgen' },
    { day: '03', usage: 11.8, average: 11.2, peak: 'Abend' },
    { day: '04', usage: 11.5, average: 11.2, peak: 'Abend' },
    { day: '05', usage: 12.2, average: 11.2, peak: 'Abend' },
    { day: '06', usage: 10.9, average: 11.2, peak: 'Abend' },
    { day: '07', usage: 10.6, average: 11.2, peak: 'Abend' },
    { day: '08', usage: 11.3, average: 11.2, peak: 'Abend' },
    { day: '09', usage: 12.0, average: 11.2, peak: 'Abend' },
    { day: '10', usage: 12.7, average: 11.2, peak: 'Abend' },
    { day: '11', usage: 13.2, average: 11.2, peak: 'Morgen' },
    { day: '12', usage: 12.8, average: 11.2, peak: 'Abend' },
    { day: '13', usage: 11.9, average: 11.2, peak: 'Abend' },
    { day: '14', usage: 11.4, average: 11.2, peak: 'Abend' },
    { day: '15', usage: 11.0, average: 11.2, peak: 'Mittag' },
    { day: '16', usage: 10.5, average: 11.2, peak: 'Abend' },
    { day: '17', usage: 10.8, average: 11.2, peak: 'Abend' },
    { day: '18', usage: 11.1, average: 11.2, peak: 'Abend' },
    { day: '19', usage: 11.6, average: 11.2, peak: 'Abend' },
    { day: '20', usage: 12.1, average: 11.2, peak: 'Abend' },
    { day: '21', usage: 12.5, average: 11.2, peak: 'Abend' },
    { day: '22', usage: 12.9, average: 11.2, peak: 'Abend' },
    { day: '23', usage: 13.0, average: 11.2, peak: 'Mittag' },
    { day: '24', usage: 12.6, average: 11.2, peak: 'Abend' },
    { day: '25', usage: 12.3, average: 11.2, peak: 'Abend' },
    { day: '26', usage: 11.7, average: 11.2, peak: 'Abend' },
    { day: '27', usage: 11.2, average: 11.2, peak: 'Abend' },
    { day: '28', usage: 10.7, average: 11.2, peak: 'Abend' },
    { day: '29', usage: 10.4, average: 11.2, peak: 'Morgen' },
    { day: '30', usage: 10.3, average: 11.2, peak: 'Abend' },
  ];

  const yearlyData = [
    { month: 'Jan', usage: 365, average: 340 },
    { month: 'Feb', usage: 340, average: 340 },
    { month: 'Mär', usage: 335, average: 340 },
    { month: 'Apr', usage: 310, average: 340 },
    { month: 'Mai', usage: 290, average: 340 },
    { month: 'Jun', usage: 280, average: 340 },
    { month: 'Jul', usage: 270, average: 340 },
    { month: 'Aug', usage: 275, average: 340 },
    { month: 'Sep', usage: 300, average: 340 },
    { month: 'Okt', usage: 320, average: 340 },
    { month: 'Nov', usage: 340, average: 340 },
    { month: 'Dez', usage: 370, average: 340 },
  ];
  
  // Distribution by device
  const deviceData = [
    { name: 'Heizung', usage: 40, color: '#FF6B6B' },
    { name: 'Kühlgeräte', usage: 20, color: '#4ECDC4' },
    { name: 'Beleuchtung', usage: 15, color: '#FFD166' },
    { name: 'Unterhaltung', usage: 10, color: '#6A8EAE' },
    { name: 'Kochen', usage: 8, color: '#F9A826' },
    { name: 'Andere', usage: 7, color: '#9D9D9D' },
  ];
  
  // Distribution by time
  const timeData = [
    { time: '00-04', usage: 5 },
    { time: '04-08', usage: 12 },
    { time: '08-12', usage: 20 },
    { time: '12-16', usage: 18 },
    { time: '16-20', usage: 25 },
    { time: '20-24', usage: 20 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energieverbrauch Analyse</CardTitle>
        <CardDescription>
          Analysiere und verstehe deinen Energieverbrauch für bessere Effizienz
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Select defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Zeitraum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monat</SelectItem>
                <SelectItem value="year">Jahr</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formattedDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={de}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md flex items-start space-x-3">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-800">Analysiere deine Rechnungen für präzise Daten</p>
            <p className="text-xs text-yellow-700 mt-1">
              Lade deine Energieabrechnungen hoch oder verbinde einen Smart Meter für genauere Verbrauchsanalysen.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="usage">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="usage">Verbrauch</TabsTrigger>
            <TabsTrigger value="devices">Nach Geräten</TabsTrigger>
            <TabsTrigger value="time">Nach Tageszeit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedPeriod === 'month' ? monthlyData : yearlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={selectedPeriod === 'month' ? 'day' : 'month'} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} kWh`, 'Verbrauch']} 
                    labelFormatter={(label) => selectedPeriod === 'month' ? `Tag ${label}` : label}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="usage"
                    name="Verbrauch (kWh)"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    name="Durchschnitt (kWh)"
                    stroke="#6b7280"
                    strokeDasharray="5 5"
                    strokeWidth={1.5}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="text-sm text-gray-500 mb-1">Gesamtverbrauch</div>
                <div className="text-2xl font-bold">
                  {selectedPeriod === 'month' 
                    ? `${monthlyData.reduce((sum, item) => sum + item.usage, 0).toFixed(1)} kWh`
                    : `${yearlyData.reduce((sum, item) => sum + item.usage, 0)} kWh`
                  }
                </div>
                <div className="text-xs text-green-600 flex items-center">
                  <span>-3.2% im Vergleich zum Vorjahr</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="text-sm text-gray-500 mb-1">Durchschnittsverbrauch</div>
                <div className="text-2xl font-bold">
                  {selectedPeriod === 'month' 
                    ? `${(monthlyData.reduce((sum, item) => sum + item.usage, 0) / monthlyData.length).toFixed(1)} kWh/Tag`
                    : `${(yearlyData.reduce((sum, item) => sum + item.usage, 0) / 12).toFixed(0)} kWh/Monat`
                  }
                </div>
                <div className="text-xs text-green-600">
                  Energieeffizienzklasse B
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="text-sm text-gray-500 mb-1">CO2-Fußabdruck</div>
                <div className="text-2xl font-bold">
                  {selectedPeriod === 'month' 
                    ? `${(monthlyData.reduce((sum, item) => sum + item.usage, 0) * 0.4).toFixed(0)} kg`
                    : `${(yearlyData.reduce((sum, item) => sum + item.usage, 0) * 0.4).toFixed(0)} kg`
                  }
                </div>
                <div className="text-xs text-green-600">
                  5% unter Durchschnitt
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="devices">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deviceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Verbrauch']} />
                      <Bar 
                        dataKey="usage" 
                        name="Verbrauch" 
                        radius={[0, 6, 6, 0]}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <h3 className="text-lg font-medium">Geräte Ranking</h3>
                <div className="space-y-3">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: device.color }}
                      ></div>
                      <div className="flex-1 text-sm">{device.name}</div>
                      <div className="text-sm font-medium">{device.usage}%</div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                    <div>
                      <h4 className="font-medium text-sm">Energiespartipp</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Die größten Energieverbraucher sind Heizung und Kühlgeräte. Optimiere die Temperatureinstellungen, um bis zu 15% Energie zu sparen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="time">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Verbrauch']} />
                  <Bar 
                    dataKey="usage" 
                    name="Verbrauch" 
                    fill="#10b981" 
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Tagesverlauf Analyse</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-sm mb-2">Spitzenzeit</h4>
                  <div className="text-xl font-bold">16:00 - 20:00 Uhr</div>
                  <p className="text-xs text-gray-500 mt-1">
                    25% des Tagesverbrauchs
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-sm mb-2">Niedrigste Nutzung</h4>
                  <div className="text-xl font-bold">00:00 - 04:00 Uhr</div>
                  <p className="text-xs text-gray-500 mt-1">
                    5% des Tagesverbrauchs
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-sm mb-2">Optimierungspotenzial</h4>
                  <div className="text-xl font-bold text-green-600">~ 15%</div>
                  <p className="text-xs text-gray-500 mt-1">
                    Durch Verlagerung in Nebenzeiten
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                  <div>
                    <h4 className="font-medium text-sm">Energiespartipp</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Versuche energieintensive Aktivitäten (Waschen, Trocknen) in Nebenzeiten zu verlegen, wo möglich. Nutze Timer-Funktionen für Geräte, um sie zu optimalen Zeiten zu betreiben.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnergyAnalysis;
