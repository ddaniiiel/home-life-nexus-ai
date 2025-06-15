
import React from 'react';
import { BarChart3, TrendingUp, FileText, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModernReportsPage = () => {
  const reports = [
    {
      name: "Monatlicher Finanzbericht",
      description: "Übersicht über Einnahmen und Ausgaben",
      lastGenerated: "15.01.2024",
      type: "finance"
    },
    {
      name: "Energie Verbrauchsanalyse",
      description: "Stromverbrauch und Optimierungspotential",
      lastGenerated: "10.01.2024",
      type: "energy"
    },
    {
      name: "Smart Home Status",
      description: "Geräte-Status und Automatisierungen",
      lastGenerated: "12.01.2024",
      type: "smarthome"
    },
    {
      name: "Familienaktivitäten",
      description: "Termine und erledigte Aufgaben",
      lastGenerated: "08.01.2024",
      type: "family"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Berichte</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Automatisch</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Diesen Monat</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Button className="w-full h-full flex flex-col items-center justify-center space-y-2">
              <Download className="h-6 w-6" />
              <span>Erstellen</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Verfügbare Berichte</TabsTrigger>
          <TabsTrigger value="scheduled">Geplante Berichte</TabsTrigger>
          <TabsTrigger value="archive">Archiv</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Zuletzt erstellt: {report.lastGenerated}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Anzeigen
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Geplante Berichte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Monatlicher Finanzbericht</h4>
                      <p className="text-sm text-gray-500">Jeden 1. des Monats um 09:00</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Bearbeiten
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Wöchentliche Energieanalyse</h4>
                      <p className="text-sm text-gray-500">Jeden Sonntag um 20:00</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Bearbeiten
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archive">
          <Card>
            <CardHeader>
              <CardTitle>Berichtsarchiv</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Archivierte Berichte werden hier angezeigt
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernReportsPage;
