
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { List, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Tasks = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Wäsche waschen', completed: false, priority: 'medium', dueDate: '2025-05-01' },
    { id: 2, title: 'Einkaufen gehen', completed: false, priority: 'high', dueDate: '2025-04-29' },
    { id: 3, title: 'Rechnungen bezahlen', completed: true, priority: 'high', dueDate: '2025-04-25' },
    { id: 4, title: 'Pflanzen gießen', completed: false, priority: 'low', dueDate: '2025-04-30' },
  ]);

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

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
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Aufgabenliste</h2>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" /> Neue Aufgabe
              </Button>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {tasks.map((task) => (
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
                    <p className={`text-base ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">Fällig: {task.dueDate}</p>
                  </div>
                  
                  <div className="flex-shrink-0">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
