
import React, { useState, useEffect } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { EnhancedLazyImage } from '@/components/ui/enhanced-lazy-image';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState<'initializing' | 'components' | 'finishing' | 'ready'>('initializing');
  const navigate = useNavigate();

  // Verbesserte Loading-Animation mit mehr Feedback und Phasen
  useEffect(() => {
    const checkLoginState = async () => {
      try {
        // Phase 1: Initialisierung
        setLoadingProgress(10);
        setLoadingPhase('initializing');
        
        // Überprüfe den Login-Status
        const savedLoginState = localStorage.getItem('homepilot_logged_in');
        await new Promise(resolve => setTimeout(resolve, 150));
        
        // Phase 2: Komponenten laden
        setLoadingProgress(30);
        setLoadingPhase('components');
        await new Promise(resolve => setTimeout(resolve, 200));
        setLoadingProgress(60);
        
        // Phase 3: Fertigstellen
        setLoadingPhase('finishing');
        setLoadingProgress(80);
        await new Promise(resolve => setTimeout(resolve, 150));
        
        if (savedLoginState === 'true') {
          setIsLoggedIn(true);
          setLoadingProgress(90);
          
          // Füge eine sanfte Übergangsphase hinzu
          setTimeout(() => {
            setLoadingProgress(100);
            setLoadingPhase('ready');
            setTimeout(() => navigate('/dashboard'), 300);
          }, 200);
        } else {
          setLoadingProgress(100);
          setLoadingPhase('ready');
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
      
      // Zeige kurz einen Ladebildschirm vor der Navigation
      setIsLoading(true);
      setLoadingProgress(50);
      setLoadingPhase('finishing');
      
      setTimeout(() => {
        setLoadingProgress(100);
        setLoadingPhase('ready');
        navigate('/dashboard');
      }, 600);
    } catch (error) {
      console.error('Fehler beim Speichern im localStorage:', error);
      // Fallback, wenn localStorage nicht verfügbar ist
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  };

  // Verbesserte Loading-Anzeige mit mehr visuellen Elementen und Feedback
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center max-w-md px-4">
          <div className="inline-flex flex-col items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-homepilot-primary/20 flex items-center justify-center">
                <HomeIcon className="h-8 w-8 text-homepilot-primary animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-homepilot-primary border-t-transparent animate-spin" />
            </div>
            <h2 className="mt-4 text-xl font-medium text-homepilot-secondary">HomePilot</h2>
          </div>
          
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 mb-2">
            <div 
              className="h-full bg-gradient-to-r from-homepilot-primary to-homepilot-secondary transition-all duration-300 ease-out" 
              style={{ width: `${loadingProgress}%` }}
              role="progressbar"
              aria-valuenow={loadingProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
            {loadingPhase === 'initializing' && "Initialisiere HomePilot..."}
            {loadingPhase === 'components' && "Lade Komponenten..."}
            {loadingPhase === 'finishing' && "Starte Anwendung..."}
            {loadingPhase === 'ready' && "Bereit!"}
          </p>
          
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 opacity-80">
            {loadingProgress < 30 && "System wird vorbereitet"}
            {loadingProgress >= 30 && loadingProgress < 60 && "Module werden geladen"}
            {loadingProgress >= 60 && loadingProgress < 90 && "Daten werden synchronisiert"}
            {loadingProgress >= 90 && "Fast fertig"}
          </p>
          
          {/* Loading-Details für besseres Feedback */}
          <div className="mt-6 text-xs text-gray-400">
            {loadingPhase === 'components' && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-homepilot-primary rounded-full mr-2" />
                  <span>Benutzerprofile geladen</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-homepilot-primary rounded-full mr-2" />
                  <span>Systemmeldungen geladen</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-homepilot-primary/40 rounded-full mr-2" />
                  <span>Smart Home Komponenten werden geladen...</span>
                </div>
              </div>
            )}
            
            {loadingPhase === 'finishing' && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-homepilot-primary rounded-full mr-2" />
                  <span>Komponenten geladen</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-homepilot-primary rounded-full mr-2" />
                  <span>Daten synchronisiert</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-homepilot-primary/40 rounded-full mr-2" />
                  <span>Verbindung wird hergestellt...</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="fixed bottom-4 text-xs text-center text-gray-500 dark:text-gray-400">
          © 2025 HomePilot • Alle Komponenten werden geladen
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <LandingPage onLogin={handleLogin} />
      
      <div className="fixed bottom-4 w-full text-center text-xs text-gray-500 dark:text-gray-400">
        © 2025 HomePilot • Alle Rechte vorbehalten
      </div>
    </div>
  );
};

export default Home;
