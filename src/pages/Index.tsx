
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import TaskWidget from '@/components/TaskWidget';
import CalendarWidget from '@/components/CalendarWidget';
import EmergencyContacts from '@/components/EmergencyContacts';
import DocumentCategorization from '@/components/DocumentCategorization'; 
import SmartHomeWidget from '@/components/SmartHomeWidget';

import DashboardWelcomeHeader from '@/components/dashboard/DashboardWelcomeHeader';
import DashboardIconGrid from '@/components/dashboard/DashboardIconGrid';
import EnergyUsageWidget from '@/components/dashboard/EnergyUsageWidget';
import ImportantDocumentsWidget from '@/components/dashboard/ImportantDocumentsWidget';
import BudgetWidget from '@/components/dashboard/BudgetWidget';
import InsuranceWidget from '@/components/dashboard/InsuranceWidget';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-20 px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <DashboardWelcomeHeader />
          <DashboardIconGrid />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">            
            <div className="space-y-8 lg:col-span-1">
              <TaskWidget />
              <EnergyUsageWidget />
            </div>
            
            <div className="space-y-8 lg:col-span-2">
              <CalendarWidget />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ImportantDocumentsWidget />
                <EmergencyContacts />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6 mt-10 text-foreground/90">Haushalt & Finanzen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <SmartHomeWidget />
            <BudgetWidget />
            <InsuranceWidget />
          </div>

          <DocumentCategorization />
        </div>
      </div>
    </div>
  );
};

export default Index;
