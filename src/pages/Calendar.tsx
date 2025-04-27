
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Calendar as CalendarIcon, Plus, Clock, Tag, AlertCircle } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppleCalendarSync from '@/components/AppleCalendarSync';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  category: 'work' | 'personal' | 'health' | 'errands' | 'family';
  location?: string;
  description?: string;
  synced?: boolean;
  allDay?: boolean;
}

const CalendarPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Arzttermin', date: '2025-04-28', time: '10:00', endTime: '11:00', category: 'health', location: 'Praxis Dr. Müller', synced: true },
    { id: 2, title: 'Meeting mit Team', date: '2025-04-28', time: '14:00', endTime: '15:30', category: 'work', location: 'Online', synced: true },
    { id: 3, title: 'Geburtstag Anna', date: '2025-04-30', time: '', category: 'personal', allDay: true, synced: true },
    { id: 4, title: 'Autoreparatur', date: '2025-05-02', time: '09:30', endTime: '11:00', category: 'errands', location: 'Werkstatt', description: 'Ölwechsel und Inspektion' },
    { id: 5, title: 'Elternabend', date: '2025-05-03', time: '19:00', endTime: '21:00', category: 'family', location: 'Schule' },
    { id: 6, title: 'Müllabholung', date: '2025-05-04', time: '07:00', category: 'errands', allDay: true },
  ]);
  
  const [newEvent, setNewEvent] = useState<{
    title: string;
    date: Date | undefined;
    time: string;
    endTime: string;
    category: Event['category'];
    location: string;
    description: string;
    allDay: boolean;
  }>({
    title: '',
    date: new Date(),
    time: '',
    endTime: '',
    category: 'personal',
    location: '',
    description: '',
    allDay: false
  });

  const addEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date) return;
    
    const newEventEntry: Event = {
      id: events.length + 1,
      title: newEvent.title,
      date: format(newEvent.date, 'yyyy-MM-dd'),
      time: newEvent.allDay ? '' : newEvent.time,
      endTime: newEvent.allDay ? '' : newEvent.endTime,
      category: newEvent.category,
      location: newEvent.location || undefined,
      description: newEvent.description || undefined,
      allDay: newEvent.allDay
    };
    
    setEvents([...events, newEventEntry]);
    
    // Reset form
    setNewEvent({
      title: '',
      date: new Date(),
      time: '',
      endTime: '',
      category: 'personal',
      location: '',
      description: '',
      allDay: false
    });
  };
  
  const selectedDateStr = date ? 
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` 
    : '';
  
  const todaysEvents = events.filter(event => event.date === selectedDateStr);

  // Helper function to add events to calendar dates
  const isDayWithEvents = (day: Date) => {
    const dayStr = format(day, 'yyyy-MM-dd');
    return events.some(event => event.date === dayStr);
  };
  
  // Group events by time for better display
  const groupedEvents = todaysEvents.reduce((acc, event) => {
    const timeKey = event.allDay ? 'ganztägig' : event.time;
    if (!acc[timeKey]) {
      acc[timeKey] = [];
    }
    acc[timeKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

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
              <TabsTrigger value="sync">Synchronisation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Datum wählen</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" /> Neuer Termin
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Neuen Termin erstellen</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label htmlFor="event-title" className="text-sm font-medium">Titel</label>
                            <Input
                              id="event-title"
                              value={newEvent.title}
                              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                              placeholder="Titel des Termins"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Datum</label>
                            <div className="border rounded-md p-2">
                              <CalendarComponent
                                mode="single"
                                selected={newEvent.date}
                                onSelect={(date) => setNewEvent({...newEvent, date})}
                                locale={de}
                                className="w-full"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="allDay"
                              checked={newEvent.allDay}
                              onChange={(e) => setNewEvent({...newEvent, allDay: e.target.checked})}
                              className="rounded border-gray-300"
                            />
                            <label htmlFor="allDay" className="text-sm font-medium">Ganztägig</label>
                          </div>
                          
                          {!newEvent.allDay && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label htmlFor="start-time" className="text-sm font-medium">Beginn</label>
                                <Input
                                  id="start-time"
                                  type="time"
                                  value={newEvent.time}
                                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label htmlFor="end-time" className="text-sm font-medium">Ende</label>
                                <Input
                                  id="end-time"
                                  type="time"
                                  value={newEvent.endTime}
                                  onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                                />
                              </div>
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium">Kategorie</label>
                            <Select
                              value={newEvent.category}
                              onValueChange={(value) => setNewEvent({...newEvent, category: value as Event['category']})}
                            >
                              <SelectTrigger id="category">
                                <SelectValue placeholder="Kategorie wählen" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="work">Arbeit</SelectItem>
                                <SelectItem value="personal">Persönlich</SelectItem>
                                <SelectItem value="health">Gesundheit</SelectItem>
                                <SelectItem value="errands">Erledigungen</SelectItem>
                                <SelectItem value="family">Familie</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-medium">Ort (optional)</label>
                            <Input
                              id="location"
                              value={newEvent.location}
                              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                              placeholder="Ort des Termins"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">Beschreibung (optional)</label>
                            <Input
                              id="description"
                              value={newEvent.description}
                              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                              placeholder="Beschreibung des Termins"
                            />
                          </div>
                          
                          <Button onClick={addEvent} className="w-full mt-2">
                            Termin erstellen
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex justify-center mb-4">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      locale={de}
                      modifiersClassNames={{
                        selected: "bg-homepilot-primary text-primary-foreground",
                        today: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
                      }}
                      modifiers={{
                        withEvents: (date) => isDayWithEvents(date)
                      }}
                      modifiersStyles={{
                        withEvents: {
                          fontWeight: "bold",
                          textDecoration: "underline"
                        }
                      }}
                    />
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-md font-medium mb-2">Kommende Termine</h3>
                    <div className="space-y-2">
                      {events.slice(0, 3).map((event) => (
                        <div key={event.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md text-sm">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {format(new Date(event.date), 'P', { locale: de })}
                            {event.time && `, ${event.time} Uhr`}
                            {event.synced && (
                              <span className="ml-2 inline-block px-1 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                                Synced
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Termine für {date?.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </h2>
                  
                  {Object.keys(groupedEvents).length > 0 ? (
                    <div className="space-y-6">
                      {Object.keys(groupedEvents).sort((a, b) => {
                        if (a === 'ganztägig') return -1;
                        if (b === 'ganztägig') return 1;
                        return a.localeCompare(b);
                      }).map((timeKey) => (
                        <div key={timeKey}>
                          <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">{timeKey === 'ganztägig' ? 'Ganztägig' : `${timeKey} Uhr`}</span>
                          </div>
                          <div className="ml-6 space-y-3">
                            {groupedEvents[timeKey].map((event) => (
                              <div key={event.id} className="border p-3 rounded-md">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium text-lg">{event.title}</h3>
                                    
                                    <div className="mt-1 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                      {event.location && (
                                        <div className="flex items-center">
                                          <span className="w-20 text-gray-500">Ort:</span>
                                          <span>{event.location}</span>
                                        </div>
                                      )}
                                      
                                      {!event.allDay && event.endTime && (
                                        <div className="flex items-center">
                                          <span className="w-20 text-gray-500">Zeit:</span>
                                          <span>{event.time} - {event.endTime} Uhr</span>
                                        </div>
                                      )}
                                      
                                      {event.description && (
                                        <div className="flex items-start">
                                          <span className="w-20 text-gray-500">Notiz:</span>
                                          <span>{event.description}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full
                                      ${event.category === 'work' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                                       event.category === 'personal' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                       event.category === 'health' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                       event.category === 'family' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' :
                                       'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`
                                    }>
                                      {event.category === 'work' ? 'Arbeit' : 
                                       event.category === 'personal' ? 'Persönlich' :
                                       event.category === 'health' ? 'Gesundheit' : 
                                       event.category === 'family' ? 'Familie' :
                                       'Erledigungen'}
                                    </span>
                                    
                                    {event.synced && (
                                      <span className="inline-block px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                                        Synced
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed rounded-md">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-lg">Keine Termine für diesen Tag</p>
                      <Button className="mt-4" variant="outline">
                        <Plus className="h-4 w-4 mr-2" /> Termin hinzufügen
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sync">
              <div className="grid grid-cols-1 gap-6">
                <AppleCalendarSync />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
