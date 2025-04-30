
import React from 'react';
import { FileText, Shield, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export interface ImportantDocument {
  id: number;
  name: string;
  description: string;
  location: string;
  lastUpdated: string;
}

interface ImportantDocumentsProps {
  documents: ImportantDocument[];
}

const ImportantDocuments: React.FC<ImportantDocumentsProps> = ({ documents }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wichtige Dokumente</CardTitle>
        <CardDescription>
          Standorte kritischer Dokumente im Notfall
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="p-3 border rounded-lg">
            <div className="flex items-start mb-1">
              <FileText className="h-5 w-5 text-homepilot-primary mt-0.5 mr-2" />
              <div>
                <h3 className="font-medium">{doc.name}</h3>
                <p className="text-xs text-gray-600 mt-0.5">{doc.description}</p>
                <div className="flex items-center mt-2">
                  <Shield className="h-4 w-4 text-gray-500 mr-1" />
                  <p className="text-xs text-gray-600">{doc.location}</p>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>Aktualisiert: {new Date(doc.lastUpdated).toLocaleDateString('de-CH')}</span>
              </div>
            </div>
          </div>
        ))}
        <Separator />
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Digitale Sicherungskopien</p>
          <p className="text-xs text-gray-600 mb-3">
            Wichtige Dokumente sind als verschlüsselte PDFs gespeichert:
          </p>
          <Button variant="outline" size="sm" className="mb-2 w-full">
            <FileText className="h-3 w-3 mr-2" />
            NAS Synology (Ordner "Wichtige Dokumente")
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <FileText className="h-3 w-3 mr-2" />
            Cloud-Backup (Passwort im Safe)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantDocuments;
