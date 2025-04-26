
import React from 'react';
import { Home, Calendar, List, Settings, Menu, X, CreditCard, BarChart3, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<NavigationProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, current: true },
    { name: 'Smart Home', icon: <Lightbulb className="h-5 w-5" />, current: false },
    { name: 'Aufgaben', icon: <List className="h-5 w-5" />, current: false },
    { name: 'Kalender', icon: <Calendar className="h-5 w-5" />, current: false },
    { name: 'Finanzen', icon: <CreditCard className="h-5 w-5" />, current: false },
    { name: 'Berichte', icon: <BarChart3 className="h-5 w-5" />, current: false },
    { name: 'Einstellungen', icon: <Settings className="h-5 w-5" />, current: false },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col space-y-1 w-64 p-4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="flex items-center mb-6 px-2">
          <span className="text-2xl font-bold text-homepilot-primary">HomePilot</span>
        </div>
        
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={cn(
              "flex items-center px-4 py-3 text-base font-medium rounded-md",
              item.current
                ? "bg-homepilot-primary bg-opacity-10 text-homepilot-primary"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Mobile Navigation Button */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white dark:bg-gray-800"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-75 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-homepilot-primary">HomePilot</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={cn(
                  "flex items-center px-4 py-3 text-base font-medium rounded-md mb-1",
                  item.current
                    ? "bg-homepilot-primary bg-opacity-10 text-homepilot-primary"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
