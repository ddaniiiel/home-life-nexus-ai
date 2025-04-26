
import React from 'react';
import { Check, Brain, Gauge, Shield } from 'lucide-react';

const Benefits = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-homepilot-accent bg-opacity-10 text-homepilot-accent text-sm font-medium mb-4">
            <span className="mr-2">🎯</span>
            Vorteile
          </div>
          <h2 className="text-3xl font-bold mb-4">Warum HomePilot?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Mit HomePilot wird die Verwaltung deines Zuhauses und Alltags einfacher, intelligenter und effizienter.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 mb-16">
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
              <Brain className="w-8 h-8 text-homepilot-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">KI-Unterstützung</h3>
            <p className="text-gray-600 dark:text-gray-300">
              HomePilot lernt deine Gewohnheiten und gibt proaktiv Empfehlungen, die dir Zeit und Geld sparen.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-homepilot-secondary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gauge className="w-8 h-8 text-homepilot-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Für alle zugänglich</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Einfache Bedienung, Barrierefreiheit und flexible Anpassungsmöglichkeiten machen HomePilot für jeden Haushalt nutzbar.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-homepilot-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-homepilot-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sichere Daten</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Deine Daten werden verschlüsselt und sicher gespeichert. Du behältst immer die volle Kontrolle über deine Informationen.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Bereit, dein Zuhause intelligenter zu machen?</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Probiere HomePilot noch heute aus und erlebe, wie einfach die Verwaltung deines Zuhauses und Alltags sein kann.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-homepilot-secondary mt-1 mr-2" />
                  <span className="text-sm">Kostenlose Basis-Version</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-homepilot-secondary mt-1 mr-2" />
                  <span className="text-sm">Keine Kreditkarte nötig</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-homepilot-secondary mt-1 mr-2" />
                  <span className="text-sm">Vollständig anpassbar</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-homepilot-secondary mt-1 mr-2" />
                  <span className="text-sm">Premium-Support</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md">
              <h4 className="text-xl font-semibold mb-4">Kostenlos starten</h4>
              <p className="text-gray-500 dark:text-gray-300 mb-6">
                Registriere dich jetzt und starte mit der kostenlosen Version von HomePilot.
              </p>
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-homepilot-primary text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
                >
                  Kostenlos registrieren
                </button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                Durch die Registrierung stimmst du unseren Nutzungsbedingungen und Datenschutzrichtlinien zu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
