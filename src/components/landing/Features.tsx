
import React from 'react';
import { Calendar, CreditCard, Lightbulb, List } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';

const Features = () => {
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

  return (
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
  );
};

export default Features;
