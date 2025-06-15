
import React from 'react';
import { Newspaper, Bookmark, Filter, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

interface NewsStatsProps {
  news: NewsItem[];
  categories: CategorySubscription[];
}

const NewsStats: React.FC<NewsStatsProps> = ({ news, categories }) => {
  const stats = [
    { name: 'Alle Artikel', value: news.length, icon: Newspaper, color: 'bg-blue-500' },
    { name: 'Gespeichert', value: news.filter(item => item.isSaved).length, icon: Bookmark, color: 'bg-green-500' },
    { name: 'Kategorien', value: categories.filter(cat => cat.isSubscribed).length, icon: Filter, color: 'bg-purple-500' },
    { name: 'Heute', value: news.filter(item => new Date(item.date).toDateString() === new Date().toDateString()).length, icon: Calendar, color: 'bg-orange-500' },
  ];

  return (
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
  );
};

export default NewsStats;
