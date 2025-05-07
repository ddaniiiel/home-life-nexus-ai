
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import UnifiedDashboard from './UnifiedDashboard';
import { Task, Appointment } from '@/models/TaskAppointment';

interface DashboardTasksAppointmentsProps {
  tasks: Task[];
  appointments: Appointment[];
  hasConflicts: boolean;
  onTaskComplete: (id: number) => void;
  onTaskSelect: (id: number) => void;
  onAppointmentSelect: (id: number) => void;
}

const DashboardTasksAppointments: React.FC<DashboardTasksAppointmentsProps> = ({
  tasks,
  appointments,
  hasConflicts,
  onTaskComplete,
  onTaskSelect,
  onAppointmentSelect
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-700">Aufgaben & Termine</h2>
        {hasConflicts && (
          <Badge variant="destructive" className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Terminkonflikt gefunden
          </Badge>
        )}
      </div>
      
      <Card className="border-green-100 dark:border-green-800 shadow-md">
        {/* Unified Dashboard showing tasks and appointments together */}
        <CardContent className="p-0">
          <UnifiedDashboard
            tasks={tasks}
            appointments={appointments}
            onTaskComplete={onTaskComplete}
            onTaskSelect={onTaskSelect}
            onAppointmentSelect={onAppointmentSelect}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTasksAppointments;
