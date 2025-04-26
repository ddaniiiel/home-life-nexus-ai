
import React from 'react';
import { Check } from 'lucide-react';

const Benefits = () => {
  return (
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
      </div>
    </section>
  );
};

export default Benefits;
