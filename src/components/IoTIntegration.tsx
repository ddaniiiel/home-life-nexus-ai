
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wifi, Check, X, Link, Link2, Plus, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IntegrationProps {
  name: string;
  logo: string;
  isConnected: boolean;
  description: string;
}

const integrations: IntegrationProps[] = [
  {
    name: "Loxone",
    logo: "https://source.unsplash.com/random/100x100?home", // Placeholder, would be actual logo in real app
    isConnected: true,
    description: "Smart Home Automation System",
  },
  {
    name: "1home",
    logo: "https://source.unsplash.com/random/100x100?smart", // Placeholder, would be actual logo in real app
    isConnected: false,
    description: "IoT Integration Platform",
  },
  {
    name: "Philips Hue",
    logo: "https://source.unsplash.com/random/100x100?light", // Placeholder, would be actual logo in real app
    isConnected: true,
    description: "Smart Lighting System",
  },
  {
    name: "Netatmo",
    logo: "https://source.unsplash.com/random/100x100?weather", // Placeholder, would be actual logo in real app
    isConnected: true,
    description: "Weather Station & Climate Control",
  },
];

interface SensorProps {
  id: string;
  name: string;
  type: string;
  location: string;
  value: number | string;
  unit: string;
  isOnline: boolean;
  lastUpdate: string;
  batteryLevel?: number;
}

const sensors: SensorProps[] = [
  {
    id: "temp-001",
    name: "Wohnzimmer Temperatur",
    type: "temperature",
    location: "Wohnzimmer",
    value: 21.5,
    unit: "°C",
    isOnline: true,
    lastUpdate: "2025-04-27T10:15:00",
    batteryLevel: 85,
  },
  {
    id: "hum-001",
    name: "Wohnzimmer Luftfeuchtigkeit",
    type: "humidity",
    location: "Wohnzimmer",
    value: 45,
    unit: "%",
    isOnline: true,
    lastUpdate: "2025-04-27T10:15:00",
    batteryLevel: 92,
  },
  {
    id: "temp-002",
    name: "Küche Temperatur",
    type: "temperature",
    location: "Küche",
    value: 22.8,
    unit: "°C",
    isOnline: true,
    lastUpdate: "2025-04-27T10:12:00",
    batteryLevel: 74,
  },
  {
    id: "co2-001",
    name: "Wohnzimmer CO2",
    type: "co2",
    location: "Wohnzimmer",
    value: 650,
    unit: "ppm",
    isOnline: true,
    lastUpdate: "2025-04-27T10:15:00",
    batteryLevel: 61,
  },
  {
    id: "door-001",
    name: "Haustür Sensor",
    type: "contact",
    location: "Eingang",
    value: "Geschlossen",
    unit: "",
    isOnline: true,
    lastUpdate: "2025-04-27T09:45:00",
    batteryLevel: 89,
  },
  {
    id: "motion-001",
    name: "Bewegungsmelder Flur",
    type: "motion",
    location: "Flur",
    value: "Keine Bewegung",
    unit: "",
    isOnline: true,
    lastUpdate: "2025-04-27T10:02:00",
    batteryLevel: 95,
  },
  {
    id: "power-001",
    name: "Stromverbrauch",
    type: "power",
    location: "Stromkasten",
    value: 2.4,
    unit: "kW",
    isOnline: true,
    lastUpdate: "2025-04-27T10:14:00",
  },
];

