
import React, { useState } from 'react';
import { List, Check, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Widget from './Widget';
import { Task } from '@/components/tasks/TaskItem';
import { format } from 'date-fns';

interface FamilyMember {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  email?: string;
}

const TaskWidget = () => {
  const [familyMembers] = useState<FamilyMember[]>([
    { id: 1, name: 'Max Mustermann', initials: 'MM', email: 'max@example.com' },
    { id: 2, name: 'Anna Mustermann', initials: 'AM', email: 'anna@example.com' },
    { id: 3, name: 'Tim Mustermann', initials: 'TM', email: 'tim@example.com' },
    { id: 4, name: 'Lea Mustermann', initials: 'LM', email: 'lea@example.com' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Müll rausbringen', completed: false, priority: 'medium', dueDate: format(new Date(), 'yyyy-MM-dd'), list: 'Haushalt', assignedTo: familyMembers[0] },
    { id: 2, title: 'Pflanzen gießen', completed: true, priority: 'low', dueDate: format(new Date(), 'yyyy-MM-dd'), list: 'Haushalt', assignedTo: familyMembers[1] },
    { id: 3, title: 'Batterie Rauchmelder prüfen', completed: false, priority: 'high', dueDate: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'), list: 'Haushalt', assignedTo: familyMembers[2] },
    { id: 4, title: 'Einkaufsliste erstellen', completed: false, priority: 'medium', dueDate: format(new Date(Date.now() - 86400000), 'yyyy-MM-dd'), list: 'Einkaufen', assignedTo: familyMembers[3] },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const currentUser = familyMembers[0]; // In a real app, this would be the logged-in user
  const myTasks = tasks.filter(task => task.assignedTo?.id === currentUser.id);

  return (
    <Widget title="Meine Aufgaben" icon={<List className="h-5 w-5" />}>
      <div className="space-y-2">
        {myTasks.length > 0 ? (
          myTasks.slice(0, 4).map((task) => (
            <div
              key={task.id}
              className="flex items-center space-x-2 py-1"
            >
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}
              >
                {task.title}
              </label>
              {task.assignedTo && (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignedTo.avatar} />
                  <AvatarFallback className="bg-homepilot-primary/10 text-homepilot-primary text-xs">
                    {task.assignedTo.initials}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">Keine Aufgaben für dich vorhanden.</p>
        )}
        <div className="mt-2 pt-2 border-t">
          <Button variant="ghost" size="sm" className="w-full flex items-center justify-center text-xs" asChild>
            <a href="/tasks">
              <Plus className="h-3 w-3 mr-2" />
              Alle Aufgaben anzeigen
            </a>
          </Button>
        </div>
      </div>
    </Widget>
  );
};

export default TaskWidget;
