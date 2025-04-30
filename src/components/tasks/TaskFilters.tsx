
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FamilyMember {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  email?: string;
}

interface TaskFiltersProps {
  familyMembers: FamilyMember[];
  taskLists: string[];
  currentFilter: string;
  onFilterChange: (value: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  familyMembers,
  taskLists,
  currentFilter,
  onFilterChange
}) => {
  return (
    <Select value={currentFilter} onValueChange={onFilterChange}>
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

        {taskLists.map(list => (
          <SelectItem key={list} value={list}>{list}</SelectItem>
        ))}
        
        {/* Replace the disabled header item with a proper separator and label */}
        <SelectItem value="family-header-separator" disabled className="font-semibold text-gray-500 cursor-default pointer-events-none">
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
  );
};

export default TaskFilters;
