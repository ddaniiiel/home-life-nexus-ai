
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, Home, Calendar, ArrowRight } from 'lucide-react';

interface HeroProps {
  onLogin: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLogin }) => {
  return (
    <section className="relative py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-homepilot-primary opacity-10 animate-float"></div>
        <div className="absolute bottom-32 -left-12 w-48 h-48 rounded-full bg-homepilot-accent opacity-10 animate-float" style={{animationDelay: "2s"}}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-homepilot-primary bg-opacity-10 text-homepilot-primary text-sm font-medium mb-6">
              <span className="mr-2">✨</span>
              Willkommen bei HomePilot
            </div>
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
                onClick={onLogin}
                className="bg-homepilot-primary hover:bg-blue-600"
              >
                Dashboard öffnen <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Mehr erfahren
              </Button>
            </div>
            
            <div className="flex items-center mt-10">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">JD</div>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">AF</div>
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white">MK</div>
              </div>
              <p className="ml-4 text-sm text-gray-600 dark:text-gray-300">
                Bereits von <span className="font-medium">1,000+</span> Haushalten genutzt
              </p>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10 animate-fade-in" style={{animationDelay: "0.3s"}}>
            <div className="bg-gradient-to-br from-homepilot-primary to-homepilot-accent rounded-2xl p-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 relative">
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg flex items-center">
                  <Home className="text-homepilot-primary h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Smart Home</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg flex items-center">
                  <Calendar className="text-homepilot-accent h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Kalender</span>
                </div>
                <img 
                  src="https://via.placeholder.com/500x300?text=HomePilot+Dashboard" 
                  alt="HomePilot Dashboard Preview" 
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg flex items-center">
                  <Lightbulb className="text-homepilot-secondary h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">KI Assistent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
