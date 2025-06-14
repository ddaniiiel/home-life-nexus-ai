import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Home, Calendar, FileText, Wallet, Package, LineChart, Bell, Newspaper, Lightbulb, Shield, Phone } from 'lucide-react';
import Widget from '@/components/Widget';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import TaskWidget from '@/components/TaskWidget';
import CalendarWidget from '@/components/CalendarWidget';
import EmergencyContacts from '@/components/EmergencyContacts';
import DocumentCategorization from '@/components/DocumentCategorization'; 
import { Link } from 'react-router-dom';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-20 px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-gray-100 mb-1">Willkommen bei HomePilot</h1>
              <p className="text-muted-foreground text-base">Ihr zentrales Dashboard für ein smartes Zuhause.</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button size="sm" variant="outline" asChild className="rounded-sm">
                <Link to="/tasks">
                  <Bell className="mr-2" />
                  Aufgaben (5)
                </Link>
              </Button>
              <Button size="sm" asChild className="bg-homepilot-primary hover:bg-homepilot-secondary rounded-sm">
                <Link to="/smart-home">
                  <Home className="mr-2" />
                  Smart Home
                </Link>
              </Button>
            </div>
          </div>
          
          <EnhancedCard 
            title="Familien-Dashboard"
            variant="gradient"
            className="mb-8 shadow-sm"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { to: "/smart-home", icon: Lightbulb, label: "Smart Home" },
                { to: "/tasks", icon: Calendar, label: "Familienkalender" },
                { to: "/documents", icon: FileText, label: "Dokumente" },
                { to: "/finances", icon: Wallet, label: "Familienbudget" },
                { to: "/inventory", icon: Package, label: "Haushalt" },
                { to: "/news", icon: Newspaper, label: "Wichtiges" },
                { to: "/emergency", icon: Phone, label: "Notfälle", special: true },
              ].map(item => (
                <Button 
                  key={item.label}
                  variant="outline" 
                  asChild 
                  className={`h-auto flex flex-col py-4 px-2 text-center rounded-md hover:bg-accent/50 dark:hover:bg-accent/20 border-border/70 ${item.special ? 'hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50/50 dark:hover:bg-red-900/20' : 'hover:border-primary/30 dark:hover:border-primary/70'}`}
                >
                  <Link to={item.to}>
                    <item.icon className={`h-6 w-6 mb-2 ${item.special ? 'text-red-600 dark:text-red-500' : 'text-primary'}`} />
                    <span className="text-xs font-medium text-foreground/80">{item.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </EnhancedCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">            
            <div className="space-y-8 lg:col-span-1">
              <TaskWidget />
              <Widget title="Aktueller Energieverbrauch" icon={<LineChart />}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Strom heute</span>
                    <span className="text-sm font-medium">8.2 kWh <span className="text-homepilot-primary">(-12%)</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Heizung (∅)</span>
                    <span className="text-sm font-medium">21.5°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Wasser heute</span>
                    <span className="text-sm font-medium">120 L <span className="text-homepilot-primary">(-5%)</span></span>
                  </div>
                  <Link to="/reports" className="text-xs text-primary hover:underline block mt-3">
                    Zum Energiebericht →
                  </Link>
                </div>
              </Widget>
            </div>
            
            <div className="space-y-8 lg:col-span-2">
              <CalendarWidget />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Widget title="Wichtige Dokumente" icon={<FileText />}>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center p-2.5 rounded-md border border-red-200 dark:border-red-700/60 bg-red-50/50 dark:bg-red-900/30">
                      <span className="text-sm">Familienversicherung_2025.pdf</span>
                      <span className="text-xs text-red-600 dark:text-red-400">Läuft ab</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-md border border-primary/20 bg-primary/5 dark:bg-primary/10 dark:border-primary/30">
                      <span className="text-sm">Schulanmeldung_Tim.pdf</span>
                      <span className="text-xs text-primary">Neu</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-md border border-border/80">
                      <span className="text-sm">Steuererklärung_2025.pdf</span>
                      <span className="text-xs text-muted-foreground">Fällig: 31.03</span>
                    </div>
                    <Link to="/documents" className="text-xs text-primary hover:underline block mt-3">
                      Dokumentenverwaltung →
                    </Link>
                  </div>
                </Widget>
                
                <EmergencyContacts />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6 mt-10 text-foreground/90">Haushalt & Finanzen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <SmartHomeWidget />

            <Widget title="Haushaltsbudget" icon={<Wallet />}>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2.5 border-b border-border/70">
                  <span className="text-sm font-medium">Budget April</span>
                  <span className="font-semibold">CHF 3'200 / 4'000</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-1.5 rounded-sm hover:bg-accent/30 dark:hover:bg-accent/10">
                    <span className="text-sm text-muted-foreground">Lebensmittel</span>
                    <span className="text-sm">CHF 850 / 1'200</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-1.5 rounded-sm hover:bg-accent/30 dark:hover:bg-accent/10">
                    <span className="text-sm text-muted-foreground">Freizeit</span>
                    <span className="text-sm">CHF 450 / 600</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-1.5 rounded-sm hover:bg-accent/30 dark:hover:bg-accent/10">
                    <span className="text-sm text-muted-foreground">Kinder</span>
                    <span className="text-sm">CHF 600 / 800</span>
                  </div>
                </div>
                
                <Link to="/finances" className="text-xs text-primary hover:underline mt-3 block">
                  Zum Budgetplaner →
                </Link>
              </div>
            </Widget>
            
            <Widget title="Versicherungen" icon={<Shield />}>
              <div className="space-y-3">
                <div className="p-2.5 rounded-md border border-red-200 dark:border-red-700/60 bg-red-50/50 dark:bg-red-900/20">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm">Hausratversicherung</p>
                    <span className="text-xs text-red-600 dark:text-red-400">Verlängerung fällig</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Frist: 30.04.2025</p>
                </div>
                
                <div className="p-2.5 rounded-md border border-homepilot-warning/30 dark:border-yellow-600/50 bg-yellow-50/50 dark:bg-yellow-900/20">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm">Familienhaftpflicht</p>
                    <span className="text-xs text-orange-600 dark:text-yellow-400">Prüfen</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Deckung erhöhen?</p>
                </div>
                
                <Link to="/finances" className="text-xs text-primary hover:underline mt-3 block">
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
