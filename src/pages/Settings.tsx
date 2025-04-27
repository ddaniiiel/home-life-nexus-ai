
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Settings as SettingsIcon, User, Lock, Bell, Palette, Languages, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <SettingsIcon className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Einstellungen</h1>
          </div>
          
          <Tabs defaultValue="profile">
            <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-6 gap-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Profil
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> Sicherheit
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" /> Benachrichtigungen
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" /> Darstellung
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center gap-2">
                <Languages className="h-4 w-4" /> Sprache
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Datenschutz
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Profil-Einstellungen</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-16 w-16 text-gray-400" />
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        Bild ändern
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Vorname</Label>
                          <Input id="firstName" defaultValue="Max" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nachname</Label>
                          <Input id="lastName" defaultValue="Mustermann" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-Mail</Label>
                        <Input id="email" defaultValue="max@example.com" type="email" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" defaultValue="+49 123 456789" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Adresse</h3>
                    <div className="space-y-2">
                      <Label htmlFor="street">Straße und Hausnummer</Label>
                      <Input id="street" defaultValue="Musterstraße 123" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="postalCode">Postleitzahl</Label>
                        <Input id="postalCode" defaultValue="12345" />
                      </div>
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="city">Stadt</Label>
                        <Input id="city" defaultValue="Berlin" />
                      </div>
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="country">Land</Label>
                        <Select defaultValue="germany">
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Land auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="germany">Deutschland</SelectItem>
                            <SelectItem value="austria">Österreich</SelectItem>
                            <SelectItem value="switzerland">Schweiz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Änderungen speichern</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Sicherheits-Einstellungen</h2>
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Passwort ändern</h3>
                    <div className="space-y-4 max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Aktuelles Passwort</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Neues Passwort</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                    <Button className="mt-2">Passwort aktualisieren</Button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-medium">Zwei-Faktor-Authentifizierung</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Zwei-Faktor-Authentifizierung aktivieren</p>
                        <p className="text-sm text-gray-500">Erhöhe die Sicherheit deines Kontos durch einen zusätzlichen Verifizierungsschritt.</p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-medium">Sitzungen</h3>
                    <div>
                      <p className="text-sm text-gray-500">Du bist aktuell an diesen Geräten angemeldet:</p>
                      <div className="mt-3 space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div>
                            <p className="font-medium">Windows PC - Chrome</p>
                            <p className="text-xs text-gray-500">Zuletzt aktiv: Heute, 15:42 Uhr</p>
                          </div>
                          <Button variant="outline" size="sm">Abmelden</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div>
                            <p className="font-medium">iPhone 14 - Safari</p>
                            <p className="text-xs text-gray-500">Zuletzt aktiv: Gestern, 08:15 Uhr</p>
                          </div>
                          <Button variant="outline" size="sm">Abmelden</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Benachrichtigungen</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Benachrichtigungseinstellungen</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">E-Mail-Benachrichtigungen</p>
                          <p className="text-sm text-gray-500">Erhalte wichtige Updates per E-Mail.</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push-Benachrichtigungen</p>
                          <p className="text-sm text-gray-500">Erhalte Benachrichtigungen direkt in deinem Browser.</p>
                        </div>
                        <Switch id="push-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS-Benachrichtigungen</p>
                          <p className="text-sm text-gray-500">Erhalte wichtige Warnungen per SMS.</p>
                        </div>
                        <Switch id="sms-notifications" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-medium">Benachrichtigungstypen</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Aufgaben-Erinnerungen</p>
                          <p className="text-sm text-gray-500">Benachrichtigungen über fällige Aufgaben.</p>
                        </div>
                        <Switch id="task-reminders" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Kalender-Ereignisse</p>
                          <p className="text-sm text-gray-500">Erinnerungen an bevorstehende Termine.</p>
                        </div>
                        <Switch id="calendar-events" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Smart-Home-Warnungen</p>
                          <p className="text-sm text-gray-500">Benachrichtigungen über Smart-Home-Ereignisse.</p>
                        </div>
                        <Switch id="smart-home-alerts" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Inventar-Warnungen</p>
                          <p className="text-sm text-gray-500">Benachrichtigungen über niedrige Lagerbestände.</p>
                        </div>
                        <Switch id="inventory-alerts" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Finanz-Updates</p>
                          <p className="text-sm text-gray-500">Änderungen bei Finanzkonten und Budgets.</p>
                        </div>
                        <Switch id="finance-updates" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Darstellung</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-homepilot-primary">
                        <div className="h-24 bg-white rounded-md mb-3 border border-gray-200"></div>
                        <p className="font-medium">Hell</p>
                      </div>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-homepilot-primary">
                        <div className="h-24 bg-gray-900 rounded-md mb-3 border border-gray-700"></div>
                        <p className="font-medium">Dunkel</p>
                      </div>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-homepilot-primary border-homepilot-primary">
                        <div className="h-24 bg-gradient-to-b from-white to-gray-900 rounded-md mb-3 border border-gray-200"></div>
                        <p className="font-medium">Systemeinstellung</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-medium">Akzentfarbe</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-12 bg-blue-500 rounded-full mb-2 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500"></div>
                        <span className="text-sm">Blau</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-12 bg-green-500 rounded-full mb-2 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-green-500"></div>
                        <span className="text-sm">Grün</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-12 bg-purple-500 rounded-full mb-2 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-purple-500 ring-2 ring-offset-2 ring-purple-500"></div>
                        <span className="text-sm">Lila</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-12 bg-orange-500 rounded-full mb-2 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-orange-500"></div>
                        <span className="text-sm">Orange</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-12 bg-red-500 rounded-full mb-2 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-red-500"></div>
                        <span className="text-sm">Rot</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-medium">Dashboard-Layout</h3>
                    <div className="space-y-2">
                      <Label htmlFor="layout">Layout-Typ</Label>
                      <Select defaultValue="grid">
                        <SelectTrigger id="layout">
                          <SelectValue placeholder="Layout auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="list">Liste</SelectItem>
                          <SelectItem value="compact">Kompakt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Widgets anpassbar</p>
                        <p className="text-sm text-gray-500">Erlaube das Verschieben und Anpassen von Widgets.</p>
                      </div>
                      <Switch id="custom-widgets" defaultChecked />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="language">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Sprache & Region</h2>
                
                <div className="space-y-6 max-w-md">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Sprache</Label>
                      <Select defaultValue="de">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Sprache auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="en">Englisch</SelectItem>
                          <SelectItem value="fr">Französisch</SelectItem>
                          <SelectItem value="es">Spanisch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select defaultValue="germany">
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Region auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="germany">Deutschland</SelectItem>
                          <SelectItem value="austria">Österreich</SelectItem>
                          <SelectItem value="switzerland">Schweiz</SelectItem>
                          <SelectItem value="uk">Vereinigtes Königreich</SelectItem>
                          <SelectItem value="usa">Vereinigte Staaten</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zeitzone</Label>
                      <Select defaultValue="berlin">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Zeitzone auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="berlin">(GMT+01:00) Berlin, Rom, Paris</SelectItem>
                          <SelectItem value="london">(GMT+00:00) London, Dublin</SelectItem>
                          <SelectItem value="new_york">(GMT-05:00) New York, Toronto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date_format">Datumsformat</Label>
                      <Select defaultValue="dmy">
                        <SelectTrigger id="date_format">
                          <SelectValue placeholder="Datumsformat auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dmy">DD/MM/YYYY (31/12/2025)</SelectItem>
                          <SelectItem value="mdy">MM/DD/YYYY (12/31/2025)</SelectItem>
                          <SelectItem value="ymd">YYYY/MM/DD (2025/12/31)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Währung</Label>
                      <Select defaultValue="eur">
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Währung auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eur">Euro (€)</SelectItem>
                          <SelectItem value="usd">US-Dollar ($)</SelectItem>
                          <SelectItem value="gbp">Britisches Pfund (£)</SelectItem>
                          <SelectItem value="chf">Schweizer Franken (CHF)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Änderungen speichern</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Datenschutz & Sicherheit</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Datenschutzeinstellungen</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Datenanalyse</p>
                          <p className="text-sm text-gray-500">Erlaube uns, anonymisierte Nutzungsdaten zu sammeln, um die App zu verbessern.</p>
                        </div>
                        <Switch id="data-analytics" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Personalisierungsvorschläge</p>
                          <p className="text-sm text-gray-500">Erhalte auf dich zugeschnittene Empfehlungen und Vorschläge.</p>
                        </div>
                        <Switch id="personalization" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Cookie-Einstellungen</p>
                          <p className="text-sm text-gray-500">Verwalte, welche Cookies gespeichert werden dürfen.</p>
                        </div>
                        <Button variant="outline" size="sm">Verwalten</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <h3 className="text-lg font-medium">Datenverwaltung</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Meine Daten exportieren</p>
                          <p className="text-sm text-gray-500">Lade eine Kopie aller deiner Daten herunter.</p>
                        </div>
                        <Button variant="outline" size="sm">Exportieren</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Konto löschen</p>
                          <p className="text-sm text-gray-500">Lösche dein Konto und alle zugehörigen Daten dauerhaft.</p>
                        </div>
                        <Button variant="destructive" size="sm">Konto löschen</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
