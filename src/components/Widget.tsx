
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WidgetProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, description, className, children, icon }) => {
  return (
    <Card className={cn("widget-card", className)}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {icon && <div className="text-homepilot-primary">{icon}</div>}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default Widget;
