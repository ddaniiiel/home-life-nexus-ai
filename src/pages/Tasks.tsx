
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { List, Check, Plus, Filter, Calendar as CalendarIcon, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppleRemindersSync from '@/components/AppleRemindersSync';
import BringAppSync from '@/components/BringAppSync';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';

interface FamilyMember {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  email?: string;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  list?: string;
  synced?: boolean;
  assignedTo?: FamilyMember;
}

const Tasks = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [familyMembers] = useState<FamilyMember[]>([
    { id: 1, name: 'Max Mustermann', initials: 'MM', email: 'max@example.com' },
    { id: 2, name: 'Anna Mustermann', initials: 'AM', email: 'anna@example.com' },
    { id: 3, name: 'Tim Mustermann', initials: 'TM', email: 'tim@example.com' },
    { id: 4, name: 'Lea Mustermann', initials: 'LM', email: 'lea@example.com' },
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Wäsche waschen', completed: false, priority: 'medium', dueDate: '2025-05-01', list: 'Haushalt', synced: true, assignedTo: familyMembers[1] },
    { id: 2, title: 'Einkaufen gehen', completed: false, priority: 'high', dueDate: '2025-04-29', list: 'Einkaufen', synced: true, assignedTo: familyMembers[0] },
    { id: 3, title: 'Rechnungen bezahlen', completed: true, priority: 'high', dueDate: '2025-04-25', list: 'Finanzen', assignedTo: familyMembers[0] },
    { id: 4, title: 'Pflanzen gießen', completed: false, priority: 'low', dueDate: '2025-04-30', list: 'Haushalt', synced: true, assignedTo: familyMembers[2] },
    { id: 5, title: 'Batterie Rauchmelder prüfen', completed: false, priority: 'medium', dueDate: '2025-05-10', list: 'Haushalt', assignedTo: familyMembers[3] },
    { id: 6, title: 'Müll rausbringen', completed: false, priority: 'medium', dueDate: '2025-04-28', list: 'Haushalt', synced: true, assignedTo: familyMembers[2] },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskDate, setNewTaskDate] = useState<Date>();
  const [newTaskList, setNewTaskList] = useState('Haushalt');
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>('');
  const [filter, setFilter] = useState('all');

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    toast({
      title: "Aufgabe aktualisiert",
      description: "Der Status der Aufgabe wurde aktualisiert.",
    });
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const assignee = newTaskAssignee 
      ? familyMembers.find(member => member.id === parseInt(newTaskAssignee)) 
      : undefined;

    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
      priority: newTaskPriority,
      dueDate: newTaskDate ? format(newTaskDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      list: newTaskList,
      assignedTo: assignee
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskPriority('medium');
    setNewTaskDate(undefined);
    setNewTaskAssignee('');
    
    toast({
      title: "Aufgabe erstellt",
      description: `${newTask.title} wurde erstellt und ${assignee ? 'an ' + assignee.name + ' zugewiesen' : 'niemandem zugewiesen'}.`,
    });
  };

  const assignTask = (taskId: number, memberId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            assignedTo: memberId 
              ? familyMembers.find(member => member.id === parseInt(memberId)) 
              : undefined 
          } 
        : task
    ));
    
    toast({
      title: "Aufgabe zugewiesen",
      description: memberId 
        ? `Die Aufgabe wurde ${familyMembers.find(member => member.id === parseInt(memberId))?.name} zugewiesen.` 
        : "Die Zuweisung wurde entfernt.",
    });
  };

  const taskLists = ['Haushalt', 'Einkaufen', 'Finanzen', 'Arbeit', 'Persönlich'];
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'today') {
      const today = format(new Date(), 'yyyy-MM-dd');
      return task.dueDate === today;
    }
    if (filter === 'upcoming') {
      const today = new Date();
      const taskDate = new Date(task.dueDate);
      return taskDate > today;
    }
    if (filter === 'overdue') {
      const today = new Date();
      const taskDate = new Date(task.dueDate);
      return taskDate < today && !task.completed;
    }
    if (familyMembers.some(member => member.id === parseInt(filter))) {
      return task.assignedTo?.id === parseInt(filter);
    }
    if (taskLists.includes(filter)) {
      return task.list === filter;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className="md:ml-64 pt-16 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-homepilot-primary bg-opacity-10 p-3 rounded-full mr-4">
              <List className="h-8 w-8 text-homepilot-primary" />
            </div>
            <h1 className="text-3xl font-bold">Aufgaben</h1>
          </div>
          
          <Tabs defaultValue="tasks" className="space-y-8">
            <TabsList>
              <TabsTrigger value="tasks">Aufgaben</TabsTrigger>
              <TabsTrigger value="sync">Synchronisation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Aufgabenliste</h2>
                  
                  <div className="flex gap-2">
                    <Select defaultValue="all" onValueChange={setFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle Aufgaben</SelectItem>
                        <SelectItem value="pending">Ausstehend</SelectItem>
                        <SelectItem value="completed">Erledigt</SelectItem>
                        <SelectItem value="today">Heute</SelectItem>
                        <SelectItem value="upcoming">Anstehend</SelectItem>
                        <SelectItem value="overdue">Überfällig</SelectItem>
                        <SelectItem value="Haushalt">Haushalt</SelectItem>
                        <SelectItem value="Einkaufen">Einkaufen</SelectItem>
                        <SelectItem value="Finanzen">Finanzen</SelectItem>
                        
                        {/* Family member filters */}
                        <SelectItem disabled className="font-semibold text-gray-500">
                          Familienmitglieder
                        </SelectItem>
                        {familyMembers.map(member => (
                          <SelectItem 
                            key={member.id} 
                            value={member.id.toString()}
                            className="flex items-center"
                          >
                            <span>{member.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Dialog>
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
                          
                          <Button onClick={addTask} className="w-full">
                            Aufgabe erstellen
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <div key={task.id} className={`py-4 flex items-center ${task.completed ? 'opacity-60' : ''}`}>
                        <button 
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border ${
                            task.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-300 dark:border-gray-600'
                          } mr-4 flex items-center justify-center`}
                        >
                          {task.completed && <Check className="h-4 w-4" />}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className={`text-base ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                              {task.title}
                            </p>
                            {task.synced && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                                Synced
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-3">Fällig: {format(new Date(task.dueDate), 'P', { locale: de })}</span>
                            {task.list && <span className="mr-3">Liste: {task.list}</span>}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <Select 
                            value={task.assignedTo ? task.assignedTo.id.toString() : ''} 
                            onValueChange={(value) => assignTask(task.id, value)}
                          >
                            <SelectTrigger className="w-40 h-8">
                              <SelectValue placeholder="Nicht zugewiesen">
                                {task.assignedTo ? (
                                  <div className="flex items-center">
                                    <Avatar className="h-5 w-5 mr-1">
                                      <AvatarImage src={task.assignedTo.avatar} />
                                      <AvatarFallback className="text-xs bg-homepilot-primary/10 text-homepilot-primary">
                                        {task.assignedTo.initials}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm truncate">{task.assignedTo.name}</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Zuweisen</span>
                                  </div>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-2" />
                                  <span>Nicht zugewiesen</span>
                                </div>
                              </SelectItem>
                              {familyMembers.map(member => (
                                <SelectItem 
                                  key={member.id} 
                                  value={member.id.toString()}
                                >
                                  <div className="flex items-center">
                                    <Avatar className="h-5 w-5 mr-2">
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                                    </Avatar>
                                    <span>{member.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <span className={`inline-block px-2 py-1 text-xs rounded-full
                            ${task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`
                          }>
                            {task.priority === 'high' ? 'Hoch' : 
                            task.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      Keine Aufgaben gefunden.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sync">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AppleRemindersSync />
                <BringAppSync />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
