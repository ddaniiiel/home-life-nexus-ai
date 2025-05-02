
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Package, Search, Plus, FileText, Clock, Calendar, Tag, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ConsumableItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  maxQuantity: number;
  unit: string;
  location: string;
  lastUpdated: string;
}

interface AssetItem {
  id: number;
  name: string;
  category: string;
  brand: string;
  model: string;
  purchaseDate: string;
  warranty: string;
  price: number;
  location: string;
  image: string;
  documents: Document[];
}

interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
}

const Inventory = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Sample consumable inventory data
  const [consumableItems, setConsumableItems] = useState<ConsumableItem[]>([
    { id: 1, name: 'Toilettenpapier', category: 'Badezimmer', quantity: 4, maxQuantity: 12, unit: 'Rollen', location: 'Badezimmerschrank', lastUpdated: '2025-04-25' },
    { id: 2, name: 'Waschmittel', category: 'Haushalt', quantity: 1, maxQuantity: 2, unit: 'Flaschen', location: 'Waschraum', lastUpdated: '2025-05-01' },
    { id: 3, name: 'Zahnpasta', category: 'Badezimmer', quantity: 1, maxQuantity: 3, unit: 'Tuben', location: 'Badezimmerschrank', lastUpdated: '2025-04-28' },
    { id: 4, name: 'Kaffeebohnen', category: 'Küche', quantity: 2, maxQuantity: 3, unit: 'Pakete', location: 'Küchenschrank', lastUpdated: '2025-04-30' },
    { id: 5, name: 'Olivenöl', category: 'Küche', quantity: 1, maxQuantity: 2, unit: 'Flaschen', location: 'Küchenschrank', lastUpdated: '2025-04-27' },
    { id: 6, name: 'Müllbeutel', category: 'Haushalt', quantity: 15, maxQuantity: 30, unit: 'Stück', location: 'Küchenschrank', lastUpdated: '2025-04-15' },
  ]);

  // Sample asset inventory data
  const [assetItems, setAssetItems] = useState<AssetItem[]>([
    {
      id: 1,
      name: 'Samsung Smart TV',
      category: 'Elektronik',
      brand: 'Samsung',
      model: 'QN95B Neo QLED',
      purchaseDate: '2025-01-15',
      warranty: '2027-01-15',
      price: 1299.99,
      location: 'Wohnzimmer',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=240&q=80',
      documents: [
        { id: 101, name: 'Garantieschein.pdf', type: 'pdf', date: '2025-01-15' },
        { id: 102, name: 'Rechnung_Samsung_TV.pdf', type: 'pdf', date: '2025-01-15' }
      ]
    },
    {
      id: 2,
      name: 'Dyson Staubsauger',
      category: 'Haushaltsgeräte',
      brand: 'Dyson',
      model: 'V11 Absolute',
      purchaseDate: '2024-11-03',
      warranty: '2026-11-03',
      price: 599.99,
      location: 'Abstellraum',
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=240&q=80',
      documents: [
        { id: 103, name: 'Dyson_Garantie.pdf', type: 'pdf', date: '2024-11-03' }
      ]
    },
    {
      id: 3,
      name: 'iPhone 16 Pro',
      category: 'Elektronik',
      brand: 'Apple',
      model: 'iPhone 16 Pro',
      purchaseDate: '2025-04-01',
      warranty: '2027-04-01',
      price: 1099.00,
      location: 'Persönlich',
      image: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?auto=format&fit=crop&w=240&q=80',
      documents: [
        { id: 104, name: 'Apple_Rechnung.pdf', type: 'pdf', date: '2025-04-01' },
        { id: 105, name: 'AppleCare_Vertrag.pdf', type: 'pdf', date: '2025-04-01' }
      ]
    },
    {
      id: 4,
      name: 'Siemens Kühlschrank',
      category: 'Haushaltsgeräte',
      brand: 'Siemens',
      model: 'KG39EAICA',
      purchaseDate: '2023-07-15',
      warranty: '2028-07-15',
      price: 849.00,
      location: 'Küche',
      image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=240&q=80',
      documents: [
        { id: 106, name: 'Siemens_Rechnung.pdf', type: 'pdf', date: '2023-07-15' },
        { id: 107, name: 'Siemens_Garantie.pdf', type: 'pdf', date: '2023-07-15' },
        { id: 108, name: 'Bedienungsanleitung.pdf', type: 'pdf', date: '2023-07-15' }
      ]
    },
    {
      id: 5,
      name: 'Samsung Waschmaschine',
      category: 'Haushaltsgeräte',
      brand: 'Samsung',
      model: 'WW90T534ATW',
      purchaseDate: '2024-03-10',
      warranty: '2029-03-10',
      price: 699.00,
      location: 'Badezimmer',
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=240&q=80',
      documents: [
        { id: 109, name: 'Waschmaschine_Rechnung.pdf', type: 'pdf', date: '2024-03-10' },
        { id: 110, name: 'Samsung_Garantie_5Jahre.pdf', type: 'pdf', date: '2024-03-10' }
      ]
    },
    {
      id: 6,
      name: 'Dell XPS Laptop',
      category: 'Elektronik',
      brand: 'Dell',
      model: 'XPS 15 9570',
      purchaseDate: '2024-09-22',
      warranty: '2026-09-22',
      price: 1899.00,
      location: 'Arbeitszimmer',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=240&q=80',
      documents: [
        { id: 111, name: 'Dell_Garantie.pdf', type: 'pdf', date: '2024-09-22' },
        { id: 112, name: 'Dell_Rechnung.pdf', type: 'pdf', date: '2024-09-22' }
      ]
    }
  ]);

  // Categories for filtering
  const consumableCategories = Array.from(new Set(consumableItems.map(item => item.category)));
  const assetCategories = Array.from(new Set(assetItems.map(item => item.category)));

  // Calculate stock status
  const getStockStatus = (item: ConsumableItem) => {
    const percentage = (item.quantity / item.maxQuantity) * 100;
    if (percentage <= 20) return { color: 'bg-red-500', text: 'Nachkaufen' };
    if (percentage <= 50) return { color: 'bg-yellow-500', text: 'Mittel' };
    return { color: 'bg-green-500', text: 'Ausreichend' };
  };

  // Filter consumables
  const filteredConsumables = consumableItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter assets
  const filteredAssets = assetItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Update consumable quantity
  const updateQuantity = (id: number, change: number) => {
    setConsumableItems(consumableItems.map(item => 
      item.id === id 
        ? { ...item, 
            quantity: Math.max(0, Math.min(item.maxQuantity, item.quantity + change)),
            lastUpdated: new Date().toISOString().split('T')[0] 
          } 
        : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <Package className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Inventar & Haushalt</h1>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                type="search" 
                placeholder="Inventar durchsuchen..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" /> Neuen Artikel hinzufügen
            </Button>
          </div>
          
          <Tabs defaultValue="consumables">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="consumables" className="flex-1">Verbrauchsmaterialien</TabsTrigger>
              <TabsTrigger value="assets" className="flex-1">Geräte & Inventar</TabsTrigger>
            </TabsList>
            
            {/* Consumables Tab */}
            <TabsContent value="consumables">
              <div className="mb-6 flex flex-wrap gap-2">
                <Button 
                  variant={activeCategory === null ? "default" : "outline"}
                  onClick={() => setActiveCategory(null)}
                  size="sm"
                >
                  Alle Kategorien
                </Button>
                {consumableCategories.map(category => (
                  <Button 
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category)}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConsumables.map(item => {
                  const status = getStockStatus(item);
                  return (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <Badge>{item.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col space-y-4">
                          <div>
                            <div className="flex justify-between items-center text-sm mb-1">
                              <span>Vorrat: {item.quantity} von {item.maxQuantity} {item.unit}</span>
                              <span className="text-xs">{status.text}</span>
                            </div>
                            <Progress value={(item.quantity / item.maxQuantity) * 100} className={status.color} />
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <div>
                              <p className="text-gray-500">Ort: {item.location}</p>
                              <p className="text-gray-500 text-xs">Letztes Update: {item.lastUpdated}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 0}
                              >
                                <span className="text-lg">-</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={item.quantity >= item.maxQuantity}
                              >
                                <span className="text-lg">+</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            {/* Assets Tab */}
            <TabsContent value="assets">
              <div className="mb-6 flex flex-wrap gap-2">
                <Button 
                  variant={activeCategory === null ? "default" : "outline"}
                  onClick={() => setActiveCategory(null)}
                  size="sm"
                >
                  Alle Kategorien
                </Button>
                {assetCategories.map(category => (
                  <Button 
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category)}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map(item => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-0">
                          <div className="aspect-[16/9] relative overflow-hidden rounded-t-lg">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-white text-black">{item.category}</Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.brand} {item.model}</p>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-xs text-gray-500">Ort: {item.location}</p>
                              <div className="flex items-center text-xs text-gray-500">
                                <FileText className="h-3 w-3 mr-1" />
                                {item.documents.length} Dokumente
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>{item.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-start gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-24 h-24 object-cover rounded"
                            loading="lazy"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.brand} {item.model}</h3>
                            <div className="flex gap-4 mt-2">
                              <div>
                                <p className="text-xs text-gray-500 flex items-center">
                                  <Tag className="h-3 w-3 mr-1" />Kategorie
                                </p>
                                <p className="text-sm">{item.category}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />Kaufdatum
                                </p>
                                <p className="text-sm">{item.purchaseDate}</p>
                              </div>
                            </div>
                            <div className="flex gap-4 mt-2">
                              <div>
                                <p className="text-xs text-gray-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />Garantie bis
                                </p>
                                <p className="text-sm">{item.warranty}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Preis</p>
                                <p className="text-sm">{item.price.toFixed(2)} €</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-medium mb-2">Dokumente</h4>
                          <div className="space-y-2">
                            {item.documents.map(doc => (
                              <div 
                                key={doc.id} 
                                className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
                              >
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                  <div>
                                    <p className="text-sm">{doc.name}</p>
                                    <p className="text-xs text-gray-500">Hinzugefügt: {doc.date}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-2">
                          <Button variant="outline">Bearbeiten</Button>
                          <Button>Dokument hinzufügen</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
