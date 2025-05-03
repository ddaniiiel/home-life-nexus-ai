
import React from 'react';
import Widget from './Widget';
import { Bell, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { EnhancedLazyImage } from './ui/enhanced-lazy-image';
import { Badge } from '@/components/ui/badge'; 
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  source: string;
  category: 'family' | 'finance' | 'home' | 'emergency' | 'important';
  imageUrl?: string;
  link?: string;
}

const NewsWidget = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [newsItems, setNewsItems] = React.useState<NewsItem[]>([
    { 
      id: 1, 
      title: 'Wartung der Heizungsanlage am 10.05', 
      date: '2025-04-30', 
      source: 'Hausverwaltung', 
      category: 'home',
      imageUrl: 'https://images.unsplash.com/photo-1474432978580-913b8ba7f4ef?q=80&w=300'
    },
    { 
      id: 2, 
      title: 'Neue Steuervorteile für Familien', 
      date: '2025-04-28', 
      source: 'Finanzamt', 
      category: 'finance',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300'
    },
    { 
      id: 3, 
      title: 'Schulausflug von Emma am 15.05', 
      date: '2025-04-25', 
      source: 'Schule', 
      category: 'family',
      imageUrl: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=300'
    }
  ]);
  
  const categoryStyles = {
    family: {
      color: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
      badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    },
    finance: {
      color: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300",
      badge: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    },
    home: {
      color: "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
      badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
    },
    emergency: {
      color: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300",
      badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    },
    important: {
      color: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
    }
  };
  
  // Formatiert das Datum in ein lesbares Format (Tag.Monat.Jahr)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Widget 
      title="Wichtige Mitteilungen" 
      icon={<Bell className="h-5 w-5" />}
      description="Aktuelle Informationen für die Familie"
      variant="accent"
      isLoading={isLoading}
      footer={
        <div className="flex justify-between items-center w-full">
          <span className="text-xs text-gray-500">Letzte Aktualisierung: {formatDate(new Date().toISOString())}</span>
          <Button size="sm" variant="ghost" asChild className="text-homepilot-primary text-xs">
            <Link to="/news" className="flex items-center">
              Alle anzeigen <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {newsItems.map((item) => (
          <Card key={item.id} className={cn(
            "p-3 transition-shadow hover:shadow-md border-l-4",
            item.category === 'emergency' ? "border-l-red-500" : 
            item.category === 'important' ? "border-l-amber-500" : 
            item.category === 'finance' ? "border-l-green-500" : 
            item.category === 'family' ? "border-l-blue-500" : 
            "border-l-purple-500"
          )}>
            <div className="flex gap-3">
              {item.imageUrl && (
                <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded">
                  <EnhancedLazyImage
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    aspectRatio="1/1"
                  />
                </div>
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium mb-1 mr-2">{item.title}</h3>
                  <Badge className={cn(
                    "text-[0.65rem]",
                    categoryStyles[item.category].badge
                  )}>
                    {item.category === 'family' ? 'Familie' : 
                     item.category === 'finance' ? 'Finanzen' : 
                     item.category === 'home' ? 'Haushalt' : 
                     item.category === 'emergency' ? 'Notfall' : 'Wichtig'}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-gray-500 space-x-2">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(item.date)}
                  </span>
                  <span className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {item.source}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Widget>
  );
};

export default NewsWidget;
