
import React from 'react';
import { usePerformanceMonitor } from '@/components/performance/LazyComponent';
import ModernLayout from '@/components/modern/ModernLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, Thermometer, Lightbulb, Shield, Users, 
  Calendar, CheckSquare, TrendingUp, Bell 
} from 'lucide-react';

const Dashboard = () => {
  usePerformanceMonitor();

  const quickActions = [
    { name: 'Alle Lichter', icon: Lightbulb, color: 'bg-yellow-500', status: '12 an' },
    { name: 'Heizung', icon: Thermometer, color: 'bg-blue-500', status: '21°C' },
    { name: 'Sicherheit', icon: Shield, color: 'bg-red-500', status: 'Aktiv' },
    { name: 'Familie', icon: Users, color: 'bg-green-500', status: '4 zuhause' },
  ];

  const upcomingTasks = [
    { title: 'Stromrechnung zahlen', due: 'Morgen', priority: 'high' },
    { title: 'Auto zur Inspektion', due: 'Fr, 20. Dez', priority: 'medium' },
    { title: 'Weihnachtsgeschenke kaufen', due: 'So, 22. Dez', priority: 'low' },
  ];

  const recentActivity = [
    { time: '10:30', action: 'Waschmaschine fertig', type: 'notification' },
    { time: '09:15', action: 'Emma hat Schule verlassen', type: 'location' },
    { time: '08:45', action: 'Heizung angepasst: 21°C', type: 'automation' },
    { time: '08:00', action: 'Guten Morgen Routine gestartet', type: 'scene' },
  ];

  return (
    <ModernLayout 
      title="Willkommen, Thomas!" 
      subtitle={`Heute ist ${new Date().toLocaleDateString('de-DE', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`}
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Schnellzugriff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.color} text-white`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{action.name}</p>
                    <p className="text-xs text-gray-500">{action.status}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather & Climate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="w-5 h-5 mr-2 text-homepilot-primary" />
                  Zuhause Übersicht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Thermometer className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">21°C</p>
                    <p className="text-sm text-gray-600">Temperatur</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-600">Lichter an</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">-15%</p>
                    <p className="text-sm text-gray-600">Energie heute</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-homepilot-primary" />
                  Heute geplant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">Zahnarzt Termin</p>
                      <p className="text-sm text-gray-600">14:30 - Max</p>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">Einkaufen</p>
                      <p className="text-sm text-gray-600">Nachmittag - Lisa</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckSquare className="w-5 h-5 mr-2 text-homepilot-primary" />
                  Anstehende Aufgaben
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.due}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-homepilot-primary" />
                  Letzte Aktivitäten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="text-xs text-gray-500 w-12 flex-shrink-0">{activity.time}</div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
};

export default Dashboard;
