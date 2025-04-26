import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Bell, Lightbulb, User, Check, List, Calendar, CreditCard } from 'lucide-react';
import Widget from '@/components/Widget';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Demo user name
  const userName = "Max";

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

  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      {isLoggedIn ? (
        // Dashboard View (after login)
        <div className="md:ml-64 min-h-screen">
          {/* Main Content Area */}
          <div className="p-4 md:p-8 pt-20 md:pt-8">
            <header className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Willkommen zurück, {userName}!</h1>
                  <p className="text-gray-500 mt-1">Hier ist deine tägliche Übersicht.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button onClick={toggleLoggedIn}>Abmelden</Button>
                </div>
              </div>
            </header>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Smart Home Widget */}
              <Widget
                title="Smart Home"
                description="Gerätestatus und Steuerung"
                icon={<Lightbulb className="h-5 w-5" />}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Wohnzimmer Licht</span>
                    <Button variant="outline" size="sm">Ein</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Temperatur</span>
                    <span className="text-gray-600">22.5°C</span>
                  </div>
                </div>
              </Widget>

              {/* Tasks Widget */}
              <Widget
                title="Aufgaben"
                description="Aktuelle Todos"
                icon={<Check className="h-5 w-5" />}
              >
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Einkaufsliste erstellen</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Rechnungen bezahlen</span>
                  </div>
                </div>
              </Widget>

              {/* Calendar Widget */}
              <Widget
                title="Kalender"
                description="Kommende Termine"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Arzttermin</span>
                    <span className="text-sm text-gray-500">14:30</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Meeting</span>
                    <span className="text-sm text-gray-500">16:00</span>
                  </div>
                </div>
              </Widget>
            </div>
          </div>
        </div>
      ) : (
        // Landing Page (before login)
        <div className="md:ml-0">
          {/* Hero Section */}
          <section className="relative py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-900">
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
                        alt="HomePilot Dashboard Preview" 
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
