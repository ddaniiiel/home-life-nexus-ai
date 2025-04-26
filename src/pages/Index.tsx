
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/landing/LandingPage';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "Max";

  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      {isLoggedIn ? (
        <Dashboard userName={userName} onLogout={toggleLoggedIn} />
      ) : (
        <LandingPage onLogin={toggleLoggedIn} />
      )}
    </div>
  );
};

export default Index;
