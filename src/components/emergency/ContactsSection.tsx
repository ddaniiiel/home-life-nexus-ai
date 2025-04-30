
import React, { useState } from 'react';
import { Search, PlusCircle, Phone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import ContactList, { Contact } from './ContactList';
import ContactForm from './ContactForm';

interface ContactsSectionProps {
  initialContacts: Contact[];
}

const ContactsSection: React.FC<ContactsSectionProps> = ({ initialContacts }) => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name: '',
    role: '',
    phone: '',
    address: '',
    email: '',
    info: '',
    category: 'personal'
  });
  
  const addNewContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Fehler",
        description: "Name und Telefonnummer müssen angegeben werden.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    
    setContacts([
      ...contacts,
      {
        ...newContact,
        id: newId
      }
    ]);
    
    toast({
      title: "Kontakt hinzugefügt",
      description: `${newContact.name} wurde zu den Notfallkontakten hinzugefügt.`,
    });
    
    // Reset form
    setNewContact({
      name: '',
      role: '',
      phone: '',
      address: '',
      email: '',
      info: '',
      category: 'personal'
    });
  };
  
  const filteredContacts = searchQuery 
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notfallkontakte</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Kontakte suchen..." 
                className="pl-10 w-[200px]" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Kontakt hinzufügen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Neuen Notfallkontakt hinzufügen</DialogTitle>
                  <DialogDescription>
                    Füge einen wichtigen Kontakt für Notfallsituationen hinzu.
                  </DialogDescription>
                </DialogHeader>
                
                <ContactForm 
                  newContact={newContact} 
                  setNewContact={setNewContact} 
                  addNewContact={addNewContact}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">Alle</TabsTrigger>
            <TabsTrigger value="emergency">Notdienste</TabsTrigger>
            <TabsTrigger value="medical">Medizinisch</TabsTrigger>
            <TabsTrigger value="personal">Persönlich</TabsTrigger>
            <TabsTrigger value="service">Service</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ContactList contacts={filteredContacts} />
          </TabsContent>
          
          <TabsContent value="emergency">
            <ContactList contacts={contacts} category="emergency" />
          </TabsContent>
          
          <TabsContent value="medical">
            <ContactList contacts={contacts} category="medical" />
          </TabsContent>
          
          <TabsContent value="personal">
            <ContactList contacts={contacts} category="personal" />
          </TabsContent>
          
          <TabsContent value="service">
            <ContactList contacts={contacts} category="service" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContactsSection;
