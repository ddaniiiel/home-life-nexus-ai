
import React, { useState } from 'react';
import { FileText, Upload, Search, Filter, Grid, List, Plus, Download, Share2, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ModernLayout from '../ModernLayout';
import { cn } from '@/lib/utils';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
  category: string;
  thumbnail?: string;
  important?: boolean;
}

const ModernDocumentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents: Document[] = [
    { id: 1, name: 'Mietvertrag.pdf', type: 'PDF', size: '2.4 MB', modified: '2025-04-10', category: 'Wohnen', important: true },
    { id: 2, name: 'Versicherungspolice.pdf', type: 'PDF', size: '1.8 MB', modified: '2025-03-22', category: 'Versicherung' },
    { id: 3, name: 'Stromvertrag.pdf', type: 'PDF', size: '1.2 MB', modified: '2025-02-15', category: 'Verträge' },
    { id: 4, name: 'Gehaltsabrechnung_März.pdf', type: 'PDF', size: '0.8 MB', modified: '2025-04-01', category: 'Finanzen' },
    { id: 5, name: 'Steuererklärung_2024.xlsx', type: 'Excel', size: '3.5 MB', modified: '2025-03-28', category: 'Finanzen' },
    { id: 6, name: 'Familienfoto_Urlaub.jpg', type: 'Bild', size: '5.2 MB', modified: '2025-04-15', category: 'Familie' },
  ];

  const categories = [
    { id: 'all', name: 'Alle Dokumente', count: documents.length },
    { id: 'important', name: 'Wichtig', count: documents.filter(d => d.important).length },
    { id: 'Wohnen', name: 'Wohnen', count: documents.filter(d => d.category === 'Wohnen').length },
    { id: 'Finanzen', name: 'Finanzen', count: documents.filter(d => d.category === 'Finanzen').length },
    { id: 'Versicherung', name: 'Versicherung', count: documents.filter(d => d.category === 'Versicherung').length },
    { id: 'Familie', name: 'Familie', count: documents.filter(d => d.category === 'Familie').length },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'important' && doc.important) ||
                           doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'excel': return '📊';
      case 'bild': return '🖼️';
      default: return '📄';
    }
  };

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">{getFileIcon(doc.type)}</div>
          {doc.important && (
            <Badge variant="destructive" className="text-xs">Wichtig</Badge>
          )}
        </div>
        
        <h3 className="font-semibold text-sm mb-2 truncate">{doc.name}</h3>
        
        <div className="space-y-1 text-xs text-gray-500 mb-3">
          <p>Größe: {doc.size}</p>
          <p>Geändert: {new Date(doc.modified).toLocaleDateString('de-DE')}</p>
          <Badge variant="outline" className="text-xs">{doc.category}</Badge>
        </div>
        
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const DocumentListItem = ({ doc }: { doc: Document }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="text-2xl">{getFileIcon(doc.type)}</div>
        <div>
          <h3 className="font-semibold text-sm">{doc.name}</h3>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{doc.size}</span>
            <span>{new Date(doc.modified).toLocaleDateString('de-DE')}</span>
            <Badge variant="outline" className="text-xs">{doc.category}</Badge>
            {doc.important && <Badge variant="destructive" className="text-xs">Wichtig</Badge>}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Download className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <ModernLayout 
      title="Dokumente" 
      subtitle="Verwalten Sie Ihre Familiendokumente zentral und sicher"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-homepilot-primary" />
                <div>
                  <p className="text-2xl font-bold">{documents.length}</p>
                  <p className="text-sm text-gray-600">Dokumente</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Upload className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">24.8 MB</p>
                  <p className="text-sm text-gray-600">Speicher belegt</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-bold">!</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{documents.filter(d => d.important).length}</p>
                  <p className="text-sm text-gray-600">Wichtige Dokumente</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-gray-600">Diese Woche</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Dokumente suchen..."
                    className="pl-10 w-80"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex border border-gray-300 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-homepilot-primary hover:bg-homepilot-secondary">
                      <Upload className="w-4 h-4 mr-2" />
                      Hochladen
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dokumente hochladen</DialogTitle>
                    </DialogHeader>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Dateien hier ablegen</p>
                      <p className="text-sm text-gray-600 mb-4">oder klicken Sie zum Durchsuchen</p>
                      <Button>Dateien auswählen</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {selectedCategory === 'all' ? 'Alle Dokumente' : 
                 categories.find(c => c.id === selectedCategory)?.name} 
                ({filteredDocuments.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDocuments.map(doc => (
                  <DocumentCard key={doc.id} doc={doc} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredDocuments.map(doc => (
                  <DocumentListItem key={doc.id} doc={doc} />
                ))}
              </div>
            )}
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600 mb-2">Keine Dokumente gefunden</p>
                <p className="text-gray-500">Versuchen Sie eine andere Suche oder laden Sie neue Dokumente hoch.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ModernLayout>
  );
};

export default ModernDocumentsPage;
