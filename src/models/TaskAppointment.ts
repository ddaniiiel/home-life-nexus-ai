
import { format } from 'date-fns';

// SubTask interface for complex tasks with sub-components
export interface SubTask {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: Date;
}

// Common types for both tasks and appointments
export type Priority = 'high' | 'medium' | 'low';
export type Status = 'upcoming' | 'inProgress' | 'completed' | 'overdue' | 'cancelled';
export type RecurrencePattern = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

// Base properties shared by both tasks and appointments
export interface BaseItem {
  id: number;
  title: string;
  description?: string;
  status: Status;
  priority?: Priority;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  color?: string;
}

// Task specific properties
export interface Task extends BaseItem {
  dueDate?: Date;
  reminderDate?: Date;
  estimatedDuration?: number; // in minutes
  listId?: number;
  assignedToId?: number;
  linkedAppointmentIds?: number[];
  recurrence?: RecurrencePattern;
  recurrenceEndDate?: Date;
  subtasks?: SubTask[];
  completed: boolean;
}

// Appointment specific properties
export interface Appointment extends BaseItem {
  startDate: Date;
  endDate: Date;
  location?: string;
  attendees?: {
    id: number;
    name: string;
    email?: string;
    confirmed: boolean;
  }[];
  linkedTaskIds?: number[];
  recurrence?: RecurrencePattern;
  recurrenceEndDate?: Date;
  calendarId?: number;
  weatherDependent?: boolean;
  transportNeeded?: boolean;
  relevantDocuments?: string[];
}

// Helper functions for sorting and filtering
export const sortByDate = (a: { startDate?: Date, dueDate?: Date }, b: { startDate?: Date, dueDate?: Date }) => {
  const dateA = a.startDate || a.dueDate || new Date();
  const dateB = b.startDate || b.dueDate || new Date();
  return dateA.getTime() - dateB.getTime();
};

export const sortByPriority = (a: { priority?: Priority }, b: { priority?: Priority }) => {
  const priorityValues: Record<Priority | undefined, number> = {
    'high': 0,
    'medium': 1,
    'low': 2,
    undefined: 3
  };
  
  return (priorityValues[a.priority] || 3) - (priorityValues[b.priority] || 3);
};

export const filterUpcoming = (items: (Task | Appointment)[]) => {
  const now = new Date();
  
  return items.filter(item => {
    if ('startDate' in item) {
      return item.startDate >= now;
    } else if (item.dueDate) {
      return item.dueDate >= now;
    }
    return false;
  });
};

// Format functions for consistent display
export const formatDate = (date?: Date) => {
  if (!date) return '';
  return format(date, 'dd.MM.yyyy');
};

export const formatTime = (date?: Date) => {
  if (!date) return '';
  return format(date, 'HH:mm');
};

export const formatDateTime = (date?: Date) => {
  if (!date) return '';
  return format(date, 'dd.MM.yyyy HH:mm');
};

// Function to check for scheduling conflicts
export const checkForConflicts = (appointments: Appointment[]): Appointment[][] => {
  const conflicts: Appointment[][] = [];
  
  // Sort appointments chronologically
  const sortedAppointments = [...appointments].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  
  for (let i = 0; i < sortedAppointments.length - 1; i++) {
    const current = sortedAppointments[i];
    
    for (let j = i + 1; j < sortedAppointments.length; j++) {
      const next = sortedAppointments[j];
      
      // Check if there's an overlap
      if (current.endDate > next.startDate && current.startDate < next.endDate) {
        // Found conflict
        const existingConflictGroup = conflicts.find(group => 
          group.some(app => app.id === current.id || app.id === next.id)
        );
        
        if (existingConflictGroup) {
          // Add to existing conflict group if not already included
          if (!existingConflictGroup.some(app => app.id === current.id)) {
            existingConflictGroup.push(current);
          }
          if (!existingConflictGroup.some(app => app.id === next.id)) {
            existingConflictGroup.push(next);
          }
        } else {
          // Create new conflict group
          conflicts.push([current, next]);
        }
      }
    }
  }
  
  return conflicts;
};
