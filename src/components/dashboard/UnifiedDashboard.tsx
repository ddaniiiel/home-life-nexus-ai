
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, Filter, AlertTriangle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { 
  format, 
  isToday, 
  isTomorrow, 
  isPast, 
  isThisWeek, 
  addDays, 
  differenceInMinutes,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { de } from 'date-fns/locale';
import { 
  Task, 
  Appointment, 
  sortByDate, 
  sortByPriority, 
  checkForConflicts 
} from '@/models/TaskAppointment';
import LiveCoachWidget from './LiveCoachWidget';

interface UnifiedDashboardProps {
  tasks: Task[];
  appointments: Appointment[];
  onTaskComplete: (id: number) => void;
  onAppointmentSelect: (id: number) => void;
  onTaskSelect: (id: number) => void;
}

type FilterType = 'all' | 'today' | 'tomorrow' | 'thisWeek' | 'overdue' | 'completed';
type ItemType = 'all' | 'tasks' | 'appointments';

const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({
  tasks,
  appointments,
  onTaskComplete,
  onAppointmentSelect,
  onTaskSelect
}) => {
  const [dateFilter, setDateFilter] = useState<FilterType>('all');
  const [typeFilter, setTypeFilter] = useState<ItemType>('all');
  const [priorityFilters, setPriorityFilters] = useState<string[]>(['high', 'medium', 'low']);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle priority filter toggle
  const togglePriorityFilter = (priority: string) => {
    setPriorityFilters(prev => {
      if (prev.includes(priority)) {
        return prev.filter(p => p !== priority);
      } else {
        return [...prev, priority];
      }
    });
  };
  
  // Combine and filter tasks and appointments
  const filteredItems = () => {
    let filteredTasks: Task[] = [];
    let filteredAppointments: Appointment[] = [];
    
    // Filter tasks by type
    if (typeFilter === 'all' || typeFilter === 'tasks') {
      filteredTasks = tasks.filter(task => {
        // Date filter
        if (dateFilter === 'today') return task.dueDate && isToday(task.dueDate);
        if (dateFilter === 'tomorrow') return task.dueDate && isTomorrow(task.dueDate);
        if (dateFilter === 'thisWeek') return task.dueDate && isThisWeek(task.dueDate);
        if (dateFilter === 'overdue') return task.dueDate && isPast(task.dueDate) && !task.completed;
        if (dateFilter === 'completed') return task.completed;
        
        // Priority filter
        if (!task.priority || !priorityFilters.includes(task.priority)) return false;
        
        // Search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            task.title.toLowerCase().includes(query) || 
            (task.description && task.description.toLowerCase().includes(query))
          );
        }
        
        return true;
      });
    }
    
    // Filter appointments by type
    if (typeFilter === 'all' || typeFilter === 'appointments') {
      filteredAppointments = appointments.filter(appointment => {
        // Date filter
        if (dateFilter === 'today') return isToday(appointment.startDate);
        if (dateFilter === 'tomorrow') return isTomorrow(appointment.startDate);
        if (dateFilter === 'thisWeek') return isThisWeek(appointment.startDate);
        if (dateFilter === 'overdue') return isPast(appointment.startDate);
        if (dateFilter === 'completed') return appointment.status === 'completed';
        
        // Priority filter
        if (!appointment.priority || !priorityFilters.includes(appointment.priority)) return false;
        
        // Search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            appointment.title.toLowerCase().includes(query) || 
            (appointment.description && appointment.description.toLowerCase().includes(query)) ||
            (appointment.location && appointment.location.toLowerCase().includes(query))
          );
        }
        
        return true;
      });
    }
    
    // Combine and sort
    const combined = [
      ...filteredTasks.map(task => ({
        ...task,
        itemType: 'task' as const,
        sortDate: task.dueDate || new Date()
      })),
      ...filteredAppointments.map(appointment => ({
        ...appointment,
        itemType: 'appointment' as const,
        sortDate: appointment.startDate
      }))
    ];
    
    // Sort by date then priority
    combined.sort((a, b) => {
      const dateComparison = sortByDate(
        { startDate: a.sortDate, dueDate: a.sortDate },
        { startDate: b.sortDate, dueDate: b.sortDate }
      );
      
      if (dateComparison === 0) {
        return sortByPriority(a, b);
      }
      
      return dateComparison;
    });
    
    return combined;
  };
  
  // Check for scheduling conflicts
  const conflicts = checkForConflicts(appointments);
  const hasConflicts = conflicts.length > 0;
  
  // Get the next upcoming item (task or appointment)
  const getNextUpcomingItem = () => {
    const now = new Date();
    
    // Find upcoming appointments
    const upcomingAppointments = appointments
      .filter(app => isBefore(now, app.startDate))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    
    // Find upcoming tasks
    const upcomingTasks = tasks
      .filter(task => task.dueDate && isBefore(now, task.dueDate) && !task.completed)
      .sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          return a.dueDate.getTime() - b.dueDate.getTime();
        }
        return 0;
      });
    
    // Get the earliest item
    if (upcomingAppointments.length > 0 && upcomingTasks.length > 0) {
      const nextAppointment = upcomingAppointments[0];
      const nextTask = upcomingTasks[0];
      
      if (nextTask.dueDate && nextAppointment.startDate) {
        return nextTask.dueDate < nextAppointment.startDate
          ? { ...nextTask, itemType: 'task' as const }
          : { ...nextAppointment, itemType: 'appointment' as const };
      }
    }
    
    // If only one type has upcoming items
    if (upcomingAppointments.length > 0) {
      return { ...upcomingAppointments[0], itemType: 'appointment' as const };
    }
    
    if (upcomingTasks.length > 0) {
      return { ...upcomingTasks[0], itemType: 'task' as const };
    }
    
    return null;
  };
  
  const nextItem = getNextUpcomingItem();
  
  // Format date display for items
  const getDateDisplay = (date?: Date) => {
    if (!date) return '';
    
    if (isToday(date)) {
      return `Heute, ${format(date, 'HH:mm', { locale: de })}`;
    } else if (isTomorrow(date)) {
      return `Morgen, ${format(date, 'HH:mm', { locale: de })}`;
    }
    
    return format(date, 'EEE, d. MMM, HH:mm', { locale: de });
  };
  
  // Get time remaining text
  const getTimeRemainingText = (date?: Date) => {
    if (!date) return '';
    
    const now = new Date();
    const minutes = differenceInMinutes(date, now);
    
    if (minutes < 0) return 'Überfällig';
    if (minutes < 60) return `In ${minutes} Min.`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours < 24) {
      return `In ${hours} Std.${remainingMinutes > 0 ? ` ${remainingMinutes} Min.` : ''}`;
    }
    
    const days = Math.floor(hours / 24);
    return `In ${days} Tag${days > 1 ? 'en' : ''}`;
  };
  
  // Get priority badge class
  const getPriorityBadgeClass = (priority?: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* LiveCoach Widget */}
      <LiveCoachWidget />
      
      {/* Upcoming Alert */}
      {nextItem && (
        <Card className="border-l-4 border-l-blue-500">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                {nextItem.itemType === 'task' ? (
                  <CheckCircle2 className="h-6 w-6 text-blue-500" />
                ) : (
                  <Calendar className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  Nächster {nextItem.itemType === 'task' ? 'Aufgabe' : 'Termin'}: {nextItem.title}
                </h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {nextItem.itemType === 'task' && 'dueDate' in nextItem
                      ? getDateDisplay(nextItem.dueDate)
                      : nextItem.itemType === 'appointment' && 'startDate' in nextItem
                        ? getDateDisplay(nextItem.startDate)
                        : ''
                    }
                  </span>
                  {nextItem.itemType === 'appointment' && 'location' in nextItem && nextItem.location && (
                    <>
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{nextItem.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge className="mb-2">
                {nextItem.itemType === 'task' && 'dueDate' in nextItem
                  ? getTimeRemainingText(nextItem.dueDate)
                  : nextItem.itemType === 'appointment' && 'startDate' in nextItem
                    ? getTimeRemainingText(nextItem.startDate)
                    : ''
                }
              </Badge>
              <Button size="sm" onClick={() => nextItem.itemType === 'task' ? onTaskSelect(nextItem.id) : onAppointmentSelect(nextItem.id)}>
                Details
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Conflicts Warning */}
      {hasConflicts && (
        <Card className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-300">
                  Terminüberschneidungen gefunden
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  Es gibt {conflicts.length} Terminkonflikt{conflicts.length > 1 ? 'e' : ''}. Bitte überprüfe deinen Kalender.
                </p>
                <div className="mt-3">
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-100">
                    Konflikte anzeigen
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Aufgaben & Termine</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div className="flex items-center space-x-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Suchen..." 
                  className="pl-8 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="h-4 w-4 mr-1" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Zeitraum</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === 'all'}
                    onCheckedChange={() => setDateFilter('all')}
                  >
                    Alle
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === 'today'}
                    onCheckedChange={() => setDateFilter('today')}
                  >
                    Heute
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === 'tomorrow'}
                    onCheckedChange={() => setDateFilter('tomorrow')}
                  >
                    Morgen
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === 'thisWeek'}
                    onCheckedChange={() => setDateFilter('thisWeek')}
                  >
                    Diese Woche
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === 'overdue'}
                    onCheckedChange={() => setDateFilter('overdue')}
                  >
                    Überfällig
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={dateFilter === 'completed'}
                    onCheckedChange={() => setDateFilter('completed')}
                  >
                    Erledigt
                  </DropdownMenuCheckboxItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Typ</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={typeFilter === 'all'}
                    onCheckedChange={() => setTypeFilter('all')}
                  >
                    Alle
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={typeFilter === 'tasks'}
                    onCheckedChange={() => setTypeFilter('tasks')}
                  >
                    Nur Aufgaben
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={typeFilter === 'appointments'}
                    onCheckedChange={() => setTypeFilter('appointments')}
                  >
                    Nur Termine
                  </DropdownMenuCheckboxItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Priorität</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={priorityFilters.includes('high')}
                    onCheckedChange={() => togglePriorityFilter('high')}
                  >
                    Hoch
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={priorityFilters.includes('medium')}
                    onCheckedChange={() => togglePriorityFilter('medium')}
                  >
                    Mittel
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={priorityFilters.includes('low')}
                    onCheckedChange={() => togglePriorityFilter('low')}
                  >
                    Niedrig
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Tabs defaultValue="list" className="w-full sm:w-auto">
              <TabsList className="h-9">
                <TabsTrigger value="list" className="text-xs px-3">Liste</TabsTrigger>
                <TabsTrigger value="calendar" className="text-xs px-3">Kalender</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Items List */}
          <div className="space-y-2">
            {filteredItems().length > 0 ? (
              filteredItems().map(item => (
                <div 
                  key={`${item.itemType}-${item.id}`} 
                  className={`flex items-center border rounded-lg p-3 ${
                    item.itemType === 'task' && 'completed' in item && item.completed
                      ? 'bg-green-50 border-green-200'
                      : item.itemType === 'task' && 'dueDate' in item && isPast(item.dueDate || new Date())
                        ? 'bg-red-50 border-red-200'
                        : 'hover:bg-gray-50'
                  }`}
                >
                  {item.itemType === 'task' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 mr-3" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onTaskComplete(item.id);
                      }}
                    >
                      <CheckCircle2 
                        className={`h-5 w-5 ${
                          'completed' in item && item.completed 
                            ? 'text-green-500 fill-green-500' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                  )}
                  
                  {item.itemType === 'appointment' && (
                    <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                  )}
                  
                  <div className="flex-1 min-w-0" onClick={() => item.itemType === 'task' ? onTaskSelect(item.id) : onAppointmentSelect(item.id)}>
                    <p className={`font-medium truncate ${
                      item.itemType === 'task' && 'completed' in item && item.completed 
                        ? 'line-through text-gray-500' 
                        : ''
                    }`}>
                      {item.title}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-1 flex-wrap gap-y-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {item.itemType === 'task' && 'dueDate' in item
                          ? getDateDisplay(item.dueDate)
                          : item.itemType === 'appointment' && 'startDate' in item
                            ? getDateDisplay(item.startDate)
                            : ''
                        }
                      </span>
                      
                      {item.itemType === 'appointment' && 'location' in item && item.location && (
                        <>
                          <span className="mx-1">•</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate max-w-[150px]">{item.location}</span>
                        </>
                      )}
                      
                      {item.itemType === 'task' && 'estimatedDuration' in item && item.estimatedDuration && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{item.estimatedDuration} Min.</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center ml-2">
                    {item.priority && (
                      <Badge variant="outline" className={`ml-2 ${getPriorityBadgeClass(item.priority)}`}>
                        {item.priority === 'high' ? 'Hoch' : item.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Keine Einträge gefunden.</p>
                <p className="text-sm mt-1">Versuche andere Filter oder erstelle neue Einträge.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedDashboard;
