
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Link as LinkIcon, PlusCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Task, Appointment } from '@/models/TaskAppointment';

interface TaskAppointmentLinkProps {
  task?: Task;
  appointment?: Appointment;
  allTasks: Task[];
  allAppointments: Appointment[];
  onLinkTask?: (appointmentId: number, taskId: number) => void;
  onUnlinkTask?: (appointmentId: number, taskId: number) => void;
  onLinkAppointment?: (taskId: number, appointmentId: number) => void;
  onUnlinkAppointment?: (taskId: number, appointmentId: number) => void;
  className?: string;
}

const TaskAppointmentLink: React.FC<TaskAppointmentLinkProps> = ({
  task,
  appointment,
  allTasks,
  allAppointments,
  onLinkTask,
  onUnlinkTask,
  onLinkAppointment,
  onUnlinkAppointment,
  className
}) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  
  // Determine if we're linking from a task to an appointment or vice versa
  const linkingFromTask = !!task && !appointment;
  
  const handleLink = () => {
    const idNumber = parseInt(selectedItemId);
    if (!idNumber) return;
    
    if (linkingFromTask && task && onLinkAppointment) {
      onLinkAppointment(task.id, idNumber);
    } else if (appointment && onLinkTask) {
      onLinkTask(appointment.id, idNumber);
    }
    
    setLinkDialogOpen(false);
    setSelectedItemId('');
  };
  
  const handleUnlink = (itemId: number) => {
    if (linkingFromTask && task && onUnlinkAppointment) {
      onUnlinkAppointment(task.id, itemId);
    } else if (appointment && onUnlinkTask) {
      onUnlinkTask(appointment.id, itemId);
    }
  };
  
  // Get linked items to display
  const getLinkedItems = () => {
    if (linkingFromTask && task?.linkedAppointmentIds) {
      return allAppointments.filter(appt => task.linkedAppointmentIds?.includes(appt.id));
    } else if (appointment?.linkedTaskIds) {
      return allTasks.filter(t => appointment.linkedTaskIds?.includes(t.id));
    }
    return [];
  };
  
  // Get items available for linking (not already linked)
  const getAvailableItems = () => {
    if (linkingFromTask && task?.linkedAppointmentIds) {
      return allAppointments.filter(appt => !task.linkedAppointmentIds?.includes(appt.id));
    } else if (appointment?.linkedTaskIds) {
      return allTasks.filter(t => !appointment.linkedTaskIds?.includes(t.id));
    }
    return linkingFromTask ? allAppointments : allTasks;
  };
  
  const linkedItems = getLinkedItems();
  const availableItems = getAvailableItems();
  
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1">
          <LinkIcon className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium">
            {linkingFromTask ? 'Verknüpfte Termine' : 'Verknüpfte Aufgaben'}
          </h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => setLinkDialogOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      
      {linkedItems.length > 0 ? (
        <div className="space-y-2">
          {linkedItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              <div className="flex items-center space-x-2">
                {linkingFromTask ? (
                  <Calendar className="h-4 w-4 text-blue-500" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {linkingFromTask && 'startDate' in item ? format(item.startDate, 'dd.MM.yyyy HH:mm', { locale: de }) : 
                     !linkingFromTask && 'dueDate' in item && item.dueDate ? format(item.dueDate, 'dd.MM.yyyy', { locale: de }) : ''}
                  </p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                onClick={() => handleUnlink(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-3 text-sm text-gray-500 border border-dashed rounded-lg">
          {linkingFromTask ? 'Keine verknüpften Termine' : 'Keine verknüpften Aufgaben'}
        </div>
      )}
      
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {linkingFromTask ? 'Termin verknüpfen' : 'Aufgabe verknüpfen'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Select value={selectedItemId} onValueChange={setSelectedItemId}>
              <SelectTrigger>
                <SelectValue placeholder={linkingFromTask ? 'Termin auswählen' : 'Aufgabe auswählen'} />
              </SelectTrigger>
              <SelectContent>
                {availableItems.map(item => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    <div className="flex items-center">
                      {linkingFromTask ? (
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      )}
                      <span>{item.title}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {linkingFromTask && 'startDate' in item ? format(item.startDate, 'dd.MM. HH:mm', { locale: de }) : 
                        !linkingFromTask && 'dueDate' in item && item.dueDate ? format(item.dueDate, 'dd.MM.', { locale: de }) : ''}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>Abbrechen</Button>
            <Button onClick={handleLink} disabled={!selectedItemId}>Verknüpfen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskAppointmentLink;
