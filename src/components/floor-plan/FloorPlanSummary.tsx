
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ThermometerIcon, DoorClosed, Video } from 'lucide-react';
import { DeviceProps } from './types';

interface FloorPlanSummaryProps {
  devices: DeviceProps[];
}

const FloorPlanSummary = ({ devices }: FloorPlanSummaryProps) => {
  const lightsOn = devices.filter(d => d.type === 'light' && d.isOn).length;
  const totalLights = devices.filter(d => d.type === 'light').length;

  const activeThermostats = devices.filter(d => d.type === 'thermostat' && d.value && d.isOn);
  const avgTemp = activeThermostats.length > 0
    ? Math.round(activeThermostats.reduce((sum, d) => sum + (d.value || 0), 0) / activeThermostats.length)
    : 0;

  const isAnyDoorOpen = devices.some(d => d.type === 'door' && !d.isOn);
  const camerasOn = devices.filter(d => d.type === 'camera' && d.isOn).length > 0;

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Beleuchtung</CardTitle>
          <Lightbulb className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {lightsOn}/{totalLights}
          </div>
          <p className="text-xs text-muted-foreground">aktiv</p>
        </CardContent>
      </Card>
      <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Durchschnittstemp.</CardTitle>
          <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {avgTemp}°C
          </div>
          <p className="text-xs text-muted-foreground">in aktiven Räumen</p>
        </CardContent>
      </Card>
      <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Türen</CardTitle>
          <DoorClosed className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isAnyDoorOpen ?
              <span className="text-red-500">Offen</span> :
              <span className="text-green-500">Sicher</span>
            }
          </div>
          <p className="text-xs text-muted-foreground">Status aller Türen</p>
        </CardContent>
      </Card>
      <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sicherheit</CardTitle>
          <Video className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {camerasOn ?
              <span className="text-green-500">Aktiv</span> :
              <span className="text-red-500">Inaktiv</span>
            }
          </div>
          <p className="text-xs text-muted-foreground">Kameraüberwachung</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloorPlanSummary;
