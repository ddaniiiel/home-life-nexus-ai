
import React, { useState, useEffect } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if we have saved login state on mount with improved error handling
  useEffect(() => {
    try {
      const savedLoginState = localStorage.getItem('homepilot_logged_in');
      if (savedLoginState === 'true') {
        setIsLoggedIn(true);
        // Add a small delay for smoother transition
        setTimeout(() => {
          navigate('/dashboard');
        }, 300);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogin = () => {
    try {
      // Save login state to localStorage for persistence
      localStorage.setItem('homepilot_logged_in', 'true');
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Fallback if localStorage is not available
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-homepilot-primary"></div>
          <p className="mt-4 text-homepilot-secondary">Lade HomePilot...</p>
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
