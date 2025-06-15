
import React from 'react';
import { Settings, User, Bell, Shield, Palette, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModernSettingsPage = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="security">Sicherheit</TabsTrigger>
          <TabsTrigger value="appearance">Darstellung</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="about">Über</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profil Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Vorname</Label>
                  <Input id="firstName" defaultValue="Thomas" />
                </div>
                <div>
                  <Label htmlFor="lastName">Nachname</Label>
                  <Input id="lastName" defaultValue="Huber" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" defaultValue="thomas@familie-huber.ch" />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" defaultValue="+41 79 123 45 67" />
              </div>
              <Button>Profil speichern</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Benachrichtigungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">E-Mail Benachrichtigungen</Label>
                  <p className="text-sm text-gray-500">Erhalten Sie Updates per E-Mail</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Benachrichtigungen</Label>
                  <p className="text-sm text-gray-500">Browser-Benachrichtigungen</p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smart-home-alerts">Smart Home Alerts</Label>
                  <p className="text-sm text-gray-500">Benachrichtigungen von Geräten</p>
                </div>
                <Switch id="smart-home-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="calendar-reminders">Kalender Erinnerungen</Label>
                  <p className="text-sm text-gray-500">Termine und Aufgaben</p>
                </div>
                <Switch id="calendar-reminders" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Sicherheit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="current-password">Aktuelles Passwort</Label>
                <Input id="current-password" type="password" />
              </div>
              <div>
                <Label htmlFor="new-password">Neues Passwort</Label>
                <Input id="new-password" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Zwei-Faktor-Authentifizierung</Label>
                  <p className="text-sm text-gray-500">Zusätzliche Sicherheitsebene</p>
                </div>
                <Switch id="two-factor" />
              </div>
              <Button>Passwort ändern</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Darstellung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dunkles Design</Label>
                  <p className="text-sm text-gray-500">Verwende dunkles Farbschema</p>
                </div>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-mode">Kompakte Ansicht</Label>
                  <p className="text-sm text-gray-500">Reduziere Abstände und Größen</p>
                </div>
                <Switch id="compact-mode" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Animationen</Label>
                  <p className="text-sm text-gray-500">Aktiviere UI Animationen</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                System Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="language">Sprache</Label>
                <select id="language" className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="de">Deutsch</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div>
                <Label htmlFor="timezone">Zeitzone</Label>
                <select id="timezone" className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="Europe/Zurich">Europa/Zürich</option>
                  <option value="Europe/Berlin">Europa/Berlin</option>
                  <option value="Europe/Vienna">Europa/Wien</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">Automatische Sicherung</Label>
                  <p className="text-sm text-gray-500">Tägliche Datensicherung</p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Über HomePilot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Version</p>
                <p className="font-medium">2.1.0</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Letzte Aktualisierung</p>
                <p className="font-medium">15. Januar 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Entwickelt von</p>
                <p className="font-medium">HomePilot Team</p>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="mr-2">
                  Datenschutz
                </Button>
                <Button variant="outline" className="mr-2">
                  Nutzungsbedingungen
                </Button>
                <Button variant="outline">
                  Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernSettingsPage;
