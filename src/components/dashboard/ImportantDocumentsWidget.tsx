
import React from 'react';
import { Link } from 'react-router-dom';
import Widget from '@/components/Widget';
import { FileText } from 'lucide-react';

const ImportantDocumentsWidget = () => {
  return (
    <Widget title="Wichtige Dokumente" icon={<FileText />}>
      <div className="space-y-2.5">
        <div className="flex justify-between items-center p-2.5 rounded-md border border-red-200 dark:border-red-700/60 bg-red-50/50 dark:bg-red-900/30">
          <span className="text-sm">Familienversicherung_2025.pdf</span>
          <span className="text-xs text-red-600 dark:text-red-400">Läuft ab</span>
        </div>
        <div className="flex justify-between items-center p-2.5 rounded-md border border-primary/20 bg-primary/5 dark:bg-primary/10 dark:border-primary/30">
          <span className="text-sm">Schulanmeldung_Tim.pdf</span>
          <span className="text-xs text-primary">Neu</span>
        </div>
        <div className="flex justify-between items-center p-2.5 rounded-md border border-border/80">
          <span className="text-sm">Steuererklärung_2025.pdf</span>
          <span className="text-xs text-muted-foreground">Fällig: 31.03</span>
        </div>
        <Link to="/documents" className="text-xs text-primary hover:underline block mt-3">
          Dokumentenverwaltung →
        </Link>
      </div>
    </Widget>
  );
};

export default ImportantDocumentsWidget;
