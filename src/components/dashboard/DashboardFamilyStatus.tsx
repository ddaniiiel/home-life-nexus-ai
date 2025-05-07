
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  image: string;
  status: string;
  lastActive: string;
}

interface DashboardFamilyStatusProps {
  familyMembers: FamilyMember[];
}

const DashboardFamilyStatus: React.FC<DashboardFamilyStatusProps> = ({ familyMembers }) => {
  return (
    <div className="fixed top-16 right-4 z-20 flex items-center space-x-2">
      {familyMembers.map((member) => (
        <Popover key={member.id}>
          <PopoverTrigger asChild>
            <button className="relative group">
              <div className={`w-8 h-8 rounded-full overflow-hidden border-2 ${
                member.status === 'Zuhause' 
                  ? 'border-green-500' 
                  : member.status === 'Im Büro' || member.status === 'In der Schule'
                    ? 'border-blue-500'
                    : 'border-yellow-500'
              }`}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
                member.status === 'Zuhause' 
                  ? 'bg-green-500' 
                  : member.status === 'Im Büro' || member.status === 'In der Schule'
                    ? 'bg-blue-500'
                    : 'bg-yellow-500'
              } border border-white`}></div>
              <span className="absolute -bottom-1 -left-1 transform scale-0 group-hover:scale-100 transition-transform whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                {member.name}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4" align="end">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status:</span>
                <Badge className={
                  member.status === 'Zuhause' 
                    ? 'bg-green-500' 
                    : member.status === 'Im Büro' || member.status === 'In der Schule'
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
                }>
                  {member.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-500">Aktiv:</span>
                <span className="text-sm">{member.lastActive}</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link to={`/family/${member.id}`} className="w-full">
                <Button size="sm" variant="outline" className="w-full flex items-center justify-between">
                  <span>Details ansehen</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default DashboardFamilyStatus;
