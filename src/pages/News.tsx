import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Newspaper, Bell, Filter, RefreshCw, Bookmark, Search, Calendar, Building, Home, Shield, LightbulbIcon, Zap, Coins, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

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
  icon: React.ReactNode;
}

const News = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategorySubscription[]>([
    { id: 'property-laws', name: 'Eigentumsgesetze', isSubscribed: true, icon: <Building className="h-4 w-4" /> },
    { id: 'energy', name: 'Energiepreise & Nachhaltigkeit', isSubscribed: true, icon: <Zap className="h-4 w-4" /> },
    { id: 'taxes', name: 'Steuern & Abgaben', isSubscribed: true, icon: <Coins className="h-4 w-4" /> },
    { id: 'insurance', name: 'Versicherungen', isSubscribed: false, icon: <Shield className="h-4 w-4" /> },
    { id: 'mortgage', name: 'Hypotheken & Zinsen', isSubscribed: true, icon: <Home className="h-4 w-4" /> },
    { id: 'renovation', name: 'Renovierung & Unterhalt', isSubscribed: false, icon: <LightbulbIcon className="h-4 w-4" /> },
    { id: 'smart-home', name: 'Smart Home & Technologie', isSubscribed: true, icon: <LightbulbIcon className="h-4 w-4" /> },
    { id: 'local', name: 'Lokale Nachrichten', isSubscribed: false, icon: <Calendar className="h-4 w-4" /> },
  ]);
  
  useEffect(() => {
    // Simulieren eines API-Aufrufs mit echten Links
    setIsLoading(true);
    setTimeout(() => {
      const mockNews: NewsItem[] = [
        // Energiepreise & Nachhaltigkeit (energy)
        {
          id: 1,
          title: 'Energiepreise und Klimaschutz: Schweiz auf dem Weg zur Klimaneutralität',
          summary: 'Die Schweiz strebt bis 2050 Klimaneutralität an. Die neue Strategie beinhaltet strengere CO₂-Grenzwerte und Förderprogramme für erneuerbare Energien.',
          source: 'Bundesamt für Energie',
          date: '2025-04-22',
          category: 'energy',
          imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: 'https://www.admin.ch/gov/de/start/dokumentation/medienmitteilungen.msg-id-96849.html',
          isSaved: false,
        },
        {
          id: 2,
          title: 'Solarförderung 2025: Diese neuen Programme gibt es',
          summary: 'Der Bundesrat beschliesst neue Fördermassnahmen für Solaranlagen. Die Subventionen werden erhöht und der Anmeldeprozess vereinfacht.',
          source: 'Bundesamt für Energie',
          date: '2025-04-20',
          category: 'energy',
          imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: 'https://www.bfe.admin.ch/bfe/de/home/news-und-medien/medienmitteilungen/mm-test.msg-id-89825.html',
          isSaved: false,
        },
        {
          id: 3,
          title: 'Wärmepumpen: Neue Effizienzstandards ab 2025',
          summary: 'Die Schweizerische Energiekommission veröffentlicht neue Effizienzrichtlinien für Wärmepumpen, die den Energieverbrauch weiter senken sollen.',
          source: 'Schweizer Energiekommission',
          date: '2025-04-18',
          category: 'energy',
          imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: 'https://www.energieschweiz.ch/page/de-ch/effiziente-waermepumpen',
          isSaved: false,
        },
        
        // Eigentumsgesetze (property-laws)
        {
          id: 5,
          title: 'Reform des Stockwerkeigentums: Was Eigentümer wissen müssen',
          summary: 'Der Bundesrat plant eine Reform des Stockwerkeigentums. Die neuen Regelungen sollen Renovierungsprojekte erleichtern und Streitigkeiten vermeiden.',
          source: 'Schweizerischer Bundesrat',
          date: '2025-04-15',
          category: 'property-laws',
          imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: 'https://www.bj.admin.ch/bj/de/home/wirtschaft/gesetzgebung/stockwerkeigentum.html',
          isSaved: true,
        },
        
        // Smart Home (smart-home)
        {
          id: 11,
          title: 'Matter 2.0: Der neue Smart Home Standard im Überblick',
          summary: 'Der Connectivity Standards Alliance hat Matter 2.0 veröffentlicht. Was der neue Standard für Smart-Home-Geräte bedeutet und welche Vorteile er bringt.',
          source: 'Connect',
          date: '2025-04-05',
          category: 'smart-home',
          imageUrl: 'https://images.unsplash.com/photo-1558002038-bb0237f4fa0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: 'https://www.connect.de/ratgeber/matter-smart-home-standard-geraete-kompatibilitaet-steuerung-3201220.html',
          isSaved: false,
        },
        {
          id: 12,
          title: 'Smart Home Sicherheit: So schützen Sie Ihr Zuhause',
          summary: 'Experten geben Tipps zur Absicherung von Smart-Home-Systemen gegen Cyberangriffe und unbefugten Zugriff.',
          source: 'Digitec',
          date: '2025-03-25',
          category: 'smart-home',
          imageUrl: 'https://images.unsplash.com/photo-1585399073500-e11f8f3c4728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: 'https://www.digitec.ch/de/wiki/2547',
          isSaved: false,
        },
        
        // Hypotheken & Zinsen (mortgage)
        {
          id: 14,
          title: 'Zinswende 2025: Hypothekarzinsen auf neuem Tiefstand',
          summary: 'Die Schweizerische Nationalbank senkt den Leitzins. Was das für Hausbesitzer und angehende Immobilienkäufer bedeutet.',
          source: 'SRF',
          date: '2025-03-28',
          category: 'mortgage',
          imageUrl: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: 'https://www.srf.ch/news/wirtschaft/finanzierung-eigenheim-hypotheken-nicht-vorzeitig-abloesen-trotz-negativzins',
          isSaved: true,
        },
        {
          id: 15,
          title: 'Nachhaltige Immobilienfinanzierung: Neue grüne Hypotheken',
          summary: 'Schweizer Banken führen spezielle Hypothekenmodelle für energieeffiziente Gebäude ein. Was sind die Vorteile und wer kann profitieren?',
          source: 'Comparis',
          date: '2025-03-26',
          category: 'mortgage',
          imageUrl: 'https://images.unsplash.com/photo-1638183395699-9e3b5af6aabd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: 'https://www.comparis.ch/hypotheken/info/ratgeber/gruene-hypothek',
          isSaved: false,
        },
        
        // Renovierung & Unterhalt (renovation)
        {
          id: 20,
          title: 'Nachhaltiges Bauen: Neue Zertifizierung für Renovierungen',
          summary: 'Der Schweizer Ingenieur- und Architektenverein (SIA) hat einen neuen Standard für nachhaltige Renovierungen veröffentlicht.',
          source: 'SIA',
          date: '2025-02-28',
          category: 'renovation',
          imageUrl: 'https://images.unsplash.com/photo-1621570361046-63003f1610e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: 'https://www.sia.ch/de/themen/energie/sia-effizienzpfad-energie/',
          isSaved: false,
        },
      ];
      
      setNews(mockNews);
      filterNews(mockNews, searchQuery);
      setIsLoading(false);
    }, 1000);
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
  
  // Funktion zum Rendern von Nachrichten-Skeletons während des Ladens
  const renderNewsSkeletons = () => {
    return Array(6).fill(0).map((_, i) => (
      <Card key={i} className="overflow-hidden">
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-3 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-full" />
        </CardFooter>
      </Card>
    ));
  };
  
  // Gruppieren der Nachrichten nach Kategorie für die Statistiken
  const getCategoryStats = () => {
    const stats = {};
    
    categories.forEach(category => {
      stats[category.id] = {
        name: category.name,
        count: news.filter(item => item.category === category.id).length,
        icon: category.icon,
        isSubscribed: category.isSubscribed
      };
    });
    
    return stats;
  };
  
  const categoryStats = getCategoryStats();

  // Funktion für Kategoriefarben
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'energy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'property-laws': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'smart-home': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'mortgage': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'renovation': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'taxes': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'insurance': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
      case 'local': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
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
                <TabsTrigger value="stats">Statistik</TabsTrigger>
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
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderNewsSkeletons()}
                </div>
              ) : filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {item.imageUrl && (
                        <div className="w-full h-48 overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className={`mb-2 flex items-center gap-1 ${getCategoryColor(item.category)}`}>
                              {categories.find(cat => cat.id === item.category)?.icon}
                              <span className="ml-1">{categories.find(cat => cat.id === item.category)?.name || item.category}</span>
                            </Badge>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => toggleSaveNews(item.id)}
                            className={item.isSaved ? "text-homepilot-primary" : ""}
                          >
                            <Bookmark className={`h-5 w-5 ${item.isSaved ? "fill-current" : ""}`} />
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
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full flex justify-between"
                        >
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <span>Weiterlesen</span>
                            <ExternalLink className="h-4 w-4 ml-1" />
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
                  <Button 
                    className="mt-4" 
                    onClick={() => {
                      setSearchQuery('');
                      if (categories.some(cat => !cat.isSubscribed)) {
                        document.querySelector('[value="categories"]')?.dispatchEvent(new Event('click'));
                      }
                    }}
                  >
                    Kategorien verwalten
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderNewsSkeletons().slice(0, 3)}
                </div>
              ) : filteredNews.filter(item => item.isSaved).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews
                    .filter(item => item.isSaved)
                    .map((item) => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        {item.imageUrl && (
                          <div className="w-full h-48 overflow-hidden">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge className={`mb-2 flex items-center gap-1 ${getCategoryColor(item.category)}`}>
                                {categories.find(cat => cat.id === item.category)?.icon}
                                <span className="ml-1">{categories.find(cat => cat.id === item.category)?.name || item.category}</span>
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
                          <Button 
                            asChild 
                            variant="outline" 
                            className="w-full flex justify-between"
                          >
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              <span>Weiterlesen</span>
                              <ExternalLink className="h-4 w-4 ml-1" />
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
                      <div key={category.id} className="flex items-center justify-between space-x-2 border p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Label htmlFor={`category-${category.id}`} className="flex items-center gap-2 cursor-pointer">
                          <div className="bg-homepilot-primary bg-opacity-10 p-2 rounded-full">
                            {category.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-xs text-gray-500">
                              {category.isSubscribed ? 'Abonniert' : 'Nicht abonniert'} • {news.filter(item => item.category === category.id).length} Artikel
                            </span>
                          </div>
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
                      document.querySelector('[value="all"]')?.dispatchEvent(new Event('click'));
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Präferenzen aktualisieren
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nachrichtenübersicht</CardTitle>
                    <CardDescription>Verteilung der Nachrichten nach Kategorien</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.values(categoryStats).map((stat: any) => (
                        <div key={stat.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-full ${stat.isSubscribed ? 'bg-homepilot-primary bg-opacity-10' : 'bg-gray-100 dark:bg-gray-800'}`}>
                              {stat.icon}
                            </div>
                            <span className={stat.isSubscribed ? 'font-medium' : 'text-gray-500'}>{stat.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={stat.isSubscribed ? 'default' : 'outline'}>
                              {stat.count} Artikel
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Gespeicherte Nachrichten</CardTitle>
                    <CardDescription>Ihre Lesezeichen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {news.filter(item => item.isSaved).length > 0 ? (
                      <div className="space-y-3">
                        {news.filter(item => item.isSaved).map(item => (
                          <div key={item.id} className="flex items-center justify-between border-b pb-2">
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">{item.title}</span>
                              <span className="text-xs text-gray-500">{item.source}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => toggleSaveNews(item.id)}
                              className="text-homepilot-primary"
                            >
                              <Bookmark className="h-4 w-4" fill="currentColor" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Bookmark className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-500 text-sm">Keine gespeicherten Nachrichten</p>
                      </div>
                    )}
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

export default News;
