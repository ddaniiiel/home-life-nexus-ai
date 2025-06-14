
import React from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { DialogClose } from '@/components/ui/dialog'; // For the cancel button

interface DocumentUploadFormProps {
  uploadFiles: File[];
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  isUploading: boolean;
  uploadProgress: number;
  newCategory: string;
  setNewCategory: (category: string) => void;
  simulateUpload: () => void;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
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
    <div className="space-y-6">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center bg-gray-50 dark:bg-gray-700/50">
        <Upload className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">Dateien hier ablegen oder</p>
        <Label htmlFor="document-upload-form-input" className="cursor-pointer">
          <span className="bg-homepilot-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-homepilot-secondary transition-colors">Durchsuchen</span>
          <Input
            id="document-upload-form-input" // Ensure unique ID if multiple instances
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
            <Label htmlFor="doc-category-form" className="text-sm font-medium text-gray-700 dark:text-gray-200">Kategorie</Label>
            <Select onValueChange={setNewCategory} value={newCategory}>
              <SelectTrigger id="doc-category-form" className="rounded-md bg-gray-50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700">
                <SelectValue placeholder="Kategorie auswählen" />
              </SelectTrigger>
              <SelectContent className="rounded-md">
                <SelectItem value="Verträge">Verträge</SelectItem>
                <SelectItem value="Energieverbrauch">Energieverbrauch</SelectItem>
                <SelectItem value="Finanzen">Finanzen</SelectItem>
                <SelectItem value="Versicherung">Versicherung</SelectItem>
                <SelectItem value="Wohnen">Wohnen</SelectItem>
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
  );
};

export default DocumentUploadForm;
