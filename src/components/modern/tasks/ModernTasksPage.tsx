
import React, { useState } from 'react';
import { 
  CheckSquare, Plus, Calendar, User, Clock, 
  AlertCircle, Filter, Search, MoreHorizontal,
  Star, Flag, Repeat, Archive
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  assignee: string;
  dueDate: string;
  category: string;
  isRecurring: boolean;
  isStarred: boolean;
}

const ModernTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Stromrechnung zahlen',
      description: 'Monatliche Stromrechnung bis zum 25. begleichen',
      priority: 'high',
      status: 'todo',
      assignee: 'Thomas',
      dueDate: '2025-01-25',
      category: 'Finanzen',
      isRecurring: true,
      isStarred: true,
    },
    {
      id: '2',
      title: 'Auto zur Inspektion bringen',
      description: 'Jährliche Inspektion im Autohaus vereinbaren',
      priority: 'medium',
      status: 'todo',
      assignee: 'Lisa',
      dueDate: '2025-02-10',
      category: 'Fahrzeug',
      isRecurring: false,
      isStarred: false,
    },
    {
      id: '3',
      title: 'Weihnachtsgeschenke kaufen',
      description: 'Geschenke für die Familie besorgen',
      priority: 'low',
      status: 'in-progress',
      assignee: 'Emma',
      dueDate: '2025-01-20',
      category: 'Familie',
      isRecurring: false,
      isStarred: false,
    },
    {
      id: '4',
      title: 'Heizung warten lassen',
      description: 'Jährliche Wartung der Heizungsanlage',
      priority: 'medium',
      status: 'completed',
      assignee: 'Thomas',
      dueDate: '2025-01-15',
      category: 'Haushalt',
      isRecurring: true,
      isStarred: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAssignee, setSelectedAssignee] = useState('all');

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed' }
        : task
    ));
  };

  const toggleStar = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isStarred: !task.isStarred } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'todo': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesAssignee = selectedAssignee === 'all' || task.assignee === selectedAssignee;
    
    return matchesSearch && matchesCategory && matchesAssignee;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    completed: filteredTasks.filter(task => task.status === 'completed'),
    starred: filteredTasks.filter(task => task.isStarred),
  };

  const stats = [
    { name: 'Zu erledigen', value: tasksByStatus.todo.length, icon: CheckSquare, color: 'bg-blue-500' },
    { name: 'In Bearbeitung', value: tasksByStatus['in-progress'].length, icon: Clock, color: 'bg-yellow-500' },
    { name: 'Erledigt', value: tasksByStatus.completed.length, icon: CheckSquare, color: 'bg-green-500' },
    { name: 'Favoriten', value: tasksByStatus.starred.length, icon: Star, color: 'bg-purple-500' },
  ];

  const categories = [...new Set(tasks.map(task => task.category))];
  const assignees = [...new Set(tasks.map(task => task.assignee))];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Aufgaben durchsuchen..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Kategorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Kategorien</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Zugewiesen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Personen</SelectItem>
                  {assignees.map(assignee => (
                    <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Neue Aufgabe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Alle</TabsTrigger>
          <TabsTrigger value="todo">Zu erledigen</TabsTrigger>
          <TabsTrigger value="in-progress">In Bearbeitung</TabsTrigger>
          <TabsTrigger value="completed">Erledigt</TabsTrigger>
          <TabsTrigger value="starred">Favoriten</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        checked={task.status === 'completed'}
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <CardTitle className={`text-sm ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </CardTitle>
                        <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleStar(task.id)}
                      >
                        <Star className={`h-3 w-3 ${task.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
                          <DropdownMenuItem>Duplizieren</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Löschen</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getPriorityColor(task.priority)}>
                      <Flag className="h-3 w-3 mr-1" />
                      {task.priority === 'high' ? 'Hoch' : task.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status === 'completed' ? 'Erledigt' : 
                       task.status === 'in-progress' ? 'In Bearbeitung' : 'Zu erledigen'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString('de-DE')}
                    </div>
                  </div>
                  {task.isRecurring && (
                    <div className="flex items-center text-xs text-blue-600">
                      <Repeat className="h-3 w-3 mr-1" />
                      Wiederkehrend
                    </div>
                  )}
                  <div className="pt-2">
                    <Badge variant="outline" className="text-xs">
                      {task.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {['todo', 'in-progress', 'completed', 'starred'].map(status => (
          <TabsContent key={status} value={status}>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {tasksByStatus[status as keyof typeof tasksByStatus].map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          checked={task.status === 'completed'}
                          onCheckedChange={() => toggleTaskStatus(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <CardTitle className={`text-sm ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </CardTitle>
                          <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => toggleStar(task.id)}
                        >
                          <Star className={`h-3 w-3 ${task.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(task.priority)}>
                        <Flag className="h-3 w-3 mr-1" />
                        {task.priority === 'high' ? 'Hoch' : task.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {task.assignee}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(task.dueDate).toLocaleDateString('de-DE')}
                      </div>
                    </div>
                    <div className="pt-2">
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ModernTasksPage;
