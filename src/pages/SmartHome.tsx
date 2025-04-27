
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Lightbulb } from 'lucide-react';

const SmartHome = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <Lightbulb className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Smart Home</h1>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Smart Home Steuerung</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Steuere und verwalte hier deine Smart-Home-Geräte. Verbinde Lichter, Thermostate, Kameras und mehr in einem zentralen Dashboard.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-medium mb-2">Geräte hinzufügen</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Verbinde neue Geräte mit deinem Smart Home System.
                </p>
                <button className="bg-homepilot-primary text-white px-4 py-2 rounded text-sm hover:bg-homepilot-primary/90">
                  Gerät hinzufügen
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-medium mb-2">Szenen erstellen</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Erstelle personalisierte Szenen für verschiedene Situationen.
                </p>
                <button className="bg-homepilot-primary text-white px-4 py-2 rounded text-sm hover:bg-homepilot-primary/90">
                  Neue Szene
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-medium mb-2">Automatisierung</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Erstelle automatische Abläufe basierend auf Zeit oder Ereignissen.
                </p>
                <button className="bg-homepilot-primary text-white px-4 py-2 rounded text-sm hover:bg-homepilot-primary/90">
                  Automation erstellen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHome;
