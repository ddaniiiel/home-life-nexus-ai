
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bank, Upload, FileCheck, AlertCircle, ChevronDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from '@/components/ui/use-toast';
import { cn } from "@/lib/utils";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from '@/components/ui/progress';

const BankStatementImport = () => {
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importing, setImporting] = useState(false);
  const [importedFiles, setImportedFiles] = useState<{name: string, size: string, status: string}[]>([]);
  
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
      processFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };
  
  const processFiles = (files: FileList) => {
    setImporting(true);
    setProgress(0);
    
    // Convert FileList to array for easier handling
    const fileArray = Array.from(files).map(file => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      status: 'pending'
    }));
    
    setImportedFiles(fileArray);
    
    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setImporting(false);
          
          // Update status to completed
          setImportedFiles(prevFiles => 
            prevFiles.map(file => ({...file, status: 'completed'}))
          );
          
          toast({
            title: "Import abgeschlossen",
            description: `${files.length} Dokumente wurden erfolgreich verarbeitet.`,
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const banks = [
    { name: 'Deutsche Bank', icon: '🏦' },
    { name: 'Commerzbank', icon: '🏦' },
    { name: 'Sparkasse', icon: '🏦' },
    { name: 'ING', icon: '🏦' },
    { name: 'DKB', icon: '🏦' },
    { name: 'Volksbank', icon: '🏦' },
    { name: 'N26', icon: '🏦' },
    { name: 'Andere Bank', icon: '🏦' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bank className="mr-2 h-5 w-5" /> Bankauszüge importieren
        </CardTitle>
        <CardDescription>
          Lade deine Bankauszüge hoch, um deine Finanzen zu analysieren
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-md flex items-start space-x-3">
          <div className="flex-shrink-0">
            <FileCheck className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Unterstützte Dateiformate</p>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
              PDF, CSV, OFX, QFX, QIF und MT940 werden automatisch analysiert.
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Bank auswählen</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {banks.map((bank, index) => (
              <div 
                key={index}
                className="border rounded-md p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-2xl mb-2">{bank.icon}</span>
                <span className="text-sm">{bank.name}</span>
              </div>
            ))}
          </div>
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
          <h3 className="text-lg font-medium mb-2">Bankauszüge hochladen</h3>
          <p className="text-sm text-gray-500 mb-4">
            Ziehe Dateien hierher oder klicke auf "Durchsuchen", um Bankauszüge hochzuladen
          </p>
          <div className="flex justify-center">
            <label htmlFor="statement-upload" className="cursor-pointer">
              <div className="bg-homepilot-primary text-white px-4 py-2 rounded text-sm hover:bg-homepilot-primary/90">
                Durchsuchen
              </div>
              <input 
                id="statement-upload" 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileInputChange} 
                accept=".pdf,.csv,.ofx,.qfx,.qif,.mt940"
              />
            </label>
          </div>
        </div>
        
        {importing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Verarbeite Dateien...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {importedFiles.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="imported-files">
              <AccordionTrigger className="text-sm font-medium">
                Importierte Dateien ({importedFiles.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {importedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                      <div className="flex items-center">
                        <FileCheck className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{file.name}</span>
                        <span className="ml-2 text-gray-500">{file.size}</span>
                      </div>
                      <span className={cn(
                        "px-2 py-0.5 text-xs rounded-full",
                        file.status === 'completed' 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      )}>
                        {file.status === 'completed' ? 'Verarbeitet' : 'In Bearbeitung'}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        
        <div className="space-y-2">
          <h3 className="text-md font-medium">Automatische Analyse</h3>
          <p className="text-sm text-gray-500">
            Nach dem Import werden deine Bankauszüge automatisch analysiert, um Einnahmen, Ausgaben und Kategorien zu erkennen.
          </p>
          <div className="flex flex-wrap space-x-2 pt-2">
            <div className="flex items-center text-xs text-green-600 mb-1">
              <FileCheck className="h-3 w-3 mr-1" />
              <span>Kategorisierung</span>
            </div>
            <div className="flex items-center text-xs text-green-600 mb-1">
              <FileCheck className="h-3 w-3 mr-1" />
              <span>Ausgaben-Tracking</span>
            </div>
            <div className="flex items-center text-xs text-green-600 mb-1">
              <FileCheck className="h-3 w-3 mr-1" />
              <span>Budgetanalyse</span>
            </div>
            <div className="flex items-center text-xs text-green-600 mb-1">
              <FileCheck className="h-3 w-3 mr-1" />
              <span>Berichtserstellung</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <Button className="w-full" disabled={importing}>
            {importing ? 'Verarbeite...' : 'Analyse starten'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BankStatementImport;
