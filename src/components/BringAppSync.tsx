
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ShoppingBasket, RefreshCw, Check, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from '@/components/ui/use-toast';

const BringAppSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // In a real app, this would be handled via Bring's API
  const connectToBring = () => {
    if (!email || !password) {
      toast({
        title: "Fehler",
        description: "Bitte E-Mail und Passwort eingeben.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSyncing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSyncing(false);
      setIsConnected(true);
      toast({
        title: "Verbindung hergestellt",
        description: "Die Verbindung zur Bring App wurde erfolgreich hergestellt.",
      });
    }, 1500);
  };

  const syncNow = () => {
    setIsSyncing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: "Synchronisierung abgeschlossen",
        description: "Alle Einkaufslisten wurden erfolgreich synchronisiert.",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingBasket className="mr-2 h-5 w-5" /> Bring! App
        </CardTitle>
        <CardDescription>
          Verbinde und synchronisiere deine Einkaufslisten mit der Bring! App
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Verbunden mit Bring! App</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bring-auto-sync">Automatische Synchronisierung</Label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Einkaufslisten automatisch synchronisieren
                </span>
                <Switch 
                  id="bring-auto-sync" 
                  checked={autoSync}
                  onCheckedChange={setAutoSync}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Verfügbare Listen</Label>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>Wocheneinkauf</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Drogerie</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span>Nicht mit Bring! App verbunden</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bring-email">E-Mail</Label>
              <Input 
                id="bring-email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.com" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bring-password">Passwort</Label>
              <Input 
                id="bring-password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Dein Bring! Passwort" 
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {isConnected ? (
          <>
            <Button
              variant="outline"
              onClick={() => setIsConnected(false)}
              disabled={isSyncing}
            >
              Trennen
            </Button>
            <Button 
              onClick={syncNow}
              disabled={isSyncing}
              className="flex items-center"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Synchronisiere...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Jetzt synchronisieren
                </>
              )}
            </Button>
          </>
        ) : (
          <Button 
            onClick={connectToBring}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Verbinde...
              </>
            ) : (
              "Mit Bring! verbinden"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BringAppSync;
