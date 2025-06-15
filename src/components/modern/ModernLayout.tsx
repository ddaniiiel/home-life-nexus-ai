
import React, { useState } from 'react';
import ModernSidebar from './ModernSidebar';
import ModernHeader from './ModernHeader';
import { cn } from '@/lib/utils';

interface ModernLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ 
  children, 
  title,
  subtitle,
  className 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModernSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="lg:ml-20 transition-all duration-300">
        <ModernHeader 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={title}
          subtitle={subtitle}
        />
        
        <main className={cn("p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ModernLayout;
