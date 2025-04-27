
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Tag } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays, isBefore, isToday } from 'date-fns';
import { de } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppleCalendarSync from '@/components/AppleCalendarSync';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  calendar: string;
  color: string;
  synced?: boolean;
}

interface CalendarFilter {
  name: string;
  color: string;
  active: boolean;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Sample calendar events
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Zahnarzttermin',
      start: addDays(new Date(), 2),
      end: addDays(new Date(), 2),
      allDay: true,
      calendar: 'Privat',
      color: 'blue',
      synced: true
    },
    {
      id: 2,
      title: 'Meeting mit Team',
      start: addDays(new Date(), -1),
      end: addDays(new Date(), -1),
      allDay: false,
      calendar: 'Arbeit',
      color: 'green',
      synced: true
    },
    {
      id: 3,
      title: 'Geburtstag von Max',
      start: addDays(new Date(), 5),
      end: addDays(new Date(), 5),
      allDay: true,
      calendar: 'Familie',
      color: 'purple',
      synced: true
    },
    {
      id: 4,
      title: 'Autowerkstatt',
      start: addDays(new Date(), 3),
      end: addDays(new Date(), 3),
      allDay: true,
      calendar: 'Privat',
      color: 'blue'
    },
    {
      id: 5,
      title: 'Telefonkonferenz',
      start: new Date(),
      end: new Date(),
      allDay: false,
      calendar: 'Arbeit',
      color: 'green',
      synced: true
    }
  ]);

  // Calendar filters
  const [calendarFilters, setCalendarFilters] = useState<CalendarFilter[]>([
    { name: 'Privat', color: 'blue', active: true },
    { name: 'Arbeit', color: 'green', active: true },
    { name: 'Familie', color: 'purple', active: true }
  ]);

  const toggleCalendarFilter = (name: string) => {
    setCalendarFilters(calendarFilters.map(filter => 
      filter.name === name ? { ...filter, active: !filter.active } : filter
    ));
  };

  // Navigate months
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Get days of month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Filter events based on selected calendars
  const filteredEvents = events.filter(event => 
    calendarFilters.find(filter => filter.name === event.calendar)?.active
  );

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter(event => isSameDay(day, event.start));
  };

  // Get color class for calendar events
  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700';
      case 'green':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700';
      case 'purple':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <CalendarIcon className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Kalender</h1>
          </div>
          
          <Tabs defaultValue="calendar" className="space-y-8">
            <TabsList>
              <TabsTrigger value="calendar">Kalender</TabsTrigger>
              <TabsTrigger value="sync">Synchronisierung</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
                <div className="p-6">
                  {/* Calendar Header */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={goToToday}>
                        Heute
                      </Button>
                      <Button variant="outline" size="icon" onClick={goToNextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <h2 className="text-xl font-medium">
                        {format(currentDate, 'MMMM yyyy', { locale: de })}
                      </h2>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Termin erstellen
                    </Button>
                  </div>
                  
                  {/* Calendar Filters */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {calendarFilters.map((filter) => (
                      <div key={filter.name} className="flex items-center gap-2">
                        <Switch 
                          id={`calendar-${filter.name}`} 
                          checked={filter.active}
                          onCheckedChange={() => toggleCalendarFilter(filter.name)}
                        />
                        <Label htmlFor={`calendar-${filter.name}`} className="flex items-center text-sm">
                          <span 
                            className={`w-3 h-3 rounded-full mr-1.5 ${filter.color === 'blue' ? 'bg-blue-500' : filter.color === 'green' ? 'bg-green-500' : 'bg-purple-500'}`}
                          ></span>
                          {filter.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                    {/* Day Headers */}
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day, index) => (
                      <div 
                        key={day} 
                        className="bg-gray-100 dark:bg-gray-800 py-2 text-center text-sm font-medium"
                      >
                        {day}
                      </div>
                    ))}
                    
                    {/* Empty cells for days before the first of the month */}
                    {Array.from({ length: (monthStart.getDay() || 7) - 1 }).map((_, index) => (
                      <div key={`empty-start-${index}`} className="bg-white dark:bg-gray-800 h-24 sm:h-36 p-1" />
                    ))}
                    
                    {/* Days of the month */}
                    {daysInMonth.map((day, index) => {
                      const dayEvents = getEventsForDay(day);
                      const isPast = isBefore(day, new Date()) && !isToday(day);
                      
                      return (
                        <div 
                          key={day.toISOString()} 
                          className={cn(
                            "bg-white dark:bg-gray-800 h-24 sm:h-36 p-1 overflow-hidden",
                            isToday(day) ? "bg-blue-50 dark:bg-blue-900/20" : "",
                            isPast ? "opacity-60" : ""
                          )}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className={cn(
                              "text-sm font-medium h-6 w-6 flex items-center justify-center",
                              isToday(day) ? "bg-homepilot-primary text-white rounded-full" : ""
                            )}>
                              {format(day, 'd')}
                            </span>
                          </div>
                          
                          {/* Events */}
                          <div className="space-y-1">
                            {dayEvents.map((event) => (
                              <div
                                key={event.id}
                                className={cn(
                                  "px-2 py-0.5 text-xs rounded border-l-2 truncate",
                                  getColorClass(event.color)
                                )}
                              >
                                <div className="flex items-center">
                                  <span className="truncate">
                                    {event.title}
                                  </span>
                                  {event.synced && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 ml-1 text-blue-500 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Empty cells for days after the end of the month */}
                    {Array.from({ length: 7 - ((monthEnd.getDay() || 7) - 1) }).map((_, index) => (
                      <div key={`empty-end-${index}`} className="bg-white dark:bg-gray-800 h-24 sm:h-36 p-1" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Upcoming Events */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium mb-4">Anstehende Termine</h3>
                <div className="space-y-3">
                  {filteredEvents
                    .filter(event => !isBefore(event.start, new Date()) || isToday(event.start))
                    .sort((a, b) => a.start.getTime() - b.start.getTime())
                    .slice(0, 5)
                    .map(event => (
                      <div key={event.id} className="flex items-start p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                        <div className={cn(
                          "w-2 h-2 mt-1.5 rounded-full mr-3",
                          event.color === 'blue' ? 'bg-blue-500' : 
                          event.color === 'green' ? 'bg-green-500' : 
                          'bg-purple-500'
                        )} />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="font-medium">{event.title}</p>
                            {event.synced && (
                              <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800">
                                Synced
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {isToday(event.start) ? 'Heute' : format(event.start, 'EEEE, d. MMMM', { locale: de })}
                            {!event.allDay && `, ${format(event.start, 'HH:mm', { locale: de })} Uhr`}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.calendar}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sync">
              <AppleCalendarSync />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
