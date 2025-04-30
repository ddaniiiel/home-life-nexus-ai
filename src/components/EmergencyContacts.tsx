
import React from 'react';
import { Phone, Heart, Shield, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface EmergencyContact {
  id: number;
  name: string;
  category: string;
  phone: string;
  priority: 'high' | 'medium' | 'normal';
  notes?: string;
}

const EmergencyContacts = () => {
  const contacts: EmergencyContact[] = [
    { id: 1, name: 'Notfall (Sanitätsnotruf)', category: 'Notfall', phone: '144', priority: 'high', notes: 'Bei lebensbedrohlichen Situationen' },
    { id: 2, name: 'Polizei (Notruf)', category: 'Sicherheit', phone: '117', priority: 'high' },
    { id: 3, name: 'Feuerwehr', category: 'Notfall', phone: '118', priority: 'high' },
    { id: 4, name: 'Giftnotruf', category: 'Gesundheit', phone: '145', priority: 'high', notes: 'Bei Vergiftungen' },
    { id: 5, name: 'Dr. Müller', category: 'Hausarzt', phone: '+41 44 123 45 67', priority: 'medium' },
    { id: 6, name: 'Dr. Weber', category: 'Kinderarzt', phone: '+41 44 234 56 78', priority: 'medium' },
    { id: 7, name: 'Dr. Schmidt', category: 'Zahnarzt', phone: '+41 44 345 67 89', priority: 'normal' },
    { id: 8, name: 'Universitätsspital Zürich', category: 'Krankenhaus', phone: '+41 44 255 11 11', priority: 'medium' },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Notfall':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Hausarzt':
      case 'Kinderarzt':
      case 'Zahnarzt':
      case 'Gesundheit':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'Krankenhaus':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Sicherheit':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <Phone className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const emergencyContacts = contacts.filter(contact => contact.priority === 'high');
  const medicalContacts = contacts.filter(contact => 
    ['Hausarzt', 'Kinderarzt', 'Zahnarzt', 'Krankenhaus'].includes(contact.category)
  );

  return (
    <Card className="border-homepilot-primary/20">
      <CardHeader className="bg-gradient-to-r from-red-50 to-transparent border-b border-red-100">
        <div className="flex items-center gap-2">
          <div className="bg-red-100 p-2 rounded-full">
            <Phone className="h-5 w-5 text-red-600" />
          </div>
          <CardTitle className="text-lg text-red-700">Notfallkontakte</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-3">
          <h3 className="font-medium text-red-700 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Notrufnummern
          </h3>
          
          {emergencyContacts.map(contact => (
            <div key={contact.id} className="p-3 rounded-lg border border-red-100 bg-red-50 flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  {getCategoryIcon(contact.category)}
                  <span className="font-medium text-sm ml-2">{contact.name}</span>
                </div>
                {contact.notes && (
                  <p className="text-xs text-gray-600 mt-0.5">{contact.notes}</p>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white hover:bg-red-50"
                asChild
              >
                <a href={`tel:${contact.phone}`} className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span className="font-bold">{contact.phone}</span>
                </a>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-homepilot-secondary flex items-center gap-2">
            <Heart className="h-4 w-4" /> Medizinische Kontakte
          </h3>
          
          {medicalContacts.map(contact => (
            <div key={contact.id} className="p-3 rounded-lg border border-homepilot-accent/30 bg-homepilot-accent/5 flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  {getCategoryIcon(contact.category)}
                  <span className="font-medium text-sm ml-2">{contact.name}</span>
                </div>
                <p className="text-xs text-gray-600">{contact.category}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-homepilot-accent/10"
                asChild
              >
                <a href={`tel:${contact.phone}`} className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{contact.phone}</span>
                </a>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="text-xs text-gray-500">
            Hinweis: Bei lebensbedrohlichen Situationen immer 144 wählen
          </div>
          <Link to="/emergency" className="text-xs text-red-600 hover:underline">
            Alle Notfallkontakte →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;
