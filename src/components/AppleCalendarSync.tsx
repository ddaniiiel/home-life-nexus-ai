
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Apple, RefreshCw, Check, AlertCircle, Copy } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from '@/components/ui/use-toast';

const AppleCalendarSync = () => {
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
        description: "Die Verbindung zu Apple Kalender wurde erfolgreich hergestellt.",
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
        description: "Alle Termine wurden erfolgreich synchronisiert.",
      });
    }, 2000);
  };

  const copyICalLink = () => {
    // This would be a real iCal URL in a production app
    navigator.clipboard.writeText('https://example.com/calendar/user123/homepilot.ics')
      .then(() => {
        toast({
          title: "Link kopiert",
          description: "Der iCal-Link wurde in die Zwischenablage kopiert.",
        });
      })
      .catch(() => {
        toast({
          title: "Fehler",
          description: "Der Link konnte nicht kopiert werden.",
          variant: "destructive"
        });
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Apple className="mr-2 h-5 w-5" /> Apple Kalender
        </CardTitle>
        <CardDescription>
          Verbinde und synchronisiere deine Termine mit Apple Kalender
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Verbunden mit Apple Kalender</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="calendar-auto-sync">Automatische Synchronisierung</Label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Termine automatisch alle 30 Minuten synchronisieren
                </span>
                <Switch 
                  id="calendar-auto-sync" 
                  checked={autoSync}
                  onCheckedChange={setAutoSync}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>iCal Abonnement-Link</Label>
              <div className="flex">
                <Input 
                  readOnly 
                  value="https://example.com/calendar/user123/homepilot.ics" 
                  className="rounded-r-none"
                />
                <Button 
                  className="rounded-l-none" 
                  variant="secondary"
                  onClick={copyICalLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Verwende diesen Link, um deinen HomePilot-Kalender in anderen Apps zu abonnieren.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Synchronisierte Kalender</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Privat</span>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Arbeit</span>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-sm">Familie</span>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span>Nicht mit Apple Kalender verbunden</span>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Verbinde deinen Apple Kalender, um Termine zu synchronisieren und zu verwalten.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Nach der Verbindung erhältst du einen iCal-Link, den du in Apple Kalender importieren kannst.
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

export default AppleCalendarSync;
