
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, Thermometer, Shield } from 'lucide-react';
import SmartHomeWidget from '@/components/SmartHomeWidget';

const DashboardSmartHome = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Smart Home System</h2>
      <Card className="border-green-100 dark:border-green-800 shadow-md">
        <CardContent className="p-0">
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b border-green-100">
              <div className="px-4">
                <TabsList className="h-12 bg-transparent border-b-0 p-0">
                  <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 rounded-none bg-transparent">
                    Übersicht
                  </TabsTrigger>
                  <TabsTrigger value="lights" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 rounded-none bg-transparent">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Beleuchtung
                  </TabsTrigger>
                  <TabsTrigger value="climate" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 rounded-none bg-transparent">
                    <Thermometer className="h-4 w-4 mr-2" />
                    Klima
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 rounded-none bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Sicherheit
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="overview" className="p-0 m-0">
              <div className="p-4">
                <SmartHomeWidget />
              </div>
            </TabsContent>
            
            <TabsContent value="lights" className="p-0 m-0">
              <div className="p-4">
                <div className="text-center py-8">
                  <Lightbulb className="h-12 w-12 mx-auto text-green-500 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Beleuchtungssystem</h3>
                  <p className="text-gray-500">
                    Details zur Beleuchtung werden hier angezeigt. Diese Ansicht ist in der vollständigen
                    Smart Home Sektion verfügbar.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="climate" className="p-0 m-0">
              <div className="p-4">
                <div className="text-center py-8">
                  <Thermometer className="h-12 w-12 mx-auto text-green-500 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Klimasteuerung</h3>
                  <p className="text-gray-500">
                    Details zur Klimasteuerung werden hier angezeigt. Diese Ansicht ist in der vollständigen
                    Smart Home Sektion verfügbar.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="p-0 m-0">
              <div className="p-4">
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto text-green-500 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Sicherheitssystem</h3>
                  <p className="text-gray-500">
                    Details zum Sicherheitssystem werden hier angezeigt. Diese Ansicht ist in der vollständigen
                    Smart Home Sektion verfügbar.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSmartHome;
