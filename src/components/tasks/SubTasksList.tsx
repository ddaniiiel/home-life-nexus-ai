
import React, { useState } from 'react';
import { CheckCircle2, Circle, GripVertical, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubTask } from '@/models/TaskAppointment';
import { cn } from '@/lib/utils';

// Import DragDropContext if you want to implement drag and drop
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface SubTasksListProps {
  subtasks: SubTask[];
  onAdd: (title: string) => void;
  onUpdate: (id: number, updates: Partial<SubTask>) => void;
  onDelete: (id: number) => void;
  onReorder?: (startIndex: number, endIndex: number) => void;
  className?: string;
}

const SubTasksList: React.FC<SubTasksListProps> = ({
  subtasks,
  onAdd,
  onUpdate,
  onDelete,
  onReorder,
  className
}) => {
  const [newSubTaskTitle, setNewSubTaskTitle] = useState('');
  
  const handleAddSubTask = () => {
    if (newSubTaskTitle.trim()) {
      onAdd(newSubTaskTitle);
      setNewSubTaskTitle('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSubTask();
    }
  };
  
  // The onReorder implementation would go here if using react-beautiful-dnd
  
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Unteraufgaben</h3>
        <span className="text-xs text-gray-500">
          {subtasks.filter(st => st.completed).length}/{subtasks.length} erledigt
        </span>
      </div>
      
      {subtasks.length > 0 ? (
        <div className="space-y-1">
          {subtasks.map((subtask, index) => (
            <div 
              key={subtask.id}
              className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800 group"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={() => onUpdate(subtask.id, { completed: !subtask.completed })}
              >
                {subtask.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-400" />
                )}
              </Button>
              
              <Input 
                value={subtask.title}
                onChange={(e) => onUpdate(subtask.id, { title: e.target.value })}
                className={cn(
                  "border-none bg-transparent focus-visible:ring-0 px-2 py-0 h-7",
                  subtask.completed && "line-through text-gray-400"
                )}
              />
              
              <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                {onReorder && (
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-grab">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0 text-gray-400 hover:text-red-500" 
                  onClick={() => onDelete(subtask.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-2 border border-dashed rounded-md text-sm text-gray-500">
          Keine Unteraufgaben vorhanden
        </div>
      )}
      
      <div className="flex items-center mt-2">
        <Input
          placeholder="Neue Unteraufgabe hinzufügen..."
          value={newSubTaskTitle}
          onChange={(e) => setNewSubTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-2" 
          onClick={handleAddSubTask}
          disabled={!newSubTaskTitle.trim()}
        >
          <Plus className="h-4 w-4 mr-1" /> Hinzufügen
        </Button>
      </div>
    </div>
  );
};

export default SubTasksList;
