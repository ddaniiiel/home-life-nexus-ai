
import React, { useState } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import Dashboard from '@/components/dashboard/Dashboard';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "Max"; // This would come from authentication in a real app

  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isLoggedIn ? (
        <Dashboard userName={userName} onLogout={toggleLoggedIn} />
      ) : (
        <LandingPage onLogin={toggleLoggedIn} />
      )}
    </div>
  );
};

export default Home;
