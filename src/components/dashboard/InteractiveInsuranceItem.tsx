
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Bell, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractiveInsuranceItemProps {
  title: string;
  status: string;
  details: string;
  variant: 'danger' | 'warning';
  dialogTitle: string;
  dialogDescription: string;
}

const InteractiveInsuranceItem: React.FC<InteractiveInsuranceItemProps> = ({
  title,
  status,
  details,
  variant,
  dialogTitle,
  dialogDescription,
}) => {
  const [note, setNote] = useState('');

  const handleSaveNote = () => {
    toast({
      title: "Notiz gespeichert!",
      description: `Deine Notiz für "${title}" wurde gespeichert.`,
    });
    // In a real app, you'd likely close the dialog here.
  };

  const variantClasses = {
    danger: {
      container: "border-red-200 dark:border-red-700/60 bg-red-50/50 dark:bg-red-900/20 hover:bg-red-100/50 dark:hover:bg-red-900/30",
      statusText: "text-red-600 dark:text-red-400",
    },
    warning: {
      container: "border-homepilot-warning/30 dark:border-yellow-600/50 bg-yellow-50/50 dark:bg-yellow-900/20 hover:bg-yellow-100/60 dark:hover:bg-yellow-900/30",
      statusText: "text-orange-600 dark:text-yellow-400",
    }
  };
  
  const classes = variantClasses[variant];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("p-2.5 rounded-md border cursor-pointer transition-colors", classes.container)}>
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium text-sm">{title}</p>
            <span className={cn("text-xs font-medium", classes.statusText)}>{status}</span>
          </div>
          <p className="text-xs text-muted-foreground">{details}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="note">Notiz</Label>
            <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="z.B. bei Versicherung anrufen und neuen Tarif anfragen..." />
          </div>
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
           <Button variant="outline" className="w-full sm:w-auto">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Erinnerung erstellen
          </Button>
          <Button onClick={handleSaveNote} className="w-full sm:w-auto">
            Notiz speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InteractiveInsuranceItem;
