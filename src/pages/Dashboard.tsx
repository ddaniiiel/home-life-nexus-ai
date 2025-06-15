
import React from 'react';
import { usePerformanceMonitor } from '@/components/performance/LazyComponent';
import ModernDashboardLayout from '@/components/modern-dashboard/ModernDashboardLayout';

const Dashboard = () => {
  // Performance Monitoring
  usePerformanceMonitor();

  return <ModernDashboardLayout />;
};

export default Dashboard;
