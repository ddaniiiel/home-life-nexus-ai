
import React from 'react';

const Features = () => {
  return (
    <div id="features" className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Alles unter einem Dach</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            HomePilot vereint all deine Heimmanagement-Aufgaben in einer übersichtlichen Plattform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-homepilot-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Home Steuerung</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Steuere all deine Smart-Home-Geräte zentral mit HomePilot. Unterstützung für Philips Hue, Homematic, Loxone und viele weitere.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-homepilot-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Aufgaben & Erinnerungen</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Behalte alle Aufgaben im Haushalt im Blick. Von regelmässigen Wartungsarbeiten bis hin zu wichtigen Terminen und Fristen.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-homepilot-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Kalender Integration</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Synchronisiere deinen Familienkalender und verpasse nie wieder wichtige Termine. Mit Erinnerungsfunktionen für den ganzen Haushalt.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-homepilot-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Energieüberwachung</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Behalte deinen Energieverbrauch im Auge und entdecke Einsparpotenziale. Mit detaillierten Analysen und Vergleichen.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-homepilot-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Finanzübersicht</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Behalte alle Haushaltskosten im Blick und plane zukünftige Ausgaben. Mit automatischer Kategorisierung und Budgetplanung.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-homepilot-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Vorratsmanagement</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Behalte den Überblick über deine Vorräte und erstelle automatisch Einkaufslisten mit der Bring! App Integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
