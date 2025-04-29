
import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface FamilyMember {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  email?: string;
}

interface NewTaskFormProps {
  familyMembers: FamilyMember[];
  taskLists: string[];
  onAddTask: (
    title: string,
    priority: 'low' | 'medium' | 'high',
    dueDate: Date | undefined,
    list: string,
    assigneeId: string
  ) => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ 
  familyMembers, 
  taskLists, 
  onAddTask 
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskDate, setNewTaskDate] = useState<Date>();
  const [newTaskList, setNewTaskList] = useState('Haushalt');
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>('');
  const [open, setOpen] = useState(false);
  
  const handleSubmit = () => {
    if (!newTaskTitle.trim()) return;

    onAddTask(
      newTaskTitle,
      newTaskPriority,
      newTaskDate,
      newTaskList,
      newTaskAssignee
    );
    
    // Reset form
    setNewTaskTitle('');
    setNewTaskPriority('medium');
    setNewTaskDate(undefined);
    setNewTaskList('Haushalt');
    setNewTaskAssignee('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Neue Aufgabe
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neue Aufgabe erstellen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Titel</label>
            <Input
              id="title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Was muss erledigt werden?"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="list" className="text-sm font-medium">Liste</label>
            <Select defaultValue={newTaskList} onValueChange={setNewTaskList}>
              <SelectTrigger id="list">
                <SelectValue placeholder="Liste auswählen" />
              </SelectTrigger>
              <SelectContent>
                {taskLists.map(list => (
                  <SelectItem key={list} value={list}>{list}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="assignee" className="text-sm font-medium">Zugewiesen an</label>
            <Select value={newTaskAssignee} onValueChange={setNewTaskAssignee}>
              <SelectTrigger id="assignee">
                <SelectValue placeholder="Wähle ein Familienmitglied" />
              </SelectTrigger>
              <SelectContent>
                {familyMembers.map(member => (
                  <SelectItem
                    key={member.id}
                    value={member.id.toString()}
                    className="flex items-center"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">Priorität</label>
              <Select 
                defaultValue={newTaskPriority} 
                onValueChange={(value) => setNewTaskPriority(value as 'low' | 'medium' | 'high')}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Priorität" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Niedrig</SelectItem>
                  <SelectItem value="medium">Mittel</SelectItem>
                  <SelectItem value="high">Hoch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Fälligkeitsdatum</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newTaskDate ? format(newTaskDate, 'P', { locale: de }) : "Datum wählen"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newTaskDate}
                    onSelect={setNewTaskDate}
                    locale={de}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Button onClick={handleSubmit} className="w-full">
            Aufgabe erstellen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskForm;
