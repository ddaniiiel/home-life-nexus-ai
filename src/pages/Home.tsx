
import React, { useState, useEffect } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useNavigate } from 'react-router-dom';
import { Loader2, HomeIcon } from 'lucide-react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();

  // Simuliere einen Ladeprozess mit mehreren Stufen
  useEffect(() => {
    const checkLoginState = async () => {
      try {
        setLoadingProgress(10);
        
        // Überprüfe den Login-Status
        const savedLoginState = localStorage.getItem('homepilot_logged_in');
        setLoadingProgress(30);
        
        // Kleine Verzögerung für UX
        await new Promise(resolve => setTimeout(resolve, 100));
        setLoadingProgress(60);
        
        if (savedLoginState === 'true') {
          setIsLoggedIn(true);
          setLoadingProgress(90);
          
          // Füge eine kleine Verzögerung für sanftere Übergänge hinzu
          setTimeout(() => {
            setLoadingProgress(100);
            navigate('/dashboard');
          }, 300);
        } else {
          setLoadingProgress(100);
          setTimeout(() => setIsLoading(false), 200);
        }
      } catch (error) {
        console.error('Fehler beim Zugriff auf localStorage:', error);
        setLoadingProgress(100);
        setIsLoading(false);
      }
    };

    checkLoginState();
  }, [navigate]);

  const handleLogin = () => {
    try {
      // Login-Zustand für die Persistenz im localStorage speichern
      localStorage.setItem('homepilot_logged_in', 'true');
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Fehler beim Speichern im localStorage:', error);
      // Fallback, wenn localStorage nicht verfügbar ist
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="inline-flex flex-col items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-homepilot-primary/20 flex items-center justify-center">
                <HomeIcon className="h-8 w-8 text-homepilot-primary animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-homepilot-primary border-t-transparent animate-spin" />
            </div>
            <h2 className="mt-4 text-xl font-medium text-homepilot-secondary">HomePilot</h2>
          </div>
          
          <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-homepilot-primary to-homepilot-secondary transition-all duration-300 ease-out" 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {loadingProgress < 30 && "Initialisiere HomePilot..."}
            {loadingProgress >= 30 && loadingProgress < 60 && "Lade Komponenten..."}
            {loadingProgress >= 60 && loadingProgress < 90 && "Fast fertig..."}
            {loadingProgress >= 90 && "Starte Anwendung..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingPage onLogin={handleLogin} />
    </div>
  );
};

export default Home;
