
import React from 'react';
import ModernLayout from '@/components/modern/ModernLayout';
import ModernInventoryPage from '@/components/modern/inventory/ModernInventoryPage';

const Inventory = () => {
  return (
    <ModernLayout 
      title="Inventar" 
      subtitle="Verwalten Sie Ihren Haushaltsbesitz"
    >
      <ModernInventoryPage />
    </ModernLayout>
  );
};

export default Inventory;
