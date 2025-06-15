
import React, { useState, useEffect } from 'react';
import { Newspaper, Bell, Filter, RefreshCw, Bookmark, Search, Calendar, Building, Home, Shield, LightbulbIcon, Zap, Coins, ExternalLink, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
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

const ModernNewsPage: React.FC = () => {
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
    setIsLoading(true);
    setTimeout(() => {
      const mockNews: NewsItem[] = [
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'energy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'property-laws': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'smart-home': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'mortgage': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Stats for quick overview
  const stats = [
    { name: 'Alle Artikel', value: news.length, icon: Newspaper, color: 'bg-blue-500' },
    { name: 'Gespeichert', value: news.filter(item => item.isSaved).length, icon: Bookmark, color: 'bg-green-500' },
    { name: 'Kategorien', value: categories.filter(cat => cat.isSubscribed).length, icon: Filter, color: 'bg-purple-500' },
    { name: 'Heute', value: news.filter(item => new Date(item.date).toDateString() === new Date().toDateString()).length, icon: Calendar, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Nachrichten durchsuchen..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Aktualisieren
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Alle Nachrichten</TabsTrigger>
          <TabsTrigger value="saved">Gespeicherte</TabsTrigger>
          <TabsTrigger value="categories">Kategorien</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-3 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  {item.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          onClick={() => toggleSaveNews(item.id)}
                          className={`h-8 w-8 ${item.isSaved ? "text-homepilot-primary bg-white" : "bg-white/80 hover:bg-white"}`}
                        >
                          <Bookmark className={`h-4 w-4 ${item.isSaved ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`flex items-center gap-1 ${getCategoryColor(item.category)}`}>
                        {categories.find(cat => cat.id === item.category)?.icon}
                        <span className="ml-1">{categories.find(cat => cat.id === item.category)?.name || item.category}</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {item.source} • {new Date(item.date).toLocaleDateString('de-CH')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{item.summary}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full group-hover:bg-homepilot-primary group-hover:text-white transition-colors">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <span>Weiterlesen</span>
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Keine Nachrichten gefunden</h3>
                <p className="text-gray-500 text-center mb-4">
                  {searchQuery ? 'Versuchen Sie eine andere Suchanfrage oder' : 'Bitte'} abonnieren Sie weitere Kategorien.
                </p>
                <Button onClick={() => setSearchQuery('')}>
                  Suche zurücksetzen
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.filter(item => item.isSaved).map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Same card structure as above */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <Badge className={`mb-2 w-fit ${getCategoryColor(item.category)}`}>
                    {categories.find(cat => cat.id === item.category)?.name || item.category}
                  </Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.source} • {new Date(item.date).toLocaleDateString('de-CH')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{item.summary}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Weiterlesen <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-homepilot-primary bg-opacity-10 p-2 rounded-full">
                        {category.icon}
                      </div>
                      <div>
                        <Label className="font-medium">{category.name}</Label>
                        <p className="text-xs text-gray-500">
                          {news.filter(item => item.category === category.id).length} Artikel verfügbar
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={category.isSubscribed}
                      onCheckedChange={() => toggleCategorySubscription(category.id)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.slice(0, 6).map((item, index) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-red-500 text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      #{index + 1}
                    </Badge>
                  </div>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.source}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3">{item.summary}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Weiterlesen <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernNewsPage;
