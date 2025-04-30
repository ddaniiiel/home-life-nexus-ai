
import React from 'react';
import { FileText, Download, Share2, Trash2, Star, Calendar, Tag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";

interface DocumentPreviewProps {
  document: {
    id: number;
    name: string;
    type?: string;
    category?: string;
    date?: string;
    size?: string;
    preview?: string;
    important?: boolean;
  };
  onClose?: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onClose }) => {
  const getFileIcon = () => {
    const extension = document.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="h-12 w-12 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-12 w-12 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileText className="h-12 w-12 text-green-500" />;
      case 'jpg':
      case 'png':
      case 'jpeg':
        return <FileText className="h-12 w-12 text-purple-500" />;
      default:
        return <FileText className="h-12 w-12 text-gray-500" />;
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {getFileIcon()}
            <div className="ml-4">
              <CardTitle className="text-xl">{document.name}</CardTitle>
              <div className="flex items-center space-x-4 mt-1">
                {document.category && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{document.category}</span>
                  </div>
                )}
                {document.date && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(document.date).toLocaleDateString('de-CH')}</span>
                  </div>
                )}
                {document.size && (
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{document.size}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {document.important && (
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Wichtig</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="h-[400px] border rounded-md bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center">
          {document.preview ? (
            <img 
              src={document.preview} 
              alt={document.name} 
              className="max-h-full object-contain" 
            />
          ) : (
            <div className="text-center p-6">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Vorschau nicht verfügbar</p>
              <Button variant="outline" className="mt-4">
                <Download className="h-4 w-4 mr-2" />
                Dokument herunterladen
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-1">Dokumenteninformationen</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Dateiname:</span>
              <span>{document.name}</span>
            </div>
            {document.type && (
              <div className="flex justify-between">
                <span className="text-gray-500">Dateityp:</span>
                <span>{document.type}</span>
              </div>
            )}
            {document.category && (
              <div className="flex justify-between">
                <span className="text-gray-500">Kategorie:</span>
                <span>{document.category}</span>
              </div>
            )}
            {document.date && (
              <div className="flex justify-between">
                <span className="text-gray-500">Hinzugefügt:</span>
                <span>{new Date(document.date).toLocaleDateString('de-CH')}</span>
              </div>
            )}
            {document.size && (
              <div className="flex justify-between">
                <span className="text-gray-500">Größe:</span>
                <span>{document.size}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 border-t">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Herunterladen
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Teilen
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50">
            <Star className="h-4 w-4 mr-2" />
            Als wichtig markieren
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" />
            Löschen
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentPreview;
