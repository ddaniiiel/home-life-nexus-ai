
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
    variant === 'default' && "bg-gradient-to-r from-green-100/50 to-transparent",
    variant === 'primary' && "bg-gradient-to-r from-blue-100/50 to-transparent",
    variant === 'danger' && "bg-gradient-to-r from-red-100 to-transparent",
    variant === 'warning' && "bg-gradient-to-r from-yellow-100 to-transparent",
    variant === 'success' && "bg-gradient-to-r from-green-100 to-transparent"
  );
  
  const titleClasses = cn(
    "text-lg font-medium",
    variant === 'default' && "text-gray-700",
    variant === 'primary' && "text-blue-700",
    variant === 'danger' && "text-red-700",
    variant === 'warning' && "text-yellow-700",
    variant === 'success' && "text-green-700"
  );
  
  const iconClasses = cn(
    variant === 'default' && "text-gray-600",
    variant === 'primary' && "text-blue-600",
    variant === 'danger' && "text-red-600",
    variant === 'warning' && "text-yellow-600",
    variant === 'success' && "text-green-600"
  );

  const cardClasses = cn(
    "widget-card",
    variant === 'default' && "border-gray-200",
    variant === 'primary' && "border-blue-200",
    variant === 'danger' && "border-red-200",
    variant === 'warning' && "border-yellow-200",
    variant === 'success' && "border-green-200",
    className
  );

  return (
    <Card className={cardClasses}>
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
