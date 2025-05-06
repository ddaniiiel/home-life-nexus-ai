import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Tag, RotateCw, ListTodo, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import RecurringTaskConfig from './RecurringTaskConfig';
import SubTasksList from './SubTasksList';
import { Task, Priority, RecurrencePattern, SubTask } from '@/models/TaskAppointment';

interface FamilyMember {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  email?: string;
}

interface EnhancedTaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Partial<Task>;
  onSave: (task: Partial<Task>) => void;
  familyMembers: FamilyMember[];
  taskLists: string[];
  allAppointments?: any[]; // We'll use the proper type when we implement the linking feature
}

const EnhancedTaskForm: React.FC<EnhancedTaskFormProps> = ({
  open,
  onOpenChange,
  task,
  onSave,
  familyMembers,
  taskLists,
  allAppointments = []
}) => {
  // Task state
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<Priority>(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(task?.dueDate);
  const [reminderDate, setReminderDate] = useState<Date | undefined>(task?.reminderDate);
  const [assignedToId, setAssignedToId] = useState<string>(task?.assignedToId?.toString() || '');
  const [listId, setListId] = useState(taskLists[0] || '');
  const [estimatedDuration, setEstimatedDuration] = useState(task?.estimatedDuration || 30);
  
  // Recurrence state
  const [recurrence, setRecurrence] = useState<RecurrencePattern>(task?.recurrence || 'none');
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date | undefined>(task?.recurrenceEndDate);
  const [customInterval, setCustomInterval] = useState(1);
  
  // Subtasks state
  const [subtasks, setSubtasks] = useState<SubTask[]>(task?.subtasks || []);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('basic');
  
  const handleAddSubTask = (title: string) => {
    const newSubTask: SubTask = {
      id: Date.now(), // Simple ID generation
      title,
      completed: false,
      createdAt: new Date()
    };
    
    setSubtasks([...subtasks, newSubTask]);
  };
  
  const handleUpdateSubTask = (id: number, updates: Partial<SubTask>) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, ...updates } : st));
  };
  
  const handleDeleteSubTask = (id: number) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };
  
  const handleReorderSubTasks = (startIndex: number, endIndex: number) => {
    const result = [...subtasks];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setSubtasks(result);
  };
  
  const handleSubmit = () => {
    if (!title.trim()) return;
    
    const updatedTask: Partial<Task> = {
      ...task,
      title,
      description,
      priority,
      dueDate,
      reminderDate,
      assignedToId: assignedToId ? parseInt(assignedToId) : undefined,
      listId: listId ? parseInt(listId) : undefined,
      estimatedDuration,
      recurrence,
      recurrenceEndDate: recurrence !== 'none' ? recurrenceEndDate : undefined,
      subtasks: subtasks.length > 0 ? subtasks : undefined,
      // Other fields will be added as we integrate more features
      status: task?.status || 'upcoming',
      completed: task?.completed || false
    };
    
    onSave(updatedTask);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task?.id ? 'Aufgabe bearbeiten' : 'Neue Aufgabe erstellen'}</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="basic">Basisdaten</TabsTrigger>
            <TabsTrigger value="advanced">Erweitert</TabsTrigger>
            <TabsTrigger value="subtasks">Unteraufgaben</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Was muss erledigt werden?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optionale Beschreibung der Aufgabe..."
                className="resize-none h-20"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priorität</Label>
                <Select 
                  value={priority} 
                  onValueChange={(value) => setPriority(value as Priority)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Priorität wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Niedrig</SelectItem>
                    <SelectItem value="medium">Mittel</SelectItem>
                    <SelectItem value="high">Hoch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="list">Liste</Label>
                <Select value={listId} onValueChange={setListId}>
                  <SelectTrigger id="list">
                    <SelectValue placeholder="Liste auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskLists.map((list, index) => (
                      <SelectItem key={index} value={list}>{list}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fälligkeitsdatum</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, 'P', { locale: de }) : "Datum wählen"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      locale={de}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assignee">Zugewiesen an</Label>
                <Select value={assignedToId} onValueChange={setAssignedToId}>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Familienmitglied auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {familyMembers.map(member => (
                      <SelectItem
                        key={member.id}
                        value={member.id.toString()}
                      >
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          {member.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Erinnerung</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {reminderDate ? format(reminderDate, 'P', { locale: de }) : "Erinnerung einrichten"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={reminderDate}
                      onSelect={setReminderDate}
                      locale={de}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Geschätzte Dauer (Minuten)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(parseInt(e.target.value) || 30)}
                />
              </div>
              
              <RecurringTaskConfig
                recurrence={recurrence}
                onRecurrenceChange={setRecurrence}
                endDate={recurrenceEndDate}
                onEndDateChange={setRecurrenceEndDate}
                customInterval={customInterval}
                onCustomIntervalChange={setCustomInterval}
                className="mt-6"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="subtasks" className="py-4">
            <SubTasksList
              subtasks={subtasks}
              onAdd={handleAddSubTask}
              onUpdate={handleUpdateSubTask}
              onDelete={handleDeleteSubTask}
              onReorder={handleReorderSubTasks}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            {task?.id ? 'Speichern' : 'Aufgabe erstellen'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedTaskForm;
