
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import Widget from './Widget';

interface Event {
  id: number;
  title: string;
  time: string;
  type: 'personal' | 'work' | 'family';
}

const CalendarWidget = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('de-DE', { 
    weekday: 'long', 
    day: '2-digit', 
    month: 'long'
  });

  const events: Event[] = [
    { id: 1, title: 'Arzttermin', time: '09:30', type: 'personal' },
    { id: 2, title: 'Müllabholung', time: '08:00', type: 'family' },
    { id: 3, title: 'Elternabend', time: '19:00', type: 'family' },
  ];

  return (
    <Widget title="Kalender" icon={<Calendar className="h-5 w-5" />}>
      <div>
        <div className="mb-3">
          <p className="text-sm font-medium">{formattedDate}</p>
        </div>
        <div className="space-y-2">
          {events.map((event) => (
            <div key={event.id} className="flex items-center py-1">
              <div 
                className={`w-2 h-2 rounded-full mr-2 ${
                  event.type === 'personal' ? 'bg-homepilot-primary' : 
                  event.type === 'work' ? 'bg-homepilot-accent' : 'bg-homepilot-secondary'
                }`} 
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{event.title}</p>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span className="text-xs">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
        <a href="#" className="text-xs text-homepilot-primary hover:underline mt-3 block">Zum Kalender →</a>
      </div>
    </Widget>
  );
};

export default CalendarWidget;
