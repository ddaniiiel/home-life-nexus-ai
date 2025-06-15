
import React from 'react';
import { Phone, Shield, AlertTriangle, FileText, Heart, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ModernEmergencyPage = () => {
  const emergencyContacts = [
    { name: "Polizei", number: "117", icon: Shield, color: "bg-red-500" },
    { name: "Feuerwehr", number: "118", icon: AlertTriangle, color: "bg-orange-500" },
    { name: "Sanitätsnotruf", number: "144", icon: Heart, color: "bg-blue-500" },
    { name: "Pannenhilfe", number: "140", icon: Car, color: "bg-green-500" },
  ];

  const personalContacts = [
    { name: "Dr. Müller (Hausarzt)", number: "+41 44 123 45 67", type: "Arzt" },
    { name: "Zahnarzt Praxis", number: "+41 44 234 56 78", type: "Zahnarzt" },
    { name: "Oma & Opa", number: "+41 44 345 67 89", type: "Familie" },
    { name: "Nachbar Schmidt", number: "+41 79 456 78 90", type: "Nachbar" },
  ];

  const importantDocuments = [
    { name: "Krankenversicherung", location: "Ordner A, Fach 3" },
    { name: "Hausratversicherung", location: "Ordner B, Fach 1" },
    { name: "Reisepässe", location: "Safe" },
    { name: "Notfallkontakte", location: "Kühlschrank" },
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Numbers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Notfallnummern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {emergencyContacts.map((contact) => (
              <Button
                key={contact.name}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-lg border-2"
                asChild
              >
                <a href={`tel:${contact.number}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${contact.color} text-white`}>
                    <contact.icon className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-lg font-bold">{contact.number}</p>
                  </div>
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Persönliche Kontakte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {personalContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium">{contact.name}</h4>
                  <p className="text-sm text-gray-500">{contact.number}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{contact.type}</Badge>
                  <Button size="sm" asChild>
                    <a href={`tel:${contact.number}`}>
                      <Phone className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Important Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Wichtige Dokumente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {importantDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium">{doc.name}</h4>
                  <p className="text-sm text-gray-500">Standort: {doc.location}</p>
                </div>
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Emergency Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Notfallplan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20">
              <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Bei Feuer</h4>
              <ol className="text-sm space-y-1 text-red-700 dark:text-red-400">
                <li>1. Feuerwehr rufen (118)</li>
                <li>2. Alle Personen evakuieren</li>
                <li>3. Sammelplatz: Parkplatz</li>
                <li>4. Nicht Aufzug benutzen</li>
              </ol>
            </div>
            
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Bei Medizinischem Notfall</h4>
              <ol className="text-sm space-y-1 text-blue-700 dark:text-blue-400">
                <li>1. Sanitätsnotruf (144)</li>
                <li>2. Erste Hilfe leisten</li>
                <li>3. Person nicht bewegen</li>
                <li>4. Bei Bewusstlosigkeit: stabile Seitenlage</li>
              </ol>
            </div>
            
            <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-2">Bei Einbruch</h4>
              <ol className="text-sm space-y-1 text-orange-700 dark:text-orange-400">
                <li>1. Polizei rufen (117)</li>
                <li>2. Sicheren Ort aufsuchen</li>
                <li>3. Nichts berühren</li>
                <li>4. Auf Polizei warten</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Kit */}
      <Card>
        <CardHeader>
          <CardTitle>Notfallausrüstung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Taschenlampe",
              "Batterien",
              "Erste-Hilfe-Kasten",
              "Notrationen",
              "Wasservorrat",
              "Transistorradio",
              "Medikamente",
              "Warme Decken"
            ].map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernEmergencyPage;
