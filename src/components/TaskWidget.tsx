
import React, { useState } from 'react';
import { List, Check, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Widget from './Widget';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskWidget = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Müll rausbringen', completed: false },
    { id: 2, title: 'Pflanzen gießen', completed: true },
    { id: 3, title: 'Batterie Rauchmelder prüfen', completed: false },
    { id: 4, title: 'Einkaufsliste erstellen', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Widget title="Aufgaben" icon={<List className="h-5 w-5" />}>
      <div className="space-y-2">
        {tasks.slice(0, 4).map((task) => (
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
              className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}
            >
              {task.title}
            </label>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t">
          <Button variant="ghost" size="sm" className="w-full flex items-center justify-center text-xs">
            <Plus className="h-3 w-3 mr-2" />
            Aufgabe hinzufügen
          </Button>
        </div>
      </div>
    </Widget>
  );
};

export default TaskWidget;
