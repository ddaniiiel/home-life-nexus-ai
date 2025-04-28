
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Package, ShoppingCart, Search, Plus, ArrowDownUp, Filter, Minus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import BringAppSync from '@/components/BringAppSync';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const Inventory = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Toilettenpapier', category: 'Badezimmer', quantity: 12, minQuantity: 4, unit: 'Rollen' },
    { id: 2, name: 'Milch', category: 'Lebensmittel', quantity: 1, minQuantity: 2, unit: 'Liter' },
    { id: 3, name: 'Zahnpasta', category: 'Badezimmer', quantity: 2, minQuantity: 1, unit: 'Tuben' },
    { id: 4, name: 'Reis', category: 'Lebensmittel', quantity: 1500, minQuantity: 500, unit: 'g' },
    { id: 5, name: 'Waschmittel', category: 'Wäsche', quantity: 1, minQuantity: 1, unit: 'Flaschen' },
  ]);

  const [shoppingList, setShoppingList] = useState([
    { id: 1, name: 'Milch', category: 'Lebensmittel', quantity: 2, checked: false },
    { id: 2, name: 'Brot', category: 'Lebensmittel', quantity: 1, checked: true },
    { id: 3, name: 'Äpfel', category: 'Lebensmittel', quantity: 6, checked: false },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 1,
    minQuantity: 1,
    unit: ''
  });

  const filteredItems = searchQuery 
    ? inventoryItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : inventoryItems;

  const handleQuantityChange = (id, change) => {
    setInventoryItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
    
    toast({
      title: "Bestand aktualisiert",
      description: `Menge wurde ${change > 0 ? "erhöht" : "verringert"}.`,
    });
  };

  const toggleShoppingItem = (id) => {
    setShoppingList(list => 
      list.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addToShoppingList = (inventoryItem) => {
    const existingItem = shoppingList.find(item => item.name === inventoryItem.name);
    
    if (existingItem) {
      setShoppingList(list => 
        list.map(item => 
          item.name === inventoryItem.name 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newShoppingItem = {
        id: Date.now(),
        name: inventoryItem.name,
        category: inventoryItem.category,
        quantity: 1,
        checked: false
      };
      
      setShoppingList(list => [...list, newShoppingItem]);
    }
    
    toast({
      title: "Zur Einkaufsliste hinzugefügt",
      description: `${inventoryItem.name} wurde zur Einkaufsliste hinzugefügt.`,
    });
  };

  const handleAddNewItem = () => {
    if (!newItem.name || !newItem.category || !newItem.unit) {
      toast({
        title: "Fehlerhafte Eingabe",
        description: "Bitte alle Pflichtfelder ausfüllen.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(0, ...inventoryItems.map(item => item.id)) + 1;
    const itemToAdd = {
      ...newItem,
      id: newId
    };

    setInventoryItems([...inventoryItems, itemToAdd]);
    setNewItem({
      name: '',
      category: '',
      quantity: 1,
      minQuantity: 1,
      unit: ''
    });
    
    toast({
      title: "Artikel hinzugefügt",
      description: `${newItem.name} wurde zum Inventar hinzugefügt.`,
    });
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;
    
    setInventoryItems(items =>
      items.map(item =>
        item.id === editingItem.id ? editingItem : item
      )
    );
    
    setEditingItem(null);
    
    toast({
      title: "Artikel aktualisiert",
      description: `${editingItem.name} wurde aktualisiert.`,
    });
  };

  const handleDeleteItem = (id) => {
    setInventoryItems(items => items.filter(item => item.id !== id));
    
    toast({
      title: "Artikel gelöscht",
      description: "Der Artikel wurde aus dem Inventar entfernt.",
    });
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
            <h1 className="text-3xl font-bold">Vorratsmanagement</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-xl font-semibold">Inventar</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Suchen..." 
                        className="pl-10" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ArrowDownUp className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" /> Neu
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Neuen Artikel hinzufügen</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="item-name">Name</Label>
                              <Input 
                                id="item-name" 
                                value={newItem.name}
                                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                                placeholder="z.B. Toilettenpapier" 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="item-category">Kategorie</Label>
                              <Select 
                                value={newItem.category}
                                onValueChange={(value) => setNewItem({...newItem, category: value})}
                              >
                                <SelectTrigger id="item-category">
                                  <SelectValue placeholder="Kategorie wählen" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Badezimmer">Badezimmer</SelectItem>
                                  <SelectItem value="Lebensmittel">Lebensmittel</SelectItem>
                                  <SelectItem value="Wäsche">Wäsche</SelectItem>
                                  <SelectItem value="Reinigung">Reinigung</SelectItem>
                                  <SelectItem value="Büro">Büro</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="item-quantity">Menge</Label>
                                <Input 
                                  id="item-quantity" 
                                  type="number" 
                                  min="0"
                                  value={newItem.quantity}
                                  onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="item-unit">Einheit</Label>
                                <Select
                                  value={newItem.unit}
                                  onValueChange={(value) => setNewItem({...newItem, unit: value})}
                                >
                                  <SelectTrigger id="item-unit">
                                    <SelectValue placeholder="Einheit wählen" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Stück">Stück</SelectItem>
                                    <SelectItem value="Packungen">Packungen</SelectItem>
                                    <SelectItem value="Flaschen">Flaschen</SelectItem>
                                    <SelectItem value="Tuben">Tuben</SelectItem>
                                    <SelectItem value="Rollen">Rollen</SelectItem>
                                    <SelectItem value="kg">kg</SelectItem>
                                    <SelectItem value="g">g</SelectItem>
                                    <SelectItem value="Liter">Liter</SelectItem>
                                    <SelectItem value="ml">ml</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="item-min-quantity">Mindestmenge</Label>
                              <Input 
                                id="item-min-quantity" 
                                type="number" 
                                min="0" 
                                value={newItem.minQuantity}
                                onChange={(e) => setNewItem({...newItem, minQuantity: parseInt(e.target.value) || 0})}
                              />
                              <p className="text-xs text-gray-500">Bei Unterschreitung wird der Artikel zur Einkaufsliste hinzugefügt</p>
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                              <DialogClose asChild>
                                <Button variant="outline">Abbrechen</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={handleAddNewItem}>Hinzufügen</Button>
                              </DialogClose>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Artikel</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategorie</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Menge</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredItems.length > 0 ? filteredItems.map((item) => {
                        const percentFilled = (item.quantity / item.minQuantity) * 100;
                        let statusColor = "green";
                        if (percentFilled <= 50) statusColor = "red";
                        else if (percentFilled <= 100) statusColor = "yellow";
                        
                        return (
                          <tr key={item.id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {item.name}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Badge variant="outline">{item.category}</Badge>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-6 w-6 rounded-full"
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="mx-3">
                                  {item.quantity} {item.unit}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-6 w-6 rounded-full"
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="w-full max-w-[150px]">
                                <Progress 
                                  value={Math.min(percentFilled, 200)} 
                                  className="h-2" 
                                  style={{ 
                                    backgroundColor: statusColor === "red" ? '#FEE2E2' : 
                                                   statusColor === "yellow" ? '#FEF3C7' : 
                                                   '#DCFCE7'
                                  }}
                                />
                                <p className="text-xs mt-1 text-gray-500">
                                  {item.quantity < item.minQuantity ? (
                                    <span className="text-red-600">Nachkaufen</span>
                                  ) : item.quantity === item.minQuantity ? (
                                    <span className="text-yellow-600">Minimum erreicht</span>
                                  ) : (
                                    <span className="text-green-600">Ausreichend</span>
                                  )}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => setEditingItem({...item})}
                                    >
                                      <Edit className="h-4 w-4 text-gray-500" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Artikel bearbeiten</DialogTitle>
                                    </DialogHeader>
                                    {editingItem && (
                                      <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-item-name">Name</Label>
                                          <Input 
                                            id="edit-item-name" 
                                            value={editingItem.name}
                                            onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                                          />
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-item-category">Kategorie</Label>
                                          <Select 
                                            value={editingItem.category}
                                            onValueChange={(value) => setEditingItem({...editingItem, category: value})}
                                          >
                                            <SelectTrigger id="edit-item-category">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Badezimmer">Badezimmer</SelectItem>
                                              <SelectItem value="Lebensmittel">Lebensmittel</SelectItem>
                                              <SelectItem value="Wäsche">Wäsche</SelectItem>
                                              <SelectItem value="Reinigung">Reinigung</SelectItem>
                                              <SelectItem value="Büro">Büro</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-item-quantity">Menge</Label>
                                            <Input 
                                              id="edit-item-quantity" 
                                              type="number" 
                                              min="0"
                                              value={editingItem.quantity}
                                              onChange={(e) => setEditingItem({
                                                ...editingItem, 
                                                quantity: parseInt(e.target.value) || 0
                                              })}
                                            />
                                          </div>
                                          
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-item-unit">Einheit</Label>
                                            <Select
                                              value={editingItem.unit}
                                              onValueChange={(value) => setEditingItem({...editingItem, unit: value})}
                                            >
                                              <SelectTrigger id="edit-item-unit">
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Stück">Stück</SelectItem>
                                                <SelectItem value="Packungen">Packungen</SelectItem>
                                                <SelectItem value="Flaschen">Flaschen</SelectItem>
                                                <SelectItem value="Tuben">Tuben</SelectItem>
                                                <SelectItem value="Rollen">Rollen</SelectItem>
                                                <SelectItem value="kg">kg</SelectItem>
                                                <SelectItem value="g">g</SelectItem>
                                                <SelectItem value="Liter">Liter</SelectItem>
                                                <SelectItem value="ml">ml</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-item-min-quantity">Mindestmenge</Label>
                                          <Input 
                                            id="edit-item-min-quantity" 
                                            type="number" 
                                            min="0" 
                                            value={editingItem.minQuantity}
                                            onChange={(e) => setEditingItem({
                                              ...editingItem, 
                                              minQuantity: parseInt(e.target.value) || 0
                                            })}
                                          />
                                        </div>
                                        
                                        <div className="flex justify-end space-x-2">
                                          <DialogClose asChild>
                                            <Button variant="outline">Abbrechen</Button>
                                          </DialogClose>
                                          <DialogClose asChild>
                                            <Button onClick={handleUpdateItem}>Speichern</Button>
                                          </DialogClose>
                                        </div>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                                
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Artikel löschen</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <p>Möchtest du diesen Artikel wirklich löschen?</p>
                                      <div className="flex justify-end space-x-2 mt-4">
                                        <DialogClose asChild>
                                          <Button variant="outline">Abbrechen</Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                          <Button 
                                            variant="destructive"
                                            onClick={() => handleDeleteItem(item.id)}
                                          >
                                            Löschen
                                          </Button>
                                        </DialogClose>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => addToShoppingList(item)}
                                  className="text-xs"
                                >
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  Zur Liste
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      }) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                            {searchQuery ? 'Keine Artikel gefunden.' : 'Noch keine Artikel vorhanden.'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2 text-gray-500" />
                    Einkaufsliste
                  </h2>
                  <Button size="sm">
                    <Plus className="h-3 w-3 mr-1" /> Hinzufügen
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {shoppingList.map((item) => (
                    <div key={item.id} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleShoppingItem(item.id)}
                        className="h-4 w-4 rounded border-gray-300 text-homepilot-primary focus:ring-homepilot-primary"
                      />
                      <div className="ml-3 flex-1">
                        <p className={`text-sm font-medium ${item.checked ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.quantity}x · {item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500">
                    Artikel mit niedrigem Bestand:
                  </p>
                  <div className="mt-2">
                    {inventoryItems
                      .filter(item => item.quantity <= item.minQuantity)
                      .map(item => (
                        <div key={item.id} className="flex items-center justify-between text-sm py-2">
                          <span>{item.name}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => addToShoppingList(item)}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Zur Liste
                          </Button>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              
              <BringAppSync />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
