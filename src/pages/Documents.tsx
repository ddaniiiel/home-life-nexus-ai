import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { FileText, File, Folder, BarChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentCategorization from '@/components/DocumentCategorization';
import EnergyAnalysis from '@/components/EnergyAnalysis';
import { toast } from '@/components/ui/use-toast';

import DocumentListControls from '@/components/documents/DocumentListControls';
import DocumentsDisplayTable from '@/components/documents/DocumentsDisplayTable';

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
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

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
            setNewCategory('');
            setIsUploadDialogOpen(false);
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
                <DocumentListControls
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  isUploadDialogOpen={isUploadDialogOpen}
                  setIsUploadDialogOpen={setIsUploadDialogOpen}
                  uploadFiles={uploadFiles}
                  handleFileSelect={handleFileSelect}
                  removeFile={removeFile}
                  isUploading={isUploading}
                  uploadProgress={uploadProgress}
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                  simulateUpload={simulateUpload}
                />
                <DocumentsDisplayTable
                  documents={filteredDocuments}
                  onDownload={downloadDocument}
                  onShare={shareDocument}
                  searchQuery={searchQuery}
                />
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
