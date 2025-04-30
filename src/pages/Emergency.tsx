import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Phone, User, AlertTriangle, Search, PlusCircle, Check, ChevronRight, MapPin, Clock, Calendar, FileText, Shield, BadgeAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface Contact {
  id: number;
  name: string;
  role: string;
  phone: string;
  address?: string;
  email?: string;
  info?: string;
  category: string;
}

interface EmergencyPlan {
  id: number;
  title: string;
  description: string;
  steps: string[];
  lastUpdated: string;
  category: string;
  important?: boolean;
}

interface ImportantDocument {
  id: number;
  name: string;
  description: string;
  location: string;
  lastUpdated: string;
}

const Emergency = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([
    { 
      id: 1, 
      name: 'Dr. Anna Müller', 
      role: 'Hausärztin', 
      phone: '+41 44 123 45 67', 
      address: 'Gesundheitsstrasse 10, 8000 Zürich',
      email: 'anna.mueller@praxis.ch',
      info: 'Sprechzeiten: Mo-Fr 8-17 Uhr',
      category: 'medical'
    },
    { 
      id: 2, 
      name: 'Dr. Thomas Weber', 
      role: 'Kinderarzt', 
      phone: '+41 44 234 56 78',
      address: 'Kinderpraxis, Bahnhofstrasse 15, 8000 Zürich',
      email: 'weber@kinderarzt.ch',
      info: 'Notfallnummer am Wochenende: +41 44 234 56 79',
      category: 'medical'
    },
    { 
      id: 3, 
      name: 'Universitätsspital Zürich', 
      role: 'Notfallstation', 
      phone: '+41 44 255 11 11',
      address: 'Rämistrasse 100, 8091 Zürich',
      category: 'emergency'
    },
    { 
      id: 4, 
      name: 'Kantonspolizei Zürich', 
      role: 'Polizeinotruf', 
      phone: '117',
      category: 'emergency'
    },
    { 
      id: 5, 
      name: 'Feuerwehr', 
      role: 'Notruf', 
      phone: '118',
      category: 'emergency'
    },
    { 
      id: 6, 
      name: 'Sanitätsnotruf', 
      role: 'Ambulanz', 
      phone: '144',
      category: 'emergency'
    },
    { 
      id: 7, 
      name: 'Vergiftungsnotfall', 
      role: 'Toxikologisches Zentrum', 
      phone: '145',
      category: 'emergency'
    },
    { 
      id: 8, 
      name: 'Max Schneider', 
      role: 'Nachbar', 
      phone: '+41 79 123 45 67',
      address: 'Musterstrasse 12, 8000 Zürich',
      info: 'Hat Ersatzschlüssel für die Wohnung',
      category: 'personal'
    },
    { 
      id: 9, 
      name: 'Emma Huber', 
      role: 'Grossmutter', 
      phone: '+41 76 987 65 43',
      address: 'Seniorenresidenz, Altersweg 5, 8400 Winterthur',
      category: 'personal'
    },
    { 
      id: 10, 
      name: 'Autogarage Müller', 
      role: 'KFZ-Werkstatt', 
      phone: '+41 44 111 22 33',
      address: 'Industriestrasse 45, 8005 Zürich',
      email: 'service@garage-mueller.ch',
      category: 'service'
    },
    { 
      id: 11, 
      name: 'Elektro Meier', 
      role: 'Elektriker Notdienst', 
      phone: '+41 79 444 55 66',
      category: 'service'
    },
    { 
      id: 12, 
      name: 'Sanitär Schnell', 
      role: 'Sanitär Notdienst', 
      phone: '+41 79 777 88 99',
      category: 'service'
    },
  ]);
  
  const [emergencyPlans, setEmergencyPlans] = useState<EmergencyPlan[]>([
    {
      id: 1,
      title: 'Feuerevakuierungsplan',
      description: 'Vorgehensweise bei einem Brand im Haus',
      steps: [
        'Ruhe bewahren und alle Familienmitglieder alarmieren',
        'Notruf 118 wählen',
        'Wenn möglich, kleine Brände löschen',
        'Räume verlassen und Türen schliessen (nicht abschliessen)',
        'Zum vereinbarten Sammelpunkt gehen: Parkbank vor dem Haus',
        'Auf Feuerwehr warten und informieren, ob noch Personen im Gebäude sind'
      ],
      lastUpdated: '2025-01-15',
      category: 'home',
      important: true
    },
    {
      id: 2,
      title: 'Medizinischer Notfall',
      description: 'Vorgehen bei medizinischen Notfällen',
      steps: [
        'Situation einschätzen: Bewusstsein, Atmung, Blutung',
        'Bei lebensbedrohlichen Situationen sofort 144 anrufen',
        'Erste Hilfe leisten falls möglich',
        'Bei Kindern: Kinderarzt Dr. Weber kontaktieren (+41 44 234 56 78)',
        'Bei Erwachsenen: Hausärztin Dr. Müller kontaktieren (+41 44 123 45 67)',
        'Notfallapotheke befindet sich im Badezimmerschrank'
      ],
      lastUpdated: '2025-02-20',
      category: 'medical',
      important: true
    },
    {
      id: 3,
      title: 'Wasserschaden',
      description: 'Maßnahmen bei einem Wasserschaden',
      steps: [
        'Hauptwasserhahn schließen (Keller, rechte Seite neben Heizung)',
        'Sanitär Notdienst kontaktieren: Sanitär Schnell (+41 79 777 88 99)',
        'Wertgegenstände aus dem betroffenen Bereich in Sicherheit bringen',
        'Wenn möglich, Wasser aufwischen um Folgeschäden zu vermeiden',
        'Hausratversicherung informieren: Police Nr. 123456789'
      ],
      lastUpdated: '2024-11-10',
      category: 'home'
    },
    {
      id: 4,
      title: 'Stromausfall',
      description: 'Vorgehen bei einem Stromausfall',
      steps: [
        'Prüfen, ob nur die eigene Wohnung betroffen ist',
        'Sicherungen im Sicherungskasten (Flur, neben Eingangstür) kontrollieren',
        'Bei defekter Sicherung: NICHT selbst reparieren, sondern Elektro Meier (+41 79 444 55 66) kontaktieren',
        'Bei größerem Ausfall: Informationen beim Stromversorger einholen',
        'Taschenlampen befinden sich in der Küchenschublade und im Nachttisch Schlafzimmer'
      ],
      lastUpdated: '2024-12-05',
      category: 'home'
    },
    {
      id: 5,
      title: 'Autopanne',
      description: 'Vorgehen bei einer Autopanne',
      steps: [
        'Fahrzeug sicher abstellen, Warnblinkanlage einschalten, Warndreieck aufstellen',
        'Pannenhilfe kontaktieren: TCS Mitgliedsnummer 87654321, Tel. 0800 140 140',
        'Alternativ: Autogarage Müller (+41 44 111 22 33) oder ADAC/TCS über App',
        'Versicherungsunterlagen befinden sich im Handschuhfach',
        'Bei Unfall mit Personenschaden: Notruf 144 und Polizei 117 rufen'
      ],
      lastUpdated: '2025-01-05',
      category: 'vehicle'
    }
  ]);
  
  const [importantDocuments, setImportantDocuments] = useState<ImportantDocument[]>([
    {
      id: 1,
      name: 'Versicherungspolicen',
      description: 'Hausrat, Haftpflicht, Rechtsschutz und KFZ-Versicherung',
      location: 'Aktenordner "Versicherungen" im Büro, 2. Fach',
      lastUpdated: '2025-01-10'
    },
    {
      id: 2,
      name: 'Reisepässe & Identitätskarten',
      description: 'Ausweisdokumente der gesamten Familie',
      location: 'Safe im Schlafzimmer, Code: 123456',
      lastUpdated: '2025-02-15'
    },
    {
      id: 3,
      name: 'Vorsorgeaufträge & Patientenverfügungen',
      description: 'Rechtsgültige Dokumente für medizinische Notfälle',
      location: 'Aktenordner "Wichtige Dokumente" im Büro, 1. Fach + digitale Kopie auf NAS',
      lastUpdated: '2024-11-20'
    },
    {
      id: 4,
      name: 'Testament & Erbregelungen',
      description: 'Notariell beglaubigte Dokumente',
      location: 'Safe im Schlafzimmer + Kopie beim Notar Dr. Meier',
      lastUpdated: '2024-09-05'
    },
    {
      id: 5,
      name: 'Grundbuchauszug & Hypothekenvertrag',
      description: 'Dokumente zum Hauseigentum',
      location: 'Aktenordner "Immobilie" im Büro + Banksafe UBS',
      lastUpdated: '2025-03-01'
    }
  ]);
  
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
  
  const emergencyContacts = contacts.filter(contact => contact.category === 'emergency');
  const medicalContacts = contacts.filter(contact => contact.category === 'medical');
  const personalContacts = contacts.filter(contact => contact.category === 'personal');
  const serviceContacts = contacts.filter(contact => contact.category === 'service');

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
                          <Button onClick={addNewContact}>Kontakt hinzufügen</Button>
                        </DialogFooter>
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
                                <User className={cn(
                                  "h-5 w-5",
                                  contact.category === "emergency" ? "text-red-500" : 
                                  contact.category === "medical" ? "text-blue-500" :
                                  contact.category === "service" ? "text-yellow-500" : "text-green-500"
                                )} />
                              </div>
                              <div className="ml-3">
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-sm text-gray-500">{contact.role}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
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
                  </TabsContent>
                  
                  <TabsContent value="emergency">
                    <div className="space-y-4">
                      {emergencyContacts.length > 0 ? (
                        emergencyContacts.map((contact) => (
                          <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                              </div>
                              <div className="ml-3">
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-sm text-gray-500">{contact.role}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <a href={`tel:${contact.phone}`} className="font-bold text-red-500">{contact.phone}</a>
                              <Button variant="ghost" size="icon" className="ml-2">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          Keine Notfalldienste gefunden.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="medical">
                    <div className="space-y-4">
                      {medicalContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-gray-500">{contact.role}</p>
                              {contact.address && (
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{contact.address}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <a href={`tel:${contact.phone}`} className="font-medium text-blue-500">{contact.phone}</a>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="personal">
                    <div className="space-y-4">
                      {personalContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-gray-500">{contact.role}</p>
                              {contact.info && <p className="text-xs text-gray-500 mt-1">{contact.info}</p>}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <a href={`tel:${contact.phone}`} className="font-medium text-green-500">{contact.phone}</a>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="service">
                    <div className="space-y-4">
                      {serviceContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-yellow-500" />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-gray-500">{contact.role}</p>
                              {contact.address && (
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{contact.address}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <a href={`tel:${contact.phone}`} className="font-medium text-yellow-500">{contact.phone}</a>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notfallausrüstung</CardTitle>
                <CardDescription>Standorte wichtiger Notfallausrüstung</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg bg-red-50">
                  <h3 className="font-medium flex items-center">
                    <Badge className="bg-red-500 text-white mr-2">1</Badge>
                    Erste-Hilfe-Kasten
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Badezimmerschrank, oberstes Fach</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Zuletzt geprüft: 15.03.2025</span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <Badge className="bg-gray-500 text-white mr-2">2</Badge>
                    Feuerlöscher
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Küche neben Kühlschrank & Keller</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Zuletzt geprüft: 10.01.2025</span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <Badge className="bg-gray-500 text-white mr-2">3</Badge>
                    Notfallrucksack
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Garderobe, unteres Fach</p>
                  <p className="text-xs text-gray-500 mt-1">Enthält: Taschenlampen, Batterien, Powerbank, Radio, Wasservorrat, Notfalldecken</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Zuletzt aktualisiert: 05.02.2025</span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <Badge className="bg-gray-500 text-white mr-2">4</Badge>
                    Notfallkontakte & Dokumente
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Küchenschublade & als laminierte Karte im Notfallrucksack</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Weiteres Equipment hinzufügen
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Notfallpläne</CardTitle>
                <CardDescription>
                  Vorbereitete Handlungsanweisungen für verschiedene Notfallszenarien
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {emergencyPlans.map((plan) => (
                  <div key={plan.id} className={cn(
                    "border rounded-lg overflow-hidden",
                    plan.important ? "border-red-200 bg-red-50/50" : ""
                  )}>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          {plan.important && (
                            <BadgeAlert className="h-4 w-4 text-red-500 mr-2" />
                          )}
                          {plan.title}
                        </h3>
                        <Badge variant="outline" className={cn(
                          plan.category === "home" ? "border-blue-200 bg-blue-50 text-blue-700" :
                          plan.category === "medical" ? "border-green-200 bg-green-50 text-green-700" :
                          "border-yellow-200 bg-yellow-50 text-yellow-700"
                        )}>
                          {plan.category === "home" ? "Zuhause" : 
                           plan.category === "medical" ? "Medizinisch" : "Fahrzeug"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                      
                      <div className="text-sm space-y-1">
                        <p className="font-medium">Schritte:</p>
                        <ol className="list-decimal pl-5 space-y-1">
                          {plan.steps.slice(0, 3).map((step, index) => (
                            <li key={index} className="text-sm">{step}</li>
                          ))}
                          {plan.steps.length > 3 && (
                            <li className="text-sm text-gray-500">...und {plan.steps.length - 3} weitere Schritte</li>
                          )}
                        </ol>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Aktualisiert: {new Date(plan.lastUpdated).toLocaleDateString('de-CH')}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Vollständig anzeigen
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Neuen Notfallplan erstellen
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Wichtige Dokumente</CardTitle>
                <CardDescription>
                  Standorte kritischer Dokumente im Notfall
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {importantDocuments.map((doc) => (
                  <div key={doc.id} className="p-3 border rounded-lg">
                    <div className="flex items-start mb-1">
                      <FileText className="h-5 w-5 text-homepilot-primary mt-0.5 mr-2" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-xs text-gray-600 mt-0.5">{doc.description}</p>
                        <div className="flex items-center mt-2">
                          <Shield className="h-4 w-4 text-gray-500 mr-1" />
                          <p className="text-xs text-gray-600">{doc.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Aktualisiert: {new Date(doc.lastUpdated).toLocaleDateString('de-CH')}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="text-center">
                  <p className="text-sm font-medium mb-2">Digitale Sicherungskopien</p>
                  <p className="text-xs text-gray-600 mb-3">
                    Wichtige Dokumente sind als verschlüsselte PDFs gespeichert:
                  </p>
                  <Button variant="outline" size="sm" className="mb-2 w-full">
                    <FileText className="h-3 w-3 mr-2" />
                    NAS Synology (Ordner "Wichtige Dokumente")
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="h-3 w-3 mr-2" />
                    Cloud-Backup (Passwort im Safe)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
