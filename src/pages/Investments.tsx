
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { CreditCard, Search, Plus, BarChart3, Wallet, ChevronDown, ChevronUp, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Investments = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample data
  const portfolios = [
    { id: 1, name: 'Swissquote', type: 'Aktienportfolio', value: 245000, currency: 'CHF', change: 2.3, color: 'bg-blue-100' },
    { id: 2, name: 'Saxo Bank', type: 'ETF Portfolio', value: 178500, currency: 'CHF', change: -0.8, color: 'bg-purple-100' },
    { id: 3, name: 'Inyova', type: 'Nachhaltiges Portfolio', value: 56200, currency: 'CHF', change: 1.5, color: 'bg-green-100' },
    { id: 4, name: 'Hypothek UBS', type: 'Immobilienkredit', value: 750000, currency: 'CHF', change: 0, color: 'bg-amber-100', isLiability: true },
    { id: 5, name: 'Hypothek ZKB', type: 'Immobilienkredit', value: 450000, currency: 'CHF', change: 0, color: 'bg-amber-100', isLiability: true },
    { id: 6, name: 'Raiffeisen', type: 'Sparkonto', value: 35000, currency: 'CHF', change: 0.1, color: 'bg-cyan-100' },
  ];

  const marketIndices = [
    { id: 1, name: 'SMI', value: '11,837.74', change: -0.23, region: 'Schweiz' },
    { id: 2, name: 'SPI', value: '15,943.22', change: -0.18, region: 'Schweiz' },
    { id: 3, name: 'DAX', value: '18,205.89', change: 0.37, region: 'Europa' },
    { id: 4, name: 'EuroStoxx 50', value: '4,912.34', change: 0.22, region: 'Europa' },
    { id: 5, name: 'S&P 500', value: '5,264.87', change: 0.51, region: 'USA' },
    { id: 6, name: 'Nasdaq', value: '16,742.39', change: 0.78, region: 'USA' },
    { id: 7, name: 'Nikkei 225', value: '38,992.08', change: -0.14, region: 'Asien' },
  ];

  // Calculate totals
  const totalAssets = portfolios
    .filter(p => !p.isLiability)
    .reduce((sum, portfolio) => sum + portfolio.value, 0);
  
  const totalLiabilities = portfolios
    .filter(p => p.isLiability)
    .reduce((sum, portfolio) => sum + portfolio.value, 0);
  
  const netWorth = totalAssets - totalLiabilities;

  // Format currency
  const formatCurrency = (value, currency = 'CHF') => {
    return new Intl.NumberFormat('de-CH', { 
      style: 'currency', 
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <Wallet className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Investitionen</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Gesamtvermögen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalAssets)}</div>
                <div className="text-sm text-gray-500 mt-1">Alle Anlagen & Konten</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Verbindlichkeiten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalLiabilities)}</div>
                <div className="text-sm text-gray-500 mt-1">Hypotheken & Kredite</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Nettovermögen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(netWorth)}</div>
                <div className="text-sm text-gray-500 mt-1">Vermögen - Verbindlichkeiten</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="portfolio" className="space-y-8">
            <TabsList>
              <TabsTrigger value="portfolio" className="flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                Portfolioübersicht
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Marktübersicht
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Portfolio suchen..." className="pl-10" />
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Neues Portfolio
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Portfolio oder Konto hinzufügen</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="portfolio-name">Name</Label>
                        <Input id="portfolio-name" placeholder="z.B. Swissquote Depot" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="portfolio-type">Typ</Label>
                        <Select>
                          <SelectTrigger id="portfolio-type">
                            <SelectValue placeholder="Typ auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stock">Aktienportfolio</SelectItem>
                            <SelectItem value="etf">ETF Portfolio</SelectItem>
                            <SelectItem value="fund">Fonds</SelectItem>
                            <SelectItem value="saving">Sparkonto</SelectItem>
                            <SelectItem value="pension">Vorsorge</SelectItem>
                            <SelectItem value="mortgage">Hypothek</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="portfolio-value">Wert</Label>
                          <Input id="portfolio-value" type="number" placeholder="0" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="portfolio-currency">Währung</Label>
                          <Select defaultValue="CHF">
                            <SelectTrigger id="portfolio-currency">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CHF">CHF</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Hinzufügen</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-4">
                {portfolios.map((portfolio) => (
                  <Card key={portfolio.id} className="overflow-hidden">
                    <div className={`h-1 ${portfolio.color} w-full`}></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-medium mb-1">{portfolio.name}</h3>
                          <p className="text-sm text-gray-500">{portfolio.type}</p>
                        </div>
                        
                        <div className="mt-4 md:mt-0 text-right">
                          <div className="text-xl font-bold">
                            {formatCurrency(portfolio.value, portfolio.currency)}
                          </div>
                          
                          {portfolio.change !== 0 && (
                            <div className={`flex items-center justify-end text-sm ${portfolio.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {portfolio.change > 0 ? (
                                <>
                                  <TrendingUp className="h-4 w-4 mr-1" />
                                  +{portfolio.change}%
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="h-4 w-4 mr-1" />
                                  {portfolio.change}%
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex mt-4 space-x-2 justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" className="flex items-center">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Öffnen
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="market">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">Marktübersicht</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Index</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Region</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Wert</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Veränderung</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {marketIndices.map((index) => (
                        <tr key={index.id}>
                          <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                            {index.name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                            {index.region}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                            {index.value}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`flex items-center ${index.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {index.change > 0 ? (
                                <>
                                  <ChevronUp className="h-4 w-4" />
                                  +{index.change}%
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4" />
                                  {index.change}%
                                </>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p>Daten werden täglich aktualisiert. Letztes Update: 28.04.2025, 17:30 Uhr</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Währungen</CardTitle>
                    <CardDescription>Aktuelle Wechselkurse</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-2 border-b">
                        <span>EUR/CHF</span>
                        <div className="flex items-center">
                          <span className="font-medium">0.9728</span>
                          <span className="text-green-600 text-xs ml-2 flex items-center">
                            <ChevronUp className="h-3 w-3" />
                            0.15%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b">
                        <span>USD/CHF</span>
                        <div className="flex items-center">
                          <span className="font-medium">0.9065</span>
                          <span className="text-red-600 text-xs ml-2 flex items-center">
                            <ChevronDown className="h-3 w-3" />
                            0.22%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b">
                        <span>GBP/CHF</span>
                        <div className="flex items-center">
                          <span className="font-medium">1.1342</span>
                          <span className="text-green-600 text-xs ml-2 flex items-center">
                            <ChevronUp className="h-3 w-3" />
                            0.08%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2">
                        <span>JPY/CHF</span>
                        <div className="flex items-center">
                          <span className="font-medium">0.0059</span>
                          <span className="text-red-600 text-xs ml-2 flex items-center">
                            <ChevronDown className="h-3 w-3" />
                            0.31%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Zinsentwicklung</CardTitle>
                    <CardDescription>Aktuelle Hypotheken- & Leitzinsen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-2 border-b">
                        <span>SNB Leitzins</span>
                        <span className="font-medium">1.50%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b">
                        <span>SARON 3M</span>
                        <span className="font-medium">1.48%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b">
                        <span>Hypothek 2J fix</span>
                        <span className="font-medium">1.89%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b">
                        <span>Hypothek 5J fix</span>
                        <span className="font-medium">1.75%</span>
                      </div>
                      <div className="flex justify-between items-center p-2">
                        <span>Hypothek 10J fix</span>
                        <span className="font-medium">1.93%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Investments;
