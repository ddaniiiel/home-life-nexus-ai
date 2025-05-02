
import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Benefits from './Benefits';
import Footer from './Footer';
import FamilyOverview from './FamilyOverview';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="w-full">
      <Hero onLogin={onLogin} />
      <Features />
      <FamilyOverview />
      <Benefits />
      <Footer />
    </div>
  );
};

export default LandingPage;
