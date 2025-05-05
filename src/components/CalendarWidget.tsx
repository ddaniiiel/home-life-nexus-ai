
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import Widget from './Widget';
import { format, addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  time: string;
  type: 'personal' | 'work' | 'family';
  person?: string;
  location?: string;
  date: Date;
}

const CalendarWidget = () => {
  const today = new Date();
  const formattedDate = format(today, 'EEEE, dd. MMMM', { locale: de });

  // Erweiterte Event-Liste mit mehr Details
  const events: Event[] = [
    { 
      id: 1, 
      title: 'Arzttermin', 
      time: '09:30', 
      type: 'personal',
      person: 'Emma',
      location: 'Dr. Müller',
      date: today
    },
    { 
      id: 2, 
      title: 'Müllabholung', 
      time: '08:00', 
      type: 'family',
      location: 'Zuhause',
      date: today
    },
    { 
      id: 3, 
      title: 'Elternabend', 
      time: '19:00', 
      type: 'family',
      person: 'Eltern',
      location: 'Schule',
      date: addDays(today, 1)
    },
  ];

  // Gruppiere Events nach Datum (heute, morgen, etc.)
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = format(event.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  // Sortiere nach Datum und danach nach Zeit
  const sortedDates = Object.keys(eventsByDate).sort();

  return (
    <Widget 
      title="Kalender" 
      icon={<Calendar className="h-5 w-5" />}
      backgroundImage="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80"
      imagePosition="top"
      imageOverlay="light"
    >
      <div>
        <div className="mb-4">
          <p className="text-md font-medium">{formattedDate}</p>
          <p className="text-sm text-gray-500">Deine nächsten Termine</p>
        </div>
        
        <div className="space-y-4">
          {sortedDates.map(dateKey => {
            const dateEvents = eventsByDate[dateKey];
            const eventDate = new Date(dateKey);
            const isToday = format(today, 'yyyy-MM-dd') === dateKey;
            const isTomorrow = format(addDays(today, 1), 'yyyy-MM-dd') === dateKey;
            
            const dateLabel = isToday 
              ? 'Heute' 
              : isTomorrow 
                ? 'Morgen' 
                : format(eventDate, 'EEEE, dd.MM.', { locale: de });
            
            return (
              <div key={dateKey}>
                <div className="flex items-center mb-2">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    isToday ? 'bg-homepilot-primary' : 'bg-homepilot-secondary'
                  }`} />
                  <p className="text-sm font-medium">{dateLabel}</p>
                </div>
                
                <div className="space-y-2 pl-4">
                  {dateEvents.map((event) => (
                    <div key={event.id} className="flex items-center py-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md p-1 transition-colors">
                      <div 
                        className={`min-w-10 text-center py-1 px-2 rounded mr-3 ${
                          event.type === 'personal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 
                          event.type === 'work' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : 
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`} 
                      >
                        {event.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <div className="flex flex-wrap text-xs text-gray-500">
                          {event.location && <span className="mr-2">{event.location}</span>}
                          {event.person && (
                            <>
                              <span className="text-gray-400 mr-1">•</span>
                              <span>{event.person}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <Button className="w-full mt-4" variant="outline" size="sm" asChild>
          <Link to="/calendar" className="flex items-center justify-center">
            Zum Kalender
            <Calendar className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Widget>
  );
};

export default CalendarWidget;
