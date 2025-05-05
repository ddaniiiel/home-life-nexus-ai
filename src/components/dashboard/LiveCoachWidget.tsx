
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, addHours, isBefore, isToday } from 'date-fns';
import { de } from 'date-fns/locale';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Umbrella, 
  Car, 
  Briefcase, 
  Home, 
  Coffee,
  Lightbulb,
  AlertTriangle,
  ThermometerSun,
  Wallet,
  FileText,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow
} from 'lucide-react';

interface WeatherData {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  temperature: number;
  description: string;
  recommendation?: string;
}

interface NextEvent {
  id: number;
  title: string;
  type: 'appointment' | 'task' | 'reminder';
  time: string;
  location?: string;
  date: Date;
  relevantDocuments?: string[];
  weatherDependent?: boolean;
  transportNeeded?: boolean;
}

interface ImportantNote {
  id: number;
  title: string;
  type: 'warning' | 'info' | 'reminder';
  description: string;
  priority: 'high' | 'medium' | 'low';
}

const LiveCoachWidget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('now');
  
  // Sample weather for today
  const [weather, setWeather] = useState<WeatherData>({
    condition: 'rainy',
    temperature: 12,
    description: 'Regen mit vereinzelten Schauern',
    recommendation: 'Regenschirm nicht vergessen!'
  });
  
  // Sample upcoming events
  const [upcomingEvents, setUpcomingEvents] = useState<NextEvent[]>([
    {
      id: 1,
      title: 'Arzttermin',
      type: 'appointment',
      time: '10:30',
      location: 'Praxis Dr. Müller, Hauptstraße 15',
      date: addHours(new Date(), 1),
      relevantDocuments: ['Versicherungskarte', 'Befund vom 15.04.'],
      weatherDependent: true,
      transportNeeded: true
    },
    {
      id: 2,
      title: 'Supermarkt Einkauf',
      type: 'task',
      time: '14:00',
      location: 'Edeka Stadtmitte',
      date: addHours(new Date(), 4),
      weatherDependent: true
    },
    {
      id: 3,
      title: 'Kinder von der Schule abholen',
      type: 'reminder',
      time: '15:30',
      location: 'Grundschule am Park',
      date: addHours(new Date(), 5),
      transportNeeded: true
    }
  ]);
  
  // Sample important notes or alerts
  const [importantNotes, setImportantNotes] = useState<ImportantNote[]>([
    {
      id: 1,
      title: 'Niedrige Heizungs-Temperatur im Schlafzimmer',
      type: 'warning',
      description: 'Das Fenster könnte geöffnet sein. Temperatur ist unter 17°C.',
      priority: 'medium'
    },
    {
      id: 2,
      title: 'Dokumente für Steuererklärung organisieren',
      type: 'reminder',
      description: 'Die Frist endet in 10 Tagen.',
      priority: 'high'
    }
  ]);
  
  useEffect(() => {
    // Update the current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get the next event relative to current time
  const getNextEvent = () => {
    const now = new Date();
    const futureEvents = upcomingEvents.filter(event => isBefore(now, event.date));
    return futureEvents.length > 0 ? futureEvents[0] : null;
  };
  
  const nextEvent = getNextEvent();
  
  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-5 w-5 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'snowy':
        return <CloudSnow className="h-5 w-5 text-blue-200" />;
      default:
        return <Cloud className="h-5 w-5" />;
    }
  };
  
  // Get recommendations based on next event and current conditions
  const getRecommendations = () => {
    const recommendations = [];
    
    if (nextEvent) {
      // Weather related recommendations
      if (nextEvent.weatherDependent && weather.condition === 'rainy') {
        recommendations.push({
          icon: <Umbrella className="h-5 w-5 text-blue-500" />,
          text: 'Regenschirm mitnehmen, es regnet.'
        });
      }
      
      // Transport related recommendations
      if (nextEvent.transportNeeded) {
        recommendations.push({
          icon: <Car className="h-5 w-5 text-gray-500" />,
          text: `Fahrtzeit zum ${nextEvent.location}: ca. 15 min.`
        });
      }
      
      // Document recommendations
      if (nextEvent.relevantDocuments && nextEvent.relevantDocuments.length > 0) {
        recommendations.push({
          icon: <FileText className="h-5 w-5 text-green-500" />,
          text: `Benötigte Dokumente: ${nextEvent.relevantDocuments.join(', ')}`
        });
      }
    }
    
    // Smart home related recommendations
    if (importantNotes.some(note => note.type === 'warning')) {
      const warning = importantNotes.find(note => note.type === 'warning');
      if (warning) {
        recommendations.push({
          icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
          text: warning.title
        });
      }
    }
    
    // Add a default recommendation if nothing else applies
    if (recommendations.length === 0) {
      recommendations.push({
        icon: <Coffee className="h-5 w-5 text-brown-500" />,
        text: 'Du hast etwas Zeit für dich. Wie wäre es mit einer Tasse Kaffee?'
      });
    }
    
    return recommendations;
  };
  
  const getTimeOfDayGreeting = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      return 'Guten Morgen';
    } else if (hour >= 12 && hour < 18) {
      return 'Guten Tag';
    } else {
      return 'Guten Abend';
    }
  };
  
  return (
    <Card className="border-green-100 dark:border-green-800 shadow-md">
      <CardHeader className="pb-2 flex justify-between items-start">
        <div>
          <CardTitle className="text-xl text-green-700">Dein Live-Coach</CardTitle>
          <p className="text-sm text-gray-500 mt-0">
            {format(currentTime, 'EEEE, d. MMMM', { locale: de })} • {format(currentTime, 'HH:mm')}
          </p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
          Live
        </Badge>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="now" value={activeTab} onValueChange={setActiveTab} className="mb-3">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="now">Jetzt</TabsTrigger>
            <TabsTrigger value="next">Nächstes</TabsTrigger>
            <TabsTrigger value="alerts">Wichtig</TabsTrigger>
          </TabsList>
          
          <TabsContent value="now">
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
                <h3 className="font-medium text-green-800 dark:text-green-300">{getTimeOfDayGreeting()}!</h3>
                <div className="flex items-center mt-2">
                  {getWeatherIcon(weather.condition)}
                  <span className="ml-2 text-sm">{weather.description}, {weather.temperature}°C</span>
                </div>
              </div>
              
              {nextEvent && (
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <div className="mr-3 mt-1">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Als nächstes: {nextEvent.title}</h3>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{nextEvent.time} Uhr</span>
                          {nextEvent.location && (
                            <>
                              <span className="mx-2">•</span>
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{nextEvent.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {isToday(nextEvent.date) ? 'Heute' : 'Morgen'}
                    </Badge>
                  </div>
                </div>
              )}
              
              <h3 className="font-medium text-green-700 mt-4">Empfehlungen:</h3>
              <div className="space-y-3">
                {getRecommendations().map((rec, index) => (
                  <div key={index} className="flex items-start p-3 border rounded-lg">
                    <div className="mt-0.5 mr-3">
                      {rec.icon}
                    </div>
                    <span className="text-sm">{rec.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="next">
            <div className="space-y-4">
              <h3 className="font-medium text-green-700">Dein Tagesplan:</h3>
              {upcomingEvents.map(event => (
                <div key={event.id} className="border rounded-lg p-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3 min-w-10 text-center">
                    <span className="text-green-700 dark:text-green-300 font-medium">{event.time}</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{event.title}</span>
                    {event.location && <p className="text-xs text-gray-500">{event.location}</p>}
                  </div>
                  <Badge variant="outline" className={
                    isToday(event.date) ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                  }>
                    {isToday(event.date) ? 'Heute' : 'Morgen'}
                  </Badge>
                </div>
              ))}
              <Button className="w-full mt-2" variant="outline" size="sm" asChild>
                <a href="/calendar" className="flex items-center justify-center">
                  Zum Kalender
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <div className="space-y-4">
              <h3 className="font-medium text-green-700">Wichtige Hinweise:</h3>
              {importantNotes.map(note => (
                <div 
                  key={note.id} 
                  className={`border rounded-lg p-3 ${
                    note.priority === 'high' 
                      ? 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20' 
                      : note.priority === 'medium'
                        ? 'border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-900/20'
                        : 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-3">
                      {note.type === 'warning' ? (
                        <AlertTriangle className={`h-5 w-5 ${
                          note.priority === 'high' ? 'text-red-500' : 'text-orange-500'
                        }`} />
                      ) : note.type === 'info' ? (
                        <Lightbulb className="h-5 w-5 text-blue-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{note.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{note.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="border border-dashed rounded-lg p-3 text-center text-gray-500 dark:text-gray-400">
                <p className="text-sm">Alle wichtigen Hinweise angezeigt.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LiveCoachWidget;
