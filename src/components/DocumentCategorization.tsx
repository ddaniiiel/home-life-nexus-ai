
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileCheck, Upload, Folder, PlusCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { cn } from "@/lib/utils";

const DocumentCategorization = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Rechnungen', icon: '📄', color: 'bg-blue-100' },
    { id: 2, name: 'Verträge', icon: '📝', color: 'bg-green-100' },
    { id: 3, name: 'Versicherungen', icon: '🔒', color: 'bg-purple-100' },
    { id: 4, name: 'Energieverbrauch', icon: '⚡', color: 'bg-yellow-100' },
    { id: 5, name: 'Bankauszüge', icon: '💰', color: 'bg-red-100' },
  ]);
  
  const [newCategory, setNewCategory] = useState({ name: '', icon: '📁' });
  
  const [dragOver, setDragOver] = useState(false);
  
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
    
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-red-100', 'bg-pink-100'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setCategories([
      ...categories,
      {
        id: categories.length + 1,
        name: newCategory.name,
        icon: newCategory.icon,
        color: randomColor
      }
    ]);
    
    setNewCategory({ name: '', icon: '📁' });
    
    toast({
      title: "Kategorie erstellt",
      description: `Die Kategorie "${newCategory.name}" wurde erfolgreich erstellt.`,
    });
  };
  
  const icons = ['📁', '📄', '📝', '🔒', '⚡', '💰', '🏠', '🚗', '💼', '🏥', '📱', '💻'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dokument Kategorisierung</CardTitle>
        <CardDescription>
          Organisiere deine Dokumente in Kategorien für einfaches Auffinden und Reporting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(category => (
              <div 
                key={category.id} 
                className={cn(
                  "p-4 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow",
                  category.color
                )}
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="font-medium text-sm">{category.name}</span>
              </div>
            ))}
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="p-4 rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <PlusCircle className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="font-medium text-sm text-gray-500">Neue Kategorie</span>
                </div>
              </DialogTrigger>
              <DialogContent>
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
                            newCategory.icon === icon ? "border-homepilot-primary bg-homepilot-primary/10" : "border-gray-200"
                          )}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Button onClick={addNewCategory} className="w-full mt-2">
                    Kategorie erstellen
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div 
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragOver ? "bg-homepilot-primary/5 border-homepilot-primary" : "border-gray-300 dark:border-gray-700"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Dokumente hochladen</h3>
            <p className="text-sm text-gray-500 mb-4">
              Ziehe Dateien hierher oder klicke auf "Durchsuchen", um Dokumente hochzuladen
            </p>
            <div className="flex justify-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="bg-homepilot-primary text-white px-4 py-2 rounded text-sm hover:bg-homepilot-primary/90">
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
          
          <div className="space-y-2">
            <h3 className="text-md font-medium">Automatische Verarbeitung</h3>
            <p className="text-sm text-gray-500">
              Hochgeladene Dokumente werden automatisch kategorisiert und analysiert.
            </p>
            <div className="flex space-x-2 pt-2">
              <div className="flex items-center text-xs text-green-600">
                <FileCheck className="h-3 w-3 mr-1" />
                <span>OCR-Erkennung</span>
              </div>
              <div className="flex items-center text-xs text-green-600">
                <FileCheck className="h-3 w-3 mr-1" />
                <span>Auto-Kategorisierung</span>
              </div>
              <div className="flex items-center text-xs text-green-600">
                <FileCheck className="h-3 w-3 mr-1" />
                <span>Datenextraktion</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCategorization;
