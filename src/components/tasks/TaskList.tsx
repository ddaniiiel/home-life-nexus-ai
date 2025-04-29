
import React from 'react';
import TaskItem, { Task } from './TaskItem';

interface FamilyMember {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  email?: string;
}

interface TaskListProps {
  tasks: Task[];
  familyMembers: FamilyMember[];
  onToggleStatus: (id: number) => void;
  onAssignTask: (taskId: number, memberId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks,
  familyMembers,
  onToggleStatus,
  onAssignTask
}) => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            familyMembers={familyMembers}
            onToggleStatus={onToggleStatus}
            onAssignTask={onAssignTask}
          />
        ))
      ) : (
        <div className="py-8 text-center text-gray-500">
          Keine Aufgaben gefunden.
        </div>
      )}
    </div>
  );
};

export default TaskList;
