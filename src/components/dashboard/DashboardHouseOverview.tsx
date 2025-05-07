
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Thermometer, Shield, Droplets, Lightbulb, Wifi, BellRing, Power, Lock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  image: string;
  status: string;
  lastActive: string;
}

interface DashboardHouseOverviewProps {
  familyMembers: FamilyMember[];
}

const DashboardHouseOverview: React.FC<DashboardHouseOverviewProps> = ({ familyMembers }) => {
  return (
    <Card className="mb-6 overflow-hidden border-green-100 dark:border-green-800 shadow-md">
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="House Overview" 
          className="w-full h-72 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="text-white mb-2">
            <h2 className="text-2xl font-bold">Musterstraße 123</h2>
            <div className="flex items-center">
              <Badge className="bg-green-500 mr-2">Alles OK</Badge>
              <p className="text-white/90">Letzte Prüfung: Heute 08:15</p>
            </div>
          </div>
          
          {/* Family members integrated into house overview */}
          <div className="flex items-center mb-4">
            <p className="text-white text-sm mr-3">Bewohner:</p>
            <div className="flex -space-x-2">
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
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4" align="center">
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
                      <Link to={`/family/${member.id}`} className="w-full flex items-center justify-between text-sm text-green-600 hover:underline">
                        <span>Details ansehen</span>
                      </Link>
                    </div>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-md p-2 flex items-center">
              <Thermometer className="h-4 w-4 text-white mr-2" />
              <span className="text-sm text-white">22°C innen</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-md p-2 flex items-center">
              <Shield className="h-4 w-4 text-white mr-2" />
              <span className="text-sm text-white">Alarm aktiv</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-md p-2 flex items-center">
              <Droplets className="h-4 w-4 text-white mr-2" />
              <span className="text-sm text-white">Luftfeuchtigkeit 45%</span>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 text-green-700">Hausübersicht</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <Link to="/smart-home" className="block">
            <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-green-50 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="bg-green-100 dark:bg-green-800/30 rounded-full p-2">
                  <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-sm font-medium">Beleuchtung</p>
              <p className="text-xs text-gray-500">3 aktiv</p>
            </div>
          </Link>
          
          <Link to="/smart-home" className="block">
            <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-green-50 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="bg-green-100 dark:bg-green-800/30 rounded-full p-2">
                  <Thermometer className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-sm font-medium">Heizung</p>
              <p className="text-xs text-gray-500">22°C • Eco-Modus</p>
            </div>
          </Link>
          
          <Link to="/smart-home" className="block">
            <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-green-50 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="bg-green-100 dark:bg-green-800/30 rounded-full p-2">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-sm font-medium">Sicherheit</p>
              <p className="text-xs text-gray-500">Alarm scharf</p>
            </div>
          </Link>
          
          <Link to="/smart-home" className="block">
            <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-green-50 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="bg-green-100 dark:bg-green-800/30 rounded-full p-2">
                  <Wifi className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-sm font-medium">Internet</p>
              <p className="text-xs text-gray-500">250 Mbps • Stabil</p>
            </div>
          </Link>
          
          <Link to="/smart-home" className="block">
            <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-green-50 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="bg-green-100 dark:bg-green-800/30 rounded-full p-2">
                  <BellRing className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-sm font-medium">Türklingel</p>
              <p className="text-xs text-gray-500">2 Ereignisse heute</p>
            </div>
          </Link>
          
          <Link to="/smart-home" className="block">
            <div className="border border-green-100 dark:border-green-800 rounded-lg p-3 text-center hover:bg-green-50 transition-colors">
              <div className="flex justify-center mb-2">
                <div className="bg-green-100 dark:bg-green-800/30 rounded-full p-2">
                  <Power className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-sm font-medium">Energie</p>
              <p className="text-xs text-gray-500">4.2 kWh heute</p>
            </div>
          </Link>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-green-50 dark:bg-green-800/20 rounded-lg">
            <div className="mr-3 p-2 bg-white rounded-full">
              <Lock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Alle Türen gesichert</p>
              <p className="text-xs text-gray-500">Letzte Aktivität: 08:45 Uhr</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-green-50 dark:bg-green-800/20 rounded-lg">
            <div className="mr-3 p-2 bg-white rounded-full">
              <Droplets className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Kein Wasserverlust</p>
              <p className="text-xs text-gray-500">Aktueller Verbrauch: Normal</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-green-50 dark:bg-green-800/20 rounded-lg">
            <div className="mr-3 p-2 bg-white rounded-full">
              <Wifi className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">12 Geräte verbunden</p>
              <p className="text-xs text-gray-500">Netzwerk: Optimal</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHouseOverview;
