
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Home, Lightbulb, Calendar, FileText, CreditCard, Package, BarChart3, 
  Settings, ChevronDown, ChevronRight, Users, Shield, Newspaper, Plus,
  Search, Bell, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface ModernSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavCategory {
  title: string;
  items: NavItem[];
  icon: React.ReactNode;
  defaultOpen?: boolean;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  description?: string;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ isOpen, onToggle }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['dashboard', 'zuhause'])
  );
  const [searchQuery, setSearchQuery] = useState('');

  const navCategories: NavCategory[] = [
    {
      title: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      defaultOpen: true,
      items: [
        { path: '/', label: 'Übersicht', icon: <Home className="h-4 w-4" />, description: 'Hauptdashboard' },
        { path: '/reports', label: 'Berichte', icon: <BarChart3 className="h-4 w-4" />, description: 'Analysen & Statistiken' },
      ]
    },
    {
      title: 'Zuhause',
      icon: <Lightbulb className="h-4 w-4" />,
      defaultOpen: true,
      items: [
        { path: '/smart-home', label: 'Smart Home', icon: <Lightbulb className="h-4 w-4" />, description: 'Geräte & Automation' },
        { path: '/energy', label: 'Energie', icon: <BarChart3 className="h-4 w-4" />, description: 'Verbrauch & Optimierung' },
        { path: '/security', label: 'Sicherheit', icon: <Shield className="h-4 w-4" />, description: 'Überwachung & Schutz' },
      ]
    },
    {
      title: 'Familie',
      icon: <Users className="h-4 w-4" />,
      items: [
        { path: '/tasks', label: 'Aufgaben', icon: <Calendar className="h-4 w-4" />, description: 'To-dos & Termine' },
        { path: '/calendar', label: 'Kalender', icon: <Calendar className="h-4 w-4" />, description: 'Familienkalender' },
        { path: '/communication', label: 'Kommunikation', icon: <Users className="h-4 w-4" />, description: 'Nachrichten & Pinnwand' },
      ]
    },
    {
      title: 'Dokumente & Finanzen',
      icon: <FileText className="h-4 w-4" />,
      items: [
        { path: '/documents', label: 'Dokumente', icon: <FileText className="h-4 w-4" />, description: 'Dateien & Archive' },
        { path: '/finances', label: 'Finanzen', icon: <CreditCard className="h-4 w-4" />, description: 'Budget & Ausgaben' },
        { path: '/inventory', label: 'Inventar', icon: <Package className="h-4 w-4" />, description: 'Besitz & Gegenstände' },
      ]
    },
    {
      title: 'Weitere',
      icon: <Newspaper className="h-4 w-4" />,
      items: [
        { path: '/news', label: 'Nachrichten', icon: <Newspaper className="h-4 w-4" /> },
        { path: '/emergency', label: 'Notfälle', icon: <Shield className="h-4 w-4" />, badge: 'Wichtig' },
        { path: '/settings', label: 'Einstellungen', icon: <Settings className="h-4 w-4" /> },
      ]
    }
  ];

  const toggleCategory = (categoryTitle: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryTitle)) {
      newExpanded.delete(categoryTitle);
    } else {
      newExpanded.add(categoryTitle);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredCategories = navCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const userProfile = {
    name: "Thomas Schmidt",
    email: "thomas@example.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    role: "Administrator"
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggle}
      />

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 flex flex-col",
        isOpen ? "w-80" : "w-16 md:w-80"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className={cn("flex items-center", !isOpen && "md:flex hidden")}>
            <div className="bg-homepilot-primary text-white p-2 rounded-lg mr-3">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-homepilot-secondary">HomePilot</h1>
              <p className="text-xs text-gray-500">Smart Home Center</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggle} className="md:hidden">
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Search */}
        <div className={cn("p-4", !isOpen && "md:block hidden")}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-0"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {filteredCategories.map((category) => (
            <div key={category.title} className="mb-6">
              <button
                onClick={() => toggleCategory(category.title)}
                className={cn(
                  "w-full flex items-center justify-between p-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors",
                  !isOpen && "md:flex hidden"
                )}
              >
                <div className="flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.title}</span>
                </div>
                {expandedCategories.has(category.title) ? 
                  <ChevronDown className="h-3 w-3" /> : 
                  <ChevronRight className="h-3 w-3" />
                }
              </button>

              {expandedCategories.has(category.title) && (
                <div className={cn("mt-2 space-y-1", !isOpen && "md:block hidden")}>
                  {category.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => window.innerWidth < 768 && onToggle()}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center px-3 py-2 text-sm rounded-lg transition-all group",
                          isActive
                            ? "bg-homepilot-primary text-white shadow-sm"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                        )
                      }
                    >
                      <div className="flex items-center flex-1">
                        {item.icon}
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <Badge size="sm" className="ml-2 bg-red-500 text-white">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs opacity-75 mt-0.5">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className={cn("p-4 border-t border-gray-200 dark:border-gray-800", !isOpen && "md:block hidden")}>
          <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userProfile.image} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1">
              <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{userProfile.name}</p>
              <p className="text-xs text-gray-500">{userProfile.role}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-homepilot-primary hover:bg-homepilot-primary/90 z-40"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </>
  );
};

export default ModernSidebar;
