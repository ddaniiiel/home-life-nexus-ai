
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Calendar, List, CreditCard, Bell, Lightbulb, Cog, User, Check } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FeatureCard from '@/components/FeatureCard';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import TaskWidget from '@/components/TaskWidget';
import CalendarWidget from '@/components/CalendarWidget';
import FinanceWidget from '@/components/FinanceWidget';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Demo user name
  const userName = "Max";
  
  // Check if we're on the landing page (not logged in) or dashboard (logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const featuresList = [
    {
      title: 'Smart Home Integration',
      description: 'Verbinde und steuere alle deine Smart-Home-Geräte von unterschiedlichen Herstellern zentral über eine Plattform.',
      icon: <Lightbulb className="h-6 w-6" />
    },
    {
      title: 'Aufgabenmanagement',
      description: 'Organisiere alle Haushaltsaufgaben, erstelle wiederkehrende Erinnerungen und teile sie mit Familienmitgliedern.',
      icon: <List className="h-6 w-6" />
    },
    {
      title: 'Kalenderintegration',
      description: 'Synchronisiere externe Kalender und behalte alle wichtigen Termine für deinen Haushalt im Blick.',
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: 'Finanzverwaltung',
      description: 'Behalte den Überblick über Haushaltsbudgets, gemeinsame Ausgaben und potenzielle Einsparmöglichkeiten.',
      icon: <CreditCard className="h-6 w-6" />
    }
  ];

  // Function to toggle between landing page and dashboard
  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      {isLoggedIn ? (
        // Dashboard View (after login)
        <div className="flex-1 md:ml-64 p-4 md:p-8">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Willkommen zurück, {userName}!</h1>
                <p className="text-gray-500 mt-1">Hier ist deine tägliche Übersicht.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button onClick={toggleLoggedIn}>Abmelden</Button>
              </div>
            </div>
          </header>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SmartHomeWidget />
            <TaskWidget />
            <CalendarWidget />
            <FinanceWidget />
          </div>
        </div>
      ) : (
        // Landing Page (before login)
        <div className="flex-1 md:ml-0 flex flex-col">
          {/* Hero Section */}
          <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
                    HomePilot
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Dein intelligentes Dashboard für Zuhause und Leben
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Verbinde Smart-Home-Geräte, verwalte Haushalt, Aufgaben, Finanzen und mehr – alles in einer intuitiven, KI-gestützten Plattform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      onClick={toggleLoggedIn}
                      className="bg-homepilot-primary hover:bg-blue-600"
                    >
                      Dashboard öffnen
                    </Button>
                    <Button variant="outline" size="lg">
                      Mehr erfahren
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-10">
                  <div className="bg-gradient-to-br from-homepilot-primary to-homepilot-accent rounded-2xl p-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                      <img 
                        src="https://via.placeholder.com/500x300?text=HomePilot+Dashboard" 
                        alt="HomePilot Dashboard" 
                        className="rounded-lg shadow-lg w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Alles in einer Plattform</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  HomePilot verbindet die wichtigsten Bereiche deines Zuhauses und Lebens in einem personalisierbaren Dashboard.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuresList.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                ))}
              </div>
            </div>
          </section>
          
          {/* Benefits Section */}
          <section className="py-16 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Warum HomePilot?</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="bg-homepilot-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-homepilot-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Alles an einem Ort</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Keine endlose Suche mehr nach wichtigen Dokumenten, Terminen oder Aufgaben. HomePilot vereint alles, was du für den Alltag brauchst.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="bg-homepilot-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-homepilot-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">KI-Unterstützung</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    HomePilot lernt deine Gewohnheiten und gibt proaktiv Empfehlungen, die dir Zeit und Geld sparen.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="bg-homepilot-secondary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-homepilot-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Für alle zugänglich</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Einfache Bedienung, Barrierefreiheit und flexible Anpassungsmöglichkeiten machen HomePilot für jeden Haushalt nutzbar.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Button 
                  onClick={toggleLoggedIn} 
                  className="bg-homepilot-primary hover:bg-blue-600"
                >
                  Jetzt HomePilot entdecken
                </Button>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="py-8 px-6 md:px-12 lg:px-24 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto text-center">
              <p className="text-gray-600 dark:text-gray-300">
                © 2025 HomePilot • Das KI-gestützte Zuhause- und Lebens-Dashboard
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
