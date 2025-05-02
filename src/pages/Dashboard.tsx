
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Home, Calendar, FileText, CreditCard, Lightbulb, Phone, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Widget from '@/components/Widget';
import { Badge } from '@/components/ui/badge';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const today = new Date();
  
  // Sample upcoming events with improved data
  const upcomingEvents = [
    { 
      id: 1, 
      title: "Elternabend Schule", 
      date: format(today, "eeee, dd. MMMM", { locale: de }), 
      time: "19:00",
      person: "Emma",
      location: "Grundschule Am Park"
    },
    { 
      id: 2, 
      title: "Zahnarzttermin", 
      date: format(new Date(today.getTime() + 86400000), "eeee, dd. MMMM", { locale: de }), 
      time: "14:30",
      person: "Tim",
      location: "Praxis Dr. Müller"
    },
    { 
      id: 3, 
      title: "Volleyball Training", 
      date: format(new Date(today.getTime() + 172800000), "eeee, dd. MMMM", { locale: de }), 
      time: "17:00",
      person: "Sarah",
      location: "Sporthalle Stadtmitte"
    }
  ];
  
  // Family members with more data
  const familyMembers = [
    { id: 1, name: "Thomas", role: "Vater", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", status: "Im Büro", lastActive: "vor 15 Min." },
    { id: 2, name: "Sarah", role: "Mutter", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", status: "Zuhause", lastActive: "Jetzt" },
    { id: 3, name: "Emma", role: "Tochter", image: "https://images.unsplash.com/photo-1590080692141-56a6aaa7cdce?auto=format&fit=crop&w=150&q=80", status: "In der Schule", lastActive: "vor 45 Min." },
    { id: 4, name: "Tim", role: "Sohn", image: "https://images.unsplash.com/photo-1599463923592-e4e6206e9e3d?auto=format&fit=crop&w=150&q=80", status: "Beim Sport", lastActive: "vor 30 Min." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-700">Willkommen bei HomePilot</h1>
              <p className="text-gray-600">{format(today, "EEEE, d. MMMM yyyy", { locale: de })} • Ein schöner Tag für deine Familie</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Button size="sm" variant="outline" asChild className="border-green-600/20 hover:bg-green-50 hover:border-green-600/30">
                <Link to="/tasks">
                  <Calendar className="h-4 w-4 mr-2 text-green-600" />
                  Aufgaben ansehen
                </Link>
              </Button>
              <Button size="sm" asChild className="bg-green-600 hover:bg-green-700">
                <Link to="/smart-home">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Smart Home
                </Link>
              </Button>
            </div>
          </div>

          {/* Next Event Alert */}
          {upcomingEvents.length > 0 && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-500 p-2 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Nächster Termin: {upcomingEvents[0].title}</h3>
                  <p className="text-sm text-green-700">{upcomingEvents[0].date}, {upcomingEvents[0].time} • {upcomingEvents[0].location}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild className="border-green-500 text-green-600 hover:bg-green-100">
                <Link to="/calendar">Details</Link>
              </Button>
            </div>
          )}

          {/* House Overview */}
          <Card className="mb-6 overflow-hidden border-green-100 dark:border-green-800 shadow-md">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="House Overview" 
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h2 className="text-2xl font-bold">Musterstraße 123</h2>
                  <p className="text-white/80">Alle Systeme funktionieren normal</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <Link to="/smart-home" className="block">
                  <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-green-50 transition-colors">
                    <div className="flex justify-center mb-2">
                      <div className="bg-green-100 dark:bg-green-800/30 rounded-full p-2">
                        <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium">Beleuchtung</p>
                    <p className="text-xs text-gray-500">3 aktiv</p>
                  </div>
                </Link>
                
                <Link to="/emergency" className="block">
                  <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-red-50 transition-colors">
                    <div className="flex justify-center mb-2">
                      <div className="bg-red-100 dark:bg-red-800/30 rounded-full p-2">
                        <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium">Notfall</p>
                    <p className="text-xs text-gray-500">Alles OK</p>
                  </div>
                </Link>
                
                <Link to="/calendar" className="block">
                  <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-blue-50 transition-colors">
                    <div className="flex justify-center mb-2">
                      <div className="bg-blue-100 dark:bg-blue-800/30 rounded-full p-2">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium">Kalender</p>
                    <p className="text-xs text-gray-500">3 Termine heute</p>
                  </div>
                </Link>
                
                <Link to="/documents" className="block">
                  <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-yellow-50 transition-colors">
                    <div className="flex justify-center mb-2">
                      <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded-full p-2">
                        <FileText className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium">Dokumente</p>
                    <p className="text-xs text-gray-500">2 neue</p>
                  </div>
                </Link>
                
                <Link to="/finances" className="block">
                  <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-purple-50 transition-colors">
                    <div className="flex justify-center mb-2">
                      <div className="bg-purple-100 dark:bg-purple-800/30 rounded-full p-2">
                        <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium">Finanzen</p>
                    <p className="text-xs text-gray-500">Alles im Budget</p>
                  </div>
                </Link>
                
                <Link to="/settings" className="block">
                  <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-indigo-50 transition-colors">
                    <div className="flex justify-center mb-2">
                      <div className="bg-indigo-100 dark:bg-indigo-800/30 rounded-full p-2">
                        <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium">Familie</p>
                    <p className="text-xs text-gray-500">4 Mitglieder</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Family Members and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Family Members */}
            <Card className="border-green-100 dark:border-green-800 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-green-700">Familienmitglieder</h2>
                <div className="space-y-4">
                  {familyMembers.map(member => (
                    <div key={member.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-800/20 transition-colors">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-200">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <div className="flex items-center">
                          <p className="text-sm text-gray-500 mr-2">{member.role}</p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-gray-400 ml-2">{member.lastActive}</p>
                        </div>
                      </div>
                      <Badge variant={member.status === "Zuhause" ? "default" : "outline"} className={member.status === "Zuhause" ? "bg-green-500" : ""}>
                        {member.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Events */}
            <Card className="lg:col-span-2 border-green-100 dark:border-green-800 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-green-700">Anstehende Termine</h2>
                  <Button variant="outline" size="sm" asChild className="text-green-600 border-green-200 hover:bg-green-50">
                    <Link to="/calendar">Alle anzeigen</Link>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="p-3 border border-green-100 dark:border-green-800 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="bg-green-100 p-2 rounded-lg flex items-center justify-center min-w-[2.5rem] mr-3">
                            <span className="text-green-700 font-semibold">{event.time}</span>
                          </div>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <div className="flex flex-wrap text-sm text-gray-500">
                              <span>{event.date}</span>
                              <span className="mx-1">•</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {event.person}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-medium text-green-700">Diese Woche</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Insgesamt 7 weitere Termine für diese Woche geplant. Schaue im Kalender für Details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Access Widgets */}
          <h2 className="text-xl font-bold mb-4 text-green-700">Schnellzugriff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Smart Home Widget */}
            <SmartHomeWidget />
            
            {/* Calendar Quick View */}
            <Widget 
              title="Kalender" 
              description="Heute und Morgen" 
              icon={<Calendar className="h-5 w-5" />}
              variant="primary"
              className="shadow-md"
            >
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3 min-w-[2.5rem] flex justify-center">
                        <span className="text-blue-700 font-medium">{event.time}</span>
                      </div>
                      <div>
                        <span className="font-medium">{event.title}</span>
                        <p className="text-xs text-gray-500">{event.location}</p>
                      </div>
                    </div>
                    <Badge variant="outline" size="sm">{event.person}</Badge>
                  </div>
                ))}
                <Button className="w-full mt-2 bg-blue-500 hover:bg-blue-600" asChild>
                  <Link to="/calendar" className="flex items-center justify-center">
                    <span className="mr-1">Zum Kalender</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Widget>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
