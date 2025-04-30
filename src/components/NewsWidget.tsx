
import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Widget from './Widget';

const NewsWidget = () => {
  // Aktuelle Nachrichten mit echten Links
  const currentNews = [
    {
      id: 1,
      title: 'Klimawandel: Neue Studie zu erneuerbaren Energien',
      source: 'Bundesamt für Energie',
      date: '30.04.2025',
      category: 'Energiepreise',
      url: 'https://www.admin.ch/gov/de/start/dokumentation/medienmitteilungen.msg-id-96849.html'
    },
    {
      id: 2,
      title: 'Zinssenkung bei Hypotheken: Was Hausbesitzer wissen müssen',
      source: 'SRF',
      date: '28.04.2025',
      category: 'Hypotheken',
      url: 'https://www.srf.ch/news/wirtschaft/finanzierung-eigenheim-hypotheken-nicht-vorzeitig-abloesen-trotz-negativzins'
    },
    {
      id: 3,
      title: 'Smart Home: Matter 2.0 Standard verabschiedet',
      source: 'Connect',
      date: '25.04.2025',
      category: 'Smart Home',
      url: 'https://www.connect.de/ratgeber/matter-smart-home-standard-geraete-kompatibilitaet-steuerung-3201220.html'
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Energiepreise': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Hypotheken': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Smart Home': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Eigentumsrecht': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Widget title="Aktuelle News" icon={<Newspaper className="h-5 w-5" />}>
      <div className="space-y-4">
        {currentNews.map((news) => (
          <div key={news.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <Badge className={`${getCategoryColor(news.category)} font-medium`}>
                {news.category}
              </Badge>
              <span className="text-xs text-gray-500">{news.date}</span>
            </div>
            <h3 className="font-medium text-sm mb-1">{news.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{news.source}</p>
            <Button 
              asChild 
              variant="outline" 
              size="sm" 
              className="w-full flex justify-between items-center text-homepilot-primary"
            >
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                <span>Weiterlesen</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        ))}
        <a 
          href="/news" 
          className="text-xs text-homepilot-primary hover:underline mt-4 flex items-center justify-center py-2 border-t pt-3 font-medium"
        >
          Alle News anzeigen →
        </a>
      </div>
    </Widget>
  );
};

export default NewsWidget;
