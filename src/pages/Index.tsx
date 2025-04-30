
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Home, Calendar, FileText, CreditCard, Package, LineChart, Bell, Wallet, Newspaper, Lightbulb, Shield, Phone } from 'lucide-react';
import Widget from '@/components/Widget';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import TaskWidget from '@/components/TaskWidget';
import CalendarWidget from '@/components/CalendarWidget';
import FinanceWidget from '@/components/FinanceWidget';
import EmergencyContacts from '@/components/EmergencyContacts';
import DocumentCategorization from '@/components/DocumentCategorization'; 
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-homepilot-secondary">Willkommen bei HomePilot</h1>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" asChild className="border-homepilot-primary/20 hover:bg-homepilot-accent/10 hover:border-homepilot-primary/30">
                <Link to="/tasks">
                  <Bell className="h-4 w-4 mr-2 text-homepilot-primary" />
                  Aufgaben (5)
                </Link>
              </Button>
              <Button size="sm" asChild className="bg-homepilot-primary hover:bg-homepilot-secondary">
                <Link to="/smart-home">
                  <Home className="h-4 w-4 mr-2" />
                  Smart Home
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Schnellzugriff mit wichtigen Familienfunktionen */}
          <Card className="mb-6 card-accent border-none shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-homepilot-secondary">Familien-Dashboard</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-accent/20 border-homepilot-primary/20">
                  <Link to="/smart-home">
                    <Lightbulb className="h-6 w-6 mb-2 text-homepilot-primary" />
                    <span>Smart Home</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-accent/20 border-homepilot-primary/20">
                  <Link to="/tasks">
                    <Calendar className="h-6 w-6 mb-2 text-homepilot-primary" />
                    <span>Familienkalender</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-accent/20 border-homepilot-primary/20">
                  <Link to="/documents">
                    <FileText className="h-6 w-6 mb-2 text-homepilot-primary" />
                    <span>Dokumente</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-accent/20 border-homepilot-primary/20">
                  <Link to="/finances">
                    <Wallet className="h-6 w-6 mb-2 text-homepilot-primary" />
                    <span>Familienbudget</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-accent/20 border-homepilot-primary/20">
                  <Link to="/inventory">
                    <Package className="h-6 w-6 mb-2 text-homepilot-primary" />
                    <span>Haushalt</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-accent/20 border-homepilot-primary/20">
                  <Link to="/news">
                    <Newspaper className="h-6 w-6 mb-2 text-homepilot-primary" />
                    <span>Wichtiges</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-red-50 hover:text-red-700 border-red-100">
                  <Link to="/emergency">
                    <Phone className="h-6 w-6 mb-2 text-red-600" />
                    <span>Notfälle</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">            
            <div className="space-y-6 lg:col-span-1">
              <TaskWidget />
              <Widget title="Aktueller Energieverbrauch" icon={<LineChart className="h-5 w-5" />}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Strom heute</span>
                    <span className="text-sm font-medium">8.2 kWh <span className="text-homepilot-primary">(-12%)</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Heizung (∅)</span>
                    <span className="text-sm font-medium">21.5°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Wasser heute</span>
                    <span className="text-sm font-medium">120 L <span className="text-homepilot-primary">(-5%)</span></span>
                  </div>
                  <Link to="/reports" className="text-xs text-homepilot-primary hover:underline block mt-2">
                    Zum Energiebericht →
                  </Link>
                </div>
              </Widget>
            </div>
            
            <div className="space-y-6 lg:col-span-2">
              <CalendarWidget />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Widget title="Wichtige Dokumente" icon={<FileText className="h-5 w-5" />}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-lg border border-red-100 bg-red-50">
                      <span className="text-sm">Familienversicherung_2025.pdf</span>
                      <span className="text-xs text-red-500">Läuft ab</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg border border-homepilot-accent/20 bg-homepilot-accent/5">
                      <span className="text-sm">Schulanmeldung_Tim.pdf</span>
                      <span className="text-xs text-homepilot-primary">Neu</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg border border-gray-100">
                      <span className="text-sm">Steuererklärung_2025.pdf</span>
                      <span className="text-xs text-gray-500">Fällig: 31.03</span>
                    </div>
                    <Link to="/documents" className="text-xs text-homepilot-primary hover:underline block mt-2">
                      Dokumentenverwaltung →
                    </Link>
                  </div>
                </Widget>
                
                <EmergencyContacts />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-8 text-homepilot-secondary">Haushalt & Finanzen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <SmartHomeWidget />

            <Widget title="Haushaltsbudget" icon={<Wallet className="h-5 w-5" />}>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border-b">
                  <span className="text-sm font-medium">Budget April</span>
                  <span className="font-semibold">CHF 3'200 / 4'000</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-1 rounded-lg hover:bg-homepilot-accent/5">
                    <span className="text-sm">Lebensmittel</span>
                    <span className="text-sm">CHF 850 / 1'200</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-1 rounded-lg hover:bg-homepilot-accent/5">
                    <span className="text-sm">Freizeit</span>
                    <span className="text-sm">CHF 450 / 600</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-1 rounded-lg hover:bg-homepilot-accent/5">
                    <span className="text-sm">Kinder</span>
                    <span className="text-sm">CHF 600 / 800</span>
                  </div>
                </div>
                
                <Link to="/finances" className="text-xs text-homepilot-primary hover:underline mt-2 block">
                  Zum Budgetplaner →
                </Link>
              </div>
            </Widget>
            
            <Widget title="Versicherungen" icon={<Shield className="h-5 w-5" />}>
              <div className="space-y-3">
                <div className="p-2 rounded-md border border-red-200 dark:border-red-800">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm">Hausratversicherung</p>
                    <span className="text-xs text-red-500">Verlängerung fällig</span>
                  </div>
                  <p className="text-xs text-gray-500">Frist: 30.04.2025</p>
                </div>
                
                <div className="p-2 rounded-md border border-homepilot-warning/30 dark:border-yellow-800">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm">Familienhaftpflicht</p>
                    <span className="text-xs text-homepilot-warning">Prüfen</span>
                  </div>
                  <p className="text-xs text-gray-500">Deckung erhöhen?</p>
                </div>
                
                <Link to="/finances" className="text-xs text-homepilot-primary hover:underline mt-2 block">
                  Versicherungen verwalten →
                </Link>
              </div>
            </Widget>
          </div>

          <DocumentCategorization />
        </div>
      </div>
    </div>
  );
};

export default Index;
