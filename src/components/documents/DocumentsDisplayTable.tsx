
import React from 'react';
import { File, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
  category: string;
}

interface DocumentsDisplayTableProps {
  documents: Document[];
  onDownload: (id: number) => void;
  onShare: (id: number) => void;
  searchQuery: string; // Used for the empty state message
}

const DocumentsDisplayTable: React.FC<DocumentsDisplayTableProps> = ({ documents, onDownload, onShare, searchQuery }) => {
  return (
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
          {documents.length > 0 ? (
            documents.map((doc) => (
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
                      onClick={() => onDownload(doc.id)}
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
                      onClick={() => onShare(doc.id)}
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
  );
};

export default DocumentsDisplayTable;
