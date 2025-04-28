import React from 'react';
import DashboardHeader from './DashboardHeader';
import SmartHomeWidget from '@/components/SmartHomeWidget';
import TaskWidget from '@/components/TaskWidget';
import CalendarWidget from '@/components/CalendarWidget';
import FinanceWidget from '@/components/FinanceWidget';
import { FileText, Package, Newspaper, Wallet, Lightbulb, Bell, Shield, Home, Calendar, PlusCircle, MinusCircle } from 'lucide-react';
import Widget from '@/components/Widget';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  userName: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, onLogout }) => {
  return (
    <div className="md:pl-64 min-h-screen">
      <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-7xl mx-auto">
        <DashboardHeader userName={userName} onLogout={onLogout} />
        
        {/* Dashboard-Übersicht */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Schnellzugriff-Karten */}
          <Card className="col-span-full bg-gradient-to-r from-homepilot-primary/5 to-homepilot-primary/10 border-none shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Schnellzugriff</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    <Wallet className="h-6 w-6 mb-2" />
                    <span>Finanzen</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <TaskWidget />
          <CalendarWidget />
          <FinanceWidget />
        </div>
        
        <h2 className="text-xl font-semibold mb-4 mt-8">Smart Home & Dokumente</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <SmartHomeWidget />
          
          <Widget title="Dokumente" icon={<FileText className="h-5 w-5" />}>
            <div className="space-y-3">
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Stromvertrag.pdf</p>
                  <p className="text-xs text-gray-500">Hinzugefügt: 15.04.2025</p>
                </div>
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Versicherung.pdf</p>
                  <p className="text-xs text-gray-500">Hinzugefügt: 10.03.2025</p>
                </div>
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Mietvertrag.pdf</p>
                  <p className="text-xs text-gray-500">Hinzugefügt: 01.01.2025</p>
                </div>
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              
              <Link to="/documents" className="text-xs text-homepilot-primary hover:underline mt-2 block">Alle Dokumente anzeigen →</Link>
            </div>
          </Widget>
          
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
        </div>
        
        <h2 className="text-xl font-semibold mb-4 mt-8">Vorräte & Updates</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Widget title="Vorräte" icon={<Package className="h-5 w-5" />}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Küche</span>
                <span className="text-xs text-gray-500">25 Artikel</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mehl</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-red-500">Fast leer</span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-red-100 dark:hover:bg-red-900">
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-green-100 dark:hover:bg-green-900">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Zucker</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-green-500">Ausreichend</span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-red-100 dark:hover:bg-red-900">
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-green-100 dark:hover:bg-green-900">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kaffee</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-yellow-500">Mittel</span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-red-100 dark:hover:bg-red-900">
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-green-100 dark:hover:bg-green-900">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium">Bad</span>
                <span className="text-xs text-gray-500">12 Artikel</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Shampoo</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-yellow-500">Mittel</span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-red-100 dark:hover:bg-red-900">
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-green-100 dark:hover:bg-green-900">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Zahnpasta</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-red-500">Fast leer</span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-red-100 dark:hover:bg-red-900">
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-green-100 dark:hover:bg-green-900">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Link to="/inventory" className="text-xs text-homepilot-primary hover:underline">Zum Vorratsmanager →</Link>
                <Button size="sm" variant="outline" className="text-xs">
                  <Bell className="h-3 w-3 mr-1" /> Bring! App
                </Button>
              </div>
            </div>
          </Widget>
          
          <Widget title="Aktuelle News" icon={<Newspaper className="h-5 w-5" />}>
            <div className="space-y-3">
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
                <p className="font-medium text-sm">Neue Energiepreise für 2026</p>
                <p className="text-xs text-gray-500 mb-1">22.04.2025 | Bundesamt für Energie</p>
                <p className="text-xs">Das Bundesamt für Energie hat die neuen Tarife für das kommende Jahr veröffentlicht. Hausbesitzer können mit niedrigeren Stromkosten rechnen.</p>
              </div>
              
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
                <p className="font-medium text-sm">Änderung im Eigentumsrecht</p>
                <p className="text-xs text-gray-500 mb-1">15.04.2025 | Schweizerischer Bundesrat</p>
                <p className="text-xs">Der Bundesrat plant eine Reform des Stockwerkeigentums. Die neuen Regelungen sollen Renovierungsprojekte erleichtern.</p>
              </div>
              
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
                <p className="font-medium text-sm">Steuervergünstigungen verlängert</p>
                <p className="text-xs text-gray-500 mb-1">10.04.2025 | Eidg. Steuerverwaltung</p>
                <p className="text-xs">Das Parlament hat die Steuervergünstigungen für energetische Gebäudesanierungen um weitere fünf Jahre verlängert.</p>
              </div>
              
              <Link to="/news" className="text-xs text-homepilot-primary hover:underline mt-2 block">Alle News anzeigen →</Link>
            </div>
          </Widget>
          
          <Widget title="Versicherungen" icon={<Shield className="h-5 w-5" />}>
            <div className="space-y-3">
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-sm">Hausratversicherung</p>
                  <Badge variant="outline" className="text-xs">Aktiv</Badge>
                </div>
                <p className="text-xs text-gray-500 mb-1">AXA Winterthur</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs">CHF 420/Jahr</p>
                  <p className="text-xs text-gray-500">Verlängerung: 01.01.2026</p>
                </div>
              </div>
              
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-sm">Privathaftpflicht</p>
                  <Badge variant="outline" className="text-xs">Aktiv</Badge>
                </div>
                <p className="text-xs text-gray-500 mb-1">Zurich Versicherung</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs">CHF 180/Jahr</p>
                  <p className="text-xs text-gray-500">Verlängerung: 01.06.2025</p>
                </div>
              </div>
              
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-sm">Rechtsschutz</p>
                  <Badge variant="secondary" className="text-xs">Kündbar</Badge>
                </div>
                <p className="text-xs text-gray-500 mb-1">Mobiliar</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs">CHF 240/Jahr</p>
                  <p className="text-xs text-red-500">Kündbar bis: 30.09.2025</p>
                </div>
              </div>
              
              <Link to="/finances" className="text-xs text-homepilot-primary hover:underline mt-2 block">Alle Versicherungen verwalten →</Link>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
