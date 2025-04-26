
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  action?: ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, className, action }) => {
  return (
    <Card className={cn("feature-card", className)}>
      <CardHeader className="p-4 pb-2">
        <div className="w-12 h-12 rounded-full bg-homepilot-primary bg-opacity-10 flex items-center justify-center mb-4 text-homepilot-primary">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      {action && (
        <CardFooter className="p-4 pt-0">
          {action}
        </CardFooter>
      )}
    </Card>
  );
};

export default FeatureCard;
