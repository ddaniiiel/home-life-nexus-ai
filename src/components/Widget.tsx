
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WidgetProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'danger' | 'warning' | 'success';
}

const Widget: React.FC<WidgetProps> = ({ 
  title, 
  description, 
  className, 
  children, 
  icon, 
  variant = 'default' 
}) => {
  const headerClasses = cn(
    "p-4 pb-2 flex flex-row items-center justify-between",
    variant === 'default' && "bg-gradient-to-r from-homepilot-accent/20 to-transparent",
    variant === 'primary' && "bg-gradient-to-r from-homepilot-primary/20 to-transparent",
    variant === 'danger' && "bg-gradient-to-r from-red-100 to-transparent",
    variant === 'warning' && "bg-gradient-to-r from-yellow-100 to-transparent",
    variant === 'success' && "bg-gradient-to-r from-green-100 to-transparent"
  );
  
  const titleClasses = cn(
    "text-lg font-medium",
    variant === 'default' && "text-homepilot-secondary",
    variant === 'primary' && "text-homepilot-primary",
    variant === 'danger' && "text-red-700",
    variant === 'warning' && "text-yellow-700",
    variant === 'success' && "text-green-700"
  );
  
  const iconClasses = cn(
    variant === 'default' && "text-homepilot-primary",
    variant === 'primary' && "text-homepilot-primary",
    variant === 'danger' && "text-red-500",
    variant === 'warning' && "text-yellow-500",
    variant === 'success' && "text-green-500"
  );

  return (
    <Card className={cn("widget-card border-homepilot-primary/20", className)}>
      <CardHeader className={headerClasses}>
        <div>
          <CardTitle className={titleClasses}>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {icon && <div className={iconClasses}>{icon}</div>}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default Widget;
