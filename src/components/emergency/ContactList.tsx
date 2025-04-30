
import React from 'react';
import { User, ChevronRight, MapPin, AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Contact {
  id: number;
  name: string;
  role: string;
  phone: string;
  address?: string;
  email?: string;
  info?: string;
  category: string;
}

interface ContactListProps {
  contacts: Contact[];
  category?: string;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, category }) => {
  const filteredContacts = category ? contacts.filter(contact => contact.category === category) : contacts;

  return (
    <div className="space-y-4">
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                contact.category === "emergency" ? "bg-red-100" : 
                contact.category === "medical" ? "bg-blue-100" :
                contact.category === "service" ? "bg-yellow-100" : "bg-green-100"
              )}>
                {contact.category === "emergency" ? (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                ) : (
                  <User className={cn(
                    "h-5 w-5",
                    contact.category === "medical" ? "text-blue-500" :
                    contact.category === "service" ? "text-yellow-500" : "text-green-500"
                  )} />
                )}
              </div>
              <div className="ml-3">
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.role}</p>
                {contact.address && category !== "all" && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{contact.address}</span>
                  </div>
                )}
                {contact.info && category === "personal" && <p className="text-xs text-gray-500 mt-1">{contact.info}</p>}
              </div>
            </div>
            <div className="flex items-center">
              {category !== "all" ? (
                <a href={`tel:${contact.phone}`} className={cn(
                  "font-medium",
                  contact.category === "emergency" ? "text-red-500" : 
                  contact.category === "medical" ? "text-blue-500" :
                  contact.category === "service" ? "text-yellow-500" : "text-green-500"
                )}>{contact.phone}</a>
              ) : (
                <Badge variant="outline" className={cn(
                  contact.category === "emergency" ? "bg-red-50 text-red-600 border-red-200" : 
                  contact.category === "medical" ? "bg-blue-50 text-blue-600 border-blue-200" :
                  contact.category === "service" ? "bg-yellow-50 text-yellow-600 border-yellow-200" : 
                  "bg-green-50 text-green-600 border-green-200"
                )}>
                  {contact.category === "emergency" ? "Notfalldienst" : 
                  contact.category === "medical" ? "Medizinisch" :
                  contact.category === "service" ? "Service" : "Persönlich"}
                </Badge>
              )}
              <Button variant="ghost" size="icon" className="ml-2">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">
          Keine Kontakte gefunden.
        </div>
      )}
    </div>
  );
};

export default ContactList;
