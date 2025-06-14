
import React from 'react';
import { Search, Folder, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DocumentUploadForm from './DocumentUploadForm'; // We'll create this next

interface DocumentListControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isUploadDialogOpen: boolean;
  setIsUploadDialogOpen: (isOpen: boolean) => void;
  // Props for DocumentUploadForm
  uploadFiles: File[];
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  isUploading: boolean;
  uploadProgress: number;
  newCategory: string;
  setNewCategory: (category: string) => void;
  simulateUpload: () => void;
}

const DocumentListControls: React.FC<DocumentListControlsProps> = ({
  searchQuery,
  setSearchQuery,
  isUploadDialogOpen,
  setIsUploadDialogOpen,
  uploadFiles,
  handleFileSelect,
  removeFile,
  isUploading,
  uploadProgress,
  newCategory,
  setNewCategory,
  simulateUpload,
}) => {
  return (
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

        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-md bg-homepilot-primary hover:bg-homepilot-secondary">
              <Plus className="h-4 w-4 mr-2" /> Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg p-6 rounded-xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dokumente hochladen</DialogTitle>
            </DialogHeader>
            <DocumentUploadForm
              uploadFiles={uploadFiles}
              handleFileSelect={handleFileSelect}
              removeFile={removeFile}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              simulateUpload={simulateUpload}
              // Pass setIsUploadDialogOpen to allow DocumentUploadForm to close the dialog if needed, e.g. via a cancel button with DialogClose
              // Or handle close implicitly via simulateUpload completion
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DocumentListControls;
