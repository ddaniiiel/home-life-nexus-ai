
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Apple, RefreshCw, Check, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from '@/components/ui/use-toast';

const AppleRemindersSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  // In a real app, this would be handled via Apple's authentication and API
  const connectToApple = () => {
    setIsSyncing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSyncing(false);
      setIsConnected(true);
      toast({
        title: "Verbindung hergestellt",
        description: "Die Verbindung zu Apple Erinnerungen wurde erfolgreich hergestellt.",
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
        description: "Alle Aufgaben wurden erfolgreich synchronisiert.",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Apple className="mr-2 h-5 w-5" /> Apple Erinnerungen
        </CardTitle>
        <CardDescription>
          Verbinde und synchronisiere deine Aufgaben mit Apple Erinnerungen
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Verbunden mit Apple Erinnerungen</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="auto-sync">Automatische Synchronisierung</Label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Aufgaben automatisch alle 30 Minuten synchronisieren
                </span>
                <Switch 
                  id="auto-sync" 
                  checked={autoSync}
                  onCheckedChange={setAutoSync}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Letzte Synchronisierung</Label>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Heute, 14:32 Uhr
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span>Nicht mit Apple Erinnerungen verbunden</span>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="apple-id">Apple ID</Label>
              <Input id="apple-id" type="email" placeholder="deine@email.com" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Gib deine Apple ID ein, um die Verbindung herzustellen
              </p>
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
            onClick={connectToApple}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Verbinde...
              </>
            ) : (
              "Mit Apple verbinden"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AppleRemindersSync;
