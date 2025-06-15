
import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModernCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const upcomingEvents = [
    {
      id: 1,
      title: "Zahnarzt Termin",
      time: "14:30",
      date: "2024-01-15",
      participant: "Max",
      type: "medical",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Elternabend",
      time: "19:00",
      date: "2024-01-16",
      participant: "Lisa & Thomas",
      type: "school",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Geburtstag Oma",
      time: "15:00",
      date: "2024-01-18",
      participant: "Alle",
      type: "family",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Auto Inspektion",
      time: "10:00",
      date: "2024-01-20",
      participant: "Thomas",
      type: "maintenance",
      color: "bg-orange-500"
    }
  ];

  const todayEvents = upcomingEvents.filter(event => 
    new Date(event.date).toDateString() === new Date().toDateString()
  );

  const weekEvents = upcomingEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return eventDate >= today && eventDate <= weekFromNow;
  });

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Heute</p>
                <p className="text-2xl font-bold">{todayEvents.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Diese Woche</p>
                <p className="text-2xl font-bold">{weekEvents.length}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Familientermine</p>
                <p className="text-2xl font-bold">{upcomingEvents.filter(e => e.type === 'family').length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Button className="w-full h-full flex flex-col items-center justify-center space-y-2">
              <Plus className="h-6 w-6" />
              <span>Neuer Termin</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="upcoming">Anstehend</TabsTrigger>
            <TabsTrigger value="month">Monatsansicht</TabsTrigger>
            <TabsTrigger value="week">Wochenansicht</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anstehende Termine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString('de-DE')} um {event.time}
                    </p>
                  </div>
                  <Badge variant="secondary">{event.participant}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month">
          <Card>
            <CardHeader>
              <CardTitle>Monatsansicht</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center">
                {/* Calendar grid would go here */}
                <div className="col-span-7 h-64 flex items-center justify-center text-gray-500">
                  Kalenderansicht wird hier angezeigt
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Wochenansicht</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Week view would go here */}
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Wochenansicht wird hier angezeigt
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernCalendarPage;
