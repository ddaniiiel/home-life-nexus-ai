
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Home, Calendar, FileText, CreditCard, Lightbulb, Phone, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';
import UnifiedDashboard from '@/components/dashboard/UnifiedDashboard';
import { Task, Appointment } from '@/models/TaskAppointment';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const today = new Date();

  // Sample task data 
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Wäsche waschen',
      description: 'Dunkle Wäsche bei 40°C',
      completed: false,
      status: 'upcoming',
      priority: 'medium',
      dueDate: new Date(2025, 4, 7, 10, 0), // May 7, 2025 10:00
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedDuration: 90,
      subtasks: [
        { id: 1, title: 'Waschmaschine einschalten', completed: true },
        { id: 2, title: 'Wäsche aufhängen', completed: false }
      ],
      recurrence: 'weekly',
      linkedAppointmentIds: []
    },
    {
      id: 2,
      title: 'Einkaufen gehen',
      description: 'Lebensmittel für die Woche besorgen',
      completed: false,
      status: 'upcoming',
      priority: 'high',
      dueDate: new Date(2025, 4, 6, 14, 0), // May 6, 2025 14:00
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedDuration: 60,
      linkedAppointmentIds: [3]
    },
    {
      id: 3,
      title: 'Rechnungen bezahlen',
      description: 'Strom und Internet',
      completed: true,
      status: 'completed',
      priority: 'high',
      dueDate: new Date(2025, 4, 5, 10, 0), // May 5, 2025 10:00
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      title: 'Pflanzen gießen',
      description: '',
      completed: false,
      status: 'upcoming',
      priority: 'low',
      dueDate: new Date(2025, 4, 6, 9, 0), // May 6, 2025 9:00
      createdAt: new Date(),
      updatedAt: new Date(),
      recurrence: 'daily'
    },
    {
      id: 5,
      title: 'Zahnarzttermin vorbereiten',
      description: 'Versicherungskarte und Unterlagen bereitlegen',
      completed: false,
      status: 'upcoming',
      priority: 'medium',
      dueDate: new Date(2025, 4, 8, 8, 0), // May 8, 2025 8:00
      createdAt: new Date(),
      updatedAt: new Date(),
      linkedAppointmentIds: [1]
    }
  ]);

  // Sample appointment data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      title: 'Zahnarzttermin',
      description: 'Routineuntersuchung',
      status: 'upcoming',
      priority: 'high',
      startDate: new Date(2025, 4, 8, 10, 0), // May 8, 2025 10:00
      endDate: new Date(2025, 4, 8, 11, 0),   // May 8, 2025 11:00
      location: 'Praxis Dr. Müller, Hauptstraße 15',
      createdAt: new Date(),
      updatedAt: new Date(),
      weatherDependent: false,
      transportNeeded: true,
      relevantDocuments: ['Versicherungskarte'],
      linkedTaskIds: [5]
    },
    {
      id: 2,
      title: 'Elternabend Schule',
      description: 'Besprechung der Klassenfahrt',
      status: 'upcoming',
      priority: 'medium',
      startDate: new Date(2025, 4, 6, 19, 0), // May 6, 2025 19:00
      endDate: new Date(2025, 4, 6, 21, 0),   // May 6, 2025 21:00
      location: 'Grundschule Am Park, Raum 104',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendees: [
        { id: 1, name: 'Thomas', confirmed: true },
        { id: 2, name: 'Sarah', confirmed: true }
      ]
    },
    {
      id: 3,
      title: 'Wocheneinkauf',
      description: 'Großeinkauf für die Familie',
      status: 'upcoming',
      priority: 'medium',
      startDate: new Date(2025, 4, 6, 15, 0), // May 6, 2025 15:00
      endDate: new Date(2025, 4, 6, 16, 30),  // May 6, 2025 16:30
      location: 'Supermarkt Stadtmitte',
      createdAt: new Date(),
      updatedAt: new Date(),
      weatherDependent: true,
      linkedTaskIds: [2]
    },
    {
      id: 4,
      title: 'Volleyball Training',
      description: '',
      status: 'upcoming',
      priority: 'low',
      startDate: new Date(2025, 4, 7, 17, 0), // May 7, 2025 17:00
      endDate: new Date(2025, 4, 7, 19, 0),   // May 7, 2025 19:00
      location: 'Sporthalle Stadtmitte',
      createdAt: new Date(),
      updatedAt: new Date(),
      recurrence: 'weekly'
    }
  ]);
  
  // Family members with more data
  const familyMembers = [
    { id: 1, name: "Thomas", role: "Vater", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", status: "Im Büro", lastActive: "vor 15 Min." },
    { id: 2, name: "Sarah", role: "Mutter", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", status: "Zuhause", lastActive: "Jetzt" },
    { id: 3, name: "Emma", role: "Tochter", image: "https://images.unsplash.com/photo-1590080692141-56a6aaa7cdce?auto=format&fit=crop&w=150&q=80", status: "In der Schule", lastActive: "vor 45 Min." },
    { id: 4, name: "Tim", role: "Sohn", image: "https://images.unsplash.com/photo-1599463923592-e4e6206e9e3d?auto=format&fit=crop&w=150&q=80", status: "Beim Sport", lastActive: "vor 30 Min." },
  ];

  // Handlers
  const handleTaskComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed, status: !task.completed ? 'completed' : 'upcoming' } : task
    ));
    
    const task = tasks.find(t => t.id === id);
    
    toast({
      title: task?.completed ? "Aufgabe als offen markiert" : "Aufgabe abgeschlossen",
      description: `"${task?.title}" wurde als ${task?.completed ? 'offen' : 'erledigt'} markiert.`,
    });
  };

  const handleTaskSelect = (id: number) => {
    // In a real app, this would open a task detail view or edit form
    toast({
      title: "Aufgabe ausgewählt",
      description: `Details für Aufgabe ${id} werden geöffnet.`,
    });
  };

  const handleAppointmentSelect = (id: number) => {
    // In a real app, this would open an appointment detail view
    toast({
      title: "Termin ausgewählt",
      description: `Details für Termin ${id} werden geöffnet.`,
    });
  };

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

          {/* Unified Dashboard showing tasks and appointments together */}
          <UnifiedDashboard
            tasks={tasks}
            appointments={appointments}
            onTaskComplete={handleTaskComplete}
            onTaskSelect={handleTaskSelect}
            onAppointmentSelect={handleAppointmentSelect}
          />
          
          {/* House Overview */}
          <Card className="mb-6 overflow-hidden border-green-100 dark:border-green-800 shadow-md mt-6">
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
          
          {/* Family Members */}
          <Card className="border-green-100 dark:border-green-800 shadow-md mb-6">
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
          
          {/* Quick Access Widgets */}
          <h2 className="text-xl font-bold mb-4 text-green-700">Schnellzugriff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Smart Home Widget */}
            <SmartHomeWidget />
            
            {/* Calendar Quick View */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
