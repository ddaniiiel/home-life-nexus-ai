
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface CategorySubscription {
  id: string;
  name: string;
  isSubscribed: boolean;
  icon: React.ReactNode;
}

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

interface NewsCategoryManagerProps {
  categories: CategorySubscription[];
  news: NewsItem[];
  onToggleSubscription: (id: string) => void;
}

const NewsCategoryManager: React.FC<NewsCategoryManagerProps> = ({ 
  categories, 
  news, 
  onToggleSubscription 
}) => {
  return (
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
                onCheckedChange={() => onToggleSubscription(category.id)}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NewsCategoryManager;
