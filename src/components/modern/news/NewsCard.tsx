
import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface NewsCardProps {
  item: NewsItem;
  categories: CategorySubscription[];
  onToggleSave: (id: number) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, categories, onToggleSave }) => {
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
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
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
              onClick={() => onToggleSave(item.id)}
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
  );
};

export default NewsCard;
