
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface HeroProps {
  onLogin: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLogin }) => {
  return (
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
                onClick={onLogin}
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
  );
};

export default Hero;
