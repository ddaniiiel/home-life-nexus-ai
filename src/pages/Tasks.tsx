import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { List } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';

// Import refactored components
import TaskList from '@/components/tasks/TaskList';
import NewTaskForm from '@/components/tasks/NewTaskForm';
import TaskFilters from '@/components/tasks/TaskFilters';
import SyncTabs from '@/components/tasks/SyncTabs';
import { Task } from '@/components/tasks/TaskItem';

interface FamilyMember {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  email?: string;
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

  const [filter, setFilter] = useState('all');
  const taskLists = ['Haushalt', 'Einkaufen', 'Finanzen', 'Arbeit', 'Persönlich'];

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    toast({
      title: "Aufgabe aktualisiert",
      description: "Der Status der Aufgabe wurde aktualisiert.",
    });
  };

  const addTask = (
    title: string,
    priority: 'low' | 'medium' | 'high',
    dueDate: Date | undefined,
    list: string,
    assigneeId: string
  ) => {
    if (!title.trim()) return;

    const assignee = assigneeId 
      ? familyMembers.find(member => member.id === parseInt(assigneeId)) 
      : undefined;

    const newTask: Task = {
      id: tasks.length + 1,
      title: title,
      completed: false,
      priority: priority,
      dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      list: list,
      assignedTo: assignee
    };

    setTasks([...tasks, newTask]);
    
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
              // Use null comparison to handle empty strings properly
              ? familyMembers.find(member => member.id === parseInt(memberId)) 
              : undefined 
          } 
        : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    const member = memberId ? familyMembers.find(m => m.id === parseInt(memberId)) : null;
    
    toast({
      title: "Aufgabe zugewiesen",
      description: memberId && member
        ? `Die Aufgabe "${task?.title}" wurde ${member.name} zugewiesen.` 
        : `Die Zuweisung für "${task?.title}" wurde entfernt.`,
    });
  };
  
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
    
    // Wenn filter eine Zahl ist (als String), dann nach Familienmitglied filtern
    if (filter.match(/^\d+$/)) {
      const memberId = parseInt(filter);
      return task.assignedTo?.id === memberId;
    }
    
    // Nach Liste filtern
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
                    <TaskFilters 
                      familyMembers={familyMembers} 
                      taskLists={taskLists}
                      currentFilter={filter}
                      onFilterChange={setFilter}
                    />
                    
                    <NewTaskForm 
                      familyMembers={familyMembers}
                      taskLists={taskLists}
                      onAddTask={addTask}
                    />
                  </div>
                </div>
                
                <TaskList 
                  tasks={filteredTasks}
                  familyMembers={familyMembers}
                  onToggleStatus={toggleTaskStatus}
                  onAssignTask={assignTask}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="sync">
              <SyncTabs />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
