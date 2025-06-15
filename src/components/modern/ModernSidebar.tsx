
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, FileText, Calendar, CheckSquare, CreditCard, 
  PieChart, Package, Settings, Search, User, Bell,
  Shield, TrendingUp, Car, Briefcase, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ModernSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const navigationGroups = [
    {
      title: 'Hauptbereich',
      items: [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Smart Home', href: '/smart-home', icon: Shield },
      ]
    },
    {
      title: 'Organisation',
      items: [
        { name: 'Aufgaben', href: '/tasks', icon: CheckSquare },
        { name: 'Kalender', href: '/calendar', icon: Calendar },
        { name: 'Dokumente', href: '/documents', icon: FileText },
      ]
    },
    {
      title: 'Finanzen',
      items: [
        { name: 'Übersicht', href: '/finances', icon: CreditCard },
        { name: 'Investitionen', href: '/investments', icon: TrendingUp },
        { name: 'Berichte', href: '/reports', icon: PieChart },
      ]
    },
    {
      title: 'Weiteres',
      items: [
        { name: 'Inventar', href: '/inventory', icon: Package },
        { name: 'Nachrichten', href: '/news', icon: Briefcase },
        { name: 'Notfall', href: '/emergency', icon: Car },
      ]
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 flex flex-col",
        isOpen ? "w-80" : "w-0 lg:w-20",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            {(isOpen || window.innerWidth >= 1024) && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-homepilot-primary to-homepilot-secondary rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                {isOpen && (
                  <div>
                    <h1 className="text-xl font-bold text-homepilot-secondary">HomePilot</h1>
                    <p className="text-sm text-gray-500">Familienorganisation</p>
                  </div>
                )}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        {isOpen && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Suchen..."
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-0"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 overflow-y-auto">
          {navigationGroups.map((group) => (
            <div key={group.title} className="mb-6">
              {isOpen && (
                <h3 className="px-2 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group",
                        isActive(item.href)
                          ? "bg-homepilot-primary text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-homepilot-primary"
                      )}
                    >
                      <item.icon className={cn(
                        "w-5 h-5 flex-shrink-0",
                        isOpen ? "mr-3" : "mx-auto"
                      )} />
                      {isOpen && (
                        <span className="truncate">{item.name}</span>
                      )}
                      {!isOpen && (
                        <span className="absolute left-16 px-2 py-1 ml-2 text-sm text-white bg-gray-900 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                          {item.name}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {isOpen ? (
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>TH</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Thomas Huber
                </p>
                <p className="text-xs text-gray-500 truncate">
                  thomas@familie-huber.ch
                </p>
              </div>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>TH</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default ModernSidebar;
