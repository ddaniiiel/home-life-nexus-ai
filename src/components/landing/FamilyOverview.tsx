
import React from 'react';
import { Users, Calendar, Home, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FamilyOverview = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500 bg-opacity-10 text-green-600 text-sm font-medium mb-4">
            <span className="mr-2">👨‍👩‍👧‍👦</span>
            Für die ganze Familie
          </div>
          <h2 className="text-3xl font-bold mb-4">Dein digitales Zuhause für alle</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            HomePilot hilft der ganzen Familie, den Alltag zu organisieren und den Überblick zu behalten.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="border-green-100 dark:border-green-900 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Familienkonto</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Erstelle individuelle Profile für jedes Familienmitglied, mit angepassten Aufgaben und Berechtigungen.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100 dark:border-green-900 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Gemeinsamer Kalender</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Behalte alle wichtigen Termine der Familie im Blick und verpasse keine Veranstaltung mehr.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100 dark:border-green-900 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                  <Home className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Smart Home Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Steuere alle Geräte zentral und stelle familienfreundliche Automationen ein.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100 dark:border-green-900 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Dokument-Verwaltung</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Organisiere wichtige Familienunterlagen an einem sicheren Ort für schnellen Zugriff.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Familienmitglieder im Überblick</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Mit individuellen Profilen für jedes Familienmitglied behält jeder seine eigenen Aufgaben und Termine im Blick.
              </p>
            </div>
            <div className="flex justify-around">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-green-200">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                    alt="Vater" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>
                <p className="font-medium">Thomas</p>
                <p className="text-sm text-gray-500">Vater</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-green-200">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" 
                    alt="Mutter" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>
                <p className="font-medium">Sarah</p>
                <p className="text-sm text-gray-500">Mutter</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-green-200">
                  <img 
                    src="https://images.unsplash.com/photo-1590080692141-56a6aaa7cdce?auto=format&fit=crop&w=150&q=80" 
                    alt="Tochter" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>
                <p className="font-medium">Emma</p>
                <p className="text-sm text-gray-500">Tochter</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-green-200">
                  <img 
                    src="https://images.unsplash.com/photo-1599463923592-e4e6206e9e3d?auto=format&fit=crop&w=150&q=80" 
                    alt="Sohn" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>
                <p className="font-medium">Tim</p>
                <p className="text-sm text-gray-500">Sohn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyOverview;
