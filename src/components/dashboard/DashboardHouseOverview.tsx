
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Thermometer, Droplets, Zap, Sun, Cloud, AlertTriangle, Users, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  image: string;
  status: string;
  lastActive: string;
}

interface DashboardHouseOverviewProps {
  familyMembers: FamilyMember[];
}

const DashboardHouseOverview = ({ familyMembers }: DashboardHouseOverviewProps) => {
  // Erweiterte Haus-Status-Daten
  const houseStatus = {
    temperature: 21.5,
    humidity: 45,
    powerUsage: 2.8, // kW aktuell
    dailyPowerUsage: 18.5, // kWh heute
    weather: {
      condition: 'sunny',
      temperature: 18,
      location: 'Zürich'
    },
    alerts: [
      { type: 'temperature', message: 'Temperatur Alarm aktiv', severity: 'warning' },
      { type: 'humidity', message: 'Luftfeuchtigkeit optimal', severity: 'info' }
    ],
    security: {
      armed: true,
      lastCheck: '14:30'
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-5 w-5 text-gray-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'warning':
        return 'destructive' as const;
      case 'info':
        return 'secondary' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Hausübersicht</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Familienübersicht */}
        <Card className="lg:col-span-2 border-green-100 dark:border-green-800 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-green-700">
              <Users className="h-5 w-5 mr-2" />
              Familie & Bewohner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-green-50 dark:bg-green-950 hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
                  <div className="relative">
                    <OptimizedImage
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-200 dark:border-green-700"
                      priority={true}
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      member.status === 'Zuhause' ? 'bg-green-500' : 
                      member.status === 'Im Büro' ? 'bg-blue-500' :
                      member.status === 'In der Schule' ? 'bg-yellow-500' :
                      member.status === 'Beim Sport' ? 'bg-orange-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                    <p className="text-xs text-gray-600 mt-1">{member.status}</p>
                    <p className="text-xs text-gray-400">{member.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Haus-Status */}
        <Card className="border-green-100 dark:border-green-800 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-green-700">
              <Home className="h-5 w-5 mr-2" />
              Haus-Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Wetter */}
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center space-x-3">
                {getWeatherIcon(houseStatus.weather.condition)}
                <div>
                  <p className="font-medium text-sm">Wetter {houseStatus.weather.location}</p>
                  <p className="text-xs text-gray-600">{houseStatus.weather.temperature}°C • Sonnig</p>
                </div>
              </div>
            </div>

            {/* Temperatur & Luftfeuchtigkeit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Temperatur</span>
                </div>
                <span className="font-medium">{houseStatus.temperature}°C</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Luftfeuchtigkeit</span>
                </div>
                <span className="font-medium">{houseStatus.humidity}%</span>
              </div>
            </div>

            {/* Stromverbrauch */}
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Stromverbrauch</span>
                </div>
                <Activity className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Aktuell:</span>
                  <span className="font-medium">{houseStatus.powerUsage} kW</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Heute:</span>
                  <span className="font-medium">{houseStatus.dailyPowerUsage} kWh</span>
                </div>
              </div>
            </div>

            {/* Status-Meldungen */}
            <div className="space-y-2">
              {houseStatus.alerts.map((alert, index) => (
                <Badge 
                  key={index} 
                  variant={getStatusBadgeVariant(alert.severity)}
                  className="w-full justify-center text-xs py-1"
                >
                  {alert.severity === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {alert.message}
                </Badge>
              ))}
            </div>

            {/* Sicherheitsstatus */}
            <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm">Sicherheit aktiv</span>
              </div>
              <span className="text-xs text-gray-500">seit {houseStatus.security.lastCheck}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHouseOverview;
