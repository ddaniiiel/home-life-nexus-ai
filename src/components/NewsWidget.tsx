
import React from 'react';
import { Newspaper, Clock, ArrowRight, ExternalLink, Tag } from 'lucide-react';
import Widget from './Widget';
import { Badge } from '@/components/ui/badge';

interface NewsItem {
  id: number;
  title: string;
  snippet: string;
  source: string;
  time: string; // e.g. "vor 2 Stunden"
  category: string;
  image?: string;
}

const NewsWidget = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Neue Smart Home-Geräte von Samsung vorgestellt',
      snippet: 'Samsung hat heute eine neue Generation von Smart Home-Geräten vorgestellt, die...',
      source: 'TechWelt',
      time: 'vor 2 Stunden',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1588453251771-cd919b362ed4?auto=format&fit=crop&w=360&h=200&q=80'
    },
    {
      id: 2,
      title: 'Studie: So sparen Smart Homes bis zu 30% Energie',
      snippet: 'Eine aktuelle Studie zeigt, dass vernetzte Haushalte durchschnittlich 30% weniger Energie verbrauchen...',
      source: 'Energiemagazin',
      time: 'vor 5 Stunden',
      category: 'Nachhaltigkeit',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=360&h=200&q=80'
    },
    {
      id: 3,
      title: 'DIY: So einfach richtest du deinen Hausnotfallplan ein',
      snippet: 'Ein gut vorbereiteter Notfallplan kann im Ernstfall Leben retten. Hier erfährst du, wie du...',
      source: 'Familienblog',
      time: 'vor 1 Tag',
      category: 'Sicherheit',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=360&h=200&q=80'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Nachhaltigkeit':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Sicherheit':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Widget title="News & Updates" icon={<Newspaper className="h-5 w-5" />}>
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="relative">
            {item.image && (
              <div className="mb-3 relative rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <div className="flex items-center justify-between">
                    <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="text-white border-white/50 text-xs">
                      {item.source}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            <h3 className="font-medium text-sm">{item.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{item.snippet}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>{item.time}</span>
              </div>
              <a 
                href="#" 
                className="text-xs text-homepilot-primary hover:underline flex items-center"
              >
                Weiterlesen <ExternalLink className="h-3 w-3 ml-0.5" />
              </a>
            </div>
            <div className="absolute -inset-2 rounded-lg hover:bg-homepilot-primary/5 opacity-0 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
        ))}
        <a 
          href="#" 
          className="text-xs text-homepilot-primary hover:underline mt-2 block"
        >
          Alle Neuigkeiten anzeigen <ArrowRight className="inline-block h-3 w-3 ml-0.5" />
        </a>
      </div>
    </Widget>
  );
};

export default NewsWidget;
