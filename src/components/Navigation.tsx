
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, LayoutDashboard, Lightbulb, Calendar, FileText, 
  CreditCard, Package, BarChart3, Settings, Menu, X, Bell, 
  Search, User, Shield, Newspaper, LineChart
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { path: '/smart-home', icon: <Lightbulb className="h-5 w-5" />, label: 'Smart Home' },
    { path: '/tasks', icon: <Calendar className="h-5 w-5" />, label: 'Aufgaben & Termine' },
    { path: '/documents', icon: <FileText className="h-5 w-5" />, label: 'Dokumente' },
    { path: '/finances', icon: <CreditCard className="h-5 w-5" />, label: 'Finanzen' },
    { path: '/inventory', icon: <Package className="h-5 w-5" />, label: 'Inventar' },
    { path: '/news', icon: <Newspaper className="h-5 w-5" />, label: 'Nachrichten' },
    { path: '/reports', icon: <LineChart className="h-5 w-5" />, label: 'Berichte' },
    { path: '/emergency', icon: <Shield className="h-5 w-5" />, label: 'Notfälle', badge: true },
  ];

  const userMenuLinks = [
    { path: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Einstellungen' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // User profile data
  const userProfile = {
    name: "Thomas Schmidt",
    email: "thomas@example.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    role: "Administrator"
  };

  return (
    <>
      {/* Header for mobile and desktop */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-30">
        <div className="flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 mr-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/" className="flex items-center">
            <div className="bg-green-500 text-white p-2 rounded mr-2">
              <Home className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">HomePilot</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none">
              <Search className="h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <button className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none">
              <Bell className="h-5 w-5" />
            </button>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="ml-2 flex items-center">
            <Avatar className="h-8 w-8 border-2 border-green-200 dark:border-green-700">
              <AvatarImage src={userProfile.image} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      {/* Mobile navigation */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div 
        className={`fixed top-16 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-20 md:hidden transform transition-transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg mb-1 ${
                    isActive
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                {link.icon}
                <span className="ml-3">{link.label}</span>
                {link.badge && (
                  <Badge 
                    size="sm"
                    className="ml-auto bg-red-500 text-white hover:bg-red-600"
                  >
                    Neu
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-3 py-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userProfile.image} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium text-gray-800 dark:text-gray-200">{userProfile.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile.email}</p>
              </div>
            </div>
            {userMenuLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg mt-1 ${
                    isActive
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                {link.icon}
                <span className="ml-3">{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      
      {/* Desktop navigation */}
      <div className="fixed top-16 bottom-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10 hidden md:block">
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg mb-1 ${
                    isActive
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                {link.icon}
                <span className="ml-3">{link.label}</span>
                {link.badge && (
                  <Badge 
                    size="sm"
                    className="ml-auto bg-red-500 text-white hover:bg-red-600"
                  >
                    Neu
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-3 py-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userProfile.image} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium text-gray-800 dark:text-gray-200">{userProfile.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile.email}</p>
              </div>
            </div>
            {userMenuLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg mt-1 ${
                    isActive
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                {link.icon}
                <span className="ml-3">{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
