
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NewsEmptyStateProps {
  searchQuery: string;
  onResetSearch: () => void;
}

const NewsEmptyState: React.FC<NewsEmptyStateProps> = ({ searchQuery, onResetSearch }) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Keine Nachrichten gefunden</h3>
        <p className="text-gray-500 text-center mb-4">
          {searchQuery ? 'Versuchen Sie eine andere Suchanfrage oder' : 'Bitte'} abonnieren Sie weitere Kategorien.
        </p>
        <Button onClick={onResetSearch}>
          Suche zurücksetzen
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsEmptyState;
