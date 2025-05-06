
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Circle, Square, Download, Camera, Cctv, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SmartHomeCameraProps {
  name: string;
  location: string;
  imageUrl: string;
  isRecording?: boolean;
  isOnline?: boolean;
  lastMotion?: string;
  className?: string;
}

const SmartHomeCamera: React.FC<SmartHomeCameraProps> = ({
  name,
  location,
  imageUrl,
  isRecording = false,
  isOnline = true,
  lastMotion = '2 Min. zuvor',
  className,
}) => {
  const [isLive, setIsLive] = useState(true);
  const [recording, setRecording] = useState(isRecording);

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  const toggleRecording = () => {
    setRecording(!recording);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isOnline ? "default" : "outline"} className={isOnline ? "bg-green-500" : ""}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
          {recording && (
            <Badge variant="destructive" className="animate-pulse">
              Aufnahme
            </Badge>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Kamera-Optionen</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleLive}>
                {isLive ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                {isLive ? "Live-Ansicht ausschalten" : "Live-Ansicht einschalten"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleRecording}>
                {recording ? <Square className="mr-2 h-4 w-4" /> : <Circle className="mr-2 h-4 w-4" />}
                {recording ? "Aufnahme stoppen" : "Aufnahme starten"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Aufnahmen herunterladen
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Camera className="mr-2 h-4 w-4" />
                Einstellungen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-4">
        <div className="relative aspect-video rounded-md overflow-hidden border border-border">
          {isLive ? (
            <img
              src={imageUrl}
              alt={`Kamera: ${name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="text-center">
                <Cctv className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Live-Ansicht ausgeschaltet</p>
              </div>
            </div>
          )}
          {isLive && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-black/50 text-white border-none font-mono">
                LIVE
              </Badge>
            </div>
          )}
          {isLive && recording && (
            <div className="absolute top-2 left-2">
              <Badge variant="destructive" className="animate-pulse flex items-center">
                <Circle className="h-2 w-2 mr-1" />
                REC
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t flex justify-between">
        <div className="text-xs text-muted-foreground">
          Letzte Bewegung: {lastMotion}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={toggleLive}>
            {isLive ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {isLive ? "Ausschalten" : "Anschalten"}
          </Button>
          <Button 
            variant={recording ? "destructive" : "default"} 
            size="sm" 
            onClick={toggleRecording}
          >
            {recording ? <Square className="h-4 w-4 mr-1" /> : <Circle className="h-4 w-4 mr-1" />}
            {recording ? "Stopp" : "Aufnehmen"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SmartHomeCamera;
