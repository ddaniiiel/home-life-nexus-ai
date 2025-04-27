
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { FileText, Search, Plus, Folder, File, BarChart, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentCategorization from '@/components/DocumentCategorization';
import EnergyAnalysis from '@/components/EnergyAnalysis';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
  category: string;
}

const Documents = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [newCategory, setNewCategory] = useState('');
  
  const documents: Document[] = [
    { id: 1, name: 'Mietvertrag.pdf', type: 'pdf', size: '2.4 MB', modified: '2025-04-10', category: 'Wohnen' },
    { id: 2, name: 'Versicherungspolice.pdf', type: 'pdf', size: '1.8 MB', modified: '2025-03-22', category: 'Versicherung' },
    { id: 3, name: 'Stromvertrag.pdf', type: 'pdf', size: '1.2 MB', modified: '2025-02-15', category: 'Verträge' },
    { id: 4, name: 'Gehaltsabrechnung_März.pdf', type: 'pdf', size: '0.8 MB', modified: '2025-04-01', category: 'Finanzen' },
    { id: 5, name: 'Steuererklärung_2024.xlsx', type: 'excel', size: '3.5 MB', modified: '2025-03-28', category: 'Finanzen' },
    { id: 6, name: 'Stromrechnung_Q1_2025.pdf', type: 'pdf', size: '1.5 MB', modified: '2025-04-15', category: 'Energieverbrauch' },
    { id: 7, name: 'Gasrechnung_Q1_2025.pdf', type: 'pdf', size: '1.3 MB', modified: '2025-04-15', category: 'Energieverbrauch' },
    { id: 8, name: 'Wasserrechnung_Q1_2025.pdf', type: 'pdf', size: '1.1 MB', modified: '2025-04-16', category: 'Energieverbrauch' },
    { id: 9, name: 'Internetvertrag.pdf', type: 'pdf', size: '1.0 MB', modified: '2025-02-10', category: 'Verträge' },
    { id: 10, name: 'Handyvertrag.pdf', type: 'pdf', size: '0.9 MB', modified: '2025-01-20', category: 'Verträge' },
  ];

  const filteredDocuments = searchQuery
    ? documents.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : documents;
    
  const downloadDocument = (id: number) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      toast({
        title: "Download gestartet",
        description: `${doc.name} wird heruntergeladen.`,
      });
    }
  };
  
  const shareDocument = (id: number) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      toast({
        title: "Dokument teilen",
        description: `Teile-Dialog für ${doc.name} geöffnet.`,
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFiles(Array.from(e.target.files));
    }
  };
  
  const removeFile = (index: number) => {
    setUploadFiles(uploadFiles.filter((_, i) => i !== index));
  };
  
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            toast({
              title: "Upload erfolgreich",
              description: `${uploadFiles.length} Datei(en) wurden erfolgreich hochgeladen.`,
            });
            setUploadFiles([]);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <FileText className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Dokumente</h1>
          </div>
          
          <Tabs defaultValue="files" className="space-y-8">
            <TabsList>
              <TabsTrigger value="files" className="flex items-center">
                <File className="h-4 w-4 mr-2" />
                Dateien
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center">
                <Folder className="h-4 w-4 mr-2" />
                Kategorien
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Berichte
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="files">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Dokumente suchen..." 
                      className="pl-10" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Folder className="h-4 w-4 mr-2" /> Neuer Ordner
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" /> Upload
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Dokumente hochladen</DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="mb-2 text-sm">Dateien hier ablegen oder</p>
                            <Label htmlFor="document-upload" className="cursor-pointer">
                              <span className="bg-homepilot-primary text-white px-4 py-2 rounded text-sm">Durchsuchen</span>
                              <Input 
                                id="document-upload" 
                                type="file" 
                                className="hidden" 
                                onChange={handleFileSelect} 
                                multiple 
                              />
                            </Label>
                          </div>
                          
                          {uploadFiles.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Ausgewählte Dateien:</p>
                              {uploadFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                                  <div className="flex items-center">
                                    <File className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => removeFile(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {isUploading && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                              </div>
                              <Progress value={uploadProgress} className="w-full" />
                            </div>
                          )}
                          
                          {uploadFiles.length > 0 && !isUploading && (
                            <div className="space-y-3">
                              <div className="flex flex-col space-y-2">
                                <Label htmlFor="doc-category">Kategorie</Label>
                                <Select onValueChange={setNewCategory}>
                                  <SelectTrigger id="doc-category">
                                    <SelectValue placeholder="Kategorie auswählen" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Verträge">Verträge</SelectItem>
                                    <SelectItem value="Energieverbrauch">Energieverbrauch</SelectItem>
                                    <SelectItem value="Finanzen">Finanzen</SelectItem>
                                    <SelectItem value="Versicherung">Versicherung</SelectItem>
                                    <SelectItem value="Wohnen">Wohnen</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="flex justify-end gap-3">
                                <DialogClose asChild>
                                  <Button variant="outline">Abbrechen</Button>
                                </DialogClose>
                                <Button onClick={simulateUpload}>
                                  Hochladen
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Kategorie</TableHead>
                        <TableHead>Größe</TableHead>
                        <TableHead>Geändert</TableHead>
                        <TableHead className="text-right">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.length > 0 ? (
                        filteredDocuments.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <div className="flex items-center">
                                <File className="h-5 w-5 text-gray-400 mr-3" />
                                <span className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{doc.category}</TableCell>
                            <TableCell>{doc.size}</TableCell>
                            <TableCell>
                              {new Date(doc.modified).toLocaleDateString('de-CH')}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => downloadDocument(doc.id)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" x2="12" y1="15" y2="3" />
                                  </svg>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => shareDocument(doc.id)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                                  </svg>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            {searchQuery ? 'Keine Dokumente gefunden.' : 'Keine Dokumente vorhanden.'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="categories">
              <DocumentCategorization />
            </TabsContent>
            
            <TabsContent value="reports">
              <EnergyAnalysis />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Documents;
