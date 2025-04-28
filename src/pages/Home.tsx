
import React, { useState } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingPage onLogin={handleLogin} />
    </div>
  );
};

export default Home;
