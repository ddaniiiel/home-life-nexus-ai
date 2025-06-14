
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { usePerformanceMonitor } from '@/components/performance/LazyComponent';
import DashboardContent from '@/components/dashboard/DashboardContent'; // New import

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Performance Monitoring
  usePerformanceMonitor();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
