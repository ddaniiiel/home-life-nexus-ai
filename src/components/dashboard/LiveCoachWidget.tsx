
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, addHours, isBefore, isToday, addDays, isPast, differenceInMinutes } from 'date-fns';
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
  CloudSnow,
  CheckCircle2,
  CalendarCheck,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface WeatherData {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  temperature: number;
  description: string;
  recommendation?: string;
}

// Enhanced interfaces with more detailed and connected information
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
  priority?: 'high' | 'medium' | 'low';
  status?: 'upcoming' | 'inProgress' | 'completed' | 'overdue';
  relatedTaskIds?: number[];  // For linking to tasks
  linkedAppointmentId?: number;  // For linking to appointments
  estimatedDuration?: number;  // in minutes
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';  // recurring pattern
  subtasks?: SubTask[];  // For complex tasks with subtasks
}

interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

interface ImportantNote {
  id: number;
  title: string;
  type: 'warning' | 'info' | 'reminder';
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
  dueDate?: Date;
  relatedEventId?: number;
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
  
  // Enhanced upcoming events with more metadata
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
      transportNeeded: true,
      priority: 'high',
      status: 'upcoming',
      estimatedDuration: 45,
      relatedTaskIds: [4]
    },
    {
      id: 2,
      title: 'Supermarkt Einkauf',
      type: 'task',
      time: '14:00',
      location: 'Edeka Stadtmitte',
      date: addHours(new Date(), 4),
      weatherDependent: true,
      priority: 'medium',
      status: 'upcoming',
      estimatedDuration: 60,
      subtasks: [
        { id: 1, title: 'Einkaufsliste erstellen', completed: true },
        { id: 2, title: 'Rabattcoupons mitnehmen', completed: false },
      ],
      recurrence: 'weekly'
    },
    {
      id: 3,
      title: 'Kinder von der Schule abholen',
      type: 'reminder',
      time: '15:30',
      location: 'Grundschule am Park',
      date: addHours(new Date(), 5),
      transportNeeded: true,
      priority: 'high',
      status: 'upcoming',
      estimatedDuration: 20,
      recurrence: 'daily'
    },
    {
      id: 4,
      title: 'Unterlagen für Arzttermin vorbereiten',
      type: 'task',
      time: '09:00',
      date: new Date(),
      priority: 'medium',
      status: 'completed',
      linkedAppointmentId: 1
    },
    {
      id: 5,
      title: 'Monatsabrechnung erstellen',
      type: 'task',
      time: '16:00',
      date: addDays(new Date(), 1),
      priority: 'high',
      status: 'upcoming',
      estimatedDuration: 120
    }
  ]);
  
  // Sample important notes or alerts with enhanced information
  const [importantNotes, setImportantNotes] = useState<ImportantNote[]>([
    {
      id: 1,
      title: 'Niedrige Heizungs-Temperatur im Schlafzimmer',
      type: 'warning',
      description: 'Das Fenster könnte geöffnet sein. Temperatur ist unter 17°C.',
      priority: 'medium',
      actionRequired: true
    },
    {
      id: 2,
      title: 'Dokumente für Steuererklärung organisieren',
      type: 'reminder',
      description: 'Die Frist endet in 10 Tagen.',
      priority: 'high',
      dueDate: addDays(new Date(), 10)
    },
    {
      id: 3,
      title: 'Terminüberschneidung am Mittwoch',
      type: 'warning',
      description: 'Der Zahnarzttermin überschneidet sich mit dem Elterngespräch.',
      priority: 'high',
      actionRequired: true,
      relatedEventId: 7
    }
  ]);
  
  useEffect(() => {
    // Update the current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get the next event relative to current time with improved sorting and priority
  const getNextEvent = () => {
    const now = new Date();
    
    // Filter out past events and sort by time and priority
    const futureEvents = upcomingEvents
      .filter(event => isBefore(now, event.date) || format(event.date, 'yyyy-MM-dd HH:mm') === format(now, 'yyyy-MM-dd HH:mm'))
      .sort((a, b) => {
        // First sort by date
        const dateComparison = a.date.getTime() - b.date.getTime();
        if (dateComparison !== 0) return dateComparison;
        
        // If same date, sort by priority
        const priorityValues = { 'high': 0, 'medium': 1, 'low': 2, undefined: 3 };
        return (priorityValues[a.priority || 'low'] - priorityValues[b.priority || 'low']);
      });
      
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
      
      // Task completion recommendations 
      const linkedTasks = upcomingEvents.filter(event => 
        event.type === 'task' && 
        (event.linkedAppointmentId === nextEvent.id || 
         (nextEvent.relatedTaskIds && nextEvent.relatedTaskIds.includes(event.id)))
      );
      
      if (linkedTasks.length > 0) {
        const incompleteTasks = linkedTasks.filter(task => task.status !== 'completed');
        if (incompleteTasks.length > 0) {
          recommendations.push({
            icon: <CheckCircle2 className="h-5 w-5 text-orange-500" />,
            text: `${incompleteTasks.length} offene Aufgabe${incompleteTasks.length > 1 ? 'n' : ''} für diesen Termin`
          });
        }
      }
      
      // Time to event recommendations
      const minutesToEvent = differenceInMinutes(nextEvent.date, currentTime);
      if (minutesToEvent <= 30 && minutesToEvent > 0) {
        recommendations.push({
          icon: <Bell className="h-5 w-5 text-red-500" />,
          text: `In ${minutesToEvent} Minute${minutesToEvent > 1 ? 'n' : ''} beginnt: ${nextEvent.title}`
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
    
    // Scheduling conflict warnings
    const conflictNote = importantNotes.find(note => note.title.includes('Terminüberschneidung'));
    if (conflictNote) {
      recommendations.push({
        icon: <CalendarCheck className="h-5 w-5 text-red-500" />,
        text: conflictNote.description
      });
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
  
  // Get event status class for visual indicators
  const getEventStatusClass = (event: NextEvent) => {
    if (event.status === 'completed') return 'bg-green-100 text-green-800 border-green-200';
    if (event.status === 'overdue') return 'bg-red-100 text-red-800 border-red-200';
    if (isPast(event.date)) return 'bg-red-50 text-red-700 border-red-100';
    if (isToday(event.date)) return 'bg-blue-50 text-blue-700 border-blue-100';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };
  
  // Get priority badge color
  const getPriorityBadgeClass = (priority?: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };
  
  const getRecurrenceText = (recurrence?: string) => {
    switch(recurrence) {
      case 'daily': return 'Täglich';
      case 'weekly': return 'Wöchentlich';
      case 'monthly': return 'Monatlich';
      default: return '';
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
            <TabsTrigger value="next">Tagesplan</TabsTrigger>
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
                        {nextEvent.type === 'appointment' ? (
                          <Calendar className="h-5 w-5 text-green-600" />
                        ) : nextEvent.type === 'task' ? (
                          <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Bell className="h-5 w-5 text-amber-600" />
                        )}
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
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline">
                        {isToday(nextEvent.date) ? 'Heute' : 'Morgen'}
                      </Badge>
                      {nextEvent.priority && (
                        <Badge variant="outline" className={getPriorityBadgeClass(nextEvent.priority)}>
                          {nextEvent.priority === 'high' ? 'Hohe Priorität' : 
                          nextEvent.priority === 'medium' ? 'Mittlere Priorität' : 'Niedrige Priorität'}
                        </Badge>
                      )}
                      {nextEvent.recurrence && nextEvent.recurrence !== 'none' && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">
                          {getRecurrenceText(nextEvent.recurrence)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {nextEvent.subtasks && nextEvent.subtasks.length > 0 && (
                    <div className="mt-3 border-t pt-3">
                      <h4 className="text-sm font-medium mb-2">Unteraufgaben:</h4>
                      <div className="space-y-1">
                        {nextEvent.subtasks.map(subtask => (
                          <div key={subtask.id} className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-2 ${subtask.completed ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                            <span className={`text-sm ${subtask.completed ? 'line-through text-gray-400' : ''}`}>
                              {subtask.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
              
              <div className="flex justify-between items-center mb-3">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">Alle</Button>
                  <Button variant="outline" size="sm" className="text-xs bg-blue-50">Termine</Button>
                  <Button variant="outline" size="sm" className="text-xs bg-green-50">Aufgaben</Button>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs">
                      Heute <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-2">
                    <div className="grid grid-cols-2 gap-1">
                      <Button variant="outline" size="sm" className="text-xs">Gestern</Button>
                      <Button variant="default" size="sm" className="text-xs">Heute</Button>
                      <Button variant="outline" size="sm" className="text-xs">Morgen</Button>
                      <Button variant="outline" size="sm" className="text-xs">Diese Woche</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Timeline view with vertical line connecting events */}
              <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-6 ml-2">
                {upcomingEvents
                  .filter(event => isToday(event.date))
                  .sort((a, b) => {
                    // Convert time strings to date objects for comparison
                    const [aHour, aMinute] = a.time.split(':').map(Number);
                    const [bHour, bMinute] = b.time.split(':').map(Number);
                    return (aHour * 60 + aMinute) - (bHour * 60 + bMinute);
                  })
                  .map(event => (
                    <div 
                      key={event.id} 
                      className={`relative -ml-8 pl-6 ${getEventStatusClass(event)} rounded-lg p-3 hover:shadow-sm transition-shadow`}
                    >
                      <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-8 h-[2px] bg-gray-200 dark:bg-gray-700"></div>
                      <div className="absolute -left-9 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800"></div>
                      
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="bg-white p-2 rounded-lg mr-3 min-w-10 text-center">
                            <span className="text-green-700 dark:text-green-300 font-medium">{event.time}</span>
                          </div>
                          <div>
                            <span className="font-medium">{event.title}</span>
                            {event.location && <p className="text-xs text-gray-500">{event.location}</p>}
                            {event.estimatedDuration && (
                              <p className="text-xs text-gray-500 mt-1">
                                Dauer: {event.estimatedDuration} Min.
                              </p>
                            )}
                            {event.relatedTaskIds && event.relatedTaskIds.length > 0 && (
                              <div className="mt-1 flex items-center">
                                <CheckCircle2 className="h-3 w-3 text-blue-500 mr-1" />
                                <span className="text-xs text-blue-600">
                                  {event.relatedTaskIds.length} zugehörige Aufgaben
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge variant="outline" className="text-xs">
                            {event.type === 'appointment' ? 'Termin' : 
                             event.type === 'task' ? 'Aufgabe' : 'Erinnerung'}
                          </Badge>
                          {event.priority && (
                            <Badge variant="outline" className={`text-xs ${getPriorityBadgeClass(event.priority)}`}>
                              {event.priority === 'high' ? 'Hoch' : 
                               event.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                }
                
                {upcomingEvents.filter(event => isToday(event.date)).length === 0 && (
                  <div className="pl-6 py-4 text-center text-gray-500">
                    <p>Keine weiteren Einträge für heute.</p>
                  </div>
                )}
              </div>
              
              <Button className="w-full mt-2" variant="outline" size="sm" asChild>
                <Link to="/calendar" className="flex items-center justify-center">
                  Zum Kalender
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{note.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{note.description}</p>
                      
                      {note.dueDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Fällig: {format(note.dueDate, 'dd.MM.yyyy')}
                        </p>
                      )}
                      
                      {note.relatedEventId && (
                        <div className="mt-2">
                          <Button variant="outline" size="sm" className="text-xs h-7">
                            Zum Termin
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {note.actionRequired && (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        Aktion erforderlich
                      </Badge>
                    )}
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
