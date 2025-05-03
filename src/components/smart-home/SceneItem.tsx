
import React from 'react';
import { Button } from '@/components/ui/button';
import { QuickScene } from '../types/smart-home';

interface SceneItemProps {
  scene: QuickScene;
}

const SceneItem = ({ scene }: SceneItemProps) => {
  const Icon = scene.icon;
  
  return (
    <Button 
      key={scene.id}
      variant="outline"
      className="h-auto flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-homepilot-accent/10 border-homepilot-primary/20"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-homepilot-primary/10 mb-2">
        <Icon className="h-5 w-5 text-homepilot-primary" />
      </div>
      <span className="text-sm font-medium">{scene.name}</span>
      <span className="text-xs text-gray-500 mt-1">{scene.devices} Geräte</span>
    </Button>
  );
};

export default SceneItem;
