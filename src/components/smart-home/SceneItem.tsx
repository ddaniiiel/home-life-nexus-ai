
import React from 'react';
import { Button } from '@/components/ui/button';
import { QuickScene } from '../types/smart-home';
import { Skeleton } from '@/components/ui/skeleton';

interface SceneItemProps {
  scene: QuickScene;
  onClick?: () => void;
  isActive?: boolean;
  isLoading?: boolean;
  variant?: 'default' | 'outline' | 'colored';
}

const SceneItem = ({ 
  scene, 
  onClick,
  isActive = false,
  isLoading = false,
  variant = 'outline' 
}: SceneItemProps) => {
  const Icon = scene.icon;
  
  // Style-Konfiguration basierend auf Variante und aktivem Zustand
  const getIconContainerStyle = () => {
    if (variant === 'colored') {
      return "bg-gradient-to-br from-homepilot-primary/20 to-homepilot-secondary/20 text-homepilot-primary";
    }
    
    if (isActive) {
      return "bg-homepilot-primary text-white";
    }
    
    return "bg-homepilot-primary/10 text-homepilot-primary";
  };
  
  const getButtonStyle = () => {
    if (variant === 'default') {
      return isActive ? 
        "bg-homepilot-primary/10 hover:bg-homepilot-primary/20 border-homepilot-primary/30" :
        "hover:bg-homepilot-accent/10 border-homepilot-primary/20";
    }
    
    if (variant === 'colored') {
      return "bg-gradient-to-br from-homepilot-accent/5 to-homepilot-primary/5 hover:from-homepilot-accent/10 hover:to-homepilot-primary/10 border-homepilot-primary/20";
    }
    
    return isActive ?
      "bg-homepilot-accent/10 hover:bg-homepilot-accent/20 border-homepilot-primary/30" :
      "hover:bg-homepilot-accent/10 border-homepilot-primary/20";
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
        <Skeleton className="w-10 h-10 rounded-full mb-2" />
        <Skeleton className="w-16 h-4 mb-1" />
        <Skeleton className="w-12 h-3" />
      </div>
    );
  }
  
  return (
    <Button 
      key={scene.id}
      variant="outline"
      onClick={onClick}
      className={cn(
        "h-auto flex flex-col items-center justify-center p-4 border rounded-lg transition-all duration-200",
        getButtonStyle()
      )}
    >
      <div className={cn(
        "w-10 h-10 flex items-center justify-center rounded-full mb-2 transition-colors",
        getIconContainerStyle()
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium">{scene.name}</span>
      <span className="text-xs text-gray-500 mt-1">{scene.devices} {scene.devices === 1 ? 'Gerät' : 'Geräte'}</span>
    </Button>
  );
};

// Füge Importanweisung hinzu, die bei der Extraktion der Komponente fehlte
import { cn } from "@/lib/utils";

export default SceneItem;
