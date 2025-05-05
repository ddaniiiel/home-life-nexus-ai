
import React, { useState } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { format, subHours, subDays } from 'date-fns';
import { de } from 'date-fns/locale';

export type SensorType = 'temperature' | 'humidity' | 'energy' | 'light' | 'co2';

interface SensorData {
  timestamp: Date;
  value: number;
}

interface SensorHistoryChartProps {
  title: string;
  type: SensorType;
  unit: string;
  currentValue?: number;
  className?: string;
  deviceId?: number;
  roomName?: string;
}

const getColorForSensorType = (type: SensorType): string => {
  switch (type) {
    case 'temperature':
      return 'rgba(239, 68, 68, 0.2)';
    case 'humidity':
      return 'rgba(59, 130, 246, 0.2)';
    case 'energy':
      return 'rgba(16, 185, 129, 0.2)';
    case 'light':
      return 'rgba(245, 158, 11, 0.2)';
    case 'co2':
      return 'rgba(107, 114, 128, 0.2)';
    default:
      return 'rgba(99, 102, 241, 0.2)';
  }
};

const getStrokeColorForSensorType = (type: SensorType): string => {
  switch (type) {
    case 'temperature':
      return '#ef4444';
    case 'humidity':
      return '#3b82f6';
    case 'energy':
      return '#10b981';
    case 'light':
      return '#f59e0b';
    case 'co2':
      return '#6b7280';
    default:
      return '#6366f1';
  }
};

// Generate some placeholder data with realistic patterns based on sensor type
const generateSensorData = (type: SensorType, hours: number): SensorData[] => {
  const now = new Date();
  const data: SensorData[] = [];
  
  // Define base value and variation by sensor type
  let baseValue = 0;
  let variation = 0;
  let dailyCycle = false;
  
  switch (type) {
    case 'temperature':
      baseValue = 21;
      variation = 2;
      dailyCycle = true;
      break;
    case 'humidity':
      baseValue = 55;
      variation = 10;
      dailyCycle = true;
      break;
    case 'energy':
      baseValue = 140;
      variation = 60;
      dailyCycle = true;
      break;
    case 'light':
      baseValue = 300;
      variation = 500;
      dailyCycle = true;
      break;
    case 'co2':
      baseValue = 600;
      variation = 300;
      break;
  }
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = subHours(now, i);
    const hour = timestamp.getHours();
    
    // Create daily cycle effects if applicable (higher during day, lower at night)
    let timeMultiplier = 1;
    if (dailyCycle) {
      // Peak during day hours (8-20), lowest at night (0-6)
      if (hour >= 8 && hour <= 20) {
        timeMultiplier = 1 + (Math.sin((hour - 8) / 12 * Math.PI) * 0.5);
      } else {
        timeMultiplier = 0.7;
      }
    }
    
    // Create some random variation with general trends
    const randomFactor = 0.8 + (Math.random() * 0.4);
    const cycleEffect = dailyCycle ? timeMultiplier : 1;
    const value = baseValue + ((Math.random() - 0.5) * variation * randomFactor * cycleEffect);
    
    data.push({
      timestamp,
      value: Number(value.toFixed(1))
    });
  }
  
  return data;
};

const SensorHistoryChart: React.FC<SensorHistoryChartProps> = ({
  title,
  type,
  unit,
  currentValue,
  className,
  roomName,
}) => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  
  // Generate data based on time range selection
  const getData = () => {
    let hours = 24;
    
    if (timeRange === '7d') hours = 24 * 7;
    if (timeRange === '30d') hours = 24 * 30;
    
    return generateSensorData(type, hours);
  };
  
  const data = getData();
  const fillColor = getColorForSensorType(type);
  const strokeColor = getStrokeColorForSensorType(type);
  
  // Format for the X axis based on time range
  const formatXAxis = (timestamp: Date) => {
    if (timeRange === '24h') {
      return format(new Date(timestamp), 'HH:mm');
    } else if (timeRange === '7d') {
      return format(new Date(timestamp), 'EEE', { locale: de });
    } else {
      return format(new Date(timestamp), 'dd.MM');
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            {title} {roomName && <span className="text-sm font-normal text-muted-foreground">({roomName})</span>}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              {currentValue || data[data.length - 1].value}
              <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="24h" value={timeRange} onValueChange={(value) => setTimeRange(value as any)} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="24h">24h</TabsTrigger>
            <TabsTrigger value="7d">7 Tage</TabsTrigger>
            <TabsTrigger value="30d">30 Tage</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.map(item => ({
                timestamp: item.timestamp,
                value: item.value
              }))}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                minTickGap={8}
              />
              <YAxis
                dataKey="value"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}${unit}`}
                width={35}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(data.timestamp), 'dd.MM.yyyy HH:mm')}
                            </span>
                            <span className="font-bold text-sm">
                              {data.value}<span className="ml-1 font-normal">{unit}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={2}
                fill={`url(#gradient-${type})`}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorHistoryChart;
