
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { BarChart3, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

const Reports = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Sample data for charts
  const energyData = [
    { month: 'Jan', strom: 124, wasser: 45, heizung: 195 },
    { month: 'Feb', strom: 118, wasser: 48, heizung: 180 },
    { month: 'Mar', strom: 110, wasser: 52, heizung: 150 },
    { month: 'Apr', strom: 105, wasser: 55, heizung: 120 },
    { month: 'Mai', strom: 100, wasser: 60, heizung: 85 },
    { month: 'Jun', strom: 95, wasser: 65, heizung: 40 },
    { month: 'Jul', strom: 90, wasser: 70, heizung: 30 },
    { month: 'Aug', strom: 92, wasser: 68, heizung: 25 },
    { month: 'Sep', strom: 97, wasser: 62, heizung: 45 },
    { month: 'Okt', strom: 103, wasser: 59, heizung: 75 },
    { month: 'Nov', strom: 115, wasser: 53, heizung: 110 },
    { month: 'Dez', strom: 130, wasser: 47, heizung: 170 },
  ];
  
  const expensesByCategory = [
    { name: 'Wohnen', value: 1200 },
    { name: 'Lebensmittel', value: 500 },
    { name: 'Transport', value: 300 },
    { name: 'Freizeit', value: 350 },
    { name: 'Versicherungen', value: 200 },
    { name: 'Sonstiges', value: 250 },
  ];
  
  const tasksCompletionData = [
    { name: 'Jan', completed: 35, total: 42 },
    { name: 'Feb', completed: 28, total: 40 },
    { name: 'Mar', completed: 34, total: 45 },
    { name: 'Apr', completed: 39, total: 48 },
    { name: 'Mai', completed: 42, total: 52 },
    { name: 'Jun', completed: 47, total: 55 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <BarChart3 className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Berichte</h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Haushalts-Übersicht</h2>
              <p className="text-gray-500 dark:text-gray-400">Daten und Analysen für deinen Haushalt</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" /> Exportieren
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="energy">
            <TabsList className="mb-8">
              <TabsTrigger value="energy">Energieverbrauch</TabsTrigger>
              <TabsTrigger value="expenses">Ausgabenverteilung</TabsTrigger>
              <TabsTrigger value="tasks">Aufgaben</TabsTrigger>
            </TabsList>
            
            <TabsContent value="energy">
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Energieverbrauch im Jahresverlauf</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={energyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="strom" name="Strom (kWh)" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                        <Line type="monotone" dataKey="wasser" name="Wasser (m³)" stroke="#82ca9d" strokeWidth={2} />
                        <Line type="monotone" dataKey="heizung" name="Heizung (kWh)" stroke="#ff8042" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-base font-medium mb-2">Durchschnittlicher Stromverbrauch</h4>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">106.5</span>
                      <span className="text-gray-500 mb-1">kWh/Monat</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">-5% im Vergleich zum Vorjahr</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-base font-medium mb-2">Durchschnittlicher Wasserverbrauch</h4>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">57.0</span>
                      <span className="text-gray-500 mb-1">m³/Monat</span>
                    </div>
                    <p className="text-xs text-red-600 mt-1">+3% im Vergleich zum Vorjahr</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-base font-medium mb-2">Durchschnittlicher Heizverbrauch</h4>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">102.1</span>
                      <span className="text-gray-500 mb-1">kWh/Monat</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">-8% im Vergleich zum Vorjahr</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="expenses">
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Ausgabenverteilung nach Kategorien</h3>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expensesByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={130}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {expensesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Ausgaben nach Kategorien</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategorie</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Betrag</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prozent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {expensesByCategory.map((category, index) => {
                        const total = expensesByCategory.reduce((sum, item) => sum + item.value, 0);
                        const percent = ((category.value / total) * 100).toFixed(1);
                        
                        return (
                          <tr key={index}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="font-medium">{category.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">{category.value.toFixed(2)} €</td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">{percent}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left font-medium">Gesamt</th>
                        <th className="px-4 py-3 text-right font-medium">
                          {expensesByCategory.reduce((sum, item) => sum + item.value, 0).toFixed(2)} €
                        </th>
                        <th className="px-4 py-3 text-right font-medium">100%</th>
                      </tr>
                    </tfoot>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Erledigte Aufgaben im Zeitverlauf</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={tasksCompletionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" name="Gesamte Aufgaben" fill="#8884d8" />
                        <Bar dataKey="completed" name="Erledigte Aufgaben" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-base font-medium mb-3">Aufgaben-Zusammenfassung</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Durchschnittliche Erledigungsrate</p>
                        <div className="flex items-end gap-1">
                          <span className="text-xl font-bold text-green-600">
                            {Math.round(tasksCompletionData.reduce((sum, item) => sum + (item.completed / item.total), 0) / tasksCompletionData.length * 100)}%
                          </span>
                          <span className="text-sm text-gray-500">der Aufgaben</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Aufgaben pro Monat</p>
                        <div className="flex items-end gap-1">
                          <span className="text-xl font-bold">
                            {Math.round(tasksCompletionData.reduce((sum, item) => sum + item.total, 0) / tasksCompletionData.length)}
                          </span>
                          <span className="text-sm text-gray-500">im Durchschnitt</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Produktivität</p>
                        <div className="flex items-end gap-1">
                          <span className="text-xl font-bold text-green-600">+12%</span>
                          <span className="text-sm text-gray-500">zum Vorjahr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Reports;
