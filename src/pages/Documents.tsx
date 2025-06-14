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
            // Reset category selection after successful upload
            setNewCategory(''); 
            // Consider closing the dialog here if a DialogClose reference is available
            // document.getElementById('closeDialogButton')?.click(); // If you add an ID to DialogClose
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
          <div className="flex items-center mb-10">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-lg mr-4">
              <FileText className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Dokumente</h1>
          </div>
          
          <Tabs defaultValue="files" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex md:gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger value="files" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-homepilot-primary rounded-md px-3 py-1.5 text-sm font-medium transition-all data-[state=inactive]:hover:bg-gray-200 dark:data-[state=inactive]:hover:bg-gray-700/70 flex items-center justify-center">
                <File className="h-4 w-4 mr-2" />
                Dateien
              </TabsTrigger>
              <TabsTrigger value="categories" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-homepilot-primary rounded-md px-3 py-1.5 text-sm font-medium transition-all data-[state=inactive]:hover:bg-gray-200 dark:data-[state=inactive]:hover:bg-gray-700/70 flex items-center justify-center">
                <Folder className="h-4 w-4 mr-2" />
                Kategorien
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-homepilot-primary rounded-md px-3 py-1.5 text-sm font-medium transition-all data-[state=inactive]:hover:bg-gray-200 dark:data-[state=inactive]:hover:bg-gray-700/70 flex items-center justify-center">
                <BarChart className="h-4 w-4 mr-2" />
                Berichte
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="files" className="animate-fade-in">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <div className="relative w-full md:w-2/5">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Dokumente suchen..." 
                      className="pl-10 rounded-md bg-gray-50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" className="rounded-md border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Folder className="h-4 w-4 mr-2" /> Neuer Ordner
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="rounded-md bg-homepilot-primary hover:bg-homepilot-secondary">
                          <Plus className="h-4 w-4 mr-2" /> Upload
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg p-6 rounded-xl">
                        <DialogHeader className="mb-4">
                          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dokumente hochladen</DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center bg-gray-50 dark:bg-gray-700/50">
                            <Upload className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">Dateien hier ablegen oder</p>
                            <Label htmlFor="document-upload" className="cursor-pointer">
                              <span className="bg-homepilot-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-homepilot-secondary transition-colors">Durchsuchen</span>
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
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Ausgewählte Dateien:</p>
                              {uploadFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                                  <div className="flex items-center min-w-0">
                                    <File className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 dark:text-gray-200 truncate">{file.name}</span>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 h-8 w-8"
                                    onClick={() => removeFile(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {isUploading && (
                            <div className="space-y-2 pt-2">
                              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                              </div>
                              <Progress value={uploadProgress} className="w-full h-2" />
                            </div>
                          )}
                          
                          {uploadFiles.length > 0 && !isUploading && (
                            <div className="space-y-4 pt-2">
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="doc-category" className="text-sm font-medium text-gray-700 dark:text-gray-200">Kategorie</Label>
                                <Select onValueChange={setNewCategory} value={newCategory}>
                                  <SelectTrigger id="doc-category" className="rounded-md bg-gray-50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700">
                                    <SelectValue placeholder="Kategorie auswählen" />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-md">
                                    <SelectItem value="Verträge">Verträge</SelectItem>
                                    <SelectItem value="Energieverbrauch">Energieverbrauch</SelectItem>
                                    <SelectItem value="Finanzen">Finanzen</SelectItem>
                                    <SelectItem value="Versicherung">Versicherung</SelectItem>
                                    <SelectItem value="Wohnen">Wohnen</SelectItem>
                                    {/* Add an option to clear selection or keep it as is */}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="flex justify-end gap-3 pt-2">
                                <DialogClose asChild>
                                  <Button variant="outline" className="rounded-md">Abbrechen</Button>
                                </DialogClose>
                                <Button onClick={simulateUpload} className="rounded-md bg-homepilot-primary hover:bg-homepilot-secondary">
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
                      <TableRow className="border-b border-gray-200 dark:border-gray-700">
                        <TableHead className="py-4 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</TableHead>
                        <TableHead className="py-4 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategorie</TableHead>
                        <TableHead className="py-4 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Größe</TableHead>
                        <TableHead className="py-4 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Geändert</TableHead>
                        <TableHead className="py-4 px-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.length > 0 ? (
                        filteredDocuments.map((doc) => (
                          <TableRow key={doc.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <TableCell className="py-4 px-4">
                              <div className="flex items-center">
                                <File className="h-5 w-5 text-homepilot-primary mr-3 flex-shrink-0" />
                                <span className="font-medium text-gray-800 dark:text-gray-100">{doc.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-4 text-gray-600 dark:text-gray-300">{doc.category}</TableCell>
                            <TableCell className="py-4 px-4 text-gray-600 dark:text-gray-300">{doc.size}</TableCell>
                            <TableCell className="py-4 px-4 text-gray-600 dark:text-gray-300">
                              {new Date(doc.modified).toLocaleDateString('de-CH')}
                            </TableCell>
                            <TableCell className="py-4 px-4 text-right">
                              <div className="flex justify-end space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 h-9 w-9"
                                  onClick={() => downloadDocument(doc.id)}
                                  title="Herunterladen"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" x2="12" y1="15" y2="3" />
                                  </svg>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 h-9 w-9"
                                  onClick={() => shareDocument(doc.id)}
                                  title="Teilen"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                          <TableCell colSpan={5} className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <FileText size={48} className="mx-auto mb-4 opacity-50" />
                            {searchQuery ? 'Keine Dokumente für Ihre Suche gefunden.' : 'Noch keine Dokumente vorhanden.'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="categories" className="animate-fade-in">
              <DocumentCategorization />
            </TabsContent>
            
            <TabsContent value="reports" className="animate-fade-in">
              <EnergyAnalysis />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Documents;
