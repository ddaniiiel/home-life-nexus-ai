
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileCheck, Upload, Folder, PlusCircle, Search, Tag, Filter, Trash2, Download, Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import DocumentPreview from './DocumentPreview';

interface Document {
  id: number;
  name: string;
  date: string;
  important?: boolean;
}

const DocumentCategorization = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Familie', icon: '👨‍👩‍👧‍👦', color: 'bg-homepilot-accent', count: 8 },
    { id: 2, name: 'Versicherungen', icon: '🔒', color: 'bg-green-100', count: 12 },
    { id: 3, name: 'Auto', icon: '🚗', color: 'bg-purple-100', count: 5 },
    { id: 4, name: 'Haus & Hypothek', icon: '🏠', color: 'bg-yellow-100', count: 9 },
    { id: 5, name: 'Schule & Bildung', icon: '🎓', color: 'bg-red-100', count: 7 },
    { id: 6, name: 'Gesundheit', icon: '🏥', color: 'bg-pink-100', count: 6 },
    { id: 7, name: 'Reisen', icon: '✈️', color: 'bg-indigo-100', count: 3 },
    { id: 8, name: 'Finanzen', icon: '💰', color: 'bg-teal-100', count: 10 },
  ]);
  
  const [newCategory, setNewCategory] = useState({ name: '', icon: '📁' });
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState("categories");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewDocument, setViewDocument] = useState<Document | null>(null);
  
  // Beispieldokumente nach Kategorie
  const documentsByCategory: Record<string, Document[]> = {
    'Familie': [
      { id: 1, name: 'Geburtsurkunde_Emma.pdf', date: '2023-05-12' },
      { id: 2, name: 'Familienpass_2025.pdf', date: '2025-01-15' },
      { id: 3, name: 'Ehevertrag.pdf', date: '2021-06-10', important: true },
    ],
    'Versicherungen': [
      { id: 4, name: 'Hausratversicherung_2025.pdf', date: '2025-01-01', important: true },
      { id: 5, name: 'Haftpflichtversicherung.pdf', date: '2024-08-15' },
      { id: 6, name: 'Autoversicherung_BMW.pdf', date: '2024-11-22' },
    ],
    'Auto': [
      { id: 7, name: 'Fahrzeugschein_BMW.pdf', date: '2022-03-17', important: true },
      { id: 8, name: 'Servicevertrag_BMW.pdf', date: '2024-09-05' },
    ],
    'Haus & Hypothek': [
      { id: 9, name: 'Hypothekvertrag_2025.pdf', date: '2025-01-01', important: true },
      { id: 10, name: 'Grundriss_Erdgeschoss.pdf', date: '2022-05-10' },
      { id: 11, name: 'Renovierungsplan_2025.xlsx', date: '2025-02-15' },
    ],
    'Schule & Bildung': [
      { id: 12, name: 'Schulanmeldung_Emma_2025.pdf', date: '2025-08-01', important: true },
      { id: 13, name: 'Stundenplan_Jonas_2025.pdf', date: '2025-09-01' },
    ],
    'Gesundheit': [
      { id: 14, name: 'Impfpass_Emma.pdf', date: '2023-08-12', important: true },
      { id: 15, name: 'Zahnarztrechnungen_2024.pdf', date: '2024-12-15' },
    ],
    'Reisen': [
      { id: 16, name: 'Reiseversicherung_Italien_2025.pdf', date: '2025-06-01' },
    ],
    'Finanzen': [
      { id: 17, name: 'Steuererklärung_2024.pdf', date: '2025-03-31', important: true },
      { id: 18, name: 'Aktienportfolio_2025.pdf', date: '2025-01-15' },
      { id: 19, name: 'Vermögensübersicht_Q1_2025.xlsx', date: '2025-04-01' },
    ],
  };
  
  // Filtere wichtige Dokumente
  const importantDocuments = Object.values(documentsByCategory)
    .flat()
    .filter(doc => doc.important === true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Aktuelle Dokumente (sortiert nach Datum)
  const recentDocuments = Object.values(documentsByCategory)
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  
  const handleDragLeave = () => {
    setDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // In a real app, process the files here
      toast({
        title: "Dateien hochgeladen",
        description: `${e.dataTransfer.files.length} Dateien wurden erfolgreich hochgeladen.`,
      });
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, process the files here
      toast({
        title: "Dateien hochgeladen",
        description: `${e.target.files.length} Dateien wurden erfolgreich hochgeladen.`,
      });
    }
  };
  
  const addNewCategory = () => {
    if (newCategory.name.trim() === '') {
      toast({
        title: "Fehler",
        description: "Bitte gib einen Namen für die Kategorie ein.",
        variant: "destructive"
      });
      return;
    }
    
    const colors = ['bg-homepilot-accent', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-red-100', 'bg-pink-100'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setCategories([
      ...categories,
      {
        id: categories.length + 1,
        name: newCategory.name,
        icon: newCategory.icon,
        color: randomColor,
        count: 0
      }
    ]);
    
    setNewCategory({ name: '', icon: '📁' });
    
    toast({
      title: "Kategorie erstellt",
      description: `Die Kategorie "${newCategory.name}" wurde erfolgreich erstellt.`,
    });
  };
  
  const deleteDocument = (docId: number) => {
    // In a real app, this would delete the document from the database
    toast({
      title: "Dokument gelöscht",
      description: "Das Dokument wurde erfolgreich gelöscht.",
    });
  };
  
  const icons = ['📁', '📄', '📝', '🔒', '⚡', '💰', '🏠', '🚗', '💼', '🏥', '📱', '💻', '👨‍👩‍👧‍👦', '🎓', '✈️', '🏦', '🏫', '📊'];
  
  return (
    <Card className="border-homepilot-primary/20">
      <CardHeader className="bg-gradient-to-r from-homepilot-accent/30 to-transparent">
        <CardTitle className="text-homepilot-secondary">Dokumentenverwaltung</CardTitle>
        <CardDescription>
          Organisiere wichtige Familiendokumente in Kategorien für schnellen Zugriff
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="categories" className="flex items-center gap-1">
                <Folder className="h-4 w-4" />
                <span>Kategorien</span>
              </TabsTrigger>
              <TabsTrigger value="important" className="flex items-center gap-1">
                <FileCheck className="h-4 w-4" />
                <span>Wichtige Dokumente</span>
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>Neueste Dokumente</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Dokumente suchen..." 
                className="pl-8 w-[200px] h-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="categories">
            {selectedCategory ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedCategory(null)}
                    className="flex items-center gap-2"
                  >
                    <Folder className="h-4 w-4" />
                    Zurück zu allen Kategorien
                  </Button>
                  <h3 className="text-lg font-semibold">Kategorie: {selectedCategory}</h3>
                </div>
                
                <div className="space-y-3">
                  {documentsByCategory[selectedCategory]?.map(doc => (
                    <div key={doc.id} className="p-3 rounded-lg border border-homepilot-accent/20 hover:border-homepilot-primary/30 flex justify-between items-center hover:bg-homepilot-accent/5 transition-all">
                      <div className="flex items-center">
                        <div className="bg-homepilot-primary/10 dark:bg-homepilot-primary/20 p-2 rounded-full mr-3">
                          <FileCheck className="h-4 w-4 text-homepilot-primary dark:text-homepilot-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            Datum: {new Date(doc.date).toLocaleDateString('de-CH')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-homepilot-secondary hover:text-homepilot-primary hover:bg-homepilot-accent/10"
                          onClick={() => setViewDocument(doc)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-homepilot-secondary hover:text-homepilot-primary hover:bg-homepilot-accent/10"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Dokumenten-Upload-Sektion */}
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-colors mt-4",
                    dragOver ? "bg-homepilot-primary/5 border-homepilot-primary" : "border-gray-300 dark:border-gray-700"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-8 w-8 text-homepilot-primary mx-auto mb-3" />
                  <h3 className="text-md font-medium mb-2">Dokumente zu {selectedCategory} hinzufügen</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Ziehe Dateien hierher oder klicke auf "Durchsuchen"
                  </p>
                  <div className="flex justify-center">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="bg-homepilot-primary text-white px-4 py-2 rounded text-sm hover:bg-homepilot-secondary transition-colors">
                        Durchsuchen
                      </div>
                      <input 
                        id="file-upload" 
                        type="file" 
                        multiple 
                        className="hidden" 
                        onChange={handleFileInputChange} 
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map(category => (
                    <div 
                      key={category.id} 
                      className={cn(
                        "p-4 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-homepilot-primary/20",
                        category.color
                      )}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <span className="text-3xl mb-2">{category.icon}</span>
                      <span className="font-medium text-sm mb-1">{category.name}</span>
                      <Badge variant="secondary" className="text-xs bg-homepilot-primary/10 text-homepilot-secondary">{category.count} Dokumente</Badge>
                    </div>
                  ))}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="p-4 rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer hover:bg-homepilot-accent/10 dark:hover:bg-gray-800 transition-colors">
                        <PlusCircle className="h-8 w-8 text-homepilot-primary mb-2" />
                        <span className="font-medium text-sm text-gray-500">Neue Kategorie</span>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800">
                      <DialogHeader>
                        <DialogTitle>Neue Kategorie erstellen</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="category-name">Name</Label>
                          <Input 
                            id="category-name" 
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                            placeholder="Name der Kategorie" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Icon auswählen</Label>
                          <div className="grid grid-cols-6 gap-2">
                            {icons.map((icon) => (
                              <button
                                key={icon}
                                type="button"
                                onClick={() => setNewCategory({...newCategory, icon})}
                                className={cn(
                                  "h-10 text-xl flex items-center justify-center rounded border",
                                  newCategory.icon === icon 
                                    ? "border-homepilot-primary bg-homepilot-accent" 
                                    : "border-gray-200 hover:border-homepilot-primary/50 hover:bg-homepilot-accent/20"
                                )}
                              >
                                {icon}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <Button onClick={addNewCategory} className="w-full mt-2 bg-homepilot-primary hover:bg-homepilot-secondary">
                          Kategorie erstellen
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Dokumenten-Upload-Sektion */}
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                    dragOver ? "bg-homepilot-primary/5 border-homepilot-primary" : "border-gray-300 dark:border-gray-700"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-10 w-10 text-homepilot-primary mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Dokumente hochladen</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Ziehe Dateien hierher oder klicke auf "Durchsuchen", um Dokumente hochzuladen
                  </p>
                  <div className="flex justify-center">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="bg-homepilot-primary text-white px-4 py-2 rounded text-sm hover:bg-homepilot-secondary transition-colors">
                        Durchsuchen
                      </div>
                      <input 
                        id="file-upload" 
                        type="file" 
                        multiple 
                        className="hidden" 
                        onChange={handleFileInputChange} 
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="important">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">Wichtige Dokumente für die Familie</h3>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select 
                    className="text-sm border rounded px-2 py-1"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="all">Alle Kategorien</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {importantDocuments.length > 0 ? (
                <div className="space-y-2">
                  {importantDocuments.map(doc => (
                    <div key={doc.id} className="p-3 rounded-lg border border-homepilot-accent/20 hover:border-homepilot-primary/30 flex justify-between items-center hover:bg-homepilot-accent/5 transition-all">
                      <div className="flex items-center">
                        <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
                          <FileCheck className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            Datum: {new Date(doc.date).toLocaleDateString('de-CH')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-homepilot-secondary hover:text-homepilot-primary hover:bg-homepilot-accent/10"
                          onClick={() => setViewDocument(doc)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-homepilot-secondary hover:text-homepilot-primary hover:bg-homepilot-accent/10"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center text-gray-500">
                  <p>Keine wichtigen Dokumente vorhanden.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="space-y-3">
              <h3 className="text-md font-medium">Kürzlich hinzugefügte Dokumente</h3>
              
              {recentDocuments.length > 0 ? (
                <div className="space-y-2">
                  {recentDocuments.map(doc => (
                    <div key={doc.id} className="p-3 rounded-lg border border-homepilot-accent/20 hover:border-homepilot-primary/30 flex justify-between items-center hover:bg-homepilot-accent/5 transition-all">
                      <div className="flex items-center">
                        <div className="bg-homepilot-primary/10 dark:bg-homepilot-primary/20 p-2 rounded-full mr-3">
                          <FileCheck className="h-4 w-4 text-homepilot-primary dark:text-homepilot-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            Hinzugefügt: {new Date(doc.date).toLocaleDateString('de-CH')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-homepilot-secondary hover:text-homepilot-primary hover:bg-homepilot-accent/10"
                          onClick={() => setViewDocument(doc)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-homepilot-secondary hover:text-homepilot-primary hover:bg-homepilot-accent/10"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center text-gray-500">
                  <p>Keine kürzlich hinzugefügten Dokumente vorhanden.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Document Preview Dialog */}
        {viewDocument && (
          <Dialog open={!!viewDocument} onOpenChange={() => setViewDocument(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Dokumentvorschau</DialogTitle>
              </DialogHeader>
              <DocumentPreview 
                document={{
                  id: viewDocument.id,
                  name: viewDocument.name,
                  date: viewDocument.date,
                  important: viewDocument.important
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentCategorization;
