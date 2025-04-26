
import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Benefits from './Benefits';
import Footer from './Footer';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="md:ml-0">
      <Hero onLogin={onLogin} />
      <Features />
      <Benefits />
      <Footer />
    </div>
  );
};

export default LandingPage;
