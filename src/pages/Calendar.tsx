
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const Calendar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const events = [
    { id: 1, title: 'Arzttermin', date: '2025-04-28', time: '10:00', category: 'health' },
    { id: 2, title: 'Meeting mit Team', date: '2025-04-28', time: '14:00', category: 'work' },
    { id: 3, title: 'Geburtstag Anna', date: '2025-04-30', time: 'ganztägig', category: 'personal' },
    { id: 4, title: 'Autoreparatur', date: '2025-05-02', time: '09:30', category: 'errands' }
  ];
  
  const selectedDateStr = date ? 
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` 
    : '';
  
  const todaysEvents = events.filter(event => event.date === selectedDateStr);

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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Datum wählen</h2>
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </div>
            
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Termine für {date?.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h2>
              
              {todaysEvents.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {todaysEvents.map((event) => (
                    <div key={event.id} className="py-4 flex items-start">
                      <div className="flex-shrink-0 w-16 text-sm text-gray-500">
                        {event.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                          {event.title}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1
                          ${event.category === 'work' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                           event.category === 'personal' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                           event.category === 'health' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                           'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`
                        }>
                          {event.category === 'work' ? 'Arbeit' : 
                           event.category === 'personal' ? 'Persönlich' :
                           event.category === 'health' ? 'Gesundheit' : 'Erledigungen'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Keine Termine für diesen Tag
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
