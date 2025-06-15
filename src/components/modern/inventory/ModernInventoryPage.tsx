
import React, { useState } from 'react';
import { Package, Search, Plus, Filter, QrCode, Scan } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModernInventoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const inventoryItems = [
    {
      id: 1,
      name: "MacBook Pro 16\"",
      category: "Electronics",
      value: 2500,
      location: "Homeoffice",
      condition: "Sehr gut",
      purchaseDate: "2023-01-15",
      warranty: "2025-01-15"
    },
    {
      id: 2,
      name: "Waschmaschine Bosch",
      category: "Appliances",
      value: 800,
      location: "Keller",
      condition: "Gut",
      purchaseDate: "2022-06-10",
      warranty: "2027-06-10"
    },
    {
      id: 3,
      name: "Familienfotos Album",
      category: "Personal",
      value: 50,
      location: "Wohnzimmer",
      condition: "Sehr gut",
      purchaseDate: "2020-12-25",
      warranty: "-"
    },
    {
      id: 4,
      name: "Fahrrad Trek",
      category: "Sports",
      value: 1200,
      location: "Garage",
      condition: "Gut",
      purchaseDate: "2023-04-20",
      warranty: "2025-04-20"
    }
  ];

  const categories = [
    { name: "Electronics", count: 8, color: "bg-blue-500" },
    { name: "Appliances", count: 5, color: "bg-green-500" },
    { name: "Furniture", count: 12, color: "bg-purple-500" },
    { name: "Personal", count: 15, color: "bg-orange-500" },
    { name: "Sports", count: 3, color: "bg-red-500" }
  ];

  const totalValue = inventoryItems.reduce((sum, item) => sum + item.value, 0);

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Gegenstände</p>
                <p className="text-2xl font-bold">{inventoryItems.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Gesamtwert</p>
                <p className="text-2xl font-bold">{totalValue.toLocaleString('de-DE')} €</p>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Kategorien</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <Filter className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Button className="w-full h-full flex flex-col items-center justify-center space-y-2">
              <Plus className="h-6 w-6" />
              <span>Hinzufügen</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Inventar durchsuchen..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Button>
              <Button variant="outline" size="sm">
                <Scan className="h-4 w-4 mr-2" />
                Scannen
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="items" className="space-y-6">
        <TabsList>
          <TabsTrigger value="items">Gegenstände</TabsTrigger>
          <TabsTrigger value="categories">Kategorien</TabsTrigger>
          <TabsTrigger value="analytics">Analyse</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Wert:</p>
                      <p className="font-medium">{item.value.toLocaleString('de-DE')} €</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Standort:</p>
                      <p className="font-medium">{item.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Zustand:</p>
                      <p className="font-medium">{item.condition}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Garantie:</p>
                      <p className="font-medium">{item.warranty}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Details anzeigen
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.count} Gegenstände</p>
                      </div>
                    </div>
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Inventar Analyse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Analyse-Dashboard wird hier angezeigt
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernInventoryPage;
