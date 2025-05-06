
import React, { useState } from 'react';
import { CheckCircle2, Circle, GripVertical, Trash2, Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubTask } from '@/models/TaskAppointment';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

// Import DragDropContext if you want to implement drag and drop
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface SubTasksListProps {
  subtasks: SubTask[];
  onAdd: (title: string) => void;
  onUpdate: (id: number, updates: Partial<SubTask>) => void;
  onDelete: (id: number) => void;
  onReorder?: (startIndex: number, endIndex: number) => void;
  className?: string;
  showNewItemForm?: boolean;
}

const SubTasksList: React.FC<SubTasksListProps> = ({
  subtasks,
  onAdd,
  onUpdate,
  onDelete,
  onReorder,
  className,
  showNewItemForm = true
}) => {
  const [newSubTaskTitle, setNewSubTaskTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const handleAddSubTask = () => {
    if (newSubTaskTitle.trim()) {
      onAdd(newSubTaskTitle);
      setNewSubTaskTitle('');
      toast({
        title: "Unteraufgabe hinzugefügt",
        description: `"${newSubTaskTitle}" wurde zur Aufgabenliste hinzugefügt.`,
      });
      
      if (!showNewItemForm) {
        setShowAddForm(false);
      }
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSubTask();
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      setTimeout(() => {
        const inputElement = document.getElementById('new-subtask-input');
        if (inputElement) {
          inputElement.focus();
        }
      }, 100);
    }
  };
  
  // The onReorder implementation would go here if using react-beautiful-dnd
  
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center">
          Unteraufgaben
          <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
            {subtasks.filter(st => st.completed).length}/{subtasks.length}
          </span>
        </h3>
        
        {!showNewItemForm && !showAddForm && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleAddForm} 
            className="text-xs h-7 px-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Neue Unteraufgabe
          </Button>
        )}
      </div>
      
      {subtasks.length > 0 ? (
        <div className="space-y-1">
          {subtasks.map((subtask, index) => (
            <div 
              key={subtask.id}
              className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800 group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={() => {
                  onUpdate(subtask.id, { completed: !subtask.completed });
                  toast({
                    title: subtask.completed ? "Unteraufgabe als offen markiert" : "Unteraufgabe erledigt",
                    description: `"${subtask.title}" wurde als ${subtask.completed ? 'offen' : 'erledigt'} markiert.`,
                  });
                }}
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
                onBlur={(e) => {
                  if (!e.target.value.trim()) {
                    onUpdate(subtask.id, { title: "Neue Unteraufgabe" });
                    toast({
                      variant: "destructive",
                      title: "Feld darf nicht leer sein",
                      description: "Der Titel wurde auf 'Neue Unteraufgabe' zurückgesetzt.",
                    });
                  }
                }}
                className={cn(
                  "border-none bg-transparent focus-visible:ring-1 focus-visible:ring-offset-0 px-2 py-0 h-7 text-sm",
                  subtask.completed && "line-through text-gray-400"
                )}
              />
              
              {subtask.createdAt && (
                <span className="text-xs text-gray-400 ml-2 hidden sm:inline-block">
                  {new Date(subtask.createdAt).toLocaleDateString('de-DE')}
                </span>
              )}
              
              <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                {onReorder && (
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-grab">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" 
                  onClick={() => {
                    onDelete(subtask.id);
                    toast({
                      title: "Unteraufgabe gelöscht",
                      description: `"${subtask.title}" wurde entfernt.`,
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-3 border border-dashed rounded-md text-sm text-gray-500">
          <AlertCircle className="h-5 w-5 mx-auto mb-1 opacity-50" />
          Keine Unteraufgaben vorhanden
        </div>
      )}
      
      {(showNewItemForm || showAddForm) && (
        <div className="flex items-center mt-2">
          <Input
            id="new-subtask-input"
            placeholder="Neue Unteraufgabe hinzufügen..."
            value={newSubTaskTitle}
            onChange={(e) => setNewSubTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-sm"
            autoFocus={showAddForm}
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
          
          {!showNewItemForm && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-1 text-gray-500" 
              onClick={() => setShowAddForm(false)}
            >
              Abbrechen
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SubTasksList;
