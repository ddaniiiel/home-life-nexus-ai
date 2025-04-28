
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Newspaper, Bell, Filter, RefreshCw, Bookmark, Search, Calendar, Building, Home, Shield, LightbulbIcon, Zap, Coins, PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

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
    // Simulieren eines API-Aufrufs
    setIsLoading(true);
    setTimeout(() => {
      const mockNews: NewsItem[] = [
        // Energiepreise & Nachhaltigkeit (energy)
        {
          id: 1,
          title: 'Neue Energiepreise für 2026 bekannt gegeben',
          summary: 'Das Bundesamt für Energie hat die neuen Tarife für das kommende Jahr veröffentlicht. Hausbesitzer in der Schweiz können mit durchschnittlich 5% niedrigeren Stromkosten rechnen.',
          source: 'Bundesamt für Energie',
          date: '2025-04-22',
          category: 'energy',
          imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 2,
          title: 'Solarförderung wird ausgebaut',
          summary: 'Der Bundesrat beschliesst neue Fördermassnahmen für Solaranlagen. Ab 2026 können Hausbesitzer von höheren Subventionen profitieren.',
          source: 'Bundesamt für Energie',
          date: '2025-04-20',
          category: 'energy',
          imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 3,
          title: 'Wärmepumpen: Neue Richtlinien für Effizienz',
          summary: 'Die Schweizerische Energiekommission veröffentlicht neue Effizienz-Richtlinien für Wärmepumpen. Diese sollen den Energieverbrauch weiter senken.',
          source: 'Schweizer Energiekommission',
          date: '2025-04-18',
          category: 'energy',
          imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 4,
          title: 'CO2-Abgabe: Änderungen für Hausbesitzer',
          summary: 'Ab Januar 2026 wird die CO2-Abgabe neu strukturiert. Hausbesitzer mit energieeffizienten Häusern können mit Rückvergütungen rechnen.',
          source: 'Bundesamt für Umwelt',
          date: '2025-04-15',
          category: 'energy',
          imageUrl: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: true,
        },
        
        // Eigentumsgesetze (property-laws)
        {
          id: 5,
          title: 'Änderung im Eigentumsrecht für Mehrfamilienhäuser',
          summary: 'Der Bundesrat plant eine Reform des Stockwerkeigentums. Die neuen Regelungen sollen Renovierungsprojekte erleichtern.',
          source: 'Schweizerischer Bundesrat',
          date: '2025-04-15',
          category: 'property-laws',
          imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: true,
        },
        {
          id: 6,
          title: 'Neue Regelungen für Vermietung',
          summary: 'Ab 2026 gelten neue Vorschriften für die Vermietung von Wohnraum. Besonders betroffen sind energetische Aspekte.',
          source: 'Schweizerischer Bundesrat',
          date: '2025-04-14',
          category: 'property-laws',
          imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 7,
          title: 'Nachbarschaftsrecht: Neue Abstände bei Bepflanzungen',
          summary: 'Die kantonalen Baugesetze wurden überarbeitet. Neue Regelungen zu Grenzabständen bei Bepflanzungen treten im Sommer in Kraft.',
          source: 'Kantonale Baudirektion',
          date: '2025-04-10',
          category: 'property-laws',
          imageUrl: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        
        // Steuern & Abgaben (taxes)
        {
          id: 8,
          title: 'Steuervergünstigungen für energetische Sanierungen verlängert',
          summary: 'Das Parlament hat beschlossen, die Steuervergünstigungen für energetische Gebäudesanierungen um weitere fünf Jahre zu verlängern.',
          source: 'Eidgenössische Steuerverwaltung',
          date: '2025-04-10',
          category: 'taxes',
          imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 9,
          title: 'Neue Abzugsmöglichkeiten für Homeoffice',
          summary: 'Die Steuerverwaltung hat neue Richtlinien für Homeoffice-Abzüge veröffentlicht. Hausbesitzer profitieren von erweiterten Möglichkeiten.',
          source: 'Eidgenössische Steuerverwaltung',
          date: '2025-04-08',
          category: 'taxes',
          imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 10,
          title: 'Grundstückgewinnsteuer: Kantonale Unterschiede',
          summary: 'Eine neue Studie zeigt die erheblichen Unterschiede bei der Grundstückgewinnsteuer zwischen den Kantonen. Zürich und Genf führen die Liste an.',
          source: 'Schweizer Steuerkonferenz',
          date: '2025-04-05',
          category: 'taxes',
          imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        
        // Smart Home (smart-home)
        {
          id: 11,
          title: 'Neue Smart Home Standards für die Schweiz',
          summary: 'Der Verband Schweizerischer Elektrizitätsunternehmen (VSE) hat neue Standards für Smart Home Geräte definiert.',
          source: 'VSE',
          date: '2025-04-05',
          category: 'smart-home',
          imageUrl: 'https://images.unsplash.com/photo-1558002038-bb0237f4fa0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 12,
          title: 'Loxone und 1home kündigen neue Integration an',
          summary: 'Die Smart Home Anbieter Loxone und 1home haben eine umfassende Integration ihrer Systeme angekündigt.',
          source: 'Loxone AG',
          date: '2025-03-25',
          category: 'smart-home',
          imageUrl: 'https://images.unsplash.com/photo-1585399073500-e11f8f3c4728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 13,
          title: 'Matter 2.0: Neuer Standard für Smart Home',
          summary: 'Die Connectivity Standards Alliance hat Matter 2.0 veröffentlicht. Der neue Standard soll die Kompatibilität zwischen Smart-Home-Geräten verbessern.',
          source: 'Connectivity Standards Alliance',
          date: '2025-03-20',
          category: 'smart-home',
          imageUrl: 'https://images.unsplash.com/photo-1601751773363-3e5c08064c37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: true,
        },
        
        // Hypotheken & Zinsen (mortgage)
        {
          id: 14,
          title: 'Hypothekarzinsen sinken auf neuen Tiefstand',
          summary: 'Die Schweizerische Nationalbank verzeichnet einen weiteren Rückgang der Hypothekarzinsen.',
          source: 'Schweizerische Nationalbank',
          date: '2025-03-28',
          category: 'mortgage',
          imageUrl: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: true,
        },
        {
          id: 15,
          title: 'Neue Finanzierungsmodelle für Eigenheime',
          summary: 'Schweizer Banken führen flexible Hypothekenmodelle ein, die speziell auf junge Familien zugeschnitten sind.',
          source: 'Schweizerische Bankiervereinigung',
          date: '2025-03-26',
          category: 'mortgage',
          imageUrl: 'https://images.unsplash.com/photo-1638183395699-9e3b5af6aabd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 16,
          title: 'Festhypotheken: Lohnt sich längerfristige Bindung?',
          summary: 'Experten analysieren die Vor- und Nachteile von langfristigen Festhypotheken angesichts der aktuellen Zinsentwicklung.',
          source: 'UBS',
          date: '2025-03-22',
          category: 'mortgage',
          imageUrl: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        
        // Versicherungen (insurance)
        {
          id: 17,
          title: 'Gebäudeversicherung: Neue Prämienmodelle',
          summary: 'Die kantonalen Gebäudeversicherungen passen ihre Prämienmodelle an. Häuser mit modernen Sicherheitssystemen werden günstiger versichert.',
          source: 'Vereinigung Kantonaler Gebäudeversicherungen',
          date: '2025-03-15',
          category: 'insurance',
          imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 18,
          title: 'Elementarschäden: Versicherungsschutz wird ausgeweitet',
          summary: 'Die Versicherungsbranche reagiert auf zunehmende Extremwetterereignisse und erweitert den Schutz bei Elementarschäden.',
          source: 'Schweizerischer Versicherungsverband',
          date: '2025-03-10',
          category: 'insurance',
          imageUrl: 'https://images.unsplash.com/photo-1620569189294-01a8ebc77546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 19,
          title: 'Cyberversicherung für Smart Homes',
          summary: 'Neue Versicherungsprodukte gegen Cyberangriffe auf Smart-Home-Systeme kommen auf den Markt.',
          source: 'Zurich Versicherung',
          date: '2025-03-05',
          category: 'insurance',
          imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: true,
        },
        
        // Renovierung & Unterhalt (renovation)
        {
          id: 20,
          title: 'Neuer Baustandard für nachhaltiges Renovieren',
          summary: 'Der Schweizer Ingenieur- und Architektenverein (SIA) hat einen neuen Standard für nachhaltige Renovierungen veröffentlicht.',
          source: 'SIA',
          date: '2025-02-28',
          category: 'renovation',
          imageUrl: 'https://images.unsplash.com/photo-1621570361046-63003f1610e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 21,
          title: 'Innovative Materialien für Fassadensanierung',
          summary: 'Ein Schweizer Startup entwickelt neue Materialien für Fassadensanierungen, die weniger Ressourcen verbrauchen und bessere Dämmeigenschaften aufweisen.',
          source: 'ETH Zürich',
          date: '2025-02-25',
          category: 'renovation',
          imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 22,
          title: 'Denkmalpflege: Moderne Technik in historischen Gebäuden',
          summary: 'Ein neuer Leitfaden zeigt, wie moderne Haustechnik in denkmalgeschützten Gebäuden integriert werden kann.',
          source: 'Bundesamt für Kultur',
          date: '2025-02-20',
          category: 'renovation',
          imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        
        // Lokale Nachrichten (local)
        {
          id: 23,
          title: 'Zürich: Neues Quartierkonzept für Wohnqualität',
          summary: 'Die Stadt Zürich stellt ein neues Konzept für lebendige und nachhaltige Quartiergestaltung vor.',
          source: 'Stadt Zürich',
          date: '2025-02-15',
          category: 'local',
          imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 24,
          title: 'Bern: Förderung urbaner Gärten',
          summary: 'Die Stadt Bern fördert urbane Gärten in Wohnsiedlungen mit einem neuen Programm und finanzieller Unterstützung.',
          source: 'Stadt Bern',
          date: '2025-02-12',
          category: 'local',
          imageUrl: 'https://images.unsplash.com/photo-1518064830064-384a717ae22d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: false,
        },
        {
          id: 25,
          title: 'Basel: Neues Fahrradweg-Netz verbindet Wohngebiete',
          summary: 'In Basel entsteht ein neues Netz an Fahrradwegen, das Wohngebiete besser mit dem Stadtzentrum verbindet.',
          source: 'Kanton Basel-Stadt',
          date: '2025-02-08',
          category: 'local',
          imageUrl: 'https://images.unsplash.com/photo-1541789094913-f3809a8f3ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          url: '#',
          isSaved: true,
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
                            <Badge variant="outline" className="mb-2 flex items-center gap-1">
                              {categories.find(cat => cat.id === item.category)?.icon}
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
                              <Badge variant="outline" className="mb-2 flex items-center gap-1">
                                {categories.find(cat => cat.id === item.category)?.icon}
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

