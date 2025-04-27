
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { FileText, Search, Plus, Folder, File, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Documents = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const documents = [
    { id: 1, name: 'Mietvertrag.pdf', type: 'pdf', size: '2.4 MB', modified: '2025-04-10', category: 'Wohnen' },
    { id: 2, name: 'Versicherungspolice.pdf', type: 'pdf', size: '1.8 MB', modified: '2025-03-22', category: 'Versicherung' },
    { id: 3, name: 'Stromvertrag.pdf', type: 'pdf', size: '1.2 MB', modified: '2025-02-15', category: 'Verträge' },
    { id: 4, name: 'Gehaltsabrechnung_März.pdf', type: 'pdf', size: '0.8 MB', modified: '2025-04-01', category: 'Finanzen' },
    { id: 5, name: 'Steuererklärung_2024.xlsx', type: 'excel', size: '3.5 MB', modified: '2025-03-28', category: 'Finanzen' },
  ];

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
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Dokumente suchen..." className="pl-10" />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Folder className="h-4 w-4 mr-2" /> Neuer Ordner
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Upload
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategorie</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Größe</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Geändert</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{doc.category}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{doc.size}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                        {new Date(doc.modified).toLocaleDateString('de-DE')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
