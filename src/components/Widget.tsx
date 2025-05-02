
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from "@/lib/utils";

interface WidgetProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

const Widget = ({ 
  title, 
  description, 
  icon, 
  children, 
  variant = 'default',
  className
}: WidgetProps) => {
  return (
    <Card className={cn("overflow-hidden border", 
      variant === 'primary' ? 'border-blue-200 dark:border-blue-800' : 
      variant === 'secondary' ? 'border-green-200 dark:border-green-800' : 
      'border-gray-200 dark:border-gray-700',
      className
    )}>
      <CardHeader className={cn("pb-2",
        variant === 'primary' ? 'bg-blue-50 dark:bg-blue-900/20' : 
        variant === 'secondary' ? 'bg-green-50 dark:bg-green-900/20' : 
        ''
      )}>
        <div className="flex items-center">
          {icon && (
            <div className={cn("mr-2 p-1.5 rounded-full", 
              variant === 'primary' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 
              variant === 'secondary' ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' : 
              'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            )}>
              {icon}
            </div>
          )}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default Widget;
