
import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const EmergencyEquipment: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notfallausrüstung</CardTitle>
        <CardDescription>Standorte wichtiger Notfallausrüstung</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-3 border rounded-lg bg-red-50">
          <h3 className="font-medium flex items-center">
            <Badge className="bg-red-500 text-white mr-2">1</Badge>
            Erste-Hilfe-Kasten
          </h3>
          <p className="text-sm text-gray-600 mt-1">Badezimmerschrank, oberstes Fach</p>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>Zuletzt geprüft: 15.03.2025</span>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg">
          <h3 className="font-medium flex items-center">
            <Badge className="bg-gray-500 text-white mr-2">2</Badge>
            Feuerlöscher
          </h3>
          <p className="text-sm text-gray-600 mt-1">Küche neben Kühlschrank & Keller</p>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>Zuletzt geprüft: 10.01.2025</span>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg">
          <h3 className="font-medium flex items-center">
            <Badge className="bg-gray-500 text-white mr-2">3</Badge>
            Notfallrucksack
          </h3>
          <p className="text-sm text-gray-600 mt-1">Garderobe, unteres Fach</p>
          <p className="text-xs text-gray-500 mt-1">Enthält: Taschenlampen, Batterien, Powerbank, Radio, Wasservorrat, Notfalldecken</p>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>Zuletzt aktualisiert: 05.02.2025</span>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg">
          <h3 className="font-medium flex items-center">
            <Badge className="bg-gray-500 text-white mr-2">4</Badge>
            Notfallkontakte & Dokumente
          </h3>
          <p className="text-sm text-gray-600 mt-1">Küchenschublade & als laminierte Karte im Notfallrucksack</p>
        </div>
        
        <Button variant="outline" className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Weiteres Equipment hinzufügen
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmergencyEquipment;
