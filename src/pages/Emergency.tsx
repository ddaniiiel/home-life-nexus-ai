
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Phone } from 'lucide-react';
import { 
  initialContacts, 
  initialEmergencyPlans, 
  initialImportantDocuments 
} from '@/components/emergency/data/initialData';
import ContactsSection from '@/components/emergency/ContactsSection';
import EmergencyEquipment from '@/components/emergency/EmergencyEquipment';
import EmergencyPlans from '@/components/emergency/EmergencyPlans';
import ImportantDocuments from '@/components/emergency/ImportantDocuments';

const Emergency = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-red-500 bg-opacity-10 p-3 rounded-full mr-4">
              <Phone className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold">Notfallkontakte & -pläne</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <ContactsSection initialContacts={initialContacts} />
            <EmergencyEquipment />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EmergencyPlans plans={initialEmergencyPlans} />
            <ImportantDocuments documents={initialImportantDocuments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
