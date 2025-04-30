
import React from 'react';
import { Check, User } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FamilyMember {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  email?: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  list?: string;
  synced?: boolean;
  assignedTo?: FamilyMember;
}

interface TaskItemProps {
  task: Task;
  familyMembers: FamilyMember[];
  onToggleStatus: (id: number) => void;
  onAssignTask: (taskId: number, memberId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  familyMembers,
  onToggleStatus,
  onAssignTask
}) => {
  return (
    <div key={task.id} className={`py-4 flex items-center ${task.completed ? 'opacity-60' : ''}`}>
      <button 
        onClick={() => onToggleStatus(task.id)}
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
          value={task.assignedTo ? task.assignedTo.id.toString() : "unassigned"} 
          onValueChange={(value) => onAssignTask(task.id, value === "unassigned" ? "" : value)}
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
            <SelectItem value="unassigned">
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
  );
};

export default TaskItem;
