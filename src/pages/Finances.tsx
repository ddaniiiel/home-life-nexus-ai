
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { CreditCard, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
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

const Finances = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Sample data for charts
  const monthlyData = [
    { name: 'Jan', income: 3200, expenses: 2700 },
    { name: 'Feb', income: 3100, expenses: 2900 },
    { name: 'Mar', income: 3400, expenses: 3000 },
    { name: 'Apr', income: 3300, expenses: 2800 },
    { name: 'Mai', income: 3500, expenses: 2600 },
    { name: 'Jun', income: 3700, expenses: 2900 },
  ];
  
  const expensesData = [
    { name: 'Wohnen', value: 1200, color: '#8884d8' },
    { name: 'Lebensmittel', value: 500, color: '#82ca9d' },
    { name: 'Transport', value: 300, color: '#ffc658' },
    { name: 'Freizeit', value: 350, color: '#ff8042' },
    { name: 'Sonstiges', value: 450, color: '#0088fe' },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

  const budgetCategories = [
    { category: 'Lebensmittel', spent: 450, budget: 500, percent: 90 },
    { category: 'Transport', spent: 220, budget: 300, percent: 73 },
    { category: 'Freizeit', spent: 310, budget: 350, percent: 89 },
    { category: 'Sparen', spent: 500, budget: 500, percent: 100 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <CreditCard className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Finanzen</h1>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Monatliches Einkommen</span>
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">3.500,00 €</h3>
                <p className="text-xs text-green-600 dark:text-green-400">+5,7% seit letztem Monat</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Monatliche Ausgaben</span>
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">2.600,00 €</h3>
                <p className="text-xs text-red-600 dark:text-red-400">-3,2% seit letztem Monat</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Ersparnisse</span>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">12.450,00 €</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400">+900 € seit letztem Monat</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Sparrate</span>
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">25,7%</h3>
                <p className="text-xs text-purple-600 dark:text-purple-400">+2,1% seit letztem Monat</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="col-span-1">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Einkommen & Ausgaben</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" name="Einkommen" fill="#82ca9d" />
                      <Bar dataKey="expenses" name="Ausgaben" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Ausgabenkategorien</h3>
                <div className="h-72 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expensesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expensesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Budget tracking */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-6">Budget-Tracking</h3>
              <div className="space-y-6">
                {budgetCategories.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-gray-500">
                        {item.spent} € / {item.budget} €
                      </span>
                    </div>
                    <Progress value={item.percent} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Finances;