const IoTIntegration = () => {
  const [activeIntegrations, setActiveIntegrations] = useState<string[]>(
    integrations.filter(i => i.isConnected).map(i => i.name)
  );

  const [searchQuery, setSearchQuery] = useState('');
  const filteredSensors = searchQuery === '' 
    ? sensors 
    : sensors.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const toggleIntegration = (name: string) => {
    if (activeIntegrations.includes(name)) {
      setActiveIntegrations(activeIntegrations.filter(i => i !== name));
      toast({
        title: `${name} getrennt`,
        description: `Die Verbindung zu ${name} wurde getrennt.`,
      });
    } else {
      setActiveIntegrations([...activeIntegrations, name]);
      toast({
        title: `${name} verbunden`,
        description: `Die Verbindung zu ${name} wurde hergestellt.`,
      });
    }
  };

  const [newIntegration, setNewIntegration] = useState({
    name: '',
    ip: '',
    username: '',
    password: '',
  });

  const handleAddIntegration = () => {
    // Here would be actual integration logic in a real app
    toast({
      title: "Integration hinzugefügt",
      description: `${newIntegration.name} wurde erfolgreich konfiguriert.`,
    });
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="sensors">
        <TabsList className="mb-6">
          <TabsTrigger value="sensors" className="flex items-center">
            <Wifi className="h-4 w-4 mr-2" />
            Sensoren
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center">
            <Link className="h-4 w-4 mr-2" />
            Integrationen
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sensors">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">IoT Sensoren</h3>
              <div className="relative">
                <Input 
                  placeholder="Sensoren suchen..." 
                  className="max-w-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSensors.map(sensor => (
                <Card key={sensor.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{sensor.name}</CardTitle>
                        <CardDescription>{sensor.location}</CardDescription>
                      </div>
                      <Badge variant={sensor.isOnline ? "outline" : "destructive"}>
                        {sensor.isOnline ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">
                          {sensor.value} {sensor.unit}
                        </p>
                        <p className="text-xs text-gray-500">
                          Letzte Aktualisierung: {new Date(sensor.lastUpdate).toLocaleString('de-CH')}
                        </p>
                      </div>
                      {sensor.batteryLevel !== undefined && (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <div className="text-xs font-medium">
                            {sensor.batteryLevel}%
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Konfigurieren
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Dialog>
                <DialogTrigger asChild>
                  <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-[200px] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <Plus className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Neuen Sensor hinzufügen</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Neuen Sensor hinzufügen</DialogTitle>
                    <DialogDescription>
                      Folgen Sie den Anweisungen des Sensorherstellers zur Kopplung.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <Alert>
                      <Wifi className="h-4 w-4" />
                      <AlertTitle>Scanmodus aktiv</AlertTitle>
                      <AlertDescription>
                        Ihr HomePilot sucht nach neuen Sensoren in Reichweite. 
                        Bitte aktivieren Sie den Pairing-Modus an Ihrem Gerät.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-homepilot-primary"></div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Abbrechen</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="integrations">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Integrationen</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Neue Integration
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Integration hinzufügen</DialogTitle>
                    <DialogDescription>
                      Verbinden Sie Ihr Smart Home System mit HomePilot.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="integration-name">Name</Label>
                      <Input 
                        id="integration-name" 
                        placeholder="z.B. Loxone, 1home, Philips Hue" 
                        value={newIntegration.name}
                        onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="integration-ip">IP-Adresse / Hostname</Label>
                      <Input 
                        id="integration-ip" 
                        placeholder="192.168.1.100 oder mein-system.local" 
                        value={newIntegration.ip}
                        onChange={(e) => setNewIntegration({...newIntegration, ip: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="integration-username">Benutzername</Label>
                      <Input 
                        id="integration-username" 
                        value={newIntegration.username}
                        onChange={(e) => setNewIntegration({...newIntegration, username: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="integration-password">Passwort</Label>
                      <Input 
                        id="integration-password" 
                        type="password"
                        value={newIntegration.password}
                        onChange={(e) => setNewIntegration({...newIntegration, password: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Abbrechen</Button>
                    </DialogClose>
                    <Button onClick={handleAddIntegration}>Hinzufügen</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <Card key={integration.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded overflow-hidden mr-4">
                          <img 
                            src={integration.logo} 
                            alt={integration.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{integration.name}</h4>
                          <p className="text-sm text-gray-500">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Label htmlFor={`integration-${integration.name}`} className="sr-only">
                          {integration.name} aktivieren
                        </Label>
                        <Switch
                          id={`integration-${integration.name}`}
                          checked={activeIntegrations.includes(integration.name)}
                          onCheckedChange={() => toggleIntegration(integration.name)}
                        />
                        {activeIntegrations.includes(integration.name) ? (
                          <Check className="ml-2 h-4 w-4 text-green-500" />
                        ) : (
                          <X className="ml-2 h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IoTIntegration;
