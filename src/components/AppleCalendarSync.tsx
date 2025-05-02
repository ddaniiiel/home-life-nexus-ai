
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ArrowRight, Check, RefreshCw, CalendarRange, Clock, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const AppleCalendarSync = () => {
  const [selectedTab, setSelectedTab] = useState('google');
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isAppleConnected, setIsAppleConnected] = useState(false);
  const [isOutlookConnected, setIsOutlookConnected] = useState(false);
  const [iCalUrl, setICalUrl] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleConnect = (service: string) => {
    // Simulate connection process
    if (service === 'google') {
      setIsGoogleConnected(true);
    } else if (service === 'apple') {
      setIsAppleConnected(true);
    } else if (service === 'outlook') {
      setIsOutlookConnected(true);
    }
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  const handleDisconnect = (service: string) => {
    // Simulate disconnection process
    if (service === 'google') {
      setIsGoogleConnected(false);
    } else if (service === 'apple') {
      setIsAppleConnected(false);
    } else if (service === 'outlook') {
      setIsOutlookConnected(false);
    }
  };
  
  const handleImportICalendar = () => {
    // Simulate iCalendar import
    if (iCalUrl) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setICalUrl('');
      }, 3000);
    }
  };
  
  const publicCalendars = [
    { id: 1, name: "Deutsche Feiertage", source: "Google", subscribed: true },
    { id: 2, name: "Schulferien Bayern", source: "Google", subscribed: false },
    { id: 3, name: "Bundesliga Spieltage", source: "iCal", subscribed: true },
    { id: 4, name: "Müllabfuhr Reminders", source: "Custom", subscribed: false },
    { id: 5, name: "Konzerte in der Nähe", source: "Google", subscribed: false }
  ];

  const [subscribedCalendars, setSubscribedCalendars] = useState(
    publicCalendars.filter(cal => cal.subscribed)
  );

  const toggleCalendarSubscription = (id: number) => {
    const calendar = publicCalendars.find(cal => cal.id === id);
    if (calendar) {
      if (calendar.subscribed) {
        setSubscribedCalendars(subscribedCalendars.filter(cal => cal.id !== id));
      } else {
        setSubscribedCalendars([...subscribedCalendars, calendar]);
      }
      
      // Update the subscribed status in the publicCalendars array
      calendar.subscribed = !calendar.subscribed;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Kalender Synchronisation</h2>
        
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <p>Kalender erfolgreich verbunden! Die Termine werden jetzt synchronisiert.</p>
          </div>
        )}
        
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="google" className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              Google
            </TabsTrigger>
            <TabsTrigger value="apple" className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-3 h-3">
                  <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
              </div>
              Apple
            </TabsTrigger>
            <TabsTrigger value="outlook" className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                  <path fill="#0078D4" d="M23.5,6v12a.5.5,0,0,1-.5.5H14V17l3,1V6l-3,1V5.5H23A.5.5,0,0,1,23.5,6Z"/>
                  <path fill="#0078D4" d="M14,7l-3-1L1,9.76v7.1L11,20l3-1Z"/>
                  <path fill="#83B9F9" d="M14,5.5H7A4.5,4.5,0,0,0,2.5,10h0a4.49,4.49,0,0,0,4.5,4.49H14Z"/>
                  <path fill="#28A8EA" d="M7,5.5H1a.5.5,0,0,0-.5.5v9a.5.5,0,0,0,.5.5H7Z"/>
                </svg>
              </div>
              Outlook
            </TabsTrigger>
            <TabsTrigger value="ical" className="flex items-center gap-2">
              <CalendarRange className="w-4 h-4" />
              iCalendar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="google" className="space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google Kalender
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {isGoogleConnected 
                      ? 'Dein Google Kalender ist verbunden und wird synchronisiert.' 
                      : 'Verbinde deinen Google Kalender für eine automatische Synchronisation.'
                    }
                  </p>
                  {isGoogleConnected && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verbunden</Badge>
                    </div>
                  )}
                </div>
                <div>
                  {isGoogleConnected ? (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <RefreshCw className="mr-1 h-4 w-4" />
                        Synchronisieren
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDisconnect('google')}
                      >
                        Trennen
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="flex items-center"
                      onClick={() => handleConnect('google')}
                    >
                      Verbinden <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {isGoogleConnected && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Google Kalender Einstellungen</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sync-frequency">Synchronisationsfrequenz</Label>
                      <p className="text-sm text-gray-500">Wie oft sollen die Kalender synchronisiert werden</p>
                    </div>
                    <select 
                      id="sync-frequency"
                      className="p-2 border rounded-md bg-transparent"
                    >
                      <option value="15">Alle 15 Minuten</option>
                      <option value="30">Alle 30 Minuten</option>
                      <option value="60" selected>Jede Stunde</option>
                      <option value="120">Alle 2 Stunden</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-notifications">Benachrichtigungen</Label>
                      <p className="text-sm text-gray-500">Erhalte Benachrichtigungen für anstehende Termine</p>
                    </div>
                    <Switch id="enable-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="bidirectional-sync">Bidirektionale Synchronisation</Label>
                      <p className="text-sm text-gray-500">Änderungen in beiden Richtungen synchronisieren</p>
                    </div>
                    <Switch id="bidirectional-sync" defaultChecked />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="apple" className="space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4 mr-2">
                      <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                    Apple iCloud Kalender
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {isAppleConnected 
                      ? 'Dein Apple Kalender ist verbunden und wird synchronisiert.' 
                      : 'Verbinde deinen Apple iCloud Kalender für eine automatische Synchronisation.'
                    }
                  </p>
                  {isAppleConnected && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verbunden</Badge>
                    </div>
                  )}
                </div>
                <div>
                  {isAppleConnected ? (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <RefreshCw className="mr-1 h-4 w-4" />
                        Synchronisieren
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDisconnect('apple')}
                      >
                        Trennen
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="flex items-center"
                      onClick={() => handleConnect('apple')}
                    >
                      Verbinden <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {isAppleConnected && (
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Apple Kalender Auswahl</Label>
                    <p className="text-sm text-gray-500">Wähle, welche Kalender synchronisiert werden sollen</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {['Persönlich', 'Arbeit', 'Familie', 'Freizeit'].map((cal, index) => (
                    <div key={index} className="flex items-center justify-between border p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-green-500' : 
                          index === 2 ? 'bg-purple-500' : 
                          'bg-yellow-500'
                        }`} />
                        <span>{cal}</span>
                      </div>
                      <Switch defaultChecked={index !== 3} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="outlook" className="space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                      <path fill="#0078D4" d="M23.5,6v12a.5.5,0,0,1-.5.5H14V17l3,1V6l-3,1V5.5H23A.5.5,0,0,1,23.5,6Z"/>
                      <path fill="#0078D4" d="M14,7l-3-1L1,9.76v7.1L11,20l3-1Z"/>
                      <path fill="#83B9F9" d="M14,5.5H7A4.5,4.5,0,0,0,2.5,10h0a4.49,4.49,0,0,0,4.5,4.49H14Z"/>
                      <path fill="#28A8EA" d="M7,5.5H1a.5.5,0,0,0-.5.5v9a.5.5,0,0,0,.5.5H7Z"/>
                    </svg>
                    Microsoft Outlook
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {isOutlookConnected 
                      ? 'Dein Outlook Kalender ist verbunden und wird synchronisiert.' 
                      : 'Verbinde deinen Microsoft Outlook Kalender für eine automatische Synchronisation.'
                    }
                  </p>
                  {isOutlookConnected && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verbunden</Badge>
                    </div>
                  )}
                </div>
                <div>
                  {isOutlookConnected ? (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <RefreshCw className="mr-1 h-4 w-4" />
                        Synchronisieren
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDisconnect('outlook')}
                      >
                        Trennen
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="flex items-center"
                      onClick={() => handleConnect('outlook')}
                    >
                      Verbinden <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ical" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <CalendarRange className="mr-2 h-5 w-5" />
                  iCalendar URL importieren
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Füge eine iCalendar URL hinzu, um externe Kalender zu importieren
                </p>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ical-url">iCalendar URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="ical-url" 
                      placeholder="https://beispiel.com/calendar.ics" 
                      value={iCalUrl}
                      onChange={(e) => setICalUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleImportICalendar}>Importieren</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Füge eine gültige iCalendar URL ein, um den Kalender zu importieren
                  </p>
                </div>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Beispiel-URLs</h3>
                <div className="space-y-3">
                  <div className="border p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Deutsche Feiertage</h4>
                        <p className="text-xs text-gray-500">Fügt alle deutschen Feiertage zu deinem Kalender hinzu</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">URL kopieren</Button>
                    </div>
                  </div>
                  <div className="border p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Fußball Bundesliga</h4>
                        <p className="text-xs text-gray-500">Importiere den Spielplan der Bundesliga</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">URL kopieren</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Public calendars section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Öffentliche Kalender</h2>
        
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Abonniere öffentliche Kalender, um wichtige Termine und Ereignisse automatisch in deinem Kalender zu sehen.
          </p>
          
          <div className="grid gap-4">
            {publicCalendars.map(calendar => (
              <div 
                key={calendar.id} 
                className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    calendar.source === 'Google' ? 'bg-blue-100 text-blue-600' :
                    calendar.source === 'iCal' ? 'bg-purple-100 text-purple-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {calendar.source === 'Google' ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="currentColor" d="M12 22q-2.05 0-3.9-.788t-3.175-2.137q-1.325-1.35-2.1-3.175T2 12q0-2.05.788-3.9t2.137-3.175q1.35-1.325 3.175-2.1T12 2q2.05 0 3.9.788t3.175 2.137q1.325 1.35 2.1 3.175T22 12q0 2.05-.788 3.9t-2.137 3.175q-1.35 1.325-3.175 2.1T12 22m1-3h2v-7h-5v2h3z"/>
                      </svg>
                    ) : calendar.source === 'iCal' ? (
                      <CalendarRange className="w-5 h-5" />
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">{calendar.name}</h4>
                    <div className="flex items-center">
                      <Badge variant="secondary" className="text-xs">
                        {calendar.source}
                      </Badge>
                      <span className="text-xs text-gray-500 ml-2">
                        {calendar.id === 1 ? 'Automatisches Update' :
                         calendar.id === 2 ? 'Jährliches Update' :
                         'Wöchentliches Update'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <Switch 
                    checked={calendar.subscribed}
                    onCheckedChange={() => toggleCalendarSubscription(calendar.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Abonnierte Kalender</h3>
              <p className="text-sm text-gray-500">
                {subscribedCalendars.length} Kalender aktiv synchronisiert
              </p>
            </div>
            <Button>
              Öffentlichen Kalender hinzufügen
            </Button>
          </div>
        </div>
      </div>
      
      {/* Email notifications section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          E-Mail-Benachrichtigungen
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tägliche Zusammenfassung</Label>
              <p className="text-sm text-gray-500">Erhalte eine tägliche Zusammenfassung deiner Termine</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Termin-Erinnerungen</Label>
              <p className="text-sm text-gray-500">Erhalte E-Mail-Erinnerungen vor anstehenden Terminen</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Neue Familieneinladungen</Label>
              <p className="text-sm text-gray-500">Benachrichtigungen bei neuen Familieneinladungen</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleCalendarSync;
