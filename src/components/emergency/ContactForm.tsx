
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Contact } from './ContactList';

interface ContactFormProps {
  newContact: Omit<Contact, 'id'>;
  setNewContact: React.Dispatch<React.SetStateAction<Omit<Contact, 'id'>>>;
  addNewContact: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ newContact, setNewContact, addNewContact }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Fehler",
        description: "Name und Telefonnummer müssen angegeben werden.",
        variant: "destructive"
      });
      return;
    }
    addNewContact();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input 
            id="name" 
            className="col-span-3" 
            value={newContact.name}
            onChange={(e) => setNewContact({...newContact, name: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">Rolle/Funktion</Label>
          <Input 
            id="role" 
            className="col-span-3" 
            value={newContact.role}
            onChange={(e) => setNewContact({...newContact, role: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">Telefon</Label>
          <Input 
            id="phone" 
            className="col-span-3" 
            value={newContact.phone}
            onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">E-Mail</Label>
          <Input 
            id="email" 
            className="col-span-3" 
            value={newContact.email || ''}
            onChange={(e) => setNewContact({...newContact, email: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address" className="text-right">Adresse</Label>
          <Input 
            id="address" 
            className="col-span-3" 
            value={newContact.address || ''}
            onChange={(e) => setNewContact({...newContact, address: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="info" className="text-right">Hinweise</Label>
          <Input 
            id="info" 
            className="col-span-3" 
            value={newContact.info || ''}
            onChange={(e) => setNewContact({...newContact, info: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">Kategorie</Label>
          <select 
            id="category"
            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            value={newContact.category}
            onChange={(e) => setNewContact({...newContact, category: e.target.value})}
          >
            <option value="emergency">Notfalldienst</option>
            <option value="medical">Medizinisch</option>
            <option value="personal">Persönlich</option>
            <option value="service">Service & Reparatur</option>
          </select>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="submit">Kontakt hinzufügen</Button>
      </DialogFooter>
    </form>
  );
};

export default ContactForm;
