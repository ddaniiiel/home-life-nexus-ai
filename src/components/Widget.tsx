
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { Skeleton } from '@/components/ui/skeleton';

export interface WidgetProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  isLoading?: boolean;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Widget = ({ 
  title, 
  description, 
  icon, 
  children, 
  variant = 'default',
  className,
  headerClassName,
  contentClassName,
  isLoading = false,
  footer,
  size = 'md'
}: WidgetProps) => {
  // Standardisierte Abstandswerte für verschiedene Größen
  const sizeClasses = {
    sm: {
      header: "pb-2 px-3 pt-3", 
      content: "p-3",
      iconSize: "p-1 text-sm"
    },
    md: {
      header: "pb-2 px-5 pt-4", 
      content: "p-5 pt-3",
      iconSize: "p-1.5 text-base"
    },
    lg: {
      header: "pb-3 px-6 pt-5", 
      content: "p-6 pt-4",
      iconSize: "p-2 text-lg"
    }
  }[size];
  
  // Varianten-basierte Styles für konsistentes Farbschema
  const variantClasses = {
    primary: "border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md",
    secondary: "border-green-200 dark:border-green-800 shadow-sm hover:shadow-md",
    accent: "border-homepilot-accent dark:border-homepilot-accent/50 shadow-sm hover:shadow-md",
    warning: "border-yellow-200 dark:border-yellow-800 shadow-sm hover:shadow-md",
    success: "border-emerald-200 dark:border-emerald-800 shadow-sm hover:shadow-md",
    default: "border-gray-200 dark:border-gray-700 shadow-xs hover:shadow-sm"
  }[variant];
  
  const headerVariantClasses = {
    primary: "bg-blue-50 dark:bg-blue-900/20",
    secondary: "bg-green-50 dark:bg-green-900/20",
    accent: "bg-homepilot-accent/10 dark:bg-homepilot-accent/5",
    warning: "bg-yellow-50 dark:bg-yellow-900/20",
    success: "bg-emerald-50 dark:bg-emerald-900/20",
    default: ""
  }[variant];
  
  const iconVariantClasses = {
    primary: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    secondary: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
    accent: "bg-homepilot-accent/20 text-homepilot-primary dark:bg-homepilot-accent/10 dark:text-homepilot-accent",
    warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
    success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
  }[variant];
  
  return (
    <Card className={cn(
      "overflow-hidden border transition-all duration-200",
      variantClasses,
      className
    )}>
      <CardHeader className={cn(
        sizeClasses.header,
        headerVariantClasses,
        headerClassName
      )}>
        <div className="flex items-center">
          {icon && !isLoading && (
            <div className={cn(
              "mr-2 rounded-full",
              sizeClasses.iconSize,
              iconVariantClasses
            )}>
              {icon}
            </div>
          )}
          {isLoading ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <CardTitle className={cn(
              "text-lg leading-tight",
              size === 'sm' && "text-base", 
              size === 'lg' && "text-xl"
            )}>
              {title}
            </CardTitle>
          )}
        </div>
        {description && !isLoading && (
          <CardDescription className="text-sm text-muted-foreground mt-1">
            {description}
          </CardDescription>
        )}
        {description && isLoading && (
          <Skeleton className="h-4 w-2/3 mt-1" />
        )}
      </CardHeader>
      
      <CardContent className={cn(
        sizeClasses.content,
        contentClassName
      )}>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          children
        )}
      </CardContent>
      
      {footer && (
        <div className={cn(
          "px-5 pb-4 pt-2 border-t border-border",
          size === 'sm' && "px-3 py-2", 
          size === 'lg' && "px-6 py-3"
        )}>
          {footer}
        </div>
      )}
    </Card>
  );
};

export default Widget;
