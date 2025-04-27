
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Newspaper, Bell, Filter, RefreshCw, Bookmark, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: string;
  imageUrl?: string;
  url: string;
  isSaved: boolean;
}

interface CategorySubscription {
  id: string;
  name: string;
  isSubscribed: boolean;
}

const News = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<CategorySubscription[]>([
    { id: 'property-laws', name: 'Eigentumsgesetze', isSubscribed: true },
    { id: 'energy', name: 'Energiepreise & Nachhaltigkeit', isSubscribed: true },
    { id: 'taxes', name: 'Steuern & Abgaben', isSubscribed: true },
    { id: 'insurance', name: 'Versicherungen', isSubscribed: false },
    { id: 'mortgage', name: 'Hypotheken & Zinsen', isSubscribed: true },
    { id: 'renovation', name: 'Renovierung & Unterhalt', isSubscribed: false },
    { id: 'smart-home', name: 'Smart Home & Technologie', isSubscribed: true },
    { id: 'local', name: 'Lokale Nachrichten', isSubscribed: false },
  ]);
  
  useEffect(() => {
    // Mock news data
    const mockNews: NewsItem[] = [
      {
        id: 1,
        title: 'Neue Energiepreise für 2026 bekannt gegeben',
        summary: 'Das Bundesamt für Energie hat die neuen Tarife für das kommende Jahr veröffentlicht. Hausbesitzer in der Schweiz können mit durchschnittlich 5% niedrigeren Stromkosten rechnen.',
        source: 'Bundesamt für Energie',
        date: '2025-04-22',
        category: 'energy',
        imageUrl: 'https://source.unsplash.com/random/300x200?energy',
        url: '#',
        isSaved: false,
      },
      {
        id: 2,
        title: 'Änderung im Eigentumsrecht für Mehrfamilienhäuser',
        summary: 'Der Bundesrat plant eine Reform des Stockwerkeigentums. Die neuen Regelungen sollen Renovierungsprojekte erleichtern und Konflikte zwischen Eigentümern reduzieren.',
        source: 'Schweizerischer Bundesrat',
        date: '2025-04-15',
        category: 'property-laws',
        imageUrl: 'https://source.unsplash.com/random/300x200?apartment',
        url: '#',
        isSaved: true,
      },
      {
        id: 3,
        title: 'Steuervergünstigungen für energetische Sanierungen verlängert',
        summary: 'Das Parlament hat beschlossen, die Steuervergünstigungen für energetische Gebäudesanierungen um weitere fünf Jahre zu verlängern. Hausbesitzer können bis zu 20% der Investitionen steuerlich absetzen.',
        source: 'Eidgenössische Steuerverwaltung',
        date: '2025-04-10',
        category: 'taxes',
        imageUrl: 'https://source.unsplash.com/random/300x200?renovation',
        url: '#',
        isSaved: false,
      },
      {
        id: 4,
        title: 'Neue Smart Home Standards für die Schweiz',
        summary: 'Der Verband Schweizerischer Elektrizitätsunternehmen (VSE) hat neue Standards für Smart Home Geräte definiert. Diese sollen die Kompatibilität zwischen verschiedenen Systemen verbessern.',
        source: 'VSE',
        date: '2025-04-05',
        category: 'smart-home',
        imageUrl: 'https://source.unsplash.com/random/300x200?smarthome',
        url: '#',
        isSaved: false,
      },
      {
        id: 5,
        title: 'Hypothekarzinsen sinken auf neuen Tiefstand',
        summary: 'Die Schweizerische Nationalbank verzeichnet einen weiteren Rückgang der Hypothekarzinsen. Experten empfehlen, bestehende Hypotheken zu überprüfen.',
        source: 'Schweizerische Nationalbank',
        date: '2025-03-28',
        category: 'mortgage',
        imageUrl: 'https://source.unsplash.com/random/300x200?mortgage',
        url: '#',
        isSaved: true,
      },
      {
        id: 6,
        title: 'Loxone und 1home kündigen neue Integration an',
        summary: 'Die Smart Home Anbieter Loxone und 1home haben eine umfassende Integration angekündigt. Nutzer beider Systeme können nun ihre Geräte zentral steuern.',
        source: 'Loxone AG',
        date: '2025-03-25',
        category: 'smart-home',
        imageUrl: 'https://source.unsplash.com/random/300x200?automation',
        url: '#',
        isSaved: false,
      },
    ];
    
    setNews(mockNews);
    filterNews(mockNews, searchQuery);
  }, []);
  
  useEffect(() => {
    filterNews(news, searchQuery);
  }, [searchQuery, categories]);
  
  const filterNews = (newsItems: NewsItem[], query: string) => {
    const subscribedCategories = categories.filter(cat => cat.isSubscribed).map(cat => cat.id);
    
    const filtered = newsItems.filter(item => {
      const matchesQuery = query === '' || 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.summary.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = subscribedCategories.includes(item.category);
      
      return matchesQuery && matchesCategory;
    });
    
    setFilteredNews(filtered);
  };
  
  const toggleSaveNews = (id: number) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, isSaved: !item.isSaved } : item
    ));
    
    const newsItem = news.find(item => item.id === id);
    if (newsItem) {
      toast({
        title: newsItem.isSaved ? "Von Merkliste entfernt" : "Zur Merkliste hinzugefügt",
        description: newsItem.title,
      });
    }
    
    filterNews(news.map(item => 
      item.id === id ? { ...item, isSaved: !item.isSaved } : item
    ), searchQuery);
  };
  
  const toggleCategorySubscription = (id: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, isSubscribed: !cat.isSubscribed } : cat
    ));
    
    const category = categories.find(cat => cat.id === id);
    if (category) {
      toast({
        title: category.isSubscribed ? 
          `Abonnement für "${category.name}" beendet` : 
          `"${category.name}" abonniert`,
        description: category.isSubscribed ? 
          "Sie erhalten keine Neuigkeiten mehr zu diesem Thema." : 
          "Sie erhalten ab sofort Neuigkeiten zu diesem Thema.",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <Newspaper className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Nachrichten</h1>
          </div>
          
          <Tabs defaultValue="all" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">Alle Nachrichten</TabsTrigger>
                <TabsTrigger value="saved">Gespeicherte</TabsTrigger>
                <TabsTrigger value="categories">Kategorien</TabsTrigger>
              </TabsList>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Nachrichten durchsuchen..." 
                  className="pl-10 w-full sm:w-auto" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <TabsContent value="all">
              {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      {item.imageUrl && (
                        <div className="w-full h-48 overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {categories.find(cat => cat.id === item.category)?.name || item.category}
                            </Badge>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => toggleSaveNews(item.id)}
                            className={item.isSaved ? "text-homepilot-primary" : ""}
                          >
                            <Bookmark className="h-5 w-5" />
                          </Button>
                        </div>
                        <CardDescription className="text-xs">
                          {item.source} | {new Date(item.date).toLocaleDateString('de-CH')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{item.summary}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            Weiterlesen
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Newspaper className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Keine Nachrichten gefunden</h3>
                  <p className="text-gray-500">
                    {searchQuery ? 'Versuchen Sie eine andere Suchanfrage oder' : 'Bitte'} abonnieren Sie weitere Kategorien.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              {filteredNews.filter(item => item.isSaved).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews
                    .filter(item => item.isSaved)
                    .map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        {item.imageUrl && (
                          <div className="w-full h-48 overflow-hidden">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge variant="outline" className="mb-2">
                                {categories.find(cat => cat.id === item.category)?.name || item.category}
                              </Badge>
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => toggleSaveNews(item.id)}
                              className="text-homepilot-primary"
                            >
                              <Bookmark className="h-5 w-5" fill="currentColor" />
                            </Button>
                          </div>
                          <CardDescription className="text-xs">
                            {item.source} | {new Date(item.date).toLocaleDateString('de-CH')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{item.summary}</p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="w-full">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              Weiterlesen
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Keine gespeicherten Nachrichten</h3>
                  <p className="text-gray-500">Nutzen Sie das Lesezeichen-Symbol, um interessante Nachrichten zu speichern.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Kategorien verwalten</CardTitle>
                  <CardDescription>
                    Wählen Sie aus, zu welchen Themen Sie Nachrichten erhalten möchten.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                        <Label htmlFor={`category-${category.id}`} className="flex flex-col cursor-pointer">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-xs text-gray-500">
                            {category.isSubscribed ? 'Abonniert' : 'Nicht abonniert'}
                          </span>
                        </Label>
                        <Switch
                          id={`category-${category.id}`}
                          checked={category.isSubscribed}
                          onCheckedChange={() => toggleCategorySubscription(category.id)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Kategorien aktualisiert",
                        description: "Ihre Nachrichtenpräferenzen wurden gespeichert.",
                      });
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Präferenzen aktualisieren
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default News;
