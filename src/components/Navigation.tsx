
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, List, Settings, Menu, X, CreditCard, BarChart3, Lightbulb, Package, FileText, Bell, User, Newspaper, Wallet, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<NavigationProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/dashboard', current: currentPath === '/dashboard' },
    { name: 'Smart Home', icon: <Lightbulb className="h-5 w-5" />, path: '/smart-home', current: currentPath === '/smart-home' },
    { name: 'Familienkalender', icon: <Calendar className="h-5 w-5" />, path: '/calendar', current: currentPath === '/calendar' },
    { name: 'Aufgaben', icon: <List className="h-5 w-5" />, path: '/tasks', current: currentPath === '/tasks' },
    { name: 'Dokumente', icon: <FileText className="h-5 w-5" />, path: '/documents', current: currentPath === '/documents' },
    { name: 'Finanzen', icon: <CreditCard className="h-5 w-5" />, path: '/finances', current: currentPath === '/finances' },
    { name: 'Haushalt', icon: <Package className="h-5 w-5" />, path: '/inventory', current: currentPath === '/inventory' },
    { name: 'Berichte', icon: <LineChart className="h-5 w-5" />, path: '/reports', current: currentPath === '/reports' },
    { name: 'Nachrichten', icon: <Newspaper className="h-5 w-5" />, path: '/news', current: currentPath === '/news' },
    { name: 'Notfallkontakte', icon: <Bell className="h-5 w-5" />, path: '/emergency', current: currentPath === '/emergency' },
    { name: 'Einstellungen', icon: <Settings className="h-5 w-5" />, path: '/settings', current: currentPath === '/settings' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm z-30">
        <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="text-2xl font-bold text-green-600">HomePilot</Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-base font-medium rounded-lg mb-1 transition-colors duration-200",
                item.current
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                alt="User Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Thomas Müller</p>
              <p className="text-xs text-gray-500">familie@example.com</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white dark:bg-gray-800 shadow-md"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center z-40">
        <Link to="/" className="text-xl font-bold text-green-600">HomePilot</Link>
        <div className="absolute right-4 flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-75 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
              <Link to="/" className="text-2xl font-bold text-green-600">HomePilot</Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="py-4 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 text-base font-medium rounded-lg mb-1 transition-colors duration-200",
                    item.current
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile User Profile Section */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                    alt="User Profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Thomas Müller</p>
                  <p className="text-xs text-gray-500">familie@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
