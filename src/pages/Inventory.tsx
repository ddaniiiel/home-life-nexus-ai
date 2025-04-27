
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Package, ShoppingCart, Search, Plus, ArrowDownUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Inventory = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const inventoryItems = [
    { id: 1, name: 'Toilettenpapier', category: 'Badezimmer', quantity: 12, minQuantity: 4, unit: 'Rollen' },
    { id: 2, name: 'Milch', category: 'Lebensmittel', quantity: 1, minQuantity: 2, unit: 'Liter' },
    { id: 3, name: 'Zahnpasta', category: 'Badezimmer', quantity: 2, minQuantity: 1, unit: 'Tuben' },
    { id: 4, name: 'Reis', category: 'Lebensmittel', quantity: 1500, minQuantity: 500, unit: 'g' },
    { id: 5, name: 'Waschmittel', category: 'Wäsche', quantity: 1, minQuantity: 1, unit: 'Flaschen' },
  ];

  const shoppingList = [
    { id: 1, name: 'Milch', category: 'Lebensmittel', quantity: 2, checked: false },
    { id: 2, name: 'Brot', category: 'Lebensmittel', quantity: 1, checked: true },
    { id: 3, name: 'Äpfel', category: 'Lebensmittel', quantity: 6, checked: false },
  ];

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
                      <Input placeholder="Suchen..." className="pl-10" />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ArrowDownUp className="h-4 w-4" />
                      </Button>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Neu
                      </Button>
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
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {inventoryItems.map((item) => {
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
                              {item.quantity} {item.unit}
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
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div>
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
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <Plus className="h-3 w-3 mr-1" /> Zur Liste
                          </Button>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
