
import React, { useState, lazy } from 'react';
import Navigation from '@/components/Navigation';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';
import { Task, Appointment, checkForConflicts } from '@/models/TaskAppointment';
import DashboardHouseOverview from '@/components/dashboard/DashboardHouseOverview';
// import DashboardFinancialOverview from '@/components/dashboard/DashboardFinancialOverview'; // Lazy loaded
// import DashboardSmartHome from '@/components/dashboard/DashboardSmartHome'; // Lazy loaded
import { LazyComponent, usePerformanceMonitor } from '@/components/performance/LazyComponent';
import { Skeleton } from '@/components/ui/skeleton'; // For custom skeletons

// Lazy loading für schwere Komponenten
const LiveCoachWidget = lazy(() => import('@/components/dashboard/LiveCoachWidget'));
const DashboardFinancialOverview = lazy(() => import('@/components/dashboard/DashboardFinancialOverview'));
const DashboardSmartHome = lazy(() => import('@/components/dashboard/DashboardSmartHome'));


const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const today = new Date();
  
  // Performance Monitoring
  usePerformanceMonitor();

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

  // Sample appointment data - Fixed the duplicate issue
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
  
  // Family members with more data and additional images
  const familyMembers = [
    { 
      id: 1, 
      name: "Thomas", 
      role: "Vater", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", 
      status: "Im Büro", 
      lastActive: "vor 15 Min." 
    },
    { 
      id: 2, 
      name: "Sarah", 
      role: "Mutter", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", 
      status: "Zuhause", 
      lastActive: "Jetzt" 
    },
    { 
      id: 3, 
      name: "Emma", 
      role: "Tochter", 
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80", 
      status: "In der Schule", 
      lastActive: "vor 45 Min." 
    },
    { 
      id: 4, 
      name: "Tim", 
      role: "Sohn", 
      image: "https://images.unsplash.com/photo-1599463923592-e4e6206e9e3d?auto=format&fit=crop&w=150&q=80", 
      status: "Beim Sport", 
      lastActive: "vor 30 Min." 
    },
    { 
      id: 5, 
      name: "Max", 
      role: "Hund", 
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&q=80", 
      status: "Zuhause", 
      lastActive: "vor 5 Min." 
    },
    { 
      id: 6, 
      name: "Luna", 
      role: "Katze", 
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80", 
      status: "Schläft", 
      lastActive: "vor 2 Std." 
    },
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
    toast({
      title: "Aufgabe ausgewählt",
      description: `Details für Aufgabe ${id} werden geöffnet.`,
    });
  };

  const handleAppointmentSelect = (id: number) => {
    toast({
      title: "Termin ausgewählt",
      description: `Details für Termin ${id} werden geöffnet.`,
    });
  };

  // Check for appointment conflicts
  const conflicts = checkForConflicts(appointments);
  const hasConflicts = conflicts.length > 0;


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-homepilot-primary">Willkommen bei HomePilot</h1>
              <p className="text-gray-600 dark:text-gray-400">{format(today, "EEEE, d. MMMM yyyy", { locale: de })} • Ein schöner Tag für deine Familie</p>
            </div>
          </div>

          {/* House Overview with integrated family members */}
          <DashboardHouseOverview familyMembers={familyMembers} />

          {/* Live Coach Widget with Lazy Loading */}
          <div className="mb-6">
            <LazyComponent fallback={
              <div className="w-full h-96 bg-card rounded-lg border animate-pulse flex items-center justify-center">
                <Skeleton className="w-[95%] h-[90%]" />
              </div>
            }>
              <LiveCoachWidget />
            </LazyComponent>
          </div>
          
          {/* Smart Home Full Width Section */}
          <div className="mb-6">
            <LazyComponent fallback={
              <div className="w-full h-[450px] bg-card rounded-lg border animate-pulse flex items-center justify-center">
                <Skeleton className="w-[95%] h-[90%]" />
              </div>
            }>
              <DashboardSmartHome />
            </LazyComponent>
          </div>
          
          {/* Redesigned Financial Overview */}
          <div className="mb-6">
            <LazyComponent fallback={
              <div className="w-full h-[400px] bg-card rounded-lg border animate-pulse flex items-center justify-center">
                <Skeleton className="w-[95%] h-[90%]" />
              </div>
            }>
              <DashboardFinancialOverview />
            </LazyComponent>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
