
import React, { useState, useEffect } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if we have saved login state on mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem('homepilot_logged_in');
    if (savedLoginState === 'true') {
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = () => {
    // Save login state to localStorage for persistence
    localStorage.setItem('homepilot_logged_in', 'true');
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingPage onLogin={handleLogin} />
    </div>
  );
};

export default Home;
