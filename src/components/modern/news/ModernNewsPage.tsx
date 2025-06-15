import React, { useState, useEffect } from 'react';
import { Building, Home, Shield, LightbulbIcon, Zap, Coins, Calendar, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import NewsStats from './NewsStats';
import NewsSearch from './NewsSearch';
import NewsCard from './NewsCard';
import NewsCategoryManager from './NewsCategoryManager';
import NewsEmptyState from './NewsEmptyState';

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

  return (
    <div className="space-y-6">
      <NewsStats news={news} categories={categories} />
      <NewsSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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
                <NewsCard 
                  key={item.id} 
                  item={item} 
                  categories={categories} 
                  onToggleSave={toggleSaveNews} 
                />
              ))}
            </div>
          ) : (
            <NewsEmptyState 
              searchQuery={searchQuery} 
              onResetSearch={() => setSearchQuery('')} 
            />
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.filter(item => item.isSaved).map((item) => (
              <NewsCard 
                key={item.id} 
                item={item} 
                categories={categories} 
                onToggleSave={toggleSaveNews} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <NewsCategoryManager 
            categories={categories} 
            news={news} 
            onToggleSubscription={toggleCategorySubscription} 
          />
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
