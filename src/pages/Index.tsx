
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Home, Calendar, FileText, CreditCard, Package, LineChart, Bell, Wallet, Newspaper, Lightbulb, Shield } from 'lucide-react';
import Widget from '@/components/Widget';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import TaskWidget from '@/components/TaskWidget';
import CalendarWidget from '@/components/CalendarWidget';
import FinanceWidget from '@/components/FinanceWidget';
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
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Benachrichtigungen
              </Button>
              <Button size="sm">
                <Home className="h-4 w-4 mr-2" />
                Übersicht
              </Button>
            </div>
          </div>
          
          {/* Schnellzugriff-Leiste */}
          <Card className="mb-6 bg-gradient-to-r from-homepilot-primary/5 to-homepilot-primary/10 border-none shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Schnellzugriff</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-primary/5">
                  <Link to="/smart-home">
                    <Lightbulb className="h-6 w-6 mb-2" />
                    <span>Smart Home</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-primary/5">
                  <Link to="/tasks">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span>Aufgaben</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-primary/5">
                  <Link to="/documents">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Dokumente</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-primary/5">
                  <Link to="/finances">
                    <CreditCard className="h-6 w-6 mb-2" />
                    <span>Finanzen</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-primary/5">
                  <Link to="/inventory">
                    <Package className="h-6 w-6 mb-2" />
                    <span>Vorräte</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto flex flex-col py-4 hover:bg-homepilot-primary/5">
                  <Link to="/news">
                    <Newspaper className="h-6 w-6 mb-2" />
                    <span>Nachrichten</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">            
            <div className="space-y-6 lg:col-span-1">
              <TaskWidget />
              <FinanceWidget />
            </div>
            
            <div className="space-y-6 lg:col-span-2">
              <CalendarWidget />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Widget title="Neueste Dokumente" icon={<FileText className="h-5 w-5" />}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm">Energierechnung_2025.pdf</span>
                      <span className="text-xs text-gray-500">Heute</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm">Versicherung_2025.pdf</span>
                      <span className="text-xs text-gray-500">Gestern</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm">Mietvertrag_2025.pdf</span>
                      <span className="text-xs text-gray-500">15.04.2025</span>
                    </div>
                    <Link to="/documents" className="text-xs text-homepilot-primary hover:underline block mt-2">
                      Alle Dokumente →
                    </Link>
                  </div>
                </Widget>
                
                <Widget title="Aktuelle Nachrichten" icon={<Newspaper className="h-5 w-5" />}>
                  <div className="space-y-2">
                    <div className="flex flex-col py-1">
                      <span className="text-sm font-medium">Neue Energiepreise für 2026</span>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Bundesamt für Energie</span>
                        <span className="text-xs text-gray-500">22.04.2025</span>
                      </div>
                    </div>
                    <div className="flex flex-col py-1">
                      <span className="text-sm font-medium">Änderung im Eigentumsrecht</span>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Schweizerischer Bundesrat</span>
                        <span className="text-xs text-gray-500">15.04.2025</span>
                      </div>
                    </div>
                    <Link to="/news" className="text-xs text-homepilot-primary hover:underline block mt-2">
                      Alle Nachrichten →
                    </Link>
                  </div>
                </Widget>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-8">Finanzübersicht & Verbrauch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Widget title="Investitionen" icon={<Wallet className="h-5 w-5" />}>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border-b">
                  <span className="text-sm font-medium">Gesamtvermögen</span>
                  <span className="font-semibold">CHF 479'700</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Swissquote</span>
                    <span className="text-sm">CHF 245'000</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Saxo Bank</span>
                    <span className="text-sm">CHF 178'500</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Raiffeisen</span>
                    <span className="text-sm">CHF 35'000</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm font-medium">Hypotheken</span>
                  <span className="font-semibold">CHF 1'200'000</span>
                </div>
                
                <Link to="/investments" className="text-xs text-homepilot-primary hover:underline mt-2 block">Zum Portfoliomanager →</Link>
              </div>
            </Widget>

            <Widget title="Energie & Verbrauch" icon={<LineChart className="h-5 w-5" />}>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Stromverbrauch heute:</span>
                  <span className="text-sm font-medium">8.2 kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Stromverbrauch gestern:</span>
                  <span className="text-sm font-medium">9.1 kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Heizung (Durchschnitt):</span>
                  <span className="text-sm font-medium">21.5°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wasserverbrauch heute:</span>
                  <span className="text-sm font-medium">120 Liter</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">CO₂-Bilanz (Monat):</span>
                  <span className="text-sm font-medium">320 kg</span>
                </div>
                <Link to="/reports" className="text-xs text-homepilot-primary hover:underline block">
                  Zum Energiebericht →
                </Link>
              </div>
            </Widget>
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-8">Smart Home & Versicherungen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SmartHomeWidget />
            
            <Widget title="Versicherungen" icon={<Shield className="h-5 w-5" />}>
              <div className="space-y-3">
                <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Hausratversicherung</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Aktiv</p>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">AXA Winterthur</span>
                    <span>CHF 420/Jahr</span>
                  </div>
                  <div className="text-xs text-right mt-1">
                    <span className="text-gray-500">Verlängerung: 01.01.2026</span>
                  </div>
                </div>
                
                <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Rechtsschutz</p>
                    <p className="text-xs text-red-600 dark:text-red-400">Kündbar</p>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">Mobiliar</span>
                    <span>CHF 240/Jahr</span>
                  </div>
                  <div className="text-xs text-right mt-1">
                    <span className="text-red-500">Kündbar bis: 30.09.2025</span>
                  </div>
                </div>
                
                <Link to="/finances" className="text-xs text-homepilot-primary hover:underline block mt-2">
                  Alle Versicherungen verwalten →
                </Link>
              </div>
            </Widget>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

