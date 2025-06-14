
import React, { lazy } from 'react';
import DashboardHouseOverview from '@/components/dashboard/DashboardHouseOverview';
import DashboardWelcomeHeader from './DashboardWelcomeHeader';
import DashboardWidgetWrapper from './DashboardWidgetWrapper';
import { useDashboardData } from '@/hooks/useDashboardData'; // Import the new hook

// Lazy loading for heavy components
const LiveCoachWidget = lazy(() => import('@/components/dashboard/LiveCoachWidget'));
const DashboardFinancialOverview = lazy(() => import('@/components/dashboard/DashboardFinancialOverview'));
const DashboardSmartHome = lazy(() => import('@/components/dashboard/DashboardSmartHome'));

const DashboardContent: React.FC = () => {
  const today = new Date();
  const { familyMembers } = useDashboardData(); // Use the hook to get familyMembers

  // The hook now manages tasks, appointments, handlers, and conflicts.
  // If these were to be used directly in this component's JSX,
  // you would destructure them from useDashboardData() as well.
  // e.g., const { tasks, appointments, handleTaskComplete, hasConflicts } = useDashboardData();
  // For now, functionality remains identical to before where these were defined but not directly rendered by DashboardContent.

  return (
    <div className="max-w-7xl mx-auto">
      <DashboardWelcomeHeader today={today} />
      <DashboardHouseOverview familyMembers={familyMembers} />

      <DashboardWidgetWrapper fallbackClassName="h-96">
        <LiveCoachWidget />
      </DashboardWidgetWrapper>
      
      <DashboardWidgetWrapper fallbackClassName="h-[450px]">
        <DashboardSmartHome />
      </DashboardWidgetWrapper>
      
      <DashboardWidgetWrapper fallbackClassName="h-[400px]">
        <DashboardFinancialOverview />
      </DashboardWidgetWrapper>
    </div>
  );
};

export default DashboardContent;
