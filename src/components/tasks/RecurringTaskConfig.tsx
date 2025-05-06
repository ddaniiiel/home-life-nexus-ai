
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { format, addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar as CalendarIcon, RotateCw } from 'lucide-react';
import { RecurrencePattern } from '@/models/TaskAppointment';

interface RecurringTaskConfigProps {
  recurrence: RecurrencePattern;
  onRecurrenceChange: (recurrence: RecurrencePattern) => void;
  endDate?: Date;
  onEndDateChange: (date?: Date) => void;
  customInterval?: number;
  onCustomIntervalChange?: (interval: number) => void;
  className?: string;
}

const RecurringTaskConfig: React.FC<RecurringTaskConfigProps> = ({
  recurrence,
  onRecurrenceChange,
  endDate,
  onEndDateChange,
  customInterval = 1,
  onCustomIntervalChange,
  className
}) => {
  const [hasEndDate, setHasEndDate] = useState(!!endDate);
  
  const handleEndDateToggle = (checked: boolean) => {
    setHasEndDate(checked);
    if (!checked) {
      onEndDateChange(undefined);
    }
  };
  
  // Preview next occurrences
  const getNextOccurrences = (baseDate: Date = new Date()) => {
    if (recurrence === 'none') return [];
    
    const occurrences = [];
    let current = baseDate;
    
    for (let i = 0; i < 3; i++) {
      switch (recurrence) {
        case 'daily':
          current = addDays(current, customInterval || 1);
          break;
        case 'weekly':
          current = addWeeks(current, customInterval || 1);
          break;
        case 'monthly':
          current = addMonths(current, customInterval || 1);
          break;
        case 'yearly':
          current = addYears(current, customInterval || 1);
          break;
        default:
          break;
      }
      occurrences.push(current);
    }
    
    return occurrences;
  };
  
  const nextOccurrences = getNextOccurrences();
  
  const getRecurrenceText = () => {
    switch(recurrence) {
      case 'none': return 'Keine Wiederholung';
      case 'daily': return customInterval && customInterval > 1 ? `Alle ${customInterval} Tage` : 'Täglich';
      case 'weekly': return customInterval && customInterval > 1 ? `Alle ${customInterval} Wochen` : 'Wöchentlich';
      case 'monthly': return customInterval && customInterval > 1 ? `Alle ${customInterval} Monate` : 'Monatlich';
      case 'yearly': return customInterval && customInterval > 1 ? `Alle ${customInterval} Jahre` : 'Jährlich';
      case 'custom': return 'Benutzerdefiniert';
      default: return 'Keine Wiederholung';
    }
  };
  
  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <RotateCw className="h-4 w-4" />
          <Label>Wiederholung</Label>
          <Badge variant="outline" className="ml-auto">
            {getRecurrenceText()}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <Select value={recurrence} onValueChange={onRecurrenceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Wiederholungsintervall auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Keine Wiederholung</SelectItem>
              <SelectItem value="daily">Täglich</SelectItem>
              <SelectItem value="weekly">Wöchentlich</SelectItem>
              <SelectItem value="monthly">Monatlich</SelectItem>
              <SelectItem value="yearly">Jährlich</SelectItem>
              <SelectItem value="custom">Benutzerdefiniert</SelectItem>
            </SelectContent>
          </Select>
          
          {recurrence !== 'none' && onCustomIntervalChange && (
            <div className="flex items-center space-x-2">
              <Label className="whitespace-nowrap">Alle</Label>
              <Input
                type="number"
                min="1"
                value={customInterval}
                onChange={(e) => onCustomIntervalChange(parseInt(e.target.value) || 1)}
                className="w-16"
              />
              <Label>
                {recurrence === 'daily' ? 'Tage' :
                 recurrence === 'weekly' ? 'Wochen' :
                 recurrence === 'monthly' ? 'Monate' :
                 recurrence === 'yearly' ? 'Jahre' : 'Einheiten'}
              </Label>
            </div>
          )}
          
          {recurrence !== 'none' && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Switch id="end-date" checked={hasEndDate} onCheckedChange={handleEndDateToggle} />
                <Label htmlFor="end-date">Enddatum</Label>
              </div>
              
              {hasEndDate && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-auto h-8">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {endDate ? format(endDate, 'dd.MM.yyyy', { locale: de }) : 'Datum wählen'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={onEndDateChange}
                      disabled={(date) => date < new Date()}
                      locale={de}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          )}
          
          {recurrence !== 'none' && nextOccurrences.length > 0 && (
            <div className="border rounded-md p-3 bg-gray-50 dark:bg-gray-800 mt-2">
              <p className="text-xs text-gray-500 mb-2">Nächste Termine:</p>
              <div className="space-y-1">
                {nextOccurrences.map((date, i) => (
                  <div key={i} className="flex items-center">
                    <CalendarIcon className="h-3 w-3 text-gray-400 mr-2" />
                    <span className="text-xs">{format(date, 'EEEE, dd. MMMM yyyy', { locale: de })}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecurringTaskConfig;
