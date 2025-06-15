
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Share2, Clock } from 'lucide-react';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'smart-home' | 'task' | 'finance' | 'family';
  details?: string;
  reactions?: number;
}

const FamilyActivityFeed: React.FC = () => {
  const activities: Activity[] = [
    {
      id: '1',
      user: { name: 'Thomas', avatar: '', initials: 'TS' },
      action: 'hat die Heizung auf',
      target: '22°C gestellt',
      timestamp: 'vor 5 Min',
      type: 'smart-home',
      details: 'Wohnzimmer',
    },
    {
      id: '2',
      user: { name: 'Anna', avatar: '', initials: 'AS' },
      action: 'hat Aufgabe erledigt:',
      target: 'Wäsche aufhängen',
      timestamp: 'vor 15 Min',
      type: 'task',
      reactions: 2,
    },
    {
      id: '3',
      user: { name: 'Max', avatar: '', initials: 'MK' },
      action: 'ist nach Hause gekommen',
      target: '',
      timestamp: 'vor 30 Min',
      type: 'family',
      details: 'Schule',
    },
    {
      id: '4',
      user: { name: 'Lisa', avatar: '', initials: 'LM' },
      action: 'hat eingekauft für',
      target: '€47.50',
      timestamp: 'vor 1 Std',
      type: 'finance',
      details: 'Supermarkt',
    },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'smart-home': return 'bg-blue-100 text-blue-800';
      case 'task': return 'bg-green-100 text-green-800';
      case 'finance': return 'bg-yellow-100 text-yellow-800';
      case 'family': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'smart-home': return '🏠';
      case 'task': return '✅';
      case 'finance': return '💰';
      case 'family': return '👨‍👩‍👧‍👦';
      default: return '📝';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Familienaktivitäten</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Live-Updates von der Familie
            </p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {activity.user.name}
                </span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getActivityColor(activity.type)}`}
                >
                  {getActivityIcon(activity.type)}
                </Badge>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.timestamp}
                </div>
              </div>
              
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {activity.action} <span className="font-medium">{activity.target}</span>
                {activity.details && (
                  <span className="text-gray-500"> • {activity.details}</span>
                )}
              </p>
              
              {activity.reactions && (
                <div className="flex items-center space-x-2 mt-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    {activity.reactions}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <div className="text-center pt-4">
          <Button variant="ghost" size="sm" className="text-homepilot-primary">
            Alle Aktivitäten anzeigen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyActivityFeed;
