
import React from 'react';
import { Calendar, CreditCard, Lightbulb, List, FileText, Package, Home, User } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';

const Features = () => {
  const featuresList = [
    {
      title: 'Smart Home Integration',
      description: 'Verbinde und steuere alle deine Smart-Home-Geräte von unterschiedlichen Herstellern zentral über eine Plattform.',
      icon: <Lightbulb className="h-6 w-6" />,
      action: <Button variant="link" className="p-0">Mehr erfahren</Button>
    },
    {
      title: 'Aufgabenmanagement',
      description: 'Organisiere alle Haushaltsaufgaben, erstelle wiederkehrende Erinnerungen und teile sie mit Familienmitgliedern.',
      icon: <List className="h-6 w-6" />,
      action: <Button variant="link" className="p-0">Mehr erfahren</Button>
    },
    {
      title: 'Kalenderintegration',
      description: 'Synchronisiere externe Kalender und behalte alle wichtigen Termine für deinen Haushalt im Blick.',
      icon: <Calendar className="h-6 w-6" />,
      action: <Button variant="link" className="p-0">Mehr erfahren</Button>
    },
    {
      title: 'Finanzverwaltung',
      description: 'Behalte den Überblick über Haushaltsbudgets, gemeinsame Ausgaben und potenzielle Einsparmöglichkeiten.',
      icon: <CreditCard className="h-6 w-6" />,
      action: <Button variant="link" className="p-0">Mehr erfahren</Button>
    },
    {
      title: 'Dokumentenarchiv',
      description: 'Speichere wichtige Dokumente sicher in der Cloud und finde sie schnell durch die intelligente Suchfunktion.',
      icon: <FileText className="h-6 w-6" />,
      action: <Button variant="link" className="p-0">Mehr erfahren</Button>
    },
    {
      title: 'Vorratsmanagement',
      description: 'Behalte den Überblick über deine Vorräte, erstelle automatisch Einkaufslisten und vermeide unnötige Einkäufe.',
      icon: <Package className="h-6 w-6" />,
      action: <Button variant="link" className="p-0">Mehr erfahren</Button>
    },
    {
      title: 'Haushaltsplanung',
      description: 'Plane Renovierungen, Wartungen und andere Haushaltsaufgaben und behalte alle Kosten im Blick.',
      icon: <Home className="h-6 w-6" />,
      action: <Button variant="link" className="p-0">Mehr erfahren</Button>
    },
    {
      title: 'Familienfunktionen',
      description: 'Teile Aufgaben, Termine und Dokumente mit Familienmitgliedern und bleibe immer in Verbindung.',
      icon: <User className="h-6 w-6" />,
      action: <Button variant="link" className="p-0">Mehr erfahren</Button>
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-homepilot-secondary bg-opacity-10 text-homepilot-secondary text-sm font-medium mb-4">
            <span className="mr-2">🚀</span>
            Funktionen
          </div>
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
              action={feature.action}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
